import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ✅ 1. 기본 도메인 설정
  metadataBase: new URL("https://www.test-archive.com"),

  // ✅ 2. 타이틀 템플릿 설정
  title: {
    default: "Test Archive",
    template: "%s | Test Archive",
  },

  description: "Your go-to library for every type of test. Whether you need a serious health check-up or a fun break, find the perfect assessment for you right here.",

  // ✅ 3. 검색 키워드 추가
  keywords: ["diabetes risk test", "biological age test", "health check", "personality test", "self assessment", "free online test"],

  openGraph: {
    title: "Test Archive",
    description: "Your go-to library for every type of test. Whether you need a serious health check-up or a fun break, find the perfect assessment for you right here.",
    url: "https://www.test-archive.com",
    siteName: "Test Archive",
    locale: "en_US",
    type: "website",
  },

  alternates: {
    canonical: "./",
  },

  verification: {
    google: [
      "SThx-uzJP9AYUQ7B-RBhhhUeMwzg7i9DoAiF9gMXtdg",
      "S9u-IoLoQSCDR-67pvLsR0GMWaDqejzZ4ceXQpsX_Uc"
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Test Archive",
    description: "Your go-to library for every type of test. Whether you need a serious health check-up or a fun break, find the perfect assessment for you right here.",
  },


};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <main className="min-h-[80vh]">
          {children}
        </main>

        <Footer />
        <GoogleAnalytics gaId="G-ELE4NP6T4M" />
      </body>
    </html>
  );
}
