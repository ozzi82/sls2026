import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle, Lock, Download } from "lucide-react";
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
  const config = await loadProductConfig("seg-light-boxes", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/products/seg-light-boxes"),
  };
}

export default async function SEGLightBoxesPage() {
  const locale = await getLocale();
  const config = await loadProductConfig("seg-light-boxes", locale);

  function getBlock(id: string) {
    return config.blocks.find((b) => b.id === id);
  }
  const spokes = getLandingPagesByHub("seg-light-boxes").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

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

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as any;
  const featuresBlock = getBlock("features");
  const featuresData = featuresBlock?.data as any;
  const textHowBlock = getBlock("text-how-seg-works");
  const textHowData = textHowBlock?.data as any;
  const specsBlock = getBlock("specs");
  const specsData = specsBlock?.data as any;
  const useCasesBlock = getBlock("use-cases");
  const useCasesData = useCasesBlock?.data as any;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      {heroBlock?.visible && (
        <section className="relative bg-bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--hero-glow),transparent_60%)]" />
          <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
            <Breadcrumbs locale={locale}
              items={[
                { name: t(locale, "breadcrumbs.home"), href: "/" },
                { name: "Products", href: "/products" },
                { name: "SEG Light Boxes" },
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
                    <span className="text-brand-gold"><SafeHtml html={heroData.h1Highlight} /></span>{" "}
                    and Prints in 3 Weeks
                  </h1>
                  <p className="text-lg text-white/70 mb-4 leading-relaxed">
                    <SafeHtml html={heroData.subtitle} />
                  </p>
                  <p className="text-white/50 mb-8">
                    UL listed. German-engineered LED layouts. Wholesale direct to
                    sign companies only. Delivered in 3 weeks door to door. We never sell retail — your clients stay yours.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {heroData.ctas.map((cta: any) =>
                      cta.variant === "primary" ? (
                        <LocaleLink locale={locale} key={cta.label} href={cta.href} className="btn-primary">
                          <SafeHtml html={cta.label} />
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </LocaleLink>
                      ) : (
                        <LocaleLink locale={locale}
                          key={cta.label}
                          href={cta.href}
                          className="btn-secondary inline-flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          <SafeHtml html={cta.label} />
                        </LocaleLink>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <PlaceholderImage
                    label={heroData.image}
                    className="rounded-xl"
                    aspectRatio="aspect-[4/3]"
                  />
                  {/* Specs sidebar overlay */}
                  <div className="mt-6 bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-sm font-heading font-semibold text-brand-gold uppercase tracking-widest mb-4">
                      Quick Specs
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-white/40 font-heading">Profile Depth</span>
                        <p className="text-sm text-white font-medium">From 1&quot; to 4&quot;</p>
                      </div>
                      <div>
                        <span className="text-xs text-white/40 font-heading">Frame</span>
                        <p className="text-sm text-white font-medium">Extruded Aluminum</p>
                      </div>
                      <div>
                        <span className="text-xs text-white/40 font-heading">Face</span>
                        <p className="text-sm text-white font-medium">Fabric + Silicone Gasket</p>
                      </div>
                      <div>
                        <span className="text-xs text-white/40 font-heading">Illumination</span>
                        <p className="text-sm text-white font-medium">LED Edge-lit or Backlit</p>
                      </div>
                      <div>
                        <span className="text-xs text-white/40 font-heading">Sizes</span>
                        <p className="text-sm text-white font-medium">Custom — Any Size</p>
                      </div>
                      <div>
                        <span className="text-xs text-white/40 font-heading">Orientation</span>
                        <p className="text-sm text-white font-medium">Single or Double-Sided</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Features / Benefits */}
      {featuresBlock?.visible && (
        <section className="section-padding bg-bg-light">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  <SafeHtml html={featuresData.heading} />
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto">
                  Engineered for visual impact, ease of use, and rapid graphic
                  changes. Built to wholesale standards for sign companies who
                  demand quality and reliability.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.items.map((feature: any, index: number) => {
                const Icon = getIconComponent(feature.icon);
                return (
                  <AnimatedSection key={feature.title} delay={index * 0.08}>
                    <div className="bg-white border border-black/[0.04] rounded-xl p-8 h-full">
                      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                        <SafeHtml html={feature.title} />
                      </h3>
                      <p className="text-sm text-text-dark/60 leading-relaxed">
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

      {/* How SEG Works Spotlight */}
      {textHowBlock?.visible && (
        <section className="section-padding bg-bg-navy">
          <div className="container-max">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <PlaceholderImage
                  label={textHowData.image}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
                <div>
                  <div className="gold-line mb-6" />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                    <SafeHtml html={textHowData.heading} />
                  </h2>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    <SafeHtml html={textHowData.content} />
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
                        className="flex items-start gap-3 text-sm text-white/70"
                      >
                        <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                        <SafeHtml html={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Specifications */}
      {specsBlock?.visible && (
        <section className="section-padding bg-bg-primary">
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

      {/* Applications */}
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
                    {useCasesData.items.map((app: string) => (
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
      )}


      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection locale={locale} />
    </>
  );
}
