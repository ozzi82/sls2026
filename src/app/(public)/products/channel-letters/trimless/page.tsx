import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  X,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadProductConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadProductConfig("channel-letters--trimless", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    openGraph: {
      title: config.seo.ogTitle || config.seo.title,
      description: config.seo.ogDescription || config.seo.metaDescription,
      type: "website",
    },
    alternates: getAlternates("/products/channel-letters/trimless"),
  };
}

const comparisonRows = [
  { feature: "Visible trim cap", traditional: "Yes — plastic trim cap visible around face perimeter", edgeLuxe: "None — clean, flush face-to-return joint" },
  { feature: "Face attachment", traditional: "Snap-in trim cap retainer", edgeLuxe: "Proprietary precision-fit aluminum channel" },
  { feature: "Visual profile", traditional: "Raised trim line around every letter", edgeLuxe: "Seamless, flush perimeter on all surfaces" },
  { feature: "Architectural appeal", traditional: "Standard commercial appearance", edgeLuxe: "Modern, high-end architectural aesthetic" },
  { feature: "Manufacturing tolerance", traditional: "Standard industry tolerances", edgeLuxe: "Tighter tolerances for flush fit" },
  { feature: "UL listing", traditional: "UL listed", edgeLuxe: "UL listed" },
  { feature: "Durability", traditional: "Trim cap can yellow, crack, or detach over time", edgeLuxe: "All-aluminum construction — no plastic to degrade" },
  { feature: "Price point", traditional: "Lower", edgeLuxe: "Moderate premium for superior construction" },
];

