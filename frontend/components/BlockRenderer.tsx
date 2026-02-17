import Link from "next/link";
import { MoveLeft } from "lucide-react";

// Simple Block Renderer for Strapi 5 Blocks JSON
const BlockRenderer = ({ blocks }: { blocks: any[] }) => {
    if (!blocks) return null;

    return (
        <div className="space-y-6 leading-relaxed" style={{ color: 'var(--foreground)' }}>
            {blocks.map((block, index) => {
                switch (block.__component) {
                    case "shared.rich-text":
                        return (
                            <div key={index}>
                                {block.content?.map((innerBlock: any, i: number) => {
                                    if (innerBlock.type === 'paragraph') {
                                        return (
                                            <p key={i} className="mb-4">
                                                {innerBlock.children?.map((child: any, c: number) => {
                                                    if (child.bold) return <strong key={c}>{child.text}</strong>;
                                                    if (child.italic) return <em key={c}>{child.text}</em>;
                                                    return <span key={c}>{child.text}</span>;
                                                })}
                                            </p>
                                        )
                                    }
                                    // Handle other types like heading, list, etc. as needed
                                    return null;
                                })}
                            </div>
                        )
                    case "shared.hero":
                        return (
                            <div key={index} className="my-8 rounded-xl overflow-hidden shadow-lg">
                                <img src="https://placehold.co/800x400/1e3a8a/FFF?text=Hero+Image" alt="Hero" className="w-full h-auto object-cover" />
                            </div>
                        )
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default BlockRenderer;
