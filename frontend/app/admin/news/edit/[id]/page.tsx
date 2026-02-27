"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import { Save, Loader2, ArrowLeft, Image as ImageIcon, Plus, Type, AlignLeft, Search } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { uploadFile } from "@/app/actions/upload";
import { updateArticle } from "@/app/actions/article";
import Swal from "sweetalert2";

const BlockEditor = dynamic(() => import("@/components/BlockEditor"), {
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
    const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [fetchingUrl, setFetchingUrl] = useState(false);

    const [formData, setFormData] = useState<any>({
        title: "",
        slug: "",
        description: "",
        content: [],
        publishedAt: "",
        category: "",
        domain: domain,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: ""
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch Categories
                const catsRes = await fetchAPI("/categories", {
                    filters: { domain, type: "news" }
                });
                setCategories(catsRes.data || []);

                // Fetch Article with explicit population and cache buster
                const res = await fetchAPI(`/articles/${id}`, {
                    populate: {
                        content: {
                            populate: "*"
                        },
                        coverImage: true,
                        category: true
                    },
                    status: "draft",
                    _t: Date.now()
                });
                const article = res.data;
                console.log("Loaded article:", article);

                // Load content blocks as-is for the BlockEditor
                const initialBlocks = Array.isArray(article.content) ? article.content : [
                    { __component: "shared.rich-text", body: "" }
                ];
                // Removed debug alert
                setFormData({
                    title: article.title || "",
                    slug: article.slug || "",
                    description: article.description || "",
                    content: initialBlocks,
                    publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : "",
                    category: article.category?.id || "",
                    domain: article.domain || domain,
                    seoTitle: article.seoTitle || "",
                    seoDescription: article.seoDescription || "",
                    seoKeywords: article.seoKeywords || ""
                });

                if (article.coverImage?.url) {
                    setExistingImage(getStrapiMedia(article.coverImage.url));
                }
            } catch (error: any) {
                console.error("Error loading article data", error);
                if (error.message?.includes("404")) {
                    Swal.fire({
                        icon: "error",
                        title: "ไม่พบข้อมูล",
                        text: "ไม่พบข่าวนี้ในระบบ อาจถูกลบไปแล้ว"
                    }).then(() => {
                        router.push(`/admin/news?site=${siteParam}`);
                    });
                }
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

    const handleUrlFetch = async () => {
        if (!imageUrlInput) return;
        setFetchingUrl(true);
        try {
            const response = await fetch(imageUrlInput);
            if (!response.ok) throw new Error("ไม่สามารถดาวน์โหลดรูปภาพจาก URL นี้ได้");
            const blob = await response.blob();
            const urlObj = new URL(imageUrlInput);
            const pathname = urlObj.pathname;
            const filename = pathname.substring(pathname.lastIndexOf('/') + 1) || 'image.jpg';

            const file = new File([blob], filename, { type: blob.type });
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUploadMode("file");
            setImageUrlInput("");
        } catch (error: any) {
            console.error("URL fetch error", error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error.message || "เกิดข้อผิดพลาดในการดึงรูปภาพ"
            });
        } finally {
            setFetchingUrl(false);
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
            // Format publishedAt correctly for Strapi
            const publishedAt = formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null;

            // Clean content: remove 'id' and convert media objects to IDs
            const cleanContent = formData.content.map((block: any) => {
                const { id, ...rest } = block;

                // For gallery: Strapi expects IDs for the images media field
                if (rest.__component === "shared.gallery" && Array.isArray(rest.images)) {
                    rest.images = rest.images.map((img: any) => img.id || img);
                }

                return rest;
            });

            const payload: any = {
                title: formData.title,
                slug: formData.slug,
                description: formData.description,
                publishedAt: publishedAt,
                domain: formData.domain,
                category: formData.category || null,
                content: cleanContent,
                seoTitle: formData.seoTitle || null,
                seoDescription: formData.seoDescription || null,
                seoKeywords: formData.seoKeywords || null
            };

            if (coverImageId) {
                payload.coverImage = coverImageId;
            }

            console.log("Saving payload:", payload);
            await updateArticle(id, payload);

            Swal.fire({
                icon: "success",
                title: "บันทึกสำเร็จ!",
                text: "บันทึกการแก้ไขเรียบร้อยแล้ว",
                confirmButtonColor: "#00ae91",
            }).then(() => {
                router.push(`/admin/news?site=${siteParam}`);
            });
        } catch (error: any) {
            console.error("Error updating article", error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error.message || "บันทึกการแก้ไขไม่สำเร็จ"
            });
        }
        finally {
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
                                <AlignLeft size={16} className="text-gray-400" /> เนื้อหาข่าว (Dynamic Blocks)
                            </label>
                            <div key={`editor-${id}`}>
                                <BlockEditor
                                    blocks={formData.content}
                                    onChange={(blocks) => setFormData({ ...formData, content: blocks })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">ภาพหน้าปกข่าว</h4>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setUploadMode("file")}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${uploadMode === "file" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"}`}
                                >
                                    อัปโหลดไฟล์
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadMode("url")}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${uploadMode === "url" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-primary"}`}
                                >
                                    ใช้ URL
                                </button>
                            </div>
                        </div>

                        {uploadMode === "url" ? (
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        placeholder="วาง URL ของรูปภาพที่นี่..."
                                        value={imageUrlInput}
                                        onChange={e => setImageUrlInput(e.target.value)}
                                        className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-none outline-none text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleUrlFetch}
                                        disabled={fetchingUrl || !imageUrlInput}
                                        className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-accent transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {fetchingUrl ? <Loader2 size={16} className="animate-spin" /> : "ดึงรูป"}
                                    </button>
                                </div>
                                {(previewUrl || existingImage) && (
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-2">รูปที่เลือกปัจจุบัน:</p>
                                        <img src={previewUrl || existingImage || ""} className="w-full h-32 object-cover rounded-xl" alt="Current" />
                                    </div>
                                )}
                            </div>
                        ) : (
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
                        )}
                        {imageFile && (
                            <p className="mt-2 text-xs font-bold p-2 rounded-lg truncate" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
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

                    {/* SEO Section */}
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-color)' }}>
                                <Search size={16} />
                            </div>
                            <h4 className="text-sm font-bold text-gray-800">SEO Settings</h4>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-gray-600">SEO Title</label>
                                    <span className={`text-[10px] font-bold ${(formData.seoTitle || formData.title).length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                                        {(formData.seoTitle || formData.title).length}/60
                                    </span>
                                </div>
                                <input
                                    value={formData.seoTitle}
                                    onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                                    placeholder={formData.title || 'ใช้หัวข้อข่าวถ้าว่าง...'}
                                    className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-gray-600">Meta Description</label>
                                    <span className={`text-[10px] font-bold ${(formData.seoDescription || formData.description).length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                                        {(formData.seoDescription || formData.description).length}/160
                                    </span>
                                </div>
                                <textarea
                                    rows={3}
                                    value={formData.seoDescription}
                                    onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                                    placeholder={formData.description || 'คำอธิบายสำหรับ Google...'}
                                    className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600">Keywords (คั่นด้วยจุลภาค)</label>
                                <input
                                    value={formData.seoKeywords}
                                    onChange={e => setFormData({ ...formData, seoKeywords: e.target.value })}
                                    placeholder="คำสำคัญ, ธรรมาภิบาล, ข้อมูล"
                                    className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                />
                            </div>

                            {/* Google Preview */}
                            <div className="mt-4 pt-4 border-t border-gray-50">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">ตัวอย่างใน Google</p>
                                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-1">
                                    <p className="text-[11px] text-gray-400">localhost › news › {formData.slug || 'slug'}</p>
                                    <p className="text-sm font-bold text-blue-700 leading-tight line-clamp-1">
                                        {formData.seoTitle || formData.title || 'หัวข้อข่าว'}
                                    </p>
                                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                        {formData.seoDescription || formData.description || 'คำอธิบายข่าวจะปรากฏที่นี่'}
                                    </p>
                                </div>
                            </div>
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
