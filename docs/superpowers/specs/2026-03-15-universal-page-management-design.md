# Universal Page Management System — Design Spec

## Overview

Transform the admin panel from a landing-page-only editor into a full site-wide CMS. Every page on the site (product pages, landing pages, static pages) becomes manageable from the admin panel — with per-block visibility toggles and inline content editing.

## Goals

1. See all 50+ pages across the site in the admin dashboard
2. Toggle individual blocks on/off per page
3. Edit the content of every block (text, lists, specs, FAQs, images)
4. Add/delete items within blocks (FAQ entries, feature cards, spec rows, etc.)
5. Delete landing pages
6. Preview links from admin to live page
7. Image URL fields for hero/gallery/product images

## Non-Goals (deferred)

- Drag-and-drop block reordering
- Adding new block types dynamically
- File upload for images (URL-based for now)
- Bulk operations
- Page creation for product/static pages (only landing pages)

---

## Architecture

### Data Layer: Page Configs

Each page gets a JSON config file that defines its blocks, content, and visibility.

**Directory structure:**
```
content/
├── landing-pages/          # existing — stays as-is
│   ├── cabinet-signs.json
│   ├── channel-letters-1.json
│   └── ...
├── products/               # NEW — one file per product page (28 files)
│   ├── products.json                          # /products index
│   ├── cabinet-signs.json
│   ├── channel-letters.json                   # /products/channel-letters hub
│   ├── channel-letters--front-lit.json
│   ├── channel-letters--halo-lit.json
│   ├── channel-letters--front-and-halo-lit.json
│   ├── channel-letters--side-lit.json
│   ├── channel-letters--back-side-lit.json
│   ├── channel-letters--front-side-lit.json
│   ├── channel-letters--faux-neon.json
│   ├── channel-letters--conical.json
│   ├── channel-letters--trimless.json
│   ├── channel-letters--stainless-standoff.json
│   ├── channel-letters--stainless-flush.json
│   ├── channel-letters--non-illuminated.json
│   ├── blade-signs.json
│   ├── flat-cut-letters.json
│   ├── lightboxes.json
│   ├── seg-light-boxes.json
│   ├── logo-boxes.json
│   ├── push-through-signs.json
│   └── custom-fabrication.json
└── pages/                  # NEW — one file per static page (20 files)
    ├── home.json
    ├── about.json
    ├── contact.json
    ├── gallery.json
    ├── get-a-quote.json
    ├── services.json
    ├── why-sunlite.json
    ├── why-sunlite--german-engineering.json
    ├── why-sunlite--quality-process.json
    ├── why-sunlite--ul-listing.json
    ├── why-sunlite--wholesale-only.json
    ├── resources.json
    ├── resources--guides.json
    ├── resources--faq.json
    ├── resources--glossary.json
    ├── resources--blog.json
    ├── resources--guides--channel-letter-buying-guide.json
    ├── resources--guides--choosing-illumination-types.json
    ├── resources--guides--sign-installation-tips.json
    └── resources--guides--trimless-channel-letters-guide.json
```

### Page Config Schema

Each JSON file follows a universal structure:

```typescript
interface PageConfig {
  // Page identity
  slug: string;                    // URL path (e.g., "/products/cabinet-signs")
  pageType: "product" | "landing" | "static";
  label: string;                   // Display name in admin (e.g., "Cabinet Signs")

  // SEO fields
  seo: {
    title: string;                 // Browser tab <title>
    metaDescription: string;       // <meta name="description">
    keywords?: string[];           // <meta name="keywords">
    canonical?: string;            // <link rel="canonical">
    ogTitle?: string;              // Open Graph title (defaults to title if omitted)
    ogDescription?: string;        // Open Graph description
    ogImage?: string;              // Open Graph image URL
  };

  // Blocks array — ordered list of content blocks
  blocks: Block[];
}


interface Block {
  id: string;                      // Unique block ID — use type as base, suffix with _2, _3 for duplicates
  type: BlockType;                 // Block type determines editor UI
  label: string;                   // Human-readable name shown in admin
  visible: boolean;                // Toggle on/off
  data: Record<string, unknown>;   // Block-specific content (varies by type)
}
```

### Block Types & Their Data Schemas

#### 1. `hero`
```typescript
{
  type: "hero",
  data: {
    badge?: string;                // Optional badge text (e.g., "Wholesale Only")
    h1: string;                    // Main heading
    h1Highlight?: string;          // Gold-highlighted portion
    subtitle: string;              // Description text
    image?: string;                // Hero image URL
    ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
  }
}
```

