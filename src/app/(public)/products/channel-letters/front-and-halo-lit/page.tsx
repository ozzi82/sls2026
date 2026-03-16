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
import { loadProductConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadProductConfig("channel-letters--front-and-halo-lit");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function FrontAndHaloLitPage() {
  const config = loadProductConfig("channel-letters--front-and-halo-lit");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const heroBlock = getBlock("hero")!;
  const heroData = heroBlock.data as { badge?: string; h1: string; h1Highlight?: string; subtitle: string; image?: string; ctas: { label: string; href: string; variant: string }[] };
  const galleryBlock = getBlock("gallery")!;
  const galleryData = galleryBlock.data as { heading: string; images: { src: string; alt: string }[] };
  const featuresBlock = getBlock("features_grid")!;
  const featuresData = featuresBlock.data as { heading: string; items: { icon: string; title: string; description: string }[] };
  const specsBlock = getBlock("specs")!;
  const specsData = specsBlock.data as { heading: string; description?: string; image?: string };
  const useCasesBlock = getBlock("use_cases")!;
  const useCasesData = useCasesBlock.data as { heading: string; description?: string; items: string[] };
  const product = getProduct("LP 11-FB");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale Front & Halo Lit Channel Letters",
    description:
      "Wholesale combination front and halo lit channel letters with dual LED illumination for maximum visual impact. UL listed, German-engineered. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Model",
      value: "EdgeLuxe LP 11-FB",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Channel Letters",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "Front & Halo Lit" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  {(() => { const LockIcon = getIconComponent("Lock"); return LockIcon ? <LockIcon className="w-3.5 h-3.5 text-brand-gold" /> : null; })()}
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  {heroData.h1}{" "}
                  <span className="text-brand-gold">{heroData.h1Highlight}</span>
                </h1>
                {heroData.subtitle.split("\n\n").map((para, i) => (
                  <p key={i} className={i === 0 ? "text-lg text-white/70 mb-4 leading-relaxed" : "text-white/50 mb-8"}>
                    {para}
                  </p>
                ))}
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <BeforeAfterSlider
                daySrc="/products/front-halo-day.jpg"
                nightSrc="/products/front-halo-night.jpg"
                alt="Front and halo lit channel letters — dual illumination effect, night shot"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {galleryData.heading}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Front and halo lit channel letters combine the visibility of
                face illumination with the sophistication of a rear halo glow.
                The result is a sign that commands attention from every angle. Wholesale direct to sign shops.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryData.images.map((img, i) => (
                <div key={i} className="text-center">
                  <div className={`relative aspect-square rounded-xl overflow-hidden mb-4 ${i === 2 ? "ring-2 ring-brand-gold/30" : ""}`}>
                    {img.src ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderImage label={img.alt} className="rounded-none" aspectRatio="aspect-square" />
                    )}
                  </div>
                  <h3 className={`font-heading font-semibold mb-1 ${i === 2 ? "text-brand-gold" : "text-white"}`}>
                    {i === 0 ? "Face Lit Effect" : i === 1 ? "Halo Lit Effect" : "Combined Effect"}
                  </h3>
                  <p className="text-sm text-white/50">
                    {i === 0 ? "Bright face illumination for readability" : i === 1 ? "Elegant backlit glow for ambiance" : "Maximum impact from both effects"}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                {featuresData.heading}
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.items.map((feature, index) => {
              const Icon = getIconComponent(feature.icon);
              return (
                <AnimatedSection key={feature.title} delay={index * 0.08}>
                  <div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full">
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                      {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-dark/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {specsData.heading}
              </h2>
              <p className="text-white/60 mb-8">
                {specsData.description}
              </p>
              <PlaceholderImage
                label={specsData.image || ""}
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <SpecsTable specs={product.specs} modelNumber={product.modelNumber} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Front and halo lit letters — entertainment venue, dramatic nighttime lighting"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  {useCasesData.heading}
                </h2>
                <p className="text-text-dark/60 mb-8">
                  {useCasesData.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCasesData.items.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-text-dark/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      <CTASection />
    </>
  );
}
