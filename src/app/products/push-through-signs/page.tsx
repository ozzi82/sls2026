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
  title: "Push-Through Signs | Wholesale Sign Manufacturer | Sunlite Signs",
  description:
    "Wholesale push-through signs with dimensional acrylic letters and LED backlighting. German-engineered, UL 48 listed, 3-week delivery. Trade pricing for sign shops only.",
  keywords: [
    "push-through signs wholesale",
    "push-through letter signs",
    "backlit push-through signs",
    "push-through acrylic signs",
    "wholesale sign manufacturer",
    "illuminated push-through signage",
    "custom push-through signs",
    "routed aluminum panel signs",
    "LED push-through signs",
    "dimensional letter signs",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/products/push-through-signs",
  },
};

const features = [
  {
    icon: Eye,
    title: "Elegant Illumination",
    description:
      "Dimensional acrylic letters glow with soft, even illumination when backlit by LEDs, while the aluminum face panel remains opaque. A premium look that commands attention day and night.",
  },
  {
    icon: Lightbulb,
    title: "Energy-Efficient LEDs",
    description:
      "High-output LED modules rated at 50,000+ hours deliver uniform backlighting across every letter. Low energy consumption and maintenance-free operation reduce total cost of ownership.",
  },
  {
    icon: Ruler,
    title: "Precision CNC Routing",
    description:
      "Each aluminum face panel is CNC-routed with tolerances of +/- 0.010 inches, ensuring perfectly fitted letterforms and clean edges on every character for a flawless finished product.",
  },
  {
    icon: Layers,
    title: "Dimensional Impact",
    description:
      "Push-through letters project from the sign face, creating a three-dimensional appearance that flat-face cabinet signs cannot match. Visible depth adds a premium, tactile quality to any storefront.",
  },
  {
    icon: Palette,
    title: "Unlimited Customization",
    description:
      "Any font, any color, any panel finish. Choose from translucent and opaque acrylics, painted or powder-coated aluminum faces, and a full range of standard or custom finishes to match any brand.",
  },
  {
    icon: Shield,
    title: "UL 48 Listed",
    description:
      "All illuminated push-through signs are UL 48 listed with proper labeling and documentation for code compliance, permitting, and inspection. Built to last with welded aluminum construction.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Aluminum Panel Routing",
    description:
      "A CNC router precisely cuts each letterform into a heavy-gauge aluminum face panel. Tight tolerances ensure every character is dimensionally accurate to the approved artwork.",
  },
  {
    step: "2",
    title: "Acrylic Letter Fabrication",
    description:
      "Cast acrylic letters are cut to match each routed opening. Available in translucent or opaque colors, the acrylic pieces are sized for a friction-fit push through the aluminum face.",
  },
  {
    step: "3",
    title: "Assembly & LED Installation",
    description:
      "Letters are pressed through the panel from behind, projecting outward to create dimensional depth. LED modules are installed inside the cabinet for uniform backlighting of each character.",
  },
  {
    step: "4",
    title: "Quality Inspection & Shipping",
    description:
      "Every sign undergoes a powered illumination test and full quality inspection before shipping. Units ship fully assembled and wired, ready for straightforward field installation.",
  },
];

const useCases = [
  "Retail storefronts and shopping centers",
  "Corporate lobbies and office buildings",
  "Hotels and hospitality properties",
  "Restaurants and bars",
  "Medical offices and healthcare facilities",
  "Banks and financial institutions",
  "Auto dealerships and showrooms",
  "Franchise and multi-location brands",
];

export default function PushThroughSignsPage() {
  const spokes = getLandingPagesByHub("push-through-signs").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Push-Through Signs",
    description:
      "Wholesale push-through signs featuring dimensional acrylic letters pushed through routed aluminum panels with LED backlighting. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Push-Through Signs",
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
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36 px-6 sm:px-10 lg:px-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Push-Through Signs" },
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
                  Wholesale Push-Through{" "}
                  <span className="text-brand-gold">Signs</span>
                </h1>
                <p className="text-lg text-white/60 mb-4 leading-relaxed">
                  Dimensional acrylic letters pushed through precision-routed aluminum panels,
                  creating elegant illuminated signage with soft, even backlighting. The premium
                  alternative to flat-face cabinet signs.
                </p>
                <p className="text-white/60 mb-8">
                  German-engineered. UL 48 listed. 3-week delivery. Wholesale
                  direct to sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Push-through sign — illuminated dimensional acrylic letters on routed aluminum panel"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* Features — Dark card grid */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Features & <span className="text-brand-gold">Benefits</span>
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

      {/* How Push-Through Signs Work — Light section */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark mb-5 leading-[1.05] tracking-[-0.02em]">
                  How Push-Through Signs <span className="text-brand-gold">Work</span>
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto text-[15px]">
                  From CNC routing to final assembly, every step is engineered for
                  precision and durability. Here is how we build your push-through signs.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howItWorks.map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-white rounded-xl overflow-hidden border border-black/[0.04] h-full hover:shadow-md hover:-translate-y-1 transition-all duration-400 p-6">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-4">
                      <span className="text-brand-gold font-display font-bold text-sm">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-dark/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* Product Overview */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                Why Choose <span className="text-brand-gold">Push-Through Signs?</span>
              </h2>
              <p className="text-white/60 mb-6">
                Push-through signs bridge the gap between standard cabinet signs and individual
                channel letters. They deliver a dimensional, illuminated look at a competitive
                price point, making them one of the most effective upsell opportunities for
                sign shops.
              </p>
              <p className="text-white/60 mb-8">
                When backlit by LEDs, the acrylic letters glow with a soft, even illumination
                while the aluminum face panel remains opaque, creating a striking contrast that
                draws attention. The result is signage that looks custom and high-end without the
                complexity or cost of individual channel letters.
              </p>
              <PlaceholderImage
                label="Push-through sign — detail of acrylic letters projecting through routed aluminum"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
                {[
                  { label: "Construction", value: "Welded aluminum cabinet" },
                  { label: "Face Panel", value: "CNC-routed aluminum composite" },
                  { label: "Letters", value: "Cast acrylic, push-through mounted" },
                  { label: "Letter Depth", value: '3/8" to 1" projection' },
                  { label: "LED System", value: "Internal LED modules, UL listed" },
                  { label: "Colors", value: "Any font, any acrylic color, any panel finish" },
                  { label: "Panel Finish", value: "Painted, powder coat, brushed, or wrapped" },
                  { label: "Mounting", value: "Wall mount, raceway, pole mount, monument" },
                  { label: "Certifications", value: "UL 48 Listed" },
                  { label: "Warranty", value: "5-year LED, 3-year construction" },
                  { label: "Lead Time", value: "3 weeks door to door" },
                ].map((spec, index, arr) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-start px-6 py-4 ${
                      index < arr.length - 1 ? "border-b border-white/[0.04]" : ""
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

      {/* Applications — Light section */}
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
                    Push-through signs are popular across retail, hospitality, corporate,
                    and healthcare sectors. Their dimensional elegance and soft illumination
                    make them ideal for businesses that want premium-looking signage without the cost of channel letters.
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
                  label="Push-through signs — retail storefront with illuminated push-through lettering"
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

      {/* CTA */}
      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection
        heading="Request Trade Pricing for"
        highlight="Push-Through Signs."
        description="Send your push-through sign specs, artwork, or project details and we will return a wholesale quote within 48 hours. No retail markup — just direct trade pricing."
      />
    </>
  );
}
