"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[400px] bg-gray-50 rounded-xl animate-pulse" />
});

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const searchParams = useSearchParams();
    const router = useRouter();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: "",
        slug: "",
        description: "",
        content: "",
        publishedAt: "",
        category: 1,
        domain: domain
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetchAPI(`/articles/${unwrappedParams.id}`);
                const article = res.data;
                setFormData({
                    title: article.title || "",
                    slug: article.slug || "",
                    description: article.description || "",
                    content: article.content || "",
                    publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : "",
                    category: article.category?.id || 1, // Need category ID from backend relation
                    domain: article.domain || domain
                });
            } catch (error) {
                console.error("Error fetching article", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [unwrappedParams.id, domain]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetchAPI(`/articles/${unwrappedParams.id}`, {}, {
                method: "PUT",
                body: JSON.stringify({ data: formData })
            });
            alert("บันทึกข่าวเรียบร้อย");
            router.push(`/admin/news?site=${siteParam}`);
        } catch (error) {
            console.error("Error updating article", error);
            alert("บันทึกข่าวไม่สำเร็จ");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/admin/news?site=${siteParam}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black font-heading text-primary leading-tight">แก้ไขข่าว</h1>
                    <p className="text-gray-400 font-medium">แก้ไขข้อมูลข่าวสารสำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">หัวข้อข่าว (Title)</label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
                        <input
                            required
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">หมวดหมู่</label>
                            <select
                                name="category"
                                value={formData.category} // Assuming ID
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            >
                                <option value="1">ข่าวประชาสัมพันธ์ (General)</option>
                                <option value="2">กิจกรรม (Activities)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">วันที่เผยแพร่</label>
                            <input
                                type="datetime-local"
                                name="publishedAt"
                                value={formData.publishedAt}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">คำอธิบายย่อ (Description)</label>
                        <textarea
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">เนื้อหาข่าว (Content)</label>
                        <RichTextEditor
                            value={formData.content}
                            onChange={(value) => setFormData({ ...formData, content: value })}
                            placeholder="เขียนเนื้อหาข่าวที่นี่..."
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
                    <Link href={`/admin/news?site=${siteParam}`} className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        บันทึกการแก้ไข
                    </button>
                </div>
            </form>
        </div>
    );
}
