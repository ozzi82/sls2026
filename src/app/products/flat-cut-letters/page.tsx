import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Layers,
  Paintbrush,
  Ruler,
  Shield,
  Scissors,
  Mountain,
  Lock,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";

export const metadata: Metadata = {
  title: "Wholesale Flat Cut Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale flat cut letters for sign shops only. Aluminum, stainless steel, brass, and acrylic. CNC precision-cut, trade pricing, multiple finishes. We never sell retail.",
  keywords: [
    "flat cut letters wholesale",
    "flat cut metal letters",
    "dimensional letters wholesale",
    "aluminum cut letters",
    "stainless steel letters",
    "CNC cut letters wholesale",
    "metal sign letters manufacturer",
    "flat cut acrylic letters",
    "trade pricing flat cut letters",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/flat-cut-letters",
  },
};

const materials = [
  {
    name: "Aluminum",
    description:
      "Lightweight and versatile. Available in painted, brushed, anodized, or powder-coated finishes. The most popular flat cut material. Wholesale trade pricing for sign shops.",
    thickness: '1/8", 3/16", 1/4", 3/8", 1/2"',
    image: "Flat cut aluminum letters — brushed finish detail",
  },
  {
    name: "Stainless Steel",
    description:
      "Premium look with exceptional durability. Available in brushed, mirror-polished, and PVD-coated finishes including gold, rose gold, and black. Trade pricing available.",
    thickness: '1/16", 1/8", 3/16", 1/4"',
    image: "Flat cut stainless steel letters — mirror polished finish",
  },
  {
    name: "Brass",
    description:
      "Classic warmth and richness. Available in polished, brushed, antiqued, or lacquered finishes. Develops natural patina over time. Wholesale direct to sign shops.",
    thickness: '1/8", 3/16", 1/4"',
    image: "Flat cut brass letters — polished warm gold tone",
  },
  {
    name: "Acrylic",
    description:
      "Cost-effective with vibrant color options. Available in opaque, translucent, and frosted finishes. Can be edge-lit for subtle illumination. Available exclusively at trade pricing.",
    thickness: '1/4", 3/8", 1/2", 3/4", 1"',
    image: "Flat cut acrylic letters — matte black on white wall",
  },
];

const features = [
  {
    icon: Scissors,
    title: "CNC Precision Cutting",
    description:
      "Laser and waterjet CNC cutting delivers crisp edges and precise geometry on every letter, logo, and custom shape. Tolerances within 0.005 inches.",
  },
  {
    icon: Paintbrush,
    title: "Extensive Finish Options",
    description:
      "Painted, brushed, polished, anodized, powder-coated, or raw. Custom finishes including oxidized, rusted, and specialty treatments available.",
  },
  {
    icon: Layers,
    title: "Multiple Mounting Methods",
    description:
      "Stud-mounted with standoffs for a floating effect, flush-mounted directly to the surface, or pin-mounted with hidden hardware.",
  },
  {
    icon: Ruler,
    title: "Any Size or Font",
    description:
      "From 1-inch desk nameplates to 6-foot building identification. Any font, any logo, any custom shape. We cut what you design.",
  },
  {
    icon: Mountain,
    title: "Interior & Exterior Grade",
    description:
      "Material selection and finish treatment optimized for the intended environment. UV-stable finishes for exterior applications.",
  },
  {
    icon: Shield,
    title: "Wholesale Direct Pricing",
    description:
      "Trade-only pricing for sign shops. No retail markup. Same quality standards as our illuminated product lines. We never compete with our sign shop partners.",
  },
];

const product = getProduct("LP 1");

const useCases = [
  "Corporate lobby and reception signage",
  "Retail storefront identification",
  "Restaurant and hospitality branding",
  "Office suite and tenant identification",
  "Wayfinding and directional signage",
  "Monument and pylon letter sets",
  "Interior feature walls and branding",
  "ADA-compliant dimensional signage",
];

export default function FlatCutLettersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Flat Cut Letters",
    description:
      "Wholesale flat cut letters in aluminum, stainless steel, brass, and acrylic. CNC precision-cut with multiple finishes and mounting options. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Model",
      value: "EdgeLuxe LP 1",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Dimensional Letters",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Flat Cut Letters" },
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
                  Wholesale Flat Cut{" "}
                  <span className="text-brand-gold">Letters</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  Precision CNC-cut dimensional letters in aluminum, stainless
                  steel, brass, and acrylic. Clean lines, crisp edges, and a
                  professional dimensional look for any commercial application. Available exclusively to trade accounts.
                </p>
                <p className="text-text-light/50 mb-8">
                  Wholesale direct to sign shops. Any font, any size, any
                  material. Delivered in 2-3 weeks. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/flat-cut-day.jpg"
                alt="Flat cut letters — brushed stainless steel on dark stone wall, corporate lobby"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Materials */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Wholesale Material Options
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Four material families, each with multiple thickness and finish
                options to match any design intent and budget. All at trade pricing for sign shops.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((material, index) => (
              <AnimatedSection key={material.name} delay={index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden border border-black/5 h-full">
                  <PlaceholderImage
                    label={material.image}
                    className="rounded-none border-0"
                    aspectRatio="aspect-[16/9]"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
                      {material.name}
                    </h3>
                    <p className="text-sm text-text-dark/60 leading-relaxed mb-3">
                      {material.description}
                    </p>
                    <p className="text-xs text-text-dark/40 font-heading">
                      Available thickness: {material.thickness}
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

      {/* Mounting Options */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Mounting Methods
                </h2>
                <p className="text-text-light/60 mb-6 leading-relaxed">
                  The mounting method determines the visual relationship between
                  the letters and the surface. We provide the right mounting
                  hardware and a paper pattern for every project. Wholesale direct to your shop.
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Stud Mount with Standoffs",
                      desc: "Letters float off the wall on threaded studs, casting shadows for a dramatic dimensional effect. Most popular option.",
                    },
                    {
                      title: "Flush Mount",
                      desc: "Letters mount directly to the surface with adhesive or hidden mechanical fasteners. Clean, minimal look.",
                    },
                    {
                      title: "Pin Mount",
                      desc: "Small pins protrude from the back of each letter, inserted into pre-drilled holes. Precise and adjustable.",
                    },
                  ].map((method) => (
                    <li key={method.title}>
                      <h4 className="font-heading font-semibold text-text-light mb-1">
                        {method.title}
                      </h4>
                      <p className="text-sm text-text-light/50">{method.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <PlaceholderImage
                label="Flat cut letters mounting — stud mount with standoffs showing shadow effect"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
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
                CNC precision cutting with tight tolerances across all
                materials. Every letter set ships with a paper pattern and
                mounting hardware. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Flat cut letters — CNC laser cutting process, precision detail"
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
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Flat cut letters — corporate lobby installation with stud mount standoffs"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Common Applications
                </h2>
                <p className="text-text-dark/60 mb-8">
                  Flat cut letters are the most versatile dimensional signage
                  format, suitable for both interior and exterior installations. Wholesale direct to sign shops for all project types.
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
                Request Trade Pricing for Flat Cut Letters
              </h2>
              <p className="text-text-light/60 mb-4">
                Send your artwork and specifications. We will return a detailed
                wholesale quote within 48 hours with material and finish
                options.
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
