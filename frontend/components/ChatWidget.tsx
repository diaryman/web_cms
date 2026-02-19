"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, Maximize2, Minimize2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    isStreaming?: boolean;
}

interface ChatConfig {
    id?: number;
    documentId?: string;
    isEnabled: boolean;
    welcomeMessage?: string;
    botName?: string;
    suggestedQuestions?: string[];
    provider?: string;
    primaryColor?: string;
}

// Simple markdown renderer (bold, links, lists, code)
function RenderMarkdown({ text }: { text: string }) {
    const lines = text.split("\n");
    return (
        <div className="space-y-1 text-sm leading-relaxed">
            {lines.map((line, i) => {
                if (line.startsWith("# ")) return <p key={i} className="font-black text-base">{line.slice(2)}</p>;
                if (line.startsWith("## ")) return <p key={i} className="font-bold">{line.slice(3)}</p>;
                if (line.startsWith("- ") || line.startsWith("• ")) {
                    return (
                        <div key={i} className="flex gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
                            <span>{formatInline(line.slice(2))}</span>
                        </div>
                    );
                }
                if (line.trim() === "") return <div key={i} className="h-1" />;
                return <p key={i}>{formatInline(line)}</p>;
            })}
        </div>
    );
}

function formatInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
            return <strong key={i} className="font-black">{part.slice(2, -2)}</strong>;
        if (part.startsWith("`") && part.endsWith("`"))
            return <code key={i} className="px-1.5 py-0.5 rounded-md bg-white/20 font-mono text-xs">{part.slice(1, -1)}</code>;
        return part;
    });
}

// ตัด <think>...</think> block ที่โมเดล reasoning ใช้คิดก่อนตอบ
function stripThinkBlocks(text: string): string {
    // ตัด block ที่ปิดสมบูรณ์
    let result = text.replace(/<think>[\s\S]*?<\/think>\n?/g, "");
    // ตัด block ที่ยังไม่ปิด (กำลัง streaming อยู่)
    result = result.replace(/<think>[\s\S]*/g, "");
    return result.trimStart();
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-white/40" />}
        </button>
    );
}

interface Props {
    domainOverride?: string;
}

