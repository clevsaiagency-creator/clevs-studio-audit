import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clevs Studio — Concept Gratuit de Website sau Motion Video",
  description:
    "Primești gratuit un concept personalizat: website profesional sau video motion animat pentru brandul tău. Fără obligații.",
  openGraph: {
    title: "Clevs Studio — Concept Gratuit de Website sau Motion Video",
    description: "Completează formularul și primești un concept gratuit în cel mai scurt timp.",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
