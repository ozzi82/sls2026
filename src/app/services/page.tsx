import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Layers,
  HardHat,
  Zap,
  Factory,
  Phone,
  Mail,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

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

      {/* Hero Section */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-navy/20 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />

        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services" },
            ]}
          />
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                  Wholesale Only
                </span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                Complimentary Engineering{" "}
                <span className="text-brand-gold">Services</span>
              </h1>
              <p className="text-lg text-text-light/70 max-w-2xl leading-relaxed">
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

      {/* Service Sections — Alternating Layout and Background */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? "bg-light-bg" : "bg-primary-dark";
        const titleColor = isEven ? "text-text-dark" : "text-text-light";
        const descColor = isEven ? "text-text-dark/70" : "text-text-light/60";

        return (
          <section key={service.title} className={`section-padding ${bgClass}`}>
            <div className="container-max">
              <AnimatedSection>
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-16`}
                >
                  <div className="flex-1 w-full">
                    <PlaceholderImage
                      label={service.image}
                      className="rounded-xl"
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      <service.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h2
                      className={`text-2xl md:text-3xl font-heading font-bold ${titleColor} mb-4`}
                    >
                      {service.title}
                    </h2>
                    <p className={`${descColor} leading-relaxed mb-6`}>
                      {service.description}
                    </p>
                    <Link
                      href="/get-a-quote"
                      className="inline-flex items-center gap-2 text-brand-gold font-heading font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all"
                    >
                      {service.learnMoreLabel}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                  Trade Accounts Only
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Get Your Product Started
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to put our complimentary engineering services to work on
                your next project? Send us your details and receive a detailed
                wholesale quote within 48 hours. No obligation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                  href="/get-a-quote"
                  className="btn-primary text-base px-10 py-5"
                >
                  Get Your Product Started
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary text-base px-10 py-5"
                >
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-light/50">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (123) 456-7890
                </a>
                <a
                  href="mailto:hello@sunlitesigns.com"
                  className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@sunlitesigns.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom spacer for mobile CTA bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
