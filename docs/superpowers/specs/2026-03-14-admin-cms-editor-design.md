# Admin CMS Editor — Design Spec

**Date**: 2026-03-14
**Status**: Approved

## Overview

A built-in admin editor at `/admin` that lets the team (2-3 people) edit and create SEO landing pages through a web UI instead of editing JSON files directly. Changes write directly to the `content/landing-pages/*.json` files on disk.

## Tech Stack

- Next.js 14 app routes (part of existing site)
- shadcn/ui for UI components
- Tiptap for WYSIWYG rich text editing
- Cookie-based auth with credentials from env vars
- Node.js `fs` for reading/writing JSON files

## Authentication

### Credentials
- Stored in `.env` as `ADMIN_USERS=ozan:password,joe:password`
- `ADMIN_SECRET` env var used as HMAC signing key for cookies

### Flow
1. User visits `/admin` → middleware checks for valid cookie
2. No cookie → redirect to `/admin/login`
3. Login form POSTs to `/api/admin/auth` → validates credentials → sets signed cookie
4. Cookie is stateless (contains username + HMAC signature)

### Middleware
- `src/middleware.ts` protects all `/admin/*` routes except `/admin/login`
- Checks cookie validity via HMAC verification
- Uses matcher config to scope to admin routes only (prevents breaking public site):
  ```typescript
  export const config = { matcher: '/admin/:path*' };
  ```

## File Structure

```
src/app/admin/
  layout.tsx                      — Admin shell (sidebar, header)
  page.tsx                        — Dashboard: page list with search/filter
  login/page.tsx                  — Login form
  pages/[slug]/page.tsx           — Edit landing page
  pages/new/page.tsx              — Create new landing page

src/app/api/admin/
  auth/route.ts                   — POST login, DELETE logout
  pages/route.ts                  — GET all pages, POST create page
  pages/[slug]/route.ts           — GET single page, PUT update page

src/middleware.ts                 — Auth guard for /admin/* routes

src/components/admin/
  PageForm.tsx                    — Shared form component (edit + create)
  RichTextEditor.tsx              — Tiptap WYSIWYG wrapper
  HubFilter.tsx                   — Hub category filter dropdown
```

## Data Model

Uses the existing `LandingPage` TypeScript interface:

```typescript
interface LandingPage {
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
  sections: { heading: string; content: string; }[];
  faqs: { question: string; answer: string; }[];
  relatedSlugs: string[];
  schemaType: "Product" | "Service";
}
```

## Pages & UI

### Dashboard (`/admin`)
- **Table** with columns: Title (h1 + h1Highlight), Hub, Primary Keyword, Slug
- **Search bar** filters across title, slug, keywords
- **Hub dropdown** filters by hubSlug
- Click row → navigate to edit page
- "New Page" button top-right → navigate to create page
- Uses shadcn/ui: Table, Input, Select, Button

### Edit Page (`/admin/pages/[slug]`)
- Loads page data from API
- Uses shared `PageForm` component
- Save button → PUT to `/api/admin/pages/[slug]`
- Success/error toast feedback

### Create Page (`/admin/pages/new`)
- Same `PageForm` component with empty defaults
- Hub selector required first (determines target JSON file)
- Save button → POST to `/api/admin/pages`
- Redirects to edit page after creation

### PageForm Component
Organized in sections:

1. **Basic Info** — slug (auto-generated from h1 on create, read-only on edit), hubSlug (dropdown), hubName (auto-derived from hubSlug), schemaType
2. **SEO** (collapsible) — title, metaDescription, primaryKeyword, secondaryKeywords (tag input)
3. **Hero** — h1, h1Highlight, heroSubtitle
4. **Content Sections** — ordered list, each with heading (text input) + content (Tiptap WYSIWYG). Add/remove/reorder via drag or up/down buttons
5. **FAQs** — ordered list of question (text input) + answer (textarea). Add/remove/reorder
6. **Related Pages** — multi-select from all existing page slugs

### Admin Layout
- Header with "Sunlite Admin" title and logged-in username
- **Logout button** in header
- Sidebar with nav: Dashboard, New Page

