"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, Globe, Megaphone, MapPin, Phone, Mail, Clock, LayoutTemplate, Search, Trash2, CheckCircle2, Zap, Plus, BarChart3, Shield, FileText, HelpCircle } from "lucide-react";

/* ─── Theme Template Presets ──────────────────────────────────────────────── */
type ThemeTemplate = {
    id: string;
    name: string;
    style: string; // style tag shown on the card
    desc: string;
    colors: { primary: string; accent: string; surface?: string; text?: string };
    preview: React.ReactNode;
};

// ── DataGOV Templates ──────────────────────────────────────────────────────
const DATAGOV_TEMPLATES: ThemeTemplate[] = [
    {
        id: "datagov-excellence",
        name: "Excellence Blue",
        style: "Classic Government",
        desc: "ธีมมาตรฐานราชการไทย แถบนำทางสีขาวบนพื้นเข้ม แถบข้อมูล 3 คอลัมน์",
        colors: { primary: "#0c1222", accent: "#2563eb", surface: "#ffffff", text: "#1e293b" },
        preview: (
            <div className="h-36 relative overflow-hidden" style={{ background: "#f1f5f9" }}>
                {/* Top Navbar - White with dark logo */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-white shadow-sm flex items-center px-3 gap-2">
                    <div className="w-4 h-4 rounded bg-[#0c1222]" />
                    <div className="w-12 h-2 rounded-full bg-[#0c1222]/30" />
                    <div className="flex gap-2 ml-auto">
                        {["นโยบาย", "ข่าว"].map(t => <div key={t} className="w-8 h-1.5 rounded-full bg-gray-300" />)}
                        <div className="w-12 h-4 rounded-full bg-[#2563eb] flex items-center justify-center"><span className="text-[5px] text-white font-bold">ติดต่อ</span></div>
                    </div>
                </div>
                {/* Hero - Dark Blue */}
                <div className="absolute top-8 left-0 right-0" style={{ background: "#0c1222", height: 52 }}>
                    <div className="px-3 pt-2">
                        <div className="h-2 w-2/3 rounded-full bg-white/80 mb-1" />
                        <div className="h-1.5 w-1/2 rounded-full bg-white/40" />
                    </div>
                    <div className="absolute right-3 top-2 w-14 h-8 rounded-lg opacity-20" style={{ background: "#2563eb" }} />
                </div>
                {/* Card Row */}
                <div className="absolute bottom-2 left-2 right-2 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="flex-1 h-8 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center px-1.5">
                            <div className="w-3 h-3 rounded mb-0.5" style={{ background: "#2563eb" }} />
                            <div className="h-1 rounded-full bg-gray-200" />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: "datagov-slate",
        name: "Night Slate",
        style: "Dark Glassmorphism",
        desc: "โหมดมืดสมัยใหม่ ใช้เอฟเฟกต์โปร่งแสง (Glass) สำหรับไซต์ระดับ Innovation",
        colors: { primary: "#0f172a", accent: "#7c3aed", surface: "#1e293b", text: "#f1f5f9" },
        preview: (
            <div className="h-36 relative overflow-hidden" style={{ background: "#0f172a" }}>
                {/* Purple orbs */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl" style={{ background: "#7c3aed", opacity: 0.4 }} />
                <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full blur-xl" style={{ background: "#4c1d95", opacity: 0.5 }} />
                {/* Frosted Navbar */}
                <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 gap-2" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: "#7c3aed" }} />
                    <div className="w-10 h-1.5 rounded-full bg-white/20" />
                    <div className="flex gap-1.5 ml-auto">
                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-1 rounded-full bg-white/15" />)}
                    </div>
                </div>
                {/* Split hero */}
                <div className="absolute top-7 left-0 right-0 bottom-10 flex">
                    <div className="flex-1 flex flex-col justify-center px-3">
                        <div className="h-2 w-3/4 rounded-full bg-white/70 mb-1" />
                        <div className="h-1.5 w-1/2 rounded-full bg-white/30 mb-2" />
                        <div className="h-5 w-16 rounded-full flex items-center justify-center text-[6px] font-bold text-white" style={{ background: "#7c3aed" }}>Explore →</div>
                    </div>
                    <div className="w-16 relative">
                        <div className="absolute inset-2 rounded-xl" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }} />
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full" style={{ background: "rgba(124,58,237,0.5)" }} />
                    </div>
                </div>
                {/* Glass cards */}
                <div className="absolute bottom-1.5 left-2 right-2 flex gap-1">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="flex-1 h-7 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <div className="h-1 mx-1 mt-1.5 rounded-full" style={{ background: "rgba(124,58,237,0.6)" }} />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: "datagov-royal",
        name: "Royal Indigo",
        style: "Premium Editorial",
        desc: "สไตล์นิตยสาร Layout แบบ Editorial สีทองบน Indigo เข้ม ดูองค์กรระดับสูง",
        colors: { primary: "#1e1b4b", accent: "#f59e0b", surface: "#f8f7ff", text: "#1e1b4b" },
        preview: (
            <div className="h-36 relative overflow-hidden" style={{ background: "#f8f7ff" }}>
                {/* Gold top accent stripe */}
                <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24)" }} />
                {/* Dark Indigo Sidebar */}
                <div className="absolute top-0 left-0 bottom-0 w-14" style={{ background: "#1e1b4b" }}>
                    <div className="flex flex-col items-center pt-6 gap-2">
                        <div className="w-6 h-6 rounded-full" style={{ background: "#f59e0b" }} />
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-1.5 rounded-full bg-white/20" />)}
                    </div>
                </div>
                {/* Main content area */}
                <div className="absolute top-4 left-16 right-2 bottom-2">
                    <div className="h-2 w-3/4 rounded-full mb-1" style={{ background: "#1e1b4b", opacity: 0.8 }} />
                    <div className="h-1.5 w-1/2 rounded-full bg-gray-300 mb-3" />
                    <div className="grid grid-cols-2 gap-1.5">
                        <div className="h-10 rounded-xl" style={{ background: "#1e1b4b" }}>
                            <div className="h-1.5 mx-2 mt-2 rounded-full" style={{ background: "#f59e0b" }} />
                        </div>
                        <div className="h-10 rounded-xl bg-gray-100 border border-gray-200" />
                    </div>
                </div>
            </div>
        ),
    },
];

// ── PDPA Templates ──────────────────────────────────────────────────────────
const PDPA_TEMPLATES: ThemeTemplate[] = [
    // 1. EMERALD GREEN — classic PDPA
    {
        id: "pdpa-trust",
        name: "Trust Emerald",
        style: "Classic PDPA Green",
        desc: "ธีมมาตรฐาน PDPA สีเขียวน่าไว้วางใจ เน้น Trust Badge และ Gradient เข้มสง่า",
        colors: { primary: "#064e3b", accent: "#10b981", surface: "#f0fdf4", text: "#064e3b" },
        preview: (
            <div className="h-36 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)" }}>
                {/* Center badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-2xl mb-1.5 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                        <div className="w-5 h-6 rounded-t-full border-2 border-white/60" />
                    </div>
                    <div className="h-2 w-24 rounded-full bg-white/70 mb-1" />
                    <div className="h-1.5 w-16 rounded-full bg-white/40" />
                </div>
                {/* Top tag */}
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <div className="px-2 py-0.5 rounded-full text-[6px] font-bold text-white" style={{ background: "rgba(16,185,129,0.5)" }}>PDPA Compliant</div>
                    <div className="w-12 h-4 rounded-full flex gap-1 items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                        {[1, 2, 3].map(i => <div key={i} className="w-2 h-1 rounded-full bg-white/40" />)}
                    </div>
                </div>
                {/* Bottom leaf strip */}
                <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: "rgba(16,185,129,0.15)" }}>
                    <div className="flex gap-1.5 px-2 pt-1.5">
                        {["สิทธิ์", "ความยินยอม", "DPO"].map(t => (
                            <div key={t} className="flex-1 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.3)" }}>
                                <span className="text-[5px] text-white">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // 2. NAVY BLUE — corporate compliance & law
    {
        id: "pdpa-certified",
        name: "Certified Blue",
        style: "Corporate Compliance",
        desc: "ธีมฟ้าเข้มแบบองค์กรสากล เน้นความน่าเชื่อถือด้านกฎหมาย Compliance ระดับสูง",
        colors: { primary: "#1e3a5f", accent: "#3b82f6", surface: "#eff6ff", text: "#1e3a5f" },
        preview: (
            <div className="h-36 relative overflow-hidden" style={{ background: "#eff6ff" }}>
                {/* White clean nav */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-white shadow-sm flex items-center px-3 gap-2">
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: "#1e3a5f" }}>
                        <div className="w-2.5 h-2.5 rounded-sm bg-white/80" />
                    </div>
                    <div className="w-14 h-2 rounded-full" style={{ background: "#1e3a5f", opacity: 0.2 }} />
                    <div className="ml-auto flex gap-1.5">
                        {["นโยบาย", "PDPA"].map(t => <div key={t} className="w-9 h-1.5 rounded-full bg-gray-200" />)}
                        <div className="w-14 h-5 rounded-full flex items-center justify-center" style={{ background: "#3b82f6" }}>
                            <span className="text-[5px] text-white font-bold">ขอใช้สิทธิ์</span>
                        </div>
                    </div>
                </div>
                {/* Blue hero banner */}
                <div className="absolute top-8 left-0 right-0 h-14" style={{ background: "linear-gradient(135deg, #1e3a5f, #1d4ed8)" }}>
                    <div className="px-3 pt-2.5">
                        <div className="h-2 w-3/4 rounded-full bg-white/80 mb-1.5" />
                        <div className="h-1.5 w-1/2 rounded-full bg-white/40" />
                    </div>
                    <div className="absolute right-2 top-2 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,0.4)", border: "2px dashed rgba(255,255,255,0.5)" }}>
                        <span className="text-[9px] text-white font-black">✓</span>
                    </div>
                </div>
                {/* Badge row */}
                <div className="absolute bottom-1.5 left-2 right-2 flex gap-1.5">
                    {[{ v: "PDPA", c: "#3b82f6" }, { v: "ISO", c: "#1e3a5f" }, { v: "DPO", c: "#3b82f6" }].map(s => (
                        <div key={s.v} className="flex-1 h-7 rounded-xl flex items-center justify-center" style={{ background: s.c }}>
                            <span className="text-[7px] text-white font-black">{s.v}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },

    // 3. DARK VIOLET — high-security enterprise
    {
        id: "pdpa-secure",
        name: "Secure Violet",
        style: "High-Security Privacy",
        desc: "ธีมดำ-ม่วง High-security แสดงถึงระบบความเป็นส่วนตัวระดับ Enterprise Grade",
        colors: { primary: "#1a1a2e", accent: "#a855f7", surface: "#faf5ff", text: "#1a1a2e" },
        preview: (
            <div className="h-36 relative overflow-hidden" style={{ background: "#0f0f1a" }}>
                {/* Violet aura */}
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)", filter: "blur(10px)" }} />
                <div className="absolute bottom-0 left-4 w-20 h-16 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)" }} />
                {/* Nav */}
                <div className="absolute top-0 left-0 right-0 h-6 flex items-center px-3 gap-2" style={{ background: "rgba(168,85,247,0.1)", borderBottom: "1px solid rgba(168,85,247,0.3)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />
                    <div className="text-[6px] font-bold" style={{ color: "#a855f7" }}>PDPA Secure</div>
                    <div className="ml-auto">
                        <div className="w-14 h-4 rounded-full flex items-center justify-center text-[5px] font-bold" style={{ background: "#a855f7", color: "#fff" }}>
                            🔒 Encrypted
                        </div>
                    </div>
                </div>
                {/* Lock hero */}
                <div className="absolute top-8 left-3 right-3 bottom-9">
                    <div className="h-2 w-3/4 rounded-full bg-white/70 mb-1.5" />
                    <div className="h-1.5 w-1/2 rounded-full bg-white/30 mb-2" />
                    <div className="h-4 w-20 rounded-full flex items-center justify-center text-[5px] font-bold" style={{ background: "rgba(168,85,247,0.8)", color: "#fff" }}>
                        ปกป้องข้อมูลคุณ
                    </div>
                </div>
                {/* Tech tags */}
                <div className="absolute bottom-1.5 left-2 right-2 flex gap-1">
                    {["AES-256", "Zero-Log", "GDPR"].map(v => (
                        <div key={v} className="flex-1 h-6 rounded-lg flex items-center justify-center text-[5px] font-bold" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.35)", color: "#c084fc" }}>
                            {v}
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];
/* ─────────────────────────────────────────────────────────────────────────── */


export default function AdminSiteConfigPage() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savedToast, setSavedToast] = useState(false);
    const [configId, setConfigId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        siteName: "",
        announcement: "",
        notifications: [] as string[],
        heroHeadline: "",
        heroSubheadline: "",
        heroStats: [] as { value: string; label: string; sublabel: string }[],
        address: "",
        phone: "",
        email: "",
        officeHours: "",
        footerText: "",
        themeColors: { primary: "#0c1222", accent: "#2563eb" },
        navbarMenu: [] as any[],
        footerMenu: [] as any[],
        sectionToggles: { hero: true, policies: true, activities: true, downloads: true, news: true, documents: true },
        cookieConsent: {
            enabled: true,
            title: "เว็บไซต์นี้ใช้คุกกี้ (Cookies)",
            description: "เราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งาน วิเคราะห์การเข้าชมเว็บไซต์ และนำเสนอเนื้อหาที่เกี่ยวข้อง สามารถเลือกการตั้งค่าคุกกี้ได้ตามความต้องการของคุณ",
            acceptAllLabel: "ยอมรับทั้งหมด",
            rejectLabel: "ปฏิเสธที่ไม่จำเป็น",
            policyLink: "/cookie-policy"
        },
        legalPages: {
            privacyPolicy: { title: "นโยบายความเป็นส่วนตัว", content: "" },
            cookiePolicy: { title: "นโยบายคุกกี้", content: "" },
            termsOfUse: { title: "ข้อตกลงการใช้งาน", content: "" }
        },
        notFoundPage: {
            title: "ไม่พบหน้าที่คุณต้องการ",
            description: "หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือลบออกแล้ว",
            buttonText: "กลับหน้าแรก"
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
                        notifications: config.notifications || [],
                        heroHeadline: config.heroHeadline || "",
                        heroSubheadline: config.heroSubheadline || "",
                        heroStats: config.heroStats || [],
                        address: config.address || "",
                        phone: config.phone || "",
                        email: config.email || "",
                        officeHours: config.officeHours || "",
                        footerText: config.footerText || "",
                        themeColors: config.themeColors || { primary: "#0c1222", accent: "#2563eb" },
                        navbarMenu: config.navbarMenu || [],
                        footerMenu: config.footerMenu || [],
                        sectionToggles: config.sectionToggles || { hero: true, policies: true, activities: true, downloads: true, news: true, documents: true },
                        cookieConsent: config.cookieConsent || {
                            enabled: true,
                            title: "เว็บไซต์นี้ใช้คุกกี้ (Cookies)",
                            description: "เราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งาน",
                            acceptAllLabel: "ยอมรับทั้งหมด",
                            rejectLabel: "ปฏิเสธที่ไม่จำเป็น",
                            policyLink: "/cookie-policy"
                        },
                        legalPages: config.legalPages || {
                            privacyPolicy: { title: "นโยบายความเป็นส่วนตัว", content: "" },
                            cookiePolicy: { title: "นโยบายคุกกี้", content: "" },
                            termsOfUse: { title: "ข้อตกลงการใช้งาน", content: "" }
                        },
                        notFoundPage: config.notFoundPage || {
                            title: "ไม่พบหน้าที่คุณต้องการ",
                            description: "หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือลบออกแล้ว",
                            buttonText: "กลับหน้าแรก"
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

            // 1. Apply new colours immediately (optimistic update)
            const { primary, accent } = formData.themeColors;
            if (primary && accent) {
                const hexToRGB = (hex: string) => {
                    const h = hex.replace("#", "");
                    return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
                };
                const lighten = (hex: string, a: number) => {
                    const h = hex.replace("#", "");
                    const mix = (c: string) => Math.round(parseInt(c, 16) + (255 - parseInt(c, 16)) * a).toString(16).padStart(2, "0");
                    return `#${mix(h.slice(0, 2))}${mix(h.slice(2, 4))}${mix(h.slice(4, 6))}`;
                };
                const darken = (hex: string, a: number) => {
                    const h = hex.replace("#", "");
                    const mix = (c: string) => Math.round(parseInt(c, 16) * (1 - a)).toString(16).padStart(2, "0");
                    return `#${mix(h.slice(0, 2))}${mix(h.slice(2, 4))}${mix(h.slice(4, 6))}`;
                };
                const aRGB = hexToRGB(accent);
                const root = document.documentElement;
                root.style.setProperty("--primary-color", primary);
                root.style.setProperty("--accent-color", accent);
                root.style.setProperty("--accent-dark", darken(accent, 0.2));
                root.style.setProperty("--accent-light", lighten(accent, 0.3));
                root.style.setProperty("--accent-subtle", `rgba(${aRGB}, 0.06)`);
                root.style.setProperty("--accent-glow", `rgba(${aRGB}, 0.14)`);
            }

            // Notify any other same-origin tabs (e.g. open frontend tab) via custom event
            window.dispatchEvent(new CustomEvent("theme-updated", {
                detail: { primary: formData.themeColors.primary, accent: formData.themeColors.accent }
            }));

            // 2. Show toast
            setSavedToast(true);

            // 3. Reload page after short delay so all components get the new theme
            setTimeout(() => {
                window.location.reload();
            }, 1200);

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
            {/* ── Save Toast ── */}
            {savedToast && (
                <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm"
                        style={{ background: "var(--primary-color)", boxShadow: "0 20px 40px -8px var(--accent-glow)" }}
                    >
                        <CheckCircle2 size={20} style={{ color: "var(--accent-color)" }} />
                        <span>บันทึกสำเร็จ! กำลังโหลดธีมใหม่...</span>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-1" />
                    </div>
                </div>
            )}

            <div className="mb-8 font-sans">
                <h1 className="text-3xl font-black font-heading text-primary mb-2">ตั้งค่าเว็บไซต์</h1>
                <p className="text-gray-500">จัดการข้อมูลพื้นฐานและภาพลักษณ์ของเว็บไซต์ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section Toggles */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
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
                {/* ─────────────────────────────────────
                    Theme Template Picker
                ───────────────────────────────────── */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                            <LayoutTemplate size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">เทมเพลตธีม (Theme Templates)</h3>
                            <p className="text-xs text-gray-400 mt-0.5">เลือกชุดสีสำเร็จรูปสำหรับเว็บไซต์ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
                        </div>
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {(siteParam === "pdpa" ? PDPA_TEMPLATES : DATAGOV_TEMPLATES).map((tpl) => {
                            const isActive =
                                formData.themeColors.primary === tpl.colors.primary &&
                                formData.themeColors.accent === tpl.colors.accent;
                            return (
                                <button
                                    key={tpl.id}
                                    type="button"
                                    onClick={() =>
                                        setFormData({ ...formData, themeColors: { primary: tpl.colors.primary, accent: tpl.colors.accent } })
                                    }
                                    className={`group relative text-left rounded-[1.75rem] border-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isActive
                                        ? "border-violet-500 shadow-xl shadow-violet-200/50 ring-4 ring-violet-400/20"
                                        : "border-transparent hover:border-gray-200 shadow-md"
                                        }`}
                                >
                                    {/* Unique Layout Preview */}
                                    <div className="rounded-t-[1.25rem] overflow-hidden">
                                        {tpl.preview}
                                    </div>

                                    {/* Info footer */}
                                    <div className="p-4 bg-white border-t border-gray-50">
                                        <div className="flex items-start justify-between mb-1.5">
                                            <div>
                                                <p className="font-black text-sm text-gray-900">{tpl.name}</p>
                                                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: tpl.colors.accent }}>
                                                    {tpl.style}
                                                </span>
                                            </div>
                                            {isActive ? (
                                                <span className="px-2 py-0.5 text-white text-[9px] font-black rounded-full whitespace-nowrap" style={{ background: 'var(--accent-color)' }}>✓ กำลังใช้</span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">เลือก</span>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-400 leading-relaxed mb-3">{tpl.desc}</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex -space-x-1">
                                                <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ background: tpl.colors.primary }} />
                                                <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ background: tpl.colors.accent }} />
                                                {tpl.colors.surface && <div className="w-5 h-5 rounded-full border-2 border-gray-100 shadow-sm" style={{ background: tpl.colors.surface }} />}
                                            </div>
                                            <span className="text-[9px] text-gray-300 font-mono">{tpl.colors.primary} · {tpl.colors.accent}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Manual Override */}
                    <div className="mt-6 pt-6 border-t border-gray-50">
                        <p className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-2">
                            <span className="w-4 h-px bg-gray-300 inline-block" />
                            หรือปรับสีเองแบบ Custom
                            <span className="w-4 h-px bg-gray-300 inline-block" />
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 block">โทนสีหลัก (Primary)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="color"
                                        value={formData.themeColors.primary}
                                        onChange={(e) => handleColorChange('primary', e.target.value)}
                                        className="w-12 h-12 rounded-xl cursor-pointer border border-gray-200"
                                    />
                                    <input
                                        type="text"
                                        value={formData.themeColors.primary}
                                        onChange={(e) => handleColorChange('primary', e.target.value)}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 block">สีเน้น (Accent)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="color"
                                        value={formData.themeColors.accent}
                                        onChange={(e) => handleColorChange('accent', e.target.value)}
                                        className="w-12 h-12 rounded-xl cursor-pointer border border-gray-200"
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
                </div>

                {/* Navbar Menu Management */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
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
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
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

                {/* News Ticker Notifications ──────────────────────────── */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                            <Zap size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">ข้อความ News Ticker (Live Updates)</h3>
                            <p className="text-xs text-gray-400 mt-0.5">ข้อความที่เลื่อนบนแถบด้านบนสุดของเว็บไซต์ หากไม่มีจะใช้ announcements แทน</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {formData.notifications.map((notif, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <span className="w-6 h-6 flex-shrink-0 rounded-full text-[10px] font-black flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>{idx + 1}</span>
                                <input
                                    value={notif}
                                    onChange={(e) => {
                                        const arr = [...formData.notifications];
                                        arr[idx] = e.target.value;
                                        setFormData({ ...formData, notifications: arr });
                                    }}
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder={`ข้อความที่ ${idx + 1}...`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, notifications: formData.notifications.filter((_, i) => i !== idx) })}
                                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, notifications: [...formData.notifications, ""] })}
                            className="mt-2 flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm border-2 border-dashed transition-all hover:opacity-80"
                            style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                        >
                            <Plus size={16} /> เพิ่มข้อความใหม่
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--primary-color)' }}>
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

                {/* Hero Stats ──────────────────────────────────────────── */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">สถิติในส่วน Hero (Hero Stats)</h3>
                            <p className="text-xs text-gray-400 mt-0.5">ตัวเลขสถิติที่แสดงในส่วน Hero Banner มีได้สูงสุด 3 รายการ</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {formData.heroStats.map((stat, idx) => (
                            <div key={idx} className="flex gap-3 items-start p-4 bg-gray-50 rounded-2xl">
                                <span className="w-6 h-6 flex-shrink-0 rounded-full text-[10px] font-black flex items-center justify-center mt-3" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>{idx + 1}</span>
                                <div className="flex-1 grid grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ตัวเลข (Value)</label>
                                        <input
                                            value={stat.value}
                                            onChange={(e) => {
                                                const arr = [...formData.heroStats];
                                                arr[idx] = { ...arr[idx], value: e.target.value };
                                                setFormData({ ...formData, heroStats: arr });
                                            }}
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="เช่น 1,200+"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ชื่อสถิติ (Label)</label>
                                        <input
                                            value={stat.label}
                                            onChange={(e) => {
                                                const arr = [...formData.heroStats];
                                                arr[idx] = { ...arr[idx], label: e.target.value };
                                                setFormData({ ...formData, heroStats: arr });
                                            }}
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="เช่น ชุดข้อมูล"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">คำอธิบาย (Sublabel)</label>
                                        <input
                                            value={stat.sublabel}
                                            onChange={(e) => {
                                                const arr = [...formData.heroStats];
                                                arr[idx] = { ...arr[idx], sublabel: e.target.value };
                                                setFormData({ ...formData, heroStats: arr });
                                            }}
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="เช่น Open Data"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, heroStats: formData.heroStats.filter((_, i) => i !== idx) })}
                                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all mt-6"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {formData.heroStats.length < 3 && (
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, heroStats: [...formData.heroStats, { value: "", label: "", sublabel: "" }] })}
                                className="mt-2 flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm border-2 border-dashed transition-all hover:opacity-80"
                                style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                            >
                                <Plus size={16} /> เพิ่มสถิติ (สูงสุด 3)
                            </button>
                        )}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
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

                {/* Cookie Consent Banner ─────────────────────────────── */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                            <Shield size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800">Cookie Consent Banner</h3>
                            <p className="text-xs text-gray-400 mt-0.5">ข้อความแจ้งการใช้คุกกี้ตามกฎหมาย PDPA</p>
                        </div>
                        {/* Toggle */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <span className="text-sm font-bold text-gray-600">เปิดใช้งาน</span>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, cookieConsent: { ...formData.cookieConsent, enabled: !formData.cookieConsent.enabled } })}
                                className={`relative w-12 h-6 rounded-full transition-all ${formData.cookieConsent.enabled ? 'bg-primary' : 'bg-gray-300'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${formData.cookieConsent.enabled ? 'left-7' : 'left-1'}`} />
                            </button>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">หัวข้อ Banner (Title)</label>
                            <input
                                value={formData.cookieConsent.title}
                                onChange={(e) => setFormData({ ...formData, cookieConsent: { ...formData.cookieConsent, title: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="เว็บไซต์นี้ใช้คุกกี้..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ลิงก์ Cookie Policy</label>
                            <input
                                value={formData.cookieConsent.policyLink}
                                onChange={(e) => setFormData({ ...formData, cookieConsent: { ...formData.cookieConsent, policyLink: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="/cookie-policy"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700">รายละเอียดคุกกี้ (Description)</label>
                            <textarea
                                rows={3}
                                value={formData.cookieConsent.description}
                                onChange={(e) => setFormData({ ...formData, cookieConsent: { ...formData.cookieConsent, description: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium resize-none"
                                placeholder="เราใช้คุกกี้เพื่อ..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ปุ่ม "ยอมรับ" (Accept Label)</label>
                            <input
                                value={formData.cookieConsent.acceptAllLabel}
                                onChange={(e) => setFormData({ ...formData, cookieConsent: { ...formData.cookieConsent, acceptAllLabel: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="ยอมรับทั้งหมด"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ปุ่ม "ปฏิเสธ" (Reject Label)</label>
                            <input
                                value={formData.cookieConsent.rejectLabel}
                                onChange={(e) => setFormData({ ...formData, cookieConsent: { ...formData.cookieConsent, rejectLabel: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="ปฏิเสธที่ไม่จำเป็น"
                            />
                        </div>
                    </div>
                </div>

                {/* Legal Pages ──────────────────────────────────────────── */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--primary-color)' }}>
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">หน้าข้อมูลกฎหมาย</h3>
                            <p className="text-xs text-gray-400 mt-0.5">แสดงที่ /privacy-policy, /cookie-policy, /terms-of-use</p>
                        </div>
                    </div>

                    {/* Privacy Policy */}
                    <div className="space-y-4 mb-6 pb-6 border-b border-gray-50">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center text-white" style={{ background: 'var(--primary-color)' }}>1</span>
                            นโยบายความเป็นส่วนตัว (Privacy Policy)
                        </h4>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">หัวข้อหน้า</label>
                            <input
                                value={formData.legalPages.privacyPolicy.title}
                                onChange={(e) => setFormData({ ...formData, legalPages: { ...formData.legalPages, privacyPolicy: { ...formData.legalPages.privacyPolicy, title: e.target.value } } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">เนื้อหา (รองรับ HTML)</label>
                            <textarea
                                rows={8}
                                value={formData.legalPages.privacyPolicy.content}
                                onChange={(e) => setFormData({ ...formData, legalPages: { ...formData.legalPages, privacyPolicy: { ...formData.legalPages.privacyPolicy, content: e.target.value } } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm resize-y"
                                placeholder="<h2>1. การเก็บรวบรวมข้อมูล</h2><p>...</p>"
                            />
                        </div>
                    </div>

                    {/* Cookie Policy */}
                    <div className="space-y-4 mb-6 pb-6 border-b border-gray-50">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center text-white" style={{ background: 'var(--primary-color)' }}>2</span>
                            นโยบายคุกกี้ (Cookie Policy)
                        </h4>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">หัวข้อหน้า</label>
                            <input
                                value={formData.legalPages.cookiePolicy.title}
                                onChange={(e) => setFormData({ ...formData, legalPages: { ...formData.legalPages, cookiePolicy: { ...formData.legalPages.cookiePolicy, title: e.target.value } } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">เนื้อหา (รองรับ HTML)</label>
                            <textarea
                                rows={8}
                                value={formData.legalPages.cookiePolicy.content}
                                onChange={(e) => setFormData({ ...formData, legalPages: { ...formData.legalPages, cookiePolicy: { ...formData.legalPages.cookiePolicy, content: e.target.value } } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm resize-y"
                                placeholder="<h2>คุกกี้คืออะไร?</h2><p>...</p>"
                            />
                        </div>
                    </div>

                    {/* Terms of Use */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center text-white" style={{ background: 'var(--primary-color)' }}>3</span>
                            ข้อตกลงการใช้งาน (Terms of Use)
                        </h4>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">หัวข้อหน้า</label>
                            <input
                                value={formData.legalPages.termsOfUse.title}
                                onChange={(e) => setFormData({ ...formData, legalPages: { ...formData.legalPages, termsOfUse: { ...formData.legalPages.termsOfUse, title: e.target.value } } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">เนื้อหา (รองรับ HTML)</label>
                            <textarea
                                rows={8}
                                value={formData.legalPages.termsOfUse.content}
                                onChange={(e) => setFormData({ ...formData, legalPages: { ...formData.legalPages, termsOfUse: { ...formData.legalPages.termsOfUse, content: e.target.value } } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm resize-y"
                                placeholder="<h2>1. การใช้งานเว็บไซต์</h2><p>...</p>"
                            />
                        </div>
                    </div>
                </div>

                {/* Custom 404 Page ─────────────────────────────────────── */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                            <HelpCircle size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">หน้า 404 (ไม่พบหน้า)</h3>
                            <p className="text-xs text-gray-400 mt-0.5">ข้อความที่แสดงเมื่อผู้ใช้เข้าหน้าที่ไม่มีอยู่</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">หัวข้อ (Title)</label>
                            <input
                                value={formData.notFoundPage.title}
                                onChange={(e) => setFormData({ ...formData, notFoundPage: { ...formData.notFoundPage, title: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="ไม่พบหน้าที่คุณต้องการ"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">คำอธิบาย (Description)</label>
                            <input
                                value={formData.notFoundPage.description}
                                onChange={(e) => setFormData({ ...formData, notFoundPage: { ...formData.notFoundPage, description: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="หน้าที่คุณมองหาอาจถูกย้าย..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ข้อความปุ่ม (Button Text)</label>
                            <input
                                value={formData.notFoundPage.buttonText}
                                onChange={(e) => setFormData({ ...formData, notFoundPage: { ...formData.notFoundPage, buttonText: e.target.value } })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                placeholder="กลับหน้าแรก"
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
