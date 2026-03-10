import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  X,
  Gem,
  Shield,
  Lightbulb,
  Building2,
  Award,
  Eye,
  Lock,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecsTable from "@/components/SpecsTable";
import { getProduct } from "@/lib/product-data";

export const metadata: Metadata = {
  title: "Wholesale EdgeLuxe Trimless Channel Letters — Trade Pricing | Sunlite Signs",
  description:
    "Wholesale EdgeLuxe trimless channel letters for sign shops only. No visible trim cap, seamless aluminum returns, modern architectural aesthetic. Trade pricing, UL listed, German-engineered. We never sell retail.",
  keywords: [
    "trimless channel letters wholesale",
    "trimless channel letters",
    "EdgeLuxe trimless letters",
    "seamless channel letters",
    "no trim cap channel letters",
    "modern channel letters wholesale",
    "architectural channel letters",
    "trimless LED channel letters",
    "wholesale trimless sign manufacturer",
    "trade pricing trimless letters",
  ],
  openGraph: {
    title: "Wholesale EdgeLuxe Trimless Channel Letters — Trade Pricing | Sunlite Signs",
    description:
      "The industry's cleanest channel letter. No trim cap, seamless returns, German-engineered precision. Wholesale trade pricing for sign shops only. We never sell retail.",
    type: "website",
  },
  alternates: {
    canonical: "https://sunlitesigns.com/trimless-channel-letters",
  },
};

const keyDifferentiators = [
  {
    icon: Gem,
    title: "Zero Visible Trim Cap",
    description:
      "The defining feature. Where traditional channel letters require a plastic trim cap to secure the face, EdgeLuxe uses a proprietary aluminum return-to-face connection that eliminates the trim cap entirely.",
  },
  {
    icon: Eye,
    title: "Seamless Aesthetic",
    description:
      "Clean, uninterrupted lines from every viewing angle. The face meets the return in a flush, seamless joint that architects and designers demand for modern brand environments.",
  },
  {
    icon: Award,
    title: "German-Engineered Precision",
    description:
      "Developed in partnership with LKF Lichtwerbung in Nuremberg, Germany. The EdgeLuxe manufacturing process requires tighter tolerances than standard channel letters — tolerances we achieve consistently.",
  },
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Full UL listing despite the non-standard construction. We invested in the engineering required to meet UL 48 standards without a traditional trim cap assembly.",
  },
  {
    icon: Building2,
    title: "Architect Specified",
    description:
      "Increasingly specified by architects and brand designers who reject the visual compromise of a trim cap. EdgeLuxe is becoming the standard for high-end commercial projects.",
  },
  {
    icon: Lightbulb,
    title: "All Illumination Styles",
    description:
      "Available in face lit, halo lit, and front-and-halo lit configurations. The trimless construction works with any LED configuration.",
  },
];

const comparisonRows = [
  {
    feature: "Visible trim cap",
    traditional: "Yes — plastic trim cap visible around face perimeter",
    edgeLuxe: "None — clean, flush face-to-return joint",
  },
  {
    feature: "Face attachment",
    traditional: "Snap-in trim cap retainer",
    edgeLuxe: "Proprietary precision-fit aluminum channel",
  },
  {
    feature: "Visual profile",
    traditional: "Raised trim line around every letter",
    edgeLuxe: "Seamless, flush perimeter on all surfaces",
  },
  {
    feature: "Architectural appeal",
    traditional: "Standard commercial appearance",
    edgeLuxe: "Modern, high-end architectural aesthetic",
  },
  {
    feature: "Manufacturing tolerance",
    traditional: "Standard industry tolerances",
    edgeLuxe: "Tighter tolerances for flush fit",
  },
  {
    feature: "UL listing",
    traditional: "UL listed",
    edgeLuxe: "UL listed",
  },
  {
    feature: "Durability",
    traditional: "Trim cap can yellow, crack, or detach over time",
    edgeLuxe: "All-aluminum construction — no plastic to degrade",
  },
  {
    feature: "Price point",
    traditional: "Lower",
    edgeLuxe: "Moderate premium for superior construction",
  },
];

const product = getProduct("LP 5");

