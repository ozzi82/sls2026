import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Choosing the Right Illumination Type — Wholesale Guide for Sign Shops | Sunlite Signs",
  description:
    "Compare front-lit, halo-lit, front-and-halo, and non-illuminated channel letters at wholesale trade pricing. Learn when to specify each illumination type for your sign shop clients.",
  keywords: [
    "wholesale channel letter illumination types",
    "front lit vs halo lit trade",
    "backlit channel letters wholesale",
    "LED sign illumination guide",
    "halo lit channel letters wholesale",
    "front and halo lit signs trade",
    "sign illumination comparison wholesale",
  ],
  openGraph: {
    title: "Choosing the Right Illumination Type — Wholesale Guide for Sign Shops | Sunlite Signs",
    description:
      "Compare front-lit, halo-lit, front-and-halo, and non-illuminated channel letters at wholesale trade pricing for your next sign project.",
    url: "https://sunlitesigns.com/resources/guides/choosing-illumination-types",
  },
};

const illuminationTypes = [
  {
    name: "Front-Lit",
    aka: "Face-Lit",
    description:
      "LEDs inside the channel project light forward through a translucent acrylic face, producing a bright, colorful glow visible from long distances. Front-lit letters are the most common and versatile illumination type in the channel letter industry.",
    image: "Front-lit channel letters glowing at night on a retail storefront",
    bestFor: [
      "Maximum visibility from long distances",
      "Retail storefronts and shopping centers",
      "Restaurants and fast-casual dining",
      "Medical and dental offices",
      "Any location prioritizing readability",
    ],
    considerations: [
      "May appear too bold for luxury or understated brands",
      "Acrylic face color accuracy is critical for brand matching",
      "Requires UL-listed power supply and electrical connection",
    ],
    visibility: "Excellent",
    aesthetic: "Bold and vibrant",
    cost: "$$",
  },
  {
    name: "Halo-Lit",
    aka: "Back-Lit",
    description:
      "LEDs project light backward from the channel letter onto the mounting surface, creating a soft, elegant glow or halo around the letter silhouette. The letter face is opaque, so no light comes through the front. Halo-lit letters deliver a refined, architectural look.",
    image: "Halo-lit channel letters casting warm glow on a hotel facade",
    bestFor: [
      "Upscale and luxury brands",
      "Hotels and boutique hospitality",
      "Corporate offices and law firms",
      "Architectural signage packages",
      "Any project requiring sophisticated, understated presence",
    ],
    considerations: [
      "Requires a flat, light-colored mounting surface for best effect",
      "Less readable than front-lit at long distances or in bright daylight",
      "Requires standoff mounting to create the gap for the halo",
      "Dark or textured walls diminish the halo effect",
    ],
    visibility: "Good (best in low ambient light)",
    aesthetic: "Elegant and architectural",
    cost: "$$$",
  },
  {
    name: "Front-and-Halo",
    aka: "Dual-Lit",
    description:
      "Combining both illumination methods in a single letter, front-and-halo delivers light through the translucent face and backward to create a halo simultaneously. This premium option provides maximum visual impact with both readability and refined depth.",
    image: "Front-and-halo channel letters with dual glow on modern building",
    bestFor: [
      "Flagship retail locations",
      "Premium brand identities",
      "High-traffic commercial areas",
      "Entertainment and hospitality venues",
      "Any project where the sign is a key architectural feature",
    ],
    considerations: [
      "Higher cost due to additional LEDs and more complex engineering",
      "Higher power consumption than single-illumination options",
      "Still requires suitable mounting surface for the halo component",
      "Balancing front and back illumination levels requires manufacturing expertise",
    ],
    visibility: "Excellent",
    aesthetic: "Premium and dramatic",
    cost: "$$$$",
  },
  {
    name: "Non-Illuminated",
    aka: "Unlit",
    description:
      "Channel letters fabricated without internal lighting. Non-illuminated letters rely on ambient light, external spotlights, or gooseneck fixtures for visibility. They are the most cost-effective option and require no electrical connection.",
    image: "Non-illuminated dimensional metal letters on office building",
    bestFor: [
      "Interior lobby and reception signage",
      "Secondary identification signs",
      "Locations with illumination restrictions",
      "Budget-conscious projects",
      "Daytime-only visibility requirements",
    ],
    considerations: [
      "Limited nighttime visibility without supplemental external lighting",
      "External lighting (gooseneck, landscape spots) adds cost and installation complexity",
      "Not suitable as primary identification where nighttime visibility is needed",
    ],
    visibility: "Dependent on external light",
    aesthetic: "Clean and architectural",
    cost: "$",
  },
];

export default function ChoosingIlluminationTypesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Guides", href: "/resources/guides" },
              { name: "Choosing Illumination Types" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-light mb-6">
              Choosing the Right Illumination Type
            </h1>
            <p className="text-lg text-text-light/60 max-w-2xl">
              A wholesale guide for sign shop professionals and trade buyers. The illumination style of a channel letter sign defines how it looks at night and
              shapes the impression it makes on customers. This guide compares the four primary
              options to help you recommend the right choice for every project — all available at trade pricing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Illumination Types */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {illuminationTypes.map((type, index) => (
              <AnimatedSection key={type.name}>
                <div className="max-w-5xl">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Image */}
                    <div className="lg:w-2/5">
                      <PlaceholderImage
                        label={type.image}
                        className="rounded-xl"
                        aspectRatio="aspect-[4/3]"
                      />
                    </div>

                    {/* Content */}
                    <div className="lg:w-3/5">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light">
                          {type.name}
                        </h2>
                        <span className="text-sm text-text-light/40 font-heading">
                          ({type.aka})
                        </span>
                      </div>
                      <div className="gold-line mb-4" />
                      <p className="text-text-light/70 leading-relaxed mb-6">
                        {type.description}
                      </p>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-text-light/40 font-heading uppercase tracking-wider mb-1">
                            Visibility
                          </p>
                          <p className="text-sm font-heading font-semibold text-text-light">
                            {type.visibility}
                          </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-text-light/40 font-heading uppercase tracking-wider mb-1">
                            Aesthetic
                          </p>
                          <p className="text-sm font-heading font-semibold text-text-light">
                            {type.aesthetic}
                          </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-text-light/40 font-heading uppercase tracking-wider mb-1">
                            Cost
                          </p>
                          <p className="text-sm font-heading font-semibold text-brand-gold">
                            {type.cost}
                          </p>
                        </div>
                      </div>

                      {/* Best For */}
                      <h3 className="text-sm font-heading font-semibold text-text-light uppercase tracking-wider mb-3">
                        Best For
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {type.bestFor.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-text-light/60">
                            <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Considerations */}
                      <h3 className="text-sm font-heading font-semibold text-text-light uppercase tracking-wider mb-3">
                        Considerations
                      </h3>
                      <ul className="space-y-2">
                        {type.considerations.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-text-light/40">
                            <X className="w-4 h-4 text-text-light/30 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {index < illuminationTypes.length - 1 && (
                    <div className="border-b border-white/10 mt-16" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white/[0.02]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                Quick Comparison
              </h2>
              <div className="gold-line mx-auto" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-text-light">
                      Factor
                    </th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">
                      Front-Lit
                    </th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">
                      Halo-Lit
                    </th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">
                      Front & Halo
                    </th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">
                      Non-Illuminated
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-light/60">
                  {[
                    { factor: "Daytime Visibility", values: ["Excellent", "Good", "Excellent", "Good"] },
                    { factor: "Nighttime Visibility", values: ["Excellent", "Very Good", "Excellent", "Poor"] },
                    { factor: "Long-Range Readability", values: ["Excellent", "Fair", "Excellent", "Poor at night"] },
                    { factor: "Architectural Elegance", values: ["Moderate", "Excellent", "Excellent", "Good"] },
                    { factor: "Relative Cost", values: ["$$", "$$$", "$$$$", "$"] },
                    { factor: "Power Consumption", values: ["Moderate", "Moderate", "Higher", "None"] },
                    { factor: "Wall Surface Dependency", values: ["Low", "High", "High", "None"] },
                    { factor: "Best Brand Fit", values: ["Retail", "Luxury", "Premium", "Interior"] },
                  ].map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                      <td className="py-3 px-4 font-heading font-medium text-text-light">
                        {row.factor}
                      </td>
                      {row.values.map((val, j) => (
                        <td key={j} className="py-3 px-4 text-center">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                Decision Framework: 5 Questions to Ask Your Client
              </h2>
              <div className="gold-line mb-8" />
              <div className="space-y-6">
                {[
                  {
                    question: "What is the primary viewing distance?",
                    guidance:
                      "Highway or major road (100+ feet): front-lit. Pedestrian or street level (under 50 feet): any illumination type works. Interior: non-illuminated is often sufficient.",
                  },
                  {
                    question: "What is the brand personality?",
                    guidance:
                      "Bold, energetic, attention-grabbing brands favor front-lit. Refined, luxury, or architectural brands favor halo-lit. Premium brands wanting maximum impact choose front-and-halo.",
                  },
                  {
                    question: "What is the mounting surface?",
                    guidance:
                      "Flat, light-colored walls are ideal for halo-lit. Dark, textured, or uneven surfaces favor front-lit or non-illuminated. Evaluate the surface before committing to halo illumination.",
                  },
                  {
                    question: "What is the budget range?",
                    guidance:
                      "Present options at multiple price points. Many clients who start with a front-lit budget upgrade to front-and-halo when they see the difference in renderings. Wholesale trade pricing from Sunlite Signs helps you maintain strong margins across all options.",
                  },
                  {
                    question: "Are there local sign code restrictions?",
                    guidance:
                      "Some municipalities restrict illumination brightness, hours, or type. Verify codes before specifying. Non-illuminated may be required in certain historic districts.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <h3 className="font-heading font-semibold text-text-light mb-2 flex items-start gap-3">
                      <span className="text-brand-gold">{i + 1}.</span>
                      {item.question}
                    </h3>
                    <p className="text-sm text-text-light/60 leading-relaxed pl-7">
                      {item.guidance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Need Help Choosing? Get Wholesale Pricing.
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to get trade pricing on your next project? Our team can help you select the ideal illumination type. We sell exclusively to sign shops and trade professionals — never retail. Get a
                detailed wholesale quote with illumination options within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                </Link>
                <Link href="/resources/guides" className="btn-secondary">
                  More Guides
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
