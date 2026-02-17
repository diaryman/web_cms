import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import PDPAPageClient from "./PDPAPageClient";
import { fetchAPI } from "@/lib/api";

export const metadata = {
    title: "PDPA | การคุ้มครองข้อมูลส่วนบุคคล - ศาลปกครอง",
    description: "การดำเนินงานด้านการคุ้มครองข้อมูลส่วนบุคคล สำนักงานศาลปกครอง",
};

export default async function PDPAPage() {
    const domain = "pdpa.localhost";
    let announcement = undefined;

    let siteConfig = undefined;
    let features = [];

    try {
        const configRes = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        siteConfig = configRes.data?.[0];
        announcement = siteConfig?.announcement;

        const featuresRes = await fetchAPI("/features", {
            filters: { domain, section: "PDPA Principles" },
            sort: ["order:asc"]
        });
        features = featuresRes.data || [];
    } catch (e) {
        console.error("Error fetching PDPA data", e);
    }

    return (
        <>
            <NewsTicker domain={domain} announcement={announcement} />
            <PDPAPageClient
                navbar={<Navbar domain={domain} />}
                footer={<Footer domain={domain} />}
                siteConfig={siteConfig}
                features={features}
            />
        </>
    );
}
