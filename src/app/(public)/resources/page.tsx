import type { Metadata } from "next";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import type { HeroData, ResourceCardsData } from "@/lib/admin/page-config-types";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("resources", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
  };
}

export default async function ResourcesPage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("resources", locale);

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }

  const hero = getBlock<HeroData>("hero");
  const resourceCards = getBlock<ResourceCardsData>("resource-cards");

  return (
    <>
      {/* Hero */}
      {hero?.visible && (
        <section className="bg-bg-primary pt-32 pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Resources" }]} />
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{hero.data.badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">{hero.data.h1}</h1>
              <p className="text-lg text-white/60 max-w-2xl">{hero.data.subtitle}</p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Resource Cards */}
      {resourceCards?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resourceCards.data.items.map((card, index) => {
                const Icon = getIconComponent(card.icon);
                return (
                  <AnimatedSection key={card.title} delay={index * 0.1}>
                    <LocaleLink locale={locale} href={card.href} className="group block h-full">
                      <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                          {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors mb-4">{card.title}</h2>
                        <p className="text-white/50 mb-6 leading-relaxed">{card.description}</p>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </LocaleLink>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </>
  );
}
