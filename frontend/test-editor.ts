import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';

try {
  const instance = new Editor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image
    ],
    content: "",
  });
  console.log("SUCCESS!");
} catch (e: any) {
  console.error("ERROR:");
  console.error(e.message);
  console.error(e.stack);
}