const trimlessFaqs = [
  {
    question: "What are trimless channel letters?",
    answer:
      "Trimless channel letters are a modern channel letter construction that eliminates the traditional plastic trim cap used to hold the acrylic face in place. Instead, EdgeLuxe uses a proprietary all-aluminum return-to-face connection that creates a seamless, flush joint between the letter face and the return. The result is a cleaner, more architectural appearance with no visible plastic retainer strip.",
  },
  {
    question: "How do trimless channel letters differ from standard channel letters?",
    answer:
      "Standard channel letters use a snap-in plastic trim cap around the perimeter of each letter to secure the acrylic face to the aluminum return. This trim cap is visible on the finished letter and can yellow, crack, or detach over time. Trimless letters eliminate this component entirely, using a precision-fit aluminum channel that produces a flush face-to-return joint with no plastic components exposed.",
  },
  {
    question: "Are trimless channel letters more expensive than standard?",
    answer:
      "Trimless letters carry a moderate premium over standard trim cap letters due to the tighter manufacturing tolerances and proprietary construction methods required. However, for projects where architects or brand designers specify a clean, modern aesthetic, the premium is justified by the superior visual result and long-term durability of all-aluminum construction.",
  },
  {
    question: "Are EdgeLuxe trimless channel letters UL listed?",
    answer:
      "Yes. Every EdgeLuxe trimless channel letter set is fully UL listed and carries the UL label. Achieving UL listing with non-standard construction required additional engineering investment, but it means sign shops can specify trimless letters on any project requiring code compliance — which is virtually all commercial installations in the USA and Canada.",
  },
  {
    question: "What illumination options are available for trimless letters?",
    answer:
      "EdgeLuxe trimless letters are available in face lit, halo lit, and front-and-halo combination configurations. The trimless construction works with any LED illumination layout. All configurations use premium Samsung or Nichia LED modules with 50,000+ hour rated life.",
  },
  {
    question: "Why are architects specifying trimless channel letters?",
    answer:
      "Architects and brand designers increasingly reject the visual compromise of a plastic trim cap on modern building facades. Trimless letters deliver the clean, uninterrupted geometry that contemporary architectural design demands. They are particularly popular for Class A office buildings, luxury retail, boutique hospitality, and any project where the signage must meet the same design standard as the architecture itself.",
  },
  {
    question: "How do I order wholesale trimless channel letters?",
    answer:
      "Submit your project details through our Request Wholesale Pricing form or email us directly. Include letter height, font, color, illumination type, quantity, and any special requirements. We accept AI files, PDFs, or detailed written descriptions. You will receive a detailed wholesale trade quote within 48 hours. We sell exclusively to sign shops and trade professionals.",
  },
];

const useCases = [
  "Architect-specified brand signage",
  "Class A commercial office buildings",
  "Luxury retail and flagship stores",
  "Boutique hotels and hospitality",
  "High-end residential developments",
  "Museums, galleries, and cultural spaces",
  "Financial institutions and banks",
  "Technology company campuses",
  "Healthcare and wellness facilities",
  "Mixed-use lifestyle developments",
];

