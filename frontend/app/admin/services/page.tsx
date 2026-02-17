"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Plus, Edit, Trash2, Loader2, GripVertical, Download, Wrench, Package } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    const searchParams = useSearchParams();
    const siteParam = searchParams.get("site") || "main";
    const domain = siteParam === "pdpa" ? "pdpa.localhost" : "localhost:3000";

    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "Download",
        link: "",
        category: "service",
        domain: domain,
        order: 0,
        isActive: true
    });

    const iconOptions = ["Download", "Wrench", "Package", "Shield", "Database", "FileText", "Settings"];
    const categoryLabels: any = {
        "download": "ดาวน์โหลด",
        "service": "บริการ",
        "tool": "เครื่องมือ"
    };

    useEffect(() => {
        loadServices();
    }, [domain]);

    const loadServices = async () => {
        try {
            const res = await fetchAPI("/services", {
                filters: { domain },
                sort: ["order:asc"],
                pagination: { pageSize: 100 }
            });
            setServices(res.data || []);
        } catch (error) {
            console.error("Error loading services", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing) {
                await fetchAPI(`/services/${editing.id}`, {}, {
                    method: "PUT",
                    body: JSON.stringify({ data: formData })
                });
                alert("อัปเดตบริการเรียบร้อย");
            } else {
                await fetchAPI("/services", {}, {
                    method: "POST",
                    body: JSON.stringify({ data: formData })
                });
                alert("สร้างบริการเรียบร้อย");
            }
            setShowModal(false);
            resetForm();
            loadServices();
        } catch (error) {
            console.error("Error saving service", error);
            alert("บันทึกไม่สำเร็จ");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("ต้องการลบบริการนี้?")) return;
        try {
            await fetchAPI(`/services/${id}`, {}, { method: "DELETE" });
            alert("ลบเรียบร้อย");
            loadServices();
        } catch (error) {
            console.error("Error deleting service", error);
            alert("ลบไม่สำเร็จ");
        }
    };

    const openEditModal = (service: any) => {
        setEditing(service);
        setFormData({
            title: service.title,
            description: service.description || "",
            icon: service.icon || "Download",
            link: service.link || "",
            category: service.category || "service",
            domain: service.domain,
            order: service.order || 0,
            isActive: service.isActive !== false
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({
            title: "",
            description: "",
            icon: "Download",
            link: "",
            category: "service",
            domain: domain,
            order: 0,
            isActive: true
        });
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black font-heading text-primary">บริการและดาวน์โหลด</h1>
                    <p className="text-gray-400 font-medium mt-2">จัดการรายการบริการและเอกสารดาวน์โหลดสำหรับ {siteParam === "pdpa" ? "PDPA Center" : "DataGOV"}</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-accent transition-all active:scale-95 flex items-center gap-2"
                >
                    <Plus size={20} />
                    เพิ่มบริการ
                </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <GripVertical className="text-gray-300" size={16} />
                                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-600">
                                    {categoryLabels[service.category] || service.category}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(service)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Edit size={16} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                        {service.link && (
                            <a href={service.link} className="text-xs text-accent hover:underline mt-2 block truncate">
                                {service.link}
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-400 font-medium">ยังไม่มีบริการ คลิก "เพิ่มบริการ" เพื่อเริ่มต้น</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black mb-6">{editing ? "แก้ไขบริการ" : "เพิ่มบริการใหม่"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">ชื่อบริการ</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">คำอธิบาย</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
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
                                        <option value="service">บริการ</option>
                                        <option value="download">ดาวน์โหลด</option>
                                        <option value="tool">เครื่องมือ</option>
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
                                <label className="block text-sm font-bold mb-2">ลิงก์ (URL)</label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="https://..."
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
