import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    try {
        const { message, history, domain } = await req.json();

        // 1. Fetch Chatbot Config from Strapi
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const configRes = await fetch(`${strapiUrl}/api/chatbot-configs?filters[domain]=${domain}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        const configData = await configRes.json();

        if (!configData.data || configData.data.length === 0) {
            return NextResponse.json({ error: "Chatbot not configured for this domain" }, { status: 404 });
        }

        const config = configData.data[0];
        if (!config.isEnabled) {
            return NextResponse.json({ error: "Chatbot is disabled" }, { status: 403 });
        }

        const { provider, apiKey, modelName, systemPrompt, temperature } = config;

        if (!apiKey) {
            return NextResponse.json({ error: "API Key missing in configuration" }, { status: 500 });
        }

        // --- RAG: Fetch Relevant Context ---
        let context = "";
        try {
            // Search Articles and Documents (Simple keyword search via Strapi filters)
            const [articlesRes, docsRes] = await Promise.all([
                fetch(`${strapiUrl}/api/articles?filters[domain]=${domain}&filters[title][$containsi]=${message}&pagination[limit]=3`),
                fetch(`${strapiUrl}/api/policy-documents?filters[domain]=${domain}&filters[title][$containsi]=${message}&pagination[limit]=3`)
            ]);

            const articles = await articlesRes.json();
            const docs = await docsRes.json();

            const relevantItems = [
                ...(articles.data || []).map((item: any) => `ข่าว: ${item.title} - ${item.content?.substring(0, 200)}...`),
                ...(docs.data || []).map((item: any) => `เอกสาร: ${item.title} - ${item.description?.substring(0, 200)}...`)
            ];

            if (relevantItems.length > 0) {
                context = "\n\nข้อมูลที่เกี่ยวข้องจากฐานข้อมูล:\n" + relevantItems.join("\n");
            }
        } catch (ragError) {
            console.error("RAG Context fetch failed:", ragError);
        }

        const finalSystemPrompt = `${systemPrompt}${context}\n\nคำชี้แจง: ให้ตอบคำถามโดยใช้ข้อมูลที่ให้มาข้างต้นเป็นหลัก หากไม่มีข้อมูลให้ตอบตามความรู้ทั่วไปอย่างสุภาพ`;

        // 2. Execute AI Call based on provider
        let responseText = "";

        if (provider === "gemini") {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: modelName || "gemini-1.5-flash",
                systemInstruction: finalSystemPrompt
            });

            const chat = model.startChat({
                history: history ? history.map((h: any) => ({
                    role: h.role === "user" ? "user" : "model",
                    parts: [{ text: h.content }]
                })) : [],
                generationConfig: {
                    temperature: temperature || 0.7,
                },
            });

            const result = await chat.sendMessage(message);
            responseText = result.response.text();
        }
        else if (provider === "openai") {
            const openai = new OpenAI({ apiKey });
            const completion = await openai.chat.completions.create({
                model: modelName || "gpt-4o-mini",
                messages: [
                    { role: "system", content: finalSystemPrompt },
                    ...(history || []),
                    { role: "user", content: message }
                ],
                temperature: temperature || 0.7,
            });
            responseText = completion.choices[0].message.content || "";
        }
        else {
            return NextResponse.json({ error: "Provider not supported yet" }, { status: 400 });
        }

        return NextResponse.json({ text: responseText });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
