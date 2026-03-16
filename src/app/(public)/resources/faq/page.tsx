import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FAQAccordion from "@/components/FAQAccordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("resources--faq");
  return { title: config.seo.title, description: config.seo.metaDescription, keywords: config.seo.keywords };
}

export default function FAQPage() {
  const config = loadStaticPageConfig("resources--faq");
  function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

  const heroData = getBlock("hero")!.data as any;
  const faqData = getBlock("faq")!.data as any;
  const stillQuestionsData = getBlock("still-questions")!.data as any;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((faq: any) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "FAQ" }]} />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">{heroData.h1}</h1>
            <p className="text-lg text-white/60 max-w-2xl">{heroData.subtitle}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ List */}
      <FAQAccordion faqs={faqData.items} heading={faqData.heading} />

      {/* Still Have Questions */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{stillQuestionsData.heading}</h2>
              <p className="text-text-dark/60 max-w-xl mx-auto mb-8">{stillQuestionsData.content}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/get-a-quote" className="btn-primary">Request Wholesale Pricing</Link>
                <a href="mailto:hello@sunlitesigns.com" className="inline-flex items-center justify-center px-8 py-4 border-2 border-text-dark/20 text-text-dark font-heading font-semibold text-sm uppercase tracking-wider rounded hover:border-brand-gold hover:text-brand-gold transition-colors duration-300">Email Us</a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-dark/50">
                <a href="tel:+6892940912" className="hover:text-brand-gold transition-colors">(689) 294-0912</a>
                <a href="mailto:hello@sunlitesigns.com" className="hover:text-brand-gold transition-colors">hello@sunlitesigns.com</a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
