import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";
import { getIconComponent } from "@/lib/admin/icon-map";
import SafeHtml from "@/components/SafeHtml";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadProductConfig("channel-letters--non-illuminated", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/products/channel-letters/non-illuminated"),
  };
}

export default async function NonIlluminatedPage() {
  const locale = await getLocale();
  const config = await loadProductConfig("channel-letters--non-illuminated", locale);
  function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as { badge?: string; h1: string; h1Highlight?: string; subtitle: string; image?: string; ctas: { label: string; href: string; variant: string }[] };
  const featuresBlock = getBlock("features_grid");
  const featuresData = featuresBlock?.data as { heading: string; items: { icon: string; title: string; description: string }[] };
  const textBlock = getBlock("text_section");
  const textData = textBlock?.data as { heading: string; content: string };
  const specsBlock = getBlock("specs");
  const specsData = specsBlock?.data as { heading: string; description?: string; image?: string };
  const useCasesBlock = getBlock("use_cases");
  const useCasesData = useCasesBlock?.data as { heading: string; description?: string; items: string[] };
  const product = getProduct("LP 1");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Non-Illuminated Channel Letters",
    description:
      "Wholesale non-illuminated channel letters for trade accounts. Dimensional aluminum letters without lighting, same precision fabrication as illuminated products. Sign shops only.",
    brand: { "@type": "Brand", name: "Sunlite Signs — EdgeLuxe" },
    additionalProperty: { "@type": "PropertyValue", name: "Model", value: "EdgeLuxe LP 1" },
    manufacturer: { "@type": "Organization", name: "Sunlite Signs LLC" },
    category: "Channel Letters",
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", description: "Wholesale trade pricing available upon request — sign shops only" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      {heroBlock?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,89,12,0.06),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Products", href: "/products" }, { name: "Channel Letters", href: "/products/channel-letters" }, { name: "Non-Illuminated" }]} />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  {(() => { const LockIcon = getIconComponent("Lock"); return LockIcon ? <LockIcon className="w-3.5 h-3.5 text-brand-gold" /> : null; })()}
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest"><SafeHtml html={heroData.badge} /></span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6"><SafeHtml html={heroData.h1} />{" "}<span className="text-brand-gold"><SafeHtml html={heroData.h1Highlight} /></span></h1>
                {heroData.subtitle.split("\n\n").map((para, i) => (<p key={i} className={i === 0 ? "text-lg text-white/70 mb-4 leading-relaxed" : "text-white/50 mb-8"}>{para}</p>))}
                <LocaleLink locale={locale} href="/get-a-quote" className="btn-primary">Request Wholesale Pricing<ArrowRight className="w-4 h-4 ml-2" /></LocaleLink>
              </div>
              <BeforeAfterSlider daySrc="/products/flat-cut-day.jpg" alt="Non-illuminated channel letters — painted aluminum on stone facade, daytime" />
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Features */}
      {featuresBlock?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection><div className="text-center mb-16"><div className="gold-line mx-auto mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4"><SafeHtml html={featuresData.heading} /></h2><p className="text-text-dark/60 max-w-xl mx-auto">The same precision manufacturing that defines our illuminated products, applied to a simpler, more cost-effective format. Wholesale direct to your shop.</p></div></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.items.map((feature, index) => { const Icon = getIconComponent(feature.icon); return (
              <AnimatedSection key={feature.title} delay={index * 0.08}><div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full"><div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">{Icon && <Icon className="w-6 h-6 text-brand-gold" />}</div><h3 className="text-lg font-heading font-semibold text-text-dark mb-2"><SafeHtml html={feature.title} /></h3><p className="text-sm text-text-dark/60 leading-relaxed"><SafeHtml html={feature.description} /></p></div></AnimatedSection>
            ); })}
          </div>
        </div>
      </section>
      )}

      {/* Finish Options */}
      {textBlock?.visible && (
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"><SafeHtml html={textData.heading} /></h2>
                <p className="text-white/60 mb-6 leading-relaxed"><SafeHtml html={textData.content} /></p>
                <ul className="space-y-3">
                  {[
                    "Any Pantone color — automotive-grade urethane paint",
                    "Brushed aluminum — natural or tinted",
                    "Anodized aluminum — gold, bronze, black, clear",
                    "Oxidized copper — natural patina or accelerated",
                    "Rusted Corten steel — weathered industrial look",
                    "Custom powder coat finishes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Non-illuminated finish — painted matte black",
                  "Non-illuminated finish — brushed aluminum",
                  "Non-illuminated finish — oxidized copper patina",
                  "Non-illuminated finish — custom Pantone color",
                ].map((label, i) => (<PlaceholderImage key={i} label={label} className="rounded-xl" aspectRatio="aspect-square" />))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Specifications */}
      {specsBlock?.visible && (
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection><div className="gold-line mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"><SafeHtml html={specsData.heading} /></h2><p className="text-white/60 mb-8"><SafeHtml html={specsData.description} /></p><PlaceholderImage label={specsData.image || ""} className="rounded-xl" aspectRatio="aspect-[4/3]" /></AnimatedSection>
            <AnimatedSection delay={0.1}><SpecsTable specs={product.specs} modelNumber={product.modelNumber} /></AnimatedSection>
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
              <PlaceholderImage label="Non-illuminated channel letters — interior lobby wayfinding installation" className="rounded-xl" aspectRatio="aspect-[4/3]" />
              <div>
                <div className="gold-line mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4"><SafeHtml html={useCasesData.heading} /></h2><p className="text-text-dark/60 mb-8"><SafeHtml html={useCasesData.description} /></p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">{useCasesData.items.map((useCase) => (<li key={useCase} className="flex items-center gap-2 text-sm text-text-dark/70"><CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{useCase}</li>))}</ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      <CTASection locale={locale} />
    </>
  );
}
