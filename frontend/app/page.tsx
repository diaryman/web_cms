import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import PolicySection from "@/components/PolicySection";
import ActivitiesSection from "@/components/ActivitiesSection";
import DownloadsSection from "@/components/DownloadsSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DataGOV | ศูนย์กลางธรรมาภิบาลข้อมูล ศาลปกครอง",
  description: "ระบบบริหารจัดการและกำกับดูแลข้อมูลอิเล็กทรอนิกส์ สำนักงานศาลปกครอง ภายใต้มาตรฐานธรรมาภิบาลข้อมูลภาครัฐ",
};

import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { fetchAPI } from "@/lib/api";

export default async function Home() {
  const domain = "localhost:3000";
  let announcement = undefined;
  let siteConfig = undefined;

  try {
    const config = await fetchAPI("/site-configs", {
      filters: { domain }
    });
    siteConfig = config.data?.[0];
    announcement = siteConfig?.announcement;
  } catch (e) {
    console.error("Error fetching home config", e);
  }

  return (
    <main className="min-h-screen selection:bg-accent/30 relative">
      <div className="noise-overlay" />
      <ScrollProgress />
      <BackToTop />
      <NewsTicker domain={domain} announcement={announcement} />
      <Navbar domain={domain} />
      <Hero
        headline={siteConfig?.heroHeadline}
        subHeadline={siteConfig?.heroSubheadline}
      />
      <PolicySection domain={domain} />
      <ActivitiesSection />
      <DownloadsSection domain={domain} />
      <Footer />
    </main>
  );
}
