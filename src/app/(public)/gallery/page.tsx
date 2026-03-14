import { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import GalleryFilter from "./GalleryFilter";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Wholesale Sign Gallery — Trade Partner Installations | Sunlite Signs",
  description:
    "Browse completed wholesale sign projects manufactured by Sunlite Signs and installed by our trade partners. Channel letters, halo lit signs, trimless, blade signs — available exclusively to sign shops at trade pricing.",
  openGraph: {
    title: "Wholesale Sign Gallery — Trade Partner Installations",
    description:
      "Wholesale signs manufactured by Sunlite, installed by our trade partners across the USA and Canada. Sign shops only — trade pricing available.",
    url: "https://sunlitesigns.com/gallery",
  },
};

export default function GalleryPage() {
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
                  Wholesale Only
                </p>
                <div className="gold-line mx-auto mb-8" />
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                  Manufactured by Sunlite.{" "}
                  <span className="text-brand-gold">Installed by Our Trade Partners.</span>
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  Every project below was manufactured at our wholesale facility
                  and installed by sign shop partners across North America. These
                  are trade-exclusive products built with German engineering
                  precision and UL listed certification. We manufacture. They
                  sell. Their clients are thrilled.
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
        heading="Ready to Manufacture Something"
        highlight="Like This?"
        description="Send us your project details and get wholesale trade pricing within 48 hours. No retail markup. No competition. We manufacture, you sell."
      />
    </>
  );
}
