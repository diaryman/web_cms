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

export default async function Home() {
  const domain = "localhost:3000";
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
      <Footer />
    </main>
  );
}
