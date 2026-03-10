import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sun,
  Maximize,
  Layers,
  Shield,
  Ruler,
  RefreshCw,
  Lock,
  Download,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale SEG Light Boxes — Custom Silicone-Edged Graphic Light Boxes | Sunlite Signs",
  description:
    "Custom SEG light boxes and silicone-edged graphic prints for sign shops only. Ultra-thin profiles down to 1\" deep, dye-sublimation fabric printing, tool-free graphic changes. Trade pricing, UL listed. 3-week lead time. We never sell retail.",
  keywords: [
    "SEG light box wholesale",
    "silicone edge graphic light box",
    "SEG frame wholesale",
    "fabric light box wholesale",
    "dye sublimation light box",
    "tool-free graphic change lightbox",
    "ultra-thin light box",
    "SEG print wholesale",
    "wholesale SEG manufacturer",
    "trade pricing SEG light box",
    "sign shop supplier",
    "custom SEG light box",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/seg-light-boxes",
  },
};

const features = [
  {
    icon: Layers,
    title: "Silicone Edge Gasket System",
    description:
      "Precision-sewn silicone gasket around the perimeter of each fabric print locks into the aluminum frame channel for a taut, wrinkle-free illuminated face every time.",
  },
  {
    icon: Sun,
    title: "High-Resolution Dye-Sublimation Printing",
    description:
      "Vivid, full-color graphics printed directly into the fabric weave. Dye-sublimation delivers photographic quality that won't crack, peel, or fade like vinyl.",
  },
  {
    icon: RefreshCw,
    title: "Tool-Free Graphic Changes",
    description:
      "Swap graphics in minutes with no tools required. Simply pull the silicone gasket from the channel, insert the new print, and push back in. Ideal for seasonal or rotating messaging.",
  },
  {
    icon: Ruler,
    title: "Ultra-Thin Profiles Down to 1\" Deep",
    description:
      "Low-profile aluminum frames as thin as 1\" deep. Clean, modern aesthetic that sits nearly flush against walls for sleek interior and exterior installations.",
  },
  {
    icon: Maximize,
    title: "Fully Custom Sizes",
    description:
      "Every SEG light box is built to your exact dimensions. No standard-size constraints — specify any width and height for a perfect fit in any application.",
  },
  {
    icon: Shield,
    title: "UL Listed & LED Illuminated",
    description:
      "All illuminated SEG light boxes are UL listed with complete documentation for code compliance and permitting. Edge-lit or backlit LED configurations available.",
  },
];

const specs = [
  { label: "Frame Material", value: "Extruded aluminum" },
  { label: "Profile Depth", value: "1\", 2\", 3\", 4\" (application-dependent)" },
  { label: "Face Material", value: "Dye-sublimation printed fabric with silicone gasket" },
  { label: "Illumination", value: "LED edge-lit or LED backlit" },
  { label: "Graphic Resolution", value: "High-resolution dye-sublimation printing" },
  { label: "Sizes", value: "Custom sizes — any width and height" },
  { label: "Orientation", value: "Single-sided or double-sided" },
  { label: "Frame Finish", value: "Anodized aluminum, silver or black standard" },
  { label: "Mounting", value: "Wall-mount, freestanding, ceiling-hung, or recessed" },
  { label: "Graphic Change", value: "Tool-free — silicone gasket push-in system" },
  { label: "Certifications", value: "UL Listed" },
  { label: "Warranty", value: "5-year LED, 3-year frame and finish" },
  { label: "Lead Time", value: "3 weeks door to door" },
];

const applications = [
  "Retail displays and experiential environments",
  "Wayfinding and directory signage",
  "Advertising and promotional displays",
  "Trade show exhibits and booths",
  "Hospitality and hotel lobbies",
  "Corporate lobbies and reception areas",
  "Quick-service restaurant menu boards",
  "Airport and transit signage",
];

