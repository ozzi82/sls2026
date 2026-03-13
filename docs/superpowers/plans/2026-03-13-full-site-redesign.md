# Full Site Redesign, SEO & 100 Landing Pages — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 40+ pages with Bold & Dynamic design system, optimize SEO infrastructure, and build 100 product-niche landing pages using hub & spoke architecture.

**Architecture:** Template-driven static generation. New design system (Space Grotesk + Inter fonts, dark gradient backgrounds, orange CTAs) applied across all pages. 100 landing pages generated from TypeScript data files via a single `[slug]/page.tsx` template. Hub & spoke internal linking for SEO authority.

**Tech Stack:** Next.js 14, Tailwind CSS 3.4, Framer Motion, Space Grotesk + Inter (Google Fonts), Lucide React

**Spec:** `docs/superpowers/specs/2026-03-13-full-site-redesign-seo-landing-pages.md`

---

## Chunk 1: Foundation (Phase 1)

Updates Tailwind config, fonts, globals.css, and shared components (Header, Footer, CTASection, FAQAccordion).

### Task 1: Update Tailwind Config with New Design Tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update color tokens**

Replace existing color config with new tokens + aliases for old names:

```typescript
colors: {
  // New design system tokens
  "bg-primary": "#0A0A0A",
  "bg-navy": "#0A0A1A",
  "bg-card": "#111118",
  "bg-light": "#FAFAFA",
  "brand-gold": "#C9A96E",
  "brand-gold-light": "#D4B87A",
  cta: "#F97316",
  "cta-hover": "#FB923C",
  "text-dark": "#0A0A0A",

  // Aliases for old tokens (remove in Phase 6)
  "primary-dark": "#0A0A0A",
  navy: "#0A0A1A",
  "navy-light": "#111118",
  "light-bg": "#FAFAFA",
  "text-light": "#FAFAFA",
  "accent-red": "#F97316",
  "accent-teal": "#C9A96E",
  "accent-teal-light": "#D4B87A",
}
```

- [ ] **Step 2: Update font family config**

```typescript
fontFamily: {
  display: ["var(--font-space-grotesk)", "sans-serif"],
  heading: ["var(--font-space-grotesk)", "sans-serif"],
  body: ["var(--font-inter)", "sans-serif"],
}
```

- [ ] **Step 3: Verify build compiles**

Run: `npx next build 2>&1 | head -20`
Expected: No errors related to Tailwind config

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: update Tailwind config with new Bold & Dynamic design tokens"
```

---

### Task 2: Update Layout Fonts

**Files:**
- Modify: `src/app/layout.tsx`

Note: Space Grotesk and Inter imports were already added during the design preview phase. This task ensures the font variables are the primary fonts and old serif font is deprioritized.

- [ ] **Step 1: Verify font imports exist**

Confirm `Space_Grotesk` and `Inter` are imported and their CSS variables are in the `<html>` className. These were added earlier. If not present, add them.

- [ ] **Step 2: Commit if changes made**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure Space Grotesk + Inter as primary fonts"
```

---

### Task 3: Update globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update base styles**

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg-primary text-white font-body;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }

  ::selection {
    background: rgba(201, 169, 110, 0.3);
    color: #FAFAFA;
  }
}
```

- [ ] **Step 2: Update component utilities**

```css
@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cta to-cta-hover text-white font-heading font-bold text-sm uppercase tracking-[0.08em] rounded-md shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_50px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition-all duration-300;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center px-10 py-5 border border-white/15 text-white/70 font-heading font-semibold text-sm uppercase tracking-[0.08em] rounded-md hover:border-brand-gold hover:text-brand-gold transition-all duration-300;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center px-8 py-4 border border-brand-gold text-brand-gold font-heading font-bold text-[13px] uppercase tracking-[0.1em] rounded-md hover:bg-brand-gold/10 transition-all duration-300;
  }

  .btn-accent {
    @apply inline-flex items-center justify-center px-8 py-4 bg-cta text-white font-heading font-semibold text-sm uppercase tracking-wider rounded-md hover:bg-cta-hover transition-colors duration-300;
  }

  .section-padding {
    @apply px-6 sm:px-10 lg:px-16 py-20 lg:py-28;
  }

  .container-max {
    @apply max-w-[1400px] mx-auto;
  }

  .gold-line {
    @apply w-12 h-[2px] bg-gradient-to-r from-brand-gold to-brand-gold-light;
  }

  .gradient-divider {
    @apply h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent;
  }

  .micro-label {
    @apply font-heading font-bold text-[11px] uppercase tracking-[0.25em] text-brand-gold;
  }

  .btn-text-link {
    @apply inline-flex items-center gap-2 text-brand-gold font-heading font-bold text-[13px] uppercase tracking-[0.1em] hover:gap-3 transition-all;
  }

  .product-tag {
    @apply bg-cta/10 text-cta text-[10px] font-heading font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-cta/20;
  }

  .placeholder-image {
    @apply bg-gradient-to-br from-bg-navy to-bg-primary border border-white/[0.06] flex items-center justify-center text-white/40 text-sm text-center p-4;
  }
}
```

- [ ] **Step 3: Create reusable animation variants file**

Create `src/lib/animations.ts`:

```typescript
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.15 } },
};

