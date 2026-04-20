import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroContent from "@/components/HeroContent";
import HeroSlider from "@/components/HeroSlider";
import CTASection from "@/components/CTASection";
import SafeHtml from "@/components/SafeHtml";
import { getIconComponent } from "@/lib/admin/icon-map";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import { getLocale } from "@/lib/i18n/get-locale";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("home", locale);
  function getBlock(id: string) {
    return config.blocks.find(b => b.id === id);
  }

  const hero = getBlock("hero");
  const marquee = getBlock("marquee");
  const stats = getBlock("stats");
  const story = getBlock("story");
  const featuredProjects = getBlock("featured_projects");
  const products = getBlock("products");
  const whySunlite = getBlock("why_sunlite");
  const engineering = getBlock("engineering");
  const testimonials = getBlock("testimonials");
  const process = getBlock("process");
  const resources = getBlock("resources");
  const cta = getBlock("cta");
  const finalTrust = getBlock("final_trust");
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Cinematic full-screen
          ═══════════════════════════════════════════ */}
      {hero?.visible && (() => {
        const ov = ((hero.data as any).overlayOpacity ?? 60) / 100;
        return (
      <section className="relative h-screen overflow-hidden">
        <HeroSlider />

        {/* Layered gradient overlays for depth — scaled by admin overlay opacity */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,${(0.9 * ov).toFixed(2)}), rgba(0,0,0,${(0.4 * ov).toFixed(2)}), rgba(0,0,0,${(0.2 * ov).toFixed(2)}))`
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,${(0.6 * ov).toFixed(2)}), transparent)`
          }}
        />

        {/* Hero content — bottom-left */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-10 lg:px-16 pb-28 lg:pb-36">
          <HeroContent className="max-w-3xl">
            {/* Animated accent line */}
            <div
              className="gold-line mb-10"
              style={{ animation: "lineGrow 1s ease-out 0.5s both" }}
            />

            <p className="micro-label mb-6">
              <SafeHtml html={(hero.data as any).badge} />
            </p>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-6 tracking-[-0.02em] font-bold">
              <SafeHtml html={(hero.data as any).h1} />
              <br />
              <span className="text-brand-gold">
                <SafeHtml html={(hero.data as any).h1Highlight} />
              </span>
            </h1>

            <p className="text-sm lg:text-base text-white/60 max-w-md font-body leading-relaxed mb-8">
              <SafeHtml html={(hero.data as any).subtitle} />
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              {(hero.data as any).ctas.map((cta: any) => (
                <LocaleLink locale={locale}
                  key={cta.href}
                  href={cta.href}
                  className={cta.variant === "primary" ? "btn-primary" : "btn-secondary"}
                >
                  <SafeHtml html={cta.label} />
                </LocaleLink>
              ))}
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
        );
      })()}

      {/* ═══════════════════════════════════════════
          MARQUEE — Infinite scrolling trade messaging
          ═══════════════════════════════════════════ */}
      {marquee?.visible && (
      <div className="overflow-hidden border-y border-brand-gold/10 bg-bg-primary py-4">
        <div className="flex animate-marquee">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {(marquee.data as any).messages.map((item: string, i: number) => (
                <span
                  key={`${set}-${i}`}
                  className="flex items-center mx-6 sm:mx-8"
                >
                  <span className="text-brand-gold/60 text-xs font-heading font-semibold uppercase tracking-[0.2em] whitespace-nowrap">
                    <SafeHtml html={item} />
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
      )}

      {/* ═══════════════════════════════════════════
          STATS — Key differentiators strip
          ═══════════════════════════════════════════ */}
      {stats?.visible && (
      <section className="px-6 sm:px-10 lg:px-16 -mt-2">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-bg-card rounded-xl border border-white/[0.06] overflow-hidden">
            {(stats.data as any).items.map((stat: any, i: number) => {
              const Icon = getIconComponent(stat.icon);
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="px-6 py-10 lg:py-14 text-center border-r border-white/[0.04] last:border-r-0">
                    {Icon && <Icon className="w-5 h-5 text-brand-gold/40 mx-auto mb-4" />}
                    <div className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent mb-2">
                      <SafeHtml html={stat.sublabel} />
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-white/30">
                      <SafeHtml html={stat.label} />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          FEATURED PROJECTS — Cinematic portfolio showcase
          ═══════════════════════════════════════════ */}
      {featuredProjects?.visible && (() => {
        const projects = (featuredProjects.data as any).images;
        // Asymmetric masonry: row 1 = 1 large + 1 tall, row 2 = 3 equal
        const sizes = ["lg:col-span-7 lg:row-span-2", "lg:col-span-5 lg:row-span-2", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
        const fallbackAspects = ["aspect-[16/10]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"];
        return (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
              <div>
                <p className="micro-label mb-5">Portfolio</p>
                <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] tracking-[-0.02em]">
                  Real Projects <span className="text-brand-gold">Delivered</span>
                </h2>
              </div>
              <LocaleLink locale={locale} href="/gallery" className="btn-ghost group shrink-0">
                View Full Gallery
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </LocaleLink>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-auto">
            {projects.slice(0, 5).map((project: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1} className={`${sizes[i] || "lg:col-span-4"}`}>
                <div className="group relative h-full rounded-xl overflow-hidden cursor-pointer">
                  {project.src && project.width && project.height ? (
                    /* Natural aspect ratio from upload dimensions */
                    <Image
                      src={project.src.startsWith("/") ? project.src : `/${project.src}`}
                      alt={project.alt || ""}
                      width={project.width}
                      height={project.height}

                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`${fallbackAspects[i] || "aspect-[4/3]"} h-full min-h-[240px] ${project.src ? "" : "bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent"}`}>
                      {project.src ? (
                        <Image
                          src={project.src.startsWith("/") ? project.src : `/${project.src}`}
                          alt={project.alt || ""}
                          fill
    
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,89,12,0.06),transparent_70%)]" />
                      )}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Always-visible category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.15em] text-brand-gold bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-brand-gold/20">
                      <SafeHtml html={project.category} />
                    </span>
                  </div>

                  {/* Hover-reveal details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-heading font-semibold text-sm mb-1"><SafeHtml html={project.type} /></p>
                    <div className="flex items-center gap-3 text-white/50 text-xs">
                      <span><SafeHtml html={project.location} /></span>
                      <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                      <span><SafeHtml html={project.turnaround} /></span>
                    </div>
                  </div>

                  {/* Subtle border glow on hover */}
                  <div className="absolute inset-0 rounded-xl border border-white/[0.06] group-hover:border-brand-gold/30 transition-colors duration-500" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
        );
      })()}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          PRODUCTS — What We Build grid
          ═══════════════════════════════════════════ */}
      {products?.visible && (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                What We <span className="text-brand-gold"><SafeHtml html={(products.data as any).headingHighlight} /></span>
              </h2>
              <p className="text-white/60 max-w-md mx-auto text-[15px]">
                <SafeHtml html={(products.data as any).description} />
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(products.data as any).items.map((product: any, i: number) => (
              <AnimatedSection key={product.name} delay={i * 0.08}>
                <LocaleLink locale={locale}
                  href={product.href}
                  className="group relative block overflow-hidden bg-bg-card border border-white/[0.06] rounded-xl hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {product.tag && (
                      <span className="product-tag absolute top-4 right-4">
                        <SafeHtml html={product.tag} />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-heading font-bold text-white">
                        <SafeHtml html={product.name} />
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      <SafeHtml html={product.description} />
                    </p>

                    {/* Spec chips */}
                    {product.chips && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.chips.map((chip: string) => (
                          <span key={chip} className="text-[10px] font-heading font-medium uppercase tracking-wider text-white/40 bg-white/[0.05] px-2 py-0.5 rounded">
                            <SafeHtml html={chip} />
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Best for */}
                    {product.bestFor && (
                      <p className="text-[11px] text-brand-gold/70 font-heading font-medium uppercase tracking-wider">
                        Best for: <SafeHtml html={product.bestFor} />
                      </p>
                    )}
                  </div>
                </LocaleLink>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          WHY SUNLITE — Trust/value cards
          ═══════════════════════════════════════════ */}
      {whySunlite?.visible && (
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="gold-line mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-[56px] font-display font-bold text-text-dark leading-[1.05] mb-5 tracking-[-0.02em]">
                  Why Sign Shops Choose <span className="text-brand-gold">Sunlite</span>
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(whySunlite.data as any).items.map((item: any, i: number) => {
                const Icon = getIconComponent(item.icon);
                return (
                  <AnimatedSection key={item.title} delay={i * 0.08}>
                    <div className="bg-white rounded-xl p-8 border border-black/[0.04] h-full hover:shadow-md hover:-translate-y-1 transition-all duration-400">
                      <div className="w-12 h-12 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-5">
                        {Icon && <Icon className="w-6 h-6 text-brand-gold" />}
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-text-dark mb-2">
                        <SafeHtml html={item.title} />
                      </h3>
                      <p className="text-sm text-text-dark/60 leading-relaxed">
                        <SafeHtml html={item.description} />
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          ENGINEERING — Complimentary services
          ═══════════════════════════════════════════ */}
      {engineering?.visible && (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
              <div>
                <p className="micro-label mb-5">
                  <SafeHtml html={(engineering.data as any).badge} />
                </p>
                <h2 className="text-3xl lg:text-[42px] font-display text-white leading-[1.1] mb-6 font-bold tracking-[-0.02em]">
                  <SafeHtml html={(engineering.data as any).heading} />{" "}
                  <span className="text-brand-gold"><SafeHtml html={(engineering.data as any).headingHighlight} /></span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 text-[15px]">
                  <SafeHtml html={(engineering.data as any).content} />
                </p>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {(engineering.data as any).bulletPoints.map((service: string) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 text-white/50 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light flex-shrink-0" />
                      <SafeHtml html={service} />
                    </div>
                  ))}
                </div>
                <LocaleLink locale={locale}
                  href={(engineering.data as any).linkHref}
                  className="btn-ghost group"
                >
                  <SafeHtml html={(engineering.data as any).linkText} />
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </LocaleLink>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={(engineering.data as any).image}
                    alt={(engineering.data as any).imageAlt}
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
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — Trade partner quotes
          ═══════════════════════════════════════════ */}
      {testimonials?.visible && (() => {
        const items = (testimonials.data as any).items;
        return (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Trusted by <span className="text-brand-gold">Trade Partners</span>
              </h2>
              <p className="text-white/60 max-w-lg mx-auto text-[15px]">
                Fast quoting, clear engineering, premium fabrication, and a wholesale-only model built to support sign professionals.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((item: any, i: number) => {
              const parts = item.question.split(" — ");
              const name = parts[0];
              const company = parts[1] || "";
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-bg-card border border-white/[0.06] rounded-xl p-8 h-full hover:border-brand-gold/20 transition-colors duration-400 relative">
                    {/* Large quote mark */}
                    <div className="absolute top-6 right-8 text-6xl font-display text-brand-gold/10 leading-none select-none">&ldquo;</div>
                    <p className="text-white/70 text-[15px] leading-relaxed mb-6 relative z-10">
                      <SafeHtml html={item.answer} />
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/[0.06] pt-5">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                        <span className="text-brand-gold font-heading font-bold text-sm">{name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-heading font-semibold text-sm">{name}</p>
                        <p className="text-white/40 text-xs">{company}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
        );
      })()}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          PROCESS — How It Works timeline
          ═══════════════════════════════════════════ */}
      {process?.visible && (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                From Artwork to <span className="text-brand-gold">Installation</span>
              </h2>
              <p className="text-white/60 max-w-lg mx-auto text-[15px]">
                A clear, trade-focused workflow designed to move projects from concept to delivery with speed and precision.
              </p>
            </div>
          </AnimatedSection>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:grid grid-cols-6 gap-0 relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-[8%] right-[8%] h-px bg-gradient-to-r from-brand-gold/20 via-brand-gold/40 to-brand-gold/20" />
            {(process.data as any).steps.map((step: any, i: number) => (
              <AnimatedSection key={step.step} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center px-3">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center mb-5 relative z-10 bg-bg-primary">
                    <span className="text-brand-gold font-heading font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-heading font-semibold text-white mb-2"><SafeHtml html={step.title} /></h3>
                  <p className="text-xs text-white/40 leading-relaxed"><SafeHtml html={step.description} /></p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden space-y-8 relative pl-10">
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-brand-gold/40 via-brand-gold/20 to-transparent" />
            {(process.data as any).steps.map((step: any, i: number) => (
              <AnimatedSection key={step.step} delay={i * 0.08}>
                <div className="relative">
                  <div className="absolute -left-10 top-0 w-9 h-9 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center bg-bg-primary">
                    <span className="text-brand-gold font-heading font-bold text-xs">{step.step}</span>
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white mb-1"><SafeHtml html={step.title} /></h3>
                  <p className="text-sm text-white/40 leading-relaxed"><SafeHtml html={step.description} /></p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="text-center mt-14">
              <LocaleLink locale={locale} href="/get-a-quote" className="btn-primary">
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </LocaleLink>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          STORY — Editorial brand introduction (moved lower)
          ═══════════════════════════════════════════ */}
      {story?.visible && (
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-bg-light rounded-2xl overflow-hidden">
          <div className="container-max px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={(story.data as any).image}
                      alt={(story.data as any).imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-brand-gold/40 rounded-br-lg hidden lg:block" />
                </div>

                <div>
                  <p className="micro-label mb-5">
                    <SafeHtml html={(story.data as any).badge} />
                  </p>
                  <h2 className="text-3xl lg:text-[42px] font-display text-text-dark leading-[1.1] mb-6 font-bold tracking-[-0.02em]">
                    <SafeHtml html={(story.data as any).heading} />{" "}
                    <span className="text-brand-gold"><SafeHtml html={(story.data as any).headingHighlight} /></span>
                  </h2>
                  {(story.data as any).content.split("\n\n").map((p: string, i: number) => (
                    <p key={i} className="text-text-dark/60 leading-relaxed mb-4 text-[15px]">
                      <SafeHtml html={p} />
                    </p>
                  ))}
                  <LocaleLink locale={locale}
                    href={(story.data as any).linkHref}
                    className="btn-text-link group"
                  >
                    <SafeHtml html={(story.data as any).linkText} />
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </LocaleLink>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          RESOURCES — Guides & resources for sign pros
          ═══════════════════════════════════════════ */}
      {resources?.visible && (
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display font-bold text-4xl lg:text-[56px] text-white leading-[1.05] mb-5 tracking-[-0.02em]">
                Signage <span className="text-brand-gold">Resources</span>
              </h2>
              <p className="text-white/60 max-w-lg mx-auto text-[15px]">
                Practical guides and technical content to help sign shops choose, sell, install, and spec the right solutions.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(resources.data as any).items.map((item: any, i: number) => {
              const Icon = getIconComponent(item.icon);
              return (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <LocaleLink locale={locale} href={item.href} className="group block bg-bg-card border border-white/[0.06] rounded-xl p-6 h-full hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-400">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                        {Icon && <Icon className="w-5 h-5 text-brand-gold" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-heading font-semibold text-white mb-1.5 group-hover:text-brand-gold transition-colors">
                          <SafeHtml html={item.title} />
                        </h3>
                        <p className="text-xs text-white/40 leading-relaxed mb-3">
                          <SafeHtml html={item.description} />
                        </p>
                        <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-gold/60 group-hover:text-brand-gold transition-colors flex items-center gap-1">
                          Read Guide
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </LocaleLink>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Gradient Divider */}
      <div className="gradient-divider my-20 mx-6 sm:mx-10 lg:mx-16" />

      {/* ═══════════════════════════════════════════
          CTA — Get Your Product Started
          ═══════════════════════════════════════════ */}
      {cta?.visible && (
      <CTASection locale={locale} />
      )}

      {/* ═══════════════════════════════════════════
          FINAL TRUST — Confidence block before footer
          ═══════════════════════════════════════════ */}
      {finalTrust?.visible && (
      <section className="px-6 sm:px-10 lg:px-16 pb-20">
        <div className="container-max">
          <AnimatedSection>
            <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-10 lg:p-14">
              <div className="text-center mb-10">
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-white tracking-[-0.02em]">
                  A Manufacturing Partner for <span className="text-brand-gold">Professional Sign Shops</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {(finalTrust.data as any).items.map((item: any, i: number) => {
                  const Icon = getIconComponent(item.icon);
                  return (
                    <div key={i} className="text-center">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-3">
                        {Icon && <Icon className="w-4 h-4 text-brand-gold" />}
                      </div>
                      <h3 className="text-xs font-heading font-semibold text-white mb-1"><SafeHtml html={item.title} /></h3>
                      <p className="text-[10px] text-white/30 leading-relaxed"><SafeHtml html={item.description} /></p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-10">
                <LocaleLink locale={locale} href="/get-a-quote" className="btn-primary">
                  Get Trade Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </LocaleLink>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      )}
    </>
  );
}
