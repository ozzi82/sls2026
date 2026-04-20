import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import GalleryFilter from "./GalleryFilter";
import CTASection from "@/components/CTASection";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("gallery", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/gallery"),
  };
}

export default async function GalleryPage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("gallery", locale);
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const hero = getBlock("hero");
  const gallery = getBlock("gallery");
  const galleryData = gallery?.data as any;
  const cta = getBlock("cta");
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      {hero?.visible && (
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-6 sm:px-10 lg:px-16">
            <Breadcrumbs locale={locale}
              items={[
                { name: t(locale, "breadcrumbs.home"), href: "/" },
                { name: "Gallery" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max text-center px-6 sm:px-10 lg:px-16">
              <AnimatedSection>
                <p className="micro-label mb-6">
                  {(hero.data as any).badge}
                </p>
                <div className="gold-line mx-auto mb-8" />
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                  {(hero.data as any).h1}{" "}
                  <span className="text-brand-gold">{(hero.data as any).h1Highlight}</span>
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  {(hero.data as any).subtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-12 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          GALLERY GRID
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 pb-16">
        <div className="container-max">
          <GalleryFilter
            categories={galleryData?.categories ?? []}
            images={galleryData?.images ?? []}
          />
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      {cta?.visible && (
      <CTASection locale={locale}
        heading={(cta.data as any).heading}
        highlight={(cta.data as any).headingHighlight}
        description={(cta.data as any).description}
      />
      )}
    </>
  );
}
