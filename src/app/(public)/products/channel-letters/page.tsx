import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import RelatedPages from "@/components/RelatedPages";
import { getLandingPagesByHub } from "@/lib/landing-pages";
import ProductImageHover from "@/components/ProductImageHover";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import SafeHtml from "@/components/SafeHtml";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadProductConfig("channel-letters", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/products/channel-letters"),
  };
}

export default async function ChannelLettersPage() {
  const locale = await getLocale();
  const config = await loadProductConfig("channel-letters", locale);
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as { badge?: string; h1: string; h1Highlight?: string; subtitle: string; image?: string; ctas: { label: string; href: string; variant: string }[] };
  const featuresBlock = getBlock("features_grid");
  const featuresData = featuresBlock?.data as { heading: string; items: { icon: string; title: string; description: string }[] };

  // Product grid blocks
  const productGridBlock = getBlock("product_grid");
  const productGridData = productGridBlock?.data as { heading: string; description?: string; items: { name: string; model?: string; image?: string; href?: string }[] };
  const productGrid2Block = getBlock("product_grid_2");
  const productGrid2Data = productGrid2Block?.data as { heading: string; description?: string; items: { name: string; model?: string; image?: string; href?: string }[] };
  const productGrid3Block = getBlock("product_grid_3");
  const productGrid3Data = productGrid3Block?.data as { heading: string; description?: string; items: { name: string; model?: string; image?: string; href?: string }[] };
  const productGrid4Block = getBlock("product_grid_4");
  const productGrid4Data = productGrid4Block?.data as { heading: string; description?: string; items: { name: string; model?: string; image?: string; href?: string }[] };

  const productFamilyBlocks = [
    { block: productGridBlock, data: productGridData },
    { block: productGrid2Block, data: productGrid2Data },
    { block: productGrid3Block, data: productGrid3Data },
    { block: productGrid4Block, data: productGrid4Data },
  ];
  const productFamilies = productFamilyBlocks
    .filter(f => f.block?.visible && f.data)
    .map(f => ({
      ...f.data!,
      products: f.data!.items.map(p => ({ ...p, slug: p.href?.split("/").pop() || "", dayImg: p.image || "" })),
    }));
  const spokes = getLandingPagesByHub("channel-letters").slice(0, 6);
  const relatedArticles = spokes.map((p) => ({
    title: p.h1 + " " + p.h1Highlight,
    description: p.heroSubtitle,
    href: `/signs/${p.slug}`,
  }));

  const allProducts = productFamilies.flatMap((f) => f.products);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wholesale EdgeLuxe Channel Letters by Sunlite Signs",
    description:
      "Complete EdgeLuxe product line: 12 wholesale channel letter styles across 4 product families. Block Acrylic, Trimless, Fabricated Stainless Steel, and Flat Cut. Sign shops only.",
    itemListElement: allProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `EdgeLuxe ${product.model} — ${product.name}`,
      url: `https://sunlitesigns.com/products/channel-letters/${product.slug}`,
    })),
  };

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
              { name: "Channel Letters" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  {(() => { const LockIcon = getIconComponent("Lock"); return LockIcon ? <LockIcon className="w-3.5 h-3.5 text-brand-gold" /> : null; })()}
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest"><SafeHtml html={heroData.badge} /></span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                  <SafeHtml html={heroData.h1} />{" "}
                  <span className="text-brand-gold"><SafeHtml html={heroData.h1Highlight} /></span>
                </h1>
                {heroData.subtitle.split("\n\n").map((para, i) => (
                  <p key={i} className={i === 0 ? "text-lg text-white/70 mb-4 leading-relaxed" : "text-white/50 mb-8"}>
                    <SafeHtml html={para} />
                  </p>
                ))}
                <div className="flex flex-col sm:flex-row gap-4">
                  {heroData.ctas.map((cta) => (
                    <LocaleLink locale={locale} key={cta.label} href={cta.href} className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}>
                      <SafeHtml html={cta.label} />
                      {cta.variant === "primary" && <ArrowRight className="w-4 h-4 ml-2" />}
                    </LocaleLink>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                {heroData.image && (
                  <Image
                    src={heroData.image}
                    alt="Channel letters — multiple illumination styles showcase"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Advantages Bar */}
      {featuresBlock?.visible && (
      <section className="bg-bg-bg-navy/80 border-y border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresData.items.map((adv, index) => {
              const Icon = getIconComponent(adv.icon);
              return (
                <AnimatedSection key={adv.title} delay={index * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white mb-1">
                        <SafeHtml html={adv.title} />
                      </h3>
                      <p className="text-sm text-white/50"><SafeHtml html={adv.description} /></p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Product Families */}
      {productFamilies.map((family, familyIndex) => (
        <section
          key={family.heading}
          className={`section-padding ${familyIndex % 2 === 0 ? "bg-bg-light" : "bg-bg-primary"}`}
        >
          <div className="container-max">
            <AnimatedSection>
              <div className="mb-12">
                <div className="gold-line mb-6" />
                <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-4 ${familyIndex % 2 === 0 ? "text-text-dark" : "text-white"}`}>
                  <SafeHtml html={family.heading} />
                </h2>
                <p className={`max-w-2xl ${familyIndex % 2 === 0 ? "text-text-dark/60" : "text-white/60"}`}>
                  <SafeHtml html={family.description} />
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {family.products.map((product, productIndex) => (
                <AnimatedSection key={product.slug} delay={productIndex * 0.05}>
                  <LocaleLink locale={locale}
                    href={`/products/channel-letters/${product.slug}`}
                    className="group block h-full"
                  >
                    <div className={`rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${
                      familyIndex % 2 === 0
                        ? "bg-white border border-black/[0.04] hover:border-brand-gold/30"
                        : "bg-bg-card border border-white/[0.06] hover:border-brand-gold/30"
                    }`}>
                      <ProductImageHover
                        daySrc={product.dayImg}
                        alt={`${product.name} — EdgeLuxe ${product.model}`}
                      />
                      <div className="p-5">
                        <span className={`text-xs font-heading font-semibold uppercase tracking-widest ${
                          familyIndex % 2 === 0 ? "text-text-dark/40" : "text-white/40"
                        }`}>
                          {product.model}
                        </span>
                        <h3 className={`text-lg font-heading font-bold mt-1 mb-2 group-hover:text-brand-gold transition-colors ${
                          familyIndex % 2 === 0 ? "text-text-dark" : "text-white"
                        }`}>
                          {product.name}
                        </h3>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </LocaleLink>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ))}


      {relatedArticles.length > 0 && <RelatedPages pages={relatedArticles} heading="Learn More" />}
      <CTASection locale={locale} />
    </>
  );
}
