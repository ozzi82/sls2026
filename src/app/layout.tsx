import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sunlitesigns.com"),
  title: {
    default: "Sunlite Signs — Wholesale Channel Letters & Illuminated Signs",
    template: "%s | Sunlite Signs",
  },
  description:
    "German-engineered wholesale channel letters, blade signs, and flat cut letters for sign shops across the USA and Canada. UL listed. Precision built. Delivered in 4 weeks.",
  keywords: [
    "wholesale channel letters",
    "trimless channel letters wholesale",
    "wholesale sign manufacturer USA",
    "halo lit channel letters",
    "UL listed channel letters",
    "wholesale sign supplier Canada",
    "flat cut letters wholesale",
    "LED channel letters manufacturer",
    "German engineered signs",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunlitesigns.com",
    siteName: "Sunlite Signs",
    title: "Sunlite Signs — Wholesale Channel Letters & Illuminated Signs",
    description:
      "German-engineered wholesale channel letters for sign shops. UL listed, precision built, delivered in 4 weeks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunlite Signs — Wholesale Channel Letters & Illuminated Signs",
    description:
      "German-engineered wholesale channel letters for sign shops. UL listed, precision built, delivered in 4 weeks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
