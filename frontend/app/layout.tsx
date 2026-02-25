import type { Metadata } from "next";
import { Sarabun, Prompt } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: 'swap',
});

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const isPDPA = host.includes("3004") || host.includes("pdpa");

  return isPDPA
    ? {
      title: {
        default: "PDPA | การคุ้มครองข้อมูลส่วนบุคคล - ศาลปกครอง",
        template: "%s | PDPA ศาลปกครอง",
      },
      description: "การดำเนินงานด้านการคุ้มครองข้อมูลส่วนบุคคล สำนักงานศาลปกครอง ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
      robots: { index: true, follow: true },
    }
    : {
      title: {
        default: "DataGOV | ศูนย์กลางธรรมาภิบาลข้อมูล ศาลปกครอง",
        template: "%s | DataGOV ศาลปกครอง",
      },
      description: "ระบบบริหารจัดการและกำกับดูแลข้อมูลอิเล็กทรอนิกส์ สำนักงานศาลปกครอง ภายใต้มาตรฐานธรรมาภิบาลข้อมูลภาครัฐ",
      robots: { index: true, follow: true },
    };
}

import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import ChatWidget from "@/components/ChatWidget";
import SiteThemeProvider from "@/components/SiteThemeProvider";
import CookieBanner from "@/components/CookieBanner";
import { fetchAPI } from "@/lib/api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";

  // Normalize domain for config fetching
  let domain = host;
  if (host.includes(":3004")) domain = "pdpa.localhost";
  else if (host.includes(":3002")) domain = "localhost";
  else if (host.includes(":3000")) domain = "localhost";
  else domain = host.split(":")[0];

  const theme = domain.includes("pdpa") ? "pdpa" : "datagov";

  // Fetch cookie consent config from site-config
  let cookieConsentConfig = undefined;
  try {
    const res = await fetchAPI("/site-configs", { filters: { domain } });
    const config = res.data?.[0];
    if (config?.cookieConsent) cookieConsentConfig = config.cookieConsent;
  } catch (e) {
    // Non-critical — banner simply won't show
  }

  return (
    <html lang="th" data-theme={theme}>
      <body
        className={`${sarabun.variable} ${prompt.variable} antialiased font-sans`}
      >
        {/* ── Skip to main content (WCAG 2.1 / DGA v3 accessibility requirement) ── */}
        <a
          href="#main-content"
          className="skip-link"
          aria-label="ข้ามไปยังเนื้อหาหลัก"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>

        <SiteThemeProvider>
          <CustomCursor />
          {/* id="main-content" is placed on <main> in each page — skip-link target */}
          {children}
          <BackToTop />
          <ChatWidget domainOverride={domain} />
          <CookieBanner config={cookieConsentConfig} domain={domain} />
        </SiteThemeProvider>
      </body>
    </html>
  );
}