#### 2. `features_grid`
```typescript
{
  type: "features_grid",
  data: {
    heading: string;
    items: {
      icon: string;                // Lucide icon name
      title: string;
      description: string;
    }[];
  }
}
```

#### 3. `product_types`
```typescript
{
  type: "product_types",
  data: {
    heading: string;
    items: {
      name: string;
      description: string;
      image?: string;
      href?: string;
    }[];
  }
}
```

#### 4. `specs_table`
```typescript
{
  type: "specs_table",
  data: {
    heading: string;
    description?: string;
    image?: string;
    specs: { label: string; value: string }[];
  }
}
```

#### 5. `use_cases`
```typescript
{
  type: "use_cases",
  data: {
    heading: string;
    description?: string;
    items: string[];               // Checklist items
  }
}
```

#### 6. `gallery`
```typescript
{
  type: "gallery",
  data: {
    heading: string;
    images: { src: string; alt: string }[];
  }
}
```

#### 7. `faq`
```typescript
{
  type: "faq",
  data: {
    heading: string;
    items: { question: string; answer: string }[];
  }
}
```

#### 8. `cta`
```typescript
{
  type: "cta",
  data: {
    heading: string;
    headingHighlight?: string;
    description: string;
  }
}
```

#### 9. `related_pages`
```typescript
{
  type: "related_pages",
  data: {
    heading: string;
    slugs: string[];               // Full URL paths (e.g., "/products/cabinet-signs", "/signs/illuminated-cabinet-signs")
  }
}
```

#### 10. `text_section`
Generic rich text section (used for content sections, story blocks, etc.)
```typescript
{
  type: "text_section",
  data: {
    heading: string;
    content: string;               // HTML rich text
    image?: string;
    imagePosition?: "left" | "right";
    background?: "light" | "dark" | "navy";
  }
}
```

#### 11. `stats_strip`
```typescript
{
  type: "stats_strip",
  data: {
    items: {
      icon: string;
      label: string;
      sublabel?: string;
    }[];
  }
}
```

#### 12. `marquee`
```typescript
{
  type: "marquee",
  data: {
    messages: string[];
  }
}
```

#### 13. `timeline`
```typescript
{
  type: "timeline",
  data: {
    heading?: string;
    entries: {
      step: number;
      title: string;
      text: string;
      image?: string;
    }[];
  }
}
```

#### 14. `contact_info`
```typescript
{
  type: "contact_info",
  data: {
    heading?: string;
    cards: {
      icon: string;
      title: string;
      value: string;
      note?: string;
    }[];
  }
}
```

#### 15. `form_section`
```typescript
{
  type: "form_section",
  data: {
    heading: string;
    description?: string;
    formType: "contact" | "quote";  // Determines which form component to render
    sidebar?: {
      businessHours?: { day: string; hours: string }[];
      notices?: string[];
      ctaText?: string;
    };
  }
}
```

#### 16. `process_steps`
```typescript
{
  type: "process_steps",
  data: {
    heading: string;
    steps: {
      step: number;
      title: string;
      description: string;
      image?: string;
    }[];
  }
}
```

#### 17. `product_grid`
For channel letters page — grid of product variants with images.
```typescript
{
  type: "product_grid",
  data: {
    heading: string;
    description?: string;
    items: {
      name: string;
      model?: string;
      image?: string;
      href?: string;
    }[];
  }
}
```

#### 18. `resource_cards`
```typescript
{
  type: "resource_cards",
  data: {
    heading?: string;
    items: {
      icon: string;
      title: string;
      description: string;
      href: string;
    }[];
  }
}
```

#### 19. `guides_list`
```typescript
{
  type: "guides_list",
  data: {
    heading?: string;
    items: {
      title: string;
      description: string;
      readTime: string;
      href: string;
      image?: string;
    }[];
  }
}
```

---

## Admin Panel Changes

### Dashboard Redesign

The admin dashboard gets three tabs:

**Tab 1: Product Pages (28 pages)**
- Table with columns: Page Name, Route, Block Count, Status
- Click row → opens block editor at `/admin/products/[slug]`

**Tab 2: Landing Pages (120 pages)** — existing functionality
- Same as current but adds: Delete button, Preview link
- Click row → opens existing page editor at `/admin/pages/[slug]`

**Tab 3: Static Pages (20 pages)**
- Table with columns: Page Name, Route, Block Count
- Click row → opens block editor at `/admin/static/[slug]`

All tabs have search + filter.

