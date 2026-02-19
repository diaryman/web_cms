"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Plus, Edit, Trash2, Loader2, ShieldCheck, Lock, CheckCircle, FileCheck } from "lucide-react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-50 rounded-xl animate-pulse" />
});

export default function PoliciesPage() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost";

    const [policies, setPolicies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "ShieldCheck",
        category: "standard",
        domain: domain,
        order: 0,
        isActive: true,
        highlightValue: ""
    });

    const iconOptions = ["ShieldCheck", "Lock", "CheckCircle", "FileCheck", "Award", "Shield"];
    const categoryLabels: any = {
        "standard": "มาตรฐาน",
        "compliance": "การปฏิบัติตาม",
        "certification": "การรับรอง",
        "security": "ความปลอดภัย"
    };

    useEffect(() => {
        loadPolicies();
    }, [domain]);

    const loadPolicies = async () => {
        try {
            const res = await fetchAPI("/policies", {
                filters: { domain },
                sort: ["order:asc"],
                pagination: { pageSize: 100 }
            });
            setPolicies(res.data || []);
        } catch (error) {
            console.error("Error loading policies", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing) {
                await fetchAPI(`/policies/${editing.id}`, {}, {
                    method: "PUT",
                    body: JSON.stringify({ data: formData })
                });
                alert("อัปเดตนโยบายเรียบร้อย");
            } else {
                await fetchAPI("/policies", {}, {
                    method: "POST",
                    body: JSON.stringify({ data: formData })
                });
                alert("สร้างนโยบายเรียบร้อย");
            }
            setShowModal(false);
            resetForm();
            loadPolicies();
        } catch (error) {
            console.error("Error saving policy", error);
            alert("บันทึกไม่สำเร็จ");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("ต้องการลบนโยบายนี้?")) return;
        try {
            await fetchAPI(`/policies/${id}`, {}, { method: "DELETE" });
            alert("ลบเรียบร้อย");
            loadPolicies();
        } catch (error) {
            console.error("Error deleting policy", error);
            alert("ลบไม่สำเร็จ");
        }
    };

    const openEditModal = (policy: any) => {
        setEditing(policy);
        setFormData({
            title: policy.title,
            description: policy.description || "",
            icon: policy.icon || "ShieldCheck",
            category: policy.category || "standard",
            domain: policy.domain,
            order: policy.order || 0,
            isActive: policy.isActive !== false,
            highlightValue: policy.highlightValue || ""
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({
            title: "",
            description: "",
            icon: "ShieldCheck",
            category: "standard",
            domain: domain,
            order: 0,
            isActive: true,
            highlightValue: ""
        });
    };

    const IconComponent = ({ name }: { name: string }) => {
        const icons: any = { ShieldCheck, Lock, CheckCircle, FileCheck };
        const Icon = icons[name] || ShieldCheck;
        return <Icon size={20} />;
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black font-heading text-primary">นโยบายและมาตรฐาน</h1>
                    <p className="text-gray-400 font-medium mt-2">จัดการมาตรฐานและนโยบายการปฏิบัติสำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    เพิ่มนโยบาย
                </button>
            </div>

            {/* Policies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policies.map((policy) => (
                    <div key={policy.id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                                    <IconComponent name={policy.icon} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{policy.title}</h3>
                                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-600">
                                        {categoryLabels[policy.category] || policy.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(policy)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Edit size={16} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(policy.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>
                        {policy.highlightValue && (
                            <div className="text-2xl font-black text-blue-600 mb-2">{policy.highlightValue}</div>
                        )}
                        <div className="text-sm text-gray-500 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: policy.description || '' }} />
                    </div>
                ))}
            </div>

            {policies.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 font-medium">ยังไม่มีนโยบาย คลิก "เพิ่มนโยบาย" เพื่อเริ่มต้น</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black mb-6">{editing ? "แก้ไขนโยบาย" : "เพิ่มนโยบายใหม่"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">ชื่อนโยบาย/มาตรฐาน</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="เช่น ISO/IEC 27001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">คำอธิบาย</label>
                                <RichTextEditor
                                    value={formData.description}
                                    onChange={(value) => setFormData({ ...formData, description: value })}
                                    placeholder="รายละเอียดเกี่ยวกับนโยบายหรือมาตรฐาน..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">หมวดหมู่</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        <option value="standard">มาตรฐาน</option>
                                        <option value="compliance">การปฏิบัติตาม</option>
                                        <option value="certification">การรับรอง</option>
                                        <option value="security">ความปลอดภัย</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">ไอคอน</label>
                                    <select
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        {iconOptions.map(icon => (
                                            <option key={icon} value={icon}>{icon}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">ค่าไฮไลท์ (เช่น 99.9%)</label>
                                <input
                                    value={formData.highlightValue}
                                    onChange={(e) => setFormData({ ...formData, highlightValue: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="99.9% หรือ A+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">ลำดับการแสดงผล</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-accent transition-all"
                                >
                                    บันทึก
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