export const viewportOnce = { once: true };
```

All page components should import from this file instead of defining inline variants. Ensures `viewport={{ once: true }}` is used everywhere.

- [ ] **Step 4: Verify styles apply**

Run: `npx next build 2>&1 | head -20`
Expected: No CSS compilation errors

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/lib/animations.ts
git commit -m "feat: update globals.css with new design system utilities and animation variants"
```

---

### Task 4: Redesign Header Component

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Update Header with new design system**

Key changes:
- Replace `bg-primary-dark/95` with `bg-bg-primary/95`
- Replace `font-heading font-medium` nav links with Space Grotesk styling (already maps via Tailwind)
- Replace gold border CTA button with orange gradient CTA
- Add "Cabinet Signs" to navigation dropdown under Products
- Update mobile menu with full-screen overlay, larger typography
- Replace all old color tokens with new ones

```typescript
const navigation = [
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Channel Letters", href: "/products/channel-letters" },
      { name: "Flat Cut Letters", href: "/products/flat-cut-letters" },
      { name: "Blade Signs", href: "/products/blade-signs" },
      { name: "Cabinet Signs", href: "/products/cabinet-signs" },
      { name: "Lightboxes", href: "/products/lightboxes" },
      { name: "SEG Light Boxes", href: "/products/seg-light-boxes" },
      { name: "Custom Fabrication", href: "/products/custom-fabrication" },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];
```

Desktop CTA button: Replace gold border button with orange gradient:
```tsx
<Link
  href="/get-a-quote"
  className="bg-gradient-to-r from-cta to-cta-hover text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md px-6 py-2.5 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all"
>
  Get a Quote
</Link>
```

Scrolled state: `bg-bg-primary/95 backdrop-blur-md border-b border-white/[0.06]`

Mobile menu: `bg-bg-primary/98 backdrop-blur-md`, dropdown background: `bg-bg-card`

- [ ] **Step 2: Test in browser**

