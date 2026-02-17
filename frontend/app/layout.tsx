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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${sarabun.variable} ${prompt.variable} antialiased font-sans`}
      >
        <CustomCursor />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
