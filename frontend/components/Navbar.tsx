import { fetchAPI } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar({ domain = "localhost" }: { domain?: string }) {
    // Fetch site config (Server Side)
    let siteName = domain === "pdpa.localhost" ? "PDPA Center" : "DataGOV";
    let navItems = undefined;
    let headerStyle = "style-1";
    let navbarMenuStyle = "pill";

    if (domain === "pdpa.localhost") {
        navItems = [
            { name: "หน้าแรก", href: "/" },
            { name: "ข่าวกิจกรรม", href: "/news" },
            { name: "DataGOV", href: process.env.NEXT_PUBLIC_DATAGOV_URL || "http://localhost:3002" },
            { name: "นโยบาย/มาตรฐาน", href: "/#principles" },
            { name: "เอกสารเผยแพร่", href: "/documents" },
            { name: "ดาวน์โหลด", href: "/#documents" },
            { name: "ติดต่อเรา", href: "/contact" },
        ];
    }

    try {
        const data = await fetchAPI("/site-configs", {
            filters: {
                domain: domain
            }
        });
        if (data.data?.length > 0) {
            const config = data.data[0];
            siteName = config.siteName;
            if (config.navbarMenu && config.navbarMenu.length > 0) {
                navItems = config.navbarMenu.map((item: any) => ({
                    name: item.label,
                    href: item.href
                }));
            }
            if (config.headerStyle) {
                headerStyle = config.headerStyle;
            }
            if (config.navbarMenuStyle) {
                navbarMenuStyle = config.navbarMenuStyle;
            }
        }
    } catch (e) {
        console.error("Error fetching navbar config", e);
    }

    return <NavbarClient siteName={siteName} navItems={navItems} domain={domain} headerStyle={headerStyle} navbarMenuStyle={navbarMenuStyle} />;
}
