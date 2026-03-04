import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Wholesale Trade Inquiries Only | Sunlite Signs",
  description:
    "Contact Sunlite Signs LLC for wholesale trade inquiries. Sign shops only — trade pricing on channel letters, blade signs, flat cut letters, and custom LED signage. Wholesale accounts welcome.",
  openGraph: {
    title: "Contact Sunlite Signs — Wholesale Trade Inquiries Only",
    description:
      "Trade inquiries only. Contact Sunlite Signs for wholesale signage pricing. Sign shops across the USA and Canada — wholesale accounts welcome.",
    url: "https://sunlitesigns.com/contact",
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(123) 456-7890",
    href: "tel:+1234567890",
    description: "Mon-Fri, 8am-5pm EST — Trade inquiries only",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@sunlitesigns.com",
    href: "mailto:info@sunlitesigns.com",
    description: "Wholesale accounts — response within 1 business day",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Florida, USA",
    href: undefined,
    description: "Wholesale manufacturing facility — no retail showroom",
  },
];

const businessHours = [
  { day: "Monday", hours: "8:00 AM - 5:00 PM EST" },
  { day: "Tuesday", hours: "8:00 AM - 5:00 PM EST" },
  { day: "Wednesday", hours: "8:00 AM - 5:00 PM EST" },
  { day: "Thursday", hours: "8:00 AM - 5:00 PM EST" },
  { day: "Friday", hours: "8:00 AM - 5:00 PM EST" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sunlite Signs LLC",
    description:
      "Florida-based wholesale-only LED signage manufacturer. Channel letters, blade signs, flat cut letters, and lightboxes exclusively for sign shops.",
    url: "https://sunlitesigns.com",
    telephone: "+1-234-567-890",
    email: "info@sunlitesigns.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-navy/20 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Contact" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max text-center">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only</span>
                </div>
                <div className="gold-line mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                  Trade Inquiries Only
                </h1>
                <p className="text-lg text-text-light/60 max-w-2xl mx-auto">
                  Wholesale accounts welcome. Looking for trade pricing on
                  channel letters, blade signs, or custom LED signage? You are
                  in the right place. We work exclusively with sign shops and
                  trade professionals. We manufacture. You sell.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-black/5 text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-5">
                    <item.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                    {item.title}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-brand-gold font-heading font-medium hover:text-brand-gold-light transition-colors block mb-2"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-text-dark font-heading font-medium mb-2">
                      {item.value}
                    </p>
                  )}
                  <p className="text-text-dark/50 text-sm">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                  Send Us a Trade Inquiry
                </h2>
                <p className="text-text-light/60 mb-8 max-w-lg">
                  For wholesale partnerships, trade account setup, or technical
                  questions. Need project-specific trade pricing? Use our{" "}
                  <Link
                    href="/get-a-quote"
                    className="text-brand-gold hover:text-brand-gold-light underline underline-offset-2 transition-colors"
                  >
                    dedicated wholesale quote form
                  </Link>{" "}
                  for faster response.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <ContactForm />
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.15}>
                <div className="sticky top-28 space-y-8">
                  {/* Wholesale Notice */}
                  <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-5 h-5 text-brand-gold" />
                      <h3 className="text-lg font-heading font-semibold text-brand-gold">
                        Wholesale Accounts Only
                      </h3>
                    </div>
                    <p className="text-text-light/50 text-sm mb-2">
                      Sunlite Signs sells exclusively to sign shops and trade
                      professionals. We do not sell to the general public.
                    </p>
                    <p className="text-text-light/50 text-sm">
                      If you are a business or property owner looking for
                      signage, please contact a sign shop in your area.
                    </p>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <Clock className="w-5 h-5 text-brand-gold" />
                      <h3 className="text-lg font-heading font-semibold text-text-light">
                        Business Hours
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {businessHours.map((item) => (
                        <li
                          key={item.day}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-text-light/60">{item.day}</span>
                          <span
                            className={
                              item.hours === "Closed"
                                ? "text-text-light/30"
                                : "text-text-light/80"
                            }
                          >
                            {item.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <PlaceholderImage
                      label="Map — Sunlite Signs, Florida"
                      className="rounded-none border-0"
                      aspectRatio="aspect-[4/3]"
                    />
                    <div className="p-4">
                      <p className="text-text-light/50 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        Florida, USA — Wholesale shipping to all 50 states and Canada
                      </p>
                    </div>
                  </div>

                  {/* Quote CTA */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-text-light mb-2">
                      Need Trade Pricing?
                    </h3>
                    <p className="text-text-light/50 text-sm mb-4">
                      For project-specific wholesale pricing with material specs
                      and delivery timeline, use our dedicated trade quote form.
                    </p>
                    <Link
                      href="/get-a-quote"
                      className="inline-flex items-center gap-2 text-brand-gold font-heading font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all"
                    >
                      Get Trade Pricing <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Your Wholesale Partner Awaits
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Join sign shops across the USA and Canada who trust Sunlite
                Signs for German-engineered, UL-listed signage at wholesale
                trade pricing. We never compete with you — guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary gap-2">
                  Request Wholesale Pricing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  View Trade Partner Work
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom spacer for mobile CTA bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
