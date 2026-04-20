import { Metadata } from "next";
import { Lock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import QuoteForm from "./QuoteForm";
import CTASection from "@/components/CTASection";
import { getIconComponent } from "@/lib/admin/icon-map";
import SafeHtml from "@/components/SafeHtml";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("get-a-quote", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/get-a-quote"),
  };
}

export default async function GetAQuotePage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("get-a-quote", locale);
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const hero = getBlock("hero");
  const form = getBlock("form");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Request Wholesale Pricing — Sunlite Signs",
    description: "Request wholesale trade pricing for illuminated signage products. Sign shops and trade professionals only.",
    url: "https://sunlitesigns.com/get-a-quote",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      {hero?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 pt-20">
          <div className="container-max px-6 sm:px-10 lg:px-16">
            <Breadcrumbs locale={locale}
              items={[
                { name: t(locale, "breadcrumbs.home"), href: "/" },
                { name: "Request Wholesale Pricing" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max px-6 sm:px-10 lg:px-16">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <p className="micro-label mb-6">
                    <SafeHtml html={(hero.data as any).badge} />
                  </p>
                  <div className="gold-line mb-8" />
                  <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                    <SafeHtml html={(hero.data as any).h1} />{" "}
                    <span className="text-brand-gold"><SafeHtml html={(hero.data as any).h1Highlight} /></span>
                  </h1>
                  <p className="text-lg text-white/60 max-w-2xl">
                    <SafeHtml html={(hero.data as any).subtitle} />
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-12 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FORM + SIDEBAR
          ═══════════════════════════════════════════ */}
      {form?.visible && (
      <section className="px-6 sm:px-10 lg:px-16 pb-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <QuoteForm />
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="sticky top-28 space-y-6">
                  {/* Contact Info */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4">
                      Prefer to talk trade?
                    </h3>
                    <div className="space-y-4">
                      <a
                        href={`tel:+${(form.data as any).sidebar.contactPhone?.replace(/\D/g, "")}`}
                        className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors"
                      >
                        {(() => { const I = getIconComponent("Phone"); return I ? <I className="w-5 h-5 text-brand-gold" /> : null; })()}
                        {(form.data as any).sidebar.contactPhone}
                      </a>
                      <a
                        href={`mailto:${(form.data as any).sidebar.contactEmail}`}
                        className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors"
                      >
                        {(() => { const I = getIconComponent("Mail"); return I ? <I className="w-5 h-5 text-brand-gold" /> : null; })()}
                        {(form.data as any).sidebar.contactEmail}
                      </a>
                    </div>
                  </div>

                  {/* Differentiators */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4">
                      Why Partner With Sunlite?
                    </h3>
                    <ul className="space-y-4">
                      {(form.data as any).sidebar.differentiators.map((item: any) => {
                        const Icon = getIconComponent(item.icon);
                        return (
                          <li key={item.text} className="flex items-center gap-3 text-white/60">
                            {Icon && <Icon className="w-5 h-5 text-brand-gold flex-shrink-0" />}
                            <span className="text-sm"><SafeHtml html={item.text} /></span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Wholesale Badge */}
                  <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-6 text-center">
                    <Lock className="w-6 h-6 text-brand-gold mx-auto mb-3" />
                    <p className="text-brand-gold font-heading font-bold text-sm uppercase tracking-wider mb-2">
                      Wholesale Only
                    </p>
                    <p className="text-white/60 text-xs">
                      <SafeHtml html={(form.data as any).sidebar.notices[0]} />
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <CTASection locale={locale} />
    </>
  );
}
