"use client";

import React, { useRef } from "react";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    as?: React.ElementType;
    [key: string]: any;
}

export default function SpotlightCard({
    children,
    className = "",
    style = {},
    as: Component = "div",
    ...props
}: SpotlightCardProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        if (overlayRef.current) {
            overlayRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, var(--accent-glow, rgba(59,130,246,0.08)), transparent 40%)`;
        }
    };

    const handleMouseLeave = () => {
        if (overlayRef.current) {
            overlayRef.current.style.background = "";
        }
    };

    return (
        <Component
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            style={style}
            {...props}
        >
            {/* Spotlight overlay — no inline style on server → no hydration mismatch */}
            <div
                ref={overlayRef}
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 transition duration-300 group-hover:opacity-100"
            />
            {children}
        </Component>
    );
}
