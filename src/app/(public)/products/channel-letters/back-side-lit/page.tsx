import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";
import { getIconComponent } from "@/lib/admin/icon-map";
import configData from "../../../../../content/products/channel-letters--back-side-lit.json";
import { PageConfig } from "@/lib/admin/page-config-types";

const config = configData as unknown as PageConfig;
function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

const heroBlock = getBlock("hero")!;
const heroData = heroBlock.data as { badge?: string; h1: string; h1Highlight?: string; subtitle: string; image?: string; ctas: { label: string; href: string; variant: string }[] };
const featuresBlock = getBlock("features_grid")!;
const featuresData = featuresBlock.data as { heading: string; items: { icon: string; title: string; description: string }[] };
const specsBlock = getBlock("specs")!;
const specsData = specsBlock.data as { heading: string; description?: string; image?: string };
const useCasesBlock = getBlock("use_cases")!;
const useCasesData = useCasesBlock.data as { heading: string; description?: string; items: string[] };
const galleryBlock = getBlock("gallery")!;
const galleryData = galleryBlock.data as { heading: string; images: { src: string; alt: string }[] };

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.metaDescription,
  keywords: config.seo.keywords,
  alternates: { canonical: config.seo.canonical },
};

export default function BackSideLitPage() {
  const product = getProduct("LP 11-BS");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Back Side Lit Channel Letters — EdgeLuxe LP 11-BS",
    description: config.seo.metaDescription,
    brand: { "@type": "Brand", name: "Sunlite Signs — EdgeLuxe" },
    manufacturer: { "@type": "Organization", name: "Sunlite Signs LLC" },
    category: "Channel Letters",
    additionalProperty: { "@type": "PropertyValue", name: "model", value: "EdgeLuxe LP 11-BS" },
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", description: "Wholesale trade pricing available upon request — sign shops only" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, { name: "Channel Letters", href: "/products/channel-letters" }, { name: "Back Side Lit" }]} />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  {(() => { const LockIcon = getIconComponent("Lock"); return LockIcon ? <LockIcon className="w-3.5 h-3.5 text-brand-gold" /> : null; })()}
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">{heroData.h1}{" "}<span className="text-brand-gold">{heroData.h1Highlight}</span></h1>
                {heroData.subtitle.split("\n\n").map((para, i) => (<p key={i} className={i === 0 ? "text-lg text-white/70 mb-4 leading-relaxed" : "text-white/50 mb-8"}>{para}</p>))}
                <Link href="/get-a-quote" className="btn-primary">Request Wholesale Pricing<ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
              <BeforeAfterSlider daySrc="/products/back-side-day.jpg" nightSrc="/products/back-side-night.jpg" alt="Back side lit channel letters — flush-mount halo glow, night shot" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection><div className="text-center mb-16"><div className="gold-line mx-auto mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{featuresData.heading}</h2><p className="text-text-dark/60 max-w-xl mx-auto">Every back side lit channel letter set is manufactured with German-engineered precision and IP67 sealed construction. Wholesale direct to your shop.</p></div></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.items.map((feature, index) => { const Icon = getIconComponent(feature.icon); return (
              <AnimatedSection key={feature.title} delay={index * 0.08}><div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full"><div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">{Icon && <Icon className="w-6 h-6 text-brand-gold" />}</div><h3 className="text-lg font-heading font-semibold text-text-dark mb-2">{feature.title}</h3><p className="text-sm text-text-dark/60 leading-relaxed">{feature.description}</p></div></AnimatedSection>
            ); })}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection><div className="gold-line mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{specsData.heading}</h2><p className="text-white/60 mb-8">{specsData.description}</p><PlaceholderImage label={specsData.image || ""} className="rounded-xl" aspectRatio="aspect-[4/3]" /></AnimatedSection>
            <AnimatedSection delay={0.1}><SpecsTable specs={product.specs} modelNumber={product.modelNumber} /></AnimatedSection>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{useCasesData.heading}</h2><p className="text-white/60 mb-8">{useCasesData.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">{useCasesData.items.map((useCase) => (<li key={useCase} className="flex items-center gap-2 text-sm text-white/70"><CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{useCase}</li>))}</ul>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden"><Image src="/products/back-side-day.jpg" alt="Back side lit channel letters — luxury installation, daytime" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection><div className="text-center mb-12"><div className="gold-line mx-auto mb-6" /><h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{galleryData.heading}</h2></div></AnimatedSection>
          <AnimatedSection><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{galleryData.images.map((img, i) => (<PlaceholderImage key={i} label={img.alt} className="rounded-xl" aspectRatio="aspect-[4/3]" />))}</div></AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
