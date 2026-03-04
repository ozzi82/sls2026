import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  ShieldOff,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  Lock,
  Store,
  Ban,
  DollarSign,
  Eye,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "We Sell Wholesale Only. No Exceptions. — Sunlite Signs",
  description:
    "Sunlite Signs is 100% wholesale only. No retail storefront. No direct-to-consumer sales. No exceptions. Trade pricing for sign shops only — we never compete with you. Your margin is our priority.",
  openGraph: {
    title: "We Sell Wholesale Only. No Exceptions. — Sunlite Signs",
    description:
      "100% wholesale only. No retail. No direct sales. No exceptions. Trade pricing exclusively for sign shops — we manufacture, you sell, your margins are protected.",
    url: "https://sunlitesigns.com/why-sunlite/wholesale-only",
  },
};

const manifestoSections = [
  {
    icon: ShieldOff,
    title: "We Never Compete With You",
    description:
      "This is not a suggestion. It is a rule. We do not bid on projects. We do not quote end users. We do not have a sales team calling on your clients. When a property owner, business, or contractor contacts us directly, we send them to a sign shop. Period. Your market is yours. We stay in our lane — manufacturing — and we stay there permanently.",
  },
  {
    icon: Eye,
    title: "Your Clients Stay Yours",
    description:
      "We will never know who your end clients are unless you tell us. We do not ask. We do not track. We do not market to them. Your client relationships are your most valuable asset, and we will never interfere with them. Not today. Not ever. Your business intelligence stays your business intelligence.",
  },
  {
    icon: Store,
    title: "No Retail Storefront",
    description:
      "We do not have a showroom. We do not have a consumer website. We do not have a retail price list. There is no way for a member of the public to buy a sign from us. We are invisible to your end customers by design. When someone finds us online, the only path forward is through a sign shop partner like you.",
  },
  {
    icon: Ban,
    title: "No Direct-to-Consumer Sales",
    description:
      "Not through our website. Not through a third party. Not through a marketplace. Not through a back channel. We have zero direct-to-consumer sales channels and we never will. This is not a policy we are testing — it is a founding principle of our company. We manufacture. You sell. That line does not blur.",
  },
  {
    icon: DollarSign,
    title: "Your Margin Is Our Priority",
    description:
      "Our wholesale pricing is structured to protect your margins. We do not publish retail pricing. We do not undercut your quotes. We do not offer volume discounts to end users who try to go around you. Your ability to mark up our products and run a profitable sign shop is the entire reason we exist. When your margins are healthy, you order more. When you order more, we grow. The math is simple.",
  },
];

const whatYouGet = [
  "Wholesale trade pricing with healthy margins for your business",
  "No minimum order requirements to get started",
  "48-hour detailed quotes with material specifications",
  "3-week door-to-door delivery to your shop or job site",
  "Dedicated account support from sign industry professionals",
  "UL listed products that meet code requirements on every job",
  "Custom crating for safe, damage-free delivery",
  "Technical support for installation questions",
  "Zero retail competition from us — guaranteed",
  "Your client relationships are 100% yours — always",
];

const whatWeNeverDo = [
  "Sell directly to end users, property owners, or businesses",
  "Publish retail pricing or consumer-facing product pages",
  "Compete with your shop on any project, in any market, ever",
  "Share your pricing, project details, or client information",
  "Market to or solicit your end customers",
  "Operate a retail storefront, showroom, or consumer website",
  "Offer direct-to-consumer sales through any channel",
];

