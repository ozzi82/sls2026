import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  HardHat,
  Zap,
  Factory,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title:
    "Complimentary Engineering Services — Wholesale Sign Manufacturer | Sunlite Signs",
  description:
    "Complimentary engineering services for wholesale sign shop partners. Concept & materials, structural engineering, electrical layout, and manufacturing engineering. German-engineered precision — trade accounts only.",
  openGraph: {
    title:
      "Complimentary Engineering Services — Wholesale Sign Manufacturer | Sunlite Signs",
    description:
      "From concept to manufacturing, Sunlite Signs provides complimentary engineering services to wholesale trade partners. German engineering roots, UL compliance, and packaging optimization — sign shops only.",
    url: "https://sunlitesigns.com/services",
  },
};

const services = [
  {
    icon: Layers,
    title: "Concept & Materials",
    description:
      "Conceptual integration of structural and material sciences co-development for illuminated signage projects. We work with you from the earliest stages to select the right materials, evaluate structural requirements, and develop a cohesive concept that translates your client's vision into a buildable, durable, and visually compelling sign.",
    image: "Concept and materials co-development — material samples and design sketches",
    learnMoreLabel: "Learn About Our Materials Process",
  },
  {
    icon: HardHat,
    title: "Structural Engineering",
    description:
      "Translating conceptual designs to production-ready illuminated signage in the most common European channel letter form factors. Our structural engineering ensures every sign meets wind load requirements, mounting specifications, and code compliance — while maintaining the sleek, low-profile aesthetics that define German-engineered signage.",
    image: "Structural engineering — CAD drawings and channel letter cross-sections",
    learnMoreLabel: "Explore Structural Engineering",
  },
  {
    icon: Zap,
    title: "Electrical Layout",
    description:
      "LED integration, electrical engineering, and UL compliance for all illuminated signage products. We design optimized LED layouts for uniform illumination, calculate power requirements, specify UL-recognized components, and provide complete electrical documentation for permitting and inspection.",
    image: "Electrical layout — LED module placement and wiring diagram",
    learnMoreLabel: "View Electrical Engineering Details",
  },
  {
    icon: Factory,
    title: "Manufacturing Engineering",
    description:
      "Manufacturing engineering and packaging optimization for wholesale production and shipping. From CNC programming and material nesting to paint specifications and crating design, we engineer the entire manufacturing process to deliver consistent quality, minimize waste, and ensure your signs arrive undamaged — every time.",
    image: "Manufacturing engineering — CNC production and packaging crates",
    learnMoreLabel: "Discover Our Manufacturing Process",
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Complimentary Engineering Services",
    provider: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
      url: "https://sunlitesigns.com",
    },
    description:
      "Complimentary engineering services for wholesale sign shop partners including concept & materials co-development, structural engineering, electrical layout, and manufacturing engineering for illuminated signage.",
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    serviceType: "Sign Engineering Services",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />

        <div className="relative z-10 container-max section-padding pt-32 md:pt-36 px-6 sm:px-10 lg:px-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services" },
            ]}
          />
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="micro-label mb-6">
                Wholesale Only
              </p>
              <div className="gold-line mb-8" />
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                Complimentary Engineering{" "}
                <span className="text-brand-gold">Services</span>
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                With our German design and engineering roots, we&apos;re happy to
                contribute our complimentary engineering services to your project.
                From conceptual integration of structural and material sciences
                co-development, translating that to illuminated signage in the
                most common European channel letter form factors, to
                manufacturing engineering and packaging. We&apos;re happy to
                contribute our expertise at every stage of your project, with
                the flexibility to accommodate your needs all along the way.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE CARDS — 4-card grid
          ═══════════════════════════════════════════ */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Our <span className="text-brand-gold">Services</span>
              </h2>
              <p className="text-white/60 max-w-md mx-auto text-[15px]">
                Included with every project — German-engineered expertise from concept to delivery.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 lg:p-10 h-full hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                    <service.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6 text-[15px]">
                    {service.description}
                  </p>
                  <Link
                    href="/get-a-quote"
                    className="btn-text-link group"
                  >
                    {service.learnMoreLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ALTERNATING DETAIL SECTIONS
          ═══════════════════════════════════════════ */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;

        if (isEven) {
          // Light section
          return (
            <section key={`detail-${service.title}`}>
              <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />
              <div className="mx-6 sm:mx-10 lg:mx-16">
                <div className="bg-bg-light rounded-2xl overflow-hidden">
                  <div className="container-max px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
                    <AnimatedSection>
                      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 w-full">
                          <PlaceholderImage
                            label={service.image}
                            className="rounded-lg"
                            aspectRatio="aspect-[4/3]"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                            <service.icon className="w-6 h-6 text-brand-gold" />
                          </div>
                          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-dark mb-4 tracking-[-0.02em]">
                            {service.title}
                          </h2>
                          <p className="text-text-dark/60 leading-relaxed mb-6">
                            {service.description}
                          </p>
                          <Link
                            href="/get-a-quote"
                            className="btn-text-link group"
                          >
                            {service.learnMoreLabel}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Dark section
        return (
          <section key={`detail-${service.title}`} className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="container-max">
              <AnimatedSection>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
                  <div className="flex-1 w-full">
                    <PlaceholderImage
                      label={service.image}
                      className="rounded-lg"
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      <service.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                      {service.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link
                      href="/get-a-quote"
                      className="btn-text-link group"
                    >
                      {service.learnMoreLabel}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <CTASection
        heading="Get Your Product"
        highlight="Started."
        description="Ready to put our complimentary engineering services to work on your next project? Send us your details and receive a detailed wholesale quote within 48 hours."
      />
    </>
  );
}
