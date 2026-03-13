import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Clock,
  Truck,
  Zap,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroContent from "@/components/HeroContent";
import HeroSlider from "@/components/HeroSlider";
import CTASection from "@/components/CTASection";

const products = [
  {
    name: "Channel Letters",
    description: "Face lit, halo lit & combination LED illumination",
    image: "/homepage-channel-letters.jpg",
    href: "/products/channel-letters",
    tag: "Most Popular" as string | null,
  },
  {
    name: "EdgeLuxe Trimless",
    description: '1.2" profile, embedded LEDs, no trim cap',
    image: "/hero-bg1.jpg",
    href: "/products/channel-letters/trimless",
    tag: "Premium" as string | null,
  },
  {
    name: "FCO Flat Cut",
    description: "Precision-cut aluminum & stainless steel letterforms",
    image: "/hero-bg4.jpg",
    href: "/products/flat-cut-letters",
    tag: null as string | null,
  },
  {
    name: "Blade Signs",
    description: "Projecting signs for maximum storefront visibility",
    image: "/homepage-blade-cabinet.jpg",
    href: "/products/blade-signs",
    tag: null as string | null,
  },
  {
    name: "Cabinet Signs",
    description: "Illuminated cabinet & push-through signage",
    image: "/hero-bg3.jpg",
    href: "/products/lightboxes",
    tag: null as string | null,
  },
  {
    name: "SEG Light Boxes",
    description: 'Silicone-edged graphic displays from 1" deep',
    image: "/homepage-seg.jpg",
    href: "/products/seg-light-boxes",
    tag: "New" as string | null,
  },
];

const stats = [
  { value: "UL 48", label: "Listed & Certified", icon: Shield },
  { value: "24h", label: "Quote Turnaround", icon: Clock },
  { value: "3 Wk", label: "Door-to-Door", icon: Truck },
  { value: "US/CA", label: "Nationwide Shipping", icon: Zap },
];

const marqueeItems = [
  "WHOLESALE ONLY",
  "UL 48 LISTED",
  "24-HOUR QUOTES",
  "3-WEEK DELIVERY",
  "USA & CANADA",
  "GERMAN ENGINEERING",
  "TRADE ACCOUNTS",
  "NO RETAIL SALES",
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Cinematic full-screen
          ═══════════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden">
        <HeroSlider />

        {/* Layered gradient overlays for depth */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 to-transparent" />

        {/* Hero content — bottom-left */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-10 lg:px-16 pb-28 lg:pb-36">
          <HeroContent className="max-w-3xl">
            {/* Animated accent line */}
            <div
              className="gold-line mb-10"
              style={{ animation: "lineGrow 1s ease-out 0.5s both" }}
            />

            <p className="micro-label mb-6">
              Wholesale Only · Trade Accounts
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] text-white leading-[1.02] mb-8 tracking-[-0.03em] font-bold">
              Precision Signage,
              <br />
              <span className="text-brand-gold">
                Exclusively Wholesale.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-white/60 max-w-lg font-body leading-relaxed mb-10">
              German-engineered channel letters, blade signs &amp; illuminated
              signage — built for sign shops, never sold retail.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/get-a-quote"
                className="btn-primary"
              >
                Request Trade Pricing
              </Link>
              <Link
                href="/products"
                className="btn-secondary"
              >
                View Products
              </Link>
            </div>
          </HeroContent>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-white/20">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE — Infinite scrolling trade messaging
          ═══════════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-brand-gold/10 bg-bg-primary py-4">
        <div className="flex animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {marqueeItems.map((item, i) => (
                <span
                  key={`${set}-${i}`}
                  className="flex items-center mx-6 sm:mx-8"
                >
                  <span className="text-brand-gold/60 text-xs font-heading font-semibold uppercase tracking-[0.2em] whitespace-nowrap">
                    {item}
                  </span>
                  <span className="ml-6 sm:ml-8 text-brand-gold/20 text-[8px]">
                    &#x25C6;
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          STATS — Key differentiators strip
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 -mt-2">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-bg-card rounded-xl border border-white/[0.06] overflow-hidden">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="px-6 py-10 lg:py-14 text-center border-r border-white/[0.04] last:border-r-0">
                  <stat.icon className="w-5 h-5 text-brand-gold/40 mx-auto mb-4" />
                  <div className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-white/30">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          STORY — Editorial brand introduction
          ═══════════════════════════════════════════ */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="/homepage-story.png"
                      alt="Sunlite Signs team and LKF Lichtwerbung partnership"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative corner accent */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-brand-gold/40 rounded-br-lg hidden lg:block" />
                </div>

                <div>
                  <p className="micro-label mb-5">
                    Our Story
                  </p>
                  <h2 className="text-3xl lg:text-[42px] font-display text-text-dark leading-[1.1] mb-6 font-bold tracking-[-0.02em]">
                    Custom European Signage,{" "}
                    <span className="text-brand-gold">Wholesale.</span>
                  </h2>
                  <p className="text-text-dark/60 leading-relaxed mb-4 text-[15px]">
                    The foundation of Sunlite Signs begins with a partnership
                    rooted in German precision engineering — and a commitment to
                    never compete with our customers.
                  </p>
                  <p className="text-text-dark/60 leading-relaxed mb-8 text-[15px]">
                    From LKF Lichtwerbung in Nuremberg to Florida, we bring
                    decades of European signage expertise exclusively to the
                    trade.
                  </p>
                  <Link
                    href="/about"
                    className="btn-text-link group"
                  >
                    Read Our Story
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          PRODUCTS — What We Build grid
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                What We <span className="text-brand-gold">Build</span>
              </h2>
              <p className="text-white/60 max-w-md mx-auto text-[15px]">
                Precision-engineered signage solutions, manufactured exclusively
                for the trade.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <AnimatedSection key={product.name} delay={i * 0.08}>
                <Link
                  href={product.href}
                  className="group relative block aspect-[4/3] overflow-hidden bg-bg-card border border-white/[0.06] rounded-xl hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />
                  {product.tag && (
                    <span className="product-tag absolute top-4 right-4">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-heading font-bold text-white mb-1 flex items-center gap-2">
                      {product.name}
                      <ArrowUpRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h3>
                    <p className="text-sm text-white/0 group-hover:text-white/50 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      {product.description}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          ENGINEERING — Complimentary services
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
              <div>
                <p className="micro-label mb-5">
                  Included with Every Project
                </p>
                <h2 className="text-3xl lg:text-[42px] font-display text-white leading-[1.1] mb-6 font-bold tracking-[-0.02em]">
                  Complimentary{" "}
                  <span className="text-brand-gold">Engineering.</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 text-[15px]">
                  With our German design and engineering roots, we contribute
                  complimentary engineering services to every project — from
                  conceptual integration of structural and material sciences, to
                  manufacturing engineering and packaging.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {[
                    "Concept & Materials",
                    "Structural Engineering",
                    "Electrical Layout",
                    "Manufacturing Engineering",
                  ].map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 text-white/50 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light flex-shrink-0" />
                      {service}
                    </div>
                  ))}
                </div>
                <Link
                  href="/services"
                  className="btn-ghost group"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/homepage-engineering.jpg"
                    alt="Sunlite Signs engineering team designing channel letters"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Decorative corner accent */}
                <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-brand-gold/40 rounded-tl-lg hidden lg:block" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA — Get Your Product Started
          ═══════════════════════════════════════════ */}
      <CTASection />
    </>
  );
}
