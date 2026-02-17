"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, Globe, Megaphone, MapPin, Phone, Mail, Clock, LayoutTemplate } from "lucide-react";

export default function AdminSiteConfigPage() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost:3000";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [configId, setConfigId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        siteName: "",
        announcement: "",
        heroHeadline: "",
        heroSubheadline: "",
        address: "",
        phone: "",
        email: "",
        officeHours: "",
        footerText: ""
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetchAPI("/site-configs", {
                    filters: { domain }
                });
                if (res.data && res.data.length > 0) {
                    const config = res.data[0];
                    setConfigId(config.documentId); // Use documentId for v5
                    setFormData({
                        siteName: config.siteName || "",
                        announcement: config.announcement || "",
                        heroHeadline: config.heroHeadline || "",
                        heroSubheadline: config.heroSubheadline || "",
                        address: config.address || "",
                        phone: config.phone || "",
                        email: config.email || "",
                        officeHours: config.officeHours || "",
                        footerText: config.footerText || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching config", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, [domain]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!configId) return;

        setSaving(true);
        try {
            await fetchAPI(`/site-configs/${configId}`, {}, {
                method: "PUT",
                body: JSON.stringify({ data: formData })
            });
            alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        } catch (error) {
            console.error("Error saving config", error);
            alert("เกิดข้อผิดพลาดในการบันทึก");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={32} /></div>;
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-black font-heading text-primary mb-2">ตั้งค่าเว็บไซต์</h1>
                <p className="text-gray-500">จัดการข้อมูลพื้นฐานของเว็บไซต์ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Info */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">ข้อมูลทั่วไป</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ชื่อเว็บไซต์</label>
                            <input
                                name="siteName"
                                value={formData.siteName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="ชื่อเว็บไซต์..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ข้อความ Footer</label>
                            <input
                                name="footerText"
                                value={formData.footerText}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="Copyright..."
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Megaphone size={14} className="text-accent" />
                                <label className="text-sm font-bold text-gray-700">ประกาศตัววิ่ง (Announcement)</label>
                            </div>
                            <input
                                name="announcement"
                                value={formData.announcement}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="ประกาศสำคัญ..."
                            />
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <LayoutTemplate size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">ส่วนหัวของหน้าแรก (Hero Banner)</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">หัวข้อหลัก (Headline)</label>
                            <textarea
                                name="heroHeadline"
                                value={formData.heroHeadline}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-heading font-bold text-lg"
                                placeholder="ข้อความหัวข้อหลัก..."
                            />
                            <p className="text-[10px] text-gray-400">รองรับการขึ้นบรรทัดใหม่</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">คำโปรยรอง (Subheadline)</label>
                            <textarea
                                name="heroSubheadline"
                                value={formData.heroSubheadline}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-500"
                                placeholder="ข้อความอธิบายเพิ่มเติม..."
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <MapPin size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">ข้อมูลติดต่อ</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700">ที่อยู่ติดต่อ</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="ที่อยู่..."
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Phone size={14} className="text-gray-400" />
                                <label className="text-sm font-bold text-gray-700">เบอร์โทรศัพท์</label>
                            </div>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="0 2xxx xxxx"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Mail size={14} className="text-gray-400" />
                                <label className="text-sm font-bold text-gray-700">อีเมล</label>
                            </div>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock size={14} className="text-gray-400" />
                                <label className="text-sm font-bold text-gray-700">เวลาทำการ</label>
                            </div>
                            <textarea
                                name="officeHours"
                                value={formData.officeHours}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                placeholder="วันจันทร์ - ศุกร์..."
                            />
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="fixed bottom-0 left-0 md:left-72 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-end gap-4 z-40">
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        onClick={() => window.history.back()}
                    >
                        ยกเลิก
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        บันทึกการเปลี่ยนแปลง
                    </button>
                </div>
            </form>
        </div>
    );
}
