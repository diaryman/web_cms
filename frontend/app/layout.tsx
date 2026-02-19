import type { Metadata } from "next";
import { Sarabun, Prompt } from "next/font/google";
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

export const metadata: Metadata = {
  title: "DataGOV - Data Governance Administrative Court",
  description: "ศูนย์กลางข้อมูลธรรมาภิบาล สำนักงานศาลปกครอง",
};

import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import ChatWidget from "@/components/ChatWidget";
import SiteThemeProvider from "@/components/SiteThemeProvider";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost";
  const domain = host.split(":")[0]; // ตัด port ออก

  return (
    <html lang="th" data-theme="datagov">
      <body
        className={`${sarabun.variable} ${prompt.variable} antialiased font-sans`}
      >
        <SiteThemeProvider>
          <CustomCursor />
          {children}
          <BackToTop />
          <ChatWidget domainOverride={domain} />
        </SiteThemeProvider>
      </body>
    </html>
  );
}
