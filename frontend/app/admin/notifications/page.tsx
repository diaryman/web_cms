"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Bell, Info, AlertTriangle, CheckCircle, Clock, Trash2, Settings, MoreHorizontal } from "lucide-react";

export default function AdminNotificationsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotificationsContent />
        </Suspense>
    );
}

function NotificationsContent() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const siteName = siteParam === "pdpa" ? "PDPA Center" : "DataGOV";

    // Mock Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, type: "info", title: "ระบบสำรองข้อมูลเสร็จสิ้น", message: "การสำรองข้อมูลประจำวันเสร็จสิ้นสมบูรณ์เมื่อเวลา 03:00 น.", time: "2 ชม. ที่แล้ว", read: false },
        { id: 2, type: "warning", title: "มีการพยายามเข้าสู่ระบบที่น่าสงสัย", message: "ตรวจพบการเข้าสู่ระบบจาก IP 192.168.1.55 ที่ไม่รู้จัก", time: "5 ชม. ที่แล้ว", read: false },
        { id: 3, type: "success", title: "อัปเดตบทความสำเร็จ", message: "บทความ 'นโยบายข้อมูล 2568' ถูกเผยแพร่แล้ว", time: "1 วันที่แล้ว", read: true },
        { id: 4, type: "info", title: "รายงานประจำสัปดาห์พร้อมแล้ว", message: "คุณสามารถดาวน์โหลดรายงานสรุปการใช้งานได้ที่หน้าสถิติ", time: "2 วันที่แล้ว", read: true },
        { id: 5, type: "alert", title: "พื้นที่จัดเก็บเหลือน้อย", message: "พื้นที่จัดเก็บไฟล์ของคุณเหลือต่ำกว่า 10% กรุณาตรวจสอบ", time: "3 วันที่แล้ว", read: true },
    ]);

    const handleMarkAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleDelete = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading tracking-tight">การแจ้งเตือน</h1>
                    <p className="text-gray-400 font-medium">ศูนย์รวมข่าวสารและการแจ้งเตือนระบบสำหรับ {siteName}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllRead}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs text-primary hover:bg-gray-50 transition-all shadow-sm"
                    >
                        อ่านทั้งหมดแล้ว
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs text-gray-400 hover:text-primary hover:bg-gray-50 transition-all shadow-sm">
                        <Settings size={16} />
                    </button>
                </div>
            </div>

            {/* Notification List */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-6 hover:bg-gray-50 transition-colors group relative ${notif.read ? 'opacity-70' : ''}`}
                                style={!notif.read ? { background: 'var(--accent-subtle)' } : {}}
                            >
                                <div className="flex items-start gap-4 pr-10">
                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm"
                                        style={notif.type === 'info' ? { background: 'var(--accent-subtle)', color: 'var(--accent-color)' } :
                                            notif.type === 'success' ? { background: 'var(--accent-subtle)', color: 'var(--accent-color)' } :
                                                notif.type === 'warning' ? { background: 'rgba(245,158,11,0.08)', color: '#f59e0b' } :
                                                    { background: 'rgba(244,63,94,0.07)', color: '#f43f5e' }}
                                    >
                                        {notif.type === 'info' ? <Info size={24} /> :
                                            notif.type === 'warning' ? <AlertTriangle size={24} /> :
                                                notif.type === 'success' ? <CheckCircle size={24} /> :
                                                    <Bell size={24} />}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-bold text-primary text-base ${!notif.read && 'font-black'}`}>{notif.title}</h3>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 whitespace-nowrap">
                                                <Clock size={12} /> {notif.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">{notif.message}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-1 rounded-xl backdrop-blur-sm shadow-sm md:opacity-100 md:bg-transparent md:shadow-none">
                                    {!notif.read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notif.id)}
                                            className="p-2 text-primary rounded-lg transition-colors hover:opacity-70"
                                            title="Mark as read"
                                        >
                                            <CheckCircle size={16} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notif.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {!notif.read && (
                                    <div className="absolute top-1/2 -translate-y-1/2 left-2 w-1.5 h-1.5 bg-accent rounded-full"></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <Bell size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400 font-heading">ไม่มีการแจ้งเตือน</h3>
                            <p className="text-sm text-gray-300 mt-2">คุณอ่านการแจ้งเตือนทั้งหมดแล้ว</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
