import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"; // <-- 1. Import SpeedInsights
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
  title: "Vedant Bhamare | AI Portfolio",
  description:
    "Interactive AI portfolio of Vedant Bhamare, a Software Developer & UI Engineer specializing in React, Next.js, and AI systems.",
  keywords: [
    "Vedant Bhamare",
    "Portfolio",
    "AI",
    "Frontend Developer",
    "Next.js",
    "React",
    "UI Engineer",
    "SDE",
  ],
  authors: [{ name: "Vedant Bhamare" }],
  openGraph: {
    title: "Vedant Bhamare | AI Portfolio",
    description:
      "Interactive AI portfolio of Vedant Bhamare, a Software Developer & UI Engineer.",
    siteName: "Vedant Bhamare AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}