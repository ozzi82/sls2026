import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Paintbrush,
  Building2,
  Ruler,
  Weight,
  Layers,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Non-Illuminated Channel Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale non-illuminated channel letters for sign shops only. Dimensional aluminum letters without lighting, same precision fabrication. Trade pricing, 2-3 week delivery. We never sell retail.",
  keywords: [
    "non-illuminated channel letters",
    "non-illuminated channel letters wholesale",
    "unlit channel letters",
    "dimensional channel letters",
    "aluminum channel letters no lights",
    "wholesale channel letters",
    "metal dimensional letters",
    "trade pricing channel letters",
    "sign shop supplier",
  ],
};

const features = [
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description:
      "No LEDs, no power supplies, no electrical components. Non-illuminated channel letters deliver dimensional impact at a significantly lower price point.",
  },
  {
    icon: Paintbrush,
    title: "Full Color & Finish Range",
    description:
      "Any Pantone color with automotive-grade paint. Also available in brushed aluminum, oxidized copper, rusted steel, and specialty finishes.",
  },
  {
    icon: Building2,
    title: "Code-Friendly",
    description:
      "Ideal for locations where illuminated signage is restricted by zoning codes, historical district regulations, or landlord requirements.",
  },
  {
    icon: Ruler,
    title: "Same Precision Build",
    description:
      "Manufactured on the same CNC equipment with the same quality standards as our illuminated products. No shortcuts on non-lit fabrication.",
  },
  {
    icon: Weight,
    title: "Lightweight Construction",
    description:
      "Without internal LED modules and power components, non-illuminated letters are lighter and simpler to install, reducing labor time on site.",
  },
  {
    icon: Layers,
    title: "Versatile Mounting",
    description:
      "Stud mount, flush mount, or raceway mount. Deeper returns for shadow effects or shallow returns for a subtle dimensional profile.",
  },
];

const specs = [
  { label: "Letter Height Range", value: '3" to 72"+' },
  { label: "Return Material", value: '0.040" aluminum, painted or finished' },
  { label: "Face Material", value: '0.063" aluminum or 3/16" acrylic (colored)' },
  { label: "Back Material", value: "0.040\" aluminum (closed back) or open" },
  { label: "Return Depth", value: '1" to 6" (custom depths available)' },
  { label: "Trim Cap", value: "Standard aluminum or trimless" },
  { label: "Finish Options", value: "Pantone paint, brushed, anodized, specialty" },
  { label: "Mounting", value: "Stud, flush, or raceway" },
  { label: "Weight", value: "Significantly lighter than illuminated equivalent" },
  { label: "Warranty", value: "3-year construction and finish" },
  { label: "Lead Time", value: "2-3 weeks standard" },
];

const useCases = [
  "Historical districts with lighting restrictions",
  "Interior lobby and wayfinding signage",
  "Budget-conscious storefronts",
  "Secondary and directional signage",
  "Zoning-restricted locations",
  "Daytime-only businesses",
  "Landlord-restricted tenant signage",
  "Decorative and architectural applications",
];

export default function NonIlluminatedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Non-Illuminated Channel Letters",
    description:
      "Wholesale non-illuminated channel letters for trade accounts. Dimensional aluminum letters without lighting, same precision fabrication as illuminated products. Sign shops only.",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,89,12,0.06),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Non-Illuminated" },
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
                  Wholesale Non-Illuminated{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  Dimensional impact without illumination. Built with the same
                  precision aluminum fabrication as our illuminated lines, non-lit
                  channel letters deliver professional brand presence at a more
                  accessible price point. Available exclusively to trade accounts.
                </p>
                <p className="text-text-light/50 mb-8">
                  Ideal for code-restricted areas, interior signage, and
                  budget-conscious projects. Available with trimless
                  construction. Wholesale direct to sign shops — we never sell retail.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Non-illuminated channel letters — painted aluminum on stone facade, daytime"
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
                The same precision manufacturing that defines our illuminated
                products, applied to a simpler, more cost-effective format. Wholesale direct to your shop.
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

      {/* Finish Options */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Finish Options
                </h2>
                <p className="text-text-light/60 mb-6 leading-relaxed">
                  Non-illuminated channel letters offer the broadest range of
                  finish options, since the face does not need to transmit light.
                  Solid aluminum faces open up finishes that are not possible
                  with illuminated letters. All finishes available at wholesale trade pricing.
                </p>
                <ul className="space-y-3">
                  {[
                    "Any Pantone color — automotive-grade urethane paint",
                    "Brushed aluminum — natural or tinted",
                    "Anodized aluminum — gold, bronze, black, clear",
                    "Oxidized copper — natural patina or accelerated",
                    "Rusted Corten steel — weathered industrial look",
                    "Custom powder coat finishes",
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Non-illuminated finish — painted matte black",
                  "Non-illuminated finish — brushed aluminum",
                  "Non-illuminated finish — oxidized copper patina",
                  "Non-illuminated finish — custom Pantone color",
                ].map((label, i) => (
                  <PlaceholderImage
                    key={i}
                    label={label}
                    className="rounded-xl"
                    aspectRatio="aspect-square"
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Trade Specifications
              </h2>
              <p className="text-text-light/60 mb-8">
                Simpler construction, same quality standards. Faster production
                times due to the absence of electrical components. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Non-illuminated channel letter — cross-section showing aluminum return and face construction"
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
              <PlaceholderImage
                label="Non-illuminated channel letters — interior lobby wayfinding installation"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Ideal Applications
                </h2>
                <p className="text-text-dark/60 mb-8">
                  Non-illuminated channel letters are the right choice when
                  illumination is not needed, not permitted, or not in the
                  budget. Available at wholesale trade pricing for all project types.
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
                Request Trade Pricing for Non-Lit Letters
              </h2>
              <p className="text-text-light/60 mb-4">
                Send your project files for a detailed wholesale quote within 48
                hours. Non-illuminated letters typically ship in 2-3 weeks.
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
