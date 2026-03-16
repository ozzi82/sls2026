import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Shield,
  Clock,
  Truck,
  Award,
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
  const config = loadStaticPageConfig("why-sunlite");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function WhySunlitePage() {
  const config = loadStaticPageConfig("why-sunlite");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const heroData = getBlock("hero")!.data as any;
  const trustStatsData = getBlock("trust-stats")!.data as any;
  const pillarsData = getBlock("pillars")!.data as any;
  const overviewData = getBlock("overview")!.data as any;
  return (
    <>
      {/* HERO */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite" },
            ]}
          />

          <AnimatedSection>
            <div className="max-w-3xl mt-8">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                {heroData.h1}{" "}
                <span className="text-brand-gold">{heroData.h1Highlight}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl font-body leading-relaxed">
                {heroData.subtitle}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TRUST STATS BAR */}
      <section className="bg-bg-navy border-t border-white/10 border-b border-b-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustStatsData.items.map((stat: any, index: number) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                    {stat.sublabel}
                  </div>
                  <div className="text-sm text-white/50 font-heading uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PILLAR CARDS */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                {pillarsData.heading}
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                {pillarsData.description}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-16 md:space-y-24">
            {pillarsData.items.map((pillar: any, index: number) => {
              const Icon = getIconComponent(pillar.icon);
              return (
                <AnimatedSection key={pillar.title}>
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8 md:gap-16`}
                  >
                    <div className="flex-1 w-full">
                      <PlaceholderImage
                        label={pillar.image}
                        className="rounded-xl"
                        aspectRatio="aspect-[4/3]"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-4">
                        {pillar.title}
                      </h3>
                      <p className="text-text-dark/70 leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center gap-2 text-brand-gold font-heading font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all"
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                {overviewData.heading}
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                {overviewData.content}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-heading uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-gold" />
                  German Engineering
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-gold" />
                  UL Listed
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  48-Hour Quotes
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  3-Week Door-to-Door Delivery
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-gold" />
                  Trade Accounts Only
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      <CTASection />
    </>
  );
}
