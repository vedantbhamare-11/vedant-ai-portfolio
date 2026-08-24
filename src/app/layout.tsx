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
  title: "Vedant Bhamare | AI Portfolio",
  description:
    "Interactive AI portfolio of Vedant Bhamare, a Software Developer (SDE-2) & UI Engineer specializing in React, Next.js, and AI systems.",
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
      "Interactive AI portfolio of Vedant Bhamare, a Software Developer (SDE-2) & UI Engineer.",
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
      </body>
    </html>
  );
}