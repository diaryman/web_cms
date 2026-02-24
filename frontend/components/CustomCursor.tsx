"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);

    // Smooth trailing effect
    const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

    useEffect(() => {
        setMounted(true);
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    if (!mounted) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] hidden lg:block"
            style={{
                x: cursorX,
                y: cursorY,
            }}
        />
    );
}
