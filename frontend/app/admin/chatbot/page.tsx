"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import {
    MessageSquare, Save, Bot, Cpu, Key, Terminal, Wifi, Shield,
    RefreshCcw, Info, Send, Plus, X, Sparkles, Eye, EyeOff, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminChatbotPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatbotSettingsContent />
        </Suspense>
    );
}

function ChatbotSettingsContent() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const siteName = siteParam === "pdpa" ? "PDPA Center" : "DataGOV";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [config, setConfig] = useState<any>({
        isEnabled: true,
        provider: "gemini",
        apiKey: "",
        modelName: "gemini-1.5-flash",
        botName: "AI Assistant",
        systemPrompt: siteParam === "pdpa"
            ? "คุณคือผู้ช่วยผู้เชี่ยวชาญด้านกฎหมาย PDPA สำหรับศาลปกครอง ตอบคำถามเกี่ยวกับสิทธิ์ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล อย่างสุภาพและถูกต้อง"
            : "คุณคือผู้ช่วยผู้เชี่ยวชาญด้านธรรมาภิบาลข้อมูล ตอบคำถามเกี่ยวกับมาตรฐาน นโยบาย และกฎระเบียบที่เกี่ยวข้องอย่างสุภาพและถูกต้อง",
        welcomeMessage: "สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ?",
        suggestedQuestions: [],
        temperature: 0.7,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [newQuestion, setNewQuestion] = useState("");

    // Live test panel
    const [testMessages, setTestMessages] = useState<{ role: string; content: string }[]>([]);
    const [testInput, setTestInput] = useState("");
    const [testLoading, setTestLoading] = useState(false);
    const testEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            setLoading(true);
            try {
                const { fetchAPI } = await import("@/lib/api");
                const res = await fetchAPI("/chatbot-configs", { filters: { domain } });
                if (res.data && res.data.length > 0) {
                    const cfg = res.data[0];
                    setConfig({
                        ...cfg,
                        suggestedQuestions: cfg.suggestedQuestions || [],
                    });
                }
            } catch (err) {
                console.error("Failed to fetch chatbot config:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, [domain]);

    useEffect(() => {
        testEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [testMessages]);

    const handleSave = async () => {
        setSaving(true);
        setStatusMsg(null);
        try {
            const { fetchAPI } = await import("@/lib/api");
            const payload = { data: { ...config, domain } };
            if (config.documentId) {
                await fetchAPI(`/chatbot-configs/${config.documentId}`, {}, { method: "PUT", body: JSON.stringify(payload) });
            } else {
                const created = await fetchAPI("/chatbot-configs", {}, { method: "POST", body: JSON.stringify(payload) });
                if (created.data) setConfig((prev: any) => ({ ...prev, documentId: created.data.documentId }));
            }
            setStatusMsg({ type: "success", text: "บันทึกการตั้งค่าแชทบอทเรียบร้อยแล้ว ✓" });
        } catch {
            setStatusMsg({ type: "error", text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
        } finally {
            setSaving(false);
            setTimeout(() => setStatusMsg(null), 4000);
        }
    };

    const addSuggestedQuestion = () => {
        if (!newQuestion.trim()) return;
        setConfig((prev: any) => ({ ...prev, suggestedQuestions: [...(prev.suggestedQuestions || []), newQuestion.trim()] }));
        setNewQuestion("");
    };

    const removeSuggestedQuestion = (idx: number) => {
        setConfig((prev: any) => ({ ...prev, suggestedQuestions: prev.suggestedQuestions.filter((_: any, i: number) => i !== idx) }));
    };

    const handleLiveTest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!testInput.trim() || testLoading) return;
        const msg = testInput.trim();
        setTestInput("");
        const updatedHistory = [...testMessages, { role: "user", content: msg }];
        setTestMessages([...updatedHistory, { role: "assistant", content: "" }]);
        setTestLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, history: testMessages, domain }),
            });

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const lines = decoder.decode(value).split("\n");
                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);
                            if (data === "[DONE]") break;
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.text) {
                                    accumulated += parsed.text;
                                    setTestMessages([...updatedHistory, { role: "assistant", content: accumulated }]);
                                }
                            } catch { }
                        }
                    }
                }
            }
        } catch {
            setTestMessages([...updatedHistory, { role: "assistant", content: "❌ เกิดข้อผิดพลาด กรุณาตั้งค่า API Key ก่อน" }]);
        } finally {
            setTestLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading tracking-tight">ตั้งค่าแชทบอท (AI Assistant)</h1>
                    <p className="text-gray-400 font-medium mt-1">จัดการ AI และพฤติกรรมการตอบกลับสำหรับเว็บไซต์ {siteName}</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-[1.5rem] font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-60 disabled:scale-100"
                >
                    {saving ? <RefreshCcw size={20} className="animate-spin" /> : <Save size={20} />}
                    {saving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
                </button>
            </div>

            <AnimatePresence>
                {statusMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 border text-sm font-bold ${statusMsg.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}
                    >
                        <Info size={18} /> {statusMsg.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left: Config */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Connection */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500"><Wifi size={20} /></div>
                            <h3 className="text-xl font-bold text-primary">การเชื่อมต่อ AI</h3>
                        </div>

                        {/* Provider */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">AI Provider</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: "openthaigpt", label: "OpenThaiGPT 🇹🇭", icon: <Sparkles size={16} />, model: "/model", hint: "โมเดลภาษาไทย (แนะนำ)" },
                                    { id: "gemini", label: "Google Gemini", icon: <Sparkles size={16} />, model: "gemini-1.5-flash", hint: "ฟรี / มี quota" },
                                    { id: "openai", label: "OpenAI / ChatGPT", icon: <Cpu size={16} />, model: "gpt-4o-mini", hint: "ต้องใช้บัตรเครดิต" },
                                    { id: "ollama", label: "Local (Ollama)", icon: <Terminal size={16} />, model: "llama3", hint: "ใช้บน Server ตัวเอง" },
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setConfig({ ...config, provider: item.id, modelName: item.model })}
                                        className={`flex items-start gap-3 p-4 rounded-2xl border-2 font-bold text-sm transition-all text-left ${config.provider === item.id ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/10" : "border-gray-100 text-gray-400 hover:border-gray-200"}`}
                                    >
                                        <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                                        <div>
                                            <div>{item.label}</div>
                                            <div className={`text-[10px] font-medium mt-0.5 ${config.provider === item.id ? "text-primary/60" : "text-gray-300"}`}>{item.hint}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* API Key */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                {config.provider === "ollama" ? "Ollama URL (เช่น http://localhost:11434)" : "API Key"}
                            </label>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showApiKey ? "text" : "password"}
                                    placeholder={config.provider === "ollama" ? "http://localhost:11434" : "sk-... หรือ AIza..."}
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none"
                                    value={config.apiKey || ""}
                                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                                />
                                <button type="button" onClick={() => setShowApiKey(!showApiKey)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                                    {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Model & Bot Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Model Name</label>
                                <input
                                    type="text"
                                    placeholder="gemini-1.5-flash, gpt-4o..."
                                    className="w-full px-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none"
                                    value={config.modelName || ""}
                                    onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ชื่อบอท</label>
                                <input
                                    type="text"
                                    placeholder="AI Assistant"
                                    className="w-full px-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none"
                                    value={config.botName || ""}
                                    onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personality */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500"><MessageSquare size={20} /></div>
                            <h3 className="text-xl font-bold text-primary">ลักษณะนิสัยและการตอบกลับ</h3>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">System Prompt / Instruction</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none resize-none"
                                placeholder="กำหนดบทบาทและพฤติกรรมให้บอท เช่น คุณคือผู้เชี่ยวชาญด้านกฎหมาย..."
                                value={config.systemPrompt || ""}
                                onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Welcome Message</label>
                            <input
                                type="text"
                                className="w-full px-4 py-4 bg-gray-50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none"
                                value={config.welcomeMessage || ""}
                                onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                            />
                        </div>

                        {/* Suggested Questions */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                คำถามที่แนะนำ (Suggested Questions)
                                <span className="ml-2 text-gray-300">จะแสดงให้ผู้ใช้เลือกตอนเริ่มต้นสนทนา</span>
                            </label>
                            <div className="space-y-2 mb-3">
                                {(config.suggestedQuestions || []).map((q: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <Zap size={14} className="text-accent flex-shrink-0" />
                                        <span className="flex-1 text-sm font-medium text-gray-700">{q}</span>
                                        <button onClick={() => removeSuggestedQuestion(i)} className="text-gray-300 hover:text-rose-400 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addSuggestedQuestion()}
                                    placeholder="เพิ่มคำถาม เช่น PDPA คืออะไร?"
                                    className="flex-1 px-4 py-3 bg-gray-50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none border border-gray-100"
                                />
                                <button onClick={addSuggestedQuestion} className="px-4 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-accent transition-all flex items-center gap-2">
                                    <Plus size={16} /> เพิ่ม
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Status + Slider + Live Test */}
                <div className="space-y-6">

                    {/* Status Toggle */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors ${config.isEnabled ? "bg-emerald-50 text-emerald-500" : "bg-gray-50 text-gray-300"}`}>
                            <Bot size={40} className={config.isEnabled ? "animate-bounce" : ""} />
                        </div>
                        <h4 className="font-bold text-primary mb-1">สถานะแชทบอท</h4>
                        <p className={`text-[10px] mb-4 uppercase tracking-widest font-black ${config.isEnabled ? "text-emerald-500" : "text-gray-400"}`}>
                            {config.isEnabled ? "● เปิดใช้งาน" : "○ ปิดใช้งาน"}
                        </p>
                        <button
                            onClick={() => setConfig({ ...config, isEnabled: !config.isEnabled })}
                            className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${config.isEnabled ? "bg-rose-50 text-rose-500 hover:bg-rose-100" : "bg-emerald-50 text-emerald-500 hover:bg-emerald-100"}`}
                        >
                            {config.isEnabled ? "ปิดการใช้งาน" : "เปิดการใช้งาน"}
                        </button>
                    </div>

                    {/* Temperature Slider */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Temperature</label>
                            <span className="text-lg font-black text-primary">{config.temperature}</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.1"
                            className="w-full accent-primary"
                            value={config.temperature || 0.7}
                            onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                        />
                        <div className="flex justify-between text-[9px] font-bold text-gray-300 mt-2 uppercase">
                            <span>Precise</span>
                            <span>Creative</span>
                        </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-primary p-6 rounded-[2.5rem] text-white space-y-3">
                        <div className="flex items-center gap-2">
                            <Shield size={18} className="text-accent" />
                            <h4 className="font-bold text-sm">ความปลอดภัย</h4>
                        </div>
                        <p className="text-[10px] text-blue-100/60 leading-relaxed font-medium">
                            API Key จะถูกเข้ารหัสและเข้าถึงได้เฉพาะเจ้าหน้าที่ดูแลระบบเท่านั้น ห้ามแชร์กุญแจนี้กับผู้อื่น
                        </p>
                    </div>

                    {/* Live Test Panel */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-50 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500">
                                <Zap size={16} />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary text-sm">ทดสอบบอทสด</h3>
                                <p className="text-[10px] text-gray-400">กด "บันทึก" ก่อนทดสอบ</p>
                            </div>
                            {testMessages.length > 0 && (
                                <button onClick={() => setTestMessages([])} className="ml-auto text-[10px] text-gray-400 hover:text-rose-400 transition-colors font-bold">
                                    ล้าง
                                </button>
                            )}
                        </div>

                        <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50/40">
                            {testMessages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <Bot size={32} className="text-gray-200 mb-2" />
                                    <p className="text-xs text-gray-300 font-medium">พิมพ์คำถามเพื่อทดสอบ</p>
                                </div>
                            ) : (
                                testMessages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === "user" ? "bg-primary text-white rounded-tr-sm" : "bg-white text-primary border border-gray-100 rounded-tl-sm"}`}>
                                            {msg.content || (testLoading && i === testMessages.length - 1 ? (
                                                <span className="flex gap-1">
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" />
                                                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                                                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                                                </span>
                                            ) : "")}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={testEndRef} />
                        </div>

                        <form onSubmit={handleLiveTest} className="p-3 bg-white border-t border-gray-50 flex gap-2">
                            <input
                                type="text"
                                value={testInput}
                                onChange={(e) => setTestInput(e.target.value)}
                                placeholder="ทดสอบถามบอท..."
                                disabled={testLoading}
                                className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/10"
                            />
                            <button
                                type="submit"
                                disabled={testLoading || !testInput.trim()}
                                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-accent transition-all disabled:opacity-40"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
