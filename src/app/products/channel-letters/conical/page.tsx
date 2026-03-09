import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Triangle,
  Type,
  Shield,
  Palette,
  Ruler,
  Lightbulb,
  Lock,
} from "lucide-react";
import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";

export const metadata: Metadata = {
  title:
    "Wholesale Conical Profile Channel Letters — EdgeLuxe LP 11-C | Sunlite Signs",
  description:
    "Wholesale conical profile block acrylic channel letters. Tapered design for narrow strokes and serifs. IP67, German-engineered. Trade pricing for sign shops only.",
  keywords: [
    "conical channel letters",
    "tapered profile letters",
    "serif channel letters",
    "narrow stroke letters",
    "block acrylic letters wholesale",
    "wholesale channel letters",
    "trade pricing",
    "sign shop supplier",
  ],
};

const features = [
  {
    icon: Triangle,
    title: "Conical Taper Profile",
    description:
      "Wider at the back (12mm) and tapered to just 3mm at the face. Enables illumination of narrow strokes and delicate serifs.",
  },
  {
    icon: Type,
    title: "Serif-Friendly Design",
    description:
      "The only channel letter solution engineered specifically for serif fonts, thin strokes, and intricate letterforms that standard letters cannot illuminate.",
  },
  {
    icon: Shield,
    title: "IP67 Sealed",
    description:
      "Epoxy-sealed block acrylic construction rated IP67. Fully waterproof and dust-proof for any outdoor installation.",
  },
  {
    icon: Palette,
    title: "Full Color Range",
    description:
      "Available with any Pantone-matched color. Pigmented translucent acrylics for colored face-lit effects.",
  },
  {
    icon: Ruler,
    title: "Ultra-Narrow Strokes",
    description:
      'Face-side strokes as narrow as 3mm (0.12") — impossible with conventional channel letters. German-engineered precision.',
  },
  {
    icon: Lightbulb,
    title: "Zero Maintenance",
    description:
      "Epoxy-sealed IP67 construction means no serviceable parts — letters are built to last without any maintenance.",
  },
];

const useCases = [
  "Luxury brand signage with serif logos",
  "Law firms and financial institutions",
  "High-end restaurant typography",
  "Boutique retail with script fonts",
  "Architectural lettering with thin strokes",
  "Hotels and resort entrance signs",
  "Museum and gallery wayfinding",
  "Corporate headquarters with refined branding",
];

export default function ConicalPage() {
  const product = getProduct("LP 11-C");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Conical Profile Channel Letters — EdgeLuxe LP 11-C",
    description:
      "Wholesale conical profile block acrylic channel letters. Tapered design for narrow strokes and serifs. IP67, German-engineered. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Channel Letters",
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Model",
      value: "EdgeLuxe LP 11-C",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description:
          "Wholesale trade pricing available upon request — sign shops only",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Conical Profile" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                    Wholesale Only — Trade Pricing
                  </span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-light mb-6">
                  Wholesale Conical Profile{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  The conical taper makes the impossible possible — illuminated
                  serif fonts, thin strokes, and delicate letterforms. The
                  EdgeLuxe LP 11-C uses a wider back (12mm) that tapers to just
                  3mm at the face, allowing embedded LEDs to illuminate strokes
                  too narrow for any conventional channel letter.
                </p>
                <p className="text-text-light/50 mb-8">
                  German-engineered precision. IP67 sealed. Wholesale direct to
                  sign shops across the USA and Canada.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/conical-day.jpg"
                nightSrc="/products/conical-night.jpg"
                alt="Conical profile channel letters — illuminated serif letterforms, night shot"
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
                Every conical profile channel letter set is manufactured to the
                same exacting standards that define the Sunlite brand. Wholesale
                direct to your shop.
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
                reflects our commitment to quality and longevity. Available
                exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Conical profile channel letter — cross-section detail showing tapered profile and LED placement"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <SpecsTable
                specs={product.specs}
                modelNumber={product.modelNumber}
              />
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
                  Conical profile channel letters unlock serif fonts and thin
                  strokes that no other channel letter can illuminate. Perfect
                  for luxury and refined branding. Wholesale direct to sign shops
                  for all project types.
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
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/products/conical-day.jpg"
                  alt="Conical profile channel letters — serif letterforms, daytime installation"
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
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Conical Profile Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Conical profile letters — luxury brand serif logo",
                "Conical profile letters — law firm entrance",
                "Conical profile letters — fine dining restaurant",
                "Conical profile letters — boutique retail script font",
                "Conical profile letters — hotel entrance, evening",
                "Conical profile letters — corporate headquarters",
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
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                  Trade Accounts Only
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Request Trade Pricing for Conical Profile Letters
              </h2>
              <p className="text-text-dark/60 mb-4">
                Send your project files and receive a detailed wholesale quote
                within 48 hours. We work from AI, PDF, DWG, or even a rough
                sketch.
              </p>
              <p className="text-text-dark/40 text-sm mb-8">
                No retail markup. We never sell retail and we never compete with
                you for your clients.
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
