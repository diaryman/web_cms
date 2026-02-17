"use client";

import Link from "next/link";
import { Download, FileText, ChevronRight, Package, Wrench } from "lucide-react";
import { fetchAPI } from "@/lib/api";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

export default function DownloadsSection({ domain = "localhost:3000" }: { domain?: string }) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [domain]);

    const load = async () => {
        try {
            const { data } = await fetchAPI("/services", {
                filters: {
                    domain,
                    isActive: true
                },
                sort: ["order:asc"],
                pagination: { pageSize: 6 }
            });
            setServices(data || []);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (iconName: string) => {
        const icons: any = { Download, Package, Wrench, FileText };
        return icons[iconName] || Download;
    };

    const getColor = (cat: string) => {
        if (cat === 'download') return { color: "text-blue-500", bg: "bg-blue-50" };
        if (cat === 'service') return { color: "text-emerald-500", bg: "bg-emerald-50" };
        if (cat === 'tool') return { color: "text-purple-500", bg: "bg-purple-50" };
        return { color: "text-indigo-500", bg: "bg-indigo-50" };
    };

    // Fallback data if no services
    const displayServices = services.length > 0 ? services : [
        { id: 1, title: "คู่มือการใช้งาน DataGOV", category: "download", icon: "Download", link: "#" },
        { id: 2, title: "แนวทางการจัดการข้อมูล", category: "download", icon: "FileText", link: "#" },
        { id: 3, title: "เครื่องมือตรวจสอบคุณภาพข้อมูล", category: "tool", icon: "Wrench", link: "#" }
    ];

    return (
        <section id="downloads" className="py-24 section-white border-t border-gray-100 scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        บริการและเอกสารดาวน์โหลด
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xl font-light"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        เครื่องมือและคู่มือสำหรับการบริหารจัดการข้อมูล
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {displayServices.map((service, index) => {
                        const { color, bg } = getColor(service.category);
                        const IconComponent = getIcon(service.icon);
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <SpotlightCard>
                                    <div className="p-6">
                                        <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                                            <IconComponent className={color} size={24} />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 line-clamp-2" style={{ color: 'var(--foreground)' }}>
                                            {service.title}
                                        </h3>
                                        {service.description && (
                                            <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                                                {service.description.replace(/<[^>]*>/g, '')}
                                            </p>
                                        )}
                                        {service.link && (
                                            <Link
                                                href={service.link}
                                                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:gap-3 transition-all group"
                                            >
                                                <span>{service.category === 'download' ? 'ดาวน์โหลด' : 'เข้าใช้งาน'}</span>
                                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center"
                >
                    <Link
                        href="/documents"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-accent hover:gap-3 transition-all shadow-premium active:scale-95"
                    >
                        ดูเอกสารทั้งหมด
                        <ChevronRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
