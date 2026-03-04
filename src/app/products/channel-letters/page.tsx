import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Layers, CheckCircle, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Channel Letters — Trade Pricing for Sign Shops | Sunlite Signs",
  description:
    "Wholesale channel letters for sign shops only. Face lit, halo lit, trimless, and non-illuminated. Trade pricing, UL listed, German-engineered. We never sell retail.",
  keywords: [
    "wholesale channel letters",
    "channel letters manufacturer",
    "face lit channel letters",
    "halo lit channel letters",
    "trimless channel letters wholesale",
    "LED channel letters",
    "UL listed channel letters",
    "channel letter supplier USA",
    "trade pricing channel letters",
    "sign shop channel letters",
  ],
};

const channelLetterTypes = [
  {
    name: "Face Lit Channel Letters",
    slug: "front-lit",
    description:
      "The industry standard for illuminated signage. LEDs face forward through a translucent acrylic face for maximum readability day and night. Available exclusively to trade accounts at wholesale pricing.",
    image: "Face lit channel letters — illuminated face, night view",
    highlights: ["Maximum face illumination", "Best daytime readability", "Broadest color range"],
  },
  {
    name: "Halo Lit Channel Letters",
    slug: "halo-lit",
    description:
      "A soft LED glow behind each letter creates a sophisticated halo effect against the mounting surface. The premium choice for upscale branding. Wholesale direct to sign shops.",
    image: "Halo lit channel letters — backlit glow on dark facade",
    highlights: ["Elegant backlit glow", "Premium architectural look", "Ideal for dark facades"],
  },
  {
    name: "Front & Halo Lit Channel Letters",
    slug: "front-and-halo-lit",
    description:
      "Combines front illumination with a rear halo glow for maximum visual impact. Two lighting effects in a single letter construction. Trade pricing for sign shops.",
    image: "Front and halo lit channel letters — dual illumination",
    highlights: ["Dual illumination effect", "Maximum nighttime impact", "Versatile applications"],
  },
  {
    name: "Trimless Channel Letters",
    slug: "trimless",
    description:
      "Our flagship innovation. No visible trim cap, seamless aluminum returns, and a modern architectural aesthetic that is redefining the industry. Available exclusively at wholesale trade pricing.",
    image: "Trimless channel letters — seamless modern design",
    highlights: ["No visible trim cap", "Seamless construction", "Modern architectural aesthetic"],
    featured: true,
  },
  {
    name: "Non-Illuminated Channel Letters",
    slug: "non-illuminated",
    description:
      "Dimensional metal channel letters without illumination. Cost-effective dimensional signage with the same precision fabrication as our illuminated products. Wholesale pricing for trade accounts.",
    image: "Non-illuminated channel letters — painted aluminum",
    highlights: ["Cost-effective option", "Same precision build", "Ideal for codes restricting illumination"],
  },
];

const advantages = [
  {
    icon: Shield,
    title: "UL Listed",
    description:
      "Every illuminated channel letter set is UL listed and ships with proper labeling for code compliance.",
  },
  {
    icon: Zap,
    title: "Premium LEDs",
    description:
      "Samsung and Nichia LED modules with 50,000+ hour rated life. Consistent color temperature across every letter.",
  },
  {
    icon: Layers,
    title: "German Engineering",
    description:
      "Manufacturing processes developed in partnership with LKF Lichtwerbung in Nuremberg, Germany.",
  },
];

export default function ChannelLettersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wholesale Channel Letters by Sunlite Signs",
    description:
      "Complete range of wholesale channel letters for trade accounts including face lit, halo lit, trimless, and non-illuminated options. Sign shops only.",
    itemListElement: channelLetterTypes.map((type, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: type.name,
      url: `https://sunlitesigns.com/products/channel-letters/${type.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,89,12,0.08),transparent_60%)]" />
        <div className="relative z-10 container-max section-padding pt-32 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Channel Letters" },
            ]}
          />
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Wholesale Only — Trade Pricing</span>
                </div>
                <div className="gold-line mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                  Wholesale{" "}
                  <span className="text-brand-gold">Channel Letters</span>
                </h1>
                <p className="text-lg text-text-light/70 mb-4 leading-relaxed">
                  From classic face lit to our proprietary trimless
                  line, Sunlite manufactures the full spectrum of channel letter
                  styles. Wholesale direct to sign shops — we never sell retail.
                </p>
                <p className="text-text-light/50 mb-8">
                  Every set is German-engineered, UL listed, and
                  delivered within 3 weeks door to door. Trade pricing with no retail markup. Your clients stay yours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/get-a-quote" className="btn-primary">
                    Request Wholesale Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    href="/products/channel-letters/trimless"
                    className="btn-secondary"
                  >
                    Explore Trimless
                  </Link>
                </div>
              </div>
              <PlaceholderImage
                label="Channel letters hero — multiple styles showcase"
                className="rounded-xl"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Advantages Bar */}
      <section className="bg-navy/80 border-y border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <AnimatedSection key={adv.title} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                    <adv.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-light mb-1">
                      {adv.title}
                    </h3>
                    <p className="text-sm text-text-light/50">{adv.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Letter Types */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Wholesale Channel Letter Types
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto">
                Five distinct styles to match every brand, building, and budget.
                All manufactured in-house and available exclusively at trade pricing for sign shops.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {channelLetterTypes.map((type, index) => (
              <AnimatedSection key={type.slug} delay={index * 0.05}>
                <Link
                  href={`/products/channel-letters/${type.slug}`}
                  className="group block"
                >
                  <div
                    className={`bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      type.featured
                        ? "border-brand-gold/30 ring-1 ring-brand-gold/10"
                        : "border-black/5"
                    }`}
                  >
                    <div
                      className={`grid grid-cols-1 ${
                        index % 2 === 0 ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"
                      } items-center`}
                    >
                      <div className={index % 2 === 0 ? "" : "lg:order-2"}>
                        <PlaceholderImage
                          label={type.image}
                          className="rounded-none border-0 lg:min-h-[280px]"
                          aspectRatio="aspect-[16/10] lg:aspect-auto"
                        />
                      </div>
                      <div className="p-8 lg:p-10">
                        {type.featured && (
                          <span className="inline-block text-xs font-heading font-semibold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-3">
                            Flagship Innovation
                          </span>
                        )}
                        <h3 className="text-2xl font-heading font-bold text-text-dark group-hover:text-brand-gold transition-colors mb-3">
                          {type.name}
                        </h3>
                        <p className="text-text-dark/60 leading-relaxed mb-5">
                          {type.description}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {type.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-center gap-2 text-sm text-text-dark/70"
                            >
                              <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          Get Trade Pricing
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Ready to Order Wholesale Channel Letters?
              </h2>
              <p className="text-text-light/60 mb-4">
                Send us your project files and receive a detailed wholesale
                quote within 48 hours. We work from AI files, PDFs, or even
                napkin sketches.
              </p>
              <p className="text-text-light/40 text-sm mb-8">
                No retail markup. No middlemen. We never compete with our sign shop partners for their clients.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-a-quote" className="btn-primary text-base px-10 py-5">
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
