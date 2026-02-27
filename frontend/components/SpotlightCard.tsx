"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    as?: any;
    [key: string]: any;
}

export default function SpotlightCard({
    children,
    className = "",
    style = {},
    as: Component = motion.div,
    ...props
}: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // useMotionTemplate creates a reactive MotionValue from the template —
    // Framer Motion handles the streaming update without any hydration mismatch.
    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--accent-glow, rgba(59,130,246,0.08)), transparent 40%)`;

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <Component
            onMouseMove={handleMouseMove}
            className={`relative overflow-hidden ${className}`}
            style={style}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 transition duration-300 group-hover:opacity-100"
                style={{ background }}
            />
            {children}
        </Component>
    );
}
