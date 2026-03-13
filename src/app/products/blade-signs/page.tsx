import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  Lightbulb,
  Ruler,
  Shield,
  Wind,
  Palette,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Blade Signs — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale blade signs for sign shops only. Double-sided projecting signs, illuminated and non-illuminated. Trade pricing, German-engineered, UL listed. We never sell retail.",
  keywords: [
    "blade signs wholesale",
    "projecting signs wholesale",
    "double sided blade sign",
    "illuminated blade sign",
    "storefront blade sign",
    "pedestrian blade sign",
    "wholesale sign manufacturer",
    "blade sign fabrication",
    "trade pricing blade signs",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/wholesale-blade-signs",
  },
};

const features = [
  {
    icon: Eye,
    title: "Pedestrian Visibility",
    description:
      "Projecting perpendicular from the facade, blade signs capture foot traffic from both directions along the sidewalk — visibility that flat-mounted signs cannot achieve.",
  },
  {
    icon: Lightbulb,
    title: "Illuminated Options",
    description:
      "Internal LED illumination with push-through graphics, routed-out faces, or edge-lit acrylic panels. Non-illuminated configurations also available.",
  },
  {
    icon: Ruler,
    title: "Custom Shapes & Sizes",
    description:
      "Rectangular, round, oval, die-cut, or fully custom shapes. Sized to match the architecture and local sign code requirements.",
  },
  {
    icon: Wind,
    title: "Wind Load Rated",
    description:
      "Engineered mounting brackets calculated for the specific wind load zone. Structural calculations available for permitting requirements.",
  },
  {
    icon: Palette,
    title: "Full Branding",
    description:
      "Double-sided graphics in full color. Vinyl, painted, push-through, or printed polycarbonate faces. Every blade sign is a brand billboard.",
  },
  {
    icon: Shield,
    title: "UL Listed (Illuminated)",
    description:
      "All illuminated blade signs are UL listed with proper labeling and documentation for code compliance and permitting.",
  },
];

const bladeTypes = [
  {
    name: "Illuminated Cabinet Blade",
    description:
      "Internal LED cabinet with translucent polycarbonate or acrylic faces. Maximum brightness and visibility day and night. Wholesale trade pricing for sign shops.",
    image: "Illuminated cabinet blade sign — double-sided, night view",
  },
  {
    name: "Push-Through Blade",
    description:
      "Routed aluminum face with push-through acrylic graphics. Dimensional daytime appearance with selective illumination at night. Available exclusively to trade accounts.",
    image: "Push-through blade sign — dimensional routed face with LED",
  },
  {
    name: "Non-Illuminated Blade",
    description:
      "Painted aluminum or composite construction with applied graphics. Cost-effective pedestrian identification for code-restricted areas. Wholesale direct to sign shops.",
    image: "Non-illuminated blade sign — painted aluminum, storefront",
  },
  {
    name: "Decorative / Ornamental Blade",
    description:
      "Custom decorative brackets and ornamental details for historical districts, boutiques, and architectural environments. Trade pricing available.",
    image: "Decorative ornamental blade sign — wrought iron style bracket",
  },
];

const specs = [
  { label: "Construction", value: "Welded aluminum cabinet" },
  { label: "Cabinet Depth", value: '3" to 6" (custom available)' },
  { label: "Standard Sizes", value: "24x24, 24x36, 30x36, 36x48, custom" },
  { label: "Face Material", value: "Polycarbonate, acrylic, or aluminum" },
  { label: "LED (Illuminated)", value: "Internal LED modules, edge-lit, or backlit" },
  { label: "Graphics", value: "Vinyl, painted, push-through, digital print" },
  { label: "Bracket", value: "Painted steel, decorative options available" },
  { label: "Mounting", value: "Wall mount, under-canopy, or post mount" },
  { label: "Wind Load", value: "Engineered for project-specific requirements" },
  { label: "Certifications", value: "UL Listed (illuminated models)" },
  { label: "Warranty", value: "5-year LED, 3-year construction" },
  { label: "Lead Time", value: "3 weeks door to door" },
];

const useCases = [
  "Main street retail storefronts",
  "Mixed-use ground-floor tenants",
  "Restaurants, cafes, and bars",
  "Hotels and hospitality entrances",
  "Shopping districts and pedestrian malls",
  "Historical downtowns and districts",
  "Office building tenant identification",
  "Urban commercial corridors",
];

export default function BladesSignsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Blade Signs",
    description:
      "Wholesale blade signs for storefronts and mixed-use developments. Double-sided projecting signs, illuminated and non-illuminated options. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Blade Signs",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Blade Signs" },
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
                  Wholesale Blade{" "}
                  <span className="text-brand-gold">Signs</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  Double-sided projecting signs that capture pedestrian traffic
                  from both directions. Illuminated and non-illuminated options
                  in custom shapes, sizes, and finishes for any storefront. Available exclusively to trade accounts.
                </p>
                <p className="text-white/50 mb-8">
                  Wind load engineered. UL listed (illuminated models). Wholesale
                  direct to sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Blade sign — illuminated double-sided projecting sign on brick storefront"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blade Sign Types */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Wholesale Blade Sign Types
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                From fully illuminated cabinets to decorative ornamental
                designs, we fabricate blade signs for every environment. All available at trade pricing.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bladeTypes.map((type, index) => (
              <AnimatedSection key={type.name} delay={index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden border border-black/[0.04] h-full">
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
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Trade Specifications & Benefits
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Trade Specifications
              </h2>
              <p className="text-white/60 mb-8">
                Engineered for durability, visibility, and code compliance. Every
                blade sign includes mounting hardware and installation details. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Blade sign — detail of welded aluminum cabinet and mounting bracket"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
                {specs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-start px-6 py-4 ${
                      index < specs.length - 1 ? "border-b border-white/[0.04]" : ""
                    }`}
                  >
                    <span className="text-sm text-white/50 font-heading">
                      {spec.label}
                    </span>
                    <span className="text-sm text-white font-medium text-right ml-4">
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
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Common Applications
                </h2>
                <p className="text-text-dark/60 mb-8">
                  Blade signs are essential for any business that relies on
                  pedestrian foot traffic. They turn a building facade into a
                  visible brand presence from down the street. Wholesale direct to sign shops for all project types.
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
                label="Blade signs — row of illuminated blade signs along pedestrian shopping street"
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
                Blade Sign Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Blade sign — illuminated restaurant, urban street",
                "Blade sign — retail boutique, historical district",
                "Blade sign — hotel entrance, decorative bracket",
                "Blade sign — mixed-use building, multiple tenants",
                "Blade sign — push-through face, night illumination",
                "Blade sign — round shape, cafe storefront",
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
