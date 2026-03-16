import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import GalleryFilter from "./GalleryFilter";
import CTASection from "@/components/CTASection";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("gallery");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function GalleryPage() {
  const config = loadStaticPageConfig("gallery");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const heroData = getBlock("hero")!.data as any;
  const ctaData = getBlock("cta")!.data as any;
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-6 sm:px-10 lg:px-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Gallery" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max text-center px-6 sm:px-10 lg:px-16">
              <AnimatedSection>
                <p className="micro-label mb-6">
                  {heroData.badge}
                </p>
                <div className="gold-line mx-auto mb-8" />
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                  {heroData.h1}{" "}
                  <span className="text-brand-gold">{heroData.h1Highlight}</span>
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  {heroData.subtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-12 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          GALLERY GRID
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 pb-16">
        <div className="container-max">
          <GalleryFilter />
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <CTASection
        heading={ctaData.heading}
        highlight={ctaData.headingHighlight}
        description={ctaData.description}
      />
    </>
  );
}
