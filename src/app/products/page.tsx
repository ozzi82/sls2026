import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Shield, Clock, Wrench } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Wholesale Sign Products — Trade Pricing for Sign Shops | Sunlite Signs",
  description:
    "Wholesale sign products exclusively for trade accounts. Channel letters, flat cut letters, blade signs, lightboxes, and custom fabrication at wholesale pricing. We never sell retail.",
  keywords: [
    "wholesale sign products",
    "channel letters wholesale",
    "flat cut letters wholesale",
    "blade signs wholesale",
    "lightboxes wholesale",
    "sign manufacturer USA",
    "wholesale sign supplier",
    "trade pricing signs",
    "sign shop supplier",
    "wholesale only sign manufacturer",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/wholesale-sign-products",
  },
};

const productCategories = [
  {
    name: "Channel Letters",
    description:
      "The EdgeLuxe product line — 12 channel letter styles across 4 families: Block Acrylic, Trimless, Fabricated Stainless Steel, and Flat Cut. German-engineered, UL listed. Wholesale direct to sign shops.",
    href: "/products/channel-letters",
    image: "Channel letters product category — illuminated storefront sign",
    imageSrc: "/products/front-halo-night.jpg",
    featured: true,
  },
  {
    name: "Flat Cut Letters",
    description:
      "Precision-cut metal and acrylic dimensional letters at wholesale trade pricing. Clean lines, flush or stud-mounted, available in brushed aluminum, painted steel, and brass finishes.",
    href: "/products/flat-cut-letters",
    image: "Flat cut metal letters — dimensional signage",
    imageSrc: "/products/flat-cut-day.jpg",
  },
  {
    name: "Blade Signs",
    description:
      "Double-sided projecting blade signs at trade pricing. Illuminated and non-illuminated options for storefronts and mixed-use developments. Wholesale direct to sign shops.",
    href: "/products/blade-signs",
    image: "Illuminated blade sign — projecting storefront sign",
  },
  {
    name: "Lightboxes",
    description:
      "Illuminated cabinet signs at wholesale pricing. Edge-lit and backlit LED options with tensioned fabric or polycarbonate faces. Available exclusively to trade accounts.",
    href: "/products/lightboxes",
    image: "Illuminated lightbox sign — LED cabinet sign",
  },
  {
    name: "SEG Light Boxes",
    description:
      "Custom-sized Silicone-edged Graphic (SEG) light box solutions in low form factors down to 1\" deep. High-resolution printed and illuminated signage. Custom SEG light boxes and prints in 3 weeks. Wholesale only.",
    href: "/products/seg-light-boxes",
    image: "SEG Light Box — illuminated fabric sign display",
  },
  {
    name: "Logo Boxes",
    description:
      "Custom-shaped illuminated enclosures that follow the exact contour of any logo. Full-color digital print on translucent faces for brand-perfect reproduction. Wholesale trade pricing for sign shops.",
    href: "/products/logo-boxes",
    image: "Contour logo box — custom-shaped illuminated logo sign",
  },
  {
    name: "Push-Through Signs",
    description:
      "Dimensional acrylic letters pushed through precision-routed aluminum panels with LED backlighting. The premium alternative to flat-face cabinet signs. Wholesale only.",
    href: "/products/push-through-signs",
    image: "Push-through sign — illuminated dimensional acrylic letters",
  },
  {
    name: "Custom Fabrication",
    description:
      "Bespoke signage solutions at trade pricing for projects that require something beyond standard products. Wholesale only — we never compete with our sign shop partners.",
    href: "/products/custom-fabrication",
    image: "Custom fabricated sign — specialty project",
  },
];

const trustPoints = [
  {
    icon: Shield,
    label: "UL Listed Products",
  },
  {
    icon: Clock,
    label: "3-Week Door-to-Door Delivery",
  },
  {
    icon: Wrench,
    label: "German Engineering",
  },
];

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sunlite Signs Wholesale Products",
    description:
      "Wholesale sign products for trade accounts including channel letters, flat cut letters, blade signs, lightboxes, and custom fabrication. Trade pricing only.",
    itemListElement: productCategories.map((cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cat.name,
      url: `https://sunlitesigns.com${cat.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36 px-6 sm:px-10 lg:px-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products" },
            ]}
          />
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="micro-label mb-6">
                Wholesale Only — Trade Pricing
              </p>
              <div className="gold-line mb-8" />
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                Wholesale Product{" "}
                <span className="text-brand-gold">Catalog</span>
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mb-4">
                German-engineered illuminated signage, wholesale direct to sign
                shops across the USA and Canada. Every product is UL listed,
                precision built, and delivered within 3 weeks door to door.
              </p>
              <p className="text-white/60 mb-8">
                We never sell retail. Your clients stay yours. No retail markup, no middlemen — just trade pricing direct from the manufacturer.
              </p>
              <div className="flex flex-wrap gap-6">
                {trustPoints.map((point) => (
                  <span
                    key={point.label}
                    className="flex items-center gap-2 text-sm text-white/50 font-heading uppercase tracking-wider"
                  >
                    <point.icon className="w-4 h-4 text-brand-gold" />
                    {point.label}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FEATURED: Channel Letters
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          {productCategories
            .filter((c) => c.featured)
            .map((cat) => (
              <AnimatedSection key={cat.name}>
                <Link href={cat.href} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                    {cat.imageSrc ? (
                      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                        <Image
                          src={cat.imageSrc}
                          alt={cat.image}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage
                        label={cat.image}
                        className="rounded-none border-0 lg:min-h-[400px]"
                        aspectRatio="aspect-[4/3] lg:aspect-auto"
                      />
                    )}
                    <div className="p-8 lg:p-12 lg:pr-16">
                      <p className="micro-label mb-4">
                        Flagship Product Line — Wholesale Direct
                      </p>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[1.1] mt-3 mb-4 group-hover:text-brand-gold transition-colors tracking-[-0.02em]">
                        Wholesale {cat.name}
                      </h2>
                      <p className="text-white/60 leading-relaxed mb-6">
                        {cat.description}
                      </p>
                      <span className="btn-primary">
                        Explore Channel Letters
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          MORE PRODUCT LINES — Light section
          ═══════════════════════════════════════════ */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark mb-5 leading-[1.05] tracking-[-0.02em]">
                  More Wholesale <span className="text-brand-gold">Product Lines</span>
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto text-[15px]">
                  Beyond channel letters, we manufacture a full range of premium
                  signage solutions — all available exclusively at trade pricing
                  for sign shops.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productCategories
                .filter((c) => !c.featured)
                .map((cat, index) => (
                  <AnimatedSection key={cat.name} delay={index * 0.1}>
                    <Link href={cat.href} className="group block h-full">
                      <div className="bg-white border border-black/[0.04] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-400 h-full flex flex-col">
                        {cat.imageSrc ? (
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={cat.imageSrc}
                              alt={cat.image}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <PlaceholderImage
                            label={cat.image}
                            className="rounded-none border-0"
                            aspectRatio="aspect-[16/10]"
                          />
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-heading font-bold text-text-dark group-hover:text-brand-gold transition-colors mb-3">
                            Wholesale {cat.name}
                          </h3>
                          <p className="text-text-dark/60 text-sm leading-relaxed mb-4 flex-1">
                            {cat.description}
                          </p>
                          <span className="btn-text-link group/link">
                            Get Trade Pricing
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <CTASection
        heading="Need a Custom"
        highlight="Solution?"
        description="Send us your project details and receive a detailed wholesale quote within 48 hours. No minimum order. No obligation."
      />
    </>
  );
}
