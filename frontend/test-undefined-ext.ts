import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

try {
    const instance = new Editor({
        // We explicitly pass undefined as an extension
        extensions: [
            StarterKit,
            undefined as any
        ],
        content: "",
    });
    console.log("SUCCESS!");
} catch (e: any) {
    console.error("ERROR:");
    console.error(e.message);
    console.error(e.stack);
}
