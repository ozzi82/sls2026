import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadStaticPageConfig("services");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default async function ServicesPage() {
  const config = await loadStaticPageConfig("services");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const hero = getBlock("hero");
  const servicesGrid = getBlock("services-grid");
  const cta = getBlock("cta");
  const services = servicesGrid ? (servicesGrid.data as any).items : [];

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
      itemListElement: services.map((service: any, index: number) => ({
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
      {hero?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />

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
                {(hero.data as any).badge}
              </p>
              <div className="gold-line mb-8" />
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                {(hero.data as any).h1}{" "}
                <span className="text-brand-gold">{(hero.data as any).h1Highlight}</span>
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                {(hero.data as any).subtitle}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          SERVICE CARDS — 4-card grid
          ═══════════════════════════════════════════ */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {servicesGrid?.visible && (
      <>
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Our <span className="text-brand-gold">{(servicesGrid.data as any).headingHighlight}</span>
              </h2>
              <p className="text-white/60 max-w-md mx-auto text-[15px]">
                {(servicesGrid.data as any).description}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service: any, index: number) => {
              const Icon = getIconComponent(service.icon);
              return (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 lg:p-10 h-full hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ALTERNATING DETAIL SECTIONS
          ═══════════════════════════════════════════ */}
      {services.map((service: any, index: number) => {
        const isEven = index % 2 === 0;
        const Icon = getIconComponent(service.icon);

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
                            {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
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
                      {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
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
      </>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      {cta?.visible && (
      <CTASection
        heading={(cta.data as any).heading}
        highlight={(cta.data as any).headingHighlight}
        description={(cta.data as any).description}
      />
      )}
    </>
  );
}
