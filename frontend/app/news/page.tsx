import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsPageClient from "./NewsPageClient";
import NewsTicker from "@/components/NewsTicker";
import { Metadata } from "next";
import { fetchAPI } from "@/lib/api";

export async function generateMetadata(props: { searchParams: Promise<{ site?: string }> }): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const isPDPA = searchParams.site === 'pdpa';

    return {
        title: isPDPA ? "กิจกรรมและประกาศ - PDPA Center" : "ข่าวสารและกิจกรรมล่าสุด - DataGOV",
        description: isPDPA
            ? "ติดตามข่าวสารและกิจกรรมล่าสุดด้านการคุ้มครองข้อมูลส่วนบุคคล"
            : "ติดตามข่าวสาร กิจกรรม และประกาศล่าสุดจากศูนย์กลางธรรมาภิบาลข้อมูล",
    };
}

export default async function NewsPage(props: { searchParams: Promise<{ page?: string; q?: string; site?: string }> }) {
    const searchParams = await props.searchParams;
    let domain = "localhost:3000";
    if (searchParams.site === "pdpa") {
        domain = "pdpa.localhost";
    }

    let announcement = undefined;
    let notifications = undefined;
    try {
        const config = await fetchAPI("/site-configs", {
            filters: { domain }
        });
        const siteConfig = config.data?.[0];
        announcement = siteConfig?.announcement;
        notifications = siteConfig?.notifications;
    } catch (e) {
        console.error("Error fetching announcement", e);
    }

    return (
        <>
            <NewsTicker domain={domain} announcement={announcement} notifications={notifications} />
            <NewsPageClient
                header={<Navbar domain={domain} />}
                footer={<Footer domain={domain} />}
                searchParamsPromise={props.searchParams}
                domain={domain}
            />
        </>
    );
}
