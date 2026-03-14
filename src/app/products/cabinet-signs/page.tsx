import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  Lightbulb,
  Ruler,
  Shield,
  Palette,
  Layers,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: "Wholesale Cabinet Signs — Trade Pricing for Sign Shops | Sunlite Signs",
  description:
    "Wholesale cabinet signs for sign shops only. Illuminated cabinet signs, push-through letters, and flex-face options. Trade pricing, German-engineered, UL listed. We never sell retail.",
  keywords: [
    "cabinet signs wholesale",
    "illuminated cabinet signs",
    "push-through letter signs",
    "flex-face cabinet signs",
    "wholesale sign manufacturer",
    "cabinet sign fabrication",
    "trade pricing cabinet signs",
    "sign shop supplier",
    "LED cabinet signs",
    "lightbox signs wholesale",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/wholesale-cabinet-signs",
  },
};

const features = [
  {
    icon: Eye,
    title: "Maximum Visibility",
    description:
      "Large-format illuminated cabinet signs deliver high-impact brand presence visible from hundreds of feet away, day and night. Ideal for storefronts, shopping centers, and commercial buildings.",
  },
  {
    icon: Lightbulb,
    title: "LED Illumination",
    description:
      "High-efficiency LED modules provide uniform illumination across the entire face. Energy-efficient operation with 50,000+ hour rated life. Internal or edge-lit configurations available.",
  },
  {
    icon: Ruler,
    title: "Custom Sizes & Shapes",
    description:
      "Rectangular, curved, shaped, or fully custom cabinet profiles. From compact wall-mounted units to large freestanding monument signs. Sized to your project specifications.",
  },
  {
    icon: Layers,
    title: "Push-Through Letters",
    description:
      "Routed aluminum faces with dimensional push-through acrylic letters. Combines daytime dimensional appearance with selective night illumination for a premium look.",
  },
  {
    icon: Palette,
    title: "Flex-Face Options",
    description:
      "Tensioned translucent vinyl faces for full-color, edge-to-edge graphics. Easily replaceable faces for multi-tenant or seasonal branding applications.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "All illuminated cabinet signs are UL listed with proper labeling and documentation for code compliance and permitting. Built to last with welded aluminum construction.",
  },
];

const cabinetTypes = [
  {
    name: "Standard Illuminated Cabinet",
    description:
      "Internal LED cabinet with translucent polycarbonate or acrylic face. Uniform illumination for maximum visibility day and night. Welded aluminum construction with painted finish. Wholesale trade pricing for sign shops.",
    image: "Illuminated cabinet sign — standard box sign, night view",
  },
  {
    name: "Push-Through Letter Cabinet",
    description:
      "Routed aluminum face with push-through acrylic letters. Dimensional daytime appearance with selective letter illumination at night. Premium aesthetic for retail and hospitality. Available exclusively to trade accounts.",
    image: "Push-through letter cabinet sign — dimensional routed face with LED",
  },
  {
    name: "Flex-Face Cabinet",
    description:
      "Tensioned translucent vinyl face for full-color illuminated graphics. Easy face replacement for tenant changes. Ideal for multi-tenant retail and franchise applications. Wholesale direct to sign shops.",
    image: "Flex-face cabinet sign — tensioned vinyl illuminated graphics",
  },
  {
    name: "Double-Sided Cabinet",
    description:
      "Illuminated on both sides for maximum exposure. Ideal for monument signs, pole signs, and median-facing applications. Engineered for wind load requirements. Trade pricing available.",
    image: "Double-sided cabinet sign — illuminated monument sign",
  },
];

const specs = [
  { label: "Construction", value: "Welded aluminum cabinet" },
  { label: "Cabinet Depth", value: '4" to 12" (custom available)' },
  { label: "Standard Sizes", value: "24x48, 36x72, 48x96, 48x120, custom" },
  { label: "Face Material", value: "Polycarbonate, acrylic, flex-face vinyl, or aluminum (push-through)" },
  { label: "LED System", value: "Internal LED modules, edge-lit, or backlit" },
  { label: "Graphics", value: "Vinyl, digital print, push-through acrylic, flex-face" },
  { label: "Finish", value: "Painted aluminum, powder coat, or anodized" },
  { label: "Mounting", value: "Wall mount, raceway, pole mount, monument base" },
  { label: "Electrical", value: "Remote or integrated power supply, UL listed" },
  { label: "Certifications", value: "UL Listed (all illuminated models)" },
  { label: "Warranty", value: "5-year LED, 3-year construction" },
  { label: "Lead Time", value: "3 weeks door to door" },
];

