# i18n: English + German Translation

## Overview

Add full German language support to the Sunlite Signs wholesale website. English remains the default language. German content is served under a `/de/` URL prefix. Visitors from German-speaking countries are auto-redirected. Admin CMS gets language tabs for content editing.

## URL Structure

- **English (default):** `/products/channel-letters/front-lit`
- **German:** `/de/products/channel-letters/front-lit`
- URLs stay in English — only the `/de/` prefix changes
- No `/en/` prefix — English is the default with no prefix

## Routing

### Approach: Middleware Rewrite (No File Migration)

**Keep the existing file structure unchanged.** Instead of adding a `[locale]` dynamic segment (which would require moving 44+ page files), use middleware to handle locale routing:

1. Middleware detects `/de/` prefix in the URL
2. Strips the `/de/` prefix and rewrites internally to the existing route
3. Passes locale as a custom header (`x-locale: de`) for components to read
4. English routes remain unchanged — no rewrite needed

This avoids a massive file migration and the routing conflicts that come with a `[locale]` segment.

### How Pages Read Locale

Create a server-side utility:

```typescript
// src/lib/i18n/locale.ts
import { headers } from 'next/headers';

export type Locale = 'en' | 'de';
export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'de'];

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const locale = h.get('x-locale');
  return locale === 'de' ? 'de' : 'en';
}
```

Pages and layouts call `getLocale()` — no params threading needed.

### Middleware Updates

Extend existing `middleware.ts`:

1. **Locale detection:** If path starts with `/de/`, strip prefix, set `x-locale: de` header, rewrite to unprefixed path
2. **Geo-redirect:** On first visit (no `locale-preference` cookie AND no `geo-redirected` cookie), check `CF-IPCountry` header. If `DE`, `AT`, or `CH` → 302 redirect to `/de/` equivalent and set `geo-redirected=1` session cookie (prevents redirect loop). Does NOT set `locale-preference` — only the language switcher does that.
3. **Cookie handling:** `locale-preference` cookie is only set by the language switcher. Middleware respects it: if set, never geo-redirect.
4. **Existing functionality preserved:** Admin auth, role checks, and public redirects continue working. Redirects matcher updated to handle `/de/` prefixed paths.
5. **Admin excluded:** `/admin/` and `/api/` routes are not affected by locale logic.

### Root Layout `<html lang>`

The root layout at `src/app/layout.tsx` currently has `<html lang="en">`. Update it to read locale dynamically:

```typescript
const locale = await getLocale();
return <html lang={locale} ...>
```

Since all pages use `force-dynamic`, this works at request time.

### next.config.mjs Rewrites

Duplicate existing rewrites with `/de/` prefix versions:
- `/face-lit-channel-letters` → `/products/channel-letters/front-lit`
- `/de/face-lit-channel-letters` → `/de/products/channel-letters/front-lit`

The `/de/` prefixed rewrites get processed by middleware (strip prefix + set header) before hitting the actual route.

## Locale-Aware Links

### `LocaleLink` Component

Create a wrapper around Next.js `Link` that auto-prepends `/de/` when on German pages:

```typescript
// src/components/LocaleLink.tsx
import Link from 'next/link';

export function LocaleLink({ href, locale, ...props }) {
  const localizedHref = locale === 'de' ? `/de${href}` : href;
  return <Link href={localizedHref} {...props} />;
}
```

All internal links in Header, Footer, CTAs, breadcrumbs, and page content use `LocaleLink` instead of `Link`. JSON content `href` values stay as English paths (e.g., `/get-a-quote`); the component handles prefixing.

## Content Storage

### Strategy: Inline Locale Keys

Add optional `de` keys to existing JSON content structures. No separate files per language — keeps content co-located.

**Page config example:**
```json
{
  "slug": "home",
  "pageType": "static",
  "label": "Homepage",
  "seo": {
    "title": "Wholesale Signs Manufacturer | Sunlite Signs",
    "metaDescription": "Premium wholesale sign manufacturing...",
    "de": {
      "title": "Schilder Großhandel Hersteller | Sunlite Signs",
      "metaDescription": "Premium Schilder Großhandel Herstellung..."
    }
  },
  "blocks": [
    {
      "id": "hero",
      "type": "hero",
      "visible": true,
      "data": {
        "title": "Wholesale Channel Letters",
        "subtitle": "Premium quality for sign companies",
        "ctas": [
          { "label": "Get Quote", "href": "/get-a-quote" }
        ],
        "de": {
          "title": "Leuchtbuchstaben Großhandel",
          "subtitle": "Premium-Qualität für Schilderunternehmen",
          "ctas": [
            { "label": "Angebot Anfordern", "href": "/get-a-quote" }
          ]
        }
      }
    }
  ]
}
```

