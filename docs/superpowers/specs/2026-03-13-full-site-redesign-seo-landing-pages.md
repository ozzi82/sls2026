# Full Site Redesign, SEO Optimization & 100 Landing Pages

**Date:** 2026-03-13
**Status:** Draft
**Project:** Sunlite Signs (sunlitesigns.com)

---

## 1. Overview

Complete overhaul of the Sunlite Signs website covering three workstreams:

1. **Full Site Redesign** — Redesign all 40+ existing pages with the Bold & Dynamic design system
2. **SEO Infrastructure** — Technical SEO, on-page optimization, structured data
3. **100 Landing Pages** — Product niche + modifier keyword pages using hub & spoke architecture

**Goals:** More leads/conversions, brand elevation, and organic search visibility — all equally weighted.

---

## 2. Design System

### 2.1 Fonts

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / H1 | Space Grotesk | Bold (700) | Hero headlines, page titles (72-88px) |
| Statement / H2 | Space Grotesk | Bold (700) | Section titles (48px) |
| Section Heading | Space Grotesk | ExtraBold (800) | Subsection headers, card titles (28px) |
| Micro Label | Space Grotesk | Bold (700) | Tags, badges, labels (11px, uppercase, tracked) |
| Body | Inter | Regular (400) / Medium (500) | Paragraphs, descriptions (15-16px) |
| Buttons | Space Grotesk | Bold (700) / SemiBold (600) | All interactive elements (13-14px, uppercase) |

**No italic styling anywhere.** Gold-colored text replaces italics for emphasis.

**Migration note:** The current codebase uses `italic` class in multiple locations (homepage H1, story section, product section titles). All instances of `italic` must be removed and replaced with gold color-only emphasis during redesign. The `font-display` and `font-heading` Tailwind keys will both resolve to Space Grotesk — this is intentional since we no longer need a separate serif display font.

### 2.2 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0A0A0A` | Main dark background |
| `bg-navy` | `#0A0A1A` | Gradient endpoint for depth |
| `bg-gradient` | `#0A0A0A → #0F0F2D` | Hero/section gradient backgrounds |
| `bg-card` | `#111118` | Card surfaces, stats bar |
| `bg-light` | `#FAFAFA` | Light section backgrounds |
| `brand-gold` | `#C9A96E` | Primary brand accent, text highlights |
| `brand-gold-light` | `#D4B87A` | Gold gradient endpoint, hover states |
| `cta` | `#F97316` | Primary CTA gradient start |
| `cta-hover` | `#FB923C` | Primary CTA gradient end |
| `text-white` | `#FFFFFF` | Primary text on dark |
| `text-70` | `rgba(255,255,255,0.7)` | Secondary text on dark |
| `text-40` | `rgba(255,255,255,0.45)` | Tertiary/decorative text on dark (decorative only, not for essential content) |
| `text-60` | `rgba(255,255,255,0.6)` | Body text on dark (minimum for readable content — WCAG AA compliant) |
| `text-dark` | `#0A0A0A` | Primary text on light |
| `border-subtle` | `rgba(255,255,255,0.06)` | Card/section borders |

**Accessibility:** All body text must use `text-60` or higher on dark backgrounds to meet WCAG 2.1 AA contrast (4.5:1 minimum). `text-40` is reserved for decorative labels, watermarks, and non-essential helper text only. Small text (< 14px) must use `text-70` or higher.

### 2.2.1 Token Migration Plan

The redesign introduces new token names. To avoid breaking existing pages during Phase 1, old tokens will be aliased then removed:

| Old Token | Old Value | New Token | New Value | Action |
|-----------|-----------|-----------|-----------|--------|
| `primary-dark` | `#0C0C0C` | `bg-primary` | `#0A0A0A` | Alias old → new in Phase 1, remove old in Phase 6 |
| `navy` | `#141414` | `bg-navy` | `#0A0A1A` | Alias old → new in Phase 1, remove old in Phase 6 |
| `navy-light` | `#1C1C1C` | `bg-card` | `#111118` | Alias old → new in Phase 1, remove old in Phase 6 |
| `light-bg` | `#F5F5F0` | `bg-light` | `#FAFAFA` | Alias old → new in Phase 1, remove old in Phase 6 |
| `accent-red` | `#E8590C` | `cta` | `#F97316` | Alias old → new in Phase 1, remove old in Phase 6 |
| `accent-teal` | `#C9A96E` | `brand-gold` | `#C9A96E` | Already same, remove `accent-teal` alias |
| `text-dark` | `#0C0C0C` | `text-dark` | `#0A0A0A` | Update value in place |
| `text-light` | `#F5F5F0` | — | — | Remove (use `text-white` instead) |

