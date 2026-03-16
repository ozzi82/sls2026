# Universal Page Management System — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the admin panel into a full site-wide CMS where every page's content blocks can be toggled on/off and edited.

**Architecture:** JSON config files (one per page) in `content/products/` and `content/pages/` store block definitions with visibility flags and content data. Admin panel gets tabbed dashboard (Products / Landing Pages / Static Pages) with a block editor UI. Public pages are refactored to read content from JSON configs instead of hard-coded TSX. Landing pages keep their existing schema unchanged.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui, TipTap, Zod, Lucide React, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-15-universal-page-management-design.md`

---

## Chunk 1: Core Infrastructure

### Task 1: PageConfig Types & Block Type Definitions

**Files:**
- Create: `src/lib/admin/page-config-types.ts`

- [ ] **Step 1: Create the PageConfig and Block type definitions**

```typescript
// src/lib/admin/page-config-types.ts

export type BlockType =
  | "hero"
  | "features_grid"
  | "product_types"
  | "specs_table"
  | "use_cases"
  | "gallery"
  | "faq"
  | "cta"
  | "related_pages"
  | "text_section"
  | "stats_strip"
  | "marquee"
  | "timeline"
  | "contact_info"
  | "form_section"
  | "process_steps"
  | "product_grid"
  | "resource_cards"
  | "guides_list";

export interface HeroData {
  badge?: string;
  h1: string;
  h1Highlight?: string;
  subtitle: string;
  image?: string;
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
}

export interface FeaturesGridData {
  heading: string;
  items: { icon: string; title: string; description: string }[];
}

export interface ProductTypesData {
  heading: string;
  items: { name: string; description: string; image?: string; href?: string }[];
}

export interface SpecsTableData {
  heading: string;
  description?: string;
  image?: string;
  specs: { label: string; value: string }[];
}

export interface UseCasesData {
  heading: string;
  description?: string;
  items: string[];
}

export interface GalleryData {
  heading: string;
  images: { src: string; alt: string }[];
}

export interface FAQData {
  heading: string;
  items: { question: string; answer: string }[];
}

export interface CTAData {
  heading: string;
  headingHighlight?: string;
  description: string;
}

export interface RelatedPagesData {
  heading: string;
  slugs: string[];
}

export interface TextSectionData {
  heading: string;
  content: string;
  image?: string;
  imagePosition?: "left" | "right";
  background?: "light" | "dark" | "navy";
}

export interface StatsStripData {
  items: { icon: string; label: string; sublabel?: string }[];
}

export interface MarqueeData {
  messages: string[];
}

export interface TimelineData {
  heading?: string;
  entries: { step: number; title: string; text: string; image?: string }[];
}

export interface ContactInfoData {
  heading?: string;
  cards: { icon: string; title: string; value: string; note?: string; href?: string; description?: string }[];
}

export interface FormSectionData {
  heading: string;
  description?: string;
  formType: "contact" | "quote";
  sidebar?: {
    businessHours?: { day: string; hours: string }[];
    notices?: string[];
    ctaText?: string;
  };
}

export interface ProcessStepsData {
  heading: string;
  steps: { step: number; title: string; description: string; image?: string }[];
}

export interface ProductGridData {
  heading: string;
  description?: string;
  items: { name: string; model?: string; image?: string; href?: string }[];
}

export interface ResourceCardsData {
  heading?: string;
  items: { icon: string; title: string; description: string; href: string }[];
}

export interface GuidesListData {
  heading?: string;
  items: { title: string; description: string; readTime: string; href: string; image?: string }[];
}

export type BlockDataMap = {
  hero: HeroData;
  features_grid: FeaturesGridData;
  product_types: ProductTypesData;
  specs_table: SpecsTableData;
  use_cases: UseCasesData;
  gallery: GalleryData;
  faq: FAQData;
  cta: CTAData;
  related_pages: RelatedPagesData;
  text_section: TextSectionData;
  stats_strip: StatsStripData;
  marquee: MarqueeData;
  timeline: TimelineData;
  contact_info: ContactInfoData;
  form_section: FormSectionData;
  process_steps: ProcessStepsData;
  product_grid: ProductGridData;
  resource_cards: ResourceCardsData;
  guides_list: GuidesListData;
};

export interface Block<T extends BlockType = BlockType> {
  id: string;
  type: T;
  label: string;
  visible: boolean;
  data: BlockDataMap[T];
}

