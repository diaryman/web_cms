"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Plus, Type, AlignLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { uploadFile } from "@/app/actions/upload";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[400px] bg-gray-50 rounded-xl animate-pulse" />
});

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    return (
        <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>}>
            <EditNewsForm id={unwrappedParams.id} />
        </Suspense>
    );
}

function EditNewsForm({ id }: { id: string }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);

    const [formData, setFormData] = useState<any>({
        title: "",
        slug: "",
        description: "",
        content: "",
        publishedAt: "",
        category: "",
        domain: domain
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch Categories
                const catsRes = await fetchAPI("/categories", {
                    filters: { domain, type: "news" }
                });
                setCategories(catsRes.data || []);

                // Fetch Article
                const res = await fetchAPI(`/articles/${id}`, {
                    populate: "*"
                });
                const article = res.data;

                setFormData({
                    title: article.title || "",
                    slug: article.slug || "",
                    description: article.description || "",
                    content: article.content || "",
                    publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : "",
                    category: article.category?.id || "",
                    domain: article.domain || domain
                });

                if (article.coverImage?.url) {
                    setExistingImage(getStrapiMedia(article.coverImage.url));
                }
            } catch (error) {
                console.error("Error loading article data", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [id, domain]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            let coverImageId = undefined; // undefined means don't change if not provided

            // 1. Upload new cover image if selected
            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append("files", imageFile);
                const uploadedFiles = await uploadFile(imageFormData);
                if (uploadedFiles && uploadedFiles.length > 0) {
                    coverImageId = uploadedFiles[0].id;
                }
            }

            // 2. Update Article
            const payload: any = { ...formData };
            if (coverImageId) {
                payload.coverImage = coverImageId;
            }

            await fetchAPI(`/articles/${id}`, {}, {
                method: "PUT",
                body: JSON.stringify({ data: payload })
            });

            alert("บันทึกการแก้ไขเรียบร้อย");
            router.push(`/admin/news?site=${siteParam}`);
        } catch (error: any) {
            console.error("Error updating article", error);
            alert(error.message || "บันทึกการแก้ไขไม่สำเร็จ");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-5xl mx-auto pb-32">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/admin/news?site=${siteParam}`} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-colors shadow-sm">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-primary font-heading">แก้ไขข่าว</h1>
                    <p className="text-gray-500 font-medium">ปรับปรุงข้อมูลข่าวสารสำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Type size={16} className="text-gray-400" /> หัวข้อข่าว (Title)
                            </label>
                            <input
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none font-bold text-lg"
                                placeholder="ใส่หัวข้อข่าวที่นี่..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <AlignLeft size={16} className="text-gray-400" /> คำอธิบายย่อ (Description)
                            </label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="รายละเอียดสั้นๆ สำหรับหน้าแรก..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <AlignLeft size={16} className="text-gray-400" /> เนื้อหาข่าว (Content)
                            </label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(value) => setFormData({ ...formData, content: value })}
                                placeholder="เขียนเนื้อหาข่าวอย่างละเอียดที่นี่..."
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">ภาพหน้าปกข่าว</h4>
                        <div
                            className="relative aspect-[16/10] rounded-2xl border-2 border-dashed border-gray-200 transition-all flex flex-col items-center justify-center overflow-hidden bg-gray-50 hover:border-primary/40"
                        >
                            {(previewUrl || existingImage) ? (
                                <>
                                    <img src={previewUrl || existingImage || ""} className="w-full h-full object-cover" alt="Cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none text-white font-bold text-xs text-center p-4">
                                        คลิกเพื่อเปลี่ยนรูป
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 mx-auto mb-3">
                                        <Plus size={24} />
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">คลิกเพื่ออัปโหลดรูป</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        {imageFile && (
                            <p className="mt-2 text-xs text-blue-600 font-bold bg-blue-50 p-2 rounded-lg truncate">
                                📎 ไฟล์ที่เลือก: {imageFile.name}
                            </p>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">URL Slug</label>
                            <input
                                required
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none font-medium text-xs text-gray-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700">หมวดหมู่</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none"
                            >
                                {categories.length === 0 && <option value="">เลือกหมวดหมู่</option>}
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700">วันที่เผยแพร่</label>
                            <input
                                type="datetime-local"
                                value={formData.publishedAt}
                                onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Action Bar */}
                <div className="fixed bottom-0 left-0 md:left-72 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-end gap-4 z-40">
                    <Link href={`/admin/news?site=${siteParam}`} className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        บันทึกการแก้ไข
                    </button>
                </div>
            </form>
        </div>
    );
}