**CSS audit required:** Hardcoded color values in `globals.css` (e.g., `rgba(232,89,12,0.25)` in box-shadow) must be updated to match new CTA color values. Search for all hardcoded hex/rgba values and replace.

### 2.3 Layout Principles

- **Asymmetric grids** — `1.2fr / 0.8fr` and `0.8fr / 1.2fr` alternating, breaking symmetric monotony
- **Full-bleed sections** alternating with contained `max-w-[1400px]` content
- **Rounded containers** — Light sections wrapped in `rounded-2xl` cards inset from edges
- **Gradient dividers** — `from-transparent via-gold/30 to-transparent` replace hard borders
- **Generous vertical rhythm** — `py-20 lg:py-28` section padding (up from current `py-16 md:py-24`), `my-20` between sections
- **Max width** — `max-w-[1400px]` replaces current `max-w-7xl` (1280px) for wider layouts on modern screens. Update `.container-max` utility in `globals.css`.

### 2.4 Components

**Buttons:**
- Primary: Orange gradient (`#F97316 → #FB923C`), white text, glow shadow, hover lift
- Secondary: Transparent, white/70 text, subtle border, gold border+text on hover
- Ghost: Transparent, gold border, gold text, gold background/10 on hover
- Text Link: Gold text, arrow icon, gap animation on hover

**Cards:**
- Dark glass: `bg-[#111118]`, subtle border, gold border on hover, -translate-y-1 lift, deep shadow
- Product tags: Orange/10 bg, orange text, rounded-full, 10px uppercase

**Stats Bar:**
- Contained `rounded-xl` card with grid layout
- Gradient gold numbers (Space Grotesk ExtraBold)
- Icon above each stat (lucide-react, gold/40)
- Subtle column dividers

**Decorative Elements:**
- Gold corner accents (2px border-r + border-b on images)
- Radial gradient glows (orange and gold, 6-8% opacity)
- Grid pattern overlay on hero (3% opacity)
- Animated gold accent line (2px, grows from 0 to 60px)

### 2.5 Animations (Framer Motion)

- **fadeUp** — opacity 0→1, y 40→0, staggered by 0.1s per element
- **slideIn** — opacity 0→1, x ±30→0, 0.7s duration
- **lineGrow** — width 0→60px, 1s ease-out
- **pulseGlow** — opacity oscillates 0.2→0.5→0.2 (scroll indicator)
- All animations: `viewport={{ once: true }}` to trigger only on first scroll into view

---

## 3. Page Redesigns

### 3.1 Pages to Redesign (40+ pages)

All existing pages get the new design system applied. The structure/content stays the same; the visual treatment changes.

#### Core Pages (7)
| Page | Route | Notes |
|------|-------|-------|
| Homepage | `/` | Full hero with gradient bg, stats card, asymmetric story, product grid, engineering, CTA |
| Products Hub | `/products` | Grid of all product categories with filtering |
| About / Our Story | `/about` | Timeline with asymmetric image/text blocks |
| Services | `/services` | 4-service grid with icon cards |
| Gallery | `/gallery` | Masonry/grid gallery with lightbox |
| Contact | `/contact` | Split layout — form left, info cards right |
| Get a Quote | `/get-a-quote` | Form with sticky sidebar |

#### Product Pages (18)
| Page | Route |
|------|-------|
| Channel Letters Hub | `/products/channel-letters` |
| 12 Channel Letter variants | `/products/channel-letters/[slug]` |
| Blade Signs | `/products/blade-signs` |
| Flat Cut Letters | `/products/flat-cut-letters` |
| Lightboxes | `/products/lightboxes` |
| SEG Light Boxes | `/products/seg-light-boxes` |
| Custom Fabrication | `/products/custom-fabrication` |
| Cabinet Signs | `/products/cabinet-signs` | **New page** — hub for cabinet sign spokes. Currently "Cabinet Signs" links to `/products/lightboxes`; split into its own category. |

#### Why Sunlite Pages (5)
| Page | Route |
|------|-------|
| Hub | `/why-sunlite` |
| German Engineering | `/why-sunlite/german-engineering` |
| UL Listing | `/why-sunlite/ul-listing` |
| Quality Process | `/why-sunlite/quality-process` |
| Wholesale Only | `/why-sunlite/wholesale-only` |

