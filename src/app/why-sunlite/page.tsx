import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Shield,
  SearchCheck,
  Handshake,
  Clock,
  Truck,
  Award,
  Globe,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Why Sign Shops Choose Sunlite — Wholesale Sign Manufacturer",
  description:
    "Discover why sign shops across the USA and Canada choose Sunlite Signs as their wholesale partner. German engineering, UL listed products, trade pricing, and a wholesale-only model — we never compete with you.",
  openGraph: {
    title: "Why Sign Shops Choose Sunlite — Wholesale Sign Manufacturer",
    description:
      "German engineering. UL listed. Wholesale only. Trade pricing for sign shops — we manufacture, you sell. Zero retail competition guaranteed.",
    url: "https://sunlitesigns.com/why-sunlite",
  },
};

const pillars = [
  {
    icon: Wrench,
    title: "German Engineering Heritage",
    description:
      "Our partnership with LKF Lichtwerbung in Nuremberg infuses decades of German precision into every sign we build. Available exclusively to the trade — this engineering advantage is yours to sell.",
    href: "/why-sunlite/german-engineering",
    image: "LKF Lichtwerbung Nuremberg facility exterior",
  },
  {
    icon: Shield,
    title: "UL Listed and Certified",
    description:
      "Every illuminated sign ships with UL certification. Your clients get safety assurance and code compliance. As our wholesale partner, you get peace of mind and a competitive edge in every bid.",
    href: "/why-sunlite/ul-listing",
    image: "UL certification badge and testing equipment",
  },
  {
    icon: SearchCheck,
    title: "Rigorous Quality Process",
    description:
      "From raw material selection to final inspection, every step is documented and controlled. Multi-point quality checks ensure zero defects reach your shop. We manufacture. You sell with confidence.",
    href: "/why-sunlite/quality-process",
    image: "Quality inspection of channel letters in production",
  },
  {
    icon: Handshake,
    title: "Wholesale Only — We Never Compete With You",
    description:
      "We sell exclusively to the trade. No retail storefront. No direct-to-consumer sales. No exceptions. Your clients stay yours. Your margins stay yours. Zero retail competition — guaranteed.",
    href: "/why-sunlite/wholesale-only",
    image: "Crated signs ready for wholesale shipment",
  },
];

const trustStats = [
  { value: "48 hrs", label: "Quote turnaround" },
  { value: "3 weeks", label: "Door-to-door delivery" },
  { value: "100%", label: "Wholesale only" },
  { value: "USA & CA", label: "Trade accounts served" },
];

export default function WhySunlitePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite" },
            ]}
          />

          <AnimatedSection>
            <div className="max-w-3xl mt-8">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                Why Sign Shops{" "}
                <span className="text-brand-gold">Choose Sunlite</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl font-body leading-relaxed">
                We manufacture. You sell. Simple. German engineering heritage,
                UL listed certification, a quality process built on precision,
                and a wholesale-only model that guarantees we never compete with
                you. Available exclusively to the trade.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TRUST STATS BAR */}
      <section className="bg-bg-navy border-t border-white/10 border-b border-b-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustStats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 font-heading uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PILLAR CARDS */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Four Pillars of the Sunlite Wholesale Advantage
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                Every decision we make is guided by one principle: empower our
                trade partners to win more business. These are not aspirational
                — they are operational.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-16 md:space-y-24">
            {pillars.map((pillar, index) => (
              <AnimatedSection key={pillar.title}>
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-16`}
                >
                  <div className="flex-1 w-full">
                    <PlaceholderImage
                      label={pillar.image}
                      className="rounded-xl"
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                      <pillar.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-text-dark/70 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center gap-2 text-brand-gold font-heading font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Built for Sign Shops. Nobody Else.
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Sunlite Signs LLC is a Florida-based wholesale-only manufacturer
                of illuminated signage. We partner with LKF Lichtwerbung in
                Nuremberg, Germany, to bring European engineering precision
                exclusively to trade accounts in North America. Every product is
                UL listed. Every order ships within four weeks. And every
                relationship is built on one guarantee: we will never compete
                with you for retail business.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-heading uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-gold" />
                  German Engineering
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-gold" />
                  UL Listed
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  48-Hour Quotes
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  3-Week Door-to-Door Delivery
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-gold" />
                  Trade Accounts Only
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      <CTASection />
    </>
  );
}
