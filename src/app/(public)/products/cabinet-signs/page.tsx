import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getIconComponent } from "@/lib/admin/icon-map";
import SafeHtml from "@/components/SafeHtml";
import type {
  HeroData,
  FeaturesGridData,
  ProductTypesData,
  SpecsTableData,
  UseCasesData,
  GalleryData,
  RelatedPagesData,
  CTAData,
} from "@/lib/admin/page-config-types";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadProductConfig("cabinet-signs", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/products/cabinet-signs"),
  };
}

export default async function CabinetSignsPage() {
  const locale = await getLocale();
  const config = await loadProductConfig("cabinet-signs", locale);

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }
  const spokes = getLandingPagesByHub("cabinet-signs").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Cabinet Signs",
    description:
      "Wholesale cabinet signs for storefronts and commercial applications. Illuminated cabinet signs, push-through letters, and flex-face options. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Cabinet Signs",
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

  const hero = getBlock<HeroData>("hero");
  const productTypes = getBlock<ProductTypesData>("product_types");
  const features = getBlock<FeaturesGridData>("features");
  const specs = getBlock<SpecsTableData>("specs");
  const useCases = getBlock<UseCasesData>("use_cases");
  const gallery = getBlock<GalleryData>("gallery");
  const relatedPages = getBlock<RelatedPagesData>("related_pages");
  const cta = getBlock<CTAData>("cta");

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
            <Breadcrumbs locale={locale}
              items={[
                { name: t(locale, "breadcrumbs.home"), href: "/" },
                { name: "Products", href: "/products" },
                { name: config.label },
              ]}
            />
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="micro-label mb-6">
                    <SafeHtml html={hero.data.badge} />
                  </p>
                  <div className="gold-line mb-8" />
                  <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                    <SafeHtml html={hero.data.h1} />{" "}
                    <span className="text-brand-gold"><SafeHtml html={hero.data.h1Highlight} /></span>
                  </h1>
                  <p className="text-lg text-white/60 mb-4 leading-relaxed">
                    {hero.data.subtitle.split(". UL listed.")[0]}. Available exclusively to trade accounts.
                  </p>
                  <p className="text-white/60 mb-8">
                    UL listed. German-engineered. Wholesale
                    direct to sign shops across the USA and Canada. We never sell retail — your clients stay yours.
                  </p>
                  {hero.data.ctas.map((ctaItem) => (
                    <LocaleLink locale={locale} key={ctaItem.href} href={ctaItem.href} className="btn-primary">
                      {ctaItem.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </LocaleLink>
                  ))}
                </div>
                <PlaceholderImage
                  label={hero.data.image || "Cabinet sign"}
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

      {/* ═══════════════════════════════════════════
          CABINET SIGN TYPES — Light section
          ═══════════════════════════════════════════ */}
      {productTypes?.visible && (
        <section className="mx-6 sm:mx-10 lg:mx-16">
          <div className="bg-bg-light rounded-2xl overflow-hidden">
            <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
              <AnimatedSection>
                <div className="text-center mb-16">
                  <div className="gold-line mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark mb-5 leading-[1.05] tracking-[-0.02em]">
                    Wholesale Cabinet Sign <span className="text-brand-gold">Types</span>
                  </h2>
                  <p className="text-text-dark/60 max-w-xl mx-auto text-[15px]">
                    <SafeHtml html={productTypes.data.description} />
                  </p>
                </div>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productTypes.data.items.map((type, index) => (
                  <AnimatedSection key={type.name} delay={index * 0.1}>
                    <div className="bg-white rounded-xl overflow-hidden border border-black/[0.04] h-full hover:shadow-md hover:-translate-y-1 transition-all duration-400">
                      <PlaceholderImage
                        label={type.image || type.name}
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
          </div>
        </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FEATURES — Dark card grid
          ═══════════════════════════════════════════ */}
      {features?.visible && (
        <section className="px-6 sm:px-10 lg:px-16">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-8" />
                <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                  Trade Specifications & <span className="text-brand-gold">Benefits</span>
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.data.items.map((feature, index) => {
                const IconComponent = getIconComponent(feature.icon);
                return (
                  <AnimatedSection key={feature.title} delay={index * 0.08}>
                    <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                        {IconComponent && <IconComponent className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2">
                        <SafeHtml html={feature.title} />
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
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

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          SPECIFICATIONS — Two-column
          ═══════════════════════════════════════════ */}
      {specs?.visible && (
        <section className="px-6 sm:px-10 lg:px-16">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <AnimatedSection>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                  Trade <span className="text-brand-gold">Specifications</span>
                </h2>
                <p className="text-white/60 mb-8">
                  <SafeHtml html={specs.data.description} />
                </p>
                <PlaceholderImage
                  label={specs.data.image || "Cabinet sign specifications"}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
                  {specs.data.specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between items-start px-6 py-4 ${
                        index < specs.data.specs.length - 1 ? "border-b border-white/[0.04]" : ""
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

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          USE CASES — Light section
          ═══════════════════════════════════════════ */}
      {useCases?.visible && (
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
                      <SafeHtml html={useCases.data.description} />
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {useCases.data.items.map((useCase) => (
                        <li
                          key={useCase}
                          className="flex items-center gap-2 text-sm text-text-dark/60"
                        >
                          <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                          <SafeHtml html={useCase} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <PlaceholderImage
                    label={useCases.data.image || "Cabinet sign applications"}
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

      {/* ═══════════════════════════════════════════
          GALLERY
          ═══════════════════════════════════════════ */}
      {gallery?.visible && (
        <section className="px-6 sm:px-10 lg:px-16">
          <div className="container-max">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="gold-line mx-auto mb-8" />
                <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                  Cabinet Sign <span className="text-brand-gold">Projects</span>
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gallery.data.images.map((img, i) => (
                  <div key={i} className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-400">
                    <PlaceholderImage
                      label={img.alt}
                      className="rounded-none border-0"
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      {relatedPages?.visible && relatedArticles.length > 0 && (
        <RelatedPages pages={relatedArticles} heading={relatedPages.data.heading} />
      )}
      {cta?.visible && (
        <CTASection locale={locale}
          heading={cta.data.heading}
          highlight={cta.data.headingHighlight}
          description={cta.data.description}
        />
      )}
    </>
  );
}