### Locale Resolution Rules

The `resolveLocaleContent(data, locale)` utility works as follows:

- Only looks for `de` keys at **known content levels**: `seo`, block `data`, and landing page `sections`
- Does NOT recurse arbitrarily — operates on a flat merge at each known level
- When `locale === 'de'` and a `de` key exists: **shallow merge** the `de` object over the parent (replacing arrays entirely, not merging item-by-item)
- When `locale === 'en'` or no `de` key exists: return the data as-is (strip `de` keys)
- The `de` key is removed from the resolved output so components never see it

**Example resolution for German:**
```
data.title = "Wholesale..." + data.de.title = "Großhandel..."
→ resolved.title = "Großhandel..."

data.ctas = [{label: "Get Quote", ...}] + data.de.ctas = [{label: "Angebot", ...}]
→ resolved.ctas = [{label: "Angebot", ...}]  (full array replacement)
```

**Fallback behavior:** If a `de` key is missing at any level, the English content is used. This allows incremental translation.

### Content Loader Changes

Update `content-store.ts` and `page-config.ts`:

- Add `locale` parameter to `loadProductConfig(slug, locale)` and `loadStaticPageConfig(slug, locale)`
- Loader reads the JSON, then applies `resolveLocaleContent(data, locale)`

### Landing Pages

Landing pages use a separate data pipeline (TypeScript files in `src/lib/landing-pages/`). These need:
- The same inline `de` key support added to the landing page data structures
- `resolveLocaleContent()` applied when loading landing page data
- Landing page routes work via middleware rewrite (same as all other routes)

## Language Switcher

### Placement
In the main navigation bar (Header.tsx), right side, next to the "Get Trade Quote" CTA button.

### Design
- Globe icon + current language code (EN or DE)
- Click navigates to the same page path with/without `/de/` prefix
- Sets `locale-preference` cookie (`Path=/`, `SameSite=Lax`, `Max-Age=31536000`, `Secure` when HTTPS)

### Mobile
- Same globe + language toggle in the mobile menu header area

## UI String Translations

### Navigation & Layout Strings

Create a static translations file for hardcoded UI strings:

```typescript
// src/lib/i18n/translations.ts
export const translations = {
  en: {
    nav: {
      products: "Products",
      services: "Services",
      ourStory: "Our Story",
      gallery: "Gallery",
      resources: "Resources",
      contact: "Contact",
    },
    cta: {
      getQuote: "Get Trade Quote",
      response: "24h response",
      wholesalePricing: "Wholesale Pricing",
    },
    utilityBar: {
      wholesaleOnly: "Wholesale Only",
      tradeAccounts: "Trade Accounts",
      usaCanada: "USA & Canada",
      ul48: "UL 48 Listed",
    },
    footer: {
      copyright: "All rights reserved.",
      disclaimer: "Sunlite Signs sells exclusively to sign companies...",
    },
    errors: {
      notFound: "Page not found",
      notFoundDesc: "The page you're looking for doesn't exist.",
      backHome: "Back to Homepage",
    },
  },
  de: {
    nav: {
      products: "Produkte",
      services: "Dienstleistungen",
      ourStory: "Über Uns",
      gallery: "Galerie",
      resources: "Ressourcen",
      contact: "Kontakt",
    },
    cta: {
      getQuote: "Angebot Anfordern",
      response: "Antwort in 24h",
      wholesalePricing: "Großhandelspreise",
    },
    utilityBar: {
      wholesaleOnly: "Nur Großhandel",
      tradeAccounts: "Händlerkonten",
      usaCanada: "USA & Kanada",
      ul48: "UL 48 Zertifiziert",
    },
    footer: {
      copyright: "Alle Rechte vorbehalten.",
      disclaimer: "Sunlite Signs verkauft ausschließlich an Schilderunternehmen...",
    },
    errors: {
      notFound: "Seite nicht gefunden",
      notFoundDesc: "Die gesuchte Seite existiert nicht.",
      backHome: "Zurück zur Startseite",
    },
  },
} as const;
```

