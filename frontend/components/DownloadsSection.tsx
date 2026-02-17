"use client";

import Link from "next/link";
import { Download, FileText, ChevronRight } from "lucide-react";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

export default function DownloadsSection() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await fetchAPI("/policy-documents", {
                    filters: {
                        domain: "localhost:3000"
                    },
                    sort: ["createdAt:desc"],
                    pagination: { limit: 6 },
                    populate: "*"
                });
                setDocs(data);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const getColor = (cat: string) => {
        const categories = cat || "";
        if (categories.includes('Policy')) return { color: "text-red-500", bg: "bg-red-50" };
        if (categories.includes('Manual')) return { color: "text-blue-500", bg: "bg-blue-50" };
        if (categories.includes('Form')) return { color: "text-emerald-500", bg: "bg-emerald-50" };
        return { color: "text-indigo-500", bg: "bg-indigo-50" };
    };

    return (
        <section id="downloads" className="py-24 section-white border-t border-gray-100 scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        ศูนย์รวมเอกสารเผยแพร่
                    </motion.h2>
                    <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        ดาวน์โหลดกฎระเบียบ ข้อบังคับ และแบบฟอร์มมาตรฐานเพื่อการดำเนินงานด้านข้อมูลอย่างเป็นระบบ
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-gray-50 rounded-3xl animate-pulse"></div>
                        ))
                    ) : docs.length > 0 ? (
                        docs.map((doc, idx) => {
                            const { color, bg } = getColor(doc.category);
                            const fileUrl = doc.file?.url ? getStrapiMedia(doc.file.url) : undefined;
                            return (
                                <a
                                    key={doc.id}
                                    href={fileUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <SpotlightCard
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        whileHover={{ y: -5 }}
                                        className="glass p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-accent/30 transition-all cursor-pointer h-full"
                                    >
                                        <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                            <FileText size={28} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-lg truncate group-hover:text-accent transition-colors font-heading" style={{ color: 'var(--foreground)' }}>{doc.title}</h4>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest" style={{ backgroundColor: 'var(--glass-border)', color: 'var(--text-muted)' }}>{doc.category}</span>
                                                <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{doc.year}</span>
                                            </div>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:bg-accent transition-colors"
                                            style={{ color: 'var(--primary-foreground)' }}
                                        >
                                            <Download size={18} />
                                        </motion.div>
                                    </SpotlightCard>
                                </a>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-10 glass rounded-3xl border-dashed border-2 opacity-50">
                            ไม่พบเอกสารในระบบ
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/news?site=main" className="inline-flex items-center gap-2 font-bold hover:text-accent transition-colors group" style={{ color: 'var(--foreground)' }}>
                        ดูเอกสารทั้งหมดในห้องสมุด <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
