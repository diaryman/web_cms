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

    try {
        const config = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        announcement = config.data?.[0]?.announcement;
    } catch (e) {
        console.error("Error fetching PDPA config", e);
    }

    return (
        <>
            <NewsTicker domain={domain} announcement={announcement} />
            <PDPAPageClient
                navbar={<Navbar domain={domain} />}
                footer={<Footer domain={domain} />}
            />
        </>
    );
}
