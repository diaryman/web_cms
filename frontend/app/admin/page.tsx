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
    Plus
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminDashboard() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const siteName = siteParam === "pdpa" ? "PDPA Center" : "DataGOV";

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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password check: Admin1234 for main, PDPA1234 for pdpa
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

    const stats = [
        { label: "ข่าวสารทั้งหมด", value: "24", change: "+12%", trend: "up", icon: <FileText size={20} />, color: "bg-blue-500" },
        { label: "เอกสารนโยบาย", value: "12", change: "+2", trend: "up", icon: <ShieldCheck size={20} />, color: "bg-indigo-500" },
        { label: "จำนวนผู้เข้าชม", value: "1,284", change: "-3%", trend: "down", icon: <Users size={20} />, color: "bg-cyan-500" },
        { label: "ความเร็วระบบ", value: "98/100", change: "Stable", trend: "neutral", icon: <Zap size={20} />, color: "bg-amber-500" },
    ];

    const recentActivity = [
        { id: 1, title: "ประกาศมาตรฐานข้อมูลปี 2569", type: "Document", author: "Admin", status: "Published", date: "2 ชั่วโมงที่แล้ว" },
        { id: 2, title: "สรุปผลการประชุมธรรมาภิบาลข้อมูล", type: "News", author: "Admin", status: "Published", date: "5 ชั่วโมงที่แล้ว" },
        { id: 3, title: "แนวทาง PDPA สำหรับสำนักงาน", type: "Policy", author: "Editor", status: "Draft", date: "1 วันที่แล้ว" },
        { id: 4, title: "ภาพกิจกรรมสัมมนาธรรมาภิบาล", type: "News", author: "Admin", status: "Published", date: "2 วันที่แล้ว" },
    ];

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading tracking-tight">สวัสดีตอนบ่าย, แอดมิน {siteName} 👋</h1>
                    <p className="text-gray-400 font-medium">นี่คือภาพรวมของระบบและกิจกรรมล่าสุดของ {siteName} ในวันนี้</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-primary hover:bg-gray-50 transition-all shadow-sm">
                        ส่งออกรายงาน
                    </button>
                    <Link href={`/admin/news/new?site=${siteParam}`} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm flex items-center gap-2 shadow-premium hover:bg-accent transition-all active:scale-95">
                        <Plus size={18} /> สร้างเนื้อหาใหม่
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
                                stat.trend === 'down' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={12} /> :
                                    stat.trend === 'down' ? <ArrowDownRight size={12} /> : null}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-primary font-heading">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Table Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-xl font-bold font-heading text-primary">เนื้อหาล่าสุด</h3>
                            <button className="text-accent font-bold text-sm hover:underline">ดูทั้งหมด</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">หัวข้อ</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">ประเภท</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">สถานะ</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">วันที่</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentActivity.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <p className="font-bold text-primary group-hover:text-accent transition-colors truncate max-w-[200px]">{item.title}</p>
                                                <p className="text-[10px] text-gray-400 mt-0.5">โดย {item.author}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold">{item.type}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                    <span className={`text-[10px] font-bold ${item.status === 'Published' ? 'text-emerald-600' : 'text-amber-600'}`}>{item.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-[10px] font-bold text-gray-400">{item.date}</td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 text-gray-300 hover:text-primary transition-colors">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
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
                            <p className="text-sm text-blue-100/60 leading-relaxed mb-6">ระบล็อกการโจมตีไปแล้ว 2 ครั้งใน 24 ชั่วโมงที่ผ่านมา ข้อมูลทั้งหมดถูกเข้ารหัสในระดับสูงสุด</p>
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

                    {/* Activity Timeline */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold font-heading text-primary mb-6 flex items-center justify-between">
                            ความเคลื่อนไหวล่าสุด <Clock size={16} className="text-gray-300" />
                        </h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-gray-50 before:h-full">
                            {[
                                { user: "Admin", action: "อัปเดต", target: "นโยบายปี 2569", time: "2 ชม. ที่แล้ว", color: "bg-blue-500" },
                                { user: "Editor", action: "ลบ", target: "ข่าวทดสอบ", time: "4 ชม. ที่แล้ว", color: "bg-red-500" },
                                { user: "Admin", action: "เพิ่ม", target: "ข่าวประชาสัมพันธ์", time: "5 ชม. ที่แล้ว", color: "bg-emerald-500" },
                            ].map((act, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`w-6 h-6 rounded-full ${act.color} ring-4 ring-white flex-shrink-0`}></div>
                                    <div>
                                        <p className="text-xs font-bold text-primary leading-tight"><span className="text-accent">{act.user}</span> {act.action} {act.target}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-8 py-3 w-full bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all">
                            ดูบันทึกเหตุการณ์ทั้งหมด
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
