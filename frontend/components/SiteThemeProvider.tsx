"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteThemeProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const fetchTheme = async () => {
            const domain = window.location.host;
            const isPDPA = pathname.startsWith("/pdpa");
            const targetDomain = isPDPA ? "pdpa.localhost" : domain;

            try {
                const { fetchAPI } = await import("@/lib/api");
                const res = await fetchAPI("/site-configs", {
                    filters: { domain: targetDomain }
                });

                if (res.data && res.data.length > 0) {
                    const config = res.data[0];
                    const colors = config.themeColors;

                    if (colors) {
                        const root = document.documentElement;
                        if (colors.primary) root.style.setProperty("--primary-color", colors.primary);
                        if (colors.accent) {
                            root.style.setProperty("--accent-color", colors.accent);
                            // Generate some variants if possible or just use the UI defaults
                            root.style.setProperty("--hero-gradient-from", colors.primary);
                            root.style.setProperty("--hero-gradient-to", colors.accent);
                        }
                    }
                }
            } catch (err) {
                console.error("Theme fetch failed:", err);
            }
        };

        const host = window.location.host;
        const port = window.location.port;
        const isPDPA = pathname.startsWith("/pdpa") || port === "3004";
        document.documentElement.setAttribute("data-theme", isPDPA ? "pdpa" : "datagov");

        fetchTheme();
    }, [pathname]);

    return <>{children}</>;
}
