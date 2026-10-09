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
  title: "Johnathan Hare | Materials Science & Engineering Portfolio",
  description: "Engineering portfolio of Johnathan Hare, 2nd-year Materials Science & Engineering undergraduate at The University of Sheffield (On track for 1st). Seeking 2027/28 Industrial Placement.",
  keywords: ["Materials Science", "Engineering", "University of Sheffield", "Metallurgy", "3D Printing", "CAD", "Materials Informatics", "Ashby Charts", "Industrial Placement 2027"],
  authors: [{ name: "Johnathan Hare" }],
  openGraph: {
    title: "Johnathan Hare | Materials Science & Engineering Portfolio",
    description: "Engineering portfolio of Johnathan Hare. 2nd-year undergraduate at The University of Sheffield on track for 1st. Seeking 2027/28 Industrial Placement.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}>
      <body className="bg-[#090d16] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
