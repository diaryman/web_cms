"use client";

import { motion } from "motion/react";
import { ShieldCheck, Lock, CheckCircle, FileCheck } from "lucide-react";

export default function PolicySection() {
    return (
        <section id="policy" className="py-32 section-mixed relative overflow-hidden border-y border-gray-100 dark:border-white/5 scroll-mt-32">
            {/* Abstract background shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 -skew-x-12 transform translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[120px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Compliance</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-8 leading-tight" style={{ color: 'var(--foreground)' }}>
                            มาตรฐานการจัดการข้อมูล <br />
                            <span className="text-blue-600">ระดับสถาบัน</span>
                        </h2>
                        <p className="text-xl mb-10 leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                            เราใช้แนวทางปฏิบัติที่ดีที่สุด (Best Practices) และมาตรฐานสากลในการกำกับดูแลข้อมูล
                            เพื่อให้มั่นใจว่าข้อมูลทุกชุดได้รับการดูแลอย่างถูกต้อง มีคุณภาพ และพร้อมใช้งานเสมอ
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: <Lock size={20} />, text: "Data Privacy First" },
                                { icon: <CheckCircle size={20} />, text: "ISO/IEC 27001" },
                                { icon: <FileCheck size={20} />, text: "DGA Standards" },
                                { icon: <ShieldCheck size={20} />, text: "Cyber Security Act" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="flex items-center gap-3 font-bold group" style={{ color: 'var(--foreground)' }}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 lg:mt-0 relative"
                    >
                        <div className="relative z-10 p-8 rounded-[3rem] glass-dark border border-white/10 shadow-2xl backdrop-blur-2xl">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div>
                                        <p className="text-xs text-blue-300 font-bold uppercase tracking-widest mb-1">Security Score</p>
                                        <p className="text-3xl font-black text-white">99.9%</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin-slow"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Authenticated Users</p>
                                        <p className="text-xl font-bold text-white">Verified</p>
                                    </div>
                                    <div className="bg-accent/10 p-5 rounded-2xl border border-accent/20">
                                        <p className="text-[10px] text-accent font-bold uppercase mb-2">Encrypted Assets</p>
                                        <p className="text-xl font-bold text-white">AES-256</p>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-4 bg-primary font-black rounded-2xl hover:bg-accent transition-all active:scale-95 shadow-xl"
                                    style={{ color: 'var(--primary-foreground)' }}
                                >
                                    ตรวจสอบใบรับรองมาตรฐาน
                                </button>
                            </div>
                        </div>

                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[60px]"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px]"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
