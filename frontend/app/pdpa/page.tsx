import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import PDPAPageClient from "./PDPAPageClient";
import { fetchAPI } from "@/lib/api";

export const metadata = {
    title: "PDPA | การคุ้มครองข้อมูลส่วนบุคคล - ศาลปกครอง",
    description: "การดำเนินงานด้านการคุ้มครองข้อมูลส่วนบุคคล สำนักงานศาลปกครอง",
};

import { headers } from "next/headers";

export default async function PDPAPage() {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost";

    // Normalize domain for config matching
    let domain = host;
    if (host.includes(":3004")) domain = "pdpa.localhost";
    else if (host.includes(":3002")) domain = "localhost";
    else if (host.includes(":3000")) domain = "localhost";
    else domain = host.split(":")[0];

    let announcement = undefined;
    let siteConfig = undefined;
    let features: any[] = [];
    let articles: any[] = [];
    let documents: any[] = [];
    let timelineItems: any[] = [];

    try {
        // Parallel fetch everything for maximum TTFB performance
        const [configRes, featuresRes, articlesRes, docsRes, timelineRes] = await Promise.allSettled([
            fetchAPI("/site-configs", { filters: { domain } }),
            fetchAPI("/features", { filters: { domain, section: "PDPA Principles" }, sort: ["order:asc"] }),
            fetchAPI("/articles", {
                filters: { domain },
                sort: ["publishedAt:desc"],
                pagination: { limit: 3 },
                populate: ["coverImage", "category"]
            }),
            fetchAPI("/policy-documents", { filters: { domain }, sort: ["createdAt:desc"], populate: "*" }),
            fetchAPI("/timelines", { filters: { domain }, sort: ["order:asc"] }),
        ]);

        if (configRes.status === "fulfilled") {
            siteConfig = configRes.value.data?.[0];
            announcement = siteConfig?.announcement;
        }
        if (featuresRes.status === "fulfilled") features = featuresRes.value.data || [];
        if (articlesRes.status === "fulfilled") articles = articlesRes.value.data || [];
        if (docsRes.status === "fulfilled") documents = docsRes.value.data || [];
        if (timelineRes.status === "fulfilled") timelineItems = timelineRes.value.data || [];
    } catch (e) {
        console.error("Error fetching PDPA data", e);
    }

    return (
        <>
            <NewsTicker domain={domain} announcement={announcement} notifications={siteConfig?.notifications} />
            <PDPAPageClient
                navbar={<Navbar domain={domain} />}
                footer={<Footer domain={domain} />}
                siteConfig={siteConfig}
                features={features}
                initialArticles={articles}
                initialDocuments={documents}
                initialTimeline={timelineItems}
            />
        </>
    );
}

