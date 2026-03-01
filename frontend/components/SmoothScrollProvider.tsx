"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isAdmin) {
            document.documentElement.classList.remove('lenis-smooth');
            document.documentElement.style.scrollBehavior = 'auto';
            return;
        }

        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Add a class to html for hiding native scrollbars styling via CSS if desired
        document.documentElement.classList.add('lenis-smooth');
        document.documentElement.style.scrollBehavior = 'auto';

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis-smooth');
        };
    }, [isAdmin]);

    return <>{children}</>;
}
