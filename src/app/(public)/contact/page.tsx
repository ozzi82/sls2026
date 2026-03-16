import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Clock,
  MapPin,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "./ContactForm";
import CTASection from "@/components/CTASection";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("contact");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    alternates: { canonical: config.seo.canonical },
  };
}

export default function ContactPage() {
  const config = loadStaticPageConfig("contact");
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const heroData = getBlock("hero")!.data as any;
  const contactInfoData = getBlock("contact-info")!.data as any;
  const formData = getBlock("form")!.data as any;
  const ctaData = getBlock("cta")!.data as any;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Sunlite Signs — Wholesale Trade Inquiries",
    description:
      "Contact Sunlite Signs LLC for wholesale trade inquiries. Sign shops only.",
    url: "https://sunlitesigns.com/contact",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Sunlite Signs LLC",
      description:
        "Florida-based wholesale-only LED signage manufacturer. Channel letters, blade signs, flat cut letters, and lightboxes exclusively for sign shops.",
      url: "https://sunlitesigns.com",
      telephone: "+1-689-294-0912",
      email: "hello@sunlitesigns.com",
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
    },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-6 sm:px-10 lg:px-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Contact" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max text-center px-6 sm:px-10 lg:px-16">
              <AnimatedSection>
                <p className="micro-label mb-6">
                  {heroData.badge}
                </p>
                <div className="gold-line mx-auto mb-8" />
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-[-0.02em]">
                  {heroData.h1} <span className="text-brand-gold">{heroData.h1Highlight}</span>
                </h1>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                  {heroData.subtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT INFO CARDS — Light section
          ═══════════════════════════════════════════ */}
      <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />

      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfoData.cards.map((item: any, index: number) => {
                const Icon = getIconComponent(item.icon);
                return (
                  <AnimatedSection key={item.title} delay={index * 0.1}>
                    <div className="bg-white rounded-xl p-8 border border-black/5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-400">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-5">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
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
                      <p className="text-text-dark/60 text-sm">{item.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FORM + SIDEBAR — Dark section
          ═══════════════════════════════════════════ */}
      <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />

      <section className="px-6 sm:px-10 lg:px-16 pb-16">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
                  Send Us a <span className="text-brand-gold">{formData.headingHighlight}</span>
                </h2>
                <p className="text-white/60 mb-8 max-w-lg">
                  {formData.description.split("dedicated wholesale quote form")[0]}
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
                <div className="sticky top-28 space-y-6">
                  {/* Wholesale Notice */}
                  <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-5 h-5 text-brand-gold" />
                      <h3 className="text-lg font-heading font-semibold text-brand-gold">
                        Wholesale Accounts Only
                      </h3>
                    </div>
                    {formData.sidebar.notices.map((notice: string, i: number) => (
                      <p key={i} className="text-white/60 text-sm mb-2">
                        {notice}
                      </p>
                    ))}
                  </div>

                  {/* Business Hours */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <Clock className="w-5 h-5 text-brand-gold" />
                      <h3 className="text-lg font-heading font-semibold text-white">
                        Business Hours
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {formData.sidebar.businessHours.map((item: any) => (
                        <li
                          key={item.day}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-white/60">{item.day}</span>
                          <span
                            className={
                              item.hours === "Closed"
                                ? "text-white/30"
                                : "text-white/80"
                            }
                          >
                            {item.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden">
                    <PlaceholderImage
                      label="Map — Sunlite Signs, Florida"
                      className="rounded-none border-0"
                      aspectRatio="aspect-[4/3]"
                    />
                    <div className="p-4">
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        Florida, USA — Wholesale shipping to all 50 states and Canada
                      </p>
                    </div>
                  </div>

                  {/* Quote CTA */}
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">
                      Need Trade Pricing?
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      {formData.sidebar.ctaText}
                    </p>
                    <Link
                      href="/get-a-quote"
                      className="btn-text-link group"
                    >
                      Get Wholesale Pricing
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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
      <CTASection
        heading={ctaData.heading}
        highlight={ctaData.headingHighlight}
        description={ctaData.description}
      />
    </>
  );
}
