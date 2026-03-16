import { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("about");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function AboutPage() {
  const config = loadStaticPageConfig("about");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const hero = getBlock("hero");
  const timeline = getBlock("timeline");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sunlite Signs LLC",
    description:
      "Florida-based wholesale-only LED signage manufacturer with German engineering heritage. UL listed channel letters, blade signs, flat cut letters, and lightboxes exclusively for sign shops across the USA and Canada.",
    url: "https://sunlitesigns.com",
    telephone: "+1-234-567-890",
    email: "hello@sunlitesigns.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    knowsAbout: [
      "Wholesale Channel Letters",
      "Wholesale Halo Lit Signs",
      "Trimless Channel Letters",
      "Wholesale Blade Signs",
      "Wholesale Flat Cut Letters",
      "Wholesale LED Lightboxes",
    ],
  };

  const timelineEntries = timeline ? (timeline.data as any).entries.map((entry: any) => ({
    number: String(entry.step).padStart(2, "0"),
    title: entry.title,
    text: entry.text,
    imageLabel: entry.title,
    imageSrc: entry.image,
  })) : [];

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-6 sm:px-10 lg:px-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Our Story" },
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
                  {(hero.data as any).h1} <span className="text-brand-gold">{(hero.data as any).h1Highlight}</span>
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

      {/* ═══════════════════════════════════════════
          TIMELINE
          ═══════════════════════════════════════════ */}
      {timeline?.visible && timelineEntries.map((entry: any, index: number) => {
        const isEven = index % 2 === 0;

        if (isEven) {
          // Light section
          return (
            <section key={entry.number}>
              <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />
              <div className="mx-6 sm:mx-10 lg:mx-16">
                <div className="bg-bg-light rounded-2xl overflow-hidden">
                  <div className="container-max px-8 sm:px-12 lg:px-16 py-16 lg:py-24">
                    <div
                      className={`flex flex-col ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      } items-center gap-12 md:gap-16`}
                    >
                      {/* Image side */}
                      <AnimatedSection className="flex-1 w-full">
                        <div className="relative">
                          <div className="absolute -top-4 -left-4 z-10 w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
                            <span className="text-white font-heading font-bold text-lg">
                              {entry.number}
                            </span>
                          </div>
                          {entry.imageSrc ? (
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                              <Image
                                src={entry.imageSrc}
                                alt={entry.imageLabel}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <PlaceholderImage
                              label={entry.imageLabel}
                              className="rounded-lg"
                              aspectRatio="aspect-[4/3]"
                            />
                          )}
                          {/* Decorative corner accent */}
                          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-brand-gold/40 rounded-br-lg hidden lg:block" />
                        </div>
                      </AnimatedSection>

                      {/* Text side */}
                      <AnimatedSection className="flex-1" delay={0.1}>
                        <div className="gold-line mb-6" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-dark mb-6 leading-[1.1] tracking-[-0.02em]">
                          {entry.title}
                        </h2>
                        <p className="text-text-dark/60 leading-relaxed text-lg">
                          {entry.text}
                        </p>
                      </AnimatedSection>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Dark section
        return (
          <section key={entry.number} className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="container-max">
              <div
                className={`flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16`}
              >
                {/* Image side */}
                <AnimatedSection className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 z-10 w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
                      <span className="text-white font-heading font-bold text-lg">
                        {entry.number}
                      </span>
                    </div>
                    {entry.imageSrc ? (
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                          src={entry.imageSrc}
                          alt={entry.imageLabel}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage
                        label={entry.imageLabel}
                        className="rounded-lg"
                        aspectRatio="aspect-[4/3]"
                      />
                    )}
                    {/* Decorative corner accent */}
                    <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-brand-gold/40 rounded-tl-lg hidden lg:block" />
                  </div>
                </AnimatedSection>

                {/* Text side */}
                <AnimatedSection className="flex-1" delay={0.1}>
                  <div className="gold-line mb-6" />
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-[1.1] tracking-[-0.02em]">
                    {entry.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {entry.text}
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <CTASection />
    </>
  );
}
