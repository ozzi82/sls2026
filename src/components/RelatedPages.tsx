import LocaleLink from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  heading?: string;
  locale?: string;
}

export default function RelatedPages({ pages, heading = "Related Topics", locale = "en" }: RelatedPagesProps) {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em]">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page, i) => (
            <AnimatedSection key={page.href} delay={i * 0.08}>
              <LocaleLink locale={locale}
                href={page.href}
                className="group block bg-bg-card border border-white/[0.06] rounded-xl p-6 hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400"
              >
                <h3 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                  {page.title}
                  <ArrowRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-body">
                  {page.description}
                </p>
              </LocaleLink>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
