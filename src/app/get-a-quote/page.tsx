import { Metadata } from "next";
import { Phone, Mail, Shield, Clock, Truck, Award, Lock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import QuoteForm from "./QuoteForm";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Request Wholesale Pricing — Trade Accounts Only",
  description:
    "Request wholesale trade pricing for channel letters, blade signs, flat cut letters, and custom signage. Detailed wholesale quotes within 48 hours. Sign shops and trade professionals only.",
};

const differentiators = [
  { icon: Lock, text: "Wholesale only — no retail sales" },
  { icon: Clock, text: "Trade quotes within 48 hours" },
  { icon: Shield, text: "Every sign UL listed" },
  { icon: Truck, text: "3-week door-to-door delivery, crated & shipped" },
  { icon: Award, text: "German-engineered with LKF" },
];

export default function GetAQuotePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Request Wholesale Pricing — Sunlite Signs",
    description: "Request wholesale trade pricing for illuminated signage products. Sign shops and trade professionals only.",
    url: "https://sunlitesigns.com/get-a-quote",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 pt-20">
          <div className="container-max px-6 sm:px-10 lg:px-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Request Wholesale Pricing" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max px-6 sm:px-10 lg:px-16">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <p className="micro-label mb-6">
                    Trade Accounts Only
                  </p>
                  <div className="gold-line mb-8" />
                  <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                    Request Wholesale{" "}
                    <span className="text-brand-gold">Pricing</span>
                  </h1>
                  <p className="text-lg text-white/60 max-w-2xl">
                    Tell us about your project and we will send detailed trade pricing with full material
                    specs within 48 hours. No retail markup. No obligation.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-12 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FORM + SIDEBAR
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 pb-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <QuoteForm />
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="sticky top-28 space-y-6">
                  {/* Contact Info */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4">
                      Prefer to talk trade?
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="tel:+6892940912"
                        className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors"
                      >
                        <Phone className="w-5 h-5 text-brand-gold" />
                        (689) 294-0912
                      </a>
                      <a
                        href="mailto:hello@sunlitesigns.com"
                        className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors"
                      >
                        <Mail className="w-5 h-5 text-brand-gold" />
                        hello@sunlitesigns.com
                      </a>
                    </div>
                  </div>

                  {/* Differentiators */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-4">
                      Why Partner With Sunlite?
                    </h3>
                    <ul className="space-y-4">
                      {differentiators.map((item) => (
                        <li key={item.text} className="flex items-center gap-3 text-white/60">
                          <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                          <span className="text-sm">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Wholesale Badge */}
                  <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-6 text-center">
                    <Lock className="w-6 h-6 text-brand-gold mx-auto mb-3" />
                    <p className="text-brand-gold font-heading font-bold text-sm uppercase tracking-wider mb-2">
                      Wholesale Only
                    </p>
                    <p className="text-white/60 text-xs">
                      We sell exclusively to sign companies, sign shops, and trade professionals. We do not sell to the general public.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <CTASection />
    </>
  );
}
