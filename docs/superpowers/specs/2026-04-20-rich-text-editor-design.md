# Rich Text Editor Upgrade

## Overview

Replace the current basic TipTap RichTextEditor with a full-featured WordPress-style editor. Use it across ALL text fields in the admin CMS — from short button labels to long content sections. Outputs inline styles for visual formatting, with a raw HTML source toggle for power users.

## Current State

The existing `RichTextEditor.tsx` uses TipTap with:
- StarterKit (bold, italic, headings H3/H4, lists)
- Link extension
- Basic toolbar with icon buttons
- Only used in `TextSectionEditor` and `PageForm`

All other block editors use plain `<Input>` and `<Textarea>` for text fields.

## Editor Features

### Toolbar (fixed, always visible)

**Row 1 — Text formatting:**
- Bold, Italic, Underline, Strikethrough
- Heading dropdown (H1, H2, H3, H4, Paragraph)
- Font size input (accepts px values, e.g., "14px", "24px")
- Text alignment (Left, Center, Right)

**Row 2 — Colors & Effects:**
- Text color — color picker button showing current color, click opens `react-colorful` hex picker with hex input field
- Background/highlight color — same picker pattern
- Text shadow — dropdown with presets: None, Subtle (`1px 1px 2px rgba(0,0,0,0.3)`), Medium (`2px 2px 4px rgba(0,0,0,0.5)`), Strong (`3px 3px 6px rgba(0,0,0,0.7)`), Custom (input for CSS text-shadow value)
- Gradient text — dropdown with presets: None, Gold gradient, Sunset gradient, Custom (two-color picker for from/to colors)
- CSS class input — small text input to add arbitrary class names to selected text

**Row 3 — Insert & Tools:**
- Bullet list, Ordered list
- Link (insert/edit), Unlink
- Image (opens media library picker)
- Source toggle — switches between visual editor and raw HTML textarea
- Undo, Redo

### Compact Variant

For short text fields (button labels, badge text, single-line items), the editor renders in compact mode:

- Single toolbar row with most-used buttons only: Bold, Italic, Underline, Text color, Font size, Source toggle
- Editor area min-height ~40px, single line appearance
- Full toolbar available via a "..." expand button

### Full Variant

For content fields (descriptions, rich text sections):

- All 3 toolbar rows visible
- Editor area min-height ~200px
- Everything visible at a glance

### Source Mode

Toggle between visual TipTap editor and a raw HTML `<textarea>`:
- Button labeled `</>` in toolbar
- When active, shows raw HTML with syntax-appropriate styling (monospace font, dark background)
- Edits in source mode update the visual editor when toggling back
- Preserves cursor position where possible

## Component Interface

```typescript
interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  variant?: "compact" | "full"; // default: "full"
  placeholder?: string;
}
```

## TipTap Extensions Needed

**Existing (keep):**
- `StarterKit` (bold, italic, strike, headings, lists, history)
- `@tiptap/extension-link`

**New official extensions to install:**
- `@tiptap/extension-underline` — underline formatting
- `@tiptap/extension-text-style` — base for color/font-size (required by Color)
- `@tiptap/extension-color` — text color via inline style
- `@tiptap/extension-highlight` — background/highlight color
- `@tiptap/extension-text-align` — text alignment
- `@tiptap/extension-image` — inline images

**Custom extensions to create:**
- `FontSize` — sets `font-size` inline style on text (TipTap TextStyle-based)
- `TextShadow` — sets `text-shadow` inline style via a mark
- `GradientText` — applies `background: linear-gradient(...); -webkit-background-clip: text; -webkit-text-fill-color: transparent` via inline style
- `CssClass` — adds arbitrary CSS classes to selected text via a mark

## Color Picker

Use `react-colorful` (3KB, no dependencies):
- Renders a small color square button showing current color
- Click opens a popover with the hex color picker + hex input field
- Clicking outside closes the popover
- Wrap in a reusable `ColorPickerButton` component

## Where to Replace Fields

### Block Editors (19 types)

For each block editor, replace text `<Input>` and `<Textarea>` fields with `<RichTextEditor variant="compact">` or `<RichTextEditor variant="full">`:

**Compact variant (short fields):**
- HeroEditor: badge, h1, h1Highlight, subtitle, CTA labels
- CTAEditor: badge, heading, subheading, buttonLabel
- StatsStripEditor: stat labels, stat values
- MarqueeEditor: message items
- FeaturesGridEditor: item titles
- ProductTypesEditor: type names
- UseCasesEditor: use case titles
- TimelineEditor: step titles
- ProcessStepsEditor: step titles
- ProductGridEditor: product names
- ResourceCardsEditor: card titles
- GuidesListEditor: guide titles
- RelatedPagesEditor: page titles
- ContactInfoEditor: field labels

**Full variant (content fields):**
- TextSectionEditor: content (already uses RichTextEditor)
- HeroEditor: long descriptions (if any)
- FeaturesGridEditor: item descriptions
- FAQEditor: answers
- UseCasesEditor: descriptions
- TimelineEditor: step descriptions
- ProcessStepsEditor: step descriptions
- ContactInfoEditor: content blocks

**Do NOT replace:**
- URL/href fields (keep as plain Input)
- Image path fields (keep as ImageUpload)
- Numeric fields (keep as Input type=number)
- Select/dropdown fields
- Toggle/checkbox fields
- Slug fields

### SEO Fields (BlockEditor.tsx)

Keep SEO title and meta description as plain inputs — these should be plain text for SEO purposes, not rich HTML.

### PageForm (Landing Pages)

Replace content fields (hero subtitle, section content) with `<RichTextEditor variant="full">`. Keep slug, hub, schema type fields as plain inputs.

## File Structure

### Modified files:
- `src/components/admin/RichTextEditor.tsx` — Major rewrite with all new features
- All 19 block editors in `src/components/admin/block-editors/` — Replace text inputs
- `src/components/admin/PageForm.tsx` — Replace content fields

### New files:
- `src/components/admin/ColorPickerButton.tsx` — Reusable color picker popover
- `src/lib/tiptap/font-size.ts` — Custom FontSize extension
- `src/lib/tiptap/text-shadow.ts` — Custom TextShadow extension
- `src/lib/tiptap/gradient-text.ts` — Custom GradientText extension
- `src/lib/tiptap/css-class.ts` — Custom CssClass mark extension

### New dependencies:
- `react-colorful` — Color picker UI
- `@tiptap/extension-underline`
- `@tiptap/extension-text-style`
- `@tiptap/extension-color`
- `@tiptap/extension-highlight`
- `@tiptap/extension-text-align`
- `@tiptap/extension-image`

## Rendering on Public Site

The editor outputs HTML with inline styles. The public site already renders block data as HTML via `dangerouslySetInnerHTML` in some places. For fields that currently render as plain text (e.g., `{block.data.title}`), they will need to switch to `dangerouslySetInnerHTML={{ __html: block.data.title }}` to render the rich formatting.

**Important:** Sanitize HTML output before rendering to prevent XSS. Use a lightweight sanitizer like `DOMPurify` or `sanitize-html` that allows inline styles but strips scripts and event handlers.

## Out of Scope

- Drag-and-drop block reordering (existing block system stays)
- Table editing
- Embed (video, iframe)
- Collaborative editing
- Version history / autosave
- Spell check integration
