"use client";

import Link from "next/link";
import { ArrowRight, Shield, Globe, Database, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
    headline?: string;
    subHeadline?: string;
    heroStats?: { value: string; label: string; sublabel: string }[];
}

export default function Hero({ headline, subHeadline, heroStats }: HeroProps) {
    return (
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
            {/* dynamic background with floating blobs */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ backgroundColor: 'var(--accent-glow)' }}
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full blur-[100px]" style={{ backgroundColor: 'var(--accent-subtle)' }}
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full blur-[80px]" style={{ backgroundColor: 'var(--accent-glow)' }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border text-sm font-semibold mb-8 shadow-sm"
                        style={{ color: 'var(--accent-color)', borderColor: 'var(--accent-subtle)' }}
                    >
                        <Sparkles size={16} className="text-accent" />
                        <span>Data Governance Framework 2.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight mb-8 whitespace-pre-line"
                        style={{ color: 'var(--foreground)' }}
                    >
                        {headline || <>ยกระดับ <span className="text-gradient">ธรรมาภิบาลข้อมูล</span> <br />สู่มาตรฐานสากล</>}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl font-medium mb-10 leading-relaxed max-w-2xl mx-auto whitespace-pre-line"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {subHeadline || "ขับเคลื่อนองค์กรด้วยข้อมูลที่มีคุณภาพ โปร่งใส และปลอดภัย เพื่อการตัดสินใจที่แม่นยำและการบริการประชาชนที่มีประสิทธิภาพสูงสุด"}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                    >
                        <Link
                            href="/news?site=main"
                            className="group relative px-8 py-4 bg-primary font-bold rounded-2xl shadow-premium hover:shadow-blue-500/25 transition-all duration-300 active:scale-95"
                            style={{ color: 'var(--primary-foreground)' }}
                        >
                            <span className="flex items-center gap-2">
                                เริ่มต้นใช้งาน <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link
                            href="#policy"
                            className="px-8 py-4 glass font-bold rounded-2xl transition-all active:scale-95"
                            style={{ color: 'var(--foreground)' }}
                        >
                            ศึกษาหลักเกณฑ์
                        </Link>
                    </motion.div>

                    {/* Stats/Features Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {(heroStats || [
                            { value: "1,200+", label: "DATA ASSETS", sublabel: "ชุดข้อมูลในระบบ" },
                            { value: "100%", label: "COMPLIANCE", sublabel: "ผ่านมาตรฐาน" },
                            { value: "99.9%", label: "DATA ACCURACY", sublabel: "ความแม่นยำข้อมูล" },
                            { value: "Level 4", label: "SECURITY", sublabel: "ISO 27001 Certified" }
                        ]).map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                                whileHover={{ y: -8 }}
                                className="glass p-6 rounded-3xl border border-white/50 shadow-premium flex flex-col items-center text-center group"
                            >
                                <div className="text-3xl font-black text-primary mb-1 group-hover:scale-110 transition-transform tracking-tighter" style={{ color: 'var(--accent-color)' }}>
                                    {item.value}
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'var(--foreground)' }}>{item.label}</h3>
                                <p className="text-[10px] font-bold opacity-60 uppercase tracking-tight" style={{ color: 'var(--text-muted)' }}>{item.sublabel}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -left-20 top-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--accent-glow)' }}></div>
            <div className="absolute -right-20 bottom-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: 'var(--accent-subtle)' }}></div>
        </section>
    );
}
