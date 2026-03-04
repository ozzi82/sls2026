import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Phone,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroContent from "@/components/HeroContent";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sunlite Signs LLC",
    url: "https://sunlitesigns.com",
    description:
      "German-engineered wholesale channel letters and illuminated signs for sign shops across the USA and Canada. Trade accounts only.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-890",
      contactType: "sales",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — Full image background, compact text block on left */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.jpg"
            alt="Illuminated channel letters manufactured by Sunlite Signs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-40 pb-32 lg:pt-52 lg:pb-40 flex items-center min-h-screen">
          <HeroContent className="max-w-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-[1.1] mb-3">
              Wholesale Channel Letters
              <br />
              <span className="text-brand-gold">&amp; Illuminated Signs</span>
            </h1>

            <p className="text-sm text-white/60 mb-5 max-w-sm">
              German-engineered. UL listed. Built for sign shops.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/get-a-quote" className="btn-primary text-sm px-7 py-3">
                Get Your Product Started
              </Link>
              <a href="tel:+6892940912" className="btn-secondary text-sm px-6 py-3 gap-2 border-white/30 hover:border-brand-gold">
                <Phone className="w-4 h-4" />
                (689) 294-0912
              </a>
            </div>
          </HeroContent>
        </div>
      </section>

      {/* CUSTOM EUROPEAN SIGNAGE WHOLESALE — Tagline + Our Story teaser */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Custom European Signage Wholesale.
                </h2>
                <p className="text-brand-gold font-heading font-semibold text-lg mb-4">
                  Our Story.
                </p>
                <p className="text-text-dark/60 leading-relaxed mb-4">
                  What makes us passionate about signage and experience. The foundation
                  of Sunlite Signs begins with a partnership rooted in German precision
                  engineering — and a commitment to never compete with our customers.
                </p>
                <p className="text-text-dark/60 leading-relaxed mb-6">
                  From LKF Lichtwerbung in Nuremberg to Florida, we bring decades of
                  European signage expertise exclusively to the trade.
                </p>
                <Link
                  href="/about"
                  className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Read Our Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <PlaceholderImage
                label="Sunlite Signs team or LKF Lichtwerbung partnership"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* COMPLIMENTARY ENGINEERING SERVICES */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Engineering services — structural design and LED layout"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Complimentary Engineering Services
                </h2>
                <p className="text-text-light/60 leading-relaxed mb-4">
                  With our German design and engineering roots, we contribute our
                  complimentary engineering services to your project. From conceptual
                  integration of structural and material sciences, to manufacturing
                  engineering and packaging.
                </p>
                <p className="text-text-light/60 leading-relaxed mb-6">
                  Concept &amp; materials. Structural engineering. Electrical layout.
                  Manufacturing engineering. We are happy to contribute our expertise
                  at every stage of your project. Wholesale accounts only.
                </p>
                <Link
                  href="/services"
                  className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Explore Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* LOW PROFILE CHANNEL LETTERS */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Low Profile Channel Letters
                </h2>
                <p className="text-text-dark/60 leading-relaxed mb-4">
                  The foundation of Sunlite Signs — precision-designed,
                  German-engineered LED-illuminated low profile lettering. Close-up
                  viewing precision, the best illumination diffusion quality, and
                  profiles as low as 1.2&quot; deep with embedded LED diodes. No
                  legacy trim cap. UL Listed.
                </p>
                <p className="text-text-dark/60 leading-relaxed mb-6">
                  Available in face lit, halo lit, trimless stainless steel, and
                  block acrylic configurations. Wholesale trade pricing for sign shops.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Link href="/products/channel-letters/front-lit" className="text-xs font-heading font-semibold uppercase tracking-wider bg-primary-dark text-white px-4 py-2 rounded hover:bg-brand-gold transition-colors">
                    Face Lit
                  </Link>
                  <Link href="/products/channel-letters/halo-lit" className="text-xs font-heading font-semibold uppercase tracking-wider bg-primary-dark text-white px-4 py-2 rounded hover:bg-brand-gold transition-colors">
                    Halo Lit
                  </Link>
                  <Link href="/products/channel-letters/trimless" className="text-xs font-heading font-semibold uppercase tracking-wider bg-primary-dark text-white px-4 py-2 rounded hover:bg-brand-gold transition-colors">
                    Trimless
                  </Link>
                  <Link href="/products/flat-cut-letters" className="text-xs font-heading font-semibold uppercase tracking-wider bg-primary-dark text-white px-4 py-2 rounded hover:bg-brand-gold transition-colors">
                    Flat Cut
                  </Link>
                </div>
                <Link
                  href="/products/channel-letters"
                  className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View All Channel Letters <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <PlaceholderImage
                label="Low profile channel letters — trimless stainless steel close-up"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BLADE AND CABINET SIGNS */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <PlaceholderImage
                label="Blade sign and cabinet sign installations"
                aspectRatio="aspect-[4/3]"
              />
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Blade and Cabinet Signs
                </h2>
                <p className="text-text-light/60 leading-relaxed mb-4">
                  While we are known for low profile LED-illuminated letterforms,
                  we also have expertise to structurally engineer and fabricate blade
                  signage, push-through cabinet signs, and recessed cabinet signage.
                  UL Listed. Wholesale only.
                </p>
                <p className="text-text-light/60 leading-relaxed mb-6">
                  Projecting blade signs for maximum storefront visibility.
                  Illuminated cabinet signs for bold brand presence. All delivered
                  in 3 weeks door to door, exclusively to the trade.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/products/blade-signs"
                    className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Blade Signs <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products/lightboxes"
                    className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Cabinet Signs <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SEG LIGHT BOXES */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  SEG Light Boxes
                </h2>
                <p className="text-brand-gold font-heading font-semibold text-base mb-4">
                  Custom SEG Light Boxes and Prints in 3 Weeks
                </p>
                <p className="text-text-dark/60 leading-relaxed mb-6">
                  From experiential retail experiences to advertising and wayfinding
                  content, Sunlite Signs custom-sized Silicone-edged Graphic (SEG)
                  Light Box solutions are like no other in the USA industry — in low
                  form factors down to 1&quot; deep, high-quality, high-resolution
                  printed and illuminated light box signage. Wholesale to the trade.
                </p>
                <Link
                  href="/products/seg-light-boxes"
                  className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Explore SEG Light Boxes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <PlaceholderImage
                label="SEG Light Box — illuminated fabric display in retail environment"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GET YOUR PRODUCT STARTED — CTA */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-bold uppercase tracking-widest">
                  Trade Accounts Only
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Get Your Product Started
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Request wholesale pricing for your next project. Detailed trade
                quotes within 48 hours. Delivered in 3 weeks door to door.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/get-a-quote" className="btn-primary text-base px-10 py-5">
                  Get Your Product Started
                </Link>
                <Link href="/contact" className="btn-secondary text-base px-10 py-5">
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-light/50">
                <a href="tel:+6892940912" className="hover:text-brand-gold transition-colors">
                  (689) 294-0912
                </a>
                <a href="mailto:hello@sunlitesigns.com" className="hover:text-brand-gold transition-colors">
                  hello@sunlitesigns.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-20 lg:hidden" />
    </>
  );
}
