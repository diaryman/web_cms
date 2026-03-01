"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Add a class to html for hiding native scrollbars styling via CSS if desired
        document.documentElement.classList.add('lenis-smooth');

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis-smooth');
        };
    }, []);

    return <>{children}</>;
}
