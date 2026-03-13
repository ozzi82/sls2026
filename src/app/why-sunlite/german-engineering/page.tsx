import { Metadata } from "next";
import Link from "next/link";
import {
  Cog,
  Factory,
  Ruler,
  Microscope,
  Globe,
  Award,
  CheckCircle2,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "German Engineering Heritage — Wholesale Sign Manufacturer | Sunlite Signs",
  description:
    "Sunlite Signs partners with LKF Lichtwerbung in Nuremberg, Germany, bringing decades of European precision engineering exclusively to wholesale trade accounts. Sign shops only — trade pricing available.",
  openGraph: {
    title: "German Engineering Heritage — Wholesale Sign Manufacturer",
    description:
      "Decades of German precision engineering from LKF Lichtwerbung, available exclusively to trade accounts. Wholesale sign manufacturing for sign shops.",
    url: "https://sunlitesigns.com/why-sunlite/german-engineering",
  },
};

const engineeringPrinciples = [
  {
    icon: Ruler,
    title: "Precision Tolerances",
    description:
      "Every component is manufactured to tight dimensional tolerances. Letters fit flush. Returns align. Faces sit true. As your wholesale partner, we deliver the details that let you charge premium prices.",
  },
  {
    icon: Factory,
    title: "Process-Driven Manufacturing",
    description:
      "German manufacturing culture is rooted in repeatable processes. We do not rely on individual skill alone — we rely on systems that produce consistent results for our trade partners, order after order.",
  },
  {
    icon: Microscope,
    title: "Material Science Expertise",
    description:
      "Decades of research into substrates, adhesives, LED modules, and finishes. LKF's material knowledge means every component is selected for longevity — giving your clients signs that last and protecting your reputation.",
  },
  {
    icon: Cog,
    title: "Continuous Improvement",
    description:
      "The German engineering mindset does not stop at good enough. Every production cycle feeds data back into the process. Our trade partners benefit from manufacturing that gets better with every run.",
  },
];

const heritageTimeline = [
  {
    label: "Nuremberg, Germany",
    detail: "Home of LKF Lichtwerbung — a name synonymous with precision signage manufacturing in the European market.",
  },
  {
    label: "Decades of Expertise",
    detail: "LKF has spent decades refining the craft of illuminated signage, from materials research to production engineering.",
  },
  {
    label: "Transatlantic Partnership",
    detail: "Sunlite Signs brings LKF's engineering DNA exclusively to North American trade accounts, adapting European precision for wholesale sign shop partners.",
  },
  {
    label: "Florida Manufacturing",
    detail: "Our Florida-based wholesale facility combines German methodology with American efficiency, delivering exclusively to sign shops across the continent.",
  },
];

export default function GermanEngineeringPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,89,12,0.08),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite", href: "/why-sunlite" },
              { name: "German Engineering" },
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
                German Engineering.{" "}
                <span className="text-brand-gold">American Execution.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Our partnership with LKF Lichtwerbung in Nuremberg, Germany, is
                not a marketing story. It is the foundation of how we design,
                engineer, and manufacture every sign — available exclusively to
                our wholesale trade partners. We manufacture. You sell.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                </Link>
                <Link href="/why-sunlite/quality-process" className="btn-secondary">
                  See Our Quality Process
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage
                label="LKF Lichtwerbung facility in Nuremberg, Germany"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LKF PARTNERSHIP */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                The LKF Lichtwerbung Partnership
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                Nuremberg has been a center of German craftsmanship for
                centuries. LKF Lichtwerbung continues that tradition in the
                illuminated signage industry — and our trade partners get
                exclusive access to this engineering heritage.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heritageTimeline.map((item, index) => (
              <AnimatedSection key={item.label} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-black/[0.04] h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <span className="text-brand-gold font-heading font-bold text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                        {item.label}
                      </h3>
                      <p className="text-text-dark/60 leading-relaxed text-sm">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING PRINCIPLES */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Engineering Principles, Not Just a Label
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                When we say German engineering, we mean specific practices that
                are embedded in our wholesale manufacturing process every day —
                giving our trade partners a product advantage no retail
                competitor can match.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {engineeringPrinciples.map((principle, index) => (
              <AnimatedSection key={principle.title} delay={index * 0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/20 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                    <principle.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {principle.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOUR SHOP */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <PlaceholderImage
                label="Precision CNC cutting of channel letter components"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
                What This Means for Your Sign Shop
              </h2>
              <div className="space-y-4">
                {[
                  "Letters that fit perfectly on first install — fewer callbacks, more profit per job",
                  "Consistent wholesale quality across every order, whether 10 letters or 200",
                  "Materials selected for 10+ year outdoor performance — your reputation stays strong",
                  "LED systems engineered for uniform illumination and energy efficiency",
                  "Packaging designed to survive transit without damage to your door",
                  "A wholesale product you can confidently mark up and put your name behind",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-text-dark/70">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* EDGELUXE SHOWCASE */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Trimless: Engineering in Action
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Our trimless channel letter line is the clearest
                expression of German engineering applied to modern signage.
                No visible trim cap. Clean, seamless edges. A premium
                architectural finish — available exclusively through our
                wholesale trade partners.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Trimless exists because of our engineering heritage. The
                tolerances required for a trimless letter leave no room for
                approximation. Your clients get a product no competitor can
                replicate. Your margins reflect the premium.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-heading uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-gold" /> German Engineered
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-gold" /> Trimless Design
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-gold" /> Trade Exclusive
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <PlaceholderImage
                label="Trimless channel letter close-up detail"
                className="rounded-xl"
                aspectRatio="aspect-square"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>


      <CTASection />
    </>
  );
}
