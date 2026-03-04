import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import GalleryFilter from "./GalleryFilter";

export const metadata: Metadata = {
  title: "Wholesale Sign Gallery — Trade Partner Installations | Sunlite Signs",
  description:
    "Browse completed wholesale sign projects manufactured by Sunlite Signs and installed by our trade partners. Channel letters, halo lit signs, EdgeLuxe trimless, blade signs — available exclusively to sign shops at trade pricing.",
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
      {/* HERO */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-navy/20 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Gallery" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max text-center">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only</span>
                </div>
                <div className="gold-line mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                  Manufactured by Sunlite.{" "}
                  <span className="text-brand-gold">Installed by Our Trade Partners.</span>
                </h1>
                <p className="text-lg text-text-light/60 max-w-2xl mx-auto">
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

      {/* GALLERY GRID */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <GalleryFilter />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Ready to Manufacture Something Like This for Your Clients?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Send us your project details and get wholesale trade pricing
                within 48 hours. No retail markup. No competition. We
                manufacture, you sell — and your clients never know we exist.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary gap-2">
                  Request Wholesale Pricing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="btn-secondary">
                  Browse Trade Catalog
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom spacer for mobile CTA bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
