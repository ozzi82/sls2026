import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getIconComponent } from "@/lib/admin/icon-map";
import SafeHtml from "@/components/SafeHtml";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadProductConfig("blade-signs", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/products/blade-signs"),
  };
}

export default async function BladesSignsPage() {
  const locale = await getLocale();
  const config = await loadProductConfig("blade-signs", locale);

  function getBlock(id: string) {
    return config.blocks.find((b) => b.id === id);
  }
  const spokes = getLandingPagesByHub("blade-signs").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Blade Signs",
    description:
      "Wholesale blade signs for storefronts and mixed-use developments. Double-sided projecting signs, illuminated and non-illuminated options. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Blade Signs",
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
  const productTypesBlock = getBlock("product-types");
  const productTypesData = productTypesBlock?.data as any;
  const featuresBlock = getBlock("features");
  const featuresData = featuresBlock?.data as any;
  const specsBlock = getBlock("specs");
  const specsData = specsBlock?.data as any;
  const useCasesBlock = getBlock("use-cases");
  const useCasesData = useCasesBlock?.data as any;
  const galleryBlock = getBlock("gallery");
  const galleryData = galleryBlock?.data as any;

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
            <Breadcrumbs locale={locale}
              items={[
                { name: t(locale, "breadcrumbs.home"), href: "/" },
                { name: "Products", href: "/products" },
                { name: "Blade Signs" },
              ]}
            />
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                    <Lock className="w-3.5 h-3.5 text-brand-gold" />
                    <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest"><SafeHtml html={heroData.badge} /></span>
                  </div>
                  <div className="gold-line mb-6" />
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                    <SafeHtml html={heroData.h1} />{" "}
                    <span className="text-brand-gold"><SafeHtml html={heroData.h1Highlight} /></span>
                  </h1>
                  <p className="text-lg text-white/70 mb-4 leading-relaxed">
                    <SafeHtml html={heroData.subtitle} />
                  </p>
                  <p className="text-white/50 mb-8">
                    Wind load engineered. UL listed (illuminated models). Wholesale
                    direct to sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                  </p>
                  {heroData.ctas.map((cta: any) => (
                    <LocaleLink locale={locale} key={cta.label} href={cta.href} className="btn-primary">
                      <SafeHtml html={cta.label} />
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </LocaleLink>
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

      {/* Blade Sign Types */}
      {productTypesBlock?.visible && (
        <section className="section-padding bg-bg-light">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  <SafeHtml html={productTypesData.heading} />
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto">
                  From fully illuminated cabinets to decorative ornamental
                  designs, we fabricate blade signs for every environment. All available at trade pricing.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productTypesData.items.map((type: any, index: number) => (
                <AnimatedSection key={type.name} delay={index * 0.1}>
                  <div className="bg-white rounded-xl overflow-hidden border border-black/[0.04] h-full">
                    <PlaceholderImage
                      label={type.image}
                      className="rounded-none border-0"
                      aspectRatio="aspect-[16/10]"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
                        <SafeHtml html={type.name} />
                      </h3>
                      <p className="text-sm text-text-dark/60 leading-relaxed">
                        <SafeHtml html={type.description} />
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {featuresBlock?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  <SafeHtml html={featuresData.heading} />
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.items.map((feature: any, index: number) => {
                const Icon = getIconComponent(feature.icon);
                return (
                  <AnimatedSection key={feature.title} delay={index * 0.08}>
                    <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full">
                      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2">
                        <SafeHtml html={feature.title} />
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        <SafeHtml html={feature.description} />
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      {specsBlock?.visible && (
        <section className="section-padding bg-bg-navy">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <AnimatedSection>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  <SafeHtml html={specsData.heading} />
                </h2>
                <p className="text-white/60 mb-8">
                  <SafeHtml html={specsData.description} />
                </p>
                <PlaceholderImage
                  label={specsData.image}
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
                        <SafeHtml html={spec.label} />
                      </span>
                      <span className="text-sm text-white font-medium text-right ml-4">
                        <SafeHtml html={spec.value} />
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {useCasesBlock?.visible && (
        <section className="section-padding bg-bg-light">
          <div className="container-max">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="gold-line mb-6" />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                    <SafeHtml html={useCasesData.heading} />
                  </h2>
                  <p className="text-text-dark/60 mb-8">
                    <SafeHtml html={useCasesData.description} />
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {useCasesData.items.map((useCase: string) => (
                      <li
                        key={useCase}
                        className="flex items-center gap-2 text-sm text-text-dark/70"
                      >
                        <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        <SafeHtml html={useCase} />
                      </li>
                    ))}
                  </ul>
                </div>
                <PlaceholderImage
                  label="Blade signs — row of illuminated blade signs along pedestrian shopping street"
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
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
                  <SafeHtml html={galleryData.heading} />
                </h2>
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


      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection locale={locale} />
    </>
  );
}
