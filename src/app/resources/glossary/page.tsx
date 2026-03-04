import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Sign Industry Glossary — A-Z Channel Letter & Signage Terms | Sunlite Signs",
  description:
    "Comprehensive wholesale sign industry glossary with definitions of channel letter, LED signage, and commercial sign manufacturing terms. Built for sign shops and trade professionals.",
  keywords: [
    "wholesale sign industry glossary",
    "channel letter terms trade",
    "sign manufacturing glossary",
    "signage terminology wholesale",
    "LED sign definitions",
    "commercial sign terms",
    "channel letter glossary trade",
    "sign industry definitions wholesale",
  ],
  openGraph: {
    title: "Wholesale Sign Industry Glossary — A-Z Channel Letter & Signage Terms | Sunlite Signs",
    description:
      "Comprehensive wholesale sign industry glossary with definitions for channel letters, LED signage, and commercial sign manufacturing terms. For trade professionals.",
    url: "https://sunlitesigns.com/resources/glossary",
  },
};

interface GlossaryTerm {
  term: string;
  definition: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Acrylic",
    definition:
      "A thermoplastic material used for channel letter faces. Acrylic can be translucent (for illuminated letters) or opaque, and is available in a wide range of colors. It offers excellent light transmission, weather resistance, and durability for outdoor signage applications.",
  },
  {
    term: "Aluminum Returns",
    definition:
      "The aluminum side walls (also called returns) that form the depth of a channel letter. Returns are typically made from 0.040\" or 0.063\" aluminum coil, bent to match the letter profile. The return height determines the depth of the channel and affects LED illumination quality.",
  },
  {
    term: "Back Panel",
    definition:
      "The rear surface of a channel letter, typically made from aluminum. In halo-lit letters, the back panel may be clear or translucent polycarbonate to allow light to project backward onto the mounting surface.",
  },
  {
    term: "Blade Sign",
    definition:
      "A projecting sign that extends perpendicular from a building wall, designed to be visible to pedestrian and vehicular traffic approaching from either side along the street. Blade signs can be illuminated or non-illuminated and are common in urban retail and hospitality settings.",
  },
  {
    term: "Channel Letter",
    definition:
      "A three-dimensional, individually fabricated letter or graphic used in commercial signage. Channel letters consist of a face, returns (sides), and back, with internal LED illumination. They are the most popular type of illuminated exterior signage in North America.",
  },
  {
    term: "CNC Router",
    definition:
      "Computer Numerical Control router, a precision cutting machine used in sign manufacturing to cut acrylic faces, aluminum backs, and other materials with high accuracy. CNC routers enable complex letter shapes and tight tolerances essential for quality channel letter production.",
  },
  {
    term: "Dimensional Letter",
    definition:
      "Any letter or graphic that has three-dimensional depth. This includes channel letters, flat cut letters, cast letters, and formed plastic letters. Dimensional letters add visual depth and a premium appearance compared to flat vinyl graphics.",
  },
  {
    term: "Trimless Channel Letter",
    definition:
      "A channel letter construction method that eliminates the traditional trim cap, creating a seamless, modern junction between the acrylic face and aluminum return. Sunlite Signs' trimless system is engineered using German precision manufacturing techniques for a premium aesthetic.",
  },
  {
    term: "Face",
    definition:
      "The front panel of a channel letter, typically made from translucent acrylic for illuminated letters or opaque material for halo-lit or non-illuminated letters. The face displays the color and finish visible to viewers and determines how light is transmitted.",
  },
  {
    term: "Flat Cut Letter",
    definition:
      "A letter or logo cut from a single sheet of material (aluminum, stainless steel, acrylic, or PVC) using a CNC router or laser. Flat cut letters are dimensional but have no internal cavity or illumination, offering a clean, modern look for interior and exterior applications.",
  },
  {
    term: "Front-Lit",
    definition:
      "An illumination style where LED light passes forward through a translucent acrylic face, making the letter glow from the front. Also called face-lit. Face-lit channel letters provide the highest visibility and readability, especially from a distance.",
  },
  {
    term: "Halo-Lit",
    definition:
      "An illumination style where LEDs project light backward from the channel letter onto the mounting surface, creating a soft glow or 'halo' effect around the letter. The letter face is opaque. Also called back-lit. Halo-lit letters produce an elegant, architectural aesthetic.",
  },
  {
    term: "LED Module",
    definition:
      "A small circuit board containing one or more LED chips, designed for installation inside channel letters. LED modules are the standard light source for modern channel letters, replacing older neon and fluorescent technologies. Quality modules offer consistent color, long life, and energy efficiency.",
  },
  {
    term: "Lightbox",
    definition:
      "An illuminated sign cabinet, typically rectangular, with internal LED lighting that illuminates a translucent face panel. Lightboxes can display printed graphics, routed-out lettering, or push-through letters. Also known as a cabinet sign or illuminated sign cabinet.",
  },
  {
    term: "Neon",
    definition:
      "A traditional sign illumination technology using gas-filled glass tubes that glow when electrified. While largely replaced by LEDs for channel letter interiors, neon remains popular for decorative, artistic, and retro-style signage. Some open-face channel letters still use exposed neon for aesthetic effect.",
  },
  {
    term: "Non-Illuminated",
    definition:
      "Signage that contains no internal or external light source. Non-illuminated channel letters and flat cut letters rely on ambient light for visibility. They are more cost-effective, require no electrical connection, and are suitable for interior use or areas with lighting restrictions.",
  },
  {
    term: "Pantone Matching System (PMS)",
    definition:
      "A standardized color matching system used across the sign and printing industries. Sign manufacturers use PMS colors to ensure that acrylic faces, painted returns, and vinyl graphics match the client's brand colors precisely.",
  },
  {
    term: "Power Supply",
    definition:
      "An electrical device that converts AC line voltage (120V or 240V) to the low-voltage DC power (typically 12V or 24V) required by LED modules inside channel letters. UL-listed power supplies are required for safe, code-compliant illuminated signage installations.",
  },
  {
    term: "Push-Through Letter",
    definition:
      "A letter fabricated from translucent acrylic and pushed through a precision-cut hole in a sign panel or cabinet face. Push-through letters create a clean, dimensional look and can be illuminated from behind. They are commonly used in lightbox and monument sign designs.",
  },
  {
    term: "Raceway",
    definition:
      "A rectangular metal enclosure that serves as a mounting structure for channel letters. Raceways house the electrical wiring and power supplies, simplifying installation by allowing the entire letter set to be pre-wired and mounted as a unit. Also called a wireway.",
  },
  {
    term: "Return",
    definition:
      "The side wall of a channel letter that creates its depth. Returns are typically fabricated from aluminum coil and bent to follow the letter's profile. Return depth typically ranges from 3\" to 6\" and affects LED illumination, letter weight, and overall appearance.",
  },
  {
    term: "Reverse Channel Letter",
    definition:
      "A channel letter constructed with the open channel facing the wall rather than forward. The face is opaque metal, and light projects exclusively backward to create a halo effect. Reverse channel letters offer a clean, dimensional front face with no visible trim or fasteners.",
  },
  {
    term: "Sign Cabinet",
    definition:
      "An enclosed box or structure that houses the internal components of a sign, including LED modules, wiring, and structural supports. Sign cabinets can be illuminated (lightboxes) or serve as a framework for mounted channel letters and graphics.",
  },
  {
    term: "Standoff",
    definition:
      "A mounting hardware component that spaces a sign or letter away from the mounting surface. Standoffs are essential for halo-lit channel letters, creating the gap needed for the backlit glow effect. They are available in various lengths and finishes.",
  },
  {
    term: "Trim Cap",
    definition:
      "A plastic retainer strip (typically PVC or polycarbonate) that snaps around the perimeter of a channel letter face, securing the acrylic panel to the aluminum return. Available in various colors, trim cap has been the industry standard for decades. See also: Trimless Channel Letter (trimless alternative).",
  },
  {
    term: "UL Listed",
    definition:
      "A certification indicating that a product has been tested and meets the safety standards of Underwriters Laboratories (UL). UL listing is required or strongly recommended for illuminated signage in most jurisdictions across the USA and Canada. All Sunlite Signs illuminated products are UL listed.",
  },
  {
    term: "Vinyl",
    definition:
      "A thin, adhesive-backed film used in signage for graphics, lettering, and surface wrapping. In channel letter manufacturing, vinyl is used to apply colors or graphics to letter faces and returns. High-performance vinyl is UV-resistant and rated for multi-year exterior durability.",
  },
  {
    term: "Weep Hole",
    definition:
      "A small drainage opening at the bottom of a channel letter that allows moisture and condensation to escape from inside the letter cavity. Weep holes prevent water buildup that could damage LEDs or cause electrical issues over the life of the sign.",
  },
];

