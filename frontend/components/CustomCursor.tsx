"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Smooth trailing effect
    const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
    const cursorY = useSpring(0, { damping: 25, stiffness: 300 });
    const size = isHovering ? 64 : 32;

    useEffect(() => {
        setMounted(true);
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - size / 2);
            cursorY.set(e.clientY - size / 2);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Magnetic scale triggers on links, buttons, inputs, and anything with .magnetic class
            if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('.magnetic') || target.closest('[role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, size]);

    if (!mounted) return null;

    return (
        <motion.div
            className={`fixed top-0 left-0 rounded-full border-2 border-accent pointer-events-none z-[99999] hidden lg:flex items-center justify-center transition-colors duration-300 ${isHovering ? 'bg-accent/10 border-accent/70 backdrop-blur-sm' : ''}`}
            style={{
                x: cursorX,
                y: cursorY,
                width: size,
                height: size,
            }}
        >
            {isHovering ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-primary rounded-full absolute" />
            ) : null}
        </motion.div>
    );
}
