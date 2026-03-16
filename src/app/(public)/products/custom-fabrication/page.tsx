import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getIconComponent } from "@/lib/admin/icon-map";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadProductConfig("custom-fabrication");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function CustomFabricationPage() {
  const config = loadProductConfig("custom-fabrication");

  function getBlock(id: string) {
    return config.blocks.find((b) => b.id === id);
  }
  const spokes = getLandingPagesByHub("custom-fabrication").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

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

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as any;
  const featuresBlock = getBlock("features");
  const featuresData = featuresBlock?.data as any;
  const processBlock = getBlock("process");
  const processData = processBlock?.data as any;
  const useCasesBlock = getBlock("use-cases");
  const useCasesData = useCasesBlock?.data as any;
  const galleryBlock = getBlock("gallery");
  const galleryData = galleryBlock?.data as any;
  const textWhyBlock = getBlock("text-why-sunlite");
  const textWhyData = textWhyBlock?.data as any;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      {heroBlock?.visible && (
        <section className="relative bg-bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
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
                    <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
                  </div>
                  <div className="gold-line mb-6" />
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                    {heroData.h1}{" "}
                    <span className="text-brand-gold">{heroData.h1Highlight}</span>
                  </h1>
                  <p className="text-lg text-white/70 mb-4 leading-relaxed">
                    {heroData.subtitle}
                  </p>
                  <p className="text-white/50 mb-8">
                    If you can design it, we can engineer it, build it, and ship
                    it. Wholesale direct to sign shops. USA and Canada. We never sell retail — we never compete with you.
                  </p>
                  {heroData.ctas.map((cta: any) => (
                    <Link key={cta.label} href={cta.href} className="btn-primary">
                      {cta.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  ))}
                </div>
                <PlaceholderImage
                  label={heroData.image}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {featuresBlock?.visible && (
        <section className="section-padding bg-bg-light">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  {featuresData.heading}
                </h2>
                <p className="text-text-dark/60 max-w-2xl mx-auto">
                  Our fabrication shop is equipped to handle projects that other
                  wholesale manufacturers decline. Complexity is where we excel. All custom work available exclusively at trade pricing.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.items.map((item: any, index: number) => {
                const Icon = getIconComponent(item.icon);
                return (
                  <AnimatedSection key={item.title} delay={index * 0.08}>
                    <div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full">
                      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-dark/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processBlock?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  {processData.heading}
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                  A structured process that takes your concept from idea to
                  installed reality. Clear communication and approval gates at
                  every stage. Trade pricing throughout.
                </p>
              </div>
            </AnimatedSection>
            <div className="max-w-3xl mx-auto">
              {processData.steps.map((step: any, index: number) => (
                <AnimatedSection key={step.step} delay={index * 0.1}>
                  <div
                    className={`flex gap-6 ${
                      index < processData.steps.length - 1
                        ? "pb-10 border-l-2 border-brand-gold/20 ml-6"
                        : "ml-6"
                    }`}
                  >
                    <div className="flex-shrink-0 -ml-[27px] w-12 h-12 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center">
                      <span className="text-brand-gold font-heading font-bold text-sm">
                        {String(step.step).padStart(2, "0")}
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
      )}

      {/* Project Types */}
      {useCasesBlock?.visible && (
        <section className="section-padding bg-bg-navy">
          <div className="container-max">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="gold-line mb-6" />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                    {useCasesData.heading}
                  </h2>
                  <p className="text-white/60 mb-8">
                    {useCasesData.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {useCasesData.items.map((type: string) => (
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
      )}

      {/* Gallery */}
      {galleryBlock?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  {galleryData.heading}
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                  A selection of custom projects that showcase the range and
                  capability of our fabrication team.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryData.images.map((image: any, i: number) => (
                  <PlaceholderImage
                    key={i}
                    label={image.alt}
                    className="rounded-xl"
                    aspectRatio="aspect-[4/3]"
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Why Sunlite for Custom */}
      {textWhyBlock?.visible && (
        <section className="section-padding bg-bg-light">
          <div className="container-max">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <PlaceholderImage
                  label={textWhyData.image}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
                <div>
                  <div className="gold-line mb-6" />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                    {textWhyData.heading}
                  </h2>
                  <p className="text-text-dark/60 mb-6 leading-relaxed">
                    {textWhyData.content}
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
      )}


      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection />
    </>
  );
}