### Block Editor (New Component)

Route: `/admin/products/[slug]` and `/admin/static/[slug]`

Layout:
```
┌─────────────────────────────────────────────┐
│ ← Back to Dashboard        Preview ↗        │
│                                              │
│ Page: Cabinet Signs                          │
│ Route: /products/cabinet-signs               │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [ON/OFF] Hero                      [▼]   │ │
│ │  ├─ h1: "Wholesale Cabinet Signs"        │ │
│ │  ├─ h1Highlight: "Cabinet Signs"         │ │
│ │  ├─ subtitle: "Premium quality..."       │ │
│ │  ├─ image: [URL field]                   │ │
│ │  └─ CTAs: [list editor]                  │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [ON/OFF] Features Grid             [▼]   │ │
│ │  (collapsed — click to expand)           │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ [OFF]   Gallery                    [▼]   │ │
│ │  (disabled — block hidden on page)       │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ [Save Changes]                               │
└─────────────────────────────────────────────┘
```

Each block is a collapsible card:
- Toggle switch (on/off) — controls `visible` field
- Expand/collapse chevron
- When expanded, shows editable fields based on block type
- List fields (FAQs, features, specs) have Add/Remove/Reorder buttons
- Text fields use the existing RichTextEditor for HTML content
- Simple fields use text inputs

### Block Type Editors

Each block type gets a specialized inline editor:

- **hero**: Text inputs for h1/h1Highlight/subtitle, URL input for image, CTA list editor
- **features_grid**: Repeatable card editor (icon dropdown, title, description inputs)
- **product_types**: Repeatable card editor (name, description, image URL, link)
- **specs_table**: Repeatable row editor (label + value inputs), description textarea, image URL
- **use_cases**: Repeatable string list (add/remove/reorder)
- **gallery**: Repeatable image entry (URL + alt text)
- **faq**: Repeatable Q&A editor (question input + answer rich text)
- **cta**: Text inputs for heading/highlight/description
- **text_section**: Heading input + RichTextEditor + image URL + position/background selectors
- **stats_strip**: Repeatable entry (icon, label, sublabel)
- **timeline**: Repeatable entry (step number, title, text, image URL)
- **process_steps**: Repeatable entry (step, title, description, image URL)
- **contact_info**: Repeatable card (icon, title, value, note)
- **form_section**: Heading, description, form type selector, sidebar config
- **marquee**: Repeatable string list
- **product_grid**: Repeatable product entry (name, model, image, href)
- **resource_cards**: Repeatable card entry (icon, title, description, href)
- **guides_list**: Repeatable entry (title, description, readTime, href, image)
- **related_pages**: Slug autocomplete list (reuses existing pattern from PageForm)

### New API Routes

```
GET    /api/admin/products              — List all product page configs
GET    /api/admin/products/[slug]       — Get single product page config
PUT    /api/admin/products/[slug]       — Update product page config

GET    /api/admin/static-pages          — List all static page configs
GET    /api/admin/static-pages/[slug]   — Get single static page config
PUT    /api/admin/static-pages/[slug]   — Update static page config

DELETE /api/admin/pages/[slug]          — Delete a landing page (NEW)
```

All protected by existing auth middleware.

### Landing Page Enhancements

- **Delete**: Confirmation dialog → DELETE API call → removes from JSON file
- **Preview link**: Button that opens `/signs/[slug]` in new tab

---

## Page Rendering Changes

### Product Pages

Each product page TSX file gets refactored to:

1. Load its JSON config at build time
2. Check `block.visible` before rendering each section
3. Pull content from `block.data` instead of hard-coded values

**Example refactor pattern:**

```tsx
// Before (hard-coded):
<section>
  <h2>Features</h2>
  <div>{features.map(f => <Card>{f.title}</Card>)}</div>
</section>

// After (data-driven):
const config = getPageConfig("cabinet-signs");
const featuresBlock = config.blocks.find(b => b.id === "features");

{featuresBlock?.visible && (
  <section>
    <h2>{featuresBlock.data.heading}</h2>
    <div>{featuresBlock.data.items.map(f => <Card>{f.title}</Card>)}</div>
  </section>
)}
```

The layout/styling of each block stays exactly the same — only the content source changes from hard-coded to JSON.

### Static Pages

Same pattern. Each static page loads its config and renders blocks conditionally.

### Landing Pages

No change needed — already data-driven from JSON. The only additions are the delete API and preview link in admin.

---

## Migration: Extracting Hard-Coded Content

One-time migration step: for each product and static page, extract all hard-coded content into JSON config files.