export interface PageSeo {
  title: string;
  metaDescription: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface PageConfig {
  slug: string;
  pageType: "product" | "landing" | "static";
  label: string;
  seo: PageSeo;
  blocks: Block[];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to page-config-types.ts

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/page-config-types.ts
git commit -m "feat(admin): add PageConfig and Block type definitions"
```

---

### Task 2: Page Config File I/O Library

**Files:**
- Create: `src/lib/admin/page-config.ts`

- [ ] **Step 1: Create the page config read/write utilities**

This follows the same pattern as `src/lib/admin/pages.ts` but for the new `content/products/` and `content/pages/` directories. One JSON file per page.

```typescript
// src/lib/admin/page-config.ts
import fs from "fs";
import path from "path";
import { PageConfig } from "./page-config-types";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readConfigFile(filePath: string): PageConfig | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeConfigFile(filePath: string, config: PageConfig) {
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

function slugToFilename(fileSlug: string): string {
  // fileSlug is the config ID / filename stem, e.g., "cabinet-signs" or "channel-letters--front-lit"
  // This is NOT the PageConfig.slug field (which stores URL paths like "/products/cabinet-signs")
  // The API route params provide the fileSlug directly from the URL segment
  return fileSlug + ".json";
}

// Product page configs
export function getAllProductConfigs(): PageConfig[] {
  ensureDir(PRODUCTS_DIR);
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => readConfigFile(path.join(PRODUCTS_DIR, f)))
    .filter((c): c is PageConfig => c !== null);
}

export function getProductConfig(slug: string): PageConfig | null {
  return readConfigFile(path.join(PRODUCTS_DIR, slugToFilename(slug)));
}

export function updateProductConfig(slug: string, config: PageConfig): { success: boolean; error?: string } {
  const filePath = path.join(PRODUCTS_DIR, slugToFilename(slug));
  if (!fs.existsSync(filePath)) {
    return { success: false, error: "Product config not found" };
  }
  writeConfigFile(filePath, config);
  return { success: true };
}

// Static page configs
export function getAllStaticConfigs(): PageConfig[] {
  ensureDir(PAGES_DIR);
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => readConfigFile(path.join(PAGES_DIR, f)))
    .filter((c): c is PageConfig => c !== null);
}

export function getStaticConfig(slug: string): PageConfig | null {
  return readConfigFile(path.join(PAGES_DIR, slugToFilename(slug)));
}

export function updateStaticConfig(slug: string, config: PageConfig): { success: boolean; error?: string } {
  const filePath = path.join(PAGES_DIR, slugToFilename(slug));
  if (!fs.existsSync(filePath)) {
    return { success: false, error: "Static page config not found" };
  }
  writeConfigFile(filePath, config);
  return { success: true };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/page-config.ts
git commit -m "feat(admin): add page config file I/O library"
```

---

### Task 3: Lucide Icon String-to-Component Mapping

**Files:**
- Create: `src/lib/admin/icon-map.ts`

- [ ] **Step 1: Create the icon mapping utility**

Maps icon name strings stored in JSON to actual Lucide React components. Only include icons that are actually used across the site.

```typescript
// src/lib/admin/icon-map.ts
import {
  Eye, Lightbulb, Ruler, Shield, Palette, Layers,
  Phone, Mail, MapPin, Clock, Lock, Zap, Truck,
  CheckCircle, ArrowRight, Star, Settings, Wrench,
  Package, Sparkles, Maximize, Target, Award,
  FileText, BookOpen, HelpCircle, Newspaper,
  PenTool, Cpu, Cable, Factory, Building2,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Eye, Lightbulb, Ruler, Shield, Palette, Layers,
  Phone, Mail, MapPin, Clock, Lock, Zap, Truck,
  CheckCircle, ArrowRight, Star, Settings, Wrench,
  Package, Sparkles, Maximize, Target, Award,
  FileText, BookOpen, HelpCircle, Newspaper,
  PenTool, Cpu, Cable, Factory, Building2,
};

export function getIconComponent(name: string): LucideIcon | null {
  return iconMap[name] || null;
}

export function getAvailableIconNames(): string[] {
  return Object.keys(iconMap).sort();
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/admin/icon-map.ts
git commit -m "feat(admin): add Lucide icon string-to-component mapping"
```

---

### Task 4: PageConfig Zod Validation

**Files:**
- Modify: `src/lib/admin/validation.ts`

- [ ] **Step 1: Add PageConfig Zod schema alongside existing landing page schema**

Add to the bottom of the existing file. Do not modify the existing `landingPageSchema`.

```typescript
// Add to src/lib/admin/validation.ts

import { BlockType } from "./page-config-types";

const blockTypes: BlockType[] = [
  "hero", "features_grid", "product_types", "specs_table", "use_cases",
  "gallery", "faq", "cta", "related_pages", "text_section", "stats_strip",
  "marquee", "timeline", "contact_info", "form_section", "process_steps",
  "product_grid", "resource_cards", "guides_list",
];

const blockSchema = z.object({
  id: z.string().min(1),
  type: z.enum(blockTypes as [string, ...string[]]),
  label: z.string().min(1),
  visible: z.boolean(),
  data: z.record(z.unknown()),
});

const pageSeoSchema = z.object({
  title: z.string().min(1),
  metaDescription: z.string().min(1),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

export const pageConfigSchema = z.object({
  slug: z.string().min(1),
  pageType: z.enum(["product", "landing", "static"]),
  label: z.string().min(1),
  seo: pageSeoSchema,
  blocks: z.array(blockSchema),
});
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/validation.ts
git commit -m "feat(admin): add Zod schema for PageConfig validation"
```

---

### Task 5: Landing Page Delete Function

**Files:**
- Modify: `src/lib/admin/pages.ts`
- Modify: `src/app/api/admin/pages/[slug]/route.ts`

- [ ] **Step 1: Add deletePage function to pages.ts**

Add to bottom of `src/lib/admin/pages.ts`:

```typescript
export function deletePage(slug: string): { success: boolean; error?: string } {
  const result = getPageBySlug(slug);
  if (!result) return { success: false, error: "Page not found" };

  const pages = readJsonFile(result.file);
  const filtered = pages.filter((p) => p.slug !== slug);
  writeJsonFile(result.file, filtered);
  return { success: true };
}
```

- [ ] **Step 2: Add DELETE handler to the API route**

Add to `src/app/api/admin/pages/[slug]/route.ts`:

```typescript
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const result = deletePage(params.slug);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
```

Update import to include `deletePage`:
```typescript
import { getPageBySlug, updatePage, deletePage } from "@/lib/admin/pages";
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

- [ ] **Step 4: Commit**

```bash
git add src/lib/admin/pages.ts src/app/api/admin/pages/[slug]/route.ts
git commit -m "feat(admin): add landing page delete functionality"
```

---

## Chunk 2: Admin API Routes

### Task 6: Product Pages API Routes

**Files:**
- Create: `src/app/api/admin/products/route.ts`
- Create: `src/app/api/admin/products/[slug]/route.ts`

- [ ] **Step 1: Create the product pages list endpoint**

```typescript
// src/app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { getAllProductConfigs } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const configs = getAllProductConfigs();
  const pages = configs.map((c) => ({
    slug: c.slug,
    label: c.label,
    route: c.slug.startsWith("/") ? c.slug : `/${c.slug}`,
    blockCount: c.blocks.length,
    hiddenBlocks: c.blocks.filter((b) => !b.visible).length,
  }));
  return NextResponse.json({ pages });
}
```

- [ ] **Step 2: Create the product page get/update endpoint**

```typescript
// src/app/api/admin/products/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProductConfig, updateProductConfig } from "@/lib/admin/page-config";
import { pageConfigSchema } from "@/lib/admin/validation";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const config = getProductConfig(params.slug);
  if (!config) {
    return NextResponse.json({ error: "Product config not found" }, { status: 404 });
  }
  return NextResponse.json(config);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const parsed = pageConfigSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = updateProductConfig(params.slug, parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  // Trigger ISR revalidation for the public page
  revalidatePath(parsed.data.slug);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/products/
git commit -m "feat(admin): add product pages API routes (GET list, GET/PUT single)"
```

---

### Task 7: Static Pages API Routes

**Files:**
- Create: `src/app/api/admin/static-pages/route.ts`
- Create: `src/app/api/admin/static-pages/[slug]/route.ts`

- [ ] **Step 1: Create the static pages list endpoint**

```typescript
// src/app/api/admin/static-pages/route.ts
import { NextResponse } from "next/server";
import { getAllStaticConfigs } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const configs = getAllStaticConfigs();
  const pages = configs.map((c) => ({
    slug: c.slug,
    label: c.label,
    route: c.slug.startsWith("/") ? c.slug : `/${c.slug}`,
    blockCount: c.blocks.length,
    hiddenBlocks: c.blocks.filter((b) => !b.visible).length,
  }));
  return NextResponse.json({ pages });
}
```

- [ ] **Step 2: Create the static page get/update endpoint**

Same pattern as products — copy `src/app/api/admin/products/[slug]/route.ts` but use `getStaticConfig` / `updateStaticConfig` instead.

```typescript
// src/app/api/admin/static-pages/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getStaticConfig, updateStaticConfig } from "@/lib/admin/page-config";
import { pageConfigSchema } from "@/lib/admin/validation";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const config = getStaticConfig(params.slug);
  if (!config) {
    return NextResponse.json({ error: "Static page config not found" }, { status: 404 });
  }
  return NextResponse.json(config);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const parsed = pageConfigSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = updateStaticConfig(params.slug, parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  revalidatePath(parsed.data.slug);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/static-pages/
git commit -m "feat(admin): add static pages API routes (GET list, GET/PUT single)"
```

---

## Chunk 3: Admin UI — Dashboard & Block Editor

### Task 8: Reusable ListEditor Component

**Files:**
- Create: `src/components/admin/block-editors/ListEditor.tsx`

- [ ] **Step 1: Create the ListEditor component**

Reusable add/remove/reorder list used by many block editors (FAQs, features, specs, etc.).

```tsx
// src/components/admin/block-editors/ListEditor.tsx
"use client";

import type React from "react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface ListEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (updated: T) => void) => React.ReactNode;
  createItem: () => T;
  label: string;
  minItems?: number;
}

export default function ListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  label,
  minItems = 0,
}: ListEditorProps<T>) {
  const baseId = useId();

  function add() {
    onChange([...items, createItem()]);
  }

  function remove(index: number) {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const next = [...items];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  }

  function update(index: number, updated: T) {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={`${baseId}-${i}`} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-1 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => move(i, -1)} disabled={i === 0}>
              <ArrowUp className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
              <ArrowDown className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)} disabled={items.length <= minItems}>
              <Trash2 className="h-3 w-3 text-red-500" />
            </Button>
          </div>
          {renderItem(item, i, (updated) => update(i, updated))}
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus className="h-3 w-3 mr-1" />
        Add {label}
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/block-editors/ListEditor.tsx
git commit -m "feat(admin): add reusable ListEditor component for block editors"
```

---

### Task 9: Block Type Editor Components

**Files:**
- Create: `src/components/admin/block-editors/HeroEditor.tsx`
- Create: `src/components/admin/block-editors/FeaturesGridEditor.tsx`
- Create: `src/components/admin/block-editors/SpecsTableEditor.tsx`
- Create: `src/components/admin/block-editors/FAQEditor.tsx`
- Create: `src/components/admin/block-editors/GalleryEditor.tsx`
- Create: `src/components/admin/block-editors/TextSectionEditor.tsx`
- Create: `src/components/admin/block-editors/CTAEditor.tsx`
- Create: `src/components/admin/block-editors/UseCasesEditor.tsx`
- Create: `src/components/admin/block-editors/ProductTypesEditor.tsx`
- Create: `src/components/admin/block-editors/StatsStripEditor.tsx`
- Create: `src/components/admin/block-editors/TimelineEditor.tsx`
- Create: `src/components/admin/block-editors/ProcessStepsEditor.tsx`
- Create: `src/components/admin/block-editors/ContactInfoEditor.tsx`
- Create: `src/components/admin/block-editors/FormSectionEditor.tsx`
- Create: `src/components/admin/block-editors/MarqueeEditor.tsx`
- Create: `src/components/admin/block-editors/ProductGridEditor.tsx`
- Create: `src/components/admin/block-editors/ResourceCardsEditor.tsx`
- Create: `src/components/admin/block-editors/GuidesListEditor.tsx`
- Create: `src/components/admin/block-editors/RelatedPagesEditor.tsx`
- Create: `src/components/admin/block-editors/index.ts`

Each editor is a React component that receives `data` (typed to its block data interface) and `onChange` callback.

- [ ] **Step 1: Create HeroEditor**

```tsx
// src/components/admin/block-editors/HeroEditor.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ListEditor from "./ListEditor";
import { HeroData } from "@/lib/admin/page-config-types";

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  function update<K extends keyof HeroData>(key: K, value: HeroData[K]) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Badge Text (optional)</Label>
        <Input value={data.badge || ""} onChange={(e) => update("badge", e.target.value || undefined)} placeholder="e.g. Wholesale Only" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>H1</Label>
          <Input value={data.h1} onChange={(e) => update("h1", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>H1 Highlight (gold text)</Label>
          <Input value={data.h1Highlight || ""} onChange={(e) => update("h1Highlight", e.target.value || undefined)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Textarea value={data.subtitle} onChange={(e) => update("subtitle", e.target.value)} rows={3} />
      </div>
      <div className="space-y-2">
        <Label>Hero Image URL</Label>
        <Input value={data.image || ""} onChange={(e) => update("image", e.target.value || undefined)} placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <Label>CTA Buttons</Label>
        <ListEditor
          items={data.ctas}
          onChange={(ctas) => update("ctas", ctas)}
          createItem={() => ({ label: "", href: "/get-a-quote", variant: "primary" as const })}
          label="CTA"
          renderItem={(cta, _i, updateCta) => (
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Label</Label>
                <Input value={cta.label} onChange={(e) => updateCta({ ...cta, label: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Link</Label>
                <Input value={cta.href} onChange={(e) => updateCta({ ...cta, href: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Variant</Label>
                <Select value={cta.variant} onValueChange={(v) => updateCta({ ...cta, variant: v as "primary" | "secondary" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create remaining editors**

All editors follow the same pattern. Create each file in `src/components/admin/block-editors/`:

**FeaturesGridEditor.tsx** — heading input + ListEditor for items (icon select, title, description)
**SpecsTableEditor.tsx** — heading, description textarea, image URL, ListEditor for specs (label + value)
**FAQEditor.tsx** — heading input + ListEditor for items (question input + answer RichTextEditor)
**GalleryEditor.tsx** — heading input + ListEditor for images (src URL + alt text)
**TextSectionEditor.tsx** — heading, RichTextEditor for content, image URL, imagePosition select, background select
**CTAEditor.tsx** — heading, headingHighlight, description inputs
**UseCasesEditor.tsx** — heading, description, ListEditor for string items
**ProductTypesEditor.tsx** — heading + ListEditor for items (name, description, image URL, href)
**StatsStripEditor.tsx** — ListEditor for items (icon select, label, sublabel)
**TimelineEditor.tsx** — heading + ListEditor for entries (step number, title, text, image URL)
**ProcessStepsEditor.tsx** — heading + ListEditor for steps (step number, title, description, image URL)
**ContactInfoEditor.tsx** — heading + ListEditor for cards (icon, title, value, note, href, description)
**FormSectionEditor.tsx** — heading, description, formType select, sidebar config
**MarqueeEditor.tsx** — ListEditor for message strings
**ProductGridEditor.tsx** — heading, description + ListEditor for items (name, model, image, href)
**ResourceCardsEditor.tsx** — heading + ListEditor for items (icon, title, description, href)
**GuidesListEditor.tsx** — heading + ListEditor for items (title, description, readTime, href, image)
**RelatedPagesEditor.tsx** — heading + slug list with add/remove (similar to existing PageForm related slugs)

Each editor receives `{ data: DataType; onChange: (data: DataType) => void }` props.

- [ ] **Step 3: Create index barrel export**

```typescript
// src/components/admin/block-editors/index.ts
export { default as HeroEditor } from "./HeroEditor";
export { default as FeaturesGridEditor } from "./FeaturesGridEditor";
export { default as SpecsTableEditor } from "./SpecsTableEditor";
export { default as FAQEditor } from "./FAQEditor";
export { default as GalleryEditor } from "./GalleryEditor";
export { default as TextSectionEditor } from "./TextSectionEditor";
export { default as CTAEditor } from "./CTAEditor";
export { default as UseCasesEditor } from "./UseCasesEditor";
export { default as ProductTypesEditor } from "./ProductTypesEditor";
export { default as StatsStripEditor } from "./StatsStripEditor";
export { default as TimelineEditor } from "./TimelineEditor";
export { default as ProcessStepsEditor } from "./ProcessStepsEditor";
export { default as ContactInfoEditor } from "./ContactInfoEditor";
export { default as FormSectionEditor } from "./FormSectionEditor";
export { default as MarqueeEditor } from "./MarqueeEditor";
export { default as ProductGridEditor } from "./ProductGridEditor";
export { default as ResourceCardsEditor } from "./ResourceCardsEditor";
export { default as GuidesListEditor } from "./GuidesListEditor";
export { default as RelatedPagesEditor } from "./RelatedPagesEditor";
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

- [ ] **Step 5: Commit**

```bash
git add src/components/admin/block-editors/
git commit -m "feat(admin): add all 19 block type editor components"
```

---

### Task 10: BlockCard Component

**Files:**
- Create: `src/components/admin/BlockCard.tsx`

- [ ] **Step 1: Create the BlockCard component**

Collapsible card with visibility toggle, showing the appropriate block editor when expanded.

```tsx
// src/components/admin/BlockCard.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Block, BlockType, BlockDataMap } from "@/lib/admin/page-config-types";
import {
  HeroEditor, FeaturesGridEditor, SpecsTableEditor, FAQEditor,
  GalleryEditor, TextSectionEditor, CTAEditor, UseCasesEditor,
  ProductTypesEditor, StatsStripEditor, TimelineEditor, ProcessStepsEditor,
  ContactInfoEditor, FormSectionEditor, MarqueeEditor, ProductGridEditor,
  ResourceCardsEditor, GuidesListEditor, RelatedPagesEditor,
} from "./block-editors";

interface BlockCardProps {
  block: Block;
  onChange: (block: Block) => void;
}

const editorMap: Record<BlockType, React.ComponentType<{ data: any; onChange: (data: any) => void }>> = {
  hero: HeroEditor,
  features_grid: FeaturesGridEditor,
  product_types: ProductTypesEditor,
  specs_table: SpecsTableEditor,
  use_cases: UseCasesEditor,
  gallery: GalleryEditor,
  faq: FAQEditor,
  cta: CTAEditor,
  related_pages: RelatedPagesEditor,
  text_section: TextSectionEditor,
  stats_strip: StatsStripEditor,
  marquee: MarqueeEditor,
  timeline: TimelineEditor,
  contact_info: ContactInfoEditor,
  form_section: FormSectionEditor,
  process_steps: ProcessStepsEditor,
  product_grid: ProductGridEditor,
  resource_cards: ResourceCardsEditor,
  guides_list: GuidesListEditor,
};

export default function BlockCard({ block, onChange }: BlockCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Editor = editorMap[block.type];

  return (
    <div className={`border rounded-lg ${block.visible ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50 opacity-75"}`}>
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {/* Toggle */}
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${block.visible ? "bg-green-500" : "bg-gray-300"}`}
            onClick={(e) => {
              e.stopPropagation();
              onChange({ ...block, visible: !block.visible });
            }}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${block.visible ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className="font-medium text-sm text-gray-900">{block.label}</span>
          <span className="text-xs text-gray-400 font-mono">{block.type}</span>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </div>
      {expanded && Editor && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          <Editor
            data={block.data}
            onChange={(data) => onChange({ ...block, data })}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/BlockCard.tsx
git commit -m "feat(admin): add BlockCard component with visibility toggle and inline editing"
```

---

### Task 11: BlockEditor Page Component

**Files:**
- Create: `src/components/admin/BlockEditor.tsx`

- [ ] **Step 1: Create the BlockEditor component**

Full page editor that loads a PageConfig, shows SEO fields and all blocks.

```tsx
// src/components/admin/BlockEditor.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Save, ChevronDown, ChevronUp } from "lucide-react";
import BlockCard from "./BlockCard";
import { PageConfig, Block } from "@/lib/admin/page-config-types";

interface BlockEditorProps {
  config: PageConfig;
  apiBase: string; // e.g., "/api/admin/products" or "/api/admin/static-pages"
  backHref: string; // e.g., "/admin"
}

export default function BlockEditor({ config: initial, apiBase, backHref }: BlockEditorProps) {
  const router = useRouter();
  const [config, setConfig] = useState<PageConfig>(initial);
  const [seoOpen, setSeoOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateSeo(key: string, value: string | string[] | undefined) {
    setConfig((prev) => ({
      ...prev,
      seo: { ...prev.seo, [key]: value },
    }));
  }

  function updateBlock(index: number, block: Block) {
    const blocks = [...config.blocks];
    blocks[index] = block;
    setConfig((prev) => ({ ...prev, blocks }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const slug = config.slug.replace(/^\//, "").replace(/\//g, "--");
      const res = await fetch(`${apiBase}/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Saved successfully!" });
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Save failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
    setSaving(false);
  }

  // Build preview URL from slug
  const previewUrl = config.slug.startsWith("/") ? config.slug : `/${config.slug}`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push(backHref)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{config.label}</h2>
            <p className="text-sm text-gray-500 font-mono">{previewUrl}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Preview
          </a>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      {/* SEO Section (collapsible) */}
      <Card className="mb-6">
        <CardHeader className="cursor-pointer" onClick={() => setSeoOpen(!seoOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>SEO Settings</CardTitle>
            {seoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {seoOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input value={config.seo.title} onChange={(e) => updateSeo("title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea value={config.seo.metaDescription} onChange={(e) => updateSeo("metaDescription", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input value={config.seo.canonical || ""} onChange={(e) => updateSeo("canonical", e.target.value || undefined)} />
            </div>
            <div className="space-y-2">
              <Label>OG Image URL</Label>
              <Input value={config.seo.ogImage || ""} onChange={(e) => updateSeo("ogImage", e.target.value || undefined)} />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Blocks */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Content Blocks</h3>
        {config.blocks.map((block, index) => (
          <BlockCard
            key={block.id}
            block={block}
            onChange={(updated) => updateBlock(index, updated)}
          />
        ))}
      </div>

      {/* Bottom save */}
      <div className="mt-6 flex items-center gap-4">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/BlockEditor.tsx
git commit -m "feat(admin): add BlockEditor page component with SEO fields and block list"
```

---

### Task 12: Shared BlockRenderer for Public Pages

**Files:**
- Create: `src/components/BlockRenderer.tsx`

- [ ] **Step 1: Create the BlockRenderer component**

This component maps `block.type` to the correct presentation on the public side. Each refactored page imports this instead of duplicating block rendering logic. It renders the existing visual layout/styling for each block type, pulling content from `block.data`.

```tsx
// src/components/BlockRenderer.tsx
import { Block, BlockType } from "@/lib/admin/page-config-types";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedPages from "@/components/RelatedPages";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getIconComponent } from "@/lib/admin/icon-map";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface BlockRendererProps {
  block: Block;
  /** Extra props needed for specific block types (e.g., relatedArticles data) */
  extra?: Record<string, unknown>;
}

export default function BlockRenderer({ block, extra }: BlockRendererProps) {
  if (!block.visible) return null;

  switch (block.type) {
    case "cta":
      return (
        <CTASection
          heading={block.data.heading}
          highlight={block.data.headingHighlight}
          description={block.data.description}
        />
      );
    case "faq":
      return (
        <section className="px-6 sm:px-10 lg:px-16">
          <div className="container-max">
            <FAQAccordion faqs={block.data.items} />
          </div>
        </section>
      );
    case "related_pages":
      if (extra?.relatedArticles) {
        return <RelatedPages pages={extra.relatedArticles as any[]} heading={block.data.heading} />;
      }
      return null;
    // ... other block types render their existing JSX patterns
    // Each case preserves the exact styling from the original hard-coded pages
    default:
      return null;
  }
}
```

**Important:** The full implementation must cover all 19 block types. Each `case` reproduces the exact JSX/styling from the original page TSX files. The `features_grid` case uses `getIconComponent()` to resolve icon names. The `specs_table`, `use_cases`, `gallery`, `product_types`, `text_section`, `stats_strip`, `marquee`, `timeline`, `process_steps`, `contact_info`, `form_section`, `product_grid`, `resource_cards`, `guides_list`, and `hero` cases each reproduce their current visual layout.

Pages that need unique hero layouts (e.g., homepage with HeroSlider) can render hero blocks inline and use `BlockRenderer` for standard blocks.

- [ ] **Step 2: Commit**

```bash
git add src/components/BlockRenderer.tsx
git commit -m "feat: add shared BlockRenderer component for public page rendering"
```

---

### Task 13: Admin Dashboard — Tabbed Layout with Delete & Preview

**Files:**
- Modify: `src/app/(admin)/admin/page.tsx`

- [ ] **Step 1: Rewrite dashboard with three tabs**

Replace the current dashboard with a tabbed layout:
- Tab 1: Product Pages — fetches from `/api/admin/products`, click navigates to `/admin/products/[slug]`
- Tab 2: Landing Pages — existing functionality + delete button + preview link
- Tab 3: Static Pages — fetches from `/api/admin/static-pages`, click navigates to `/admin/static/[slug]`

Key changes:
- Add `Tabs, TabsList, TabsTrigger, TabsContent` from shadcn/ui
- Landing pages tab: add `Trash2` delete button per row (with confirm dialog) and `ExternalLink` preview link
- Product/static tabs: show label, route, block count, hidden block count
- Preserve existing search + hub filter for landing pages tab
- Add search for product and static tabs

- [ ] **Step 2: Verify it renders**

Run: `npm run dev` (manual check in browser at `/admin`)

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/page.tsx
git commit -m "feat(admin): add tabbed dashboard with product pages, landing pages (delete/preview), static pages"
```

---

### Task 14: Admin Routes — Product & Static Page Editors

**Files:**
- Create: `src/app/(admin)/admin/products/[slug]/page.tsx`
- Create: `src/app/(admin)/admin/static/[slug]/page.tsx`

- [ ] **Step 1: Create product page editor route**

```tsx
// src/app/(admin)/admin/products/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlockEditor from "@/components/admin/BlockEditor";
import { PageConfig } from "@/lib/admin/page-config-types";

export default function ProductPageEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/products/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setConfig)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-gray-500 p-8">Loading...</p>;
  if (error || !config) return <p className="text-red-500 p-8">Error: {error || "Config not found"}</p>;

  return <BlockEditor config={config} apiBase="/api/admin/products" backHref="/admin" />;
}
```

- [ ] **Step 2: Create static page editor route**

Same as above but using `/api/admin/static-pages/` endpoint.

```tsx
// src/app/(admin)/admin/static/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlockEditor from "@/components/admin/BlockEditor";
import { PageConfig } from "@/lib/admin/page-config-types";

export default function StaticPageEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/static-pages/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setConfig)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-gray-500 p-8">Loading...</p>;
  if (error || !config) return <p className="text-red-500 p-8">Error: {error || "Config not found"}</p>;

  return <BlockEditor config={config} apiBase="/api/admin/static-pages" backHref="/admin" />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/products/ src/app/(admin)/admin/static/
git commit -m "feat(admin): add product and static page editor routes"
```

---

### Task 15: Update Admin Sidebar Navigation

**Files:**
- Modify: `src/app/(admin)/admin/layout.tsx`

- [ ] **Step 1: Update nav items to include new sections**

In the `navItems` array, update to:

```typescript
const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages/new", label: "New Landing Page", icon: FilePlus },
];
```

Also update the `isActive` logic so `/admin/products/*` and `/admin/static/*` correctly highlight the Dashboard link.

- [ ] **Step 2: Commit**

```bash
git add src/app/(admin)/admin/layout.tsx
git commit -m "feat(admin): update sidebar navigation for new page types"
```

---

## Chunk 4: Content Migration — Product Pages

This is the largest chunk. For each product page:
1. Extract all hard-coded content from the TSX file into a PageConfig JSON file
2. Save JSON to `content/products/`
3. Refactor the TSX to read from JSON and conditionally render blocks

### Task 16: Create content/products/ directory and migrate Cabinet Signs

**Files:**
- Create: `content/products/cabinet-signs.json`
- Modify: `src/app/(public)/products/cabinet-signs/page.tsx`

- [ ] **Step 1: Create the JSON config by extracting content from cabinet-signs page.tsx**

Extract all hard-coded data (features array, cabinetTypes array, specs array, useCases array, hero text, CTA text) into a PageConfig JSON file. Reference the current page at `src/app/(public)/products/cabinet-signs/page.tsx` for exact content.

The JSON structure follows the PageConfig schema with blocks:
- `hero` block: badge, h1, h1Highlight, subtitle, image, ctas
- `product_types` block: heading + cabinetTypes items
- `features_grid` block: heading + features items (use Lucide icon name strings: "Eye", "Lightbulb", etc.)
- `specs_table` block: heading, description, image, specs array
- `use_cases` block: heading, description, useCases items
- `gallery` block: heading + image labels
- `related_pages` block: heading + empty slugs (populated dynamically)
- `cta` block: heading, headingHighlight, description

All blocks have `visible: true`.

- [ ] **Step 2: Refactor cabinet-signs page.tsx to read from JSON**

Replace hard-coded arrays with data from JSON config. Pattern:
1. Import and load config: `import configData from "@/../../content/products/cabinet-signs.json"`
2. Cast to PageConfig type
3. Create helper: `const getBlock = (id: string) => config.blocks.find(b => b.id === id)`
4. Wrap each section in `{getBlock("hero")?.visible && ( ... )}`
5. Pull content from `block.data` instead of hard-coded constants
6. Keep JSON-LD and Metadata export hard-coded (as per spec)
7. Keep all styling/layout exactly the same

- [ ] **Step 3: Verify the page still renders correctly**

Run: `npm run dev` (manual check in browser at `/products/cabinet-signs`)

- [ ] **Step 4: Commit**

```bash
git add content/products/cabinet-signs.json src/app/(public)/products/cabinet-signs/page.tsx
git commit -m "feat: migrate cabinet-signs page to JSON config"
```

---

### Task 17: Migrate Remaining Product Pages

Follow the exact same pattern as Task 16 for each product page. Do them in batches:

**Batch A — Main product hub pages (similar block structure to cabinet-signs):**

- [ ] **Step 1: Migrate blade-signs**
  - Create: `content/products/blade-signs.json`
  - Modify: `src/app/(public)/products/blade-signs/page.tsx`

- [ ] **Step 2: Migrate flat-cut-letters**
  - Create: `content/products/flat-cut-letters.json`
  - Modify: `src/app/(public)/products/flat-cut-letters/page.tsx`

- [ ] **Step 3: Migrate lightboxes**
  - Create: `content/products/lightboxes.json`
  - Modify: `src/app/(public)/products/lightboxes/page.tsx`

- [ ] **Step 4: Migrate seg-light-boxes**
  - Create: `content/products/seg-light-boxes.json`
  - Modify: `src/app/(public)/products/seg-light-boxes/page.tsx`

- [ ] **Step 5: Migrate logo-boxes**
  - Create: `content/products/logo-boxes.json`
  - Modify: `src/app/(public)/products/logo-boxes/page.tsx`

- [ ] **Step 6: Migrate push-through-signs**
  - Create: `content/products/push-through-signs.json`
  - Modify: `src/app/(public)/products/push-through-signs/page.tsx`

- [ ] **Step 7: Migrate custom-fabrication**
  - Create: `content/products/custom-fabrication.json`
  - Modify: `src/app/(public)/products/custom-fabrication/page.tsx`

- [ ] **Step 8: Commit batch A**

```bash
git add content/products/ src/app/(public)/products/
git commit -m "feat: migrate 7 product hub pages to JSON configs"
```

**Batch B — Channel letters hub + 12 variants:**

- [ ] **Step 9: Migrate channel-letters hub**
  - Create: `content/products/channel-letters.json`
  - Modify: `src/app/(public)/products/channel-letters/page.tsx`

- [ ] **Step 10: Migrate all 12 channel letter variant pages**

Each variant page at `src/app/(public)/products/channel-letters/[variant]/page.tsx`:
  - front-lit, halo-lit, front-and-halo-lit, side-lit, back-side-lit, front-side-lit
  - faux-neon, conical, trimless, stainless-standoff, stainless-flush, non-illuminated

Create corresponding JSON files: `content/products/channel-letters--[variant].json`

- [ ] **Step 11: Migrate products index page**
  - Create: `content/products/products.json`
  - Modify: `src/app/(public)/products/page.tsx`

- [ ] **Step 12: Verify all product pages render**

Run: `npm run build 2>&1 | tail -30`
Expected: Build succeeds

- [ ] **Step 13: Commit batch B**

```bash
git add content/products/ src/app/(public)/products/
git commit -m "feat: migrate channel letters hub, 12 variants, and products index to JSON configs"
```

---

## Chunk 5: Content Migration — Static Pages

### Task 18: Migrate Static Pages — Batch A (Main pages)

- [ ] **Step 1: Migrate home page**
  - Create: `content/pages/home.json`
  - Modify: `src/app/(public)/page.tsx` (homepage)

- [ ] **Step 2: Migrate about page**
  - Create: `content/pages/about.json`
  - Modify: `src/app/(public)/about/page.tsx`

- [ ] **Step 3: Migrate contact page**
  - Create: `content/pages/contact.json`
  - Modify: `src/app/(public)/contact/page.tsx`

- [ ] **Step 4: Migrate gallery page**
  - Create: `content/pages/gallery.json`
  - Modify: `src/app/(public)/gallery/page.tsx`

- [ ] **Step 5: Migrate get-a-quote page**
  - Create: `content/pages/get-a-quote.json`
  - Modify: `src/app/(public)/get-a-quote/page.tsx`

- [ ] **Step 6: Migrate services page**
  - Create: `content/pages/services.json`
  - Modify: `src/app/(public)/services/page.tsx`

- [ ] **Step 7: Commit batch A**

```bash
git add content/pages/ src/app/(public)/
git commit -m "feat: migrate 6 main static pages to JSON configs"
```

### Task 19: Migrate Static Pages — Batch B (Why Sunlite + Resources)

- [ ] **Step 1: Migrate why-sunlite pages (5 pages)**
  - Create: `content/pages/why-sunlite.json`, `why-sunlite--german-engineering.json`, `why-sunlite--quality-process.json`, `why-sunlite--ul-listing.json`, `why-sunlite--wholesale-only.json`
  - Modify corresponding TSX files

- [ ] **Step 2: Migrate resources pages (9 pages)**
  - Create: `content/pages/resources.json`, `resources--guides.json`, `resources--faq.json`, `resources--glossary.json`, `resources--blog.json`
  - Create: `content/pages/resources--guides--channel-letter-buying-guide.json`, etc. (4 guide pages)
  - Modify corresponding TSX files

**Note:** The `resources/blog/[slug]` dynamic route is excluded from migration — it renders individual blog posts from inline data and does not map to a single JSON config. The blog index page (`resources--blog.json`) IS included.

- [ ] **Step 3: Verify all static pages render**

Run: `npm run build 2>&1 | tail -30`
Expected: Build succeeds

- [ ] **Step 4: Commit batch B**

```bash
git add content/pages/ src/app/(public)/
git commit -m "feat: migrate why-sunlite and resources pages to JSON configs"
```

---

## Chunk 6: Final Integration & Verification

### Task 20: Verify Full Build

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build completes successfully with no errors

- [ ] **Step 2: Verify admin panel functionality**

Manual testing checklist:
- [ ] Dashboard loads with 3 tabs (Product Pages, Landing Pages, Static Pages)
- [ ] Product pages tab shows all 28 pages
- [ ] Static pages tab shows all 20 pages
- [ ] Landing pages tab shows all 120 pages with delete + preview
- [ ] Clicking a product page opens block editor
- [ ] Block visibility toggles work
- [ ] Editing block content and saving works
- [ ] Preview link opens correct public page
- [ ] Deleting a landing page works (with confirmation)

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: address integration issues from full build verification"
```

### Task 21: Update Project Memory

- [ ] **Step 1: Update project status memory**

Update `C:\Users\ozany\.claude\projects\C--SLS-sunlite-wholesale\memory\project_status.md` to reflect the completed universal page management system.
