import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Wrench,
  Lightbulb,
  Layers,
  Shield,
  Ruler,
  MessageSquare,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Custom Sign Fabrication — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale custom sign fabrication for sign shops only. Bespoke illuminated signage, specialty materials, complex geometries. Trade pricing, we never sell retail. We never compete with you.",
  keywords: [
    "custom sign fabrication wholesale",
    "custom sign manufacturer",
    "bespoke signage fabrication",
    "specialty sign fabrication",
    "custom illuminated signs",
    "architectural sign fabrication",
    "wholesale custom signs",
    "sign fabrication USA",
    "trade pricing custom signs",
    "sign shop supplier",
  ],
  alternates: {
    canonical: "https://sunlitesigns.com/custom-sign-fabrication",
  },
};

const capabilities = [
  {
    icon: Wrench,
    title: "Complex Geometries",
    description:
      "Multi-plane letters, curved returns, tapered profiles, and three-dimensional sculptural forms. If your design challenges standard fabrication, we welcome it.",
  },
  {
    icon: Lightbulb,
    title: "Specialty Illumination",
    description:
      "Neon-look LED flex, RGB color-changing, programmable DMX control, edge-lit panels, backlit murals, and custom LED configurations beyond standard products.",
  },
  {
    icon: Layers,
    title: "Mixed Materials",
    description:
      "Combinations of aluminum, stainless steel, brass, copper, acrylic, wood, stone, and composite materials in a single sign structure.",
  },
  {
    icon: Ruler,
    title: "Oversized Fabrication",
    description:
      "Large-format letters, building-scale installations, and multi-component sign systems that exceed standard product size ranges.",
  },
  {
    icon: Shield,
    title: "Engineering Support",
    description:
      "Structural calculations, wind load analysis, and mounting engineering for complex installations. We provide the documentation you need for permitting.",
  },
  {
    icon: MessageSquare,
    title: "Collaborative Process",
    description:
      "We work directly with you and your client's design team to translate concepts into buildable, installable signage. From napkin sketch to shop drawings.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Your Concept",
    description:
      "Share whatever you have: architectural drawings, brand guidelines, rough sketches, reference photos, or just a description of what you need. We work with it all.",
  },
  {
    step: "02",
    title: "Engineering & Trade Estimation",
    description:
      "Our team reviews your concept, identifies the optimal materials and construction methods, and provides a detailed wholesale trade quote with fabrication drawings.",
  },
  {
    step: "03",
    title: "Shop Drawing Approval",
    description:
      "We produce detailed shop drawings showing materials, dimensions, illumination, mounting, and electrical specifications. You approve before we cut metal.",
  },
  {
    step: "04",
    title: "Fabrication & QC",
    description:
      "Precision fabrication using the same German-engineered processes that define our standard product lines. Every custom project undergoes the same quality control.",
  },
  {
    step: "05",
    title: "Crating & Delivery",
    description:
      "Custom crating for safe transit. We ship to your shop or direct to the job site. Installation guides and hardware included.",
  },
];

const projectTypes = [
  "Architectural monument signs",
  "Multi-element building identification systems",
  "Sculptural and three-dimensional brand elements",
  "Oversized rooftop or building-mounted letters",
  "Mixed-material reception and lobby features",
  "Illuminated murals and graphic walls",
  "Wayfinding and directional sign systems",
  "LED-integrated architectural elements",
  "Historical restoration and replication",
  "Specialty finish and patina applications",
];

export default function CustomFabricationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wholesale Custom Sign Fabrication",
    description:
      "Wholesale custom sign fabrication for bespoke illuminated signage, specialty materials, and complex geometries. Trade pricing for sign shops only.",
    provider: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
      url: "https://sunlitesigns.com",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
    ],
    serviceType: "Wholesale Custom Sign Fabrication",
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
              { name: "Custom Fabrication" },
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
                  Wholesale Custom{" "}
                  <span className="text-brand-gold">Fabrication</span>
                </h1>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  When your project goes beyond standard products, our custom
                  fabrication team brings it to life. Complex geometries,
                  mixed materials, specialty illumination, and oversized
                  installations — engineered and built to the same standards as
                  our entire product line. Available exclusively to trade accounts.
                </p>
                <p className="text-white/50 mb-8">
                  If you can design it, we can engineer it, build it, and ship
                  it. Wholesale direct to sign shops. USA and Canada. We never sell retail — we never compete with you.
                </p>
                <Link href="/get-a-quote" className="btn-primary">
                  Request Trade Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <PlaceholderImage
                label="Custom fabrication — large-scale bespoke illuminated sign in fabrication shop"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Wholesale Custom Capabilities
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                Our fabrication shop is equipped to handle projects that other
                wholesale manufacturers decline. Complexity is where we excel. All custom work available exclusively at trade pricing.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08}>
                <div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
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
      </section>

      {/* Process */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                The Wholesale Custom Fabrication Process
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                A structured process that takes your concept from idea to
                installed reality. Clear communication and approval gates at
                every stage. Trade pricing throughout.
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <div
                  className={`flex gap-6 ${
                    index < processSteps.length - 1
                      ? "pb-10 border-l-2 border-brand-gold/20 ml-6"
                      : "ml-6"
                  }`}
                >
                  <div className="flex-shrink-0 -ml-[27px] w-12 h-12 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center">
                    <span className="text-brand-gold font-heading font-bold text-sm">
                      {step.step}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-heading font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  Project Types We Handle
                </h2>
                <p className="text-white/60 mb-8">
                  This is a sample of the custom project types our fabrication
                  team handles regularly. If your project is not on this list,
                  reach out — we have likely done something similar. All at wholesale trade pricing for sign shops.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((type) => (
                    <li
                      key={type}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Custom project — oversized rooftop letters, fabrication in progress",
                  "Custom project — mixed-material monument sign with stone base",
                  "Custom project — sculptural 3D brand element with LED illumination",
                  "Custom project — multi-component wayfinding system",
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

      {/* Gallery */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Custom Fabrication Projects
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                A selection of custom projects that showcase the range and
                capability of our fabrication team.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Custom project — architectural monument sign, installed",
                "Custom project — illuminated mural wall, restaurant interior",
                "Custom project — oversized dimensional letters, building facade",
                "Custom project — mixed metal and wood reception sign",
                "Custom project — LED-integrated architectural feature",
                "Custom project — historical sign restoration",
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

      {/* Why Sunlite for Custom */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Sunlite fabrication shop — CNC equipment, welding stations, paint booth"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Why Sunlite for Wholesale Custom Work
                </h2>
                <p className="text-text-dark/60 mb-6 leading-relaxed">
                  Custom fabrication requires a partner who combines engineering
                  capability with manufacturing precision. That is exactly what
                  our German engineering heritage delivers. Wholesale direct to sign shops — we never sell retail.
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Engineering First",
                      desc: "We solve fabrication challenges before cutting metal. Detailed shop drawings and engineering review prevent problems on site.",
                    },
                    {
                      title: "Same Quality Standards",
                      desc: "Custom projects go through the same QC process as our standard products. No shortcuts because it is a one-off.",
                    },
                    {
                      title: "Wholesale Trade Pricing",
                      desc: "Trade-only pricing on custom work. No retail markup — your margin is protected, your client gets a premium product, and we never compete with you.",
                    },
                    {
                      title: "Clear Communication",
                      desc: "A dedicated project manager for every custom job. Regular updates, photo documentation, and no surprises.",
                    },
                  ].map((item) => (
                    <li key={item.title}>
                      <h4 className="font-heading font-semibold text-text-dark mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-text-dark/60">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      <CTASection />
    </>
  );
}
