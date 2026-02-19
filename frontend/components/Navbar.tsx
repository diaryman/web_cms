import { fetchAPI } from "@/lib/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar({ domain = "localhost:3000" }: { domain?: string }) {
    // Fetch site config (Server Side)
    let siteName = domain === "pdpa.localhost" ? "PDPA Center" : "DataGOV";
    let navItems = undefined;

    if (domain === "pdpa.localhost") {
        navItems = [
            { name: "หน้าแรก", href: "/pdpa" },
            { name: "ข่าวกิจกรรม", href: "/news?site=pdpa" },
            { name: "DataGOV", href: "http://localhost:3002" },
            { name: "นโยบาย/มาตรฐาน", href: "/pdpa#principles" },
            { name: "เอกสารเผยแพร่", href: "/pdpa/documents" },
            { name: "ดาวน์โหลด", href: "/pdpa#documents" },
            { name: "ติดต่อเรา", href: "/pdpa/contact" },
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
        }
    } catch (e) {
        console.error("Error fetching navbar config", e);
    }

    return <NavbarClient siteName={siteName} navItems={navItems} domain={domain} />;
}
