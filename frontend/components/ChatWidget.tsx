"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, RefreshCw, Minus, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const domain = typeof window !== "undefined" ? window.location.host : "localhost:3000";

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
                const res = await fetch(`${strapiUrl}/api/chatbot-configs?filters[domain]=${domain}`);
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    const cfg = data.data[0];
                    setConfig(cfg);
                    if (cfg.isEnabled && messages.length === 0) {
                        setMessages([{ role: "assistant", content: cfg.welcomeMessage || "สวัสดีครับ มีอะไรให้ผมช่วยไหมครับ?" }]);
                    }
                }
            } catch (err) {
                console.error("ChatWidget config fetch failed:", err);
            }
        };
        fetchConfig();
    }, [domain]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg = inputValue.trim();
        setInputValue("");
        const newMessages = [...messages, { role: "user", content: userMsg }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages,
                    domain: domain
                }),
            });

            const data = await res.json();
            if (data.text) {
                setMessages([...newMessages, { role: "assistant", content: data.text }]);
            } else {
                throw new Error(data.error || "Failed to get response");
            }
        } catch (err) {
            console.error("Chat error:", err);
            setMessages([...newMessages, { role: "assistant", content: "ขออภัยครับ ระบบขัดข้องชั่วคราว กรุณาลองใหม่ภายหลัง" }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!config || !config.isEnabled) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[9999] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white w-[380px] h-[550px] rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-6"
                    >
                        {/* Header */}
                        <div className="bg-primary p-6 text-white flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center">
                                    <Bot size={22} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-tight">AI Assistant</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-white text-primary rounded-tl-none border border-gray-100"
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="พิมพ์ข้อความที่นี่..."
                                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !inputValue.trim()}
                                className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:scale-100"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-primary border border-gray-100' : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                    </span>
                )}
            </button>
        </div>
    );
}