Navigate to http://localhost:3002 and verify:
- Header transparent on hero, solid on scroll
- Dropdown works on desktop
- Mobile menu opens/closes
- CTA button is orange gradient
- Cabinet Signs appears in dropdown

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: redesign Header with Bold & Dynamic design system"
```

---

### Task 5: Redesign Footer Component

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update Footer with new design system**

Key changes:
- Background: `bg-gradient-to-b from-bg-primary to-bg-navy`
- Top border: gold gradient divider
- Add "Cabinet Signs" to Products links
- Add "Popular Topics" section with placeholder (will link to landing pages in Phase 5)
- Replace all old color tokens
- Use `text-white/60` for body text (WCAG AA compliant), `text-white/30` only for decorative
- Font classes already map to Space Grotesk via updated Tailwind config

Add to footerLinks:
```typescript
Products: [
  { name: "Channel Letters", href: "/products/channel-letters" },
  { name: "Flat Cut Letters", href: "/products/flat-cut-letters" },
  { name: "Blade Signs", href: "/products/blade-signs" },
  { name: "Cabinet Signs", href: "/products/cabinet-signs" },
  { name: "Lightboxes", href: "/products/lightboxes" },
  { name: "SEG Light Boxes", href: "/products/seg-light-boxes" },
  { name: "Custom Fabrication", href: "/products/custom-fabrication" },
],
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: redesign Footer with Bold & Dynamic design system"
```

---

### Task 6: Create Shared CTASection Component

**Files:**
- Create: `src/components/CTASection.tsx`

- [ ] **Step 1: Create reusable CTA section**

This is the "Get Your Product Started" section that appears at the bottom of every page. Extract from current homepage and apply new design.

```tsx
import Link from "next/link";
import { Lock, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface CTASectionProps {
  heading?: string;
  highlight?: string;
  description?: string;
}

export default function CTASection({
  heading = "Get Your Product",
  highlight = "Started.",
  description = "Request wholesale pricing for your next project. Detailed trade quotes within 24 hours. Delivered in 3 weeks door to door.",
}: CTASectionProps) {
  return (
    <section className="section-padding">
      <div className="container-max relative">
        <div className="bg-gradient-to-br from-bg-card to-[#0F0F2D] rounded-2xl border border-white/[0.06] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(249,115,22,0.06),transparent_70%)]" />
          <div className="relative z-10 text-center px-8 py-20 lg:py-28">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 border border-brand-gold/20 rounded-full px-5 py-2 mb-10">
                <Lock className="w-3 h-3 text-brand-gold" />
                <span className="micro-label">Trade Accounts Only</span>
              </div>

              <h2 className="font-display text-4xl lg:text-[56px] leading-[1.05] mb-5 tracking-[-0.02em] font-bold">
                {heading} <span className="text-brand-gold">{highlight}</span>
              </h2>

              <p className="text-white/60 max-w-md mx-auto mb-12 text-[15px] leading-relaxed font-body">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/get-a-quote" className="btn-primary w-full sm:w-auto">
                  Request Trade Pricing
                </Link>
                <a href="tel:+6892940912" className="btn-secondary gap-2 w-full sm:w-auto justify-center">
                  <Phone className="w-4 h-4" />
                  (689) 294-0912
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/20 font-body">
                <span>(689) 294-0912</span>
                <span className="hidden sm:inline text-white/10">|</span>
                <span>hello@sunlitesigns.com</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat: create shared CTASection component"
```

---

### Task 7: Create FAQAccordion Component

**Files:**
- Create: `src/components/FAQAccordion.tsx`

- [ ] **Step 1: Create FAQ component with schema markup**

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  heading?: string;
}

export default function FAQAccordion({ faqs, heading = "Frequently Asked Questions" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-padding">
      <div className="container-max">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="gold-line mx-auto mb-6" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em]">
              {heading}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-heading font-semibold text-[15px] text-white/80 hover:text-white transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-white/60 text-[15px] leading-relaxed font-body">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQAccordion.tsx
git commit -m "feat: create FAQAccordion component with schema markup"
```

---

### Task 8: Create RelatedPages Component

**Files:**
- Create: `src/components/RelatedPages.tsx`

- [ ] **Step 1: Create related pages grid component**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  heading?: string;
}

export default function RelatedPages({ pages, heading = "Related Topics" }: RelatedPagesProps) {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em]">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page, i) => (
            <AnimatedSection key={page.href} delay={i * 0.08}>
              <Link
                href={page.href}
                className="group block bg-bg-card border border-white/[0.06] rounded-xl p-6 hover:border-brand-gold/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400"
              >
                <h3 className="font-heading font-bold text-lg mb-2 flex items-center gap-2">
                  {page.title}
                  <ArrowRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-body">
                  {page.description}
                </p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RelatedPages.tsx
git commit -m "feat: create RelatedPages grid component"
```

---

### Task 9: Create LandingPageHero Component

**Files:**
- Create: `src/components/LandingPageHero.tsx`

- [ ] **Step 1: Create reusable hero for landing pages**

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

interface LandingPageHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  breadcrumbs: { label: string; href: string }[];
}

export default function LandingPageHero({ title, highlight, subtitle, breadcrumbs }: LandingPageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-navy to-[#0F0F2D]" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.06),transparent_70%)]" />

      <div className="relative z-10 container-max section-padding !py-0">
        <Breadcrumbs items={breadcrumbs} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mt-8"
        >
          <div className="gold-line mb-8" />
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] mb-6">
            {title} <span className="text-brand-gold">{highlight}</span>
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-lg font-body leading-relaxed mb-10">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/get-a-quote" className="btn-primary">
              Request Trade Pricing
            </Link>
            <Link href="/products" className="btn-secondary gap-2">
              View Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LandingPageHero.tsx
git commit -m "feat: create LandingPageHero component for landing pages"
```

---

### Task 10: Update Breadcrumbs Component

**Files:**
- Modify: `src/components/Breadcrumbs.tsx`

- [ ] **Step 1: Update with new design tokens**

Ensure breadcrumbs use `micro-label` style, gold separators, and accept a generic `items` prop format:

```tsx
interface BreadcrumbItem {
  label: string;
  href: string;
}
```

If the current component doesn't accept this format, update it. Apply new font styling: Space Grotesk (via `font-heading`), 11px, uppercase, tracked.

- [ ] **Step 2: Commit**

```bash
git add src/components/Breadcrumbs.tsx
git commit -m "feat: update Breadcrumbs with new design system"
```

---

## Chunk 2: Core Pages Redesign (Phase 2)

Redesign Homepage, Products hub, About, Services, Contact, Get a Quote, Gallery, and 404 page.

### Task 11: Redesign Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Apply new design system to homepage**

Key changes from current to new:
- Hero: Replace `bg-gradient-to-t from-black/90` overlays with `bg-gradient-to-br from-bg-primary via-bg-navy to-[#0F0F2D]` gradient (keep HeroSlider for images)
- Remove all `italic` classes, use gold color-only emphasis
- Replace `font-display` serif styling with bold Space Grotesk headings
- Stats: Wrap in `bg-bg-card rounded-xl border border-white/[0.06]` card with gradient gold numbers
- Story section: Wrap in `bg-bg-light rounded-2xl` inset card, asymmetric `grid-cols-[1.2fr_0.8fr]`
- Products: Dark glass cards with `bg-bg-card`, gold border on hover, lift effect
- Engineering: Reversed asymmetric `grid-cols-[0.8fr_1.2fr]`
- CTA: Replace with `<CTASection />` component
- Add gradient dividers between sections
- Replace `section-padding` (it's already updated in globals.css)
- Add radial gradient glows where appropriate
- Use `text-white/60` for body text (not `/40` or `/50`)

Reference the design preview at `src/app/design-preview/page.tsx` for exact styling patterns.

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:3002 and verify all sections render correctly with new design.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign homepage with Bold & Dynamic design system"
```

---

### Task 12: Redesign Products Hub

**Files:**
- Modify: `src/app/products/page.tsx`

- [ ] **Step 1: Apply new design system**

- Hero with gradient background (no slider — simple heading hero)
- Product grid using dark glass cards (same style as homepage)
- Add "Cabinet Signs" card linking to `/products/cabinet-signs`
- Replace all old color tokens
- Remove italics, use gold color emphasis
- Add CTASection at bottom

- [ ] **Step 2: Commit**

```bash
git add src/app/products/page.tsx
git commit -m "feat: redesign Products hub page"
```

---

### Task 13: Redesign About Page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Apply new design system**

- LandingPageHero-style header
- Timeline sections with alternating asymmetric layouts
- Light section cards for key story beats
- Replace all old tokens, remove italics
- CTASection at bottom

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: redesign About page"
```

---

### Task 14: Redesign Services Page

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1: Apply new design system**

- Hero with gradient background
- 4-service grid using dark glass cards with icons
- Replace all old tokens, remove italics
- CTASection at bottom

- [ ] **Step 2: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: redesign Services page"
```

---

### Task 15: Redesign Contact Page

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Apply new design system**

- Hero with gradient background
- Split layout: form on left in `bg-bg-card` card, info cards on right
- Form inputs with `bg-bg-card border border-white/[0.06]` styling
- Replace all old tokens
- Add **ContactPage schema markup**

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: redesign Contact page"
```

---

### Task 16: Redesign Get a Quote Page

**Files:**
- Modify: `src/app/get-a-quote/page.tsx`

- [ ] **Step 1: Apply new design system**

- Hero with gradient background
- Form in main area, sticky sidebar with differentiators
- Form styling matching Contact page
- Replace all old tokens

- [ ] **Step 2: Commit**

```bash
git add src/app/get-a-quote/page.tsx
git commit -m "feat: redesign Get a Quote page"
```

---

### Task 17: Redesign Gallery Page

**Files:**
- Modify: `src/app/gallery/page.tsx`

- [ ] **Step 1: Apply new design system**

- Hero with gradient background
- Image grid with dark glass card treatment
- Hover effects on images
- Replace all old tokens

- [ ] **Step 2: Commit**

```bash
git add src/app/gallery/page.tsx
git commit -m "feat: redesign Gallery page"
```

---

### Task 18: Redesign 404 Page

**Files:**
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Apply new design system**

- Gradient background
- Large "404" in gradient gold text
- Updated button styles (btn-primary orange, btn-secondary border)
- Replace old tokens

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: redesign 404 page"
```

---

### Task 19: Create Cabinet Signs Product Page

**Files:**
- Create: `src/app/products/cabinet-signs/page.tsx`

- [ ] **Step 1: Create new cabinet signs hub page**

Model after existing product pages (e.g., `lightboxes/page.tsx` or `blade-signs/page.tsx`). Include:
- Metadata with SEO title/description
- Hero section
- Product overview
- Features/specs
- CTASection
- Schema markup

This page serves as the hub for 8 cabinet sign landing page spokes.

- [ ] **Step 2: Commit**

```bash
git add src/app/products/cabinet-signs/page.tsx
git commit -m "feat: create Cabinet Signs product hub page"
```

---

## Chunk 3: Product & Sub-Pages Redesign (Phases 3-4)

Redesign all product sub-pages, Why Sunlite pages, and Resources pages. These follow the same pattern — apply new design tokens, remove italics, use new component styles.

### Task 20: Redesign Channel Letters Hub + 12 Sub-Product Pages

**Files:**
- Modify: `src/app/products/channel-letters/page.tsx`
- Modify: `src/app/products/channel-letters/front-lit/page.tsx`
- Modify: `src/app/products/channel-letters/halo-lit/page.tsx`
- Modify: `src/app/products/channel-letters/front-and-halo-lit/page.tsx`
- Modify: `src/app/products/channel-letters/side-lit/page.tsx`
- Modify: `src/app/products/channel-letters/back-side-lit/page.tsx`
- Modify: `src/app/products/channel-letters/front-side-lit/page.tsx`
- Modify: `src/app/products/channel-letters/faux-neon/page.tsx`
- Modify: `src/app/products/channel-letters/conical/page.tsx`
- Modify: `src/app/products/channel-letters/trimless/page.tsx`
- Modify: `src/app/products/channel-letters/stainless-standoff/page.tsx`
- Modify: `src/app/products/channel-letters/stainless-flush/page.tsx`
- Modify: `src/app/products/channel-letters/non-illuminated/page.tsx`

- [ ] **Step 1: Redesign channel letters hub page**

Apply new design system — dark glass product grid, gradient hero, CTASection.

- [ ] **Step 2: Redesign all 12 sub-product pages**

Each sub-product page gets:
- Gradient hero with product name
- Day/night BeforeAfterSlider (already exists)
- SpecsTable with new card styling
- Breadcrumbs (with BreadcrumbList schema)
- CTASection
- **Product schema markup** (JSON-LD with `@type: Product`, name, description, manufacturer)

Apply new tokens, remove italics, update card styles. These pages share a similar layout so batch the changes.

- [ ] **Step 3: Commit**

```bash
git add src/app/products/channel-letters/
git commit -m "feat: redesign Channel Letters hub + 12 sub-product pages"
```

---

### Task 21: Redesign Remaining Product Pages

**Files:**
- Modify: `src/app/products/blade-signs/page.tsx`
- Modify: `src/app/products/flat-cut-letters/page.tsx`
- Modify: `src/app/products/lightboxes/page.tsx`
- Modify: `src/app/products/seg-light-boxes/page.tsx`
- Modify: `src/app/products/custom-fabrication/page.tsx`

- [ ] **Step 1: Redesign all 5 product pages**

Same pattern as channel letter pages. Apply new design system, CTASection, gradient hero. Add **Product schema markup** to each page.

- [ ] **Step 2: Commit**

```bash
git add src/app/products/blade-signs/ src/app/products/flat-cut-letters/ src/app/products/lightboxes/ src/app/products/seg-light-boxes/ src/app/products/custom-fabrication/
git commit -m "feat: redesign remaining product pages"
```

---

### Task 22: Redesign Why Sunlite Pages

**Files:**
- Modify: `src/app/why-sunlite/page.tsx`
- Modify: `src/app/why-sunlite/german-engineering/page.tsx`
- Modify: `src/app/why-sunlite/ul-listing/page.tsx`
- Modify: `src/app/why-sunlite/quality-process/page.tsx`
- Modify: `src/app/why-sunlite/wholesale-only/page.tsx`

- [ ] **Step 1: Redesign hub + 4 sub-pages**

Apply new design system to all 5 pages. These are content-heavy pages — use:
- Light section cards for key content blocks
- Asymmetric layouts alternating left/right
- Gradient dividers between sections
- CTASection at bottom

- [ ] **Step 2: Commit**

```bash
git add src/app/why-sunlite/
git commit -m "feat: redesign Why Sunlite pages"
```

---

### Task 23: Redesign Resources Pages

**Files:**
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/resources/blog/page.tsx`
- Modify: `src/app/resources/blog/[slug]/page.tsx`
- Modify: `src/app/resources/faq/page.tsx`
- Modify: `src/app/resources/glossary/page.tsx`
- Modify: `src/app/resources/guides/page.tsx`
- Modify: `src/app/resources/guides/channel-letter-buying-guide/page.tsx`
- Modify: `src/app/resources/guides/choosing-illumination-types/page.tsx`
- Modify: `src/app/resources/guides/sign-installation-tips/page.tsx`
- Modify: `src/app/resources/guides/trimless-channel-letters-guide/page.tsx`

- [ ] **Step 1: Redesign resources hub**

Card grid linking to Blog, Guides, Glossary, FAQ with new dark glass cards.

- [ ] **Step 2: Redesign blog listing + blog post template**

Blog listing: card grid with article cards.
Blog post template (`[slug]/page.tsx`): article layout with prose styling, breadcrumbs, related posts. Add **Article schema markup** (JSON-LD with `@type: Article`, headline, author, datePublished).

- [ ] **Step 3: Redesign FAQ page**

Use the new FAQAccordion component. Add FAQPage schema.

- [ ] **Step 4: Redesign glossary page**

Alphabetical term list with new card styling.

- [ ] **Step 5: Redesign guides hub + 4 guide pages**

Apply new design system to all guide pages. Add **HowTo schema markup** to each guide page.

- [ ] **Step 6: Commit**

```bash
git add src/app/resources/
git commit -m "feat: redesign Resources pages (blog, guides, glossary, FAQ)"
```

---

## Chunk 4: Landing Pages (Phase 5)

Build the 100 landing pages: data files, template, sitemap update.

### Task 24: Create Landing Page Data — Channel Letters (35 pages)

**Files:**
- Create: `src/lib/landing-pages/types.ts`
- Create: `src/lib/landing-pages/channel-letters.ts`

- [ ] **Step 1: Define LandingPage interface**

Create `src/lib/landing-pages/types.ts`:

```typescript
export interface LandingPage {
  slug: string;
  hubSlug: string;
  hubName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  h1Highlight: string;
  heroSubtitle: string;
  sections: {
    heading: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
  schemaType: "Product" | "Service";
}
```

- [ ] **Step 2: Create channel letters data (35 entries)**

Create `src/lib/landing-pages/channel-letters.ts` with all 35 channel letter landing page entries. Each entry must have:
- Unique slug, unique meta description (150-160 chars)
- H1 with primary keyword
- 2-3 content sections (600-1000 words total)
- 3-5 FAQs
- 3-4 related slugs

Keywords to cover (from spec Section 5.4):
- Type variations: front-lit, halo-lit, back-lit, side-lit, combination, faux neon, trimless, trimcap
- Comparisons: trimless vs trimcap, front-lit vs halo-lit, LED vs neon
- Material: aluminum, stainless steel, acrylic face
- Application: restaurant, hotel, retail storefront, medical office
- Features: UL listed, energy-efficient LED, waterproof
- Process: how made, installation guide, sizing guide

- [ ] **Step 3: Commit**

```bash
git add src/lib/landing-pages/types.ts src/lib/landing-pages/channel-letters.ts
git commit -m "feat: add landing page data for channel letters (35 pages)"
```

---

### Task 25: Create Landing Page Data — Remaining Categories (65 pages)

**Files:**
- Create: `src/lib/landing-pages/blade-signs.ts` (10 entries)
- Create: `src/lib/landing-pages/flat-cut-letters.ts` (10 entries)
- Create: `src/lib/landing-pages/light-boxes.ts` (10 entries)
- Create: `src/lib/landing-pages/cabinet-signs.ts` (8 entries)
- Create: `src/lib/landing-pages/general.ts` (15 entries)
- Create: `src/lib/landing-pages/engineering.ts` (7 entries)
- Create: `src/lib/landing-pages/illumination.ts` (5 entries)
- Create: `src/lib/landing-pages/index.ts`

- [ ] **Step 1: Create blade-signs.ts (10 entries)**

Keywords: illuminated, non-illuminated, double-sided, aluminum, steel, restaurant, retail, hotel, LED, weather-resistant

- [ ] **Step 2: Create flat-cut-letters.ts (10 entries)**

Keywords: aluminum, stainless steel, acrylic, brass, brushed metal, painted, polished, lobby, office, building

- [ ] **Step 3: Create light-boxes.ts (10 entries)**

Keywords: LED, SEG fabric, slim, double-sided, retail, menu board, real estate, edge-lit, backlit SEG

- [ ] **Step 4: Create cabinet-signs.ts (8 entries)**

Keywords: illuminated, push-through, flex-face, gas station, shopping center, storefront, LED, energy-efficient

- [ ] **Step 5: Create general.ts (15 entries)**

Keywords: wholesale manufacturer, wholesale supplier, sign shop partner, manufacturing process, engineering services, permit requirements, wholesale vs retail pricing, custom vs template, industry trends, material comparison, LED technology, sign ROI, UL listed explained, ADA requirements, code compliance

- [ ] **Step 6: Create engineering.ts (7 entries)**

Keywords: complimentary engineering, structural engineering, electrical engineering, design to manufacturing, installation planning, maintenance, warranty

- [ ] **Step 7: Create illumination.ts (5 entries)**

Keywords: LED illumination types, front-lit vs halo-lit, RGB LED, LED module technology, energy savings

- [ ] **Step 8: Create index.ts aggregator**

```typescript
import { LandingPage } from "./types";
import { channelLettersPages } from "./channel-letters";
import { bladeSignsPages } from "./blade-signs";
import { flatCutLettersPages } from "./flat-cut-letters";
import { lightBoxesPages } from "./light-boxes";
import { cabinetSignsPages } from "./cabinet-signs";
import { generalPages } from "./general";
import { engineeringPages } from "./engineering";
import { illuminationPages } from "./illumination";

export const allLandingPages: LandingPage[] = [
  ...channelLettersPages,
  ...bladeSignsPages,
  ...flatCutLettersPages,
  ...lightBoxesPages,
  ...cabinetSignsPages,
  ...generalPages,
  ...engineeringPages,
  ...illuminationPages,
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return allLandingPages.find((p) => p.slug === slug);
}

export function getLandingPagesByHub(hubSlug: string): LandingPage[] {
  return allLandingPages.filter((p) => p.hubSlug === hubSlug);
}
```

- [ ] **Step 9: Commit**

```bash
git add src/lib/landing-pages/
git commit -m "feat: add landing page data for all 100 pages"
```

---

### Task 26: Create Landing Page Template

**Files:**
- Create: `src/app/signs/[slug]/page.tsx`

- [ ] **Step 1: Create the dynamic landing page template**

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLandingPages, getLandingPage } from "@/lib/landing-pages";
import LandingPageHero from "@/components/LandingPageHero";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedPages from "@/components/RelatedPages";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export function generateStaticParams() {
  return allLandingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLandingPage(params.slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/signs/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/signs/${page.slug}`,
    },
  };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  const relatedPages = page.relatedSlugs
    .map((slug) => getLandingPage(slug))
    .filter(Boolean)
    .map((p) => ({
      title: p!.h1 + " " + p!.h1Highlight,
      description: p!.heroSubtitle,
      href: `/signs/${p!.slug}`,
    }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": page.schemaType,
    name: page.h1 + " " + page.h1Highlight,
    description: page.metaDescription,
    provider: { "@id": "https://sunlitesigns.com/#organization" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <LandingPageHero
        title={page.h1}
        highlight={page.h1Highlight}
        subtitle={page.heroSubtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: page.hubName, href: `/products/${page.hubSlug}` },
          { label: page.h1 + " " + page.h1Highlight, href: `/signs/${page.slug}` },
        ]}
      />

      {/* Content Sections */}
      {page.sections.map((section, i) => (
        <section key={i} className={i % 2 === 0 ? "section-padding" : ""}>
          {i % 2 === 1 ? (
            <div className="mx-6 sm:mx-10 lg:mx-16">
              <div className="bg-bg-light rounded-2xl">
                <div className="container-max section-padding">
                  <AnimatedSection>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-text-dark mb-6">
                      {section.heading}
                    </h2>
                    <div
                      className="text-text-dark/60 text-[15px] leading-relaxed font-body prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </AnimatedSection>
                </div>
              </div>
            </div>
          ) : (
            <div className="container-max">
              <AnimatedSection>
                <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-[-0.02em] mb-6">
                  {section.heading}
                </h2>
                <div
                  className="text-white/60 text-[15px] leading-relaxed font-body prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </AnimatedSection>
            </div>
          )}
          <div className="gradient-divider my-16 mx-6 sm:mx-10 lg:mx-16" />
        </section>
      ))}

      {page.faqs.length > 0 && <FAQAccordion faqs={page.faqs} />}

      {relatedPages.length > 0 && <RelatedPages pages={relatedPages} />}

      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify build with static params**

Run: `npx next build 2>&1 | tail -30`
Expected: All 100 `/signs/[slug]` pages generated successfully

- [ ] **Step 3: Commit**

```bash
git add src/app/signs/
git commit -m "feat: create landing page template with static generation for 100 pages"
```

---

## Chunk 5: SEO Polish (Phase 6)

### Task 27: Update Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add all 100 landing pages + cabinet signs to sitemap**

```typescript
import { allLandingPages } from "@/lib/landing-pages";

// In the sitemap function, add:
// 1. "/products/cabinet-signs" to staticPages array
// 2. Landing pages:
const landingPageEntries: MetadataRoute.Sitemap = allLandingPages.map((page) => ({
  url: `${baseUrl}/signs/${page.slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

return [...pages, ...blogPages, ...landingPageEntries];
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add 100 landing pages to sitemap"
```

---

### Task 28: Add Internal Links from Hub Pages to Spokes

**Files:**
- Modify: `src/app/products/channel-letters/page.tsx`
- Modify: `src/app/products/blade-signs/page.tsx`
- Modify: `src/app/products/flat-cut-letters/page.tsx`
- Modify: `src/app/products/lightboxes/page.tsx`
- Modify: `src/app/products/seg-light-boxes/page.tsx`
- Modify: `src/app/products/cabinet-signs/page.tsx`
- Modify: `src/app/products/custom-fabrication/page.tsx`

- [ ] **Step 1: Add "Related Articles" section to each hub page**

Import `getLandingPagesByHub` and render a RelatedPages grid at the bottom of each hub page (above CTASection), showing 3-6 related landing pages.

```tsx
import { getLandingPagesByHub } from "@/lib/landing-pages";
import RelatedPages from "@/components/RelatedPages";

// In the page component:
const spokes = getLandingPagesByHub("channel-letters").slice(0, 6);
const relatedPages = spokes.map((p) => ({
  title: p.h1 + " " + p.h1Highlight,
  description: p.heroSubtitle,
  href: `/signs/${p.slug}`,
}));

// Render:
<RelatedPages pages={relatedPages} heading="Learn More" />
```

- [ ] **Step 2: Commit**

```bash
git add src/app/products/
git commit -m "feat: add internal links from hub pages to landing page spokes"
```

---

### Task 29: Add Popular Topics to Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Add "Popular Topics" link column**

Add a fourth link column to the footer with 6-8 links to top landing pages:

```typescript
"Popular Topics": [
  { name: "Trimless vs Trimcap", href: "/signs/trimless-vs-trimcap-channel-letters" },
  { name: "Front-Lit Channel Letters", href: "/signs/front-lit-channel-letters" },
  { name: "UL Listed Signs Explained", href: "/signs/ul-listed-signs-explained" },
  { name: "LED Illumination Types", href: "/signs/led-illumination-types-for-signs" },
  { name: "Wholesale Sign Manufacturer", href: "/signs/wholesale-sign-manufacturer" },
  { name: "Channel Letter Installation", href: "/signs/channel-letter-installation-guide" },
],
```

Adjust footer grid from `lg:grid-cols-5` to `lg:grid-cols-6` to accommodate.

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Popular Topics links to footer"
```

---

### Task 30: Remove Old Token Aliases & Cleanup

**Files:**
- Modify: `tailwind.config.ts`
- Modify: All pages that still reference old tokens
- Delete: `src/app/design-preview/page.tsx`
- Delete: `src/app/globals.backup.css` (if committed)
- Delete: `src/app/page.backup.tsx` (if committed)
- Delete: `tailwind.config.backup.ts` (if committed)

- [ ] **Step 1: Search for old token usage**

Search codebase for: `primary-dark`, `navy-light`, `light-bg`, `text-light`, `accent-red`, `accent-teal`. Replace any remaining references with new token names.

- [ ] **Step 2: Remove old aliases from Tailwind config**

Remove the "Aliases for old tokens" section from `tailwind.config.ts`.

- [ ] **Step 3: Delete design preview page**

```bash
rm -rf src/app/design-preview/
```

- [ ] **Step 4: Verify build**

Run: `npx next build`
Expected: Clean build, no errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old design token aliases and cleanup"
```

---

### Task 31: Final SEO Audit

**Files:**
- All pages

- [ ] **Step 1: Verify every page has unique metadata**

Check that every page.tsx has a unique `title` and `description` in its metadata export. No two pages should share the same title or description.

- [ ] **Step 2: Verify heading hierarchy**

Every page must have exactly one `<h1>`. H2s should follow H1, H3s should follow H2s. No skipping levels.

- [ ] **Step 3: Verify schema markup**

- Homepage: Organization + WebSite (in layout.tsx — already done)
- Product pages: Product schema
- Landing pages: Product or Service schema
- FAQ page + landing page FAQs: FAQPage schema
- Blog posts: Article schema
- Contact: ContactPage schema

- [ ] **Step 4: Verify all images have alt text**

Search for `<Image` and `<img` tags missing `alt` attributes.

- [ ] **Step 5: Verify internal links**

- All spoke pages link to their hub
- All hub pages link to 3-6 spokes
- Footer has Popular Topics links
- No broken links (404s)

- [ ] **Step 6: Run Lighthouse**

Run Lighthouse on key pages (homepage, a product page, a landing page). Target:
- SEO score > 95
- Accessibility score > 90
- Performance score > 85

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete SEO audit and polish"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 - Foundation | 1-10 | Tailwind config, fonts, globals.css, Header, Footer, shared components |
| 2 - Core Pages | 11-19 | Homepage, Products, About, Services, Contact, Quote, Gallery, 404, Cabinet Signs |
| 3-4 - Sub-Pages | 20-23 | Channel letters (13), other products (5), Why Sunlite (5), Resources (10+) |
| 5 - Landing Pages | 24-26 | Data files (100 entries), template, static generation |
| 6 - SEO Polish | 27-31 | Sitemap, internal linking, footer links, cleanup, audit |

**Total: 31 tasks across 6 phases.**
