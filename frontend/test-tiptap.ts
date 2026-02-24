import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

try {
    const extensions = [
        StarterKit.configure({
            heading: { levels: [1, 2, 3] }
        }),
        Underline.configure(),
        TextStyle.configure(),
        Color.configure(),
        Highlight.configure({ multicolor: true }),
        Image.configure({ inline: true, allowBase64: true }),
        Link.configure({
            openOnClick: false,
            HTMLAttributes: { class: 'text-accent underline' }
        }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ];

    const validExtensions = extensions.filter(ext => ext !== undefined && ext !== null);

    const instance = new Editor({
        extensions: validExtensions,
        content: "",
    });

    console.log("Success!");
} catch (error) {
    const e = error as Error;
    console.error("FAILED:", e.message);
    console.log(e.stack);
}
