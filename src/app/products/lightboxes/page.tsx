import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sun,
  Maximize,
  Palette,
  Shield,
  Ruler,
  RefreshCw,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Lightboxes — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale lightboxes and illuminated cabinet signs for sign shops only. Edge-lit and backlit LED options, tensioned fabric or polycarbonate faces. Trade pricing, UL listed. We never sell retail.",
  keywords: [
    "lightboxes wholesale",
    "illuminated cabinet signs",
    "LED lightbox sign",
    "backlit sign wholesale",
    "tensioned fabric lightbox",
    "sign cabinet wholesale",
    "illuminated sign cabinet",
    "wholesale lightbox manufacturer",
    "trade pricing lightboxes",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/wholesale-lightbox-signs",
  },
};

const lightboxTypes = [
  {
    name: "Standard Cabinet Lightbox",
    description:
      "Traditional illuminated cabinet sign with internal LED modules and translucent polycarbonate or acrylic face. The workhorse of commercial signage. Wholesale trade pricing for sign shops.",
    image: "Standard cabinet lightbox — illuminated commercial sign, storefront",
  },
  {
    name: "Slim Profile Lightbox",
    description:
      "Ultra-thin cabinet construction with edge-lit LED technology. Modern, sleek profile ideal for contemporary architecture and interior applications. Available exclusively to trade accounts.",
    image: "Slim profile lightbox — thin edge-lit sign, modern building",
  },
  {
    name: "Tensioned Fabric Lightbox",
    description:
      "Aluminum frame with dye-sublimation printed fabric face stretched over a silicone edge system. Easy graphic changes for seasonal or evolving messaging. Wholesale direct to sign shops.",
    image: "Tensioned fabric lightbox — vivid print, retail display",
  },
  {
    name: "Double-Sided Lightbox",
    description:
      "Cabinet with two illuminated faces for freestanding, pylon-mounted, or projecting installations. Maximum visibility from multiple directions. Trade pricing available.",
    image: "Double-sided lightbox — freestanding pylon sign",
  },
];

const features = [
  {
    icon: Sun,
    title: "Uniform LED Illumination",
    description:
      "Internal LED modules engineered for even light distribution across the entire face. No hot spots, no dark corners, no uneven brightness.",
  },
  {
    icon: Maximize,
    title: "Custom Sizes & Shapes",
    description:
      "From small wayfinding boxes to large building-mounted cabinets. Rectangular, square, round, oval, or fully custom shapes.",
  },
  {
    icon: Palette,
    title: "Multiple Face Options",
    description:
      "Polycarbonate, acrylic, tensioned fabric, or aluminum with routed graphics. Full-color printed, vinyl-applied, or push-through faces.",
  },
  {
    icon: RefreshCw,
    title: "Changeable Graphics",
    description:
      "Tensioned fabric systems allow graphic changes in minutes without tools. Ideal for businesses that update promotions or seasonal messaging.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "All illuminated lightboxes are UL listed with complete documentation and labeling for code compliance and permitting.",
  },
  {
    icon: Ruler,
    title: "Engineered Construction",
    description:
      "Welded aluminum frames with structural integrity for any mounting application. Wind load calculations available for permitting.",
  },
];

const specs = [
  { label: "Construction", value: "Welded or extruded aluminum cabinet" },
  { label: "Standard Depths", value: '4", 5", 6", 8", 10", 12" (custom available)' },
  { label: "Maximum Size", value: "Up to 20' x 8' (larger with seams)" },
  { label: "Face Options", value: "Polycarbonate, acrylic, fabric, aluminum" },
  { label: "LED Type", value: "Internal backlit or edge-lit modules" },
  { label: "Light Distribution", value: "Engineered for uniform face illumination" },
  { label: "Graphics", value: "Digital print, vinyl, push-through, routed" },
  { label: "Frame Finish", value: "Painted aluminum, any Pantone color" },
  { label: "Mounting", value: "Wall, pole, pylon, freestanding, or ceiling" },
  { label: "Electrical Access", value: "Hinged door, removable face, or rear access" },
  { label: "Certifications", value: "UL Listed (UL 48)" },
  { label: "Warranty", value: "5-year LED, 3-year cabinet and finish" },
  { label: "Lead Time", value: "3 weeks door to door" },
];

const useCases = [
  "Retail storefronts and shopping centers",
  "Quick-service restaurants and franchises",
  "Gas stations and convenience stores",
  "Multi-tenant commercial buildings",
  "Pylon and monument sign panels",
  "Interior directories and wayfinding",
  "Menu boards and promotional displays",
  "Real estate and property signage",
];

export default function LightboxesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Lightboxes",
    description:
      "Wholesale lightboxes and illuminated cabinet signs. Edge-lit and backlit LED options with tensioned fabric or polycarbonate faces. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Lightboxes",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Lightboxes" },
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
                  Wholesale{" "}
                  <span className="text-brand-gold">Lightboxes</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  Illuminated cabinet signs engineered for uniform brightness,
                  durability, and ease of maintenance. Standard cabinets, slim
                  profiles, and tensioned fabric systems in any size or shape. Available exclusively to trade accounts.
                </p>
                <p className="text-text-light/50 mb-8">
                  UL listed. German-engineered LED layouts. Wholesale direct to
                  sign shops. Delivered in 3 weeks door to door. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Lightbox — illuminated cabinet sign on commercial building, night view"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox Types */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Wholesale Lightbox Types
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Four configurations to match every application, from traditional
                commercial signage to modern architectural installations. All at trade pricing for sign shops.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lightboxTypes.map((type, index) => (
              <AnimatedSection key={type.name} delay={index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden border border-black/5 h-full">
                  <PlaceholderImage
                    label={type.image}
                    className="rounded-none border-0"
                    aspectRatio="aspect-[16/10]"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
                      {type.name}
                    </h3>
                    <p className="text-sm text-text-dark/60 leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Trade Specifications & Benefits
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-light mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-light/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tensioned Fabric Spotlight */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Tensioned fabric lightbox — graphic change in progress, showing silicone edge system"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Tensioned Fabric Systems
                </h2>
                <p className="text-text-light/60 mb-6 leading-relaxed">
                  The modern alternative to traditional lightbox faces.
                  Dye-sublimation printed fabric stretches over a silicone edge
                  system for a taut, wrinkle-free illuminated face that can be
                  changed in minutes. Wholesale direct to sign shops.
                </p>
                <ul className="space-y-3">
                  {[
                    "Tool-free graphic changes for seasonal promotions",
                    "Dye-sublimation print for vibrant, full-color graphics",
                    "Silicone edge gasket system for uniform tension",
                    "Lightweight fabric reduces cabinet structural load",
                    "Replacement graphics ship flat — no rigid panels to freight",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-text-light/70"
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
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Trade Specifications
              </h2>
              <p className="text-text-light/60 mb-8">
                Engineered for uniform illumination, structural integrity, and
                long service life. Every lightbox ships ready to install. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Lightbox — internal view showing LED module layout and wiring"
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
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Common Applications
                </h2>
                <p className="text-text-dark/60 mb-8">
                  Lightboxes are the most versatile illuminated sign format. From
                  small interior directories to large exterior building signs,
                  the cabinet format handles it all. Wholesale direct to sign shops for all project types.
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
                label="Lightbox installation — multi-tenant building with individual illuminated cabinets"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
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
                Request Trade Pricing for Lightboxes
              </h2>
              <p className="text-text-light/60 mb-4">
                Send your lightbox specifications or project drawings and
                receive a detailed wholesale quote within 48 hours.
              </p>
              <p className="text-text-light/40 text-sm mb-8">
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
