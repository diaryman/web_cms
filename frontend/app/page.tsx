import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import PolicySection from "@/components/PolicySection";
import ActivitiesSection from "@/components/ActivitiesSection";
import DownloadsSection from "@/components/DownloadsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DataGOV | ศูนย์กลางธรรมาภิบาลข้อมูล ศาลปกครอง",
  description: "ระบบบริหารจัดการและกำกับดูแลข้อมูลอิเล็กทรอนิกส์ สำนักงานศาลปกครอง ภายใต้มาตรฐานธรรมาภิบาลข้อมูลภาครัฐ",
};

import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { fetchAPI } from "@/lib/api";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";

  // Normalize domain for config matching
  let domain = host;
  if (host.includes(":3002")) domain = "pdpa.localhost";
  else if (host.includes(":3000")) domain = "localhost";
  else domain = host.split(":")[0];

  // กำหนด Theme ตาม Domain (ใช้สำหรับ Layout Wrapper หรือผ่าน Context)
  const theme = domain.includes("pdpa") ? "pdpa" : "datagov";

  let announcement = undefined;
  let siteConfig = undefined;
  let slides = [];

  try {
    const config = await fetchAPI("/site-configs", {
      filters: { domain }
    });
    siteConfig = config.data?.[0];
    announcement = siteConfig?.announcement;

    const slidesRes = await fetchAPI("/hero-slides", {
      filters: { domain, isActive: true },
      populate: ["image"],
      sort: ["displayOrder:asc"]
    });
    slides = slidesRes.data || [];
  } catch (e) {
    console.error("Error fetching home data", e);
  }

  const toggles = siteConfig?.sectionToggles || {};
  const showHero = toggles.hero !== false;
  const showPolicies = toggles.policies !== false;
  const showActivities = toggles.activities !== false;
  const showDownloads = toggles.downloads !== false;

  return (
    <main className="min-h-screen selection:bg-accent/30 relative">
      <div className="noise-overlay" />
      <ScrollProgress />
      <BackToTop />
      <NewsTicker domain={domain} announcement={announcement} notifications={siteConfig?.notifications} />
      <Navbar domain={domain} />
      {showHero && (
        <Hero
          headline={siteConfig?.heroHeadline}
          subHeadline={siteConfig?.heroSubheadline}
          heroStats={siteConfig?.heroStats}
          slides={slides}
        />
      )}
      {showPolicies && <PolicySection domain={domain} />}
      {showActivities && <ActivitiesSection domain={domain} />}
      {showDownloads && <DownloadsSection domain={domain} />}
      <NewsletterSection domain={domain} />
      <Footer domain={domain} />
    </main>
  );
}
