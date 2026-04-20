import LocaleLink from "@/components/LocaleLink";
import { t } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/locale";
import { Lock, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface CTASectionProps {
  locale?: string;
  heading?: string;
  highlight?: string;
  description?: string;
}

export default function CTASection({
  locale = "en",
  heading = "Get Your Product",
  highlight = "Started.",
  description = "Request wholesale pricing for your next project. Detailed trade quotes within 24 hours. Delivered in 3 weeks door to door.",
}: CTASectionProps) {
  return (
    <section className="section-padding">
      <div className="container-max relative">
        <div className="bg-gradient-to-br from-bg-card to-[#0F0F2D] rounded-2xl border border-white/[0.06] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,var(--hero-glow),transparent_70%)]" />
          <div className="relative z-10 text-center px-8 py-20 lg:py-28">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 border border-brand-gold/20 rounded-full px-5 py-2 mb-10">
                <Lock className="w-3 h-3 text-brand-gold" />
                <span className="micro-label">Trade Accounts Only</span>
              </div>
              <h2 className="font-display text-4xl lg:text-[56px] leading-[1.05] mb-5 tracking-[-0.02em] font-bold">
                {heading} <span className="text-brand-gold">{highlight}</span>
              </h2>
              <p className="text-white/60 max-w-md mx-auto mb-12 text-[15px] leading-relaxed font-body">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <LocaleLink locale={locale} href="/get-a-quote" className="btn-primary w-full sm:w-auto">
                  {t(locale as Locale, "cta.requestPricing")}
                </LocaleLink>
                <a href="tel:+6892940912" className="btn-secondary gap-2 w-full sm:w-auto justify-center">
                  <Phone className="w-4 h-4" />
                  (689) 294-0912
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/20 font-body">
                <span>(689) 294-0912</span>
                <span className="hidden sm:inline text-white/10">|</span>
                <span>hello@sunlitesigns.com</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