export default function SEGLightBoxesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale SEG Light Boxes",
    description:
      "Custom silicone-edged graphic (SEG) light boxes with dye-sublimation fabric printing, tool-free graphic changes, and ultra-thin profiles down to 1\" deep. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "SEG Light Boxes",
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
              { name: "SEG Light Boxes" },
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
                  Custom{" "}
                  <span className="text-brand-gold">SEG Light Boxes</span>{" "}
                  and Prints in 3 Weeks
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  From experiential retail experiences to advertising and
                  wayfinding content, Sunlite Signs custom-sized
                  Silicone-edged Graphic (SEG) Light Box solutions are like
                  no other the USA industry has experienced — low form
                  factors down to 1&quot; deep, high-resolution printed and
                  illuminated light box signage.
                </p>
                <p className="text-text-light/50 mb-8">
                  UL listed. German-engineered LED layouts. Wholesale direct to
                  sign companies only. Delivered in 3 weeks door to door. We never sell retail — your clients stay yours.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/get-a-quote" className="btn-primary">
                    Get Your Product Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="#"
                    className="btn-secondary inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Catalog
                  </Link>
                </div>
              </div>
              <div>
                <PlaceholderImage
                  label="SEG light box — silicone-edged graphic display, illuminated fabric face, retail environment"
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
                {/* Specs sidebar overlay */}
                <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-sm font-heading font-semibold text-brand-gold uppercase tracking-widest mb-4">
                    Quick Specs
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-text-light/40 font-heading">Profile Depth</span>
                      <p className="text-sm text-text-light font-medium">From 1&quot; to 4&quot;</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-light/40 font-heading">Frame</span>
                      <p className="text-sm text-text-light font-medium">Extruded Aluminum</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-light/40 font-heading">Face</span>
                      <p className="text-sm text-text-light font-medium">Fabric + Silicone Gasket</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-light/40 font-heading">Illumination</span>
                      <p className="text-sm text-text-light font-medium">LED Edge-lit or Backlit</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-light/40 font-heading">Sizes</span>
                      <p className="text-sm text-text-light font-medium">Custom — Any Size</p>
                    </div>
                    <div>
                      <span className="text-xs text-text-light/40 font-heading">Orientation</span>
                      <p className="text-sm text-text-light font-medium">Single or Double-Sided</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Why SEG Light Boxes from Sunlite
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Engineered for visual impact, ease of use, and rapid graphic
                changes. Built to wholesale standards for sign companies who
                demand quality and reliability.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.08}>
                <div className="bg-white border border-black/5 rounded-xl p-8 h-full">
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

      {/* How SEG Works Spotlight */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="SEG light box — close-up of silicone gasket being inserted into aluminum frame channel"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  How the SEG System Works
                </h2>
                <p className="text-text-light/60 mb-6 leading-relaxed">
                  The silicone-edged graphic system is the modern standard for
                  changeable illuminated displays. A precision-sewn silicone
                  gasket around the fabric print presses into a recessed channel
                  in the aluminum frame, creating a perfectly tensioned face with
                  no visible hardware. Wholesale to sign companies only.
                </p>
                <ul className="space-y-3">
                  {[
                    "Silicone gasket sewn to perimeter of dye-sub fabric print",
                    "Gasket pushes into recessed channel in aluminum extrusion",
                    "Fabric stretches taut across the frame — wrinkle-free",
                    "Tool-free removal and replacement in minutes",
                    "Replacement prints ship flat — no bulky rigid panels",
                    "LED modules illuminate evenly from behind the fabric",
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
                Every SEG light box is engineered for uniform illumination,
                structural integrity, and effortless graphic changes. Ships
                ready to install with frame, print, and LED system complete.
                Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="SEG light box — aluminum frame detail with LED modules visible, production facility"
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

      {/* Applications */}
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
                  SEG light boxes bring high-impact illuminated graphics to every
                  environment — from retail storefronts to corporate interiors
                  and trade show floors. Wholesale direct to sign companies for
                  all project types.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-center gap-2 text-sm text-text-dark/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
              <PlaceholderImage
                label="SEG light box installation — large format illuminated fabric display in retail environment"
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
                Get Your Product Started
              </h2>
              <p className="text-text-light/60 mb-4">
                Send your SEG light box specifications or project drawings and
                receive a detailed wholesale quote within 48 hours.
                Custom sizes, prints, and configurations available.
              </p>
              <p className="text-text-light/40 text-sm mb-8">
                Wholesale to sign companies only. We never sell retail and we never compete with you for your clients.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/get-a-quote"
                  className="btn-primary text-base px-10 py-5"
                >
                  Get Your Product Started
                </Link>
                <Link
                  href="#"
                  className="btn-secondary text-base px-10 py-5 inline-flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Catalog
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
