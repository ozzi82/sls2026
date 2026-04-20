# Rich Text Editor Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace basic TipTap editor with a full-featured WordPress-style rich text editor used across all admin CMS text fields, with text colors, effects, font sizes, and a raw HTML source toggle.

**Architecture:** Upgrade existing RichTextEditor.tsx with new TipTap extensions (color, underline, text-align, highlight, image) plus custom extensions (font-size, text-shadow, gradient-text, css-class). Add a compact variant for short fields. Replace ~50 text Input/Textarea fields across 19 block editors with the new editor. Add `react-colorful` for color picking.

**Tech Stack:** TipTap, react-colorful, custom TipTap extensions, DOMPurify for HTML sanitization

**Spec:** `docs/superpowers/specs/2026-04-20-rich-text-editor-design.md`

---

## File Structure

### New files to create:
- `src/lib/tiptap/font-size.ts` — Custom TipTap extension for font-size inline style
- `src/lib/tiptap/text-shadow.ts` — Custom TipTap extension for text-shadow inline style
- `src/lib/tiptap/gradient-text.ts` — Custom TipTap extension for gradient text effect
- `src/lib/tiptap/css-class.ts` — Custom TipTap mark extension for arbitrary CSS classes
- `src/components/admin/ColorPickerButton.tsx` — Reusable color picker popover using react-colorful

### Files to modify:
- `src/components/admin/RichTextEditor.tsx` — Major rewrite: add all new extensions, toolbar rows, compact/full variants, source mode toggle
- `src/components/admin/block-editors/HeroEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/CTAEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/FAQEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/FeaturesGridEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/FormSectionEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/GalleryEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/GuidesListEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/MarqueeEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/ProcessStepsEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/ProductGridEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/ProductTypesEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/RelatedPagesEditor.tsx` — Replace heading input
- `src/components/admin/block-editors/ResourceCardsEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/SpecsTableEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/StatsStripEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/TextSectionEditor.tsx` — Replace heading input (content already uses RichTextEditor)
- `src/components/admin/block-editors/TimelineEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/UseCasesEditor.tsx` — Replace text inputs
- `src/components/admin/block-editors/ContactInfoEditor.tsx` — Replace text inputs
- `src/components/admin/PageForm.tsx` — Replace text inputs in landing page editor

---

## Chunk 1: Dependencies + Custom TipTap Extensions

### Task 1: Install npm dependencies

**Files:** `package.json`

- [ ] **Step 1: Install TipTap extensions and react-colorful**

```bash
cd /c/SLS/sunlite-wholesale && npm install @tiptap/extension-underline @tiptap/extension-text-style @tiptap/extension-color @tiptap/extension-highlight @tiptap/extension-text-align @tiptap/extension-image react-colorful dompurify && npm install -D @types/dompurify
```

- [ ] **Step 2: Verify install**

Run: `npx tsc --noEmit 2>&1 | head -5`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(editor): install TipTap extensions, react-colorful, and DOMPurify"
```

---

### Task 2: Create FontSize custom extension

**Files:**
- Create: `src/lib/tiptap/font-size.ts`

- [ ] **Step 1: Create the extension**

```typescript
// src/lib/tiptap/font-size.ts
import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return { types: ["textStyle"] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tiptap/font-size.ts
git commit -m "feat(editor): add custom FontSize TipTap extension"
```

---

### Task 3: Create TextShadow custom extension

**Files:**
- Create: `src/lib/tiptap/text-shadow.ts`

- [ ] **Step 1: Create the extension**

```typescript
// src/lib/tiptap/text-shadow.ts
import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textShadow: {
      setTextShadow: (value: string) => ReturnType;
      unsetTextShadow: () => ReturnType;
    };
  }
}

