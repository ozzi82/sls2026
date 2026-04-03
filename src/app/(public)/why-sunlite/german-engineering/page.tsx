import { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Award,
  CheckCircle2,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadStaticPageConfig("why-sunlite--german-engineering");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default async function GermanEngineeringPage() {
  const config = await loadStaticPageConfig("why-sunlite--german-engineering");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const hero = getBlock("hero");
  const lkf = getBlock("lkf-partnership");
  const principles = getBlock("principles");
  const whatItMeans = getBlock("what-it-means");
  const edgeluxe = getBlock("edgeluxe");
  return (
    <>
      {/* HERO */}
      {hero?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--hero-glow),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite", href: "/why-sunlite" },
              { name: "German Engineering" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{(hero.data as any).badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                {(hero.data as any).h1}{" "}
                <span className="text-brand-gold">{(hero.data as any).h1Highlight}</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {(hero.data as any).subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                {(hero.data as any).ctas.map((cta: any) => (
                  <Link key={cta.href} href={cta.href} className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}>
                    {cta.label}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage
                label={(hero.data as any).image}
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* LKF PARTNERSHIP */}
      {lkf?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                {(lkf.data as any).heading}
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                {(lkf.data as any).description}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(lkf.data as any).items.map((item: any, index: number) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-black/[0.04] h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <span className="text-brand-gold font-heading font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-text-dark/60 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ENGINEERING PRINCIPLES */}
      {principles?.visible && (
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                {(principles.data as any).heading}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {(principles.data as any).description}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(principles.data as any).items.map((principle: any, index: number) => {
              const Icon = getIconComponent(principle.icon);
              return (
                <AnimatedSection key={principle.title} delay={index * 0.1}>
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/20 transition-colors">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      {Icon && <Icon className="w-5 h-5 text-brand-gold" />}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {principle.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* WHAT THIS MEANS FOR YOUR SHOP */}
      {whatItMeans?.visible && (
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <PlaceholderImage
                label={(whatItMeans.data as any).image}
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
                {(whatItMeans.data as any).heading}
              </h2>
              <div className="space-y-4">
                {(whatItMeans.data as any).content.split("\n").map((point: string) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-text-dark/70">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* EDGELUXE SHOWCASE */}
      {edgeluxe?.visible && (
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                {(edgeluxe.data as any).heading}
              </h2>
              {(edgeluxe.data as any).content.split("\n\n").map((p: string, i: number) => (
                <p key={i} className="text-white/60 leading-relaxed mb-6">
                  {p}
                </p>
              ))}
              <div className="flex flex-wrap gap-4 text-xs font-heading uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-gold" /> German Engineered
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-gold" /> Trimless Design
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-gold" /> Trade Exclusive
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <PlaceholderImage
                label={(edgeluxe.data as any).image}
                className="rounded-xl"
                aspectRatio="aspect-square"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}


      <CTASection />
    </>
  );
}
