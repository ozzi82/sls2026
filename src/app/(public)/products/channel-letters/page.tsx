import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Layers, Lock } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";
import ProductImageHover from "@/components/ProductImageHover";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Channel Letters — EdgeLuxe Product Families | Sunlite Signs",
  description:
    "Wholesale channel letters for sign shops only. 12 EdgeLuxe products across 4 families: Block Acrylic, Trimless, Fabricated Stainless Steel, and Flat Cut. Trade pricing, UL listed, German-engineered.",
  keywords: [
    "wholesale channel letters",
    "EdgeLuxe channel letters",
    "channel letters manufacturer",
    "block acrylic channel letters",
    "trimless channel letters wholesale",
    "stainless steel letters",
    "UL listed channel letters",
    "channel letter supplier USA",
    "trade pricing channel letters",
    "sign shop channel letters",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/wholesale-channel-letters",
  },
};

const productFamilies = [
  {
    familyName: "EdgeLuxe LP 11 — Block Acrylic Series",
    familyDescription:
      "30mm cast block acrylic, IP67 epoxy-sealed, zero maintenance. Eight illumination styles from the same rugged, waterproof platform.",
    products: [
      { name: "Face Lit", slug: "front-lit", model: "LP 11-F", dayImg: "/products/front-lit-day.jpg", nightImg: "/products/front-lit-night.jpg" },
      { name: "Halo Lit", slug: "halo-lit", model: "LP 11-B", dayImg: "/products/halo-lit-day.jpg", nightImg: "/products/halo-lit-night.jpg" },
      { name: "Face & Halo Combo", slug: "front-and-halo-lit", model: "LP 11-FB", dayImg: "/products/front-halo-day.jpg", nightImg: "/products/front-halo-night.jpg" },
      { name: "Full Side Lit", slug: "side-lit", model: "LP 11-S", dayImg: "/products/side-lit-day.jpg", nightImg: "/products/side-lit-night.jpg" },
      { name: "Back Side Lit", slug: "back-side-lit", model: "LP 11-BS", dayImg: "/products/back-side-day.jpg", nightImg: "/products/back-side-night.jpg" },
      { name: "Front Side Lit", slug: "front-side-lit", model: "LP 11-FS", dayImg: "/products/face-side-day.jpg", nightImg: "/products/face-side-night.jpg" },
      { name: "Faux Neon", slug: "faux-neon", model: "LP 11-N", dayImg: "/products/faux-neon-day.jpg", nightImg: "/products/faux-neon-night.jpg" },
      { name: "Conical Profile", slug: "conical", model: "LP 11-C", dayImg: "/products/conical-day.jpg", nightImg: "/products/conical-night.jpg" },
    ],
  },
  {
    familyName: "EdgeLuxe LP 5 — Trimless Stainless Steel",
    familyDescription:
      "Fabricated stainless steel with step-router acrylic face. No visible trim cap. The cleanest channel letter on the market.",
    products: [
      { name: "Trimless Face Lit", slug: "trimless", model: "LP 5", dayImg: "/products/trimless-day.jpg", nightImg: "/products/trimless-night.jpg" },
    ],
  },
  {
    familyName: "EdgeLuxe LP 3 — Fabricated Stainless Steel",
    familyDescription:
      "Fabricated stainless steel with serviceable LEDs. Available in standoff halo and flush-mount configurations.",
    products: [
      { name: "Standoff Halo", slug: "stainless-standoff", model: "LP 3.1", dayImg: "/products/stainless-standoff-day.jpg", nightImg: "/products/stainless-standoff-night.jpg" },
      { name: "Flush-Mount Halo", slug: "stainless-flush", model: "LP 3.2", dayImg: "/products/stainless-flush-day.jpg", nightImg: "/products/stainless-flush-night.jpg" },
    ],
  },
  {
    familyName: "EdgeLuxe LP 1 — Flat Cutout Letters",
    familyDescription:
      "Non-illuminated flat cutout letters in wood, aluminum, stainless steel, and acrylic. Same precision, no LEDs.",
    products: [
      { name: "Flat Cut (Non-Illuminated)", slug: "non-illuminated", model: "LP 1", dayImg: "/products/flat-cut-day.jpg" },
    ],
  },
];

