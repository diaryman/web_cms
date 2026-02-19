"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-50 rounded-xl animate-pulse" />
});

export default function EditDocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const searchParams = useSearchParams();
    const router = useRouter();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: "",
        description: "",
        publishedAt: "",
        category: "", // Default category
        domain: domain
    });

    const categories = siteParam === "pdpa"
        ? ["นโยบายการคุ้มครองข้อมูล", "เอกสารเผยแพร่", "แบบฟอร์มคำร้อง", "คู่มือการปฏิบัติงาน"]
        : ["นโยบายและมาตรฐาน", "เอกสารเผยแพร่", "รายงานประจำปี", "คู่มือประชาชน"];


    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const res = await fetchAPI(`/policy-documents/${unwrappedParams.id}`);
                const doc = res.data;
                setFormData({
                    title: doc.title || "",
                    description: doc.description || "",
                    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString().slice(0, 16) : "",
                    category: doc.category || "เอกสารเผยแพร่",
                    domain: doc.domain || domain
                });
            } catch (error) {
                console.error("Error fetching doc", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [unwrappedParams.id, domain]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetchAPI(`/policy-documents/${unwrappedParams.id}`, {}, {
                method: "PUT",
                body: JSON.stringify({ data: formData })
            });
            alert("บันทึกเอกสารเรียบร้อย");
            router.push(`/admin/documents?site=${siteParam}`);
        } catch (error) {
            console.error("Error updating doc", error);
            alert("บันทึกเอกสารไม่สำเร็จ");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/admin/documents?site=${siteParam}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black font-heading text-primary leading-tight">แก้ไขข้อมูลเอกสาร</h1>
                    <p className="text-gray-400 font-medium">แก้ไขรายละเอียดเอกสารสำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
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
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
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

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
                    <Link href={`/admin/documents?site=${siteParam}`} className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
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
