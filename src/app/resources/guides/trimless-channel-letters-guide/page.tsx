import type { Metadata } from "next";
import { CheckCircle, X, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "What Are Trimless Channel Letters? — Complete Wholesale Guide | Sunlite Signs",
  description:
    "Everything sign shops need to know about trimless channel letters. How they differ from trim cap letters, why architects specify them, construction details, and how to order wholesale. Trade professionals only.",
  keywords: [
    "trimless channel letters",
    "what are trimless channel letters",
    "trimless vs trim cap",
    "no trim cap channel letters",
    "trimless channel letters wholesale",
    "EdgeLuxe trimless",
    "architectural channel letters",
    "modern channel letters",
    "trimless channel letter guide",
    "sign shop trimless guide",
  ],
  openGraph: {
    title:
      "What Are Trimless Channel Letters? — Complete Wholesale Guide | Sunlite Signs",
    description:
      "The definitive guide to trimless channel letters for sign shop professionals. Construction, benefits, specifications, and wholesale ordering.",
    url: "https://sunlitesigns.com/resources/guides/trimless-channel-letters-guide",
  },
  alternates: {
    canonical:
      "https://sunlitesigns.com/resources/guides/trimless-channel-letters-guide",
  },
};

export default function TrimlessGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"The Complete Guide to Trimless Channel Letters","description":"Everything sign shop professionals need to know about trimless channel letters including construction, benefits, specifications, and how to sell them to clients.","step":[{"@type":"HowToStep","position":1,"text":"Understand what makes trimless letters different from trim cap"},{"@type":"HowToStep","position":2,"text":"Learn the construction and engineering behind trimless design"},{"@type":"HowToStep","position":3,"text":"Compare trimless vs traditional trim cap specifications"},{"@type":"HowToStep","position":4,"text":"Identify ideal applications for trimless letters"},{"@type":"HowToStep","position":5,"text":"Evaluate cost and value considerations"},{"@type":"HowToStep","position":6,"text":"Present trimless options to your clients effectively"}]}) }}
      />
      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Guides", href: "/resources/guides" },
              { name: "Trimless Channel Letters Guide" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                Trade Resources
              </span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              What Are Trimless Channel Letters?
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              A comprehensive guide for sign shop professionals covering
              trimless construction, how it differs from traditional trim cap
              letters, why architects are specifying trimless, and how to order
              wholesale from Sunlite Signs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="max-w-3xl">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-6">
                The Trim Cap Problem
              </h2>
              <p className="text-text-dark/60 leading-relaxed mb-4">
                For decades, every channel letter on the market has used a
                plastic trim cap — a retainer strip that snaps around the
                perimeter of the letter to hold the translucent acrylic face in
                place. The trim cap is functional, but it is also a visible
                compromise.
              </p>
              <p className="text-text-dark/60 leading-relaxed mb-6">
                The trim cap creates a raised plastic line around every letter.
                Over time, this plastic can yellow from UV exposure, crack in
                extreme temperatures, or detach entirely. For architects and
                brand designers working on premium commercial projects, the trim
                cap has long been an unwelcome visual element.
              </p>
              <div className="bg-white rounded-xl p-6 border border-black/[0.04] mb-8">
                <h3 className="font-heading font-semibold text-text-dark mb-3">
                  Common Trim Cap Issues
                </h3>
                <ul className="space-y-3">
                  {[
                    "Visible plastic line disrupts the clean geometry of every letter",
                    "UV yellowing degrades appearance within 3-5 years",
                    "Temperature cycling causes cracking and separation",
                    "Difficult to color-match precisely to letter face or return",
                    "Creates a dust and debris trap around the letter perimeter",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-dark/60 text-sm"
                    >
                      <X className="w-4 h-4 text-accent-red flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What Makes Trimless Different */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
                How Trimless Construction Works
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Trimless channel letters replace the plastic trim cap with a
                proprietary aluminum return-to-face connection. The acrylic face
                sits flush against the aluminum return with no plastic retainer
                visible from any viewing angle.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                This requires significantly tighter manufacturing tolerances
                than standard channel letters. The return must be fabricated to
                precise dimensions so that the face fits seamlessly without a
                trim cap to bridge any gap. This is where German engineering
                makes the difference.
              </p>
              <ul className="space-y-3">
                {[
                  "Proprietary aluminum channel replaces plastic trim cap",
                  "Precision-fit face-to-return joint — no gap, no retainer",
                  "All-aluminum construction — no plastic components to degrade",
                  "Tighter tolerances than standard channel letter manufacturing",
                  "Developed with LKF Lichtwerbung in Nuremberg, Germany",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-white/70 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <PlaceholderImage
                label="Exploded view — trimless channel letter construction showing face-to-return connection"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-6">
                Trimless vs. Traditional Trim Cap: Side by Side
              </h2>
              <div className="bg-white rounded-xl border border-black/[0.04] overflow-hidden">
                <div className="grid grid-cols-3 bg-black/5 border-b border-black/5">
                  <div className="px-4 py-3 font-heading font-semibold text-xs text-text-dark/50 uppercase tracking-wider">
                    Feature
                  </div>
                  <div className="px-4 py-3 font-heading font-semibold text-xs text-text-dark/50 uppercase tracking-wider">
                    Traditional
                  </div>
                  <div className="px-4 py-3 font-heading font-semibold text-xs text-brand-gold uppercase tracking-wider">
                    Trimless
                  </div>
                </div>
                {[
                  {
                    feature: "Visible trim cap",
                    traditional: "Yes — plastic retainer visible",
                    trimless: "None — flush joint",
                  },
                  {
                    feature: "Face attachment",
                    traditional: "Snap-in plastic retainer",
                    trimless: "Precision aluminum channel",
                  },
                  {
                    feature: "UV durability",
                    traditional: "Plastic yellows over time",
                    trimless: "All-aluminum, no plastic",
                  },
                  {
                    feature: "Aesthetic",
                    traditional: "Standard commercial",
                    trimless: "Modern architectural",
                  },
                  {
                    feature: "UL listing",
                    traditional: "UL listed",
                    trimless: "UL listed",
                  },
                  {
                    feature: "Price",
                    traditional: "Standard",
                    trimless: "Moderate premium",
                  },
                ].map((row, i, arr) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 ${i < arr.length - 1 ? "border-b border-black/5" : ""}`}
                  >
                    <div className="px-4 py-3 text-sm font-heading text-text-dark/70">
                      {row.feature}
                    </div>
                    <div className="px-4 py-3 text-sm text-text-dark/50">
                      {row.traditional}
                    </div>
                    <div className="px-4 py-3 text-sm text-text-dark font-medium">
                      {row.trimless}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Architects Specify Trimless */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
                Why Architects Are Specifying Trimless
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                The trend toward trimless channel letters is being driven
                primarily by architects and brand designers who want signage
                that matches the clean lines of modern architecture. Traditional
                trim cap letters were acceptable when building design was more
                utilitarian, but contemporary commercial architecture demands a
                higher standard.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                Trimless letters are increasingly specified for Class A office
                buildings, luxury retail environments, boutique hotels, mixed-use
                developments, and any project where the signage must meet the
                same design standard as the building itself.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Class A commercial office",
                  "Luxury retail and flagship",
                  "Boutique hotels",
                  "Healthcare facilities",
                  "Financial institutions",
                  "Tech campuses",
                  "Mixed-use developments",
                  "Museums and cultural spaces",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="max-w-3xl">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-6">
                How to Order Wholesale Trimless Channel Letters
              </h2>
              <p className="text-text-dark/60 leading-relaxed mb-6">
                Ordering trimless channel letters from Sunlite Signs follows the
                same straightforward process as any channel letter order. Submit
                your project details and we provide a detailed wholesale trade
                quote within 48 hours.
              </p>
              <ol className="space-y-4 mb-8">
                {[
                  "Submit project details — AI files, PDFs, sketches, or written descriptions",
                  "Receive a detailed wholesale trade quote within 48 hours",
                  "Review and approve shop drawings before production begins",
                  "Production completed in approximately 3 weeks",
                  "Carefully crated and shipped with tracking and insurance",
                ].map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-text-dark/60"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-gold text-white flex items-center justify-center text-sm font-heading font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </AnimatedSection>
          </div>
        </div>
      </section>


      <CTASection />
    </>
  );
}
