import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadProductConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadProductConfig("products");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function ProductsPage() {
  const config = loadProductConfig("products");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as { badge?: string; h1: string; h1Highlight?: string; subtitle: string; ctas: { label: string; href: string; variant: string }[] };
  const statsBlock = getBlock("stats_strip");
  const statsData = statsBlock?.data as { items: { icon: string; label: string }[] };
  const productTypesBlock = getBlock("product_types");
  const productTypesData = productTypesBlock?.data as { heading: string; items: { name: string; description: string; href?: string; image?: string }[] };
  const ctaBlock = getBlock("cta");
  const ctaData = ctaBlock?.data as { heading: string; headingHighlight?: string; description: string };

  const productCategories = (productTypesData?.items || []).map((item) => ({
    name: item.name,
    description: item.description,
    href: item.href || "#",
    image: item.name === "Channel Letters" ? "Channel letters product category — illuminated storefront sign" : `${item.name} — dimensional signage`,
    imageSrc: item.image,
    featured: item.name === "Channel Letters",
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sunlite Signs Wholesale Products",
    description:
      "Wholesale sign products for trade accounts including channel letters, flat cut letters, blade signs, lightboxes, and custom fabrication. Trade pricing only.",
    itemListElement: productCategories.map((cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cat.name,
      url: `https://sunlitesigns.com${cat.href}`,
    })),
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
      {heroBlock?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36 px-6 sm:px-10 lg:px-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products" },
            ]}
          />
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="micro-label mb-6">
                {heroData.badge}
              </p>
              <div className="gold-line mb-8" />
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                {heroData.h1}{" "}
                <span className="text-brand-gold">{heroData.h1Highlight}</span>
              </h1>
              {heroData.subtitle.split("\n\n").map((para, i) => (
                <p key={i} className={i === 0 ? "text-lg text-white/60 max-w-2xl mb-4" : "text-white/60 mb-8"}>
                  {para}
                </p>
              ))}
              <div className="flex flex-wrap gap-6">
                {statsBlock?.visible && statsData?.items.map((point) => {
                  const Icon = getIconComponent(point.icon);
                  return (
                    <span
                      key={point.label}
                      className="flex items-center gap-2 text-sm text-white/50 font-heading uppercase tracking-wider"
                    >
                      {Icon && <Icon className="w-4 h-4 text-brand-gold" />}
                      {point.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FEATURED: Channel Letters
          ═══════════════════════════════════════════ */}
      {productTypesBlock?.visible && (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          {productCategories
            .filter((c) => c.featured)
            .map((cat) => (
              <AnimatedSection key={cat.name}>
                <Link href={cat.href} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400">
                    {cat.imageSrc ? (
                      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                        <Image
                          src={cat.imageSrc}
                          alt={cat.image}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage
                        label={cat.image}
                        className="rounded-none border-0 lg:min-h-[400px]"
                        aspectRatio="aspect-[4/3] lg:aspect-auto"
                      />
                    )}
                    <div className="p-8 lg:p-12 lg:pr-16">
                      <p className="micro-label mb-4">
                        Flagship Product Line — Wholesale Direct
                      </p>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-[1.1] mt-3 mb-4 group-hover:text-brand-gold transition-colors tracking-[-0.02em]">
                        Wholesale {cat.name}
                      </h2>
                      <p className="text-white/60 leading-relaxed mb-6">
                        {cat.description}
                      </p>
                      <span className="btn-primary">
                        Explore Channel Letters
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          MORE PRODUCT LINES — Light section
          ═══════════════════════════════════════════ */}
      {productTypesBlock?.visible && (
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark mb-5 leading-[1.05] tracking-[-0.02em]">
                  More Wholesale <span className="text-brand-gold">Product Lines</span>
                </h2>
                <p className="text-text-dark/60 max-w-xl mx-auto text-[15px]">
                  Beyond channel letters, we manufacture a full range of premium
                  signage solutions — all available exclusively at trade pricing
                  for sign shops.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productCategories
                .filter((c) => !c.featured)
                .map((cat, index) => (
                  <AnimatedSection key={cat.name} delay={index * 0.1}>
                    <Link href={cat.href} className="group block h-full">
                      <div className="bg-white border border-black/[0.04] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-400 h-full flex flex-col">
                        {cat.imageSrc ? (
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={cat.imageSrc}
                              alt={cat.image}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <PlaceholderImage
                            label={cat.image}
                            className="rounded-none border-0"
                            aspectRatio="aspect-[16/10]"
                          />
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-heading font-bold text-text-dark group-hover:text-brand-gold transition-colors mb-3">
                            Wholesale {cat.name}
                          </h3>
                          <p className="text-text-dark/60 text-sm leading-relaxed mb-4 flex-1">
                            {cat.description}
                          </p>
                          <span className="btn-text-link group/link">
                            Get Wholesale Pricing
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
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
          CTA
          ═══════════════════════════════════════════ */}
      {ctaBlock?.visible && (
        <CTASection
          heading={ctaData.heading}
          highlight={ctaData.headingHighlight}
          description={ctaData.description}
        />
      )}
    </>
  );
}
