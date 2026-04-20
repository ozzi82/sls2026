import { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { CheckCircle2, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("why-sunlite--quality-process", locale);
  return { title: config.seo.title, description: config.seo.metaDescription, keywords: config.seo.keywords, alternates: getAlternates("/why-sunlite/quality-process") };
}

export default async function QualityProcessPage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("why-sunlite--quality-process", locale);
  function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

  const hero = getBlock("hero");
  const metrics = getBlock("quality-metrics");
  const steps = getBlock("process-steps");
  const materials = getBlock("materials");
  const benefits = getBlock("trade-benefits");

  return (
    <>
      {/* HERO */}
      {hero?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Why Sunlite", href: "/why-sunlite" }, { name: "Quality Process" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{(hero.data as any).badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                {(hero.data as any).h1}{" "}<span className="text-brand-gold">{(hero.data as any).h1Highlight}</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">{(hero.data as any).subtitle}</p>
              {(hero.data as any).ctas.map((cta: any) => (
                <LocaleLink locale={locale} key={cta.href} href={cta.href} className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}>{cta.label}</LocaleLink>
              ))}
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage label={(hero.data as any).image} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* QUALITY METRICS BAR */}
      {metrics?.visible && (
      <section className="bg-bg-navy border-t border-white/10 border-b border-b-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(metrics.data as any).items.map((metric: any, index: number) => (
              <AnimatedSection key={metric.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">{metric.sublabel}</div>
                  <div className="text-sm text-white/50 font-heading uppercase tracking-wider">{metric.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* PROCESS STEPS */}
      {steps?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{(steps.data as any).heading}</h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">{(steps.data as any).description}</p>
            </div>
          </AnimatedSection>
          <div className="space-y-16">
            {(steps.data as any).steps.map((step: any, index: number) => {
              const Icon = getIconComponent(step.icon);
              return (
                <AnimatedSection key={step.title}>
                  <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}>
                    <div className="flex-1 w-full">
                      <PlaceholderImage label={step.image} className="rounded-xl" aspectRatio="aspect-[16/10]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                          {Icon && <Icon className="w-5 h-5 text-brand-gold" />}
                        </div>
                        <span className="text-brand-gold font-heading font-bold text-sm uppercase tracking-wider">Step {String(step.step).padStart(2, "0")}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-text-dark mb-4">{step.title}</h3>
                      <p className="text-text-dark/60 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* MATERIALS SECTION */}
      {materials?.visible && (
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">{(materials.data as any).heading}</h2>
              <p className="text-white/60 leading-relaxed mb-6">{(materials.data as any).content}</p>
              <div className="space-y-4">
                {["Aluminum alloys selected for corrosion resistance and formability", "UV-stabilized acrylic faces for long-term color retention", "Premium LED modules with documented lumen maintenance ratings", "Industrial-grade adhesives and sealants tested for outdoor exposure", "Power supplies rated for continuous duty with thermal protection"].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <PlaceholderImage label={(materials.data as any).image} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* WHAT THIS MEANS */}
      {benefits?.visible && (
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">{(benefits.data as any).heading}</h2>
              <p className="text-white/60 leading-relaxed mb-10">{(benefits.data as any).description}</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(benefits.data as any).items.map((item: any, index: number) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full text-center">
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      )}

      <CTASection locale={locale} />
    </>
  );
}
