"use client";

import {
    BarChart3,
    Users,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    ShieldCheck,
    Zap,
    MoreHorizontal,
    Plus,
    Loader2,
    RefreshCw
} from "lucide-react";
import { Suspense } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { STRAPI_URL } from "@/lib/api";

interface DashboardStats {
    newsCount: number;
    documentsCount: number;
    policiesCount: number;
    servicesCount: number;
    featuresCount: number;
    contactsCount: number;
}

interface RecentItem {
    id: number;
    documentId: string;
    title: string;
    type: string;
    status: string;
    publishedAt?: string;
    createdAt?: string;
}

export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}

function DashboardContent() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
    const [loadingStats, setLoadingStats] = useState(true);

    const siteName = siteParam === "pdpa" ? "PDPA Center" : "DataGOV";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost:3000";

    // Dynamic greeting based on time
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "สวัสดีตอนเช้า";
        if (hour < 17) return "สวัสดีตอนบ่าย";
        return "สวัสดีตอนเย็น";
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            const auth = sessionStorage.getItem(`admin_auth_${siteParam}`);
            if (auth === "true") {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        window.addEventListener('admin-auth-change', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('admin-auth-change', checkAuth);
        };
    }, [siteParam]);

    // Fetch real stats from Strapi
    useEffect(() => {
        if (!isAuthorized) return;
        fetchDashboardData();
    }, [isAuthorized, domain]);

    const fetchDashboardData = async () => {
        setLoadingStats(true);
        try {
            const headers: Record<string, string> = { "Content-Type": "application/json" };

            // Fetch all counts in parallel
            const [articlesRes, docsRes, policiesRes, servicesRes, featuresRes, contactsRes] = await Promise.all([
                fetch(`${STRAPI_URL}/api/articles?filters[domain][$eq]=${domain}&pagination[pageSize]=1&pagination[withCount]=true`).then(r => r.json()).catch(() => ({ meta: { pagination: { total: 0 } } })),
                fetch(`${STRAPI_URL}/api/policy-documents?filters[domain][$eq]=${domain}&pagination[pageSize]=1&pagination[withCount]=true`).then(r => r.json()).catch(() => ({ meta: { pagination: { total: 0 } } })),
                fetch(`${STRAPI_URL}/api/policies?filters[domain][$eq]=${domain}&pagination[pageSize]=1&pagination[withCount]=true`).then(r => r.json()).catch(() => ({ meta: { pagination: { total: 0 } } })),
                fetch(`${STRAPI_URL}/api/services?filters[domain][$eq]=${domain}&pagination[pageSize]=1&pagination[withCount]=true`).then(r => r.json()).catch(() => ({ meta: { pagination: { total: 0 } } })),
                fetch(`${STRAPI_URL}/api/features?filters[domain][$eq]=${domain}&pagination[pageSize]=1&pagination[withCount]=true`).then(r => r.json()).catch(() => ({ meta: { pagination: { total: 0 } } })),
                fetch(`${STRAPI_URL}/api/contact-submissions?filters[domain][$eq]=${domain}&pagination[pageSize]=1&pagination[withCount]=true`).then(r => r.json()).catch(() => ({ meta: { pagination: { total: 0 } } })),
            ]);

            setStats({
                newsCount: articlesRes?.meta?.pagination?.total || 0,
                documentsCount: docsRes?.meta?.pagination?.total || 0,
                policiesCount: policiesRes?.meta?.pagination?.total || 0,
                servicesCount: servicesRes?.meta?.pagination?.total || 0,
                featuresCount: featuresRes?.meta?.pagination?.total || 0,
                contactsCount: contactsRes?.meta?.pagination?.total || 0,
            });

            // Fetch recent articles and documents for the activity table
            const [recentArticles, recentDocs] = await Promise.all([
                fetch(`${STRAPI_URL}/api/articles?filters[domain][$eq]=${domain}&sort=publishedAt:desc&pagination[pageSize]=3&populate=category`).then(r => r.json()).catch(() => ({ data: [] })),
                fetch(`${STRAPI_URL}/api/policy-documents?filters[domain][$eq]=${domain}&sort=createdAt:desc&pagination[pageSize]=3`).then(r => r.json()).catch(() => ({ data: [] })),
            ]);

            const items: RecentItem[] = [];

            // Add articles
            (recentArticles?.data || []).forEach((a: any) => {
                items.push({
                    id: a.id,
                    documentId: a.documentId,
                    title: a.title,
                    type: a.category?.name || "News",
                    status: "Published",
                    publishedAt: a.publishedAt,
                    createdAt: a.createdAt,
                });
            });

            // Add documents
            (recentDocs?.data || []).forEach((d: any) => {
                items.push({
                    id: d.id,
                    documentId: d.documentId,
                    title: d.title,
                    type: "Document",
                    status: "Published",
                    publishedAt: d.publishedAt,
                    createdAt: d.createdAt,
                });
            });

            // Sort by date
            items.sort((a, b) => {
                const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
                const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
                return dateB - dateA;
            });

            setRecentItems(items.slice(0, 5));
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoadingStats(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = siteParam === "pdpa" ? "PDPA1234" : "Admin1234";

        if (password === correctPassword) {
            sessionStorage.setItem(`admin_auth_${siteParam}`, "true");
            window.dispatchEvent(new Event('admin-auth-change'));
            setIsAuthorized(true);
            setError("");
        } else {
            setError("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
        }
    };

    // Helper to format relative time
    const formatRelativeTime = (dateStr?: string) => {
        if (!dateStr) return "ไม่ทราบ";
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "เมื่อสักครู่";
        if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
        if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
        if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
        return date.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
    };

    if (!isAuthorized) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto mb-8">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-primary font-heading mb-2">เข้าสู่ระบบจัดการ {siteName}</h2>
                    <p className="text-gray-400 text-sm mb-8 font-medium">กรุณาใส่รหัสผ่านเพื่อเข้าถึงส่วนควบคุมของระบบ</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="ใส่รหัสผ่านที่นี่..."
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-center font-bold tracking-widest placeholder:tracking-normal placeholder:font-medium"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs font-bold animate-shake">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-premium hover:bg-accent transition-all active:scale-95"
                        >
                            ยืนยันตัวตน
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const statCards = stats ? [
        { label: "ข่าวสารทั้งหมด", value: String(stats.newsCount), icon: <FileText size={20} />, color: "bg-blue-500" },
        { label: "เอกสารนโยบาย", value: String(stats.documentsCount), icon: <ShieldCheck size={20} />, color: "bg-indigo-500" },
        { label: "นโยบาย/มาตรฐาน", value: String(stats.policiesCount), icon: <ShieldCheck size={20} />, color: "bg-cyan-500" },
        { label: "บริการ/ดาวน์โหลด", value: String(stats.servicesCount), icon: <Zap size={20} />, color: "bg-amber-500" },
    ] : [];

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading tracking-tight">{greeting}, แอดมิน {siteName} 👋</h1>
                    <p className="text-gray-400 font-medium">นี่คือภาพรวมของระบบและกิจกรรมล่าสุดของ {siteName} ในวันนี้</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchDashboardData}
                        className="px-4 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-primary hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
                        title="รีเฟรชข้อมูล"
                    >
                        <RefreshCw size={16} className={loadingStats ? "animate-spin" : ""} /> รีเฟรช
                    </button>
                    <Link href={`/admin/news/new?site=${siteParam}`} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm flex items-center gap-2 shadow-premium hover:bg-accent transition-all active:scale-95">
                        <Plus size={18} /> สร้างเนื้อหาใหม่
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            {loadingStats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm animate-pulse">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-200"></div>
                                <div className="w-12 h-5 bg-gray-100 rounded-lg"></div>
                            </div>
                            <div className="w-24 h-3 bg-gray-100 rounded mb-2"></div>
                            <div className="w-16 h-8 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-600">
                                    <span>จาก API</span>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-primary font-heading">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Additional mini stats */}
            {stats && !loadingStats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">จุดเด่น/หลักการ</p>
                        <p className="text-2xl font-black text-primary mt-1">{stats.featuresCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ข้อความติดต่อ</p>
                        <p className="text-2xl font-black text-primary mt-1">{stats.contactsCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">เนื้อหาทั้งหมด</p>
                        <p className="text-2xl font-black text-primary mt-1">{stats.newsCount + stats.documentsCount + stats.policiesCount + stats.servicesCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">สถานะระบบ</p>
                        <p className="text-2xl font-black text-emerald-500 mt-1">Online</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Table Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-xl font-bold font-heading text-primary">เนื้อหาล่าสุด</h3>
                            <Link href={`/admin/news?site=${siteParam}`} className="text-accent font-bold text-sm hover:underline">ดูทั้งหมด</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">หัวข้อ</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">ประเภท</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">สถานะ</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">วันที่</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loadingStats ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <tr key={i}>
                                                <td className="px-8 py-5"><div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                                                <td className="px-8 py-5"><div className="h-4 bg-gray-100 rounded w-16 animate-pulse"></div></td>
                                                <td className="px-8 py-5"><div className="h-4 bg-gray-100 rounded w-16 animate-pulse"></div></td>
                                                <td className="px-8 py-5"><div className="h-4 bg-gray-100 rounded w-20 animate-pulse"></div></td>
                                            </tr>
                                        ))
                                    ) : recentItems.length > 0 ? (
                                        recentItems.map((item) => (
                                            <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <p className="font-bold text-primary group-hover:text-accent transition-colors truncate max-w-[280px]">{item.title}</p>
                                                    <p className="text-[10px] text-gray-400 mt-0.5">โดย Admin</p>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold">{item.type}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        <span className="text-[10px] font-bold text-emerald-600">{item.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-[10px] font-bold text-gray-400">{formatRelativeTime(item.publishedAt || item.createdAt)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">ยังไม่มีเนื้อหาในระบบ</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    {/* Data Quality Visualization */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold font-heading text-primary mb-6">คุณภาพข้อมูลสถาบัน</h3>
                        <div className="flex items-end justify-between h-40 gap-2 mb-4">
                            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 1 + (i * 0.1), duration: 1 }}
                                    className="flex-1 bg-blue-50 hover:bg-accent rounded-t-xl transition-colors relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>

                    {/* System Health Card */}
                    <div className="bg-primary p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-all"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent">
                                    <ShieldCheck size={28} />
                                </div>
                                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-bold border border-emerald-500/20">Active</span>
                            </div>
                            <h4 className="text-xl font-bold font-heading text-white mb-2">ความปลอดภัยของระบบ</h4>
                            <p className="text-sm text-blue-100/60 leading-relaxed mb-6">ระบบทำงานปกติ ข้อมูลทั้งหมดถูกเข้ารหัสในระดับสูงสุด</p>
                            <div className="mt-auto">
                                <div className="flex justify-between text-[10px] font-bold text-blue-200 uppercase mb-2">
                                    <span>Health Score</span>
                                    <span>98%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "98%" }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-accent"
                                    ></motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Summary */}
                    {stats && !loadingStats && (
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                            <h3 className="text-lg font-bold font-heading text-primary mb-6 flex items-center justify-between">
                                สรุปเนื้อหา <Clock size={16} className="text-gray-300" />
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: "ข่าวสาร/กิจกรรม", count: stats.newsCount, color: "bg-blue-500", href: `/admin/news?site=${siteParam}` },
                                    { label: "เอกสารนโยบาย", count: stats.documentsCount, color: "bg-indigo-500", href: `/admin/documents?site=${siteParam}` },
                                    { label: "นโยบาย/มาตรฐาน", count: stats.policiesCount, color: "bg-cyan-500", href: `/admin/policies?site=${siteParam}` },
                                    { label: "บริการ/ดาวน์โหลด", count: stats.servicesCount, color: "bg-amber-500", href: `/admin/services?site=${siteParam}` },
                                    { label: "จุดเด่น/หลักการ", count: stats.featuresCount, color: "bg-emerald-500", href: `/admin/features?site=${siteParam}` },
                                ].map((item, i) => (
                                    <Link key={i} href={item.href} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors -mx-2">
                                        <div className={`w-2 h-8 rounded-full ${item.color}`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{item.label}</p>
                                        </div>
                                        <span className="text-lg font-black text-primary">{item.count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
