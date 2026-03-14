import { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ScanSearch,
  Paintbrush,
  Lightbulb,
  ThermometerSun,
  PackageCheck,
  CheckCircle2,
  ClipboardList,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Quality Process — Trade-Grade Sign Manufacturing | Sunlite Signs",
  description:
    "Explore Sunlite Signs' wholesale quality process from raw materials to final inspection. Multi-point quality checks, UL compliance, and German engineering precision — available exclusively to trade accounts.",
  openGraph: {
    title: "Wholesale Quality Process — Trade-Grade Sign Manufacturing",
    description:
      "Multi-point quality checks, premium materials, and rigorous testing. Wholesale sign manufacturing for sign shops only — trade pricing available.",
    url: "https://sunlitesigns.com/why-sunlite/quality-process",
  },
};

const processSteps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Design and Engineering Review",
    description:
      "Every trade partner project begins with a thorough review of specifications, dimensions, and installation requirements. Our engineering team verifies structural integrity, electrical layout, and LED configuration before fabrication starts.",
    image: "Engineering team reviewing sign specifications on screen",
  },
  {
    number: "02",
    icon: Layers,
    title: "Material Selection and Inspection",
    description:
      "We source aluminum, acrylic, polycarbonate, and LED modules from qualified suppliers. Incoming materials are inspected for dimensional accuracy, surface quality, and compliance. Nothing enters our wholesale production line without verification.",
    image: "Raw material inspection — aluminum coils and acrylic sheets",
  },
  {
    number: "03",
    icon: Paintbrush,
    title: "Precision Fabrication",
    description:
      "CNC routing, laser cutting, and precision bending create each component to exact tolerances. Channel letter returns are formed, faces are cut, and backs are prepared. Every piece is checked against the engineering drawings before moving forward.",
    image: "CNC router cutting channel letter components",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "LED Integration and Wiring",
    description:
      "LED modules are positioned for optimal illumination uniformity. Wiring follows UL 48 standards. Electrical connections are soldered and insulated. Power supplies are matched to the LED load — so your trade clients get a sign that performs flawlessly.",
    image: "LED module installation inside channel letters",
  },
  {
    number: "05",
    icon: ScanSearch,
    title: "In-Process Inspection",
    description:
      "Quality checkpoints are embedded throughout production, not just at the end. Dimensional checks, surface inspections, and electrical continuity tests happen at every critical stage. Issues are caught and corrected before they reach your shop.",
    image: "Quality inspector measuring channel letter dimensions",
  },
  {
    number: "06",
    icon: ThermometerSun,
    title: "Burn-In and Electrical Testing",
    description:
      "Every completed sign undergoes a burn-in period to verify LED performance, power supply stability, and thermal behavior. We test for consistent illumination, color temperature accuracy, and current draw — so you never get a callback.",
    image: "Illuminated channel letters during burn-in testing",
  },
  {
    number: "07",
    icon: PackageCheck,
    title: "Final Inspection and Wholesale Packaging",
    description:
      "A comprehensive final inspection verifies every aspect of the finished sign: dimensions, finish quality, illumination, electrical safety, and UL label application. Signs are then custom-crated for safe transit to your shop or job site.",
    image: "Final packed and crated channel letters ready for shipment",
  },
];

const qualityMetrics = [
  { value: "7", label: "Quality checkpoints per sign" },
  { value: "100%", label: "Burn-in tested" },
  { value: "UL 48", label: "Electrical standard" },
  { value: "Trade", label: "Accounts exclusively" },
];

export default function QualityProcessPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--hero-glow),transparent_60%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Why Sunlite", href: "/why-sunlite" },
              { name: "Quality Process" },
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
                Quality Is a{" "}
                <span className="text-brand-gold">Process, Not a Promise.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Promises are easy. Processes are what deliver. From material
                selection to final crating, every wholesale sign passes through
                seven documented quality checkpoints. We manufacture to the
                highest standards — so you can sell with total confidence.
              </p>
              <Link href="/get-a-quote" className="btn-primary">
                Request Wholesale Pricing
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage
                label="Quality control inspector examining finished channel letters"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* QUALITY METRICS BAR */}
      <section className="bg-bg-navy border-t border-white/10 border-b border-b-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {qualityMetrics.map((metric, index) => (
              <AnimatedSection key={metric.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-brand-gold mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-white/50 font-heading uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Seven Steps to a Perfect Wholesale Sign
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                Our quality process is not a checklist taped to the wall. It
                is a documented, enforced workflow that every product follows
                — because our trade partners deserve nothing less.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.title}>
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-12`}
                >
                  <div className="flex-1 w-full">
                    <PlaceholderImage
                      label={step.image}
                      className="rounded-xl"
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-brand-gold" />
                      </div>
                      <span className="text-brand-gold font-heading font-bold text-sm uppercase tracking-wider">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-text-dark mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-dark/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS SECTION */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Materials Matter — Especially at Wholesale
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Quality starts before fabrication begins. Our material
                specifications are developed in partnership with LKF
                Lichtwerbung and reflect decades of field performance data. We
                select for longevity, not just cost — because your trade
                reputation depends on every sign we ship.
              </p>
              <div className="space-y-4">
                {[
                  "Aluminum alloys selected for corrosion resistance and formability",
                  "UV-stabilized acrylic faces for long-term color retention",
                  "Premium LED modules with documented lumen maintenance ratings",
                  "Industrial-grade adhesives and sealants tested for outdoor exposure",
                  "Power supplies rated for continuous duty with thermal protection",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <PlaceholderImage
                label="Raw materials — aluminum, acrylic, and LED modules close-up"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHAT THIS MEANS FOR YOU */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                What This Means for Your Trade Business
              </h2>
              <p className="text-white/60 leading-relaxed mb-10">
                A rigorous quality process does not just produce better signs.
                It produces better outcomes for your wholesale business. We
                manufacture. You sell. Your margins grow.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fewer Callbacks",
                description:
                  "Signs built right the first time mean fewer warranty claims, fewer site visits, and more profit on every wholesale job you sell.",
              },
              {
                title: "Faster Installations",
                description:
                  "When letters fit, hardware aligns, and wiring is clean, your install crew spends less time in the field — increasing your throughput and revenue.",
              },
              {
                title: "Stronger Trade Reputation",
                description:
                  "Consistently delivering premium quality builds your brand in the market. Your clients notice the difference — and that is how trade partners grow.",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full text-center">
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      <CTASection />
    </>
  );
}