// Group terms by first letter
function groupByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const groups: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(term);
  }
  return groups;
}

export default function GlossaryPage() {
  const grouped = groupByLetter(glossaryTerms);
  const alphabet = Object.keys(grouped).sort();

  // JSON-LD FAQPage schema using glossary terms as Q&A
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: glossaryTerms.map((item) => ({
      "@type": "Question",
      name: `What is ${item.term.toLowerCase()} in the sign industry?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.definition,
      },
    })),
  };

  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Sign Industry Glossary",
    description:
      "A comprehensive glossary of channel letter and commercial signage manufacturing terms.",
    hasDefinedTerm: glossaryTerms.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.definition,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Sign Industry Glossary" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
              Sign Industry Glossary
            </h1>
            <p className="text-lg text-text-light/60 max-w-2xl">
              A comprehensive A-Z reference of sign industry terms, channel letter components, and
              commercial signage terminology. Built for sign shop professionals and wholesale trade partners — whether you are a seasoned sign professional or new to
              the trade, this glossary covers the essential vocabulary.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="bg-primary-dark border-y border-white/10 sticky top-0 z-30 backdrop-blur-md bg-primary-dark/90">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Glossary alphabetical navigation">
            <ul className="flex flex-wrap items-center gap-2">
              {alphabet.map((letter) => (
                <li key={letter}>
                  <a
                    href={`#letter-${letter}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded bg-white/5 border border-white/10 text-sm font-heading font-semibold text-text-light/60 hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
                  >
                    {letter}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max">
          <div className="max-w-4xl">
            {alphabet.map((letter) => (
              <AnimatedSection key={letter} className="mb-12">
                <div id={`letter-${letter}`} className="scroll-mt-24">
                  <h2 className="text-3xl font-heading font-bold text-brand-gold mb-6 pb-3 border-b border-white/10">
                    {letter}
                  </h2>
                  <dl className="space-y-6">
                    {grouped[letter].map((item) => (
                      <div
                        key={item.term}
                        id={item.term.toLowerCase().replace(/[\s()]/g, "-")}
                        className="scroll-mt-24"
                      >
                        <dt className="text-lg font-heading font-semibold text-text-light mb-2">
                          {item.term}
                        </dt>
                        <dd className="text-text-light/60 leading-relaxed pl-4 border-l-2 border-brand-gold/20">
                          {item.definition}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </AnimatedSection>
            ))}
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
                Have Questions About Our Wholesale Products?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to get trade pricing on your next project? Our team speaks the language of signage. We sell exclusively to sign shops and trade professionals — never retail.
              </p>
              <Link href="/get-a-quote" className="btn-primary">
                Request Wholesale Pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
