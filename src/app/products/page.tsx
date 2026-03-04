import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Clock, Wrench, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

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
};

const productCategories = [
  {
    name: "Channel Letters",
    description:
      "Face lit, halo lit, trimless, and combination illuminated channel letters. Wholesale direct to sign shops. German-engineered with UL listing. Available exclusively to trade accounts.",
    href: "/products/channel-letters",
    image: "Channel letters product category — illuminated storefront sign",
    featured: true,
  },
  {
    name: "Flat Cut Letters",
    description:
      "Precision-cut metal and acrylic dimensional letters at wholesale trade pricing. Clean lines, flush or stud-mounted, available in brushed aluminum, painted steel, and brass finishes.",
    href: "/products/flat-cut-letters",
    image: "Flat cut metal letters — dimensional signage",
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

      {/* Hero Section */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products" },
            ]}
          />
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only — Trade Pricing</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                Wholesale Product{" "}
                <span className="text-brand-gold">Catalog</span>
              </h1>
              <p className="text-lg text-text-light/70 max-w-2xl mb-4">
                German-engineered illuminated signage, wholesale direct to sign
                shops across the USA and Canada. Every product is UL listed,
                precision built, and delivered within 3 weeks door to door.
              </p>
              <p className="text-text-light/50 mb-8">
                We never sell retail. Your clients stay yours. No retail markup, no middlemen — just trade pricing direct from the manufacturer.
              </p>
              <div className="flex flex-wrap gap-6">
                {trustPoints.map((point) => (
                  <span
                    key={point.label}
                    className="flex items-center gap-2 text-sm text-text-light/50 font-heading uppercase tracking-wider"
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

      {/* Featured Category: Channel Letters */}
      <section className="section-padding bg-primary-dark border-t border-white/5">
        <div className="container-max">
          {productCategories
            .filter((c) => c.featured)
            .map((cat) => (
              <AnimatedSection key={cat.name}>
                <Link href={cat.href} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300">
                    <PlaceholderImage
                      label={cat.image}
                      className="rounded-none border-0 lg:min-h-[400px]"
                      aspectRatio="aspect-[4/3] lg:aspect-auto"
                    />
                    <div className="p-8 lg:p-12 lg:pr-16">
                      <span className="text-brand-gold text-xs font-heading uppercase tracking-widest">
                        Flagship Product Line — Wholesale Direct
                      </span>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mt-3 mb-4 group-hover:text-brand-gold transition-colors">
                        Wholesale {cat.name}
                      </h2>
                      <p className="text-text-light/60 leading-relaxed mb-6">
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

      {/* Other Product Categories */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                More Wholesale Product Lines
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Beyond channel letters, we manufacture a full range of premium
                signage solutions — all available exclusively at trade pricing
                for sign shops.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productCategories
              .filter((c) => !c.featured)
              .map((cat, index) => (
                <AnimatedSection key={cat.name} delay={index * 0.1}>
                  <Link href={cat.href} className="group block h-full">
                    <div className="bg-white border border-black/5 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 h-full flex flex-col">
                      <PlaceholderImage
                        label={cat.image}
                        className="rounded-none border-0"
                        aspectRatio="aspect-[16/10]"
                      />
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-heading font-bold text-text-dark group-hover:text-brand-gold transition-colors mb-3">
                          Wholesale {cat.name}
                        </h3>
                        <p className="text-text-dark/60 text-sm leading-relaxed mb-4 flex-1">
                          {cat.description}
                        </p>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          Get Trade Pricing
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-text-light/60 mb-4">
                Send us your project details and receive a detailed wholesale
                quote within 48 hours. No minimum order. No obligation.
              </p>
              <p className="text-text-light/40 text-sm mb-8">
                We never sell retail. No retail markup — just direct trade pricing. We never compete with you for your clients.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary text-base px-10 py-5">
                  Request Wholesale Pricing
                </Link>
                <Link
                  href="/why-sunlite/wholesale-only"
                  className="btn-secondary text-base px-10 py-5"
                >
                  Why We Sell Wholesale Only
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-20 lg:hidden" />
    </>
  );
}