export default function ChatWidget({ domainOverride }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [config, setConfig] = useState<ChatConfig | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const domain = domainOverride || (typeof window !== "undefined"
        ? (window.location.port === "3002" ? "pdpa.localhost" : window.location.hostname)
        : "localhost");

    // Fetch config
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
                const res = await fetch(`${strapiUrl}/api/chatbot-configs?filters[domain][$eq]=${domain}`);
                const data = await res.json();
                if (data.data && data.data.length > 0) {
                    const cfg: ChatConfig = data.data[0];
                    setConfig(cfg);
                    if (cfg.isEnabled && messages.length === 0) {
                        setMessages([{
                            id: "welcome",
                            role: "assistant",
                            content: cfg.welcomeMessage || "สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ?"
                        }]);
                    }
                }
            } catch (err) {
                console.error("ChatWidget config fetch failed:", err);
            }
        };
        fetchConfig();
    }, [domain]);

    // Auto-scroll to bottom
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    // Scroll indicator
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        setShowScrollDown(scrollHeight - scrollTop - clientHeight > 60);
    };

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen]);

    const generateId = () => Math.random().toString(36).slice(2);

    const sendMessage = async (userMsg: string) => {
        if (!userMsg.trim() || isLoading) return;

        const userMessage: Message = { id: generateId(), role: "user", content: userMsg.trim() };
        const assistantId = generateId();
        const assistantPlaceholder: Message = { id: assistantId, role: "assistant", content: "", isStreaming: true };

        const updatedMessages = [...messages, userMessage];
        setMessages([...updatedMessages, assistantPlaceholder]);
        setInputValue("");
        setIsLoading(true);
        scrollToBottom();

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.filter(m => !m.isStreaming).map(m => ({ role: m.role, content: m.content })),
                    domain,
                }),
            });

            if (!res.ok) throw new Error("Server error");

            // Handle streaming
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split("\n");

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            const data = line.slice(6);
                            if (data === "[DONE]") break;
                            try {
                                const parsed = JSON.parse(data);
                                if (parsed.text) {
                                    accumulated += parsed.text;
                                    setMessages(prev => prev.map(m =>
                                        m.id === assistantId ? { ...m, content: accumulated, isStreaming: true } : m
                                    ));
                                }
                            } catch { }
                        }
                    }
                }
            }

            // Mark streaming done
            setMessages(prev => prev.map(m =>
                m.id === assistantId ? { ...m, content: accumulated || "ขออภัยครับ ไม่สามารถรับคำตอบได้", isStreaming: false } : m
            ));
        } catch (err) {
            setMessages(prev => prev.map(m =>
                m.id === assistantId
                    ? { ...m, content: "ขออภัยครับ ระบบขัดข้องชั่วคราว กรุณาลองใหม่ภายหลังครับ 🙏", isStreaming: false }
                    : m
            ));
        } finally {
            setIsLoading(false);
            setTimeout(scrollToBottom, 100);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    const handleReset = () => {
        setMessages([{
            id: generateId(),
            role: "assistant",
            content: config?.welcomeMessage || "สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ?"
        }]);
    };

    // If no config yet or disabled, don't show anything
    if (config && !config.isEnabled) return null;
    if (!config) return null; // Wait for initial fetch to prevent flicker

    const chatWidth = isExpanded ? "w-[480px]" : "w-[380px]";
    const chatHeight = isExpanded ? "h-[680px]" : "h-[550px]";
    const suggestedQs = config.suggestedQuestions || [];
    const showSuggestions = messages.length <= 1 && suggestedQs.length > 0;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.94 }}
                        transition={{ type: "spring", damping: 26, stiffness: 320 }}
                        className={`bg-white ${chatWidth} ${chatHeight} rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4 transition-all duration-300`}
                    >
                        {/* Header */}
                        <div className="bg-primary px-5 py-4 text-white flex justify-between items-center relative overflow-hidden flex-shrink-0">
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 bg-white/15 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <Bot size={20} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-tight">{config.botName || "AI Assistant"}</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 relative z-10">
                                <button onClick={handleReset} title="เริ่มการสนทนาใหม่" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                                    <RotateCcw size={15} />
                                </button>
                                <button onClick={() => setIsExpanded(!isExpanded)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                                    {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/40"
                        >
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {msg.role === "assistant" && (
                                        <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot size={14} className="text-primary" />
                                        </div>
                                    )}
                                    <div className={`group max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                                        <div className={`p-3.5 rounded-2xl shadow-sm relative ${msg.role === "user"
                                            ? "bg-primary text-white rounded-tr-sm"
                                            : "bg-white text-primary border border-gray-50 rounded-tl-sm"
                                            }`}>
                                            {msg.role === "assistant" ? (
                                                <RenderMarkdown text={stripThinkBlocks(msg.content) || (msg.isStreaming ? "..." : "")} />
                                            ) : (
                                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                            )}
                                            {msg.isStreaming && (
                                                <span className="inline-flex gap-0.5 ml-1 align-middle">
                                                    <span className="w-1 h-1 bg-current rounded-full animate-bounce opacity-60" style={{ animationDelay: "0ms" }} />
                                                    <span className="w-1 h-1 bg-current rounded-full animate-bounce opacity-60" style={{ animationDelay: "150ms" }} />
                                                    <span className="w-1 h-1 bg-current rounded-full animate-bounce opacity-60" style={{ animationDelay: "300ms" }} />
                                                </span>
                                            )}
                                            {msg.role === "assistant" && !msg.isStreaming && msg.content && (
                                                <div className="absolute -bottom-6 right-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <CopyButton text={stripThinkBlocks(msg.content)} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-7 h-7 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <User size={14} className="text-accent" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Suggested Questions */}
                            {showSuggestions && (
                                <div className="pt-2 space-y-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">คำถามที่พบบ่อย</p>
                                    {suggestedQs.map((q, i) => (
                                        <motion.button
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            onClick={() => sendMessage(q)}
                                            className="w-full text-left px-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-medium text-primary hover:border-accent/30 hover:bg-accent/5 transition-all shadow-sm hover:shadow-md"
                                        >
                                            {q}
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Scroll Down Indicator */}
                        <AnimatePresence>
                            {showScrollDown && (
                                <motion.button
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    onClick={scrollToBottom}
                                    className="absolute bottom-20 right-6 w-8 h-8 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <ChevronDown size={16} />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-50 flex gap-2 flex-shrink-0">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="พิมพ์คำถามที่นี่..."
                                disabled={isLoading}
                                className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium outline-none border border-transparent focus:border-primary/20 disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className="w-11 h-11 bg-primary text-white flex items-center justify-center rounded-xl hover:bg-accent transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:shadow-none active:scale-95 flex-shrink-0"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors relative ${isOpen ? "bg-white text-primary border-2 border-gray-100" : "bg-primary text-white"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Ping indicator */}
                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent" />
                    </span>
                )}
            </motion.button>
        </div>
    );
}
