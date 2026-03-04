import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Lightbulb,
  Users,
  Award,
  Target,
  Handshake,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Sunlite Signs — Wholesale Channel Letter Manufacturer",
  description:
    "Sunlite Signs LLC is a wholesale-only LED signage manufacturer based in Florida. Founded on one principle: never compete with our customers. German engineering heritage, UL listed, trade pricing for sign shops only.",
  openGraph: {
    title: "About Sunlite Signs — Wholesale Channel Letter Manufacturer",
    description:
      "Florida wholesale-only sign manufacturer. Founded on one principle: never compete with our customers. Trade pricing, German engineering, UL listed — sign shops only.",
    url: "https://sunlitesigns.com/about",
  },
};

const values = [
  {
    icon: Shield,
    title: "Quality Without Compromise",
    description:
      "Every sign leaves our wholesale facility UL listed and rigorously inspected. We do not cut corners on materials, engineering, or craftsmanship — because our trade partners stake their reputation on every product we ship.",
  },
  {
    icon: Handshake,
    title: "Wholesale Integrity — No Exceptions",
    description:
      "We sell exclusively to the trade. We will never compete with our partners for retail customers. No retail storefront. No direct-to-consumer sales. Your business stays your business. Period.",
  },
  {
    icon: Lightbulb,
    title: "Innovation for the Trade",
    description:
      "From our EdgeLuxe trimless technology to advanced LED solutions, we invest in R&D that gives our wholesale partners a competitive edge. Available exclusively through the trade.",
  },
  {
    icon: Target,
    title: "Precision Engineering at Trade Pricing",
    description:
      "Our German engineering heritage is not just a tagline. It defines our tolerances, our processes, and our commitment to perfection — all delivered at wholesale pricing that protects your margins.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sunlite Signs LLC",
    description:
      "Florida-based wholesale-only LED signage manufacturer with German engineering heritage. UL listed channel letters, blade signs, flat cut letters, and lightboxes exclusively for sign shops across the USA and Canada.",
    url: "https://sunlitesigns.com",
    telephone: "+1-234-567-890",
    email: "info@sunlitesigns.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    knowsAbout: [
      "Wholesale Channel Letters",
      "Wholesale Halo Lit Signs",
      "Trimless Channel Letters",
      "Wholesale Blade Signs",
      "Wholesale Flat Cut Letters",
      "Wholesale LED Lightboxes",
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
                { name: "About" },
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
                  About Sunlite Signs
                </h1>
                <p className="text-lg text-text-light/60 max-w-2xl mx-auto">
                  A wholesale-only manufacturer founded on one principle:{" "}
                  <span className="text-brand-gold font-semibold">never compete with our customers.</span>{" "}
                  German engineering precision. UL listed products. Trade pricing
                  exclusively for sign shops.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <AnimatedSection className="flex-1">
              <PlaceholderImage
                label="Sunlite Signs Florida facility exterior"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection className="flex-1" delay={0.1}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
                Built for the Trade. Nobody Else.
              </h2>
              <div className="space-y-4 text-text-dark/70 leading-relaxed">
                <p>
                  Sunlite Signs LLC is a wholesale-only LED signage manufacturer
                  based in Florida. We exist for one reason: to give sign shops
                  across the USA and Canada a manufacturing partner they can rely
                  on for quality, consistency, speed, and the absolute guarantee
                  that we will never compete with them for retail business.
                </p>
                <p>
                  Every product we build is UL listed and engineered to the
                  highest standards. From front lit and halo lit channel letters
                  to our proprietary EdgeLuxe trimless technology, blade signs,
                  flat cut letters, and lightboxes — everything we manufacture is
                  available exclusively through the trade at wholesale pricing.
                </p>
                <p className="font-semibold text-text-dark">
                  We manufacture. You sell. Your clients stay yours. Your margins
                  stay yours. Zero retail competition — guaranteed.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* GERMAN ENGINEERING HERITAGE */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
            <AnimatedSection className="flex-1">
              <PlaceholderImage
                label="LKF Lichtwerbung facility, Nuremberg, Germany"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection className="flex-1" delay={0.1}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-6">
                German Engineering, Exclusively for the Trade
              </h2>
              <div className="space-y-4 text-text-light/60 leading-relaxed">
                <p>
                  Our partnership with LKF Lichtwerbung in Nuremberg, Germany,
                  is not a marketing tagline. It is the foundation of how we
                  design, engineer, and manufacture every sign — and this
                  engineering advantage is available exclusively to our
                  wholesale trade partners.
                </p>
                <p>
                  LKF brings decades of German precision engineering to our
                  processes, from material selection and LED integration to
                  structural design and quality control. This partnership gives
                  our sign shop partners a manufacturing DNA that no retail
                  competitor can access.
                </p>
                <p>
                  The result is signage that is built tighter, lasts longer, and
                  installs cleaner. Your clients see the difference. Your
                  installers feel it. Your margins reflect the premium.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-lg">
                <Award className="w-6 h-6 text-brand-gold flex-shrink-0" />
                <span className="text-sm text-brand-gold font-heading font-medium">
                  LKF Lichtwerbung Partnership — Available Exclusively to Trade Accounts
                </span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                The Team Behind Your Wholesale Partner
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Experienced professionals dedicated to wholesale signage
                excellence and the success of our trade partners.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5">
                <PlaceholderImage
                  label="Ozan — Founder / Principal"
                  className="rounded-none border-0"
                  aspectRatio="aspect-[4/5]"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-heading font-bold text-text-dark mb-1">
                    Ozan
                  </h3>
                  <p className="text-brand-gold font-heading text-sm font-medium uppercase tracking-wider mb-3">
                    Founder
                  </p>
                  <p className="text-text-dark/60 text-sm leading-relaxed">
                    With deep roots in the sign industry, Ozan founded Sunlite
                    Signs on one conviction: a wholesale manufacturer should
                    never compete with the sign shops it serves. That principle
                    drives every decision we make.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5">
                <PlaceholderImage
                  label="Sunlite Signs production team"
                  className="rounded-none border-0"
                  aspectRatio="aspect-[4/5]"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-heading font-bold text-text-dark mb-1">
                    Our Production Team
                  </h3>
                  <p className="text-brand-gold font-heading text-sm font-medium uppercase tracking-wider mb-3">
                    Skilled Fabricators
                  </p>
                  <p className="text-text-dark/60 text-sm leading-relaxed">
                    Our skilled fabricators, engineers, and quality inspectors
                    work together to ensure every wholesale sign meets the
                    standards our trade partners expect. Your success is their
                    daily mission.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FACILITY */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <AnimatedSection className="flex-1">
              <PlaceholderImage
                label="Sunlite Signs manufacturing floor — CNC, bending, LED assembly"
                className="rounded-xl"
                aspectRatio="aspect-video"
              />
            </AnimatedSection>
            <AnimatedSection className="flex-1" delay={0.1}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-6">
                Our Wholesale Facility
              </h2>
              <div className="space-y-4 text-text-light/60 leading-relaxed">
                <p>
                  Our Florida manufacturing facility is equipped with
                  state-of-the-art CNC machinery, precision bending equipment,
                  and dedicated LED assembly stations. Every stage of production
                  is managed in-house for complete quality control — exclusively
                  serving trade accounts.
                </p>
                <p>
                  From raw materials to finished, UL-listed signs crated for
                  safe shipping, our wholesale facility is built to handle
                  projects of any scale with the consistency and speed that
                  sign shop partners require. No retail walk-ins. No consumer
                  showroom. Just manufacturing, for the trade.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <p className="text-2xl font-heading font-bold text-brand-gold">UL</p>
                  <p className="text-xs text-text-light/50 uppercase tracking-wider mt-1">
                    Listed Facility
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <p className="text-2xl font-heading font-bold text-brand-gold">4 Wk</p>
                  <p className="text-xs text-text-light/50 uppercase tracking-wider mt-1">
                    Lead Time
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <p className="text-2xl font-heading font-bold text-brand-gold">USA</p>
                  <p className="text-xs text-text-light/50 uppercase tracking-wider mt-1">
                    & Canada Shipping
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <p className="text-2xl font-heading font-bold text-brand-gold">100%</p>
                  <p className="text-xs text-text-light/50 uppercase tracking-wider mt-1">
                    Trade Accounts Only
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* VALUES / MISSION */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                What Drives Us
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto">
                Our values define every wholesale sign we build and every
                trade partnership we maintain.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="flex gap-5 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brand-gold/20 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-brand-gold" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-light mb-2">
                      {value.title}
                    </h3>
                    <p className="text-text-light/50 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <Users className="w-10 h-10 text-brand-gold mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text-dark/70 leading-relaxed">
                To be the most trusted wholesale signage manufacturer in North
                America by combining German engineering heritage with
                American manufacturing capability — exclusively for the trade.
                We empower sign shops with premium products, trade pricing,
                reliable lead times, and an unbreakable commitment: we will
                never compete with our customers. We manufacture. You sell.
                Simple.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
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
                Partner with a Wholesale Manufacturer That Will Never Compete With You
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to work with a wholesale partner that holds itself to
                the highest standards — and stays out of your market? Get
                trade pricing today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary gap-2">
                  Request Wholesale Pricing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
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
