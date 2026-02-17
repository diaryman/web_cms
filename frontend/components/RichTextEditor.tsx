"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { useEffect, useRef } from 'react';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link2,
    Image as ImageIcon,
    Heading1,
    Heading2,
    Code,
    Underline as UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Upload,
    Highlighter
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "เริ่มพิมพ์เนื้อหา..." }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-accent underline',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3',
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                editor.chain().focus().setImage({ src: base64 }).run();
            };
            reader.readAsDataURL(file);
        }
    };

    const addImageFromUrl = () => {
        const url = window.prompt('URL รูปภาพ:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-white">
                {/* Text Formatting */}
                <div className="flex gap-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('bold') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="ตัวหนา (Ctrl+B)"
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('italic') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="ตัวเอียง (Ctrl+I)"
                    >
                        <Italic size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('underline') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="ขีดเส้นใต้ (Ctrl+U)"
                    >
                        <UnderlineIcon size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('highlight') ? 'bg-yellow-100 text-primary' : 'text-gray-600'}`}
                        title="ไฮไลท์"
                    >
                        <Highlighter size={18} />
                    </button>
                </div>

                {/* Headings */}
                <div className="flex gap-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="หัวข้อใหญ่"
                    >
                        <Heading1 size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="หัวข้อกลาง"
                    >
                        <Heading2 size={18} />
                    </button>
                </div>

                {/* Text Alignment */}
                <div className="flex gap-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="ชิดซ้าย"
                    >
                        <AlignLeft size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="กึ่งกลาง"
                    >
                        <AlignCenter size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="ชิดขวา"
                    >
                        <AlignRight size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="เต็มแนว"
                    >
                        <AlignJustify size={18} />
                    </button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('bulletList') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="รายการแบบจุด"
                    >
                        <List size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('orderedList') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="รายการแบบตัวเลข"
                    >
                        <ListOrdered size={18} />
                    </button>
                </div>

                {/* Quote & Code */}
                <div className="flex gap-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('blockquote') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="ข้อความอ้างอิง"
                    >
                        <Quote size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('codeBlock') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="โค้ด"
                    >
                        <Code size={18} />
                    </button>
                </div>

                {/* Link & Image */}
                <div className="flex gap-1 pr-2 border-r border-gray-200">
                    <button
                        type="button"
                        onClick={setLink}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${editor.isActive('link') ? 'bg-blue-100 text-primary' : 'text-gray-600'}`}
                        title="เพิ่มลิงก์"
                    >
                        <Link2 size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
                        title="อัปโหลดรูปภาพ"
                    >
                        <Upload size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={addImageFromUrl}
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600"
                        title="รูปภาพจาก URL"
                    >
                        <ImageIcon size={18} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                {/* Undo & Redo */}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="ย้อนกลับ"
                    >
                        <Undo size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="ทำซ้ำ"
                    >
                        <Redo size={18} />
                    </button>
                </div>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-white" />
        </div>
    );
}
