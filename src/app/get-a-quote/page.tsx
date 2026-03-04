import { Metadata } from "next";
import { Phone, Mail, Shield, Clock, Truck, Award, Lock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Request Wholesale Pricing — Trade Accounts Only",
  description:
    "Request wholesale trade pricing for channel letters, blade signs, flat cut letters, and custom signage. Detailed wholesale quotes within 48 hours. Sign shops and trade professionals only.",
};

const differentiators = [
  { icon: Lock, text: "Wholesale only — no retail sales" },
  { icon: Clock, text: "Trade quotes within 48 hours" },
  { icon: Shield, text: "Every sign UL listed" },
  { icon: Truck, text: "4-week delivery, crated & shipped" },
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
      <div className="pt-20 bg-primary-dark min-h-screen">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Request Wholesale Pricing" },
            ]}
          />
        </div>

        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                    Trade Accounts Only
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Request Wholesale Pricing
                </h1>
                <p className="text-text-light/60 mb-8 max-w-lg">
                  Tell us about your project and we will send detailed trade pricing with full material
                  specs within 48 hours. No retail markup. No obligation. We sell exclusively to sign shops
                  and trade professionals.
                </p>
                <QuoteForm />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-8">
                  {/* Contact Info */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-text-light mb-4">
                      Prefer to talk trade?
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="tel:+1234567890"
                        className="flex items-center gap-3 text-text-light/60 hover:text-brand-gold transition-colors"
                      >
                        <Phone className="w-5 h-5 text-brand-gold" />
                        (123) 456-7890
                      </a>
                      <a
                        href="mailto:info@sunlitesigns.com"
                        className="flex items-center gap-3 text-text-light/60 hover:text-brand-gold transition-colors"
                      >
                        <Mail className="w-5 h-5 text-brand-gold" />
                        info@sunlitesigns.com
                      </a>
                    </div>
                  </div>

                  {/* Differentiators */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-text-light mb-4">
                      Why Partner With Sunlite?
                    </h3>
                    <ul className="space-y-4">
                      {differentiators.map((item) => (
                        <li key={item.text} className="flex items-center gap-3 text-text-light/60">
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
                    <p className="text-text-light/40 text-xs">
                      We sell exclusively to sign companies, sign shops, and trade professionals. We do not sell to the general public.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-20 lg:hidden" />
      </div>
    </>
  );
}