const useCases = [
  "Retail storefronts and shopping centers",
  "Gas stations and convenience stores",
  "Quick-service restaurants and franchises",
  "Multi-tenant commercial buildings",
  "Monument and pylon sign cabinets",
  "Parking garages and wayfinding",
  "Auto dealerships and service centers",
  "Healthcare and medical facilities",
];

export default function CabinetSignsPage() {
  const spokes = getLandingPagesByHub("cabinet-signs").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Cabinet Signs",
    description:
      "Wholesale cabinet signs for storefronts and commercial applications. Illuminated cabinet signs, push-through letters, and flex-face options. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Cabinet Signs",
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

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36 px-6 sm:px-10 lg:px-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Cabinet Signs" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="micro-label mb-6">
                  Wholesale Only — Trade Pricing
                </p>
                <div className="gold-line mb-8" />
                <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                  Wholesale Cabinet{" "}
                  <span className="text-brand-gold">Signs</span>
                </h1>
                <p className="text-lg text-white/60 mb-4 leading-relaxed">
                  Illuminated cabinet signs, push-through letter cabinets, and
                  flex-face options for every commercial application. Large-format
                  signage engineered for maximum visibility. Available exclusively to trade accounts.
                </p>
                <p className="text-white/60 mb-8">
                  UL listed. German-engineered. Wholesale
                  direct to sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Cabinet sign — illuminated storefront cabinet sign at night"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CABINET SIGN TYPES — Light section
          ═══════════════════════════════════════════ */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark mb-5 leading-[1.05] tracking-[-0.02em]">
                  Wholesale Cabinet Sign <span className="text-brand-gold">Types</span>
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto text-[15px]">
                  From standard illuminated cabinets to premium push-through and
                  flex-face configurations. All available at trade pricing.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cabinetTypes.map((type, index) => (
                <AnimatedSection key={type.name} delay={index * 0.1}>
                  <div className="bg-white rounded-xl overflow-hidden border border-black/[0.04] h-full hover:shadow-md hover:-translate-y-1 transition-all duration-400">
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
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FEATURES — Dark card grid
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Trade Specifications & <span className="text-brand-gold">Benefits</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          SPECIFICATIONS — Two-column
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                Trade <span className="text-brand-gold">Specifications</span>
              </h2>
              <p className="text-white/60 mb-8">
                Engineered for durability, visibility, and code compliance. Every
                cabinet sign includes complete electrical documentation and installation details. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Cabinet sign — detail of welded aluminum cabinet construction"
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

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          USE CASES — Light section
          ═══════════════════════════════════════════ */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="gold-line mb-6" />
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-text-dark mb-4 tracking-[-0.02em]">
                    Common <span className="text-brand-gold">Applications</span>
                  </h2>
                  <p className="text-text-dark/60 mb-8">
                    Cabinet signs are the workhorses of commercial signage.
                    From retail storefronts to monument signs, they deliver
                    reliable illuminated identification for every application. Wholesale direct to sign shops for all project types.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {useCases.map((useCase) => (
                      <li
                        key={useCase}
                        className="flex items-center gap-2 text-sm text-text-dark/60"
                      >
                        <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
                <PlaceholderImage
                  label="Cabinet signs — row of illuminated cabinet signs at shopping center"
                  className="rounded-lg"
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          GALLERY
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Cabinet Sign <span className="text-brand-gold">Projects</span>
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "Cabinet sign — illuminated retail storefront, night",
                "Cabinet sign — push-through letters, restaurant",
                "Cabinet sign — flex-face, gas station canopy",
                "Cabinet sign — double-sided monument, shopping center",
                "Cabinet sign — multi-tenant commercial building",
                "Cabinet sign — custom shape, auto dealership",
              ].map((label, i) => (
                <div key={i} className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-400">
                  <PlaceholderImage
                    label={label}
                    className="rounded-none border-0"
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection
        heading="Request Wholesale Pricing for"
        highlight="Cabinet Signs."
        description="Send your cabinet sign specs, drawings, or project details and we will return a wholesale quote within 48 hours. No retail markup — just direct trade pricing."
      />
    </>
  );
}
