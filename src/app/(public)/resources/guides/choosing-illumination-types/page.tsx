import type { Metadata } from "next";
import { Check, X, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import type { HeroData } from "@/lib/admin/page-config-types";
import { getLocale } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("resources--guides--choosing-illumination-types", locale);
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
  };
}

const illuminationTypes = [
  { name: "Front-Lit", aka: "Face-Lit", description: "LEDs inside the channel project light forward through a translucent acrylic face, producing a bright, colorful glow visible from long distances. Face-lit letters are the most common and versatile illumination type in the channel letter industry.", image: "Face-lit channel letters glowing at night on a retail storefront", bestFor: ["Maximum visibility from long distances","Retail storefronts and shopping centers","Restaurants and fast-casual dining","Medical and dental offices","Any location prioritizing readability"], considerations: ["May appear too bold for luxury or understated brands","Acrylic face color accuracy is critical for brand matching","Requires UL-listed power supply and electrical connection"], visibility: "Excellent", aesthetic: "Bold and vibrant", cost: "$$" },
  { name: "Halo-Lit", aka: "Back-Lit", description: "LEDs project light backward from the channel letter onto the mounting surface, creating a soft, elegant glow or halo around the letter silhouette. The letter face is opaque. Halo-lit letters deliver a refined, architectural look.", image: "Halo-lit channel letters casting warm glow on a hotel facade", bestFor: ["Upscale and luxury brands","Hotels and boutique hospitality","Corporate offices and law firms","Architectural signage packages","Any project requiring sophisticated, understated presence"], considerations: ["Requires a flat, light-colored mounting surface for best effect","Less readable than face-lit at long distances or in bright daylight","Requires standoff mounting to create the gap for the halo","Dark or textured walls diminish the halo effect"], visibility: "Good (best in low ambient light)", aesthetic: "Elegant and architectural", cost: "$$$" },
  { name: "Front-and-Halo", aka: "Dual-Lit", description: "Combining both illumination methods in a single letter, front-and-halo delivers light through the translucent face and backward to create a halo simultaneously. This premium option provides maximum visual impact with both readability and refined depth.", image: "Front-and-halo channel letters with dual glow on modern building", bestFor: ["Flagship retail locations","Premium brand identities","High-traffic commercial areas","Entertainment and hospitality venues","Any project where the sign is a key architectural feature"], considerations: ["Higher cost due to additional LEDs and more complex engineering","Higher power consumption than single-illumination options","Still requires suitable mounting surface for the halo component","Balancing front and back illumination levels requires manufacturing expertise"], visibility: "Excellent", aesthetic: "Premium and dramatic", cost: "$$$$" },
  { name: "Non-Illuminated", aka: "Unlit", description: "Channel letters fabricated without internal lighting. Non-illuminated letters rely on ambient light, external spotlights, or gooseneck fixtures for visibility. They are the most cost-effective option and require no electrical connection.", image: "Non-illuminated dimensional metal letters on office building", bestFor: ["Interior lobby and reception signage","Secondary identification signs","Locations with illumination restrictions","Budget-conscious projects","Daytime-only visibility requirements"], considerations: ["Limited nighttime visibility without supplemental external lighting","External lighting (gooseneck, landscape spots) adds cost and installation complexity","Not suitable as primary identification where nighttime visibility is needed"], visibility: "Dependent on external light", aesthetic: "Clean and architectural", cost: "$" },
];

