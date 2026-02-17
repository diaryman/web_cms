"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, FileLock, Download, ArrowRight, CheckCircle2, Info, Users, Database, FileText, Lock, Calendar, User, ChevronRight, FileCheck, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import { fetchAPI, getStrapiMedia } from "@/lib/api";

interface PDPAPageClientProps {
    navbar: React.ReactNode;
    footer: React.ReactNode;
}

export default function PDPAPageClient({ navbar, footer }: PDPAPageClientProps) {
    const [articles, setArticles] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch articles for PDPA site
                const articlesRes = await fetchAPI("/articles", {
                    filters: { domain: "pdpa.localhost" },
                    sort: ["publishedAt:desc"],
                    pagination: { limit: 3 }
                });

                // Fetch documents for PDPA site
                const docsRes = await fetchAPI("/policy-documents", {
                    filters: { domain: "pdpa.localhost" },
                    sort: ["createdAt:desc"],
                    populate: "*"
                });

                setArticles(articlesRes.data);
                setDocuments(docsRes.data);
            } catch (error) {
                console.error("Failed to fetch PDPA data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const principles = [
        {
            icon: <Lock className="text-emerald-500" />,
            title: "Data Security",
            text: "รักษาความลับและความปลอดภัยของข้อมูลตามมาตรฐานสากล ISO/IEC 27001"
        },
        {
            icon: <Users className="text-emerald-500" />,
            title: "Data Subject Rights",
            text: "รับรองและคุ้มครองสิทธิของเจ้าของข้อมูลส่วนบุคคลอย่างเคร่งครัดทั้ง 8 ประการ"
        },
        {
            icon: <Database className="text-emerald-500" />,
            title: "Purpose Limitation",
            text: "เก็บรวบรวมและใช้ข้อมูลเฉพาะตามวัตถุประสงค์ที่แจ้งไว้และจำเป็นต่อการปฏิบัติหน้าที่"
        },
    ];

    const timeline = [
        { year: "2565", title: "เริ่มประกาศใช้นโยบาย", desc: "จัดทำร่างนโยบายคุ้มครองข้อมูลส่วนบุคคลฉบับแรก" },
        { year: "2566", title: "แต่งตั้งเจ้าหน้าที่ DPO", desc: "จัดตั้งทีมงานเฉพาะกิจเพื่อดูแลด้านความเป็นส่วนตัว" },
        { year: "2567", title: "ระบบ ROPA สมบูรณ์", desc: "บันทึกกิจกรรมการประมวลผลข้อมูลครบทุกส่วนงาน" },
        { year: "2568", title: "ยกระดับสู่มาตรฐานสากล", desc: "ผ่านการประเมินความมั่นคงปลอดภัยไซเบอร์ระดับดีเยี่ยม" },
    ];

    return (
        <main className="min-h-screen bg-[#f8fafc] selection:bg-emerald-200">
            {navbar}

            {/* PDPA Hero */}
            <section className="relative pt-[calc(10rem+44px)] pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 18, repeat: Infinity }}
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 inline-block">
                                Administrative Court Privacy Center
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black font-heading text-slate-900 leading-tight mb-8 tracking-tighter">
                                การคุ้มครอง <br />
                                <span className="text-emerald-600">ข้อมูลส่วนบุคคล</span> <br />
                                เป็นหน้าที่ของเรา
                            </h1>
                            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                                สำนักงานศาลปกครองมุ่งมั่นรักษาความปลอดภัยของข้อมูลเจ้าหน้าที่และประชาชน
                                ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                                เพื่อสร้างความเชื่อมั่นในการใช้บริการยุติธรรมทางปกครอง
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#documents" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2">
                                    ดาวน์โหลดเอกสาร <Download size={20} />
                                </Link>
                                <Link href="/#contact" className="px-8 py-4 glass border border-emerald-100 text-emerald-800 font-bold rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-2">
                                    ติดต่อเจ้าหน้าที่ DPO
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4 pt-12">
                                <SpotlightCard className="p-8 bg-white border border-emerald-50 rounded-[2.5rem] shadow-premium">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                                        <FileCheck size={28} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-1">ROPA</h4>
                                    <p className="text-sm text-slate-400">บันทึกกิจกรรมครบ 100%</p>
                                </SpotlightCard>
                                <SpotlightCard className="p-8 bg-emerald-600 text-white rounded-[2.5rem] shadow-premium shadow-emerald-600/20">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 text-white">
                                        <Shield size={28} />
                                    </div>
                                    <h4 className="font-bold text-lg mb-1 text-white">Secured</h4>
                                    <p className="text-sm opacity-80 text-white">ปกป้องข้อมูลอย่างดีเยี่ยม</p>
                                </SpotlightCard>
                            </div>
                            <div className="space-y-4">
                                <SpotlightCard className="p-8 bg-white border border-emerald-50 rounded-[2.5rem] shadow-premium">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                                        <Users size={28} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-1">Training</h4>
                                    <p className="text-sm text-slate-400">บุคลากรผ่านการอบรมทุกคน</p>
                                </SpotlightCard>
                                <SpotlightCard className="p-8 bg-white border border-emerald-50 rounded-[2.5rem] shadow-premium">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
                                        <AlertCircle size={28} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-1">Audit</h4>
                                    <p className="text-sm text-slate-400">ประเมินผลภายในรายไตรมาส</p>
                                </SpotlightCard>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Principles Section */}
            <section id="principles" className="py-24 bg-white relative overflow-hidden scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-6 tracking-tight">หลักการปฏิบัติงาน 3 ด้าน</h2>
                        <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {principles.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                            >
                                <SpotlightCard className="p-10 rounded-[2.5rem] bg-emerald-50/30 border border-emerald-50 flex flex-col h-full">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-emerald-50 mb-6">
                                        {p.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-4 font-heading">{p.title}</h4>
                                    <p className="text-slate-500 leading-relaxed font-medium">{p.text}</p>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-6 tracking-tight">Roadmap การคุ้มครองข้อมูล</h2>
                        <p className="text-slate-500 font-medium">ความมุ่งมั่นพัฒนาระบบอย่างต่อเนื่องตั้งแต่อดีตจนถึงปัจจุบัน</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 hidden md:block"></div>
                        {timeline.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative z-10 flex flex-col items-center md:items-start"
                            >
                                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-600/20 text-white">
                                    <Clock size={20} />
                                </div>
                                <div className="text-emerald-700 font-black text-2xl mb-1">{step.year}</div>
                                <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                                <p className="text-sm text-slate-500 text-center md:text-left leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PDPA Activities Section */}
            <section id="news" className="py-24 bg-white scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                        <div>
                            <span className="text-emerald-600 font-black tracking-[0.25em] uppercase text-xs mb-3 block">Updates & Activities</span>
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">กิจกรรมด้านการคุ้มครองข้อมูล</h2>
                        </div>
                        <Link href="/news?site=pdpa" className="flex items-center gap-2 px-6 py-3 glass border border-emerald-100 rounded-2xl text-emerald-700 font-bold hover:bg-emerald-50 transition-all">
                            ดูบทความทั้งหมด <ChevronRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-50 rounded-[2.5rem] animate-pulse"></div>)
                        ) : articles.length > 0 ? (
                            articles.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/news/${item.slug}`} className="block h-full">
                                        <SpotlightCard className="group flex flex-col glass rounded-[2.5rem] border border-white p-6 shadow-premium hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full">
                                            <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 self-start">
                                                News
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                                                <Calendar size={14} className="text-emerald-500" />
                                                {new Date(item.publishedAt).toLocaleDateString('th-TH')}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-6 flex-1 line-clamp-2">{item.title}</h3>
                                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                                อ่านรายละเอียด <ChevronRight size={14} />
                                            </div>
                                        </SpotlightCard>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center opacity-50">ไม่พบกิจกรรมในระบบ</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Documents Section */}
            <section id="documents" className="py-24 bg-[#f8fafc] scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-black font-heading text-slate-900 mb-6 tracking-tight">ศูนย์รวมเอกสาร PDPA</h2>
                            <p className="text-slate-500 leading-relaxed font-medium">ดาวน์โหลดเอกสารประกาศ นโยบาย และแบบฟอร์มเพื่อการใช้สิทธิสำหรับบุคลากรและประชาชนทั่วไป</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            [1, 2].map(i => <div key={i} className="h-24 bg-white rounded-2xl animate-pulse"></div>)
                        ) : documents.length > 0 ? (
                            documents.map((doc, i) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <a
                                        href={(doc.file?.url ? getStrapiMedia(doc.file.url) : undefined) ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <motion.div
                                            whileHover={{ x: 10 }}
                                            className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-200 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors uppercase text-sm tracking-tight">{doc.title}</h4>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">{doc.category} • {doc.year}</p>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                                                <Download size={18} />
                                            </div>
                                        </motion.div>
                                    </a>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center opacity-50">ไม่พบเอกสารในระบบ</div>
                        )}
                    </div>
                </div>
            </section>

            {/* DPO Contact Info */}
            <section className="py-24 bg-slate-900 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-20 opacity-10">
                    <Shield size={300} className="text-emerald-500" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-emerald-600 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left shadow-2xl shadow-emerald-600/20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 tracking-tighter">มีข้อสงสัยด้านข้อมูล?</h2>
                            <p className="text-emerald-50 text-xl font-medium leading-relaxed opacity-90">
                                คุณสามารถติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)
                                ของสำนักงานศาลปกครองได้โดยตรงผ่านช่องทางเจ้าหน้าทีเฉพาะกิจ หรือโทร 02-XXX-XXXX
                            </p>
                        </div>
                        <Link href="/#contact" className="px-12 py-5 bg-white text-emerald-600 font-black rounded-3xl shadow-2xl shadow-black/20 hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap">
                            ติดต่อเจ้าหน้าที่ DPO
                        </Link>
                    </div>
                </div>
            </section>

            {footer}
        </main>
    );
}
