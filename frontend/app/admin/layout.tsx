"use client";

import { LayoutDashboard, FileText, ShieldCheck, Settings, Bell, BarChart3, MessageSquare, History, User, LogOut, Search, ChevronRight, Menu, X, LayoutTemplate, Plus, HelpCircle, FolderTree, Mail, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { checkAuthAction, logoutAction } from "@/app/actions/auth";
import AdminNotificationBell from "@/components/AdminNotificationBell";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </Suspense>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const siteName = siteParam === "pdpa" ? "PDPA Center" : "DataGOV";
    const homeLink = siteParam === "pdpa" ? "/pdpa" : "/";
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await checkAuthAction(siteParam);
            setIsAuthorized(auth);
        };

        checkAuth();

        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener('admin-auth-change', handleAuthChange);
        return () => {
            window.removeEventListener('admin-auth-change', handleAuthChange);
        };
    }, [siteParam]);

    const pathname = usePathname();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "แดชบอร์ด", href: `/admin`, path: `/admin` },
        { icon: <Settings size={20} />, label: "ตั้งค่าเว็บไซต์", href: `/admin/site-config`, path: `/admin/site-config` },
        { icon: <FolderTree size={20} />, label: "จัดการหมวดหมู่", href: `/admin/categories`, path: `/admin/categories` },
        { icon: <ShieldCheck size={20} />, label: "จุดเด่น/หลักการ", href: `/admin/features`, path: `/admin/features` },
        { icon: <FileText size={20} />, label: "นโยบายและมาตรฐาน", href: `/admin/policies`, path: `/admin/policies` },
        { icon: <FileText size={20} />, label: "บริการและดาวน์โหลด", href: `/admin/services`, path: `/admin/services` },
        { icon: <FileText size={20} />, label: "ข่าวสาร/กิจกรรม", href: `/admin/news`, path: `/admin/news` },
        { icon: <FileText size={20} />, label: "นโยบาย/เอกสาร", href: `/admin/documents`, path: `/admin/documents` },
        { icon: <Bell size={20} />, label: "ข้อความติดต่อ", href: `/admin/contacts`, path: `/admin/contacts` },
        { icon: <BarChart3 size={20} />, label: "สถิติและการใช้งาน", href: `/admin/stats`, path: `/admin/stats` },
        { icon: <MessageSquare size={20} />, label: "ตั้งค่าแชทบอท", href: `/admin/chatbot`, path: `/admin/chatbot` },
        { icon: <Mail size={20} />, label: "จัดการ Newsletter", href: `/admin/newsletter`, path: `/admin/newsletter` },
        { icon: <ImageIcon size={20} />, label: "จัดการแกลเลอรี่ลูกเล่น", href: `/admin/galleries`, path: `/admin/galleries` },
        { icon: <LayoutTemplate size={20} />, label: "จัดการสไลด์หน้าแรก", href: `/admin/hero-slides`, path: `/admin/hero-slides` },
        { icon: <History size={20} />, label: "ประวัติการใช้งาน", href: `/admin/logs`, path: `/admin/logs` },
    ];

    if (isAuthorized === null) {
        return <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center"><p className="text-gray-400 font-bold">กำลังตรวจสอบสิทธิ์...</p></div>;
    }

    if (isAuthorized === false) {
        return <div className="min-h-screen bg-[#f8fafc]">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-50">
                {/* Accent top strip — reflects the active site theme */}
                <div className="h-1 w-full" style={{ background: "linear-gradient(to right, var(--primary-color), var(--accent-color))" }} />
                <div className="p-8">
                    <Link href={homeLink} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg" style={{ background: "var(--primary-color)" }}>
                            <ShieldCheck size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-black text-xl tracking-tighter leading-none" style={{ color: "var(--primary-color)" }}>{siteName}</span>
                            <span className="text-[8px] uppercase font-bold tracking-[0.2em]" style={{ color: "var(--accent-color)" }}>ระบบจัดการเนื้อหา</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4 custom-scrollbar">
                    <div className="mb-4 px-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">เมนูหลัก</p>
                    </div>
                    {menuItems.map((item) => {
                        const isActive = item.path === '/admin'
                            ? pathname === '/admin'
                            : pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.label}
                                href={`${item.href}?site=${siteParam}`}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                                    }`}
                            >
                                <span className={isActive ? "text-accent" : "text-gray-400 group-hover:text-primary transition-colors"}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-gray-50 space-y-4">
                    <div className="p-4 rounded-2xl border" style={{ background: "var(--accent-subtle)", borderColor: "var(--accent-glow)" }}>
                        <div className="flex items-center gap-2 mb-2">
                            <HelpCircle size={16} style={{ color: "var(--accent-color)" }} />
                            <p className="text-xs font-bold" style={{ color: "var(--primary-color)" }}>ศูนย์ช่วยเหลือและคู่มือ</p>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-relaxed mb-3">ตรวจสอบคู่มือการใช้งานระบบจัดการข้อมูลธรรมาภิบาล</p>
                        <button
                            className="w-full py-2 bg-white text-[10px] font-bold rounded-xl border transition-colors"
                            style={{ color: "var(--primary-color)", borderColor: "var(--accent-glow)" }}
                        >
                            ดูคู่มือการใช้งาน
                        </button>
                    </div>

                    <button
                        onClick={async () => {
                            await logoutAction(siteParam);
                            window.dispatchEvent(new Event('admin-auth-change'));
                            window.location.href = `${pathname}?site=${siteParam}`;
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                        ออกจากระบบ
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-72">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("site", "main");
                                    window.location.href = `${pathname}?${params.toString()}`;
                                }}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${siteParam === "main"
                                    ? "bg-white text-primary shadow-sm border border-gray-100"
                                    : "text-gray-400 hover:text-primary"
                                    }`}
                            >
                                DataGOV
                            </button>
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("site", "pdpa");
                                    window.location.href = `${pathname}?${params.toString()}`;
                                }}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${siteParam === "pdpa"
                                    ? "bg-white text-primary shadow-sm border border-gray-100"
                                    : "text-gray-400 hover:text-primary"
                                    }`}
                            >
                                PDPA
                            </button>
                        </div>
                        <div className="h-4 w-px bg-gray-200 mx-2"></div>
                        <h2 className="text-sm font-bold text-primary font-heading uppercase tracking-widest">
                            {siteName} แดชบอร์ด
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <AdminNotificationBell siteParam={siteParam} />

                        <div className="h-8 w-px bg-gray-100"></div>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right flex flex-col">
                                <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors leading-none">ผู้ดูแลระบบ</span>
                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">System Admin</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-primary group-hover:border-accent transition-all overflow-hidden">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
