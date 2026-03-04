import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  "channel-letter-types-explained": {
    slug: "channel-letter-types-explained",
    title: "Channel Letter Types Explained: A Complete Guide for Sign Shops",
    excerpt:
      "From face-lit to halo-lit, trimless to reverse channel letters, learn about every channel letter type available and when to recommend each to your clients.",
    date: "2025-12-15",
    image: "Blog hero — various channel letter types on building facades",
    category: "Education",
    content: `
## What Are Channel Letters?

Channel letters are three-dimensional, individually fabricated letters or graphics commonly used for exterior signage on commercial buildings. They are the most popular form of illuminated signage in North America, and for good reason: channel letters offer exceptional visibility, brand presence, and curb appeal day and night.

Each channel letter consists of three primary components: the face (the front surface that may be translucent for illumination), the returns (the sides of the letter that give it depth), and the back (which may be open, closed, or translucent depending on the illumination style). LED modules mounted inside the letter cavity provide illumination.

For sign shops sourcing wholesale channel letters, understanding these types is essential for recommending the right solution to your clients and growing your trade business.

## Front-Lit Channel Letters

Face-lit (also called face-lit) channel letters are the most common type. Light passes through a translucent acrylic face, making the letter glow from the front. These are ideal for maximum readability and work especially well for retail locations, restaurants, and any business that needs high-visibility signage.

The face is typically made from acrylic sheet that can be painted or produced in virtually any Pantone color. Aluminum returns form the sides of the letter, and LED modules inside the letter cavity project light forward through the acrylic face.

**Best for:** Retail storefronts, restaurants, medical offices, any business prioritizing maximum visibility.

## Halo-Lit (Back-Lit) Channel Letters

Halo-lit channel letters produce a soft glow of light behind the letter, creating an elegant "halo" effect on the mounting surface. The letter face is typically opaque (often brushed aluminum or painted metal), and LEDs inside the channel project light backward through a clear or translucent backer onto the wall or raceway.

This style is favored by upscale brands, hotels, law firms, and businesses seeking a sophisticated, architectural aesthetic. The halo effect works best on lighter-colored, flat mounting surfaces that can reflect the light cleanly.

**Best for:** Hotels, corporate offices, law firms, upscale retail, architectural applications.

## Front-and-Halo-Lit Channel Letters

Combining both illumination methods, front-and-halo-lit letters provide forward-facing illumination through a translucent face and a rear halo glow simultaneously. This dual-lit approach creates maximum visual impact and delivers excellent readability while maintaining the sophisticated halo aesthetic.

Front-and-halo letters require careful engineering of the LED layout to ensure even illumination on both the face and the halo, which is where working with an experienced wholesale manufacturer like Sunlite Signs becomes critical.

**Best for:** Premium brand locations, high-traffic commercial areas, businesses wanting maximum visual impact.

## Reverse Channel Letters (Back-Lit Only)

Reverse channel letters are constructed with the open side of the channel facing the wall. The letter face is opaque metal (typically aluminum or stainless steel), and light projects exclusively backward to produce a halo effect. Unlike standard halo-lit letters, reverse channel letters have no returns visible from the front, creating a very clean, dimensional appearance.

These letters are often fabricated from stainless steel or brushed aluminum for a premium, architectural look. They are commonly specified for corporate campuses, high-end hospitality, and modern commercial developments.

**Best for:** Corporate headquarters, luxury hospitality, modern architectural facades.

## Trimless Channel Letters

Trimless channel letters represent the cutting edge of channel letter design. Traditional channel letters use a trim cap (a plastic retainer) to secure the acrylic face to the aluminum returns. Trimless letters eliminate this trim cap entirely, producing a seamless, modern aesthetic where the face and returns meet in a clean, flush line.

Sunlite Signs' trimless system is engineered for precision fit and long-term durability. The result is a letter with cleaner lines, a more contemporary appearance, and a premium look that architects and designers increasingly specify. As a wholesale trade partner, offering trimless letters gives your sign shop a competitive edge.

**Best for:** Modern architecture, design-forward brands, high-end retail and hospitality, any project where a clean aesthetic is a priority.

## Open-Face Channel Letters

Open-face channel letters have no acrylic face covering the front of the letter. The LED modules (or historically, exposed neon tubes) are visible, giving a retro, industrial, or artisanal appearance. Modern open-face letters with LEDs offer the nostalgic look of exposed illumination with the energy efficiency and longevity of LED technology.

**Best for:** Restaurants, breweries, entertainment venues, vintage or industrial-themed branding.

## Non-Illuminated Channel Letters

Not every project requires illumination. Non-illuminated channel letters provide dimensional, three-dimensional branding without any internal lighting. These letters are fabricated from aluminum, stainless steel, or other metals and can be painted or finished in a wide variety of ways.

Non-illuminated channel letters are cost-effective, require no electrical connection, and are suitable for interior signage, secondary exterior signage, or locations where lighting is not permitted or desired.

**Best for:** Interior lobby signs, secondary building identification, locations with lighting restrictions.

## Choosing the Right Type for Your Client

When recommending a channel letter type to your client, consider these factors:

1. **Visibility requirements** — How far away does the sign need to be readable? Face-lit provides maximum readability at distance.
2. **Brand aesthetic** — Does the brand lean modern and minimal (trimless), classic and bold (face-lit), or upscale and subtle (halo-lit)?
3. **Mounting surface** — Halo-lit letters need a flat, light-colored surface to reflect the halo effectively.
4. **Building architecture** — Modern facades suit trimless; traditional buildings may favor standard face-lit or reverse channel.
5. **Budget** — Non-illuminated and standard face-lit are the most cost-effective; dual-lit and trimless are premium options.
6. **Local regulations** — Some municipalities restrict illuminated signage or specific sign types.

As a sign shop professional, partnering with a wholesale-only manufacturer like Sunlite Signs gives you the flexibility to offer the full range of channel letter types at competitive trade pricing — and we will never compete with you for retail business.
    `,
  },
  "trimless-vs-trimcap-channel-letters": {
    slug: "trimless-vs-trimcap-channel-letters",
    title: "Trimless vs. Trim Cap Channel Letters: Which Should You Specify?",
    excerpt:
      "The architectural trend toward trimless channel letters is growing fast. Compare trimless and trim cap options to help your clients choose the right look.",
    date: "2025-11-28",
    image: "Blog hero — side-by-side comparison of trimless and trim cap letters",
    category: "Product Spotlight",
    content: `
## The Rise of Trimless Channel Letters

The sign industry is in the middle of a significant aesthetic shift. For decades, trim cap channel letters have been the default standard, but a growing number of architects, designers, and brand managers are now specifying trimless channel letters for their cleaner, more contemporary appearance.

At Sunlite Signs, we've seen demand for our trimless channel letters increase substantially year over year among our wholesale trade partners. Understanding the differences between trimless and trim cap construction helps sign shop professionals guide their clients toward the right choice — and strengthen their position as a knowledgeable trade partner.

## What Is a Trim Cap?

A trim cap is a plastic retainer strip (typically made from rigid PVC or polycarbonate) that snaps around the perimeter of the letter face, securing the translucent acrylic panel to the aluminum return. Trim caps have been the industry standard for channel letter construction for decades.

Trim caps are available in a range of colors, with black and white being the most common. While functional and reliable, the trim cap creates a visible border around the letter face that some designers consider outdated or visually distracting.

### Advantages of Trim Cap Construction

- **Proven reliability** — Decades of field-proven performance in all climates.
- **Easy face replacement** — If an acrylic face is damaged, it can be replaced by removing and reinstalling the trim cap.
- **Lower manufacturing cost** — Trim cap letters are slightly less expensive to produce, which improves your wholesale margins.
- **Wide availability** — Nearly every channel letter manufacturer offers trim cap construction.

### Limitations of Trim Cap Construction

- **Visible border** — The trim cap creates a plastic rim around the letter face that is visible from close range.
- **Color matching challenges** — Trim cap color may not perfectly match the face or return color.
- **Perceived as dated** — In modern architectural contexts, the trim cap look is increasingly seen as old-fashioned.

## What Are Trimless Channel Letters?

Trimless channel letters eliminate the plastic trim cap entirely. The acrylic face is bonded directly to the aluminum return using precision engineering and specialized adhesives or mechanical attachment methods. The result is a seamless junction between the face and return with no visible retainer.

Sunlite Signs' trimless system uses German-engineered precision fabrication to achieve tight tolerances that ensure the face-to-return junction is clean, flush, and durable over the long term.

### Advantages of Trimless Construction

- **Clean, modern aesthetic** — No visible plastic border. The letter appears as a single, cohesive form.
- **Architect-preferred** — Trimless letters are increasingly specified in architectural signage packages.
- **Premium positioning** — Offering trimless letters through wholesale sourcing helps your sign shop stand out as a premium provider to your clients.
- **Color continuity** — Without a trim cap, there is no color-matching issue at the face perimeter.

### Considerations for Trimless Construction

- **Precision manufacturing required** — Trimless letters demand tighter fabrication tolerances, which is why choosing an experienced wholesale manufacturer matters.
- **Slightly higher cost** — The additional engineering and precision add a modest premium over trim cap construction.
- **Face replacement** — Replacing a damaged face on a trimless letter requires more skill than a trim cap letter, though this is rarely needed.

## Visual Comparison

From a distance of more than a few feet, both styles are visually similar. The difference becomes apparent at closer viewing distances, where the trim cap border is visible as a distinct line around the letter face.

For signage on buildings where pedestrians or customers pass directly beneath or beside the sign (such as storefronts, hotel entrances, and restaurant facades), the trimless advantage is most noticeable. For highway-visible pylon signs or high-mounted building signage viewed primarily from a distance, the aesthetic difference is less critical.

## When to Recommend Each Style

**Specify trimless when:**
- The architect or designer requires a modern, minimalist aesthetic
- The sign will be viewed at close range (street-level storefronts, hotel entrances)
- The brand identity emphasizes clean, contemporary design
- The client wants a premium, differentiated look
- The project is high-end hospitality, corporate, or architectural

**Specify trim cap when:**
- Budget is a primary consideration
- The sign is mounted high and viewed primarily from a distance
- The client prefers a traditional channel letter appearance
- Rapid face replaceability is a priority (high-vandalism areas)

## Sunlite Signs Trimless: German-Engineered Trimless Excellence

Our trimless channel letters are manufactured using precision CNC fabrication and German-engineered processes from our partnership with LKF Lichtwerbung. Every trimless letter is UL listed, ensuring safety and code compliance alongside premium aesthetics.

We encourage our wholesale trade partners to offer both trim cap and trimless options to their clients, presenting the aesthetic and value differences clearly. In our experience, when clients see the trimless option, a significant number choose to upgrade — and that means better margins for your sign shop.
    `,
  },
  "how-to-choose-sign-illumination": {
    slug: "how-to-choose-sign-illumination",
    title: "How to Choose the Right Sign Illumination for Any Project",
    excerpt:
      "Face-lit, halo-lit, front-and-halo, or non-illuminated? Walk through the decision factors including visibility, brand aesthetic, building facade, and budget.",
    date: "2025-11-10",
    image: "Blog hero — different illumination types shown at night",
    category: "Guides",
    content: `
## Why Illumination Choice Matters

The illumination style of a channel letter sign dramatically affects its appearance, readability, and the impression it makes on customers. Choosing the right illumination is one of the most important decisions in any sign project, and as a sign shop professional sourcing from a wholesale manufacturer, your guidance on this choice directly impacts client satisfaction and your trade reputation.

This guide walks through the four primary illumination options and the key factors that should drive the decision.

## Front-Lit Illumination

Face-lit (face-lit) channel letters project light forward through a translucent acrylic face. This is the most common illumination style and provides the highest visibility and readability, especially from a distance.

**How it works:** LED modules mounted inside the letter cavity face forward, projecting light through the colored or white acrylic face panel. The light is bright, even, and visible in both daylight and nighttime conditions.

**Visibility:** Excellent. Face-lit letters are the most readable illumination type at all distances and in all ambient lighting conditions. They are the default recommendation when maximum visibility is the primary objective.

**Aesthetic:** Bold, bright, and attention-grabbing. Face-lit letters make a strong brand statement and work well for retail, dining, and any business that relies on drive-by or walk-by visibility.

**Considerations:** The bright, forward-facing glow may be too intense for brands seeking a subtle, understated look. Color accuracy of the face material is critical, as the illumination changes how the color appears.

## Halo-Lit Illumination

Halo-lit (back-lit) channel letters project light backward against the mounting surface, creating a soft glow or "halo" around the letter. The letter face is typically opaque, so no light comes through the front.

**How it works:** LEDs inside the channel face backward, projecting light through an open or translucent back panel onto the wall or raceway behind the letter. The result is a sophisticated, indirect lighting effect.

**Visibility:** Good in medium to low ambient light. Halo-lit letters are less readable than face-lit at long distances or in bright daylight, but they create a striking effect at night.

**Aesthetic:** Elegant, architectural, and understated. Halo-lit letters are the go-to choice for upscale brands, hotels, corporate offices, and any project where a refined, sophisticated look is desired.

**Considerations:** Halo-lit letters require a flat, preferably light-colored mounting surface to reflect the halo effectively. Dark, textured, or uneven surfaces diminish the halo effect significantly. Standoffs are required to create the gap between the letter and the wall.

## Front-and-Halo (Dual-Lit) Illumination

Front-and-halo-lit letters combine both illumination methods, projecting light through the front face and backward to create a halo simultaneously. This dual approach delivers maximum visual impact.

**How it works:** Two sets of LED modules (or a carefully positioned single set) illuminate both the acrylic face and the back panel. The letter glows from the front while also casting a halo on the mounting surface.

**Visibility:** Excellent. Combines the high readability of face-lit with the dramatic depth of halo-lit.

**Aesthetic:** Premium, dramatic, and high-impact. Front-and-halo letters command attention and convey quality. They are ideal for flagship locations, high-end retail, and any project where the sign is a key architectural element.

**Considerations:** Higher cost than single-illumination options due to additional LEDs and more complex wiring. Power consumption is higher. Requires careful engineering to balance front and back illumination levels.

## Non-Illuminated

Non-illuminated channel letters have no internal lighting. They rely on ambient light, external spotlights, or floodlighting for nighttime visibility.

**How it works:** The letters are fabricated from aluminum, stainless steel, or other metals with no internal LED modules, wiring, or power supply.

**Visibility:** Dependent on external lighting. Without dedicated illumination, non-illuminated letters are difficult to see at night. Adding external gooseneck lights or landscape spotlights can mitigate this.

**Aesthetic:** Clean, architectural, and understated. Non-illuminated letters work well for interior lobby signage, secondary identification signs, or buildings where the sign is a daytime-only feature.

**Considerations:** Lower cost (no LEDs, power supplies, or electrical connection). No electrical permit required. Limited nighttime visibility without supplemental lighting.

## Key Decision Factors

### 1. Primary Viewing Distance

If the sign must be readable from a highway or major road (100+ feet), face-lit is almost always the right choice. For pedestrian-level viewing (10-30 feet), halo-lit and dual-lit options shine.

### 2. Brand Identity

Bold, vibrant brands (fast food, retail chains, entertainment) typically favor face-lit. Luxury, corporate, and architectural brands tend toward halo-lit or dual-lit.

### 3. Mounting Surface

Halo-lit and dual-lit require a suitable surface to reflect the halo. Evaluate the wall material, color, and flatness before recommending back-illumination.

### 4. Local Regulations

Some municipalities restrict sign illumination brightness, hours of operation, or type. Always check local sign codes before specifying illumination.

### 5. Budget

From least to most expensive: non-illuminated, face-lit, halo-lit, front-and-halo. Present options at multiple price points so clients can make an informed choice. Wholesale trade pricing from Sunlite Signs helps you maintain strong margins across all illumination types.

### 6. Energy Efficiency

All Sunlite Signs illuminated products use energy-efficient LED modules. Front-and-halo letters consume the most power, but LED technology keeps all options efficient compared to older fluorescent or neon systems.

## Making the Recommendation

The best approach is to present your client with two or three illumination options, each with a rendering or photo example showing the expected appearance at night. Explain the visibility, aesthetic, and cost trade-offs clearly. Most clients appreciate having options and will gravitate toward the style that best matches their brand vision and budget.

At Sunlite Signs, we manufacture all illumination types with equal attention to quality at wholesale trade pricing. Every illuminated sign is UL listed, uses premium Samsung or Nichia LED modules, and is backed by our commitment to German-engineered precision. We sell exclusively to sign shops and trade professionals — never to the general public.
    `,
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts[params.slug];
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — Wholesale Sign Industry Blog | Sunlite Signs`,
    description: post.excerpt,
    keywords: [
      "channel letters",
      "sign industry",
      "wholesale signs",
      "LED illumination",
      "sign manufacturing",
      "trade sign professionals",
      "wholesale channel letters",
    ],
    openGraph: {
      title: `${post.title} | Sunlite Signs Wholesale`,
      description: post.excerpt,
      url: `https://sunlitesigns.com/resources/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const postSlugs = Object.keys(blogPosts);
  const currentIndex = postSlugs.indexOf(params.slug);
  const prevSlug = currentIndex > 0 ? postSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < postSlugs.length - 1 ? postSlugs[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
      url: "https://sunlitesigns.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Sunlite Signs LLC",
      url: "https://sunlitesigns.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sunlitesigns.com/resources/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary-dark pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Blog", href: "/resources/blog" },
              { name: post.title },
            ]}
          />
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-light/40">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-light leading-tight">
                {post.title}
              </h1>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-primary-dark pb-8">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <PlaceholderImage
              label={post.image}
              className="rounded-xl max-w-4xl"
              aspectRatio="aspect-[21/9]"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-primary-dark">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <article className="prose prose-invert prose-lg max-w-3xl prose-headings:font-heading prose-headings:text-text-light prose-p:text-text-light/70 prose-strong:text-text-light prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-li:text-text-light/70 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
            </article>
          </AnimatedSection>
        </div>
      </section>

      {/* Post Navigation */}
      <section className="bg-primary-dark border-t border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            {prevSlug ? (
              <Link
                href={`/resources/blog/${prevSlug}`}
                className="flex items-center gap-2 text-sm text-text-light/50 hover:text-brand-gold transition-colors font-heading"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Article
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/resources/blog"
              className="text-sm text-text-light/50 hover:text-brand-gold transition-colors font-heading"
            >
              All Articles
            </Link>
            {nextSlug ? (
              <Link
                href={`/resources/blog/${nextSlug}`}
                className="flex items-center gap-2 text-sm text-text-light/50 hover:text-brand-gold transition-colors font-heading"
              >
                Next Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
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
                Ready to Get Wholesale Pricing?
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to get trade pricing on your next project? Whether you need face-lit, halo-lit, or trimless channel letters, Sunlite Signs
                delivers German-engineered quality at wholesale pricing. We never sell retail.
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

/**
 * Simple markdown-to-HTML converter for blog content.
 * Handles headings, paragraphs, bold, lists, and horizontal rules.
 */
function markdownToHtml(markdown: string): string {
  const lines = markdown.trim().split("\n");
  let html = "";
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      continue;
    }

    if (line.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3>${processInline(line.slice(4))}</h3>`;
    } else if (line.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2>${processInline(line.slice(3))}</h2>`;
    } else if (/^\d+\.\s/.test(line)) {
      if (!inList) {
        html += "<ol>";
        inList = true;
      }
      html += `<li>${processInline(line.replace(/^\d+\.\s/, ""))}</li>`;
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${processInline(line.slice(2))}</li>`;
    } else {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<p>${processInline(line)}</p>`;
    }
  }

  if (inList) {
    html += "</ul>";
  }

  return html;
}

function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
