import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import type { HeroData, GuidesListData } from "@/lib/admin/page-config-types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("resources--guides");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
  };
}

export default function GuidesPage() {
  const config = loadStaticPageConfig("resources--guides");

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }

  const hero = getBlock<HeroData>("hero");
  const guidesList = getBlock<GuidesListData>("guides-list");

  return (
    <>
      {/* Hero */}
      {hero?.visible && (
        <section className="bg-bg-primary pt-32 pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "Guides" }]} />
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

      {/* Guides Grid */}
      {guidesList?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <div className="space-y-8">
              {guidesList.data.items.map((guide, index) => {
                const Icon = guide.icon ? getIconComponent(guide.icon) : null;
                return (
                  <AnimatedSection key={guide.href} delay={index * 0.1}>
                    <Link href={guide.href} className="group block">
                      <article className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-2/5 lg:w-1/3">
                            <PlaceholderImage label={guide.image ?? guide.title} className="rounded-none border-0 h-full" aspectRatio="aspect-[4/3] md:aspect-auto" />
                          </div>
                          <div className="md:w-3/5 lg:w-2/3 p-6 lg:p-10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                                {Icon && <Icon className="w-5 h-5 text-brand-gold" />}
                              </div>
                              <span className="text-xs font-heading font-medium text-white/40 uppercase tracking-wider">{guide.readTime}</span>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors mb-4">{guide.title}</h2>
                            <p className="text-white/50 leading-relaxed mb-6">{guide.description}</p>
                            <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                              Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
