import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getIconComponent } from "@/lib/admin/icon-map";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadProductConfig("logo-boxes");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default async function LogoBoxesPage() {
  const config = await loadProductConfig("logo-boxes");

  function getBlock(id: string) {
    return config.blocks.find((b) => b.id === id);
  }
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

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as any;
  const featuresBlock = getBlock("features");
  const featuresData = featuresBlock?.data as any;
  const processBlock = getBlock("process");
  const processData = processBlock?.data as any;
  const textOverviewBlock = getBlock("text-overview");
  const textOverviewData = textOverviewBlock?.data as any;
  const specsBlock = getBlock("specs");
  const specsData = specsBlock?.data as any;
  const useCasesBlock = getBlock("use-cases");
  const useCasesData = useCasesBlock?.data as any;
  const ctaBlock = getBlock("cta");
  const ctaData = ctaBlock?.data as any;

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
                    {heroData.badge}
                  </p>
                  <div className="gold-line mb-8" />
                  <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                    {heroData.h1}{" "}
                    <span className="text-brand-gold">{heroData.h1Highlight}</span>
                  </h1>
                  <p className="text-lg text-white/60 mb-4 leading-relaxed">
                    {heroData.subtitle}
                  </p>
                  <p className="text-white/60 mb-8">
                    German-engineered. UL 48 listed. 3-week delivery. Wholesale
                    direct to sign shops across the USA and Canada. We never sell retail — your clients stay yours.
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

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* Features — Dark card grid */}
      {featuresBlock?.visible && (
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
              {featuresData.items.map((feature: any, index: number) => {
                const Icon = getIconComponent(feature.icon);
                return (
                  <AnimatedSection key={feature.title} delay={index * 0.08}>
                    <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* How Logo Boxes Are Made — Light section */}
      {processBlock?.visible && (
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
                {processData.steps.map((item: any, index: number) => (
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
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* Product Overview */}
      {textOverviewBlock?.visible && specsBlock?.visible && (
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
                  label={textOverviewData.image}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
                  {specsData.specs.map((spec: any, index: number) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between items-start px-6 py-4 ${
                        index < specsData.specs.length - 1 ? "border-b border-white/[0.04]" : ""
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
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* Applications — Light section */}
      {useCasesBlock?.visible && (
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
                      {useCasesData.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {useCasesData.items.map((useCase: string) => (
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
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* CTA */}
      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection
        heading={ctaData.heading}
        highlight={ctaData.headingHighlight}
        description={ctaData.description}
      />
    </>
  );
}
