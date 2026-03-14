import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Moon,
  Building2,
  Shield,
  Ruler,
  Lightbulb,
  Lock,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";

export const metadata: Metadata = {
  title: "Wholesale Halo Lit Channel Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale halo lit channel letters for sign shops only. Elegant backlit glow, rear-mounted LED illumination. Trade pricing, UL listed, German-engineered. We never sell retail.",
  keywords: [
    "halo lit channel letters",
    "halo lit channel letters wholesale",
    "backlit channel letters",
    "reverse channel letters",
    "halo illuminated signs",
    "LED halo letters wholesale",
    "architectural channel letters",
    "trade pricing halo letters",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/halo-lit-channel-letters",
  },
};

const features = [
  {
    icon: Moon,
    title: "Elegant Halo Glow",
    description:
      "Rear-mounted LEDs create a soft, diffused halo of light around each letter, producing a sophisticated and upscale appearance on any facade.",
  },
  {
    icon: Sparkles,
    title: "Premium Brand Perception",
    description:
      "Halo lit letters are the preferred choice for luxury retail, hospitality, and architectural signage where brand perception matters.",
  },
  {
    icon: Building2,
    title: "Facade Enhancement",
    description:
      "The backlit glow highlights the texture and material of the mounting surface, turning the building itself into part of the sign design.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Fully UL listed with all required labels and documentation. Smooth permitting and code compliance for every project.",
  },
  {
    icon: Ruler,
    title: "Precision Returns",
    description:
      "Deep aluminum returns provide the standoff needed for optimal halo spread. Return depth is customizable based on wall color and effect desired.",
  },
  {
    icon: Lightbulb,
    title: "LED Color Options",
    description:
      "Standard white halo with warm white (3000K), neutral (4000K), and cool white (6500K) options. RGB color-changing available for dynamic installations.",
  },
];

const product = getProduct("LP 11-B");

const useCases = [
  "Luxury retail and boutiques",
  "Hotels, resorts, and hospitality",
  "Fine dining restaurants",
  "Corporate headquarters",
  "Medical and professional offices",
  "Multifamily residential lobbies",
  "Mixed-use developments",
  "Museums and cultural institutions",
];

export default function HaloLitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Halo Lit Channel Letters",
    description:
      "Wholesale halo lit channel letters with rear-mounted LED illumination for an elegant backlit glow. UL listed, German-engineered. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Model",
      value: "EdgeLuxe LP 11-B",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Channel Letters",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "Wholesale trade pricing available upon request — sign shops only",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Halo Lit" },
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
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  Wholesale Halo Lit{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  A soft, diffused glow radiates behind each letter, creating an
                  elegant halo effect that transforms any facade into a premium
                  brand statement. The choice of architects and luxury brands. Available exclusively to trade accounts.
                </p>
                <p className="text-white/50 mb-8">
                  Rear-mounted LEDs. Aluminum construction. UL listed. Wholesale
                  direct to sign shops — we never sell retail. Your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/halo-lit-day.jpg"
                nightSrc="/products/halo-lit-night.jpg"
                alt="Halo lit channel letters — soft backlit glow on dark stone facade, night"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Trade Specifications & Benefits
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Halo lit channel letters deliver a refined aesthetic that
                elevates any brand. Built with the same German-engineered
                precision as our entire product line. Wholesale direct to your shop.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-dark/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Halo lit channel letter — cross-section diagram showing rear LED placement and halo spread"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  How Halo Lit Works
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  LEDs are mounted facing the rear of the letter, directing
                  light outward through the back. Standoff spacers hold each
                  letter away from the wall, allowing the light to diffuse and
                  create the characteristic halo effect.
                </p>
                <ul className="space-y-3">
                  {[
                    "Return depth and standoff distance control halo width",
                    "Darker wall surfaces produce more dramatic contrast",
                    "Letter face is opaque aluminum — no front illumination",
                    "LED color temperature sets the mood of the halo",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Trade Specifications
              </h2>
              <p className="text-white/60 mb-8">
                Engineered for optimal halo spread, durability, and ease of
                installation. Every detail is considered. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Halo lit channel letter — detail of aluminum return and LED module placement"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <SpecsTable specs={product.specs} modelNumber={product.modelNumber} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Ideal Applications
                </h2>
                <p className="text-text-dark/60 mb-8">
                  Halo lit channel letters are the go-to choice for projects
                  where elegance and brand sophistication are paramount. Available at wholesale trade pricing for all project types.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-text-dark/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              <PlaceholderImage
                label="Halo lit channel letters — luxury hotel entrance, evening"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Halo Lit Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Halo lit letters — boutique retail, dark brick",
                "Halo lit letters — corporate office tower",
                "Halo lit letters — fine dining restaurant",
                "Halo lit letters — luxury hotel, stone facade",
                "Halo lit letters — medical center entrance",
                "Halo lit letters — mixed-use residential lobby",
              ].map((label, i) => (
                <PlaceholderImage
                  key={i}
                  label={label}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>


      <CTASection />
    </>
  );
}