### Helper Function

```typescript
export function t(locale: Locale, key: string): string
```

Components call `getLocale()` then use `t(locale, 'nav.products')` for UI strings.

## Admin CMS Changes

### Language Tabs

- Add EN | DE tab bar above the page content editor
- Default tab: EN
- Switching to DE shows the German content fields (populated from the `de` key in JSON)
- Each block's data fields get a parallel set for German
- "Copy from English" button on the DE tab — copies all English content into the German fields as a starting point
- Saving from the DE tab writes the `de` key into the block's data

### Landing Pages

Landing pages get the "Copy from English" button in their editor. Full translation UI can be added later as needed.

### Admin Panel Language

Admin interface stays English-only. Only the page content being edited gets language tabs.

## Auto-Translation Scope

For initial launch, auto-translate with AI (Claude):

- Homepage (all blocks)
- All product category pages (~9 pages)
- All product variant pages (~12 pages)
- Header navigation strings
- Footer strings and link labels
- About page
- Contact page

**NOT auto-translated (manual later):**
- 50+ SEO landing pages
- Gallery descriptions
- Blog content
- Quote/contact form labels (deferred — forms not yet built)

## SEO

### hreflang Tags

Every public page includes:
```html
<link rel="alternate" hreflang="en" href="https://sunlitesigns.com/products/channel-letters" />
<link rel="alternate" hreflang="de" href="https://sunlitesigns.com/de/products/channel-letters" />
<link rel="alternate" hreflang="x-default" href="https://sunlitesigns.com/products/channel-letters" />
```

### Canonical URLs

- English pages: `canonical` = English URL (no prefix)
- German pages: `canonical` = `/de/...` URL (not the English version)
- `generateMetadata()` builds canonical dynamically based on locale

### OpenGraph Locale

- English pages: `locale: "en_US"`
- German pages: `locale: "de_DE"`
- Set in `generateMetadata()` per page, overriding root layout default

### Sitemaps

- `/sitemap.xml` — includes all English pages + references German alternates via hreflang
- Generate sitemap at build time via `src/app/(public)/sitemap.ts`, updated to include both locale variants
- Referenced from `robots.txt`

### Metadata

`generateMetadata()` functions call `getLocale()` and read locale-specific SEO fields (title, description) from resolved content.

## Geo-Detection Flow

```
Visitor arrives at /products/channel-letters
  → Middleware checks for locale-preference cookie
    → If set: respect it, no redirect
  → Middleware checks for geo-redirected cookie
    → If set: no redirect (already redirected once this session)
  → Middleware checks CF-IPCountry header
    → If DE/AT/CH:
        → 302 redirect to /de/products/channel-letters
        → Set geo-redirected=1 session cookie (no Max-Age, expires on session close)
    → Otherwise:
        → Serve English (default)

User clicks language switcher to EN:
  → Navigates to /products/channel-letters (no prefix)
  → Sets locale-preference=en cookie (1 year expiry)
  → Future visits: no geo-redirect, stays English
```

## Error Pages

- 404 and error pages read locale via `getLocale()` and display translated messages
- German 404 shows "Seite nicht gefunden" with German back-to-home link

## Implementation Order

1. **Routing + rewrites** — Middleware rewrite logic (strip `/de/`, set `x-locale` header), `getLocale()` utility, duplicate rewrites in next.config.mjs
2. **Content store** — `resolveLocaleContent()` utility, locale parameter in loaders, landing page loader updates
3. **Locale-aware links** — `LocaleLink` component, update Header/Footer/Breadcrumbs/CTAs
4. **UI translations** — Static translations file, update components to use `t()`
5. **Language switcher** — Component in Header (desktop + mobile), cookie management
6. **Geo-detection** — CF-IPCountry middleware logic, geo-redirected cookie
7. **SEO** — hreflang tags, canonical URLs, OG locale, sitemap updates, `<html lang>`, error pages
8. **Admin CMS tabs** — EN|DE tabs in page editor, "Copy from English" button
9. **Auto-translate content** — Bulk translate main pages with AI

## Out of Scope

- Languages beyond EN/DE
- Admin panel translation
- Blog i18n
- Form labels (forms not yet built)
- Translated URL slugs
