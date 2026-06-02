import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ceviz Bahçesi — Kemah'ın En Saf Lezzeti",
  description:
    "Kemah Vadisi'nin eşsiz ikliminde, hiçbir kimyasal ilaç kullanılmadan özenle yetiştirilen taptaze, dolgun ve ince kabuklu cevizlerimiz doğrudan bahçemizden kapınıza.",
  keywords: "kemah ceviz, doğal ceviz, organik ceviz, iç ceviz, kabuklu ceviz, taze ceviz",
  openGraph: {
    title: "Ceviz Bahçesi — Kemah'ın En Saf Lezzeti",
    description: "Doğrudan üreticiden, taze kırım, ilaçsız Kemah cevizleri.",
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
      lang="tr"
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