export const TextShadow = Extension.create({
  name: "textShadow",

  addOptions() {
    return { types: ["textStyle"] };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textShadow: {
            default: null,
            parseHTML: (element) => element.style.textShadow || null,
            renderHTML: (attributes) => {
              if (!attributes.textShadow) return {};
              return { style: `text-shadow: ${attributes.textShadow}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextShadow:
        (value: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { textShadow: value }).run(),
      unsetTextShadow:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { textShadow: null }).removeEmptyTextStyle().run(),
    };
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tiptap/text-shadow.ts
git commit -m "feat(editor): add custom TextShadow TipTap extension"
```

---

### Task 4: Create GradientText custom extension

**Files:**
- Create: `src/lib/tiptap/gradient-text.ts`

- [ ] **Step 1: Create the extension**

This applies `background: linear-gradient(...); -webkit-background-clip: text; -webkit-text-fill-color: transparent` as inline styles.

```typescript
// src/lib/tiptap/gradient-text.ts
import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    gradientText: {
      setGradient: (from: string, to: string) => ReturnType;
      unsetGradient: () => ReturnType;
    };
  }
}

export const GradientText = Mark.create({
  name: "gradientText",

  addOptions() {
    return { HTMLAttributes: {} };
  },

  addAttributes() {
    return {
      from: { default: null },
      to: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-gradient]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { from, to } = HTMLAttributes;
    if (!from || !to) return ["span", {}, 0];
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, {
        "data-gradient": "true",
        style: `background: linear-gradient(90deg, ${from}, ${to}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setGradient:
        (from: string, to: string) =>
        ({ chain }) =>
          chain().setMark(this.name, { from, to }).run(),
      unsetGradient:
        () =>
        ({ chain }) =>
          chain().unsetMark(this.name).run(),
    };
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tiptap/gradient-text.ts
git commit -m "feat(editor): add custom GradientText TipTap extension"
```

---

### Task 5: Create CssClass custom extension

**Files:**
- Create: `src/lib/tiptap/css-class.ts`

- [ ] **Step 1: Create the extension**

```typescript
// src/lib/tiptap/css-class.ts
import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    cssClass: {
      setCssClass: (className: string) => ReturnType;
      unsetCssClass: () => ReturnType;
    };
  }
}

export const CssClass = Mark.create({
  name: "cssClass",

  addOptions() {
    return { HTMLAttributes: {} };
  },

  addAttributes() {
    return {
      class: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-css-class]" }];
  },

  renderHTML({ HTMLAttributes }) {
    if (!HTMLAttributes.class) return ["span", {}, 0];
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, {
        "data-css-class": "true",
        class: HTMLAttributes.class,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCssClass:
        (className: string) =>
        ({ chain }) =>
          chain().setMark(this.name, { class: className }).run(),
      unsetCssClass:
        () =>
        ({ chain }) =>
          chain().unsetMark(this.name).run(),
    };
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tiptap/css-class.ts
git commit -m "feat(editor): add custom CssClass TipTap mark extension"
```

---

### Task 6: Create ColorPickerButton component

**Files:**
- Create: `src/components/admin/ColorPickerButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerButtonProps {
  color: string;
  onChange: (color: string) => void;
  title: string;
}

export default function ColorPickerButton({ color, onChange, title }: ColorPickerButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title={title}
        onClick={() => setOpen(!open)}
        className="h-8 w-8 rounded border border-gray-300 flex items-center justify-center hover:border-gray-400"
      >
        <div
          className="h-5 w-5 rounded-sm border border-gray-200"
          style={{ backgroundColor: color || "#000000" }}
        />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <HexColorPicker color={color || "#000000"} onChange={onChange} />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">#</span>
            <HexColorInput
              color={color || "#000000"}
              onChange={onChange}
              className="w-full text-xs border border-gray-200 rounded px-2 py-1"
            />
          </div>
          <button
            type="button"
            onClick={() => { onChange(""); setOpen(false); }}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 w-full text-center"
          >
            Remove color
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/ColorPickerButton.tsx
git commit -m "feat(editor): add ColorPickerButton component with react-colorful"
```

---

## Chunk 2: Rewrite RichTextEditor

### Task 7: Rewrite RichTextEditor.tsx with all features

**Files:**
- Modify: `src/components/admin/RichTextEditor.tsx`

- [ ] **Step 1: Complete rewrite of RichTextEditor**

Replace the entire file. The new editor has:

1. **Props:** `content`, `onChange`, `variant` ("compact" | "full", default "full"), `placeholder`
2. **TipTap extensions:** StarterKit (bold, italic, strike, headings H1-H4, lists, history), Link, Underline, TextStyle, Color, Highlight, TextAlign, Image, plus custom FontSize, TextShadow, GradientText, CssClass
3. **Toolbar Row 1 (always visible):** Bold, Italic, Underline, Strikethrough, heading dropdown (Paragraph/H1-H4), font size input, alignment buttons (L/C/R)
4. **Toolbar Row 2 (full only, or behind "..." in compact):** Text color (ColorPickerButton), highlight color (ColorPickerButton), text shadow dropdown (None/Subtle/Medium/Strong/Custom), gradient dropdown (None/Gold/Sunset/Custom with two color pickers)
5. **Toolbar Row 3 (full only, or behind "..." in compact):** Bullet list, ordered list, link/unlink, image (uses `window.prompt` for URL for now), CSS class input, Source toggle (`</>`), undo/redo
6. **Compact variant:** Single row with Bold, Italic, Underline, text color, font size, Source toggle. "..." button expands to show full toolbar.
7. **Source mode:** Toggle between TipTap `EditorContent` and a `<textarea>` showing raw HTML. Syncs content on toggle.
8. **Editor area:** `min-h-[40px]` for compact, `min-h-[200px]` for full

Key implementation details:
- Import all TipTap extensions and custom extensions
- Import `ColorPickerButton`
- State: `sourceMode` (boolean), `expanded` (boolean, for compact variant toolbar expansion)
- Source mode textarea: monospace font, dark bg (`bg-gray-900 text-green-400`), syncs HTML to editor on toggle back
- Heading dropdown: use a `<select>` element with options P/H1/H2/H3/H4
- Font size: small `<input>` with placeholder "px", on blur applies `setFontSize`
- Text shadow dropdown: `<select>` with None/Subtle/Medium/Strong/Custom
- Gradient: `<select>` with None/Gold/Sunset/Custom; Gold = `#f59e0b` to `#fbbf24`; Sunset = `#f97316` to `#ec4899`; Custom shows two color pickers
- CSS class: small text `<input>`, on Enter applies `setCssClass`
- Image: `window.prompt("Image URL")` then `editor.chain().focus().setImage({ src: url }).run()`
- ToolbarButton stays the same reusable component
- The toolbar divides into groups with `<div className="w-px h-6 bg-gray-200" />` separators

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`

- [ ] **Step 3: Build test**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/RichTextEditor.tsx
git commit -m "feat(editor): rewrite RichTextEditor with colors, effects, source mode, compact/full variants"
```

---

## Chunk 3: Replace Text Fields in Block Editors

### Task 8: Update HeroEditor, CTAEditor, FAQEditor

**Files:**
- Modify: `src/components/admin/block-editors/HeroEditor.tsx`
- Modify: `src/components/admin/block-editors/CTAEditor.tsx`
- Modify: `src/components/admin/block-editors/FAQEditor.tsx`

- [ ] **Step 1: Update HeroEditor**

Read `src/components/admin/block-editors/HeroEditor.tsx`. Replace:
- `badge` Input → `<RichTextEditor variant="compact" content={data.badge || ""} onChange={(html) => onChange({ ...data, badge: html })} />`
- `h1` Input → same pattern, compact
- `h1Highlight` Input → same pattern, compact
- `subtitle` Textarea → `<RichTextEditor variant="full" ...>`
- CTA `label` Input → compact

Add import: `import RichTextEditor from "../RichTextEditor";`
Remove `Input`/`Textarea` imports if no longer used.

- [ ] **Step 2: Update CTAEditor**

Read `src/components/admin/block-editors/CTAEditor.tsx`. Replace:
- `heading` Input → compact
- `headingHighlight` Input → compact
- `description` Textarea → full

- [ ] **Step 3: Update FAQEditor**

Read `src/components/admin/block-editors/FAQEditor.tsx`. Replace:
- `heading` Input → compact
- `question` Input → compact
- `answer` Textarea → full

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit 2>&1 | head -10
git add src/components/admin/block-editors/HeroEditor.tsx src/components/admin/block-editors/CTAEditor.tsx src/components/admin/block-editors/FAQEditor.tsx
git commit -m "feat(editor): replace text inputs with RichTextEditor in Hero, CTA, FAQ editors"
```

---

### Task 9: Update FeaturesGrid, FormSection, Gallery, GuidesList editors

**Files:**
- Modify: `src/components/admin/block-editors/FeaturesGridEditor.tsx`
- Modify: `src/components/admin/block-editors/FormSectionEditor.tsx`
- Modify: `src/components/admin/block-editors/GalleryEditor.tsx`
- Modify: `src/components/admin/block-editors/GuidesListEditor.tsx`

- [ ] **Step 1: Update each editor**

Same pattern as Task 8. For each file:
1. Import RichTextEditor
2. Replace text Input/Textarea with `<RichTextEditor variant="compact">` or `variant="full">`
3. Do NOT replace URL/href, number, image, select fields

**FeaturesGridEditor:** heading → compact, item title → compact, item description → full
**FormSectionEditor:** heading → compact, description → full, notices → full, ctaText → compact
**GalleryEditor:** heading → compact, sign type → compact, alt text → full
**GuidesListEditor:** heading → compact, title → compact, description → full

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit 2>&1 | head -10
git add src/components/admin/block-editors/FeaturesGridEditor.tsx src/components/admin/block-editors/FormSectionEditor.tsx src/components/admin/block-editors/GalleryEditor.tsx src/components/admin/block-editors/GuidesListEditor.tsx
git commit -m "feat(editor): replace text inputs in FeaturesGrid, FormSection, Gallery, GuidesList editors"
```

---

### Task 10: Update Marquee, ProcessSteps, ProductGrid, ProductTypes, RelatedPages editors

**Files:**
- Modify: `src/components/admin/block-editors/MarqueeEditor.tsx`
- Modify: `src/components/admin/block-editors/ProcessStepsEditor.tsx`
- Modify: `src/components/admin/block-editors/ProductGridEditor.tsx`
- Modify: `src/components/admin/block-editors/ProductTypesEditor.tsx`
- Modify: `src/components/admin/block-editors/RelatedPagesEditor.tsx`

- [ ] **Step 1: Update each editor**

**MarqueeEditor:** message items → compact
**ProcessStepsEditor:** heading → compact, title → compact, description → full (keep step number as Input)
**ProductGridEditor:** heading → compact, description → full, product name → compact (keep model and href as Input)
**ProductTypesEditor:** heading → compact, name → compact, description → full (keep href as Input)
**RelatedPagesEditor:** heading → compact (keep slug input as Input)

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit 2>&1 | head -10
git add src/components/admin/block-editors/MarqueeEditor.tsx src/components/admin/block-editors/ProcessStepsEditor.tsx src/components/admin/block-editors/ProductGridEditor.tsx src/components/admin/block-editors/ProductTypesEditor.tsx src/components/admin/block-editors/RelatedPagesEditor.tsx
git commit -m "feat(editor): replace text inputs in Marquee, ProcessSteps, ProductGrid, ProductTypes, RelatedPages editors"
```

---

### Task 11: Update ResourceCards, SpecsTable, StatsStrip, TextSection, Timeline, UseCases, ContactInfo editors

**Files:**
- Modify: `src/components/admin/block-editors/ResourceCardsEditor.tsx`
- Modify: `src/components/admin/block-editors/SpecsTableEditor.tsx`
- Modify: `src/components/admin/block-editors/StatsStripEditor.tsx`
- Modify: `src/components/admin/block-editors/TextSectionEditor.tsx`
- Modify: `src/components/admin/block-editors/TimelineEditor.tsx`
- Modify: `src/components/admin/block-editors/UseCasesEditor.tsx`
- Modify: `src/components/admin/block-editors/ContactInfoEditor.tsx`

- [ ] **Step 1: Update each editor**

**ResourceCardsEditor:** heading → compact, title → compact, description → full (keep href as Input)
**SpecsTableEditor:** heading → compact, description → full, spec label → compact (keep spec value as Input)
**StatsStripEditor:** label → compact, sublabel → compact
**TextSectionEditor:** heading → compact (content already uses RichTextEditor — keep as is)
**TimelineEditor:** heading → compact, title → compact, text → full (keep step number as Input)
**UseCasesEditor:** heading → compact, description → full, use case items → full
**ContactInfoEditor:** heading → compact, card title → compact, card note → compact, card description → full (keep href and value as Input)

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit 2>&1 | head -10
git add src/components/admin/block-editors/ResourceCardsEditor.tsx src/components/admin/block-editors/SpecsTableEditor.tsx src/components/admin/block-editors/StatsStripEditor.tsx src/components/admin/block-editors/TextSectionEditor.tsx src/components/admin/block-editors/TimelineEditor.tsx src/components/admin/block-editors/UseCasesEditor.tsx src/components/admin/block-editors/ContactInfoEditor.tsx
git commit -m "feat(editor): replace text inputs in remaining 7 block editors"
```

---

### Task 12: Update PageForm for landing pages

**Files:**
- Modify: `src/components/admin/PageForm.tsx`

- [ ] **Step 1: Update PageForm**

Read `src/components/admin/PageForm.tsx`. Replace:
- `h1` Input → compact
- `h1Highlight` Input → compact
- `heroSubtitle` Textarea → full
- SEO `title` Input → **keep as plain Input** (SEO needs plain text)
- SEO `metaDescription` Textarea → **keep as plain Textarea** (SEO needs plain text)
- Section `heading` Input → compact
- Section `content` → already uses RichTextEditor, keep as is
- FAQ `question` Input → compact
- FAQ `answer` Textarea → full

- [ ] **Step 2: Verify and commit**

```bash
npx tsc --noEmit 2>&1 | head -10
git add src/components/admin/PageForm.tsx
git commit -m "feat(editor): replace text inputs in PageForm landing page editor"
```

---

## Chunk 4: Public Site HTML Rendering + Final Verification

### Task 13: Add HTML sanitization utility

**Files:**
- Create: `src/lib/sanitize-html.ts`

- [ ] **Step 1: Create sanitization utility**

```typescript
// src/lib/sanitize-html.ts
import DOMPurify from "dompurify";

// Only runs on server — DOMPurify needs a DOM
let purify: ReturnType<typeof DOMPurify> | null = null;

function getPurify() {
  if (typeof window !== "undefined") {
    // Client-side
    return DOMPurify;
  }
  // Server-side — use jsdom
  if (!purify) {
    const { JSDOM } = require("jsdom");
    const window = new JSDOM("").window;
    purify = DOMPurify(window as any);
  }
  return purify;
}

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  // If it's plain text (no HTML tags), return as-is
  if (!/<[^>]+>/.test(dirty)) return dirty;
  const clean = getPurify().sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "del",
      "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "a", "span", "div", "img",
      "blockquote", "code", "pre",
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "class", "style", "src", "alt",
      "data-gradient", "data-css-class",
    ],
  });
  return clean;
}
```

Note: This also needs `jsdom` as a dev dependency for server-side usage. If DOMPurify doesn't work well server-side, a simpler approach is to just use `isomorphic-dompurify` which handles the SSR case.

Actually, simpler approach — use `isomorphic-dompurify`:

```bash
npm install isomorphic-dompurify
```

Then:
```typescript
// src/lib/sanitize-html.ts
import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  if (!/<[^>]+>/.test(dirty)) return dirty;
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "del",
      "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "a", "span", "div", "img",
      "blockquote", "code", "pre",
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "class", "style", "src", "alt",
      "data-gradient", "data-css-class",
    ],
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/sanitize-html.ts package.json package-lock.json
git commit -m "feat(editor): add HTML sanitization utility with isomorphic-dompurify"
```

---

### Task 14: Update public page rendering for rich HTML

**Files:**
- Modify: Public page components that render block data text fields as plain text

- [ ] **Step 1: Create a SafeHtml helper component**

Create a reusable component for rendering sanitized HTML:

```tsx
// src/components/SafeHtml.tsx
import { sanitizeHtml } from "@/lib/sanitize-html";

interface SafeHtmlProps {
  html: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function SafeHtml({ html, as: Tag = "span", className }: SafeHtmlProps) {
  if (!html) return null;
  // If no HTML tags, render as plain text
  if (!/<[^>]+>/.test(html)) {
    return <Tag className={className}>{html}</Tag>;
  }
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
}
```

- [ ] **Step 2: Gradually update public page components**

For each public page that renders block data as `{block.data.title}` or similar, replace with `<SafeHtml html={block.data.title} />` where the field will now contain rich HTML.

This is a large mechanical change across many page files. Apply the same pattern:
- Where data is rendered as `{data.title}` (plain text), wrap with `<SafeHtml html={data.title} />`
- Where data is already rendered as `dangerouslySetInnerHTML`, keep as-is but add sanitization

**Important:** Only apply to fields that were converted to rich text editors. Fields like URLs, slugs, numbers should remain as plain text rendering.

- [ ] **Step 3: Commit**

```bash
git add src/components/SafeHtml.tsx src/lib/sanitize-html.ts src/app/
git commit -m "feat(editor): add SafeHtml component and update public pages for rich HTML rendering"
```

---

### Task 15: Final verification and build test

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`

- [ ] **Step 2: Build test**

Run: `npx next build`

- [ ] **Step 3: Manual testing checklist**

Test in dev mode (`npm run dev`):
- Admin: Open any page editor → all text fields show rich editor toolbar
- Admin: Compact fields show single row toolbar with "..." expand
- Admin: Full fields show all 3 toolbar rows
- Admin: Click text color → color picker opens → select color → text changes color
- Admin: Click highlight → background color picker works
- Admin: Select heading from dropdown → text becomes heading
- Admin: Enter font size → text size changes
- Admin: Select text shadow → shadow applied
- Admin: Select gradient → gradient applied
- Admin: Enter CSS class → class applied
- Admin: Click Source toggle → raw HTML appears → edit → toggle back → visual updates
- Admin: Save → content persists
- Public site: Styled text renders correctly (colors, sizes, effects visible)
- Public site: No XSS possible (try injecting `<script>` in source mode)

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "feat(editor): final fixes from verification"
```

- [ ] **Step 5: Push to remote**

```bash
git push sls2026 main
```
