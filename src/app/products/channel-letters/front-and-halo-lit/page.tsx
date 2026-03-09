import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Layers,
  Sun,
  Moon,
  Shield,
  Ruler,
  Zap,
  Lock,
} from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Front & Halo Lit Channel Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale front and halo lit combination channel letters for sign shops only. Dual LED illumination, trade pricing, UL listed, German-engineered. We never sell retail.",
  keywords: [
    "front and halo lit channel letters",
    "combination channel letters wholesale",
    "dual illuminated channel letters",
    "front and back lit channel letters",
    "wholesale LED channel letters",
    "illuminated sign manufacturer",
    "trade pricing channel letters",
    "sign shop supplier",
  ],
};

const features = [
  {
    icon: Layers,
    title: "Dual Illumination",
    description:
      "Two independent LED circuits — one illuminating the translucent acrylic face, another projecting a halo glow behind the letter. Maximum visual impact.",
  },
  {
    icon: Sun,
    title: "Front Face Brightness",
    description:
      "Forward-facing LEDs deliver the same high-visibility face illumination as our standard face lit letters, ensuring excellent daytime and nighttime readability.",
  },
  {
    icon: Moon,
    title: "Rear Halo Effect",
    description:
      "Rear-mounted LEDs create the same elegant backlit glow as our dedicated halo lit product, adding depth and dimension to the overall sign presentation.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Both LED circuits are fully UL listed. Complete documentation and labeling included for seamless permitting.",
  },
  {
    icon: Zap,
    title: "Independent Control",
    description:
      "Front and rear LED circuits can be wired independently, allowing different on/off schedules or dimming configurations for each lighting effect.",
  },
  {
    icon: Ruler,
    title: "Optimized Depth",
    description:
      "Return depth is engineered to accommodate both LED sets while maintaining a proportional letter profile. Typical depth ranges from 3.5 to 5 inches.",
  },
];

const specs = [
  { label: "Letter Height Range", value: '8" to 72"+' },
  { label: "Return Material", value: '0.040" aluminum, painted' },
  { label: "Face Material", value: '3/16" acrylic, Pantone-matched' },
  { label: "Back Material", value: "Clear polycarbonate (halo output)" },
  { label: "Return Depth", value: '3.5" to 5" (accommodates dual LEDs)' },
  { label: "Front LEDs", value: "Samsung face-illuminating modules" },
  { label: "Rear LEDs", value: "Samsung rear-facing halo modules" },
  { label: "Color Options", value: "Matched or independent front/halo colors" },
  { label: "Power Supply", value: "UL listed Class 2, dual circuit" },
  { label: "Mounting", value: "Stud mount with spacers" },
  { label: "Certifications", value: "UL Listed (UL 48)" },
  { label: "Warranty", value: "5-year LED, 2-year electrical components" },
  { label: "Lead Time", value: "3 weeks door to door" },
];

const useCases = [
  "High-end retail flagships",
  "Entertainment venues and theaters",
  "Hotels and resort properties",
  "Upscale restaurants and bars",
  "Corporate campus signage",
  "Mixed-use lifestyle centers",
  "Casino and gaming properties",
  "Landmark building identification",
];

export default function FrontAndHaloLitPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Front & Halo Lit Channel Letters",
    description:
      "Wholesale combination front and halo lit channel letters with dual LED illumination for maximum visual impact. UL listed, German-engineered. Trade pricing for sign shops only.",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Front & Halo Lit" },
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
                  Wholesale Front & Halo Lit{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  The best of both worlds. Dual LED circuits combine bright
                  front-face illumination with an elegant rear halo glow,
                  delivering maximum visual impact for premium installations. Available exclusively to trade accounts.
                </p>
                <p className="text-text-light/50 mb-8">
                  Two lighting effects. One letter. German-engineered precision
                  with UL listing. Wholesale direct to sign shops — we never sell retail.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/products/front-halo-night.jpg"
                  alt="Front and halo lit channel letters — dual illumination effect, night shot"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Two Effects, One Letter
              </h2>
              <p className="text-text-light/60 max-w-2xl mx-auto">
                Front and halo lit channel letters combine the visibility of
                face illumination with the sophistication of a rear halo glow.
                The result is a sign that commands attention from every angle. Wholesale direct to sign shops.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/products/front-lit-night.jpg"
                    alt="Face lit only — face illumination view"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-text-light mb-1">
                  Face Lit Effect
                </h3>
                <p className="text-sm text-text-light/50">
                  Bright face illumination for readability
                </p>
              </div>
              <div className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image
                    src="/products/halo-lit-night.jpg"
                    alt="Halo lit only — rear glow view"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-text-light mb-1">
                  Halo Lit Effect
                </h3>
                <p className="text-sm text-text-light/50">
                  Elegant backlit glow for ambiance
                </p>
              </div>
              <div className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 ring-2 ring-brand-gold/30">
                  <Image
                    src="/products/front-halo-night.jpg"
                    alt="Front and halo combined — full dual illumination"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-brand-gold mb-1">
                  Combined Effect
                </h3>
                <p className="text-sm text-text-light/50">
                  Maximum impact from both effects
                </p>
              </div>
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
                Dual-circuit engineering with optimized return depth for both
                front face illumination and rear halo spread. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Front and halo lit channel letter — cross-section showing dual LED placement"
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
                label="Front and halo lit letters — entertainment venue, dramatic nighttime lighting"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Ideal Applications
                </h2>
                <p className="text-text-dark/60 mb-8">
                  Front and halo lit letters are the premium choice for
                  high-visibility, high-impact installations where making a
                  statement is essential. Wholesale direct to sign shops for all project types.
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
                Request Trade Pricing for Dual-Lit Letters
              </h2>
              <p className="text-text-light/60 mb-4">
                Send your project details and get a comprehensive wholesale
                quote within 48 hours. Includes both LED circuit specifications
                and trade pricing.
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
