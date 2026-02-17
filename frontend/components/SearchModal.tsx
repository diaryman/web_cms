"use client";

import { useState, useEffect } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    domain?: string;
}

export default function SearchModal({ isOpen, onClose, domain = "localhost:3000" }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    const siteParam = domain === "pdpa.localhost" ? "pdpa" : "main";

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Focus input after animation
            setTimeout(() => {
                const input = document.getElementById("search-input");
                input?.focus();
            }, 300);
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsSearching(true);
        router.push(`/news?q=${encodeURIComponent(query)}&site=${siteParam}`);
        setTimeout(() => {
            onClose();
            setIsSearching(false);
            setQuery("");
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] glass backdrop-blur-[20px] bg-primary/20 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-2xl rounded-[3rem] shadow-2xl p-8 border relative"
                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--glass-border)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-3 hover:bg-white/10 rounded-2xl transition-all"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-2xl font-black font-heading mb-2" style={{ color: 'var(--foreground)' }}>
                                {domain === "pdpa.localhost" ? "ค้นหาข้อมูล PDPA" : "ค้นหาข้อมูลธรรมาภิบาล"}
                            </h2>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                {domain === "pdpa.localhost"
                                    ? "พิมพ์สิ่งที่ต้องการค้นหาเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล"
                                    : "พิมพ์สิ่งที่ต้องการค้นหาเกี่ยวกับธรรมาภิบาลข้อมูล"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="relative mb-8">
                            <div className="relative group">
                                <input
                                    id="search-input"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ใส่คำที่ต้องการค้นหา..."
                                    className="w-full pl-14 pr-32 py-5 border-2 border-transparent focus:border-accent rounded-3xl text-xl font-bold transition-all shadow-inner placeholder:opacity-50"
                                    style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--foreground)', borderColor: 'var(--glass-border)' }}
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-accent transition-colors" size={28} style={{ color: 'var(--text-muted)' }} />

                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <button
                                        type="submit"
                                        disabled={!query.trim() || isSearching}
                                        className="bg-primary px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-accent transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                                        style={{ color: 'var(--primary-foreground)' }}
                                    >
                                        {isSearching ? <Loader2 size={18} className="animate-spin" /> : "ค้นหา"}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="space-y-4">
                            <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>หัวข้อยอดนิยม</p>
                            <div className="flex flex-wrap gap-2">
                                {["นโยบายปี 2569", "มาตรฐานข้อมูล", "แบบฟอร์มขอใช้ข้อมูล", "Data Catalog", "ความปลอดภัย"].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            setQuery(tag);
                                        }}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-transparent rounded-xl text-sm font-bold transition-all hover:shadow-md"
                                        style={{ color: 'var(--foreground)', borderColor: 'var(--glass-border)' }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
