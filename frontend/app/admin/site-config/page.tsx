"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, Globe, Megaphone, MapPin, Phone, Mail, Clock, LayoutTemplate, Search, Trash2 } from "lucide-react";

export default function AdminSiteConfigPage() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

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
        footerText: "",
        themeColors: {
            primary: "#0c1222",
            accent: "#2563eb"
        },
        navbarMenu: [] as any[],
        footerMenu: [] as any[],
        sectionToggles: {
            hero: true,
            policies: true,
            activities: true,
            downloads: true,
            news: true,
            documents: true
        }
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetchAPI("/site-configs", {
                    filters: { domain }
                });
                if (res.data && res.data.length > 0) {
                    const config = res.data[0];
                    setConfigId(config.documentId);
                    setFormData({
                        siteName: config.siteName || "",
                        announcement: config.announcement || "",
                        heroHeadline: config.heroHeadline || "",
                        heroSubheadline: config.heroSubheadline || "",
                        address: config.address || "",
                        phone: config.phone || "",
                        email: config.email || "",
                        officeHours: config.officeHours || "",
                        footerText: config.footerText || "",
                        themeColors: config.themeColors || { primary: "#0c1222", accent: "#2563eb" },
                        navbarMenu: config.navbarMenu || [],
                        footerMenu: config.footerMenu || [],
                        sectionToggles: config.sectionToggles || {
                            hero: true,
                            policies: true,
                            activities: true,
                            downloads: true,
                            news: true,
                            documents: true
                        }
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

    const handleColorChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            themeColors: { ...formData.themeColors, [name]: value }
        });
    };

    const handleAddMenuItem = (type: 'navbarMenu' | 'footerMenu') => {
        const newItem = { label: "เมนูใหม่", href: "/" };
        setFormData({
            ...formData,
            [type]: [...formData[type], newItem]
        });
    };

    const handleUpdateMenuItem = (type: 'navbarMenu' | 'footerMenu', index: number, field: string, value: string) => {
        const updatedMenu = [...formData[type]];
        updatedMenu[index] = { ...updatedMenu[index], [field]: value };
        setFormData({ ...formData, [type]: updatedMenu });
    };

    const handleRemoveMenuItem = (type: 'navbarMenu' | 'footerMenu', index: number) => {
        setFormData({
            ...formData,
            [type]: formData[type].filter((_, i) => i !== index)
        });
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
        <div className="max-w-4xl mx-auto pb-40">
            <div className="mb-8 font-sans">
                <h1 className="text-3xl font-black font-heading text-primary mb-2">ตั้งค่าเว็บไซต์</h1>
                <p className="text-gray-500">จัดการข้อมูลพื้นฐานและภาพลักษณ์ของเว็บไซต์ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section Toggles */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <LayoutTemplate size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">การแสดงผลวิดเจ็ต (Section Toggles)</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {Object.entries(formData.sectionToggles).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-sm font-bold text-gray-700 capitalize">{key}</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        sectionToggles: { ...formData.sectionToggles, [key]: !value }
                                    })}
                                    className={`w-10 h-5 rounded-full transition-all relative ${value ? 'bg-primary' : 'bg-gray-200'}`}
                                >
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${value ? 'right-0.5' : 'left-0.5'}`}></div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Branding & Theme */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                            <LayoutTemplate size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Branding & AI Theme</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 block">โทนสีหลัก (Primary Context)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={formData.themeColors.primary}
                                    onChange={(e) => handleColorChange('primary', e.target.value)}
                                    className="w-12 h-12 rounded-lg cursor-pointer border-none"
                                />
                                <input
                                    type="text"
                                    value={formData.themeColors.primary}
                                    onChange={(e) => handleColorChange('primary', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 block">สีเน้น (Accent Color)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={formData.themeColors.accent}
                                    onChange={(e) => handleColorChange('accent', e.target.value)}
                                    className="w-12 h-12 rounded-lg cursor-pointer border-none"
                                />
                                <input
                                    type="text"
                                    value={formData.themeColors.accent}
                                    onChange={(e) => handleColorChange('accent', e.target.value)}
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navbar Menu Management */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Search size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">จัดการเมนูนำทาง (Navbar)</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAddMenuItem('navbarMenu')}
                            className="text-xs font-bold text-primary px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            + เพิ่มเมนู
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.navbarMenu.length === 0 && <p className="text-center py-8 text-gray-400 italic text-sm">ยังไม่มีเมนู (จะใช้ค่าเริ่มต้นจากระบบ)</p>}
                        {formData.navbarMenu.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-50 group">
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="ชื่อเมนู"
                                        value={item.label}
                                        onChange={(e) => handleUpdateMenuItem('navbarMenu', index, 'label', e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold"
                                    />
                                    <input
                                        placeholder="ลิงก์ (e.g. /news)"
                                        value={item.href}
                                        onChange={(e) => handleUpdateMenuItem('navbarMenu', index, 'href', e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMenuItem('navbarMenu', index)}
                                    className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Menu Management */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                                <LayoutTemplate size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">จัดการเมนูท้ายเว็บ (Footer)</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAddMenuItem('footerMenu')}
                            className="text-xs font-bold text-primary px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            + เพิ่มเมนู
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.footerMenu.length === 0 && <p className="text-center py-8 text-gray-400 italic text-sm">ยังไม่มีเมนู (จะใช้ค่าเริ่มต้นจากระบบ)</p>}
                        {formData.footerMenu.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-50 group">
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="ชื่อเมนู"
                                        value={item.label}
                                        onChange={(e) => handleUpdateMenuItem('footerMenu', index, 'label', e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold"
                                    />
                                    <input
                                        placeholder="ลิงก์ (e.g. /pdpa)"
                                        value={item.href}
                                        onChange={(e) => handleUpdateMenuItem('footerMenu', index, 'href', e.target.value)}
                                        className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMenuItem('footerMenu', index)}
                                    className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

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