#### Resources (10+)
| Page | Route |
|------|-------|
| Resources Hub | `/resources` |
| Blog listing | `/resources/blog` |
| 3 Blog posts | `/resources/blog/[slug]` |
| Guides hub | `/resources/guides` |
| 4 Guides | `/resources/guides/[slug]` |
| Glossary | `/resources/glossary` |
| FAQ | `/resources/faq` |

**Guides routing:** Current guides use individual folder-based pages (e.g., `/resources/guides/channel-letter-buying-guide/page.tsx`). These will remain as individual page files (not migrated to dynamic `[slug]` routing) since each guide has unique layout needs. They simply receive the new design system treatment.

#### Error Pages (add to redesign)
| Page | Route |
|------|-------|
| 404 Not Found | `/not-found.tsx` |

### 3.2 Shared Layout Updates

**Header:**
- Transparent on hero pages, solid `bg-[#0A0A0A]/95 backdrop-blur` on scroll
- Space Grotesk for nav links, uppercase, tracked
- Orange gradient CTA button in nav
- Mobile: Full-screen overlay menu with large typography

**Footer:**
- Dark gradient background (`#0A0A0A → #0F0F2D`)
- 4-column grid: Products, Company, Resources, Contact
- Gold accent line at top
- Space Grotesk for headings, Inter for links

**Breadcrumbs:**
- Space Grotesk, 11px, uppercase, gold separators

---

## 4. SEO Architecture

### 4.1 Technical SEO

**Already implemented (keep):**
- `robots.ts` — allow all, sitemap reference
- `sitemap.ts` — all pages with priority scores
- Global Organization + WebSite schema in layout
- Per-page metadata with title templates
- Canonical URLs

**Enhancements needed:**

| Enhancement | Description |
|------------|-------------|
| **Dynamic sitemap** | Update `sitemap.ts` to include all 100 new landing pages |
| **Internal linking** | Every spoke page links to its hub; hubs link to related spokes |
| **Schema expansion** | Add Product schema on product pages, Article schema on blog posts, FAQPage schema on FAQ, HowTo schema on guides |
| **Image optimization** | All images use Next.js `<Image>` with proper `alt`, `sizes`, `loading="lazy"` |
| **Core Web Vitals** | LCP < 2.5s (optimize hero images), CLS < 0.1 (fixed dimensions), FID < 100ms |
| **Heading hierarchy** | Strict H1 > H2 > H3 on every page, one H1 per page |
| **Meta descriptions** | Unique, keyword-rich, 150-160 chars per page |
| **URL structure** | Clean, keyword-rich slugs: `/signs/[keyword-slug]` for landing pages |

### 4.2 On-Page SEO Template (Landing Pages)

Every landing page follows this on-page SEO structure:

```
<head>
  - title: "[Primary Keyword] | Wholesale Sign Manufacturer | Sunlite Signs"
  - description: Unique 150-160 char description with primary + secondary keyword
  - canonical: self-referencing
  - og:title, og:description, og:image
  - schema: Product or Service structured data
</head>

<body>
  - H1: Contains primary keyword naturally
  - H2s: Contains secondary/related keywords
  - Body: 600-1000 words, keyword density 1-2%
  - Internal links: 3-5 links to hub page + related spokes
  - CTA: "Request Trade Pricing" linking to /get-a-quote
  - FAQ section: 3-5 questions with FAQPage schema
  - Breadcrumb: Home > Products > [Hub] > [This Page]
</body>
```

---

## 5. 100 Landing Pages — Hub & Spoke System

### 5.1 Architecture

```
Hub: /products/channel-letters
  └── Spoke: /signs/front-lit-channel-letters
  └── Spoke: /signs/halo-lit-channel-letters-for-retail
  └── Spoke: /signs/trimless-vs-trimcap-channel-letters
  └── ...

Hub: /products/blade-signs
  └── Spoke: /signs/projecting-blade-signs-for-storefronts
  └── ...
```

**Route:** All spokes live at `/signs/[slug]`

**Data source:** `src/lib/landing-pages-data.ts` — single TypeScript file containing all 100 entries

**Template:** `src/app/signs/[slug]/page.tsx` — single template with `generateStaticParams()` and `generateMetadata()`

### 5.2 Landing Page Data Structure

```typescript
interface LandingPage {
  slug: string;
  hubSlug: string; // which product hub this belongs to
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string; // <title> tag
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  sections: {
    heading: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[]; // other spoke pages to link to
  schemaType: "Product" | "Service";
}
```

### 5.3 Landing Page Template Layout

Each spoke page renders consistently:

