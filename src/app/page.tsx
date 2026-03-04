import Link from "next/link";
import {
  Shield,
  Truck,
  Clock,
  Globe,
  Send,
  FileText,
  Package,
  ArrowRight,
  Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";

const products = [
  {
    name: "Front Lit Channel Letters",
    description: "Classic illuminated letters with front-facing LED glow. Wholesale pricing for sign shops.",
    href: "/products/channel-letters/front-lit",
  },
  {
    name: "Halo Lit Channel Letters",
    description: "Elegant backlit glow for a premium architectural look. Trade accounts only.",
    href: "/products/channel-letters/halo-lit",
  },
  {
    name: "Trimless / EdgeLuxe",
    description: "Our flagship innovation — seamless letters with zero trim cap. Exclusive to the trade.",
    href: "/products/channel-letters/trimless",
  },
  {
    name: "Flat Cut Letters",
    description: "Precision-cut metal letters for a clean, dimensional look. Wholesale direct.",
    href: "/products/flat-cut-letters",
  },
  {
    name: "Blade Signs",
    description: "Projecting signs for maximum storefront visibility. Trade pricing available.",
    href: "/products/blade-signs",
  },
  {
    name: "Lightboxes",
    description: "Illuminated cabinet signs for bold brand presence. Wholesale to sign companies only.",
    href: "/products/lightboxes",
  },
];

const whyBlocks = [
  {
    title: "German Engineering, American Wholesale",
    description:
      "Our partnership with LKF Lichtwerbung in Nuremberg brings decades of German precision engineering to every sign we produce — and we pass it direct to you at wholesale pricing. No middlemen. No retail markup. Just German-engineered quality at trade prices.",
    image: "LKF facility or German precision equipment",
  },
  {
    title: "UL Listed — Every Single Sign",
    description:
      "Every illuminated sign that leaves our facility carries UL certification. As a wholesale partner, you get signs your clients can trust and inspectors will approve. Your reputation is protected.",
    image: "UL certification badge or testing process",
  },
  {
    title: "We Never Compete With You. Period.",
    description:
      "Sunlite sells exclusively to the trade. We do not have a retail storefront. We do not sell direct to end users. Your clients are YOUR clients. We are your silent manufacturing partner.",
    image: "Crated signs ready for wholesale shipping",
  },
  {
    title: "EdgeLuxe Trimless — Only Through the Trade",
    description:
      "The hottest trend in architectural signage — trimless channel letters with zero visible trim cap. Clean. Modern. Seamless. And only available through authorized sign shops like you.",
    image: "EdgeLuxe trimless channel letter detail shot",
  },
];

const steps = [
  {
    icon: Send,
    title: "Submit Your Project",
    description: "Send drawings, specs, or even a napkin sketch. We work with whatever you have. Trade accounts only.",
  },
  {
    icon: FileText,
    title: "Wholesale Quote in 48 Hrs",
    description: "Detailed trade pricing with full material specs. No retail markup. No obligation. No games.",
  },
  {
    icon: Package,
    title: "We Build, You Profit",
    description: "UL-listed, German-engineered, crated and shipped direct. Your brand, your margin, our craftsmanship.",
  },
];

const testimonials = [
  {
    quote:
      "Finally a wholesale manufacturer that stays in their lane. They build, we sell, everybody wins.",
    company: "[Sign Shop]",
    location: "[City, State]",
  },
  {
    quote:
      "48-hour wholesale quotes and they never undercut us with retail clients. That is a real partner.",
    company: "[Sign Shop]",
    location: "[City, State]",
  },
  {
    quote:
      "The EdgeLuxe trimless letters are the cleanest product we have ever installed. Our margins are excellent.",
    company: "[Sign Shop]",
    location: "[City, State]",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sunlite Signs LLC",
    url: "https://sunlitesigns.com",
    description:
      "German-engineered wholesale channel letters and illuminated signs for sign shops across the USA and Canada. Trade accounts only.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-890",
      contactType: "sales",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-navy/20 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.08),transparent_70%)]" />

        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center pt-20">
          <AnimatedSection>
            {/* Wholesale Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-5 py-2 mb-8">
              <Lock className="w-4 h-4 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                Wholesale Only — Trade Accounts
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-light leading-tight mb-6">
              German-Engineered Signs.
              <br />
              <span className="text-brand-gold">Wholesale Pricing.</span>
              <br />
              <span className="text-text-light/60 text-3xl sm:text-4xl md:text-5xl">Zero Retail Competition.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-light/70 max-w-2xl mx-auto mb-10 font-body">
              We manufacture premium channel letters, blade signs, and flat cut letters exclusively
              for sign shops. We never sell retail. Your clients stay yours. UL listed. Shipped in 4 weeks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/get-a-quote" className="btn-primary text-base px-10 py-5">
                Request Wholesale Pricing
              </Link>
              <Link href="/products" className="btn-secondary text-base px-10 py-5">
                Browse Trade Catalog
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Trust Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-primary-dark/80 backdrop-blur-sm">
          <div className="container-max px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-heading uppercase tracking-wider text-text-light/50">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-gold" /> Wholesale Only
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-gold" /> UL Listed &amp; Certified
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-gold" /> German Engineering (LKF)
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" /> 48-Hour Trade Quotes
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-gold" /> Ships to USA &amp; Canada
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHOLESALE ONLY BANNER */}
      <section className="bg-brand-gold py-4">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <p className="text-center text-primary-dark font-heading font-bold text-sm uppercase tracking-wider">
            Sunlite Signs sells exclusively to sign companies, sign shops, and trade professionals. We do not sell to the general public.
          </p>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Wholesale Product Catalog
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto">
                Premium signage at trade pricing. Every product engineered in partnership with LKF Germany. Available exclusively to sign shops.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <AnimatedSection key={product.name} delay={index * 0.1}>
                <Link href={product.href} className="group block">
                  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                    <PlaceholderImage
                      label={product.name}
                      className="rounded-none border-0"
                      aspectRatio="aspect-[4/3]"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-semibold text-text-light group-hover:text-brand-gold transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-text-light/50 text-sm mb-4">{product.description}</p>
                      <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                        View Trade Specs{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-secondary">
              View Full Wholesale Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SIGN SHOPS CHOOSE SUNLITE */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Built for the Trade. Never Sold Retail.
              </h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">
                We exist for one reason: to be the best wholesale sign manufacturer your shop has ever worked with. No retail sales. No competing with our partners. Ever.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-16 md:space-y-24">
            {whyBlocks.map((block, index) => (
              <AnimatedSection key={block.title}>
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-16`}
                >
                  <div className="flex-1">
                    <PlaceholderImage
                      label={block.image}
                      className="rounded-xl"
                      aspectRatio="aspect-[4/3]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="gold-line mb-4" />
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-4">
                      {block.title}
                    </h3>
                    <p className="text-text-dark/70 leading-relaxed">{block.description}</p>
                    <Link
                      href="/why-sunlite"
                      className="inline-flex items-center gap-2 mt-6 text-brand-gold font-heading font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all"
                    >
                      Learn Why Shops Choose Us <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Installed by Our Trade Partners
              </h2>
              <p className="text-text-light/60">Products we manufactured. Installed by sign shops like yours.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Front lit channel letters — night installation",
                "Halo lit letters on brick facade",
                "EdgeLuxe trimless installation",
                "Blade sign — street view",
              ].map((label, i) => (
                <PlaceholderImage
                  key={i}
                  label={label}
                  className="rounded-xl"
                  aspectRatio="aspect-square"
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/gallery" className="btn-secondary">
                View Full Project Gallery
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Your Wholesale Partner in 3 Steps
              </h2>
              <p className="text-text-light/60">From quote to delivery — simple, fast, and built for the trade.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.15}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                    <step.icon className="w-7 h-7 text-brand-gold" />
                  </div>
                  <div className="text-brand-gold font-heading font-bold text-sm mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-light mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-light/60 text-sm">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-light-bg">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Trusted by Sign Shops Nationwide
              </h2>
              <p className="text-text-dark/60">Hear from trade partners who rely on Sunlite for wholesale signage.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-black/5">
                  <div className="text-brand-gold text-4xl font-heading mb-4">&ldquo;</div>
                  <p className="text-text-dark/80 leading-relaxed mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div className="text-sm">
                    <p className="font-heading font-semibold text-text-dark">
                      {testimonial.company}
                    </p>
                    <p className="text-text-dark/50">{testimonial.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-5 py-2 mb-6">
                <Lock className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                  Trade Accounts Only
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Ready to Add Sunlite to Your Supply Chain?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Request wholesale pricing for your next project. Detailed trade quotes within 48 hours. No obligation. No retail markup.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/get-a-quote" className="btn-primary text-base px-10 py-5">
                  Request Wholesale Pricing
                </Link>
                <Link href="/why-sunlite/wholesale-only" className="btn-secondary text-base px-10 py-5">
                  Why We Sell Wholesale Only
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-light/50">
                <a href="tel:+1234567890" className="hover:text-brand-gold transition-colors">
                  (123) 456-7890
                </a>
                <a
                  href="mailto:info@sunlitesigns.com"
                  className="hover:text-brand-gold transition-colors"
                >
                  info@sunlitesigns.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-20 lg:hidden" />
    </>
  );
}
