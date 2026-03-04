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
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Front Lit Channel Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale front lit channel letters for sign shops only. Forward-facing LED illumination, UL listed, German-engineered. Trade pricing direct from manufacturer. We never sell retail.",
  keywords: [
    "front lit channel letters",
    "front lit channel letters wholesale",
    "illuminated channel letters",
    "LED channel letters",
    "wholesale channel letter manufacturer",
    "front face illuminated signs",
    "trade pricing channel letters",
    "sign shop supplier",
  ],
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
      "Every front lit channel letter set ships with UL listing labels and documentation for fast, compliant permitting.",
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

const specs = [
  { label: "Letter Height Range", value: '4" to 72"+' },
  { label: "Return Material", value: "0.040\" aluminum, painted" },
  { label: "Face Material", value: '3/16" or 1/8" acrylic, Pantone-matched' },
  { label: "Trim Cap", value: "Standard 1\" aluminum or EdgeLuxe trimless" },
  { label: "LED Modules", value: "Samsung or Nichia, UL recognized" },
  { label: "Power Supply", value: "UL listed Class 2, remote mounted" },
  { label: "Mounting", value: "Stud, flush, or raceway" },
  { label: "Certifications", value: "UL Listed (UL 48)" },
  { label: "Warranty", value: "5-year LED, 2-year electrical components" },
  { label: "Lead Time", value: "3-4 weeks standard" },
];

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
    name: "Wholesale Front Lit Channel Letters",
    description:
      "Wholesale front lit channel letters with forward-facing LED illumination. German-engineered, UL listed. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
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
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,164,78,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Front Lit" },
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
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-light mb-6">
                  Wholesale Front Lit{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  The industry standard for illuminated signage. Forward-facing
                  LEDs shine through a translucent acrylic face, delivering
                  maximum brightness and readability for any commercial
                  application. Available exclusively to trade accounts.
                </p>
                <p className="text-text-light/50 mb-8">
                  German-engineered precision. UL listed. Wholesale direct to
                  sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Front lit channel letters — illuminated storefront, night shot"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Trade Specifications & Benefits
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Every front lit channel letter set is manufactured to the same
                exacting standards that define the Sunlite brand. Wholesale direct to your shop.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <div className="bg-white rounded-xl p-8 border border-black/5 h-full">
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
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Trade Specifications
              </h2>
              <p className="text-text-light/60 mb-8">
                Built to meet and exceed industry standards. Every specification
                reflects our commitment to quality and longevity. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Front lit channel letter — cross-section detail showing LED placement"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-start px-6 py-4 ${
                      index < specs.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <span className="text-sm text-text-light/50 font-heading">
                      {spec.label}
                    </span>
                    <span className="text-sm text-text-light font-medium text-right ml-4">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Common Applications
                </h2>
                <p className="text-text-light/60 mb-8">
                  Front lit channel letters are the most versatile illuminated
                  sign type, suitable for virtually any commercial application
                  where visibility matters. Wholesale direct to sign shops for all project types.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-text-light/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              <PlaceholderImage
                label="Front lit channel letters — retail installation, daytime"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Front Lit Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Front lit letters — restaurant facade, night",
                "Front lit letters — retail shopping center",
                "Front lit letters — healthcare facility",
                "Front lit letters — corporate office building",
                "Front lit letters — hotel entrance",
                "Front lit letters — multi-tenant commercial",
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

      {/* CTA */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Request Trade Pricing for Front Lit Letters
              </h2>
              <p className="text-text-dark/60 mb-4">
                Send your project files and receive a detailed wholesale quote
                within 48 hours. We work from AI, PDF, DWG, or even a rough
                sketch.
              </p>
              <p className="text-text-dark/40 text-sm mb-8">
                No retail markup. We never sell retail and we never compete with you for your clients.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/get-a-quote"
                  className="btn-primary text-base px-10 py-5"
                >
                  Request Wholesale Pricing
                </Link>
                <Link
                  href="/why-sunlite/wholesale-only"
                  className="btn-secondary text-base px-10 py-5 border-text-dark/20 text-text-dark hover:border-brand-gold hover:text-brand-gold"
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
