import DocumentsPageClient from "@/app/documents/DocumentsPageClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import { fetchAPI } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ศูนย์รวมเอกสารเผยแพร่ | PDPA Admin Court",
    description: "คลังเอกสาร นโยบาย ประกาศ และแบบฟอร์มการคุ้มครองข้อมูลส่วนบุคคล สำนักงานศาลปกครอง",
};

export default async function PDPADocumentsPage() {
    const domain = "pdpa.localhost";
    let announcement = undefined;

    try {
        const config = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        announcement = config.data?.[0]?.announcement;
    } catch (e) {
        console.error("Error fetching announcement", e);
    }

    return (
        <>
            <NewsTicker domain={domain} announcement={announcement} />
            <DocumentsPageClient
                navbar={<Navbar domain={domain} />}
                footer={<Footer domain={domain} />}
                domain={domain}
            />
        </>
    );
}
