"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteThemeProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const isPDPA = pathname.startsWith("/pdpa");
        document.documentElement.setAttribute("data-theme", isPDPA ? "pdpa" : "datagov");
    }, [pathname]);

    return <>{children}</>;
}
