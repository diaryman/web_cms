import ContactPageClient from "./ContactPageClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import NewsTicker from "@/components/NewsTicker";
import { fetchAPI } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ติดต่อเรา | DataGOV Admin Court",
    description: "ช่องทางติดต่อสอบถาม ขอใช้ข้อมูล หรือแจ้งเรื่องร้องเรียน ศูนย์กลางธรรมาภิบาลข้อมูล สำนักงานศาลปกครอง",
};

export default async function ContactPage() {
    const domain = "localhost:3000";
    let announcement = undefined;
    let siteConfig = undefined;

    try {
        const configRes = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        siteConfig = configRes.data?.[0];
        announcement = siteConfig?.announcement;
    } catch (e) {
        console.error("Error fetching announcement", e);
    }

    return (
        <>
            <NewsTicker domain={domain} announcement={announcement} />
            <ContactPageClient
                domain={domain}
                navbar={<Navbar domain={domain} />}
                footer={<Footer domain={domain} />}
                contactForm={<ContactForm domain={domain} />}
                siteConfig={siteConfig}
            />
        </>
    );
}
