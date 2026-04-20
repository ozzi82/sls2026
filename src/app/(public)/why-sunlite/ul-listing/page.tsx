import { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { Shield, AlertTriangle, CheckCircle2, Zap, ClipboardCheck, FileCheck2, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import SafeHtml from "@/components/SafeHtml";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("why-sunlite--ul-listing", locale);
  return { title: config.seo.title, description: config.seo.metaDescription, keywords: config.seo.keywords, alternates: getAlternates("/why-sunlite/ul-listing") };
}

const whatULMeans = [
  "Independent third-party testing by Underwriters Laboratories",
  "Evaluation of electrical safety, fire risk, and shock hazard",
  "Ongoing factory surveillance and follow-up inspections",
  "Compliance with UL 48 (Electric Signs) and related standards",
  "Each sign ships with a UL label traceable to our wholesale facility",
  "Documentation available for your permit applications and inspections",
];

const comparisonPoints = [
  { without: "Risk of permit rejection at installation site", with: "Pre-certified for code compliance in most jurisdictions" },
  { without: "No third-party verification of electrical safety", with: "Independent lab testing of all electrical components" },
  { without: "Full liability exposure on safety questions", with: "Third-party certification reduces your liability exposure" },
  { without: "May not meet franchise or corporate brand requirements", with: "Meets specification requirements of major brands" },
  { without: "No ongoing factory quality surveillance", with: "Regular UL follow-up inspections of our wholesale facility" },
];

export default async function ULListingPage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("why-sunlite--ul-listing", locale);
  function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

  const hero = getBlock("hero");
  const whatUL = getBlock("what-ul-means");
  const ulBenefits = getBlock("ul-benefits");
  const comparison = getBlock("comparison");
  const process = getBlock("compliance-process");

  return (
    <>
      {/* HERO */}
      {hero?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Why Sunlite", href: "/why-sunlite" }, { name: "UL Listing" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest"><SafeHtml html={(hero.data as any).badge} /></span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                <SafeHtml html={(hero.data as any).h1} />{" "}<span className="text-brand-gold"><SafeHtml html={(hero.data as any).h1Highlight} /></span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8"><SafeHtml html={(hero.data as any).subtitle} /></p>
              <div className="flex flex-wrap gap-4">
                {(hero.data as any).ctas.map((cta: any) => (
                  <LocaleLink locale={locale} key={cta.href} href={cta.href} className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}><SafeHtml html={cta.label} /></LocaleLink>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage label={(hero.data as any).image} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* WHAT UL LISTING MEANS */}
      {whatUL?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6"><SafeHtml html={(whatUL.data as any).heading} /></h2>
              <p className="text-text-dark/60 leading-relaxed mb-8"><SafeHtml html={(whatUL.data as any).content} /></p>
              <div className="space-y-4">
                {whatULMeans.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-text-dark/70 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <PlaceholderImage label={(whatUL.data as any).image} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* BENEFITS GRID */}
      {ulBenefits?.visible && (
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"><SafeHtml html={(ulBenefits.data as any).heading} /></h2>
              <p className="text-white/60 max-w-2xl mx-auto"><SafeHtml html={(ulBenefits.data as any).description} /></p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(ulBenefits.data as any).items.map((benefit: any, index: number) => {
              const Icon = getIconComponent(benefit.icon);
              return (
                <AnimatedSection key={benefit.title} delay={index * 0.1}>
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/20 transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      {Icon && <Icon className="w-5 h-5 text-brand-gold" />}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3"><SafeHtml html={benefit.title} /></h3>
                    <p className="text-white/60 leading-relaxed text-sm"><SafeHtml html={benefit.description} /></p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* COMPARISON TABLE */}
      {comparison?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4"><SafeHtml html={(comparison.data as any).heading} /></h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto"><SafeHtml html={(comparison.data as any).content} /></p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white rounded-xl shadow-sm border border-black/[0.04] overflow-hidden">
              <div className="grid grid-cols-2 border-b border-black/5">
                <div className="p-6 bg-red-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent-red" />
                    <span className="font-heading font-semibold text-text-dark text-sm uppercase tracking-wider">Without UL Listing</span>
                  </div>
                </div>
                <div className="p-6 bg-brand-gold/5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-gold" />
                    <span className="font-heading font-semibold text-text-dark text-sm uppercase tracking-wider">With Sunlite Wholesale UL Listing</span>
                  </div>
                </div>
              </div>
              {comparisonPoints.map((point, index) => (
                <div key={index} className={`grid grid-cols-2 ${index < comparisonPoints.length - 1 ? "border-b border-black/5" : ""}`}>
                  <div className="p-6"><p className="text-text-dark/50 text-sm">{point.without}</p></div>
                  <div className="p-6 bg-brand-gold/5"><p className="text-text-dark/80 text-sm font-medium">{point.with}</p></div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* PROCESS OVERVIEW */}
      {process?.visible && (
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <PlaceholderImage label={(process.data as any).image} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6"><SafeHtml html={(process.data as any).heading} /></h2>
              <p className="text-white/60 leading-relaxed mb-6"><SafeHtml html={(process.data as any).content} /></p>
              <div className="space-y-4">
                {[
                  { icon: ClipboardCheck, text: "Component sourcing from UL-recognized suppliers" },
                  { icon: Zap, text: "Electrical assembly following UL 48 requirements" },
                  { icon: Shield, text: "In-line testing at multiple production stages" },
                  { icon: FileCheck2, text: "Final inspection and UL label application" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <p className="text-white/70 text-sm"><SafeHtml html={item.text} /></p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      <CTASection locale={locale} />
    </>
  );
}
