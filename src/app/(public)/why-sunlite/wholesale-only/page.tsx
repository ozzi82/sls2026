import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Handshake, Clock, Phone, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("why-sunlite--wholesale-only");
  return { title: config.seo.title, description: config.seo.metaDescription, keywords: config.seo.keywords };
}

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
  const config = loadStaticPageConfig("why-sunlite--wholesale-only");
  function getBlock(id: string) { return config.blocks.find(b => b.id === id); }

  const heroData = getBlock("hero")!.data as any;
  const manifestoQuoteData = getBlock("manifesto-quote")!.data as any;
  const manifestoData = getBlock("manifesto")!.data as any;
  const partnershipData = getBlock("partnership-how")!.data as any;
  const trustData = getBlock("trust")!.data as any;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-navy/20 to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)]" />
        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Why Sunlite", href: "/why-sunlite" }, { name: "Wholesale Only" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{heroData.badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
                {heroData.h1}{" "}<span className="text-brand-gold">{heroData.h1Highlight}</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-4">{heroData.subtitle}</p>
              <p className="text-xl text-brand-gold font-heading font-semibold mb-8">{heroData.subtitleHighlight}</p>
              <div className="flex flex-wrap gap-4">
                {heroData.ctas.map((cta: any) => (
                  <Link key={cta.href} href={cta.href} className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}>{cta.label}</Link>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <PlaceholderImage label={heroData.image} className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MANIFESTO STATEMENT */}
      <section className="bg-bg-navy border-t border-white/10 border-b border-b-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">
                &ldquo;{manifestoQuoteData.content.split(". Every single one.")[0]}. <span className="text-brand-gold">Every single one.</span>{manifestoQuoteData.content.split("Every single one.")[1]}&rdquo;
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MANIFESTO SECTIONS */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">{manifestoData.heading}</h2>
              <p className="text-text-dark/60 max-w-2xl mx-auto">{manifestoData.description}</p>
            </div>
          </AnimatedSection>
          <div className="space-y-8">
            {manifestoData.items.map((item: any, index: number) => {
              const Icon = getIconComponent(item.icon);
              return (
                <AnimatedSection key={item.title} delay={index * 0.05}>
                  <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-black/[0.04] hover:border-brand-gold/20 transition-colors">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                          {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-dark mb-3">{item.title}</h3>
                        <p className="text-text-dark/70 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET / WHAT WE NEVER DO */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">The Trade Partner Guarantee</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Crystal clear. No fine print. No loopholes. Here is exactly what you get and exactly what we will never do.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                  <h3 className="text-xl font-heading font-semibold text-white">What You Get as a Trade Partner</h3>
                </div>
                <div className="space-y-4">
                  {whatYouGet.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-1" />
                      <p className="text-white/70 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-6 h-6 text-accent-red" />
                  <h3 className="text-xl font-heading font-semibold text-white">What We Will Never Do — Ever</h3>
                </div>
                <div className="space-y-4">
                  {whatWeNeverDo.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-accent-red/60 flex-shrink-0 mt-1" />
                      <p className="text-white/70 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HOW THE PARTNERSHIP WORKS */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <PlaceholderImage label="Sign shop receiving custom-crated wholesale shipment" className="rounded-xl" aspectRatio="aspect-[4/3]" />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="gold-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">{partnershipData.heading}</h2>
              <p className="text-text-dark/60 leading-relaxed mb-6">{partnershipData.description}</p>
              <div className="space-y-6">
                {partnershipData.steps.map((item: any) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                      <span className="text-brand-gold font-heading font-bold text-xs">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-text-dark mb-1">{item.title}</h4>
                      <p className="text-text-dark/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="section-padding bg-bg-navy">
        <div className="container-max">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">{trustData.heading}</h2>
              <p className="text-white/60 leading-relaxed mb-8">{trustData.content}</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-heading uppercase tracking-wider text-white/40">
                <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-brand-gold" />Wholesale Only</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2"><Handshake className="w-4 h-4 text-brand-gold" />Trade Accounts Only</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-gold" />48-Hour Trade Quotes</span>
                <span className="hidden sm:inline text-white/20">|</span>
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-gold" />Dedicated Trade Support</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
