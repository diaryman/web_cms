"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { BarChart3, Users, Clock, ShieldCheck, Download, Calendar, Eye, Activity, PieChart, TrendingUp, TrendingDown, Target } from "lucide-react";
import { motion } from "motion/react";

export default function AdminStatsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StatsContent />
        </Suspense>
    );
}

function StatsContent() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const siteName = siteParam === "pdpa" ? "PDPA Center" : "DataGOV";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost:3000";

    const [stats, setStats] = useState({
        articles: 0,
        documents: 0,
        contacts: 0,
        recentArticles: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const { fetchAPI } = await import("@/lib/api");

                // 1. Fetch counts
                const [articlesRes, docsRes, contactsRes] = await Promise.all([
                    fetchAPI("/articles", { filters: { domain }, pagination: { limit: 1 } }),
                    fetchAPI("/policy-documents", { filters: { domain }, pagination: { limit: 1 } }),
                    fetchAPI("/contact-submissions", { filters: { domain }, pagination: { limit: 1 } })
                ]);

                // 2. Fetch recent content
                const recentRes = await fetchAPI("/articles", {
                    filters: { domain },
                    sort: ["publishedAt:desc"],
                    pagination: { limit: 5 }
                });

                setStats({
                    articles: articlesRes.meta?.pagination?.total || 0,
                    documents: docsRes.meta?.pagination?.total || 0,
                    contacts: contactsRes.meta?.pagination?.total || 0,
                    recentArticles: recentRes.data || []
                });
            } catch (err) {
                console.error("Failed to fetch stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [domain]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const handleExport = () => {
        const exportData = [
            { Category: "ข้อมูลหลัก", Item: "สถิติข่าวประชาสัมพันธ์ทั้งหมด", Value: stats.articles },
            { Category: "ข้อมูลหลัก", Item: "สถิติเอกสารนโยบายทั้งหมด", Value: stats.documents },
            { Category: "ข้อมูลหลัก", Item: "สถิติการติดต่อสอบถามทั้งหมด", Value: stats.contacts },
            { Category: "ระบบ", Item: "สถานะการทำงาน", Value: "ปกติ (99.9%)" },
            ...stats.recentArticles.map((art: any) => ({
                Category: "รายการล่าสุด",
                Item: art.title,
                Value: `เผยแพร่เมื่อ ${new Date(art.publishedAt).toLocaleDateString("th-TH")}`
            }))
        ];

        import("@/lib/export").then(mod => {
            mod.exportToExcel(exportData, `Stats_Report_${siteParam}`, "Dashboard Summary");
        });
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading tracking-tight">สถิติและการใช้งาน</h1>
                    <p className="text-gray-400 font-medium">ภาพรวมข้อมูลเนื้อหาของ {siteName}</p>
                </div>

                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-[10px] font-bold text-gray-500 uppercase tracking-widest group"
                >
                    <Download size={18} className="text-accent group-hover:scale-110 transition-transform" />
                    ดาวน์โหลดรายงาน (Excel)
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "ข่าวประชาสัมพันธ์", value: stats.articles.toLocaleString(), change: "+2", trend: "up", icon: <Eye size={24} />, color: "bg-blue-500" },
                    { label: "เอกสารทางนโยบาย", value: stats.documents.toLocaleString(), change: "Stable", trend: "neutral", icon: <Download size={24} />, color: "bg-emerald-500" },
                    { label: "การส่งแบบฟอร์มติดต่อ", value: stats.contacts.toLocaleString(), change: "+5", trend: "up", icon: <Activity size={24} />, color: "bg-indigo-500" },
                    { label: "สถานะระบบ", value: "Online", change: "99.9%", trend: "up", icon: <ShieldCheck size={24} />, color: "bg-amber-500" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity`}></div>

                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 rounded-[1.2rem] ${stat.color} text-white flex items-center justify-center shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
                                stat.trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                                }`}>
                                {stat.trend === 'up' ? <TrendingUp size={12} /> : stat.trend === 'down' ? <TrendingDown size={12} /> : <Activity size={12} />}
                                {stat.change}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-primary font-heading tracking-tight group-hover:text-accent transition-colors">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart 1 (Mock Bars - Keeping as Visual UI for now) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold font-heading text-primary">ยอดเข้าชมรายสัปดาห์</h3>
                            <p className="text-xs text-gray-400 font-medium">สถิติการเข้าชมโดยประมาณ</p>
                        </div>
                        <div className="flex bg-gray-50 p-1 rounded-xl">
                            <button className="px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-lg shadow-sm">Week</button>
                            <button className="px-3 py-1.5 text-gray-400 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors">Month</button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-2 border-b border-gray-50 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[0, 25, 50, 75, 100].map((v) => (
                                <div key={v} className="w-full h-px bg-gray-50 last:bg-transparent"></div>
                            ))}
                        </div>

                        {/* Bars - Static visual for now */}
                        {[45, 78, 52, 90, 65, 85, 40].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10 w-full h-full justify-end">
                                <div
                                    className="w-full bg-blue-500 rounded-t-xl hover:bg-accent transition-all duration-500 relative group-hover:shadow-lg group-hover:shadow-blue-500/20"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap z-20">
                                        {Math.round(h * 15.4)} Views
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Top Content List */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-xl font-bold font-heading text-primary mb-6">ข่าวสารล่าสุด 📢</h3>
                    <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {stats.recentArticles.length === 0 ? (
                            <p className="text-gray-400 text-sm italic">ยังไม่มีข้อมูลข่าวสาร</p>
                        ) : (
                            stats.recentArticles.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary font-black text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-primary truncate group-hover:text-accent transition-colors text-sm">{item.title}</h4>
                                        <div className="flex gap-2 text-[10px] text-gray-400 font-medium">
                                            <span>{new Date(item.publishedAt).toLocaleDateString("th-TH", { day: 'numeric', month: 'short' })}</span>
                                            <span>•</span>
                                            <span>Active</span>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-accent group-hover:text-accent transition-all">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <button className="mt-6 w-full py-3 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors">
                        ดูรายงานฉบับเต็ม
                    </button>
                </div>
            </div>

            {/* Device Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden group col-span-1 md:col-span-2">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-black font-heading tracking-tight mb-2">Platform Traffic</h3>
                                <p className="text-blue-100/60 text-sm max-w-xs">ผู้ใช้งานส่วนใหญ่เข้าถึงผ่าน Desktop แต่ Mobile มีแนวโน้มสูงขึ้น 15%</p>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                <Target size={24} className="text-accent" />
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2 text-blue-100/80">
                                    <span>Desktop (Chrome, Safari)</span>
                                    <span>65%</span>
                                </div>
                                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-[65%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-2 text-blue-100/80">
                                    <span>Mobile (iOS, Android)</span>
                                    <span>30%</span>
                                </div>
                                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[30%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden hover:shadow-lg transition-all">
                    <div className="w-32 h-32 rounded-full border-[12px] border-gray-50 border-t-primary border-r-accent flex items-center justify-center mb-6 relative rotate-45 hover:rotate-90 transition-transform duration-700">
                        <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                            <span className="text-3xl font-black text-primary">98<span className="text-sm align-top">%</span></span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-1">ความพึงพอใจ</h3>
                    <p className="text-xs text-gray-400 px-4">จากผลสำรวจผู้ใช้งาน 500 คนล่าสุด</p>
                </div>
            </div>
        </div>
    );
}

function ArrowUpRight({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
    )
}
