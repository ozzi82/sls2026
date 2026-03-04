import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Channel Letter Buying Guide for Sign Shops — Wholesale | Sunlite Signs",
  description:
    "Everything sign shop professionals and trade buyers need to know about specifying and ordering wholesale channel letters. Covers types, illumination, materials, sizing, mounting options, and choosing a wholesale-only manufacturer.",
  keywords: [
    "wholesale channel letter buying guide",
    "how to order wholesale channel letters",
    "wholesale channel letter specification",
    "channel letter materials trade",
    "channel letter sizing guide",
    "channel letter mounting options",
    "sign shop wholesale ordering guide",
  ],
  openGraph: {
    title: "Channel Letter Buying Guide for Sign Shops — Wholesale | Sunlite Signs",
    description:
      "Everything trade buyers need to know about specifying and ordering wholesale channel letters. Types, materials, sizing, and manufacturer selection.",
    url: "https://sunlitesigns.com/resources/guides/channel-letter-buying-guide",
  },
};

export default function ChannelLetterBuyingGuidePage() {
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
              { name: "Channel Letter Buying Guide" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-light mb-6">
              The Complete Channel Letter Buying Guide
            </h1>
            <p className="text-lg text-text-light/60 max-w-2xl">
              A comprehensive wholesale guide for sign shop professionals and trade buyers covering every aspect of specifying,
              ordering, and evaluating wholesale channel letters from a manufacturer that sells exclusively to the trade.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-primary-dark border-b border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          <AnimatedSection>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 max-w-3xl">
              <h2 className="text-lg font-heading font-semibold text-text-light mb-4">
                In This Guide
              </h2>
              <nav>
                <ol className="space-y-2 text-sm">
                  {[
                    { id: "types", label: "Types of Channel Letters" },
                    { id: "illumination", label: "Illumination Options" },
                    { id: "materials", label: "Materials and Construction" },
                    { id: "sizing", label: "Sizing and Visibility" },
                    { id: "mounting", label: "Mounting Options" },
                    { id: "manufacturer", label: "What to Look for in a Wholesale Manufacturer" },
                    { id: "ordering", label: "The Wholesale Ordering Process" },
                  ].map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-text-light/50 hover:text-brand-gold transition-colors flex items-center gap-3"
                      >
                        <span className="text-brand-gold font-heading font-bold">{i + 1}.</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Guide Content */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-3xl prose-headings:font-heading prose-headings:text-text-light prose-p:text-text-light/70 prose-strong:text-text-light prose-a:text-brand-gold prose-li:text-text-light/70">
            {/* Section 1 */}
            <AnimatedSection>
              <div id="types" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  1. Types of Channel Letters
                </h2>
                <div className="gold-line mb-6" />
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Channel letters come in several distinct configurations, each suited to different aesthetic and functional requirements. Understanding the differences allows you to recommend the ideal wholesale solution for every client project.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Standard Channel Letters
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  The most common configuration features aluminum returns, an acrylic face, and an aluminum back panel. LED modules inside the cavity illuminate the translucent face. Standard channel letters use a trim cap to secure the face to the returns.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Trimless (EdgeLuxe) Channel Letters
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Trimless letters eliminate the plastic trim cap, creating a seamless, modern junction between the face and returns. Sunlite Signs&apos; EdgeLuxe system uses German-engineered precision to achieve this clean aesthetic without compromising durability. Available exclusively at wholesale trade pricing.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Reverse Channel Letters
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Constructed with the open channel facing the mounting surface, reverse channel letters have an opaque metal face and project light exclusively backward to create a halo effect. They offer a premium, architectural appearance.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Open-Face Channel Letters
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Open-face letters have no acrylic covering, exposing the LED modules (or neon) inside. This creates a retro, industrial, or artisanal look popular with restaurants, breweries, and entertainment venues.
                </p>
                <PlaceholderImage
                  label="Comparison of 4 channel letter types side by side"
                  className="rounded-xl my-8"
                  aspectRatio="aspect-[16/9]"
                />
              </div>
            </AnimatedSection>

            {/* Section 2 */}
            <AnimatedSection>
              <div id="illumination" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  2. Illumination Options
                </h2>
                <div className="gold-line mb-6" />
                <p className="text-text-light/70 leading-relaxed mb-6">
                  The illumination style defines how the sign looks at night and significantly impacts brand perception. All four primary options are available at wholesale trade pricing:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose mb-6">
                  {[
                    {
                      title: "Front-Lit",
                      desc: "Light passes through the translucent face for maximum visibility and readability at all distances.",
                    },
                    {
                      title: "Halo-Lit",
                      desc: "Light projects backward creating a soft halo on the mounting surface. Elegant and architectural.",
                    },
                    {
                      title: "Front & Halo",
                      desc: "Dual illumination for maximum impact. Combines face glow with rear halo for premium presence.",
                    },
                    {
                      title: "Non-Illuminated",
                      desc: "No internal lighting. Cost-effective for interior signs or areas with lighting restrictions.",
                    },
                  ].map((option) => (
                    <div
                      key={option.title}
                      className="bg-white/5 border border-white/10 rounded-lg p-5"
                    >
                      <h4 className="font-heading font-semibold text-brand-gold mb-2">
                        {option.title}
                      </h4>
                      <p className="text-sm text-text-light/60">{option.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-text-light/70 leading-relaxed">
                  For a deep dive into illumination selection, see our dedicated guide: {" "}
                  <Link href="/resources/guides/choosing-illumination-types" className="text-brand-gold hover:underline">
                    Choosing the Right Illumination Type
                  </Link>.
                </p>
              </div>
            </AnimatedSection>

            {/* Section 3 */}
            <AnimatedSection>
              <div id="materials" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  3. Materials and Construction
                </h2>
                <div className="gold-line mb-6" />
                <h3 className="text-xl font-heading font-semibold text-text-light mt-6 mb-3">
                  Faces
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Acrylic is the industry standard for illuminated letter faces. It offers excellent light transmission, color consistency, and weather resistance. Faces can be produced in virtually any color using Pantone matching. For non-illuminated or halo-lit letters, the face may be aluminum, stainless steel, or painted metal.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Returns
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Aluminum coil (typically 0.040&quot; for standard letters, 0.063&quot; for larger letters) is bent to form the letter returns. Returns can be painted any color or finished in brushed or polished metal. Return depth typically ranges from 3.5&quot; to 5&quot;, with deeper returns providing more even illumination.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  LED Modules
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Modern channel letters use LED modules as the light source. Quality varies significantly between manufacturers. Look for UL-recognized LED modules from reputable brands (Samsung, Nichia, Cree). Key specifications include color temperature (typically 6500K for white), lumen output, and rated lifespan (50,000+ hours is standard).
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Power Supplies
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  UL-listed power supplies convert AC line voltage to low-voltage DC for the LEDs. Quality power supplies are a critical reliability factor. At Sunlite Signs, we use only UL-listed, premium-grade power supplies rated for outdoor use with appropriate weather protection.
                </p>
              </div>
            </AnimatedSection>

            {/* Section 4 */}
            <AnimatedSection>
              <div id="sizing" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  4. Sizing and Visibility
                </h2>
                <div className="gold-line mb-6" />
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Proper letter sizing is essential for readability. The general industry rule of thumb is one inch of letter height for every ten feet of viewing distance. A sign intended to be read from 200 feet should have letters approximately 20 inches tall.
                </p>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  However, this rule is a starting point. Other factors that affect readability include stroke width, font weight, contrast between the letter and the building surface, illumination type, and ambient lighting conditions. Bold, sans-serif fonts are generally more readable than thin or serif fonts at distance.
                </p>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Local sign codes often dictate maximum letter height and total sign area. Always verify local regulations before finalizing letter sizes. Sunlite Signs can fabricate wholesale channel letters from as small as 8 inches to over 60 inches in height.
                </p>
                <PlaceholderImage
                  label="Letter sizing chart — viewing distance vs. recommended height"
                  className="rounded-xl my-8"
                  aspectRatio="aspect-[16/9]"
                />
              </div>
            </AnimatedSection>

            {/* Section 5 */}
            <AnimatedSection>
              <div id="mounting" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  5. Mounting Options
                </h2>
                <div className="gold-line mb-6" />
                <h3 className="text-xl font-heading font-semibold text-text-light mt-6 mb-3">
                  Flush Mount (Direct to Wall)
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Letters are mounted directly to the building surface with studs protruding from the back of each letter. Wiring passes through the wall to a junction box behind the sign. This creates a clean, individual-letter appearance but requires core drilling and interior wall access.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Raceway Mount
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Letters are mounted to a rectangular aluminum raceway that houses all wiring and power supplies. The raceway mounts to the wall, requiring only a single electrical connection. Raceway mounting simplifies installation and is often required by landlords or building codes.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Standoff Mount
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Letters are spaced away from the wall using cylindrical standoffs, creating a visible gap between the letter and the surface. Essential for halo-lit letters where the gap allows the backlight to create the halo effect. Standoff lengths typically range from 1&quot; to 3&quot;.
                </p>
                <h3 className="text-xl font-heading font-semibold text-text-light mt-8 mb-3">
                  Backer Panel Mount
                </h3>
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Letters are mounted to a shaped aluminum panel that is then attached to the building. This provides a clean background behind the letters and can simplify installation on irregular surfaces. The backer panel can be painted to match the building or contrast with the letters.
                </p>
              </div>
            </AnimatedSection>

            {/* Section 6 */}
            <AnimatedSection>
              <div id="manufacturer" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  6. What to Look for in a Wholesale Manufacturer
                </h2>
                <div className="gold-line mb-6" />
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Not all channel letter manufacturers are equal. The quality of the finished product, reliability of delivery, and level of support vary dramatically. Here are the key factors to evaluate when choosing a wholesale trade partner:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    "UL listing — Every illuminated sign should be UL listed. This is non-negotiable for safety and code compliance.",
                    "Manufacturing precision — Look for CNC fabrication, tight tolerances, and consistent quality. Ask to see samples.",
                    "LED quality — Inquire about the LED brand and specifications. Premium LEDs from Samsung, Nichia, or Cree offer superior color consistency and longevity.",
                    "Quote turnaround — How fast can the manufacturer provide a detailed wholesale quote? Sunlite Signs delivers quotes within 48 hours.",
                    "Production time — Standard production time ranges from 3-6 weeks. Sunlite Signs delivers in 4 weeks.",
                    "Warranty — A strong warranty reflects manufacturing confidence. Look for at least 5 years on LEDs and 2 years on components.",
                    "Wholesale-only commitment — A true wholesale manufacturer will never compete with you for retail business. This is critical. Sunlite Signs never sells retail.",
                    "Support and communication — Evaluate responsiveness, willingness to provide shop drawings, and technical support availability.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-light/70">
                      <span className="text-brand-gold mt-1 font-bold">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Section 7 */}
            <AnimatedSection>
              <div id="ordering" className="scroll-mt-24 mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-light mb-4">
                  7. The Wholesale Ordering Process
                </h2>
                <div className="gold-line mb-6" />
                <p className="text-text-light/70 leading-relaxed mb-4">
                  Ordering wholesale channel letters from Sunlite Signs is designed to be straightforward for sign shop professionals and trade partners:
                </p>
                <div className="space-y-6 not-prose">
                  {[
                    {
                      step: "1",
                      title: "Submit Your Project",
                      desc: "Send us your drawings, specifications, or even a rough concept. We accept AI files, PDFs, hand sketches, or detailed descriptions. Include letter height, font, color, illumination type, and quantity.",
                    },
                    {
                      step: "2",
                      title: "Receive Your Wholesale Quote",
                      desc: "Within 48 hours, you will receive a detailed wholesale trade quote including material specifications, pricing breakdown, and estimated delivery timeline. We also provide shop drawings for your approval.",
                    },
                    {
                      step: "3",
                      title: "Approve and Produce",
                      desc: "Once you approve the shop drawings and pricing, we begin production. Our German-engineered manufacturing process ensures precision and consistency. Standard production time is 4 weeks.",
                    },
                    {
                      step: "4",
                      title: "Quality Check and Ship",
                      desc: "Every sign undergoes comprehensive quality inspection and UL compliance verification before being carefully crated and shipped. We ship across the USA and Canada with full insurance and tracking.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                        <span className="font-heading font-bold text-brand-gold text-sm">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-text-light mb-1">
                          {item.title}
                        </h4>
                        <p className="text-text-light/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
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
                Ready to Order Wholesale Channel Letters?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to get trade pricing on your next project? Apply everything in this guide and get a detailed wholesale quote
                from Sunlite Signs within 48 hours. We never sell retail — your clients stay your clients.
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
