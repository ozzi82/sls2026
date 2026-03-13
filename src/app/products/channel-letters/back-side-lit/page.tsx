import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Moon,
  Layers,
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
  title:
    "Wholesale Back Side Lit Channel Letters — EdgeLuxe LP 11-BS | Sunlite Signs",
  description:
    "Wholesale partial back side-lit block acrylic channel letters. Flush-mount halo effect from the back side. IP67, German-engineered. Trade pricing for sign shops only.",
  keywords: [
    "back side lit channel letters",
    "partial side lit signs",
    "flush mount channel letters",
    "halo effect letters",
    "block acrylic letters wholesale",
    "wholesale channel letters",
    "trade pricing",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/back-side-lit-channel-letters",
  },
};

const features = [
  {
    icon: Moon,
    title: "Subtle Back Side Glow",
    description:
      "Partial back side illumination creates an elegant, understated halo effect when flush-mounted against any surface.",
  },
  {
    icon: Layers,
    title: "Flush-Mount Design",
    description:
      "Engineered for direct surface mounting with no standoff spacers required. Clean, minimal installation profile.",
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
      "Available with any Pantone-matched color. Pigmented translucent acrylics for colored back-glow effects.",
  },
  {
    icon: Ruler,
    title: "Precision Engineering",
    description:
      "German-engineered to minimum 12mm stroke width with uniform light distribution across every letterform.",
  },
  {
    icon: Lightbulb,
    title: "Zero Maintenance",
    description:
      "Epoxy-sealed IP67 construction means no serviceable parts — letters are built to last without any maintenance.",
  },
];

const useCases = [
  "Luxury retail storefronts",
  "Boutique hotels and resorts",
  "High-end restaurant facades",
  "Corporate headquarters",
  "Spa and wellness centers",
  "Premium office lobbies",
  "Upscale residential communities",
  "Art galleries and cultural venues",
];

export default function BackSideLitPage() {
  const product = getProduct("LP 11-BS");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Back Side Lit Channel Letters — EdgeLuxe LP 11-BS",
    description:
      "Wholesale partial back side-lit block acrylic channel letters with flush-mount halo effect. IP67, German-engineered. Trade pricing for sign shops only.",
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
      name: "model",
      value: "EdgeLuxe LP 11-BS",
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
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Back Side Lit" },
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
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  Wholesale Back Side Lit{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  Partial back side illumination creates a subtle, sophisticated
                  glow from behind each flush-mounted letterform. The EdgeLuxe
                  LP 11-BS uses embedded LEDs within 30mm cast block acrylic to
                  project light from the back edges.
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
                daySrc="/products/back-side-day.jpg"
                nightSrc="/products/back-side-night.jpg"
                alt="Back side lit channel letters — flush-mount halo glow, night shot"
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
                Every back side lit channel letter set is manufactured with
                German-engineered precision and IP67 sealed construction.
                Wholesale direct to your shop.
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
                Built with IP67 epoxy-sealed block acrylic for zero-maintenance
                durability. Every specification reflects our commitment to
                quality and longevity. Available exclusively at wholesale trade
                pricing.
              </p>
              <PlaceholderImage
                label="Back side lit channel letter — cross-section detail showing LED placement and flush-mount design"
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
                  Back side lit channel letters deliver a refined, understated
                  aesthetic ideal for premium environments where subtlety and
                  sophistication are paramount. Wholesale direct to sign shops
                  for all project types.
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
                  src="/products/back-side-day.jpg"
                  alt="Back side lit channel letters — luxury installation, daytime"
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
                Back Side Lit Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Back side lit letters — luxury retail storefront",
                "Back side lit letters — boutique hotel entrance",
                "Back side lit letters — high-end restaurant facade",
                "Back side lit letters — corporate headquarters lobby",
                "Back side lit letters — spa and wellness center",
                "Back side lit letters — art gallery signage",
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
