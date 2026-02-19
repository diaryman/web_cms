"use client";

import { useState, Suspense } from "react";
import { uploadFile } from "@/app/actions/upload";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Type, AlignLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function NewHeroSlidePage() {
    return (
        <Suspense fallback={<div>กำลังโหลด...</div>}>
            <NewHeroSlideForm />
        </Suspense>
    );
}

function NewHeroSlideForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const targetDomain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        buttonText: "อ่านเพิ่มเติม",
        buttonLink: "/",
        isActive: true,
        displayOrder: 1,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert("กรุณาอัปโหลดรูปภาพ");
            return;
        }

        setSaving(true);
        try {
            // 1. Upload image using Server Action
            const imageFormData = new FormData();
            imageFormData.append("files", imageFile);

            console.log("Starting upload...");
            const uploadedFiles = await uploadFile(imageFormData);

            if (!Array.isArray(uploadedFiles) || uploadedFiles.length === 0) {
                console.error("Upload response invalid:", uploadedFiles);
                throw new Error("No file returned from upload");
            }

            const imageId = uploadedFiles[0].id;

            // 2. Create Hero Slide
            await fetchAPI("/hero-slides", {}, {
                method: "POST",
                body: JSON.stringify({
                    data: {
                        ...formData,
                        domain: targetDomain,
                        image: imageId
                    }
                })
            });

            router.push(`/admin/hero-slides?site=${siteParam}`);
        } catch (error: any) {
            console.error("Save failed", error);
            alert(error.message || "เกิดข้อผิดพลาดในการบันทึก");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-32">
            <div className="flex items-center gap-4">
                <Link
                    href={`/admin/hero-slides?site=${siteParam}`}
                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-colors shadow-sm"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading">เพิ่มสไลด์ใหม่</h1>
                    <p className="text-gray-500">สร้างแบนเนอร์ใหม่สำหรับหน้าแรก</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sans">
                {/* Left: Metadata Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Type size={16} className="text-gray-400" /> หัวข้อหลัก (Title)
                            </label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none font-bold text-lg"
                                placeholder="หัวข้อที่จะปรากฏบนสไลด์..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <AlignLeft size={16} className="text-gray-400" /> คำอธิบายสั้นๆ (Subtitle)
                            </label>
                            <textarea
                                value={formData.subtitle}
                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                rows={3}
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="รายละเอียดเพิ่มเติม..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <ImageIcon size={16} className="text-gray-400" /> ข้อความบนปุ่ม
                                </label>
                                <input
                                    value={formData.buttonText}
                                    onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <LinkIcon size={16} className="text-gray-400" /> ลิงก์ปลายทาง
                                </label>
                                <input
                                    value={formData.buttonLink}
                                    onChange={e => setFormData({ ...formData, buttonLink: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Media & Status */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">รูปภาพสไลด์</h4>
                        <div
                            className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-gray-50 ${previewUrl ? 'border-transparent' : 'border-gray-200 hover:border-primary/40'}`}
                        >
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none text-white font-bold text-xs">
                                        คลิกเพื่อเปลี่ยนรูป
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 mx-auto mb-3">
                                        <Plus size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ขนาดแนะนำ: 1920x800</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-700">สถานะการแสดงผล</span>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData.isActive ? 'bg-primary' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ลำดับการแสดง</label>
                            <input
                                type="number"
                                value={formData.displayOrder}
                                onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none font-bold text-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Action Bar */}
                <div className="fixed bottom-0 left-0 md:left-72 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-end gap-4 z-40">
                    <Link
                        href={`/admin/hero-slides?site=${siteParam}`}
                        className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        สร้างสไลด์
                    </button>
                </div>
            </form>
        </div>
    );
}
