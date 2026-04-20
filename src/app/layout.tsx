import type { Metadata } from "next";
import { Instrument_Serif, Outfit, DM_Sans, Space_Grotesk, Inter, Bebas_Neue, Source_Sans_3 } from "next/font/google";
import { getLocale, getAlternates } from "@/lib/i18n/locale";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    metadataBase: new URL("https://sunlitesigns.com"),
    title: {
      default: "Sunlite Signs — Wholesale Channel Letters & Illuminated Signs",
      template: "%s | Sunlite Signs",
    },
    description:
      "German-engineered wholesale channel letters, blade signs, and flat cut letters for sign shops across the USA and Canada. UL listed. Precision built. Delivered in 3 weeks door to door.",
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
      locale: locale === "de" ? "de_DE" : "en_US",
      url: "https://sunlitesigns.com",
      siteName: "Sunlite Signs",
      title: "Sunlite Signs — Wholesale Channel Letters & Illuminated Signs",
      description:
        "German-engineered wholesale channel letters for sign shops. UL listed, precision built, delivered in 3 weeks door to door.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sunlite Signs — Wholesale Channel Letters & Illuminated Signs",
      description:
        "German-engineered wholesale channel letters for sign shops. UL listed, precision built, delivered in 3 weeks door to door.",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: getAlternates("/"),
  };
}

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sunlitesigns.com/#organization",
      name: "Sunlite Signs LLC",
      url: "https://sunlitesigns.com",
      description:
        "German-engineered wholesale channel letters and illuminated signs for sign shops across the USA and Canada. Trade accounts only.",
      address: {
        "@type": "PostalAddress",
        addressRegion: "FL",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-689-294-0912",
        email: "hello@sunlitesigns.com",
        contactType: "sales",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://sunlitesigns.com/#website",
      url: "https://sunlitesigns.com",
      name: "Sunlite Signs",
      publisher: { "@id": "https://sunlitesigns.com/#organization" },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${instrumentSerif.variable} ${outfit.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${inter.variable} ${bebasNeue.variable} ${sourceSans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
