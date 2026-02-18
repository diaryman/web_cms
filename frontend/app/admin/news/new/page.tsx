"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[400px] bg-gray-50 rounded-xl animate-pulse" />
});

export default function CreateNewsPage() {
    const searchParams = useSearchParams();
    const router = useRouter(); // Use useRouter for navigation
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost:3000";

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        publishedAt: new Date().toISOString().slice(0, 16),
        domain: domain,
        category: ""
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetchAPI("/categories", {
                    filters: { domain, type: "news" }
                });
                setCategories(res.data || []);
                if (res.data && res.data.length > 0) {
                    setFormData(prev => ({ ...prev, category: res.data[0].id }));
                }
            } catch (error) {
                console.error("Error loading categories", error);
            }
        };
        loadCategories();
    }, [domain]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetchAPI("/articles", {}, {
                method: "POST",
                body: JSON.stringify({ data: formData })
            });
            alert("สร้างข่าวสำเร็จ");
            router.push(`/admin/news?site=${siteParam}`);
        } catch (error) {
            console.error("Error creating news", error);
            alert("สร้างข่าวไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/admin/news?site=${siteParam}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black font-heading text-primary leading-tight">สร้างข่าวใหม่</h1>
                    <p className="text-gray-400 font-medium">เพิ่มข่าวสารหรือกิจกรรมสำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
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
                            placeholder="ใส่หัวข้อข่าวที่นี่..."
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
                            placeholder="slug-news-sample"
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
                                {categories.length === 0 && <option value="">ไม่ได้เลือกหมวดหมู่</option>}
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
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
                            placeholder="รายละเอียดสั้นๆ..."
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

                <div className="pfixed bottom-0 left-0 right-0 md:relative md:p-0 bg-white md:bg-transparent border-t md:border-none p-4 flex justify-end gap-3">
                    <Link href={`/admin/news?site=${siteParam}`} className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        บันทึกข่าว
                    </button>
                </div>
            </form>
        </div>
    );
}
