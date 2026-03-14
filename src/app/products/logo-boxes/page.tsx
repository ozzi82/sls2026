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
  title: "Contour Logo Boxes | Wholesale Sign Manufacturer | Sunlite Signs",
  description:
    "Wholesale contour logo boxes and cloud logo signs. Custom-shaped illuminated enclosures for full-color logo reproduction. UL 48 listed, 3-week delivery for sign shops.",
  keywords: [
    "contour logo boxes wholesale",
    "cloud logo signs",
    "logo cabinet signs",
    "illuminated logo boxes",
    "custom logo sign manufacturer",
    "franchise logo signs",
    "contour cut sign cabinets",
    "logo shaped light box",
    "wholesale logo signage",
    "face-lit logo signs",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/products/logo-boxes",
  },
};

const features = [
  {
    icon: Eye,
    title: "Brand-Perfect Shape",
    description:
      "Every contour logo box is custom-shaped to follow the exact outline of your client's logo. The result is a three-dimensional sign that reinforces brand identity with unmistakable recognition from any distance.",
  },
  {
    icon: Lightbulb,
    title: "Face-Lit & Halo-Lit Options",
    description:
      "Choose from face-lit illumination for vibrant, full-color logo reproduction or halo-lit for a dramatic silhouette glow. Combination configurations are also available for maximum visual impact.",
  },
  {
    icon: Ruler,
    title: "Full-Color Reproduction",
    description:
      "High-resolution digital printing on translucent polycarbonate faces captures every gradient, color, and detail of the original logo artwork. PMS color matching ensures brand accuracy.",
  },
  {
    icon: Layers,
    title: "Dimensional Impact",
    description:
      "Contour logo boxes combine the dimensional presence of channel letters with the full-color capability of cabinet signs. The custom-shaped enclosure creates a bold, sculptural presence on any facade.",
  },
  {
    icon: Palette,
    title: "Custom Finishes",
    description:
      "Cabinet returns and trim are available in any standard or custom paint color, powder coat, or vinyl wrap finish. Match corporate brand standards with precision on every project.",
  },
  {
    icon: Shield,
    title: "UL 48 Listed",
    description:
      "All illuminated contour logo boxes are UL 48 listed with proper labeling and documentation. Welded aluminum construction meets structural and electrical code requirements for commercial installations.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Logo Artwork & Engineering",
    description:
      "Submit your client's logo artwork and our engineering team creates detailed CAD drawings of the custom-shaped cabinet, including structural calculations and electrical layouts — all at no extra cost.",
  },
  {
    step: "2",
    title: "Custom Cabinet Fabrication",
    description:
      "CNC-cut aluminum panels are formed and welded to follow the exact contour of the logo. Returns are fabricated to the specified depth, creating a seamless three-dimensional enclosure.",
  },
  {
    step: "3",
    title: "Face & Graphics Application",
    description:
      "Translucent polycarbonate or acrylic faces are contour-cut and fitted to the cabinet. Full-color digital graphics are applied for accurate logo reproduction with LED-friendly translucency.",
  },
  {
    step: "4",
    title: "LED Installation & QC",
    description:
      "LED modules are installed for uniform face illumination or halo glow. Every unit undergoes powered illumination testing and full quality inspection before shipping fully assembled.",
  },
];

const useCases = [
  "Franchise and multi-location branding",
  "Corporate headquarters and campuses",
  "Retail storefronts with iconic logos",
  "Hotels and resort properties",
  "Restaurants and fast-casual chains",
  "Auto dealerships and service centers",
  "Healthcare systems and hospitals",
  "Entertainment venues and stadiums",
];

export default function LogoBoxesPage() {
  const spokes = getLandingPagesByHub("logo-boxes").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Contour Logo Boxes",
    description:
      "Wholesale contour logo boxes and cloud logo signs. Custom-shaped illuminated enclosures that follow the contour of any logo for full-color brand reproduction. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Logo Boxes",
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
              { name: "Logo Boxes" },
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
                  Wholesale Contour{" "}
                  <span className="text-brand-gold">Logo Boxes</span>
                </h1>
                <p className="text-lg text-white/60 mb-4 leading-relaxed">
                  Custom-shaped illuminated enclosures that follow the exact contour of any logo.
                  Combine the dimensional impact of channel letters with full-color logo reproduction
                  for unmistakable brand presence.
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
                label="Contour logo box — custom-shaped illuminated logo sign on building facade"
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

      {/* How Logo Boxes Are Made — Light section */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark mb-5 leading-[1.05] tracking-[-0.02em]">
                  How Logo Boxes Are <span className="text-brand-gold">Made</span>
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto text-[15px]">
                  From logo artwork to finished product, our engineering team handles every detail.
                  Here is how we bring your client&apos;s brand to life in three dimensions.
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
                Why Choose <span className="text-brand-gold">Contour Logo Boxes?</span>
              </h2>
              <p className="text-white/60 mb-6">
                Contour logo boxes — also called cloud logos or logo cabinets — are the ideal solution
                for businesses with recognizable logo marks that need dimensional, illuminated signage.
                Unlike channel letters, which represent individual characters, logo boxes reproduce the
                entire logo as a single illuminated unit.
              </p>
              <p className="text-white/60 mb-8">
                This makes them especially popular for franchise signage, where brand consistency across
                multiple locations is critical. The custom-shaped cabinet follows every curve and angle
                of the logo, creating a sign that is instantly recognizable and impossible to replicate
                with standard sign products.
              </p>
              <PlaceholderImage
                label="Contour logo box — detail of custom-shaped aluminum cabinet with full-color face"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
                {[
                  { label: "Construction", value: "Welded aluminum, contour-shaped" },
                  { label: "Face Material", value: "Polycarbonate or acrylic, contour-cut" },
                  { label: "Graphics", value: "Full-color digital print, PMS matched" },
                  { label: "Cabinet Depth", value: '3.5" to 8" (custom available)' },
                  { label: "Illumination", value: "Face-lit, halo-lit, or combination" },
                  { label: "LED System", value: "Internal LED modules, UL listed" },
                  { label: "Finish", value: "Painted, powder coat, vinyl wrap" },
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
                    Contour logo boxes are ideal for any business with a recognizable logo mark
                    that needs consistent, dimensional brand representation. From single locations
                    to nationwide franchise rollouts, logo boxes deliver brand impact at scale.
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
                  label="Contour logo boxes — franchise storefront with illuminated logo box sign"
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
        heading="Request Wholesale Pricing for"
        highlight="Logo Boxes."
        description="Send your logo artwork, dimensions, or project details and we will return a wholesale quote within 48 hours. No retail markup — just direct trade pricing."
      />
    </>
  );
}
