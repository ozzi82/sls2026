import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  FileCheck2,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Zap,
  ClipboardCheck,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "UL Listed Wholesale Signs — Trade Pricing, Safety Certified | Sunlite Signs",
  description:
    "Every illuminated sign from Sunlite Ships UL listed — available exclusively to wholesale trade accounts. Sign shops get certified products at trade pricing with zero retail competition.",
  openGraph: {
    title: "UL Listed Wholesale Signs — Trade Pricing, Safety Certified",
    description:
      "Every illuminated Sunlite sign ships UL listed. Wholesale trade pricing for sign shops only — we never compete with you.",
    url: "https://sunlitesigns.com/why-sunlite/ul-listing",
  },
};

const ulBenefits = [
  {
    icon: ShieldCheck,
    title: "Code Compliance for Your Clients",
    description:
      "Most municipalities require UL listed electrical signage. As your wholesale partner, our certification means your installations meet code requirements from day one — helping you win bids and avoid costly rejections.",
  },
  {
    icon: FileCheck2,
    title: "Reduced Liability for Your Shop",
    description:
      "UL listing provides documented third-party verification of product safety. When you source wholesale from Sunlite, you have independent certification backing every product you install.",
  },
  {
    icon: Building2,
    title: "Win Bigger Projects",
    description:
      "Property managers, franchise owners, and corporate clients demand UL listed signage. Our wholesale trade pricing on certified products positions your shop to compete for — and win — premium contracts.",
  },
  {
    icon: Zap,
    title: "Electrical Safety Guaranteed",
    description:
      "UL testing verifies that electrical components, wiring, and connections meet strict safety standards. Every sign we ship to our trade partners has been validated for proper grounding, insulation, and thermal management.",
  },
];

const whatULMeans = [
  "Independent third-party testing by Underwriters Laboratories",
  "Evaluation of electrical safety, fire risk, and shock hazard",
  "Ongoing factory surveillance and follow-up inspections",
  "Compliance with UL 48 (Electric Signs) and related standards",
  "Each sign ships with a UL label traceable to our wholesale facility",
  "Documentation available for your permit applications and inspections",
];

const comparisonPoints = [
  {
    without: "Risk of permit rejection at installation site",
    with: "Pre-certified for code compliance in most jurisdictions",
  },
  {
    without: "No third-party verification of electrical safety",
    with: "Independent lab testing of all electrical components",
  },
  {
    without: "Full liability exposure on safety questions",
    with: "Third-party certification reduces your liability exposure",
  },
  {
    without: "May not meet franchise or corporate brand requirements",
    with: "Meets specification requirements of major brands",
  },
  {
    without: "No ongoing factory quality surveillance",
    with: "Regular UL follow-up inspections of our wholesale facility",
  },
];

export default function ULListingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,89,12,0.08),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite", href: "/why-sunlite" },
              { name: "UL Listing" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                UL Listed.{" "}
                <span className="text-brand-gold">Every Sign. Every Time.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Safety is not an upgrade or an add-on. Every illuminated sign
                that leaves our wholesale facility carries UL certification.
                For your shop, that means code compliance, reduced liability,
                and a certified product at trade pricing that you can install
                with confidence and mark up with pride.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                </Link>
                <Link href="/why-sunlite/quality-process" className="btn-secondary">
                  Our Quality Process
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage
                label="UL certification label on Sunlite channel letter"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHAT UL LISTING MEANS */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
                What UL Listing Actually Means
              </h2>
              <p className="text-text-dark/60 leading-relaxed mb-8">
                UL listing is not a self-certification or a paper exercise. It
                involves rigorous third-party testing by Underwriters
                Laboratories. As your wholesale sign partner, we handle the
                entire certification process — you just install and sell.
              </p>
              <div className="space-y-4">
                {whatULMeans.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-text-dark/70 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <PlaceholderImage
                label="UL testing laboratory and inspection process"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Why UL Listing Matters for Your Trade Business
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                UL certification is not just about the product. It directly
                impacts your shop&apos;s ability to win bids, reduce liability,
                and build a reputation as a premium sign shop partner.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ulBenefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/20 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                    <benefit.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                UL Listed vs. Non-Certified Signs
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                The difference between certified and non-certified products is
                not abstract. For your trade business, it has real consequences
                on every installation.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-xl shadow-sm border border-black/[0.04] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 border-b border-black/5">
                <div className="p-6 bg-red-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-accent-red" />
                    <span className="font-heading font-semibold text-text-dark text-sm uppercase tracking-wider">
                      Without UL Listing
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-brand-gold/5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-gold" />
                    <span className="font-heading font-semibold text-text-dark text-sm uppercase tracking-wider">
                      With Sunlite Wholesale UL Listing
                    </span>
                  </div>
                </div>
              </div>
              {/* Rows */}
              {comparisonPoints.map((point, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 ${
                    index < comparisonPoints.length - 1
                      ? "border-b border-black/5"
                      : ""
                  }`}
                >
                  <div className="p-6">
                    <p className="text-text-dark/50 text-sm">{point.without}</p>
                  </div>
                  <div className="p-6 bg-brand-gold/5">
                    <p className="text-text-dark/80 text-sm font-medium">
                      {point.with}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESS OVERVIEW */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <PlaceholderImage
                label="Electrical testing and safety verification at Sunlite facility"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Our UL Compliance Process
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                UL listing is built into every stage of our wholesale
                manufacturing process. From approved component sourcing to
                final electrical testing, our trade partners receive a fully
                certified product every time. We handle the certification —
                you handle the client relationship.
              </p>
              <div className="space-y-4">
                {[
                  { icon: ClipboardCheck, text: "Component sourcing from UL-recognized suppliers" },
                  { icon: Zap, text: "Electrical assembly following UL 48 requirements" },
                  { icon: Shield, text: "In-line testing at multiple production stages" },
                  { icon: FileCheck2, text: "Final inspection and UL label application" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <p className="text-white/70 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      <CTASection />
    </>
  );
}
