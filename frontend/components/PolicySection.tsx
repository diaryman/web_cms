"use client";

import { ShieldCheck, Lock, CheckCircle, FileCheck, Award, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

interface Policy {
    id: number;
    title: string;
    description: string;
    icon: string;
    highlightValue?: string;
}

export default function PolicySection({ domain = "localhost" }: { domain?: string }) {
    const [policies, setPolicies] = useState<Policy[]>([]);
    // Default false — server and client start with same state (no loading skeleton during SSR)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        loadPolicies();
    }, [domain]);

    const loadPolicies = async () => {
        try {
            const res = await fetchAPI("/policies", {
                filters: { domain, isActive: true },
                sort: ["order:asc"],
                pagination: { pageSize: 4 }
            });
            setPolicies(res.data || []);
        } catch (error) {
            console.error("Error loading policies", error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (iconName: string) => {
        const icons: any = { ShieldCheck, Lock, CheckCircle, FileCheck, Award, Shield };
        return icons[iconName] || ShieldCheck;
    };

    // Fallback to default data if no policies
    const displayPolicies = policies.length > 0 ? policies : [
        { id: 1, title: "Data Privacy First", icon: "Lock", description: "" },
        { id: 2, title: "ISO/IEC 27001", icon: "CheckCircle", description: "" },
        { id: 3, title: "DGA Standards", icon: "FileCheck", description: "" },
        { id: 4, title: "Cyber Security Act", icon: "ShieldCheck", description: "" }
    ];

    return (
        <section id="policy" className="py-32 section-mixed relative overflow-hidden border-y border-gray-100 dark:border-white/5 scroll-mt-premium">
            {/* Abstract background shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full -skew-x-12 transform translate-x-1/4" style={{ backgroundColor: 'var(--accent-subtle)' }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[120px]" style={{ backgroundColor: 'var(--accent-glow)' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="font-black tracking-[0.3em] uppercase text-xs mb-4 block" style={{ color: 'var(--accent-color)' }}>มาตรฐานความปลอดภัย</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-8 leading-tight" style={{ color: 'var(--foreground)' }}>
                            มาตรฐานการจัดการข้อมูล <br />
                            <span style={{ color: 'var(--accent-color)' }}>ระดับสถาบัน</span>
                        </h2>
                        <p className="text-xl mb-10 leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                            เราใช้แนวทางปฏิบัติที่ดีที่สุด (Best Practices) และมาตรฐานสากลในการกำกับดูแลข้อมูล
                            เพื่อให้มั่นใจว่าข้อมูลทุกชุดได้รับการดูแลอย่างถูกต้อง มีคุณภาพ และพร้อมใช้งานเสมอ
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {displayPolicies.map((policy) => {
                                const IconComponent = getIcon(policy.icon);
                                return (
                                    <div
                                        key={policy.id}
                                        className="flex items-center gap-3 font-bold group"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:text-white transition-all" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                                            <IconComponent size={20} />
                                        </div>
                                        <span className="text-sm">{policy.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-0 relative">
                        <div className="relative z-10 p-8 rounded-[3rem] glass-dark border border-white/10 shadow-2xl backdrop-blur-2xl">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent-light)' }}>คะแนนความปลอดภัย</p>
                                        <p className="text-3xl font-black text-white">
                                            {policies.find(p => p.highlightValue)?.highlightValue || "99.9%"}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border-4" style={{ borderColor: 'var(--accent-subtle)', borderTopColor: 'var(--accent-color)', animation: 'spin 3s linear infinite' }}></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">ตรวจสอบตัวตนผู้ใช้งาน</p>
                                        <p className="text-xl font-bold text-white">ยืนยันแล้ว</p>
                                    </div>
                                    <div className="bg-accent/10 p-5 rounded-2xl border border-accent/20">
                                        <p className="text-[10px] text-accent font-bold uppercase mb-2">การเข้ารหัสข้อมูล</p>
                                        <p className="text-xl font-bold text-white">AES-256</p>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-4 bg-primary font-black rounded-2xl hover:bg-accent transition-all active:scale-95 shadow-xl premium-gradient"
                                    style={{ color: 'var(--primary-foreground)' }}
                                >
                                    ตรวจสอบใบรับรองมาตรฐาน
                                </button>
                            </div>
                        </div>

                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px]" style={{ backgroundColor: 'var(--accent-glow)' }}></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[60px]" style={{ backgroundColor: 'var(--accent-glow)' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