### UI States
- **Loading**: Skeleton/spinner while fetching data
- **Error**: Toast notifications for failed saves, inline error messages for validation
- **Empty**: "No pages found" message when filters return no results

### RichTextEditor Component
- Tiptap with StarterKit (headings, bold, italic, lists, blockquote)
- Link extension (add/edit/remove links)
- Toolbar: Bold, Italic, H3, H4, Bullet List, Ordered List, Link, Undo/Redo
- Outputs HTML string (matches existing section content format)
- **Round-trip safe**: loading existing HTML into Tiptap and saving back must not alter formatting

## API Routes

### `POST /api/admin/auth`
- Body: `{ username, password }`
- Validates against `ADMIN_USERS` env var
- Sets signed cookie on success
- Returns 401 on failure

### `DELETE /api/admin/auth`
- Clears auth cookie (logout)

### `GET /api/admin/pages`
- Returns all landing pages from all JSON files
- Optional query param `?hub=cabinet-signs` for filtering

### `POST /api/admin/pages`
- Body: full `LandingPage` object
- **Validates** input with Zod schema before writing (prevents malformed data from breaking the build)
- **Checks slug uniqueness** across all JSON files before creating
- Reads target JSON file (based on `hubSlug`), appends new page, writes file
- Returns created page

### `GET /api/admin/pages/[slug]`
- Finds and returns single page across all JSON files

### `PUT /api/admin/pages/[slug]`
- Body: full `LandingPage` object
- **Validates** input with Zod schema before writing
- Finds page in correct JSON file, replaces it, writes file
- Returns updated page

### JSON File Mapping
API routes need to map `hubSlug` to JSON file path:
```typescript
const hubToFile: Record<string, string> = {
  "cabinet-signs": "cabinet-signs.json",
  "blade-signs": "blade-signs.json",
  "flat-cut-letters": "flat-cut-letters.json",
  "light-boxes": "light-boxes.json",
  "logo-boxes": "logo-boxes.json",
  "push-through-signs": "push-through-signs.json",
  "general": "general.json",
  "engineering": "engineering.json",
  "illumination": "illumination.json",
};
```

**Channel Letters special case**: The `channel-letters` hub is split across two files (`channel-letters-1.json` and `channel-letters-2.json`). Logic:
- **Read/Update**: Scan both files to find the matching slug
- **Create**: Append to `channel-letters-2.json` (the overflow file)

### hubSlug → hubName Mapping
Auto-derived, not user-entered:
```typescript
const hubNames: Record<string, string> = {
  "cabinet-signs": "Cabinet Signs",
  "channel-letters": "Channel Letters",
  "blade-signs": "Blade Signs",
  "flat-cut-letters": "Flat Cut Letters",
  "light-boxes": "Light Boxes",
  "logo-boxes": "Logo Boxes",
  "push-through-signs": "Push-Through Signs",
  "general": "General",
  "engineering": "Engineering",
  "illumination": "Illumination",
};
```

### Concurrency Note
With 2-3 users, simultaneous edits to the same JSON file could cause data loss (last write wins). This is acceptable risk for a small team. Users should coordinate to avoid editing the same hub category simultaneously.

### Validation
All write endpoints use a Zod schema mirroring the `LandingPage` interface. Invalid data returns 400 with field-level error messages. This prevents malformed JSON from breaking the Next.js build.

## Important: Static Generation Caveat

This site uses Next.js static generation (`generateStaticParams`). Editing JSON files via the admin UI updates files on disk, but **the live site won't reflect changes until the dev server picks up the change** (automatic in dev mode with file watching) **or a production rebuild is triggered**. This is expected — the admin is a content editing tool, not a live CMS. Workflow: edit → save → verify on dev site → commit via git → rebuild for production.

## Dependencies to Install

```
@tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/pm
zod (for API input validation)
shadcn/ui (init + components: button, input, table, select, card, tabs, dialog, textarea, badge, toast, label, separator)
```

## Out of Scope

- Image upload (pages use PlaceholderImage components currently)
- Page deletion (can be added later)
- Preview mode (user can check the live site after saving)
- Version history / undo (git handles this)
- Deployment auth (this is for local/dev use initially)
