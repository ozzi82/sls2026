import type { Metadata } from "next";
import { Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import SafeHtml from "@/components/SafeHtml";
import type { HeroData, FAQData } from "@/lib/admin/page-config-types";
import { getLocale } from "@/lib/i18n/get-locale";
import { getAlternates } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("resources--glossary", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: getAlternates("/resources/glossary"),
  };
}

interface GlossaryTerm {
  question: string;
  answer: string;
}

function groupByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    const letter = term.question[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(term);
  }
  return groups;
}

export default async function GlossaryPage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("resources--glossary", locale);

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }

  const hero = getBlock<HeroData>("hero");
  const glossary = getBlock<FAQData>("glossary");

  const glossaryTerms = glossary?.data.items ?? [];
  const grouped = groupByLetter(glossaryTerms);
  const alphabet = Object.keys(grouped).sort();

  // JSON-LD FAQPage schema using glossary terms as Q&A
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: glossaryTerms.map((item: GlossaryTerm) => ({
      "@type": "Question",
      name: `What is ${item.question.toLowerCase()} in the sign industry?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Sign Industry Glossary",
    description:
      "A comprehensive glossary of channel letter and commercial signage manufacturing terms.",
    hasDefinedTerm: glossaryTerms.map((item: GlossaryTerm) => ({
      "@type": "DefinedTerm",
      name: item.question,
      description: item.answer,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />

      {/* Hero */}
      {hero?.visible && (
        <section className="bg-bg-primary pt-32 pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Resources", href: "/resources" }, { name: "Sign Industry Glossary" }]} />
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest"><SafeHtml html={hero.data.badge} /></span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"><SafeHtml html={hero.data.h1} /></h1>
              <p className="text-lg text-white/60 max-w-2xl"><SafeHtml html={hero.data.subtitle} /></p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Alphabet Navigation */}
      {glossary?.visible && (
        <section className="bg-bg-primary border-y border-white/10 sticky top-0 z-30 backdrop-blur-md bg-bg-primary/90">
          <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
            <nav aria-label="Glossary alphabetical navigation">
              <ul className="flex flex-wrap items-center gap-2">
                {alphabet.map((letter) => (
                  <li key={letter}>
                    <a href={`#letter-${letter}`} className="inline-flex items-center justify-center w-9 h-9 rounded bg-bg-card border border-white/[0.06] text-sm font-heading font-semibold text-white/60 hover:text-brand-gold hover:border-brand-gold/30 transition-colors">
                      {letter}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      )}

      {/* Glossary Terms */}
      {glossary?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <div className="max-w-4xl">
              {alphabet.map((letter) => (
                <AnimatedSection key={letter} className="mb-12">
                  <div id={`letter-${letter}`} className="scroll-mt-24">
                    <h2 className="text-3xl font-heading font-bold text-brand-gold mb-6 pb-3 border-b border-white/10">{letter}</h2>
                    <dl className="space-y-6">
                      {grouped[letter].map((item) => (
                        <div key={item.question} id={item.question.toLowerCase().replace(/[\s()]/g, "-")} className="scroll-mt-24">
                          <dt className="text-lg font-heading font-semibold text-white mb-2"><SafeHtml html={item.question} /></dt>
                          <dd className="text-white/60 leading-relaxed pl-4 border-l-2 border-brand-gold/20"><SafeHtml html={item.answer} /></dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </>
  );
}