export default function WholesaleOnlyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-navy/20 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite", href: "/why-sunlite" },
              { name: "Wholesale Only" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-text-light leading-tight mb-6">
                We Sell Wholesale Only.{" "}
                <span className="text-brand-gold">No Exceptions.</span>
              </h1>
              <p className="text-lg text-text-light/70 leading-relaxed mb-4">
                This is not a flexible policy. It is a founding principle.
                Sunlite Signs sells exclusively to sign shops and trade
                professionals. No retail sales. No direct-to-consumer channels.
                No competing with your business. Not now. Not ever.
              </p>
              <p className="text-xl text-brand-gold font-heading font-semibold mb-8">
                We manufacture. You sell. Simple.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                </Link>
                <Link href="/products" className="btn-secondary">
                  Browse Trade Catalog
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage
                label="Sunlite team member shaking hands with sign shop partner"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MANIFESTO STATEMENT */}
      <section className="bg-navy border-t border-white/10 border-b border-b-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-heading font-bold text-text-light leading-snug">
                &ldquo;Every sign we build is sold through a sign shop.{" "}
                <span className="text-brand-gold">Every single one.</span>{" "}
                We do not sell to the public. We do not have retail pricing.
                We do not compete with our partners. This is not negotiable.&rdquo;
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MANIFESTO SECTIONS */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Our Wholesale Commitment — In Black and White
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                These are not marketing statements. They are operational
                commitments that govern how we run our business every single day.
                Read them carefully. We mean every word.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {manifestoSections.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.05}>
                <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-black/5 hover:border-brand-gold/20 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                        <item.icon className="w-6 h-6 text-brand-gold" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-text-dark mb-3">
                        {item.title}
                      </h3>
                      <p className="text-text-dark/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET / WHAT WE NEVER DO */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                The Trade Partner Guarantee
              </h2>
              <p className="text-text-light/60 max-w-2xl mx-auto">
                Crystal clear. No fine print. No loopholes. Here is exactly
                what you get and exactly what we will never do.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                  <h3 className="text-xl font-heading font-semibold text-text-light">
                    What You Get as a Trade Partner
                  </h3>
                </div>
                <div className="space-y-4">
                  {whatYouGet.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                      <p className="text-text-light/70 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-accent-red" />
                  <h3 className="text-xl font-heading font-semibold text-text-light">
                    What We Will Never Do — Ever
                  </h3>
                </div>
                <div className="space-y-4">
                  {whatWeNeverDo.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-accent-red/60 flex-shrink-0 mt-1" />
                      <p className="text-text-light/70 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HOW THE PARTNERSHIP WORKS */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <PlaceholderImage
                label="Sign shop receiving custom-crated wholesale shipment"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
                How the Wholesale Partnership Works
              </h2>
              <p className="text-text-dark/60 leading-relaxed mb-6">
                Working with Sunlite is straightforward. No complicated
                onboarding, no volume commitments, no long-term contracts.
                Just a wholesale partner that stays in its lane and delivers
                product you can sell at a healthy margin.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Send us your project",
                    detail: "Share drawings, specs, or even a napkin sketch. We work with what you have. Your client never knows we exist.",
                  },
                  {
                    step: "2",
                    title: "Get trade pricing in 48 hours",
                    detail: "You receive wholesale pricing with material specs. No retail markup. No obligation. Just transparent trade pricing.",
                  },
                  {
                    step: "3",
                    title: "We build, you sell and install",
                    detail: "Your signs are fabricated, UL listed, and shipped to your door in about 3 weeks door to door. Your brand. Your client. Your margin.",
                  },
                  {
                    step: "4",
                    title: "Repeat and grow your business",
                    detail: "As you send more projects, we learn your preferences. The process gets smoother. Your throughput increases. Your profits grow.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <span className="text-brand-gold font-heading font-bold text-xs">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-text-dark mb-1">
                        {item.title}
                      </h4>
                      <p className="text-text-dark/60 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-6">
                Zero Retail Competition — Guaranteed
              </h2>
              <p className="text-text-light/60 leading-relaxed mb-8">
                The wholesale-only model is not just a sales channel decision.
                It is a trust covenant. When you partner with Sunlite, you
                know — with absolute certainty — that your manufacturer will
                never become your competitor. Your clients stay your clients.
                Your margins stay your margins. Your market stays your market.
                That clarity is the foundation of every relationship we build.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-heading uppercase tracking-wider text-text-light/40">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-gold" />
                  Wholesale Only
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-brand-gold" />
                  Trade Accounts Only
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  48-Hour Trade Quotes
                </span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-gold" />
                  Dedicated Trade Support
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Ready to Partner with a Manufacturer That Will Never Compete With You?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                No minimum orders. No contracts. No obligations. No retail
                competition. Just wholesale trade pricing from a dedicated
                sign shop partner. We manufacture. You sell. Simple.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary text-base px-10 py-5">
                  Request Wholesale Pricing
                </Link>
                <Link
                  href="/products"
                  className="btn-secondary text-base px-10 py-5"
                >
                  Browse Trade Catalog <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-20 lg:hidden" />
    </>
  );
}