export default async function TrimlessPage() {
  const locale = await getLocale();
  const config = await loadProductConfig("channel-letters--trimless", locale);
  function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

  const heroBlock = getBlock("hero");
  const heroData = heroBlock?.data as { badge?: string; h1: string; h1Highlight?: string; subtitle: string; image?: string; ctas: { label: string; href: string; variant: string }[] };
  const textBlock = getBlock("text_section");
  const textData = textBlock?.data as { heading: string; content: string; image?: string };
  const featuresBlock = getBlock("features_grid");
  const featuresData = featuresBlock?.data as { heading: string; items: { icon: string; title: string; description: string }[] };
  const specsBlock = getBlock("specs");
  const specsData = specsBlock?.data as { heading: string; description?: string; image?: string };
  const useCasesBlock = getBlock("use_cases");
  const useCasesData = useCasesBlock?.data as { heading: string; description?: string; items: string[] };
  const galleryBlock = getBlock("gallery");
  const galleryData = galleryBlock?.data as { heading: string; images: { src: string; alt: string }[] };
  const faqBlock = getBlock("faq");
  const faqData = faqBlock?.data as { heading: string; items: { question: string; answer: string }[] };
  const product = getProduct("LP 5");

  const faqJsonLd = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale EdgeLuxe Trimless Channel Letters",
    description:
      "Wholesale trimless channel letters with no visible trim cap. Seamless aluminum construction, German-engineered precision, UL listed. Available in face lit, halo lit, and combination configurations. Trade pricing for sign shops only.",
    brand: { "@type": "Brand", name: "Sunlite Signs — EdgeLuxe" },
    manufacturer: { "@type": "Organization", name: "Sunlite Signs LLC" },
    category: "Channel Letters",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Construction", value: "Trimless — no visible trim cap" },
      { "@type": "PropertyValue", name: "Certification", value: "UL Listed (UL 48)" },
      { "@type": "PropertyValue", name: "Engineering Heritage", value: "German-engineered in partnership with LKF Lichtwerbung, Nuremberg" },
    ],
    offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", description: "Wholesale trade pricing available upon request — sign shops only" } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {/* Hero */}
      {heroBlock?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.1),transparent_50%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Products", href: "/products" }, { name: "Channel Letters", href: "/products/channel-letters" }, { name: "EdgeLuxe Trimless" }]} />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  {(() => { const LockIcon = getIconComponent("Lock"); return LockIcon ? <LockIcon className="w-3.5 h-3.5 text-brand-gold" /> : null; })()}
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
                </div>
                <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-4 py-1.5 rounded-full mb-6">
                  Flagship Innovation
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                  {heroData.h1}{" "}<span className="text-brand-gold">{heroData.h1Highlight}</span>{" "}Channel Letters
                </h1>
                {heroData.subtitle.split("\n\n").map((para, i) => (
                  <p key={i} className={i === 0 ? "text-xl text-white/70 mb-4 leading-relaxed" : "text-white/50 mb-8"}>{para}</p>
                ))}
                <div className="flex flex-col sm:flex-row gap-4">
                  {heroData.ctas.map((cta) => (
                    <LocaleLink locale={locale} key={cta.label} href={cta.href} className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}>
                      {cta.label}
                      {cta.variant === "primary" && <ArrowRight className="w-4 h-4 ml-2" />}
                    </LocaleLink>
                  ))}
                </div>
              </div>
              <div className="relative">
                <BeforeAfterSlider daySrc="/products/trimless-day.jpg" nightSrc="/products/trimless-night.jpg" alt="EdgeLuxe trimless channel letters — seamless face-to-return joint, no trim cap" />
                <div className="absolute -bottom-4 -right-4 bg-brand-gold text-bg-primary px-6 py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider shadow-lg">
                  Zero Trim Cap
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* The Problem with Trim Caps */}
      {textBlock?.visible && (
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">{textData.heading}</h2>
                {textData.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/60 mb-6 leading-relaxed">{para}</p>
                ))}
                <ul className="space-y-4">
                  {[
                    "Plastic trim caps yellow and crack over time in UV exposure",
                    "The visible trim line interrupts the clean geometry of every letter",
                    "Architects increasingly reject trim caps in design specifications",
                    "Color-matching trim caps to letter finishes is imprecise at best",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/70">
                      <X className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <PlaceholderImage label={textData.image || ""} className="rounded-xl" aspectRatio="aspect-video" />
                <p className="text-center text-xs text-white/40 font-heading uppercase tracking-wider">Traditional trim cap construction (competitor reference)</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Key Differentiators */}
      {featuresBlock?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{featuresData.heading}</h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">Six reasons why sign shops and their clients are choosing EdgeLuxe trimless channel letters for their most important projects. Available exclusively at trade pricing.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.items.map((item, index) => {
              const Icon = getIconComponent(item.icon);
              return (
                <AnimatedSection key={item.title} delay={index * 0.08}>
                  <div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full">
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">{Icon && <Icon className="w-6 h-6 text-brand-gold" />}</div>
                    <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-text-dark/60 leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Side-by-Side Comparison */}
      <section id="comparison" className="section-padding bg-bg-primary scroll-mt-20">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">EdgeLuxe vs. Traditional Trim Cap</h2>
              <p className="text-white/60 max-w-2xl mx-auto">A direct comparison of trimless EdgeLuxe construction against traditional channel letters with plastic trim caps.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="text-center">
                <PlaceholderImage label="Traditional channel letter with trim cap — visible plastic retainer strip around letter perimeter" className="rounded-xl mb-4" aspectRatio="aspect-[4/3]" />
                <h3 className="font-heading font-semibold text-white/60">Traditional with Trim Cap</h3>
              </div>
              <div className="text-center">
                <PlaceholderImage label="EdgeLuxe trimless channel letter — seamless face-to-return, no visible trim cap" className="rounded-xl mb-4 ring-2 ring-brand-gold/30" aspectRatio="aspect-[4/3]" />
                <h3 className="font-heading font-semibold text-brand-gold">EdgeLuxe Trimless</h3>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
                <div className="px-6 py-4 font-heading font-semibold text-sm text-white/50 uppercase tracking-wider">Feature</div>
                <div className="px-6 py-4 font-heading font-semibold text-sm text-white/50 uppercase tracking-wider">Traditional</div>
                <div className="px-6 py-4 font-heading font-semibold text-sm text-brand-gold uppercase tracking-wider">EdgeLuxe</div>
              </div>
              {comparisonRows.map((row, index) => (
                <div key={row.feature} className={`grid grid-cols-3 ${index < comparisonRows.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                  <div className="px-6 py-4 text-sm font-heading text-white/70">{row.feature}</div>
                  <div className="px-6 py-4 text-sm text-white/50">{row.traditional}</div>
                  <div className="px-6 py-4 text-sm text-white font-medium">{row.edgeLuxe}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technical Specifications */}
      {specsBlock?.visible && (
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{specsData.heading}</h2>
              <p className="text-white/60 mb-8">{specsData.description}</p>
              <PlaceholderImage label={specsData.image || ""} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
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
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{useCasesData.heading}</h2>
                <p className="text-text-dark/60 mb-8">{useCasesData.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCasesData.items.map((useCase) => (
                    <li key={useCase} className="flex items-center gap-2 text-sm text-text-dark/70"><CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />{useCase}</li>
                  ))}
                </ul>
              </div>
              <PlaceholderImage label="EdgeLuxe trimless letters — Class A office building, modern facade" className="rounded-xl" aspectRatio="aspect-[4/3]" />
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
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{galleryData.heading}</h2>
              <p className="text-white/60 max-w-xl mx-auto">See the trimless difference installed. No trim caps. Clean lines. Pure brand expression.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryData.images.map((img, i) => (<PlaceholderImage key={i} label={img.alt} className="rounded-xl" aspectRatio="aspect-[4/3]" />))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Testimonial */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-brand-gold text-6xl font-heading mb-6">&ldquo;</div>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">The EdgeLuxe trimless letters are the cleanest channel letters we have ever installed. Our architects are specifying them on every new project.</p>
              <div>
                <p className="font-heading font-semibold text-white">[Sign Shop Partner]</p>
                <p className="text-sm text-white/50">[City, State]</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      {faqBlock?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{faqData.heading}</h2>
              <p className="text-text-dark/60 mb-8">Common questions about EdgeLuxe trimless channel letters, answered for sign shop professionals and trade buyers.</p>
              <div className="space-y-4">
                {faqData.items.map((faq, index) => (
                  <AnimatedSection key={index} delay={Math.min(index * 0.05, 0.3)}>
                    <details className="group bg-white border border-black/[0.04] rounded-xl overflow-hidden hover:border-brand-gold/20 transition-colors">
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base md:text-lg font-heading font-semibold text-text-dark group-hover:text-brand-gold transition-colors pr-4">{faq.question}</h3>
                        <ChevronDown className="w-5 h-5 text-brand-gold flex-shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-black/5 pt-4">
                          <p className="text-text-dark/60 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </details>
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-8">
                <LocaleLink locale={locale} href="/resources/guides/trimless-channel-letters-guide" className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
                  Read the Full Trimless Guide <ArrowRight className="w-4 h-4" />
                </LocaleLink>
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