export default async function ChoosingIlluminationTypesPage() {
  const locale = await getLocale();
  const config = await loadStaticPageConfig("resources--guides--choosing-illumination-types", locale);

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }

  const hero = getBlock<HeroData>("hero");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"Choosing the Right Illumination Type for Channel Letters","description":"Guide for sign shop professionals on selecting the optimal channel letter illumination type based on visibility, brand aesthetic, mounting surface, and budget.","step":[{"@type":"HowToStep","position":1,"text":"Assess the primary viewing distance and ambient lighting"},{"@type":"HowToStep","position":2,"text":"Match illumination to the brand identity and aesthetic"},{"@type":"HowToStep","position":3,"text":"Evaluate the mounting surface for halo compatibility"},{"@type":"HowToStep","position":4,"text":"Check local regulations on sign illumination"},{"@type":"HowToStep","position":5,"text":"Compare costs across illumination types"},{"@type":"HowToStep","position":6,"text":"Present options to your client with visual examples"}]}) }} />
      {/* Hero */}
      {hero?.visible && (
        <section className="bg-bg-primary pt-32 pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs locale={locale} items={[{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: "Resources", href: "/resources" }, { name: "Guides", href: "/resources/guides" }, { name: "Choosing Illumination Types" }]} />
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{hero.data.badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">{hero.data.h1}</h1>
              <p className="text-lg text-white/60 max-w-2xl">{hero.data.subtitle}</p>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section className="section-padding bg-bg-primary">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {illuminationTypes.map((type, index) => (
              <AnimatedSection key={type.name}>
                <div className="max-w-5xl">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="lg:w-2/5"><PlaceholderImage label={type.image} className="rounded-xl" aspectRatio="aspect-[4/3]" /></div>
                    <div className="lg:w-3/5">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">{type.name}</h2>
                        <span className="text-sm text-white/40 font-heading">({type.aka})</span>
                      </div>
                      <div className="gold-line mb-4" />
                      <p className="text-white/70 leading-relaxed mb-6">{type.description}</p>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-bg-card border border-white/[0.06] rounded-lg p-3 text-center"><p className="text-xs text-white/40 font-heading uppercase tracking-wider mb-1">Visibility</p><p className="text-sm font-heading font-semibold text-white">{type.visibility}</p></div>
                        <div className="bg-bg-card border border-white/[0.06] rounded-lg p-3 text-center"><p className="text-xs text-white/40 font-heading uppercase tracking-wider mb-1">Aesthetic</p><p className="text-sm font-heading font-semibold text-white">{type.aesthetic}</p></div>
                        <div className="bg-bg-card border border-white/[0.06] rounded-lg p-3 text-center"><p className="text-xs text-white/40 font-heading uppercase tracking-wider mb-1">Cost</p><p className="text-sm font-heading font-semibold text-brand-gold">{type.cost}</p></div>
                      </div>
                      <h3 className="text-sm font-heading font-semibold text-white uppercase tracking-wider mb-3">Best For</h3>
                      <ul className="space-y-2 mb-6">{type.bestFor.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-white/60"><Check className="w-4 h-4 text-brand-gold flex-shrink-0" />{item}</li>))}</ul>
                      <h3 className="text-sm font-heading font-semibold text-white uppercase tracking-wider mb-3">Considerations</h3>
                      <ul className="space-y-2">{type.considerations.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-white/40"><X className="w-4 h-4 text-white/30 flex-shrink-0" />{item}</li>))}</ul>
                    </div>
                  </div>
                  {index < illuminationTypes.length - 1 && <div className="border-b border-white/10 mt-16" />}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/[0.02]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Quick Comparison</h2><div className="gold-line mx-auto" /></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-4 px-4 font-heading font-semibold text-white">Factor</th><th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">Front-Lit</th><th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">Halo-Lit</th><th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">Front & Halo</th><th className="text-center py-4 px-4 font-heading font-semibold text-brand-gold">Non-Illuminated</th></tr></thead>
                <tbody className="text-white/60">
                  {[{factor:"Daytime Visibility",values:["Excellent","Good","Excellent","Good"]},{factor:"Nighttime Visibility",values:["Excellent","Very Good","Excellent","Poor"]},{factor:"Long-Range Readability",values:["Excellent","Fair","Excellent","Poor at night"]},{factor:"Architectural Elegance",values:["Moderate","Excellent","Excellent","Good"]},{factor:"Relative Cost",values:["$$","$$$","$$$$","$"]},{factor:"Power Consumption",values:["Moderate","Moderate","Higher","None"]},{factor:"Wall Surface Dependency",values:["Low","High","High","None"]},{factor:"Best Brand Fit",values:["Retail","Luxury","Premium","Interior"]}].map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}><td className="py-3 px-4 font-heading font-medium text-white">{row.factor}</td>{row.values.map((val, j) => (<td key={j} className="py-3 px-4 text-center">{val}</td>))}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-bg-primary">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Decision Framework: 5 Questions to Ask Your Client</h2>
              <div className="gold-line mb-8" />
              <div className="space-y-6">
                {[{question:"What is the primary viewing distance?",guidance:"Highway or major road (100+ feet): face-lit. Pedestrian or street level (under 50 feet): any illumination type works. Interior: non-illuminated is often sufficient."},{question:"What is the brand personality?",guidance:"Bold, energetic, attention-grabbing brands favor face-lit. Refined, luxury, or architectural brands favor halo-lit. Premium brands wanting maximum impact choose front-and-halo."},{question:"What is the mounting surface?",guidance:"Flat, light-colored walls are ideal for halo-lit. Dark, textured, or uneven surfaces favor face-lit or non-illuminated. Evaluate the surface before committing to halo illumination."},{question:"What is the budget range?",guidance:"Present options at multiple price points. Many clients who start with a face-lit budget upgrade to front-and-halo when they see the difference in renderings. Wholesale trade pricing from Sunlite Signs helps you maintain strong margins across all options."},{question:"Are there local sign code restrictions?",guidance:"Some municipalities restrict illumination brightness, hours, or type. Verify codes before specifying. Non-illuminated may be required in certain historic districts."}].map((item, i) => (
                  <div key={i} className="bg-bg-card border border-white/[0.06] rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-white mb-2 flex items-start gap-3"><span className="text-brand-gold">{i + 1}.</span>{item.question}</h3>
                    <p className="text-sm text-white/60 leading-relaxed pl-7">{item.guidance}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
