import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Sparkles,
  Shield,
  Palette,
  Ruler,
  Lightbulb,
  Lock,
} from "lucide-react";
import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";

export const metadata: Metadata = {
  title: "Wholesale Faux Neon Channel Letters — EdgeLuxe LP 11-N | Sunlite Signs",
  description:
    "Wholesale faux neon block acrylic channel letters. LED-powered neon tube simulation in solid acrylic. IP67, German-engineered. Trade pricing for sign shops only.",
  keywords: [
    "faux neon channel letters",
    "LED neon letters",
    "neon look signs wholesale",
    "faux neon signs",
    "block acrylic neon",
    "wholesale channel letters",
    "trade pricing",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/faux-neon-channel-letters",
  },
};

const features = [
  {
    icon: Zap,
    title: "Neon Tube Simulation",
    description:
      "Precision-routed channels simulate the classic neon glass tube look using modern LED technology. All the charm, none of the fragility.",
  },
  {
    icon: Sparkles,
    title: "Classic Neon Aesthetic",
    description:
      "Captures the warm, authentic glow of traditional neon signage without the high voltage, gas tubes, or maintenance costs.",
  },
  {
    icon: Shield,
    title: "IP67 Sealed",
    description:
      "Epoxy-sealed block acrylic construction rated IP67. Fully waterproof and dust-proof — unlike traditional glass neon.",
  },
  {
    icon: Palette,
    title: "Full Color Range",
    description:
      "Available with any Pantone-matched color. Pigmented translucent acrylics create vivid, neon-style color effects.",
  },
  {
    icon: Ruler,
    title: "Precision Engineering",
    description:
      "German-engineered to minimum 12mm stroke width with uniform light distribution simulating a continuous neon tube.",
  },
  {
    icon: Lightbulb,
    title: "Zero Maintenance",
    description:
      "No gas refills, no transformer replacements, no broken tubes. IP67 sealed construction requires zero maintenance.",
  },
];

const useCases = [
  "Bars and nightlife venues",
  "Trendy restaurants and cafes",
  "Retail storefronts with vintage aesthetic",
  "Entertainment and music venues",
  "Barbershops and salons",
  "Boutique hotels",
  "Instagram-worthy brand activations",
  "Food halls and markets",
];

export default function FauxNeonPage() {
  const product = getProduct("LP 11-N");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Faux Neon Channel Letters — EdgeLuxe LP 11-N",
    description:
      "Wholesale faux neon block acrylic channel letters. LED-powered neon tube simulation in solid acrylic. IP67, German-engineered. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Channel Letters",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Model",
        value: "EdgeLuxe LP 11-N",
      },
    ],
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Faux Neon" },
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
                  Wholesale Faux Neon{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  The classic neon aesthetic, reimagined in solid block acrylic.
                  The EdgeLuxe LP 11-N uses precision-routed channels and
                  embedded LEDs to simulate the warm glow of traditional neon
                  glass tubes — without the fragility, high voltage, or
                  maintenance.
                </p>
                <p className="text-white/50 mb-8">
                  German-engineered precision. IP67 sealed. Wholesale direct to
                  sign shops across the USA and Canada.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/faux-neon-day.jpg"
                nightSrc="/products/faux-neon-night.jpg"
                alt="Faux neon channel letters — illuminated storefront, night shot"
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
                Every faux neon channel letter set is manufactured to the same
                exacting standards that define the Sunlite brand. Wholesale direct to your shop.
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
                Built to meet and exceed industry standards. Every specification
                reflects our commitment to quality and longevity. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Faux neon channel letter — cross-section detail showing LED routing"
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
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  Common Applications
                </h2>
                <p className="text-white/60 mb-8">
                  Faux neon channel letters bring the timeless appeal of
                  traditional neon to any venue that values atmosphere and
                  aesthetic. Wholesale direct to sign shops for all project types.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/products/faux-neon-day.jpg"
                  alt="Faux neon channel letters — installation, daytime"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
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
                Faux Neon Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Faux neon letters — bar entrance, night",
                "Faux neon letters — restaurant interior",
                "Faux neon letters — retail storefront, vintage style",
                "Faux neon letters — entertainment venue",
                "Faux neon letters — barbershop facade",
                "Faux neon letters — boutique hotel lobby",
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
