"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-50 rounded-xl animate-pulse" />
});

export default function CreateDocumentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [loading, setLoading] = useState(false);
    const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        publishedAt: new Date().toISOString().slice(0, 16),
        domain: domain,
        category: "",
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetchAPI("/categories", {
                    filters: { domain, type: "document" }
                });
                setDynamicCategories(res.data || []);
                if (res.data && res.data.length > 0) {
                    setFormData(prev => ({ ...prev, category: res.data[0].name }));
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
            await fetchAPI("/policy-documents", {}, {
                method: "POST",
                body: JSON.stringify({ data: formData })
            });
            alert("สร้างเอกสารสำเร็จ (อย่าลืมอัปโหลดไฟล์ในภายหลัง)");
            router.push(`/admin/documents?site=${siteParam}`);
        } catch (error) {
            console.error("Error creating document", error);
            alert("สร้างเอกสารไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/admin/documents?site=${siteParam}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black font-heading text-primary leading-tight">เพิ่มเอกสารใหม่</h1>
                    <p className="text-gray-400 font-medium">เพิ่มเอกสารเผยแพร่สำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อเอกสาร (Title)</label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-lg"
                            placeholder="ชื่อเอกสาร..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">หมวดหมู่</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            >
                                {dynamicCategories.length === 0 && <option value="">ไม่ได้เลือกหมวดหมู่</option>}
                                {dynamicCategories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">รายละเอียด (Description)</label>
                        <RichTextEditor
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            placeholder="รายละเอียดเกี่ยวกับเอกสาร..."
                        />
                    </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm font-medium border border-blue-100 flex items-start gap-2">
                    <div className="mt-0.5">ℹ️</div>
                    <p>ระบบอัปโหลดไฟล์ยังอยู่ในระหว่างการพัฒนา ในเวอร์ชันนี้กรุณาสร้างรายการเอกสารก่อน แล้วอัปโหลดไฟล์ผ่าน Strapi Backend หากจำเป็น</p>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
                    <Link href={`/admin/documents?site=${siteParam}`} className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        สร้างเอกสาร
                    </button>
                </div>
            </form>
        </div>
    );
}