1. **Breadcrumb** — Home > Products > [Hub Name] > [Page Title]
2. **Hero section** — H1, subtitle, gradient background, CTA buttons
3. **Content sections** — 2-4 sections with H2 headings, body text, inline images where relevant
4. **Specs/comparison table** — when applicable (e.g., trimless vs trimcap)
5. **FAQ section** — 3-5 FAQs with accordion, FAQPage schema markup
6. **Related pages** — grid of 3 related spoke cards linking to sibling pages
7. **CTA section** — "Request Trade Pricing" with phone number

### 5.4 Keyword Categories (100 Pages)

**Channel Letters (35 pages):**
- Type variations: front-lit, halo-lit, back-lit, side-lit, combination, faux neon, trimless, trimcap
- Comparisons: trimless vs trimcap, front-lit vs halo-lit, LED vs neon
- Material: aluminum channel letters, stainless steel channel letters, acrylic face channel letters
- Application: restaurant channel letters, hotel signage, retail storefront channel letters, medical office signs
- Features: UL listed channel letters, energy-efficient LED channel letters, waterproof channel letters
- Process: how channel letters are made, channel letter installation guide, channel letter sizing guide

**Blade Signs (10 pages):**
- Types: illuminated blade signs, non-illuminated blade signs, double-sided blade signs
- Material: aluminum blade signs, steel blade signs
- Application: restaurant blade signs, retail projecting signs, hotel blade signs
- Features: LED blade signs, weather-resistant blade signs

**Flat Cut Letters (10 pages):**
- Material: aluminum flat cut letters, stainless steel flat cut letters, acrylic flat cut letters, brass flat cut letters
- Finish: brushed metal letters, painted flat cut letters, polished stainless letters
- Application: lobby signs, office flat cut letters, building flat cut letters

**Light Boxes & SEG (10 pages):**
- Types: LED light boxes, SEG fabric light boxes, slim light boxes, double-sided light boxes
- Application: retail light boxes, menu board light boxes, real estate light boxes
- Features: edge-lit light boxes, backlit SEG displays

**Cabinet Signs (8 pages):**
- Types: illuminated cabinet signs, push-through letter signs, flex-face cabinet signs
- Application: gas station signs, shopping center signs, storefront cabinet signs
- Features: LED cabinet signs, energy-efficient cabinet signs

**General Sign Industry (15 pages):**
- Wholesale: wholesale sign manufacturer, wholesale sign supplier, sign shop wholesale partner
- Process: custom sign manufacturing process, sign engineering services, sign permit requirements
- Comparison: wholesale vs retail sign pricing, custom signs vs template signs
- Industry: sign industry trends, sign material comparison guide, LED sign technology guide, sign ROI for businesses
- Compliance: UL listed signs explained, ADA sign requirements, sign code compliance

**Engineering & Services (7 pages):**
- Services: complimentary sign engineering, structural engineering for signs, electrical engineering for signs
- Process: sign design to manufacturing, sign installation planning, sign maintenance guide, sign warranty coverage

**Illumination Technology (5 pages):**
- Types: LED illumination types for signs, front-lit vs halo-lit signs, RGB LED signs
- Technology: LED module technology, energy savings with LED signs

### 5.5 Internal Linking Strategy

- Each spoke links to its parent hub (1 link)
- Each spoke links to 2-3 related spokes (cross-linking within the same hub)
- Each spoke links to 1 spoke from a different hub (cross-hub linking)
- Hub pages display a "Related Articles" grid showing top spokes
- Footer includes a "Popular Topics" section linking to top-performing spokes

---

## 6. Content & Image Strategy

### 6.1 Landing Page Content Production

100 landing pages x 600-1000 words = ~60,000-100,000 words of SEO content. Content will be AI-generated with the following quality controls:

- Each page's content is defined in the TypeScript data file with structured sections
- Content is reviewed for accuracy (product specs, technical claims must match `product-data.ts`)
- No duplicate paragraphs across pages — each page has unique body text
- FAQ answers must be factually accurate for the sign industry

**Data file organization:** Split by category to keep files manageable:
- `src/lib/landing-pages/channel-letters.ts` (35 entries)
- `src/lib/landing-pages/blade-signs.ts` (10 entries)
- `src/lib/landing-pages/flat-cut-letters.ts` (10 entries)
- `src/lib/landing-pages/light-boxes.ts` (10 entries)
- `src/lib/landing-pages/cabinet-signs.ts` (8 entries)
- `src/lib/landing-pages/general.ts` (15 entries)
- `src/lib/landing-pages/engineering.ts` (7 entries)
- `src/lib/landing-pages/illumination.ts` (5 entries)
- `src/lib/landing-pages/index.ts` (aggregates all entries)

### 6.2 Image Strategy

