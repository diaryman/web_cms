"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { MessageSquare, Save, Bot, Cpu, Key, Terminal, Wifi, Shield, RefreshCcw, Info } from "lucide-react";
import { motion } from "motion/react";

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
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost:3000";

    const [config, setConfig] = useState<any>({
        isEnabled: true,
        provider: "gemini",
        apiKey: "",
        modelName: "gemini-1.5-flash",
        systemPrompt: "คุณคือผู้ช่วยอัจฉริยะ...",
        welcomeMessage: "สวัสดีครับ มีอะไรให้ผมช่วยไหมครับ?",
        temperature: 0.7
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            setLoading(true);
            try {
                const { fetchAPI } = await import("@/lib/api");
                const res = await fetchAPI("/chatbot-configs", {
                    filters: { domain }
                });
                if (res.data && res.data.length > 0) {
                    setConfig(res.data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch chatbot config:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [domain]);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const { fetchAPI } = await import("@/lib/api");

            const payload = {
                data: {
                    ...config,
                    domain
                }
            };

            if (config.id) {
                await fetchAPI(`/chatbot-configs/${config.id}`, {}, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
            } else {
                await fetchAPI("/chatbot-configs", {}, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            }

            setMessage({ type: 'success', text: "บันทึกการตั้งค่าแชทบอทเรียบร้อยแล้ว" });
        } catch (err) {
            console.error("Failed to save config:", err);
            setMessage({ type: 'error', text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading tracking-tight">ตั้งค่าแชทบอท (AI Assistant)</h1>
                    <p className="text-gray-400 font-medium">จัดการ API และพฤติกรรมการตอบกลับของระบบ AI สำหรับ {siteName}</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-[1.5rem] font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    {saving ? <RefreshCcw size={20} className="animate-spin" /> : <Save size={20} />}
                    {saving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    <Info size={20} />
                    <p className="font-bold text-sm">{message.text}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Settings */}
                <div className="md:col-span-2 space-y-6">
                    {/* Connection Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <Wifi size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-primary">การเชื่อมต่อ AI</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">AI Provider</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'gemini', label: 'Google Gemini', icon: <Bot size={16} /> },
                                        { id: 'openai', label: 'OpenAI', icon: <Cpu size={16} /> },
                                        { id: 'ollama', label: 'Local (Ollama)', icon: <Terminal size={16} /> }
                                    ].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setConfig({ ...config, provider: item.id })}
                                            className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 font-bold text-sm transition-all ${config.provider === item.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400 hover:border-gray-100'}`}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">API Key / URL</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Enter your API Key here..."
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                                        value={config.apiKey || ""}
                                        onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 ml-1">* จะถูกเข้ารหัสและรักษาความปลอดภัยบนเซิร์ฟเวอร์</p>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Model Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. gemini-1.5-flash, gpt-4o"
                                    className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                                    value={config.modelName || ""}
                                    onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personality Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-primary">ลักษณะนิสัยและการตอบกลับ</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">System Prompt / Instruction</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 transition-all font-medium resize-none"
                                    placeholder="กำหนดบทบาทให้ AI เช่น คุณคือผู้เชี่ยวชาญด้านกฎหมาย..."
                                    value={config.systemPrompt || ""}
                                    onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Welcome Message</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                                    value={config.welcomeMessage || ""}
                                    onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors ${config.isEnabled ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-300'}`}>
                            <Bot size={40} className={config.isEnabled ? 'animate-bounce' : ''} />
                        </div>
                        <h4 className="font-bold text-primary mb-1">สถานะแชทบอท</h4>
                        <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-bold">{config.isEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</p>

                        <button
                            onClick={() => setConfig({ ...config, isEnabled: !config.isEnabled })}
                            className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${config.isEnabled ? 'bg-rose-50 text-rose-500 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100'}`}
                        >
                            {config.isEnabled ? 'ปิดการใช้งาน' : 'เปิดการใช้งาน'}
                        </button>
                    </div>

                    <div className="bg-primary p-6 rounded-[2.5rem] text-white space-y-4">
                        <div className="flex items-center gap-2">
                            <Shield size={18} className="text-accent" />
                            <h4 className="font-bold text-sm">ข้อกำหนดความเป็นส่วนตัว</h4>
                        </div>
                        <p className="text-[10px] text-blue-100/60 leading-relaxed font-medium">
                            API Key ของคุณจะถูกเก็บไว้เป็นความลับและเข้าถึงได้เฉพาะเจ้าหน้าที่ดูแลระบบเท่านั้น ห้ามแชร์กุญแจนี้กับผู้อื่น
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Temperature ({config.temperature})</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            className="w-full accent-primary"
                            value={config.temperature || 0.7}
                            onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                        />
                        <div className="flex justify-between text-[9px] font-bold text-gray-300 mt-2 uppercase tracking-tighter">
                            <span>Strict / Precise</span>
                            <span>Creative</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