const advantages = [
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Every illuminated channel letter set is UL listed and ships with proper labeling for code compliance.",
  },
  {
    icon: Zap,
    title: "Premium LEDs",
    description:
      "Samsung and Nichia LED modules with 50,000+ hour rated life. Consistent color temperature across every letter.",
  },
  {
    icon: Layers,
    title: "German Engineering",
    description:
      "Manufacturing processes developed in partnership with LKF Lichtwerbung in Nuremberg, Germany.",
  },
];

export default function ChannelLettersPage() {
  const spokes = getLandingPagesByHub("channel-letters").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const allProducts = productFamilies.flatMap((f) => f.products);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wholesale EdgeLuxe Channel Letters by Sunlite Signs",
    description:
      "Complete EdgeLuxe product line: 12 wholesale channel letter styles across 4 product families. Block Acrylic, Trimless, Fabricated Stainless Steel, and Flat Cut. Sign shops only.",
    itemListElement: allProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `EdgeLuxe ${product.model} — ${product.name}`,
      url: `https://sunlitesigns.com/products/channel-letters/${product.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only — Trade Pricing</span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                  Wholesale{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  The EdgeLuxe product line — 12 channel letter styles across 4
                  product families. From IP67-sealed block acrylic to fabricated
                  stainless steel, every style manufactured in-house. Wholesale direct to sign shops.
                </p>
                <p className="text-white/50 mb-8">
                  German-engineered precision. UL listed. Delivered within 3 weeks
                  door to door. Trade pricing with no retail markup. Your clients stay yours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/get-a-quote" className="btn-primary">
                    Request Wholesale Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/products/channel-letters/trimless"
                    className="btn-secondary"
                  >
                    Explore Trimless
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/products/front-halo-night.jpg"
                  alt="Channel letters — multiple illumination styles showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Advantages Bar */}
      <section className="bg-bg-bg-navy/80 border-y border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <AnimatedSection key={adv.title} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <adv.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">
                      {adv.title}
                    </h3>
                    <p className="text-sm text-white/50">{adv.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Product Families */}
      {productFamilies.map((family, familyIndex) => (
        <section
          key={family.familyName}
          className={`section-padding ${familyIndex % 2 === 0 ? "bg-bg-light" : "bg-bg-primary"}`}
        >
          <div className="container-max">
            <AnimatedSection>
              <div className="mb-12">
                <div className="gold-line mb-6" />
                <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-4 ${familyIndex % 2 === 0 ? "text-text-dark" : "text-white"}`}>
                  {family.familyName}
                </h2>
                <p className={`max-w-2xl ${familyIndex % 2 === 0 ? "text-text-dark/60" : "text-white/60"}`}>
                  {family.familyDescription}
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {family.products.map((product, productIndex) => (
                <AnimatedSection key={product.slug} delay={productIndex * 0.05}>
                  <Link
                    href={`/products/channel-letters/${product.slug}`}
                    className="group block h-full"
                  >
                    <div className={`rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${
                      familyIndex % 2 === 0
                        ? "bg-white border border-black/[0.04] hover:border-brand-gold/30"
                        : "bg-bg-card border border-white/[0.06] hover:border-brand-gold/30"
                    }`}>
                      <ProductImageHover
                        daySrc={product.dayImg}
                        nightSrc={"nightImg" in product ? product.nightImg : undefined}
                        alt={`${product.name} — EdgeLuxe ${product.model}`}
                      />
                      <div className="p-5">
                        <span className={`text-xs font-heading font-semibold uppercase tracking-widest ${
                          familyIndex % 2 === 0 ? "text-text-dark/40" : "text-white/40"
                        }`}>
                          {product.model}
                        </span>
                        <h3 className={`text-lg font-heading font-bold mt-1 mb-2 group-hover:text-brand-gold transition-colors ${
                          familyIndex % 2 === 0 ? "text-text-dark" : "text-white"
                        }`}>
                          {product.name}
                        </h3>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ))}


      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection />
    </>
  );
}