export default function TrimlessPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trimlessFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wholesale EdgeLuxe Trimless Channel Letters",
    description:
      "Wholesale trimless channel letters with no visible trim cap. Seamless aluminum construction, German-engineered precision, UL listed. Available in face lit, halo lit, and combination configurations. Trade pricing for sign shops only.",
    brand: {
      "@type": "Brand",
      name: "Sunlite Signs — EdgeLuxe",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
    },
    category: "Channel Letters",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Construction",
        value: "Trimless — no visible trim cap",
      },
      {
        "@type": "PropertyValue",
        name: "Certification",
        value: "UL Listed (UL 48)",
      },
      {
        "@type": "PropertyValue",
        name: "Engineering Heritage",
        value: "German-engineered in partnership with LKF Lichtwerbung, Nuremberg",
      },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "Wholesale trade pricing available upon request — sign shops only",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.1),transparent_50%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters", href: "/products/channel-letters" },
              { name: "EdgeLuxe Trimless" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only — Trade Pricing</span>
                </div>
                <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-4 py-1.5 rounded-full mb-6">
                  Flagship Innovation
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                  Wholesale EdgeLuxe{" "}
                  <span className="text-brand-gold">Trimless</span>{" "}
                  Channel Letters
                </h1>
                <p className="text-xl text-text-light/70 mb-4 leading-relaxed">
                  No trim cap. No compromise. The cleanest channel letter on the
                  market, built with German-engineered precision that eliminates
                  the plastic trim cap entirely. Available exclusively to trade accounts.
                </p>
                <p className="text-text-light/50 mb-8">
                  Developed with LKF Lichtwerbung in Nuremberg. UL listed.
                  Available in face lit, halo lit, and combination
                  configurations. Wholesale direct to sign shops — we never sell retail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/get-a-quote" className="btn-primary">
                    Request Wholesale Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link href="#comparison" className="btn-secondary">
                    See the Difference
                  </Link>
                </div>
              </div>
              <div className="relative">
                <BeforeAfterSlider
                  daySrc="/products/trimless-day.jpg"
                  nightSrc="/products/trimless-night.jpg"
                  alt="EdgeLuxe trimless channel letters — seamless face-to-return joint, no trim cap"
                />
                <div className="absolute -bottom-4 -right-4 bg-brand-gold text-primary-dark px-6 py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider shadow-lg">
                  Zero Trim Cap
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Problem with Trim Caps */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-6">
                  Why Trimless Matters
                </h2>
                <p className="text-text-light/60 mb-6 leading-relaxed">
                  Every traditional channel letter has a visible plastic trim
                  cap — a retainer strip that holds the acrylic face in place.
                  It is a functional necessity that has been an aesthetic
                  compromise for decades.
                </p>
                <ul className="space-y-4">
                  {[
                    "Plastic trim caps yellow and crack over time in UV exposure",
                    "The visible trim line interrupts the clean geometry of every letter",
                    "Architects increasingly reject trim caps in design specifications",
                    "Color-matching trim caps to letter finishes is imprecise at best",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-light/70"
                    >
                      <X className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-light/60 mt-6 leading-relaxed">
                  EdgeLuxe eliminates every one of these issues with a
                  proprietary all-aluminum construction that requires no plastic
                  trim cap. Available exclusively at wholesale trade pricing for sign shops.
                </p>
              </div>
              <div className="space-y-4">
                <PlaceholderImage
                  label="Traditional channel letter with visible trim cap — close-up showing plastic retainer"
                  className="rounded-xl"
                  aspectRatio="aspect-video"
                />
                <p className="text-center text-xs text-text-light/40 font-heading uppercase tracking-wider">
                  Traditional trim cap construction (competitor reference)
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                The EdgeLuxe Wholesale Advantage
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                Six reasons why sign shops and their clients are choosing
                EdgeLuxe trimless channel letters for their most important
                projects. Available exclusively at trade pricing.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyDifferentiators.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.08}>
                <div className="bg-white rounded-xl p-8 border border-black/5 h-full">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-dark/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section id="comparison" className="section-padding bg-primary-dark scroll-mt-20">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                EdgeLuxe vs. Traditional Trim Cap
              </h2>
              <p className="text-text-light/60 max-w-2xl mx-auto">
                A direct comparison of trimless EdgeLuxe construction against
                traditional channel letters with plastic trim caps.
              </p>
            </div>
          </AnimatedSection>

          {/* Visual Comparison */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="text-center">
                <PlaceholderImage
                  label="Traditional channel letter with trim cap — visible plastic retainer strip around letter perimeter"
                  className="rounded-xl mb-4"
                  aspectRatio="aspect-[4/3]"
                />
                <h3 className="font-heading font-semibold text-text-light/60">
                  Traditional with Trim Cap
                </h3>
              </div>
              <div className="text-center">
                <PlaceholderImage
                  label="EdgeLuxe trimless channel letter — seamless face-to-return, no visible trim cap"
                  className="rounded-xl mb-4 ring-2 ring-brand-gold/30"
                  aspectRatio="aspect-[4/3]"
                />
                <h3 className="font-heading font-semibold text-brand-gold">
                  EdgeLuxe Trimless
                </h3>
              </div>
            </div>
          </AnimatedSection>

          {/* Table Comparison */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
                <div className="px-6 py-4 font-heading font-semibold text-sm text-text-light/50 uppercase tracking-wider">
                  Feature
                </div>
                <div className="px-6 py-4 font-heading font-semibold text-sm text-text-light/50 uppercase tracking-wider">
                  Traditional
                </div>
                <div className="px-6 py-4 font-heading font-semibold text-sm text-brand-gold uppercase tracking-wider">
                  EdgeLuxe
                </div>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${
                    index < comparisonRows.length - 1
                      ? "border-b border-white/5"
                      : ""
                  }`}
                >
                  <div className="px-6 py-4 text-sm font-heading text-text-light/70">
                    {row.feature}
                  </div>
                  <div className="px-6 py-4 text-sm text-text-light/50">
                    {row.traditional}
                  </div>
                  <div className="px-6 py-4 text-sm text-text-light font-medium">
                    {row.edgeLuxe}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Trade Specifications
              </h2>
              <p className="text-text-light/60 mb-8">
                Precision tolerances and premium materials throughout. Every
                EdgeLuxe letter is a testament to what German engineering
                brings to the sign industry. Available exclusively at wholesale trade pricing.
              </p>
              <PlaceholderImage
                label="EdgeLuxe trimless channel letter — exploded view showing proprietary face-to-return connection"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <SpecsTable specs={product.specs} modelNumber={product.modelNumber} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="gold-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                  Where EdgeLuxe Excels
                </h2>
                <p className="text-text-dark/60 mb-8">
                  EdgeLuxe trimless channel letters are the standard for
                  projects where the architect or brand designer will not accept
                  the visual compromise of a plastic trim cap. Wholesale direct to sign shops for all project types.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-text-dark/70"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              <PlaceholderImage
                label="EdgeLuxe trimless letters — Class A office building, modern facade"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                EdgeLuxe Trimless Gallery
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto">
                See the trimless difference installed. No trim caps. Clean
                lines. Pure brand expression.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "EdgeLuxe trimless — luxury retail facade, face lit, night",
                "EdgeLuxe trimless — corporate headquarters, halo lit",
                "EdgeLuxe trimless — boutique hotel entrance, warm white",
                "EdgeLuxe trimless — tech campus, large scale letters",
                "EdgeLuxe trimless — close-up detail of seamless joint",
                "EdgeLuxe trimless — mixed-use development, front and halo lit",
                "EdgeLuxe trimless — healthcare facility, daytime view",
                "EdgeLuxe trimless — restaurant signage, brushed aluminum finish",
                "EdgeLuxe trimless — bank branch, professional facade",
              ].map((label, i) => (
                <PlaceholderImage
                  key={i}
                  label={label}
                  className="rounded-xl"
                  aspectRatio="aspect-[4/3]"
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-brand-gold text-6xl font-heading mb-6">
                &ldquo;
              </div>
              <p className="text-xl md:text-2xl text-text-light/80 italic leading-relaxed mb-8">
                The EdgeLuxe trimless letters are the cleanest channel letters
                we have ever installed. Our architects are specifying them on
                every new project.
              </p>
              <div>
                <p className="font-heading font-semibold text-text-light">
                  [Sign Shop Partner]
                </p>
                <p className="text-sm text-text-light/50">[City, State]</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Trimless Channel Letters FAQ
              </h2>
              <p className="text-text-dark/60 mb-8">
                Common questions about EdgeLuxe trimless channel letters,
                answered for sign shop professionals and trade buyers.
              </p>
              <div className="space-y-4">
                {trimlessFaqs.map((faq, index) => (
                  <AnimatedSection key={index} delay={Math.min(index * 0.05, 0.3)}>
                    <details className="group bg-white border border-black/5 rounded-xl overflow-hidden hover:border-brand-gold/20 transition-colors">
                      <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base md:text-lg font-heading font-semibold text-text-dark group-hover:text-brand-gold transition-colors pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-brand-gold flex-shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-black/5 pt-4">
                          <p className="text-text-dark/60 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/resources/guides/trimless-channel-letters-guide"
                  className="text-brand-gold font-heading font-medium text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Read the Full Trimless Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Request Trade Pricing for Trimless Letters
              </h2>
              <p className="text-text-light/60 mb-4">
                Send your project files and receive a detailed wholesale quote
                for EdgeLuxe trimless channel letters within 48 hours. We will
                show you what clean really looks like.
              </p>
              <p className="text-text-light/40 text-sm mb-8">
                No retail markup. We never sell retail and we never compete with you for your clients. Your margin is protected.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/get-a-quote"
                  className="btn-primary text-base px-10 py-5"
                >
                  Request Wholesale Pricing
                </Link>
                <Link
                  href="/why-sunlite/wholesale-only"
                  className="btn-secondary text-base px-10 py-5"
                >
                  Why We Sell Wholesale Only
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
