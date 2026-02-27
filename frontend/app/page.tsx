import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import PolicySection from "@/components/PolicySection";
import ActivitiesSection from "@/components/ActivitiesSection";
import DownloadsSection from "@/components/DownloadsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_DATAGOV_URL || "http://localhost:3002";

export const metadata: Metadata = {
  title: "DataGOV | ศูนย์กลางธรรมาภิบาลข้อมูล ศาลปกครอง",
  description: "ระบบบริหารจัดการและกำกับดูแลข้อมูลอิเล็กทรอนิกส์ สำนักงานศาลปกครอง ภายใต้มาตรฐานธรรมาภิบาลข้อมูลภาครัฐ",
  keywords: ["ธรรมาภิบาลข้อมูล", "ศาลปกครอง", "DataGOV", "Open Data", "ข้อมูลภาครัฐ", "DGA"],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "DataGOV | ศูนย์กลางธรรมาภิบาลข้อมูล ศาลปกครอง",
    description: "ระบบบริหารจัดการและกำกับดูแลข้อมูลอิเล็กทรอนิกส์ สำนักงานศาลปกครอง ภายใต้มาตรฐานธรรมาภิบาลข้อมูลภาครัฐ",
    url: SITE_URL,
    siteName: "DataGOV ศาลปกครอง",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataGOV | ธรรมาภิบาลข้อมูล ศาลปกครอง",
    description: "ระบบบริหารจัดการและกำกับดูแลข้อมูลภาครัฐ สำนักงานศาลปกครอง",
  },
  robots: { index: true, follow: true },
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
  if (host.includes(":3004")) domain = "pdpa.localhost";
  else if (host.includes(":3002")) domain = "localhost";
  else if (host.includes(":3000")) domain = "localhost";
  else domain = host.split(":")[0];

  // กำหนด Theme ตาม Domain (ใช้สำหรับ Layout Wrapper หรือผ่าน Context)
  const theme = domain.includes("pdpa") ? "pdpa" : "datagov";

  let announcement = undefined;
  let siteConfig = undefined;
  let slides = [];
  let activities = [];

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

    const activitiesRes = await fetchAPI("/articles", {
      filters: { domain },
      sort: ["publishedAt:desc"],
      pagination: { limit: 3 },
      populate: "*"
    });
    activities = activitiesRes.data || [];
  } catch (e) {
    console.error("Error fetching home data", e);
  }

  const toggles = siteConfig?.sectionToggles || {};
  const showHero = toggles.hero !== false;
  const showPolicies = toggles.policies !== false;
  const showActivities = toggles.activities !== false;
  const showDownloads = toggles.downloads !== false;

  return (
    <main id="main-content" className="min-h-screen selection:bg-accent/30 relative">
      <div className="noise-overlay" />
      <ScrollProgress />
      <BackToTop />
      <NewsTicker domain={domain} announcement={announcement} notifications={siteConfig?.notifications} />
      <Navbar domain={domain} />

      {/* ── Hero ── dark/primary bg */}
      {showHero && (
        <Hero
          headline={siteConfig?.heroHeadline}
          subHeadline={siteConfig?.heroSubheadline}
          heroStats={siteConfig?.heroStats}
          slides={slides}
        />
      )}

      {/* Divider: Hero (primary-dark) → PolicySection (white) — smooth wave */}
      {showHero && showPolicies && (
        <div style={{ background: "var(--primary-color)", lineHeight: 0, overflow: "hidden" }}>
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 90 }}>
            <path d="M0,45 C240,90 480,0 720,45 C960,90 1200,10 1440,45 L1440,90 L0,90 Z" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* ── Policy ── white bg */}
      {showPolicies && <PolicySection domain={domain} />}

      {/* Divider: PolicySection (white) → ActivitiesSection (slate-50) — diagonal tilt */}
      {showPolicies && showActivities && (
        <div style={{ background: "#ffffff", lineHeight: 0, overflow: "hidden" }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
            <path d="M0,0 L1440,70 L1440,70 L0,70 Z" fill="#f1f5f9" />
          </svg>
        </div>
      )}

      {/* ── Activities ── slate-100 bg */}
      <div style={{ background: "#f1f5f9" }}>
        {showActivities && <ActivitiesSection domain={domain} initialActivities={activities} />}
      </div>

      {/* Divider: ActivitiesSection (slate-100) → DownloadsSection (white) — arc/curve */}
      {showActivities && showDownloads && (
        <div style={{ background: "#f1f5f9", lineHeight: 0, overflow: "hidden" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
            <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      )}

      {/* ── Downloads ── white bg */}
      {showDownloads && <DownloadsSection domain={domain} />}

      {/* Divider: DownloadsSection (white) → Newsletter (primary-dark) — multi-layer wave */}
      <div style={{ background: "#ffffff", lineHeight: 0, overflow: "hidden" }}>
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 100 }}>
          <path d="M0,55 C360,100 720,20 1080,60 C1260,80 1380,45 1440,55 L1440,100 L0,100 Z" fill="var(--primary-color)" opacity="0.35" />
          <path d="M0,68 C300,28 600,95 900,52 C1100,20 1300,72 1440,68 L1440,100 L0,100 Z" fill="var(--primary-color)" opacity="0.65" />
          <path d="M0,80 C200,58 500,100 800,75 C1060,52 1260,84 1440,80 L1440,100 L0,100 Z" fill="var(--primary-color)" />
        </svg>
      </div>

      {/* ── Newsletter ── primary dark bg */}
      <NewsletterSection domain={domain} />

      <Footer domain={domain} />
    </main>
  );
}