Landing pages reuse existing product photography from `/public/products/`. No new image assets required for initial launch.

- Product-specific spokes use the relevant day/night product images already in the repo
- General/industry spokes use hero background images (`hero-bg1-4`)
- Comparison pages use side-by-side product images via the existing `BeforeAfterSlider` component
- All images served via Next.js `<Image>` with proper `alt`, `sizes`, `loading="lazy"`

### 6.3 Open Graph Images

- **Default:** A shared OG image for all landing pages featuring the Sunlite Signs logo + "Wholesale Sign Manufacturer" tagline
- **Future enhancement:** Next.js `ImageResponse` API to generate dynamic OG images with the page title overlaid on a branded template. Not required for initial launch.

---

## 7. Implementation Approach

### 7.1 Technology

- **Framework:** Next.js 14 (existing)
- **Styling:** Tailwind CSS with updated config for new design tokens
- **Fonts:** Space Grotesk + Inter (Google Fonts via next/font)
- **Animations:** Framer Motion (existing)
- **Icons:** Lucide React (existing)
- **Static generation:** `generateStaticParams` for all 100 landing pages
- **Data:** TypeScript files in `src/lib/`

### 7.2 File Structure Changes

```
src/
├── app/
│   ├── signs/
│   │   └── [slug]/
│   │       └── page.tsx          # Landing page template
│   ├── design-preview/           # Temporary, remove after redesign
│   └── ... (existing pages, redesigned)
├── components/
│   ├── LandingPageHero.tsx       # Reusable hero for landing pages
│   ├── FAQAccordion.tsx          # FAQ with schema markup
│   ├── RelatedPages.tsx          # Related spokes grid
│   ├── CTASection.tsx            # Shared CTA block
│   └── ... (existing components, restyled)
├── lib/
│   ├── landing-pages/
│   │   ├── index.ts              # Aggregates all landing page entries
│   │   ├── channel-letters.ts    # 35 entries
│   │   ├── blade-signs.ts        # 10 entries
│   │   ├── flat-cut-letters.ts   # 10 entries
│   │   ├── light-boxes.ts        # 10 entries
│   │   ├── cabinet-signs.ts      # 8 entries
│   │   ├── general.ts            # 15 entries
│   │   ├── engineering.ts        # 7 entries
│   │   └── illumination.ts       # 5 entries
│   └── product-data.ts           # Existing product data
```

### 7.3 Tailwind Config Updates

```typescript
// New/updated tokens
colors: {
  "bg-primary": "#0A0A0A",
  "bg-navy": "#0A0A1A",
  "bg-card": "#111118",
  "bg-light": "#FAFAFA",
  "brand-gold": "#C9A96E",      // kept
  "brand-gold-light": "#D4B87A", // kept
  "cta": "#F97316",              // updated
  "cta-hover": "#FB923C",        // updated
}

fontFamily: {
  display: ["var(--font-space-grotesk)", "sans-serif"],  // was Instrument Serif
  heading: ["var(--font-space-grotesk)", "sans-serif"],   // was Outfit
  body: ["var(--font-inter)", "sans-serif"],              // was DM Sans
}
```

### 7.4 Phasing

**Phase 1: Foundation**
- Update Tailwind config with new design tokens
- Update layout.tsx fonts
- Redesign Header and Footer components
- Create shared components (CTASection, FAQAccordion, etc.)

**Phase 2: Core Pages Redesign**
- Homepage
- Products hub
- About, Services, Contact, Get a Quote, Gallery

**Phase 3: Product Pages Redesign**
- Channel Letters hub + 12 sub-product pages
- Blade Signs, Flat Cut, Lightboxes, SEG, Custom Fabrication

**Phase 4: Why Sunlite & Resources Redesign**
- Why Sunlite hub + 4 sub-pages
- Resources hub, Blog, Guides, Glossary, FAQ

**Phase 5: Landing Pages**
- Build landing page data file (100 entries)
- Build landing page template
- Build supporting components (FAQAccordion, RelatedPages)
- Update sitemap.ts to include new pages

**Phase 6: SEO Polish**
- Schema markup audit on all pages
- Internal linking audit
- Meta description audit
- Image alt text audit
- Core Web Vitals optimization

---

## 8. Success Criteria

- All 40+ existing pages redesigned with new design system
- 100 new landing pages live and indexed
- Every page has unique title, meta description, and appropriate schema
- Sitemap includes all pages
- Internal linking connects all spokes to hubs
- Lighthouse SEO score > 95 on all pages
- Core Web Vitals passing on all pages
- No broken links, no duplicate content
- Mobile-responsive on all pages