This will be done page by page:
1. Read the TSX file
2. Extract all content into the PageConfig JSON structure
3. Write the JSON file to `content/products/` or `content/pages/`
4. Refactor the TSX to read from JSON

Order of migration:
1. Product pages (28 pages) — they share similar block structures
2. Static pages (20 pages) — each unique but smaller

---

## File Changes Summary

**New files:**
- `src/lib/admin/page-config.ts` — Read/write page configs, type definitions
- `src/lib/admin/block-types.ts` — Block type registry with field schemas
- `src/components/admin/BlockEditor.tsx` — Main block editor component
- `src/components/admin/BlockCard.tsx` — Individual block card with toggle + editor
- `src/components/admin/block-editors/` — Per-block-type editor components
  - `HeroEditor.tsx`
  - `FeaturesGridEditor.tsx`
  - `SpecsTableEditor.tsx`
  - `FAQEditor.tsx`
  - `GalleryEditor.tsx`
  - `TextSectionEditor.tsx`
  - `CTAEditor.tsx`
  - `UseCasesEditor.tsx`
  - `ProductTypesEditor.tsx`
  - `StatsStripEditor.tsx`
  - `TimelineEditor.tsx`
  - `ProcessStepsEditor.tsx`
  - `ContactInfoEditor.tsx`
  - `FormSectionEditor.tsx`
  - `MarqueeEditor.tsx`
  - `ProductGridEditor.tsx`
  - `ResourceCardsEditor.tsx`
  - `GuidesListEditor.tsx`
  - `RelatedPagesEditor.tsx`
  - `ListEditor.tsx` — Reusable list add/remove/reorder component
- `src/app/(admin)/admin/products/page.tsx` — Product pages list
- `src/app/(admin)/admin/products/[slug]/page.tsx` — Product page block editor
- `src/app/(admin)/admin/static/page.tsx` — Static pages list
- `src/app/(admin)/admin/static/[slug]/page.tsx` — Static page block editor
- `src/app/api/admin/products/route.ts` — List product configs
- `src/app/api/admin/products/[slug]/route.ts` — Get/update product config
- `src/app/api/admin/static-pages/route.ts` — List static page configs
- `src/app/api/admin/static-pages/[slug]/route.ts` — Get/update static page config
- `src/lib/admin/icon-map.ts` — Lucide icon string-to-component mapping utility
- `src/components/BlockRenderer.tsx` — Shared public-side block renderer component
- `content/products/*.json` — 28 product page config files
- `content/pages/*.json` — 20 static page config files

**Modified files:**
- `src/app/(admin)/admin/page.tsx` — Add tabs, delete button, preview link
- `src/app/(admin)/admin/layout.tsx` — Update sidebar nav with new sections
- `src/app/api/admin/pages/[slug]/route.ts` — Add DELETE handler
- `src/middleware.ts` — Extend to protect new admin routes
- All product page TSX files (28 files) — Refactor to read from JSON configs
- All static page TSX files (20 files) — Refactor to read from JSON configs

---

## Technical Notes

- **Revalidation strategy**: Product and static pages use `dynamic = "force-dynamic"` in development. For production, API PUT routes call `revalidatePath()` after saving to trigger ISR — changes appear on the public site without a full rebuild.
- **One file per page**: Each product/static page config is a single JSON file (unlike landing pages which share files by hub). This avoids concurrent write conflicts.
- **Lucide icon mapping**: A `getIconComponent(name: string)` utility maps icon name strings to Lucide React components. Used by `features_grid`, `stats_strip`, `contact_info`, and `resource_cards` block renderers.
- **Shared BlockRenderer**: A single `BlockRenderer` component maps `block.type` to the correct presentation component on the public side. Each page TSX file loads its config and passes blocks to `BlockRenderer`, rather than each page duplicating the block-type-to-component mapping.
- **JSON-LD structured data**: Stays hard-coded in page TSX files for now. The structured data markup is tightly coupled to page semantics and rarely changes.
- **Landing page schema**: Landing pages keep their existing schema (`h1`, `h1Highlight`, `sections[]`, `faqs[]`, etc.) and existing editor. They are not migrated to the PageConfig format. The admin dashboard presents them in a unified tab interface but routes to different editors.
- Block type field schemas live in code, not in the JSON — the JSON only stores content
- The block editor uses the same shadcn/ui components and dark theme as the existing admin
- Validation uses Zod schemas per block type
- Icon selection for features/stats uses a dropdown of available Lucide icon names
