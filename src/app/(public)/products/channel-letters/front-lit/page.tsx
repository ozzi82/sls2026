import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sun,
  Eye,
  Palette,
  Shield,
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
  title: "Wholesale Face Lit Channel Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale face lit channel letters for sign shops only. Forward-facing LED illumination, UL listed, German-engineered. Trade pricing direct from manufacturer. We never sell retail.",
  keywords: [
    "face lit channel letters",
    "face lit channel letters wholesale",
    "illuminated channel letters",
    "LED channel letters",
    "wholesale channel letter manufacturer",
    "front face illuminated signs",
    "trade pricing channel letters",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/face-lit-channel-letters",
  },
};

const features = [
  {
    icon: Sun,
    title: "Maximum Face Illumination",
    description:
      "Forward-facing LEDs illuminate the full letter face for excellent readability day and night, even in direct sunlight.",
  },
  {
    icon: Eye,
    title: "Superior Visibility",
    description:
      "The brightest channel letter option available. Ideal for high-traffic locations where visibility is the top priority.",
  },
  {
    icon: Palette,
    title: "Full Color Range",
    description:
      "Available with any Pantone-matched acrylic face color. White, colored, and even day/night color-changing faces available.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Every face lit channel letter set ships with UL listing labels and documentation for fast, compliant permitting.",
  },
  {
    icon: Ruler,
    title: "Custom Sizing",
    description:
      "Manufactured from 4 inches up to 72+ inches tall. We accommodate any font, logo, or custom shape.",
  },
  {
    icon: Lightbulb,
    title: "Samsung LEDs",
    description:
      "Premium Samsung LED modules with 50,000+ hour rated life, consistent color output, and industry-leading warranty.",
  },
];

const product = getProduct("LP 11-F");

const useCases = [
  "Retail storefronts and shopping centers",
  "Restaurants and food service brands",
  "Healthcare and medical facilities",
  "Hospitality and hotel signage",
  "Corporate office buildings",
  "Gas stations and convenience stores",
  "Automotive dealerships",
  "Multi-tenant commercial buildings",
];

export default function FrontLitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Face Lit Channel Letters",
    description:
      "Wholesale face lit channel letters with forward-facing LED illumination. German-engineered, UL listed. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Model",
      value: "EdgeLuxe LP 11-F",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Face Lit" },
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
                  Wholesale Face Lit{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  The industry standard for illuminated signage. Forward-facing
                  LEDs shine through a translucent acrylic face, delivering
                  maximum brightness and readability for any commercial
                  application. Available exclusively to trade accounts.
                </p>
                <p className="text-white/50 mb-8">
                  German-engineered precision. UL listed. Wholesale direct to
                  sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/front-lit-day.jpg"
                nightSrc="/products/front-lit-night.jpg"
                alt="Face lit channel letters — illuminated storefront, night shot"
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
                Every face lit channel letter set is manufactured to the same
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
                label="Face lit channel letter — cross-section detail showing LED placement"
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
                  Face lit channel letters are the most versatile illuminated
                  sign type, suitable for virtually any commercial application
                  where visibility matters. Wholesale direct to sign shops for all project types.
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
                  src="/products/front-lit-day.jpg"
                  alt="Face lit channel letters — retail installation, daytime"
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
                Face Lit Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Face lit letters — restaurant facade, night",
                "Face lit letters — retail shopping center",
                "Face lit letters — healthcare facility",
                "Face lit letters — corporate office building",
                "Face lit letters — hotel entrance",
                "Face lit letters — multi-tenant commercial",
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
