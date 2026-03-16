import type { Metadata } from "next";
import { AlertTriangle, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import type { HeroData } from "@/lib/admin/page-config-types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = loadStaticPageConfig("resources--guides--sign-installation-tips");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
  };
}

export default function SignInstallationTipsPage() {
  const config = loadStaticPageConfig("resources--guides--sign-installation-tips");

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }

  const hero = getBlock<HeroData>("hero");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"Sign Installation Tips and Best Practices","description":"Professional installation guide for wholesale channel letters covering mounting methods, electrical connections, and field best practices.","step":[{"@type":"HowToStep","position":1,"text":"Review shop drawings and verify all components before site arrival"},{"@type":"HowToStep","position":2,"text":"Prepare the mounting surface and confirm structural support"},{"@type":"HowToStep","position":3,"text":"Position the paper pattern and mark mounting points"},{"@type":"HowToStep","position":4,"text":"Install mounting hardware and studs"},{"@type":"HowToStep","position":5,"text":"Mount the letters and verify alignment"},{"@type":"HowToStep","position":6,"text":"Complete electrical connections per UL requirements"},{"@type":"HowToStep","position":7,"text":"Perform final inspection and burn-in test"}]}) }} />
      {/* Hero */}
      {hero?.visible && (
        <section className="bg-bg-primary pt-32 pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "Guides", href: "/resources/guides" }, { name: "Sign Installation Tips" }]} />
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
          <div className="max-w-3xl">
            <AnimatedSection><div className="mb-16"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Pre-Installation Planning</h2><div className="gold-line mb-6" /><h3 className="text-xl font-heading font-semibold text-white mt-8 mb-3">Site Survey</h3><p className="text-white/70 leading-relaxed mb-4">A thorough site survey before the installation date prevents costly surprises. Verify the mounting surface material (brick, EIFS, metal panel, CMU, wood), surface flatness, and structural integrity. Identify the electrical feed location and verify voltage. Photograph the installation area and note any obstacles such as architectural features, downspouts, utility conduits, or overhangs.</p><h3 className="text-xl font-heading font-semibold text-white mt-8 mb-3">Verify Measurements</h3><p className="text-white/70 leading-relaxed mb-4">Double-check all field measurements against the approved shop drawings. Verify the overall sign width, letter spacing, mounting height, and alignment with architectural features. It is much easier to catch a measurement error before the crane arrives than during installation.</p><h3 className="text-xl font-heading font-semibold text-white mt-8 mb-3">Permits and Access</h3><p className="text-white/70 leading-relaxed mb-4">Confirm that all required sign permits have been issued. Arrange for any necessary road or sidewalk closures, crane access, and building access for electrical connections. Communicate the installation schedule with the building owner or property manager.</p><PlaceholderImage label="Installation crew performing site survey with measuring tools" className="rounded-xl my-8" aspectRatio="aspect-[16/9]" /></div></AnimatedSection>
            <AnimatedSection><div className="mb-16"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Mounting Methods</h2><div className="gold-line mb-6" /><h3 className="text-xl font-heading font-semibold text-white mt-6 mb-3">Direct Stud Mount</h3><p className="text-white/70 leading-relaxed mb-4">For direct stud mounting, use the paper pattern provided with your Sunlite Signs wholesale order to mark stud locations on the building surface. Core drill holes at each marked location. Feed the letter studs through the holes, and secure from behind with nuts and washers. Seal all penetrations with high-quality silicone sealant to prevent water infiltration.</p><h3 className="text-xl font-heading font-semibold text-white mt-8 mb-3">Raceway Installation</h3><p className="text-white/70 leading-relaxed mb-4">When installing a raceway-mounted letter set, first secure the raceway to the building surface using appropriate fasteners for the wall material. Level the raceway carefully, as any tilt will be visible in the finished installation. After the raceway is secured, mount the pre-wired letters to the raceway and make the single electrical connection.</p><h3 className="text-xl font-heading font-semibold text-white mt-8 mb-3">Standoff Mounting for Halo-Lit Letters</h3><p className="text-white/70 leading-relaxed mb-4">Halo-lit letters require standoffs to create the gap between the letter and the wall that allows the backlight halo to develop. Ensure standoff lengths are consistent across all letters for uniform halo depth. The standoff length should be sufficient to create a visible halo (typically 1&quot; to 2&quot;) without excessive gap that diminishes the effect.</p><div className="bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-6 my-8"><div className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" /><div><h4 className="font-heading font-semibold text-white mb-2">Important: Wall Surface Considerations</h4><p className="text-sm text-white/60">Different wall materials require different fasteners and techniques. EIFS (synthetic stucco) requires special blocking behind the surface for adequate support. Metal panel facades may need structural clips or through-bolting. Always use fasteners rated for the specific wall material and anticipated wind loads.</p></div></div></div></div></AnimatedSection>
            <AnimatedSection><div className="mb-16"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Electrical Connections</h2><div className="gold-line mb-6" /><p className="text-white/70 leading-relaxed mb-4">All electrical connections for illuminated channel letters must be performed by a licensed electrician in compliance with local building codes and the National Electrical Code (NEC). Key electrical considerations include:</p><ul className="space-y-3 mb-6">{["Verify that the dedicated circuit matches the power supply requirements (typically 120V or 240V AC, 20A circuit).","Install a disconnect switch accessible from ground level, as required by most local codes.","Use weatherproof junction boxes and connectors rated for outdoor use.","All wiring between letters (for direct stud mount) must be properly secured and protected from weather exposure.","Verify proper grounding of all metal components per NEC requirements.","Test all illumination after connection. Check for even illumination across all letters and consistent color temperature."].map((item, i) => (<li key={i} className="flex items-start gap-3 text-white/70"><span className="text-brand-gold mt-1 font-bold text-sm">&#10003;</span><span>{item}</span></li>))}</ul><p className="text-white/70 leading-relaxed">Sunlite Signs provides complete wiring diagrams and electrical specifications with every wholesale order. All illuminated products are UL listed, which means the internal wiring and components have been tested and certified for safety.</p></div></AnimatedSection>
            <AnimatedSection><div className="mb-16"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Weather Sealing and Protection</h2><div className="gold-line mb-6" /><p className="text-white/70 leading-relaxed mb-4">Proper weather sealing during installation protects both the sign and the building from water damage. Seal all wall penetrations with high-quality, exterior-rated silicone sealant. Pay special attention to the top edges of raceways and backer panels where water can pool.</p><p className="text-white/70 leading-relaxed mb-4">Verify that all channel letter weep holes are positioned at the bottom of each letter to allow condensation drainage. Ensure that no weep holes are blocked by mounting hardware or sealant. In coastal or high-humidity environments, consider applying additional corrosion-resistant coatings to exposed metal components.</p><p className="text-white/70 leading-relaxed">For raceways, ensure the wire entry point into the building is properly sealed and positioned to prevent water from following the wiring into the building interior. Use drip loops in exterior wiring to direct water away from connections.</p></div></AnimatedSection>
            <AnimatedSection><div className="mb-16"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Post-Installation Quality Checklist</h2><div className="gold-line mb-6" /><p className="text-white/70 leading-relaxed mb-6">Before leaving the job site, run through this quality assurance checklist:</p><div className="space-y-3">{["All letters are level and properly aligned with each other and architectural features.","Letter spacing matches the approved shop drawings.","All illumination is functioning — check every letter for even, consistent light.","No dark spots, uneven illumination, or flickering in any letter.","Color temperature is consistent across all letters in the set.","All wall penetrations are sealed with exterior-rated silicone.","Raceway or backer panel is level and securely fastened.","Disconnect switch is accessible and properly labeled.","All weep holes are clear and unobstructed.","Job site is clean — all packaging, fastener debris, and drill dust removed.","Final photos taken (day and night) for your records and the client."].map((item, i) => (<div key={i} className="flex items-start gap-3 text-white/70 bg-bg-card border border-white/[0.06] rounded-lg p-4"><div className="w-6 h-6 rounded border-2 border-brand-gold/30 flex-shrink-0 flex items-center justify-center mt-0.5"><span className="text-brand-gold text-xs font-bold">{i + 1}</span></div><span className="text-sm">{item}</span></div>))}</div></div></AnimatedSection>
            <AnimatedSection><div className="mb-16"><h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Common Installation Mistakes to Avoid</h2><div className="gold-line mb-6" /><ul className="space-y-4">{[{mistake:"Skipping the site survey",fix:"Always verify the mounting surface, electrical feed, and access conditions before installation day."},{mistake:"Using wrong fasteners for the wall type",fix:"Match fasteners to the specific wall material. Toggle bolts for hollow walls, expansion anchors for concrete, lag bolts for wood framing."},{mistake:"Inadequate sealing of wall penetrations",fix:"Use exterior-rated silicone on every penetration. Water damage from a poorly sealed sign installation is a costly callback."},{mistake:"Not testing illumination before final mounting",fix:"Bench-test all letters on the ground before lifting them into position. It is much easier to troubleshoot at ground level."},{mistake:"Inconsistent standoff lengths for halo-lit letters",fix:"Measure and verify every standoff before installation. Even small inconsistencies create visible unevenness in the halo effect."}].map((item, i) => (<li key={i} className="bg-bg-card border border-white/[0.06] rounded-lg p-5"><p className="font-heading font-semibold text-accent-red mb-1">Mistake: {item.mistake}</p><p className="text-white/60 text-sm">{item.fix}</p></li>))}</ul></div></AnimatedSection>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
