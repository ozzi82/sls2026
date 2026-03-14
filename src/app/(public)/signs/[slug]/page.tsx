import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLandingPages, getLandingPage } from "@/lib/landing-pages";
import LandingPageHero from "@/components/LandingPageHero";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedPages from "@/components/RelatedPages";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export function generateStaticParams() {
  return allLandingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLandingPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/signs/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/signs/${page.slug}`,
    },
  };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  const relatedPages = page.relatedSlugs
    .map((slug) => getLandingPage(slug))
    .filter(Boolean)
    .map((p) => ({
      title: p!.h1 + " " + p!.h1Highlight,
      description: p!.heroSubtitle,
      href: `/signs/${p!.slug}`,
    }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": page.schemaType,
    name: page.h1 + " " + page.h1Highlight,
    description: page.metaDescription,
    provider: { "@id": "https://sunlitesigns.com/#organization" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <LandingPageHero
        title={page.h1}
        highlight={page.h1Highlight}
        subtitle={page.heroSubtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: page.hubName, href: `/products/${page.hubSlug}` },
          { label: page.h1 + " " + page.h1Highlight, href: `/signs/${page.slug}` },
        ]}
      />

      {page.sections.map((section, i) => (
        <section key={i} className={i % 2 === 0 ? "section-padding" : ""}>
          {i % 2 === 1 ? (
            <div className="mx-6 sm:mx-10 lg:mx-16">
              <div className="bg-bg-light rounded-2xl">
                <div className="container-max section-padding">
                  <AnimatedSection>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-text-dark mb-6">
                      {section.heading}
                    </h2>
                    <div
                      className="text-text-dark/60 text-[15px] leading-relaxed font-body max-w-none prose prose-lg"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </AnimatedSection>
                </div>
              </div>
            </div>
          ) : (
            <div className="container-max">
              <AnimatedSection>
                <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em] mb-6">
                  {section.heading}
                </h2>
                <div
                  className="text-white/60 text-[15px] leading-relaxed font-body max-w-none prose prose-invert prose-lg"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </AnimatedSection>
            </div>
          )}
          <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />
        </section>
      ))}

      {page.faqs.length > 0 && <FAQAccordion faqs={page.faqs} />}
      {relatedPages.length > 0 && <RelatedPages pages={relatedPages} />}
      <CTASection />
    </>
  );
}
