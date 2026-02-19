import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const { message, history, domain } = await req.json();

        // 1. Fetch Chatbot Config from Strapi
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const configRes = await fetch(
            `${strapiUrl}/api/chatbot-configs?filters[domain][$eq]=${domain}`,
            { headers: { "Content-Type": "application/json" } }
        );
        const configData = await configRes.json();

        if (!configData.data || configData.data.length === 0) {
            return NextResponse.json({ error: "Chatbot not configured for this domain" }, { status: 404 });
        }

        const config = configData.data[0];
        if (!config.isEnabled) {
            return NextResponse.json({ error: "Chatbot is disabled" }, { status: 403 });
        }

        const { provider, apiKey, modelName, systemPrompt, temperature } = config;

        if (!apiKey && provider !== "ollama") {
            return NextResponse.json({ error: "API Key missing in configuration" }, { status: 500 });
        }

        // 2. RAG: Fetch Relevant Context from Strapi
        let context = "";
        try {
            const qEnc = encodeURIComponent(message);
            const [articlesRes, docsRes] = await Promise.all([
                fetch(
                    `${strapiUrl}/api/articles?filters[domain][$eq]=${domain}&filters[$or][0][title][$containsi]=${qEnc}&filters[$or][1][content][$containsi]=${qEnc}&pagination[limit]=3&fields[0]=title&fields[1]=content&fields[2]=excerpt`
                ).then(r => r.json()).catch(() => ({ data: [] })),
                fetch(
                    `${strapiUrl}/api/policy-documents?filters[domain][$eq]=${domain}&filters[$or][0][title][$containsi]=${qEnc}&filters[$or][1][description][$containsi]=${qEnc}&pagination[limit]=3&fields[0]=title&fields[1]=description`
                ).then(r => r.json()).catch(() => ({ data: [] })),
            ]);

            const contextItems = [
                ...(articlesRes.data || []).map((item: any) =>
                    `[ข่าว] "${item.title}": ${item.excerpt || item.content?.substring(0, 300) || ""}...`
                ),
                ...(docsRes.data || []).map((item: any) =>
                    `[เอกสาร] "${item.title}": ${item.description?.substring(0, 300) || ""}...`
                ),
            ];

            if (contextItems.length > 0) {
                context = `\n\n---\nข้อมูลที่เกี่ยวข้องจากฐานข้อมูล (ใช้อ้างอิงในการตอบ):\n${contextItems.join("\n\n")}`;
            }
        } catch (ragError) {
            console.error("RAG Context fetch failed:", ragError);
        }

        const finalSystemPrompt = `${systemPrompt || "คุณคือผู้ช่วยอัจฉริยะที่ช่วยตอบคำถามเกี่ยวกับข้อมูลขององค์กร"}${context}\n\n---\nคำชี้แจง: ตอบด้วยภาษาไทยที่เป็นธรรมชาติ สุภาพ และกระชับ หากมีข้อมูลอ้างอิงให้ใช้ข้อมูลนั้นเป็นหลัก หากไม่มีข้อมูลให้ตอบตามความรู้ทั่วไปและแจ้งให้ผู้ใช้ทราบ`;

        // 3. Create streaming response
        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                const send = (text: string) => {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                };
                const done = () => {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();
                };

                try {
                    if (provider === "gemini") {
                        const genAI = new GoogleGenerativeAI(apiKey);
                        const model = genAI.getGenerativeModel({
                            model: modelName || "gemini-1.5-flash",
                            systemInstruction: finalSystemPrompt,
                        });

                        const chat = model.startChat({
                            history: (history || [])
                                .filter((h: any) => h.content?.trim())
                                .map((h: any) => ({
                                    role: h.role === "user" ? "user" : "model",
                                    parts: [{ text: h.content }],
                                })),
                            generationConfig: { temperature: temperature ?? 0.7 },
                        });

                        const result = await chat.sendMessageStream(message);
                        for await (const chunk of result.stream) {
                            const text = chunk.text();
                            if (text) send(text);
                        }
                    } else if (provider === "openai") {
                        const openai = new OpenAI({ apiKey });
                        const completion = await openai.chat.completions.create({
                            model: modelName || "gpt-4o-mini",
                            stream: true,
                            messages: [
                                { role: "system", content: finalSystemPrompt },
                                ...(history || []).map((h: any) => ({ role: h.role, content: h.content })),
                                { role: "user", content: message },
                            ],
                            temperature: temperature ?? 0.7,
                        });

                        for await (const chunk of completion) {
                            const text = chunk.choices[0]?.delta?.content || "";
                            if (text) send(text);
                        }
                    } else if (provider === "ollama") {
                        const ollamaUrl = apiKey || "http://localhost:11434";
                        const ollamaRes = await fetch(`${ollamaUrl}/api/chat`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                model: modelName || "llama3",
                                stream: true,
                                messages: [
                                    { role: "system", content: finalSystemPrompt },
                                    ...(history || []).map((h: any) => ({ role: h.role, content: h.content })),
                                    { role: "user", content: message },
                                ],
                            }),
                        });

                        const reader = ollamaRes.body?.getReader();
                        const decoder = new TextDecoder();
                        if (reader) {
                            while (true) {
                                const { done: doneReading, value } = await reader.read();
                                if (doneReading) break;
                                const lines = decoder.decode(value).split("\n").filter(Boolean);
                                for (const line of lines) {
                                    try {
                                        const parsed = JSON.parse(line);
                                        if (parsed.message?.content) send(parsed.message.content);
                                    } catch { }
                                }
                            }
                        }
                    } else {
                        send("ไม่รองรับ AI Provider นี้ครับ กรุณาตั้งค่าใหม่");
                    }
                } catch (err: any) {
                    console.error("AI Stream error:", err);
                    send(`\n\n❌ เกิดข้อผิดพลาด: ${err.message || "Internal Server Error"}`);
                }

                done();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
