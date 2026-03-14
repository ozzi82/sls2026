import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Layers,
  Shield,
  Palette,
  Ruler,
  Wrench,
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
    "Wholesale Stainless Steel Flush Mount Halo Letters — EdgeLuxe LP 3.2 | Sunlite Signs",
  description:
    "Wholesale fabricated stainless steel flush-mount letters with partial side-lit halo effect. German-engineered. Trade pricing for sign shops only.",
  keywords: [
    "stainless steel flush mount letters",
    "flush mount halo letters",
    "fabricated metal letters",
    "side lit halo signs",
    "stainless steel channel letters wholesale",
    "wholesale letters",
    "trade pricing",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/stainless-steel-flush-mount-letters",
  },
};

const features = [
  {
    icon: Sparkles,
    title: "Partial Side-Lit Halo",
    description:
      "Flush-mounted design creates an elegant partial side-lit halo effect. Light bleeds around the edges for a sophisticated, modern look.",
  },
  {
    icon: Layers,
    title: "Flush-Mount Installation",
    description:
      "Mounts directly to the surface with no visible standoffs or spacers. Clean, minimal profile that sits tight against any wall or fascia.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Every illuminated letter set ships with UL listing labels and documentation for fast, compliant permitting.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description:
      "Painted in any PMS color. Options for vinyls or pigmented translucent acrylics for colored halo effects.",
  },
  {
    icon: Ruler,
    title: "Multiple Depth Options",
    description:
      "Available in 30mm, 50mm, 80mm, and 100mm depths to match any project scale and desired illumination.",
  },
  {
    icon: Wrench,
    title: "Serviceable LEDs",
    description:
      "Fabricated stainless steel construction allows LED modules to be accessed and replaced in the field for easy long-term maintenance.",
  },
];

const useCases = [
  "Sleek corporate lobbies",
  "Modern retail storefronts",
  "Boutique hotels and restaurants",
  "Medical and professional offices",
  "Architectural building signage",
  "Gallery and museum wayfinding",
  "Premium residential developments",
  "Clean-line commercial facades",
];

export default function StainlessFlushPage() {
  const product = getProduct("LP 3.2");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Stainless Steel Flush Mount Letters — EdgeLuxe LP 3.2",
    description:
      "Wholesale fabricated stainless steel flush-mount letters with partial side-lit halo effect. German-engineered. Trade pricing for sign shops only.",
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
      value: "EdgeLuxe LP 3.2",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Stainless Steel Flush Mount" },
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
                  Wholesale Stainless Steel{" "}
                  <span className="text-brand-gold">Flush Mount Letters</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  Fabricated stainless steel letters mounted flush against the
                  surface with a partial side-lit halo effect. The EdgeLuxe LP
                  3.2 delivers an elegant, understated glow from its edges —
                  perfect for modern architectural applications where a clean
                  profile is essential.
                </p>
                <p className="text-white/50 mb-8">
                  German-engineered precision. UL listed. Wholesale direct to
                  sign shops across the USA and Canada.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/stainless-flush-day.jpg"
                nightSrc="/products/stainless-flush-night.jpg"
                alt="Stainless steel flush mount letters — partial side-lit halo effect, night"
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
                Every flush mount stainless steel letter set is manufactured to
                the same exacting standards that define the Sunlite brand.
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
                Built to meet and exceed industry standards. Every specification
                reflects our commitment to quality and longevity. Available
                exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="Stainless steel flush mount letter — cross-section detail showing LED placement"
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
                  Flush mount stainless steel letters deliver a clean,
                  architectural look that elevates any brand. Perfect for
                  environments where a minimal profile and sophisticated glow are
                  essential. Wholesale direct to sign shops for all project
                  types.
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
                  src="/products/stainless-flush-day.jpg"
                  alt="Stainless steel flush mount letters — commercial installation, daytime"
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
                Flush Mount Projects
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Stainless steel flush mount — corporate lobby entrance",
                "Stainless steel flush mount — modern retail storefront",
                "Stainless steel flush mount — boutique hotel facade",
                "Stainless steel flush mount — medical office building",
                "Stainless steel flush mount — architectural signage detail",
                "Stainless steel flush mount — gallery wayfinding",
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
