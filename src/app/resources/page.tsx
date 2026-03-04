import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, HelpCircle, Library, ArrowRight, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Sign Industry Resources — Sunlite Signs",
  description:
    "Trade resources for sign shop professionals. Wholesale channel letter guides, sign industry glossary, blog articles, and FAQ from Sunlite Signs — your wholesale-only sign manufacturer.",
  keywords: [
    "wholesale sign resources",
    "trade sign industry resources",
    "channel letter guides wholesale",
    "sign industry glossary",
    "wholesale sign FAQ",
    "sign shop trade resources",
    "LED sign guides wholesale",
  ],
  openGraph: {
    title: "Wholesale Partner Resources — Sign Industry Guides, Glossary & FAQ | Sunlite Signs",
    description:
      "Trade resources for sign shop professionals. Wholesale channel letter guides, glossary, blog articles, and FAQ from Sunlite Signs.",
    url: "https://sunlitesigns.com/resources",
  },
};

const resourceCards = [
  {
    title: "Blog",
    description:
      "Wholesale industry insights, product spotlights, and expert articles on channel letters, illumination technology, and sign manufacturing trends for trade professionals.",
    href: "/resources/blog",
    icon: FileText,
  },
  {
    title: "Sign Industry Glossary",
    description:
      "A comprehensive A-Z glossary of sign industry terms. From acrylic faces to vinyl wraps, learn the language of professional signage — built for trade buyers.",
    href: "/resources/glossary",
    icon: Library,
  },
  {
    title: "Guides",
    description:
      "In-depth wholesale guides on channel letter selection, sign illumination options, installation best practices, and ordering from a wholesale-only manufacturer.",
    href: "/resources/guides",
    icon: BookOpen,
  },
  {
    title: "FAQ",
    description:
      "Answers to the most common questions about wholesale trade accounts, sign ordering, turnaround times, shipping, UL listing, and working with Sunlite Signs.",
    href: "/resources/faq",
    icon: HelpCircle,
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Partner Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
              Trade Resources
            </h1>
            <p className="text-lg text-text-light/60 max-w-2xl">
              Everything sign shop professionals and trade buyers need to make informed decisions about wholesale
              channel letters, illumination, and signage manufacturing. We sell exclusively to the trade — never retail.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <Link href={card.href} className="group block h-full">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      <card.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-text-light group-hover:text-brand-gold transition-colors mb-4">
                      {card.title}
                    </h2>
                    <p className="text-text-light/50 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                    <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                      Explore{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Ready to Get Trade Pricing?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to get trade pricing on your next project? We sell exclusively to sign shops and trade professionals — never retail. Get a detailed wholesale quote within 48 hours.
              </p>
              <Link href="/get-a-quote" className="btn-primary">
                Request Wholesale Pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
