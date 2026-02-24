"use client";

import React, { useRef, useEffect, useState } from "react";
import {
    Bold, Italic, Underline, Strikethrough,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Upload,
    AlignLeft, AlignCenter, AlignRight, RemoveFormatting,
    Quote, Images, FolderSearch, X, Loader2, Sparkles, Wand2, ChevronDown
} from "lucide-react";
import { uploadFile } from "@/app/actions/upload";
import { fetchAPI, getStrapiMedia } from "@/lib/api";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleries, setGalleries] = useState<any[]>([]);
    const [isGalleryLoading, setIsGalleryLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // AI Assist state
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [aiLoading, setAILoading] = useState(false);
    const [aiResult, setAIResult] = useState("");
    const [aiAction, setAIAction] = useState("");
    const [showAIResult, setShowAIResult] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const hasInitialSet = useRef(false);

    // Set initial content securely when both editor is ready and data is available
    useEffect(() => {
        if (isMounted && editorRef.current && value && !hasInitialSet.current) {
            editorRef.current.innerHTML = value;
            hasInitialSet.current = true;
        }
    }, [value, isMounted]);

    const handleChange = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const exec = (command: string, arg: string | undefined = undefined) => {
        document.execCommand(command, false, arg);
        editorRef.current?.focus();
        handleChange();
    };

    const handleFormatBlock = (tag: string) => {
        exec("formatBlock", tag);
    };

    const addLink = () => {
        const url = prompt("ระบุ URL ที่ต้องการให้ปุ่มหรือข้อความลิ้งก์ไป:");
        if (url) {
            exec("createLink", url);
        }
    };

    const addImage = () => {
        const url = prompt("ระบุ URL ของรูปภาพ (เช่น https://example.com/image.jpg):");
        if (url) {
            exec("insertImage", url);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("files", file);

            const uploadedFiles = await uploadFile(formData);
            if (uploadedFiles && uploadedFiles.length > 0) {
                const imageUrl = getStrapiMedia(uploadedFiles[0].url);
                if (imageUrl) {
                    exec("insertImage", imageUrl || undefined);
                }
            }
        } catch (error) {
            console.error("Upload failed in editor:", error);
            alert("อัพโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const openGalleryModal = async () => {
        setIsGalleryOpen(true);
        setIsGalleryLoading(true);
        try {
            const res = await fetchAPI("/galleries", { populate: ["images"] });
            setGalleries(res.data || []);
        } catch (error) {
            console.error("Failed to load galleries", error);
        } finally {
            setIsGalleryLoading(false);
        }
    };

    const insertGalleryImages = (images: any[]) => {
        images.forEach(img => {
            const url = getStrapiMedia(img.url);
            if (url) {
                const imgTag = `<img src="${url}" alt="${img.name}" style="max-width: 100%; height: auto; border-radius: 1.5rem; margin: 2rem auto; display: block; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);" />`;
                document.execCommand('insertHTML', false, imgTag);
            }
        });
        setIsGalleryOpen(false);
        handleChange();
    };

    // AI Assist handler
    const AI_ACTIONS = [
        { key: "improve", label: "✨ ปรับปรุงเนื้อหา", desc: "ทำให้สละสลวยและเป็นมืออาชีพ" },
        { key: "fix_grammar", label: "📝 แก้ไขไวยากรณ์", desc: "ตรวจสอบและแก้ไขคำผิด" },
        { key: "formal", label: "🏛️ ปรับเป็นภาษาทางการ", desc: "เหมาะสำหรับเอกสารราชการ" },
        { key: "summarize", label: "📋 สรุปย่อเนื้อหา", desc: "ย่อให้กระชับ 3-5 ประโยค" },
        { key: "expand", label: "📖 ขยายความ", desc: "เพิ่มรายละเอียดให้สมบูรณ์" },
        { key: "bullets", label: "• แปลงเป็นหัวข้อย่อย", desc: "Bullet points" },
        { key: "translate_en", label: "🌐 แปลเป็นภาษาอังกฤษ", desc: "Official English" },
    ];

    const handleAIAssist = async (actionKey: string) => {
        const currentText = editorRef.current?.innerText?.trim() || "";
        if (!currentText) {
            alert("กรุณาพิมพ์เนื้อหาก่อนใช้ AI ช่วยปรับแต่ง");
            return;
        }
        setAIAction(actionKey);
        setAILoading(true);
        setShowAIResult(false);
        setIsAIOpen(false);
        try {
            const res = await fetch("/api/ai-assist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: currentText, action: actionKey, domain: "localhost" }),
            });
            const data = await res.json();
            if (data.result) {
                setAIResult(data.result);
                setShowAIResult(true);
            } else {
                alert(data.error || "AI ไม่สามารถประมวลผลได้ในขณะนี้");
            }
        } catch (err) {
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ AI");
        } finally {
            setAILoading(false);
        }
    };

    const applyAIResult = () => {
        if (editorRef.current && aiResult) {
            // Convert plain text with newlines to HTML paragraphs
            const html = aiResult
                .split("\n")
                .filter(line => line.trim())
                .map(line => line.startsWith("-") ? `<li>${line.slice(1).trim()}</li>` : `<p>${line}</p>`)
                .join("");
            editorRef.current.innerHTML = html.includes("<li>") ? `<ul>${html}</ul>` : html;
            onChange(editorRef.current.innerHTML);
        }
        setShowAIResult(false);
        setAIResult("");
    };

    if (!isMounted) {
        return <div className="h-[400px] bg-gray-50 rounded-[2rem] animate-pulse border border-gray-100" />
    }

    const ToolbarButton = ({ icon: Icon, onClick, title, isActive = false, disabled = false }: any) => (
        <button
            type="button"
            disabled={disabled}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            title={title}
            className={`p-2.5 rounded-xl transition-all ${isActive
                ? "bg-blue-100 text-blue-700 shadow-sm"
                : disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/80"
                }`}
        >
            <Icon size={18} strokeWidth={2.5} className={disabled ? "animate-pulse" : ""} />
        </button>
    );

    const Divider = () => <div className="w-px h-6 bg-gray-200 mx-1.5 rounded-full"></div>;

    return (
        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50/80 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
                <ToolbarButton icon={Heading1} onClick={() => handleFormatBlock("H1")} title="Heading 1" />
                <ToolbarButton icon={Heading2} onClick={() => handleFormatBlock("H2")} title="Heading 2" />
                <ToolbarButton icon={Heading3} onClick={() => handleFormatBlock("H3")} title="Heading 3" />

                <Divider />

                <ToolbarButton icon={Bold} onClick={() => exec("bold")} title="ตัวหนา" />
                <ToolbarButton icon={Italic} onClick={() => exec("italic")} title="ตัวเอียง" />
                <ToolbarButton icon={Underline} onClick={() => exec("underline")} title="ขีดเส้นใต้" />
                <ToolbarButton icon={Strikethrough} onClick={() => exec("strikeThrough")} title="ขีดฆ่า" />

                <Divider />

                <ToolbarButton icon={AlignLeft} onClick={() => exec("justifyLeft")} title="ชิดซ้าย" />
                <ToolbarButton icon={AlignCenter} onClick={() => exec("justifyCenter")} title="กึ่งกลาง" />
                <ToolbarButton icon={AlignRight} onClick={() => exec("justifyRight")} title="ชิดขวา" />

                <Divider />

                <ToolbarButton icon={List} onClick={() => exec("insertUnorderedList")} title="ลิสต์แบบจุด" />
                <ToolbarButton icon={ListOrdered} onClick={() => exec("insertOrderedList")} title="ลิสต์แบบตัวเลข" />
                <ToolbarButton icon={Quote} onClick={() => handleFormatBlock("BLOCKQUOTE")} title="คำคม" />

                <Divider />

                <ToolbarButton icon={LinkIcon} onClick={addLink} title="แทรกลิงก์" />
                <ToolbarButton icon={ImageIcon} onClick={addImage} title="แทรกรูปภาพจาก URL" />
                <ToolbarButton icon={Upload} onClick={handleUploadClick} title="อัพโหลดรูปภาพ" disabled={isUploading} />
                <ToolbarButton icon={Images} onClick={openGalleryModal} title="ดึงรูปจากแกลเลอรี่ลูกเล่น" />

                <Divider />

                <ToolbarButton icon={RemoveFormatting} onClick={() => exec("removeFormat")} title="ล้างรูปแบบ" />

                {/* AI Assist Toolbar */}
                <div className="ml-auto relative">
                    <button
                        type="button"
                        onClick={() => setIsAIOpen(v => !v)}
                        disabled={aiLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                        AI ช่วยเขียน
                        <ChevronDown size={12} className={`transition-transform ${isAIOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isAIOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                            <div className="p-3 bg-gradient-to-r from-violet-50 to-blue-50 border-b border-gray-100">
                                <p className="text-[10px] font-black text-violet-700 uppercase tracking-widest">✨ AI Writing Assistant</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">เลือกการปรับแต่งที่ต้องการ</p>
                            </div>
                            <div className="py-2">
                                {AI_ACTIONS.map(action => (
                                    <button
                                        key={action.key}
                                        type="button"
                                        onClick={() => handleAIAssist(action.key)}
                                        className="w-full text-left px-4 py-2.5 hover:bg-violet-50 transition-colors group"
                                    >
                                        <p className="text-sm font-bold text-gray-800 group-hover:text-violet-700">{action.label}</p>
                                        <p className="text-[10px] text-gray-400">{action.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Loading indicator */}
            {aiLoading && (
                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-50 to-blue-50 border-b border-violet-100">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                        <Loader2 size={14} className="text-white animate-spin" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-violet-800">AI กำลังประมวลผล...</p>
                        <p className="text-[10px] text-violet-500">{AI_ACTIONS.find(a => a.key === aiAction)?.label}</p>
                    </div>
                </div>
            )}

            {/* AI Result Preview Panel */}
            {showAIResult && aiResult && (
                <div className="border-b border-violet-100 bg-gradient-to-br from-violet-50/60 to-blue-50/40">
                    <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                                <Sparkles size={12} className="text-white" />
                            </div>
                            <p className="text-sm font-black text-violet-800">ผลลัพธ์จาก AI</p>
                            <span className="px-2 py-0.5 bg-violet-100 text-violet-600 rounded-full text-[10px] font-bold">
                                {AI_ACTIONS.find(a => a.key === aiAction)?.label}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setShowAIResult(false); setAIResult(""); }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <div className="px-6 pb-4">
                        <div className="bg-white rounded-2xl border border-violet-100 p-5 text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap shadow-sm">
                            {aiResult}
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={applyAIResult}
                                className="flex-1 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
                            >
                                ✅ นำไปใช้แทนที่เนื้อหาเดิม
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowAIResult(false); setAIResult(""); }}
                                className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all"
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsGalleryOpen(false)} />
                    <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-primary font-heading">เลือกแกลเลอรี่ประกอบข่าว</h3>
                                <p className="text-xs text-gray-400 font-medium">คลิกที่อัลบั้มเพื่อดึงรูปภาพทั้งหมดลงในเนื้อหา</p>
                            </div>
                            <button onClick={() => setIsGalleryOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {isGalleryLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="animate-spin text-primary" size={40} />
                                    <p className="text-sm font-bold text-gray-400">กำลังโหลดแกลเลอรี่...</p>
                                </div>
                            ) : galleries.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {galleries.map(gallery => (
                                        <div
                                            key={gallery.id}
                                            onClick={() => insertGalleryImages(gallery.images)}
                                            className="group cursor-pointer bg-gray-50 rounded-3xl border border-gray-100 p-4 hover:border-primary hover:bg-white hover:shadow-xl transition-all duration-500"
                                        >
                                            <div className="aspect-[16/6] rounded-2xl overflow-hidden mb-4 bg-gray-200">
                                                {gallery.images?.[0] && (
                                                    <img src={getStrapiMedia(gallery.images[0].url) || ""} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                )}
                                            </div>
                                            <h4 className="font-bold text-primary group-hover:text-accent transition-colors">{gallery.title}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">จำนวน {gallery.images?.length || 0} รูปภาพ</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 flex flex-col items-center">
                                    <FolderSearch size={48} className="text-gray-200 mb-4" />
                                    <p className="text-gray-400 font-bold">ไม่พบแกลเลอรี่ในระบบ</p>
                                    <p className="text-xs text-gray-300 mt-1">กรุณาสร้างแกลเลอรี่ใหม่ที่เมนูจัดการแกลเลอรี่</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Editor Container */}
            <div className="relative flex-1 bg-white">
                <style jsx global>{`
                    .custom-native-editor {
                        min-height: 400px;
                        padding: 32px;
                        outline: none;
                        font-family: inherit;
                        font-size: 1.125rem; /* 18px */
                        line-height: 1.8;
                        color: #374151; /* gray-700 */
                    }
                    
                    /* Typography Base */
                    .custom-native-editor h1 { font-family: var(--font-prompt, inherit); font-size: 2.25em; font-weight: 800; margin-top: 1.5em; margin-bottom: 0.5em; line-height: 1.3; color: #111827; }
                    .custom-native-editor h2 { font-family: var(--font-prompt, inherit); font-size: 1.75em; font-weight: 700; margin-top: 1.5em; margin-bottom: 0.5em; line-height: 1.35; color: #1f2937; }
                    .custom-native-editor h3 { font-family: var(--font-prompt, inherit); font-size: 1.375em; font-weight: 600; margin-top: 1.2em; margin-bottom: 0.5em; line-height: 1.4; color: #374151; }
                    .custom-native-editor p { margin-bottom: 1.25em; font-size: 1.125em; }
                    
                    /* Lists */
                    .custom-native-editor ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.25em; }
                    .custom-native-editor ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1.25em; }
                    .custom-native-editor li { margin-bottom: 0.5em; }
                    
                    /* Elements */
                    .custom-native-editor a {
                        color: var(--accent-color, #2563eb);
                        text-decoration: underline;
                        font-weight: 600;
                    }
                    .custom-native-editor img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 1.5rem;
                        margin: 2rem auto;
                        display: block;
                        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
                    }
                    .custom-native-editor blockquote {
                        border-left: 6px solid var(--accent-color, #2563eb);
                        padding: 1.5rem 2rem;
                        background: #f8fafc;
                        font-style: italic;
                        border-radius: 0 1.5rem 1.5rem 0;
                        margin: 2rem 0;
                        color: #475569;
                    }
                    
                    /* Placeholder handling */
                    .custom-native-editor:empty:before {
                        content: attr(data-placeholder);
                        color: #9ca3af;
                        cursor: text;
                    }
                `}</style>
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleChange}
                    onBlur={handleChange}
                    onKeyUp={handleChange}
                    onPaste={handleChange}
                    onDrop={handleChange}
                    data-placeholder={placeholder || "เริ่มเขียนเรื่องราวที่นี่..."}
                    className="custom-native-editor w-full focus:outline-none"
                    spellCheck="false"
                />
            </div>
        </div>
    );
}
