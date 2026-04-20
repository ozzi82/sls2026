# i18n (English + German) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add German language support to the Sunlite Signs wholesale website using middleware rewrites, inline locale keys in JSON content, and a language switcher in the header.

**Architecture:** Middleware strips `/de/` prefix and rewrites to existing routes, passing locale via `x-locale` header. Pages read locale via `getLocale()` helper. JSON content uses inline `de` keys with shallow merge. No file migration — all existing page files stay in place.

**Tech Stack:** Next.js 14 App Router, middleware rewrites, custom `getLocale()` helper, static translations object, `LocaleLink` component

**Spec:** `docs/superpowers/specs/2026-04-20-i18n-english-german-design.md`

---

## File Structure

### New files to create:
- `src/lib/i18n/locale.ts` — `getLocale()` helper, `Locale` type, locale constants
- `src/lib/i18n/translations.ts` — Static UI string translations (nav, footer, CTA, errors)
- `src/lib/i18n/resolve-locale-content.ts` — `resolveLocaleContent()` utility for JSON content
- `src/components/LocaleLink.tsx` — Locale-aware Link wrapper (prepends `/de/` when German)
- `src/components/LanguageSwitcher.tsx` — Globe + EN|DE toggle component

### Files to modify:
- `src/middleware.ts` — Add `/de/` prefix stripping, `x-locale` header, geo-detection
- `src/app/layout.tsx` — Dynamic `<html lang>`, dynamic OG locale
- `src/app/(public)/layout.tsx` — Pass locale to Header/Footer
- `src/components/Header.tsx` — Accept locale prop, use translations + LocaleLink, add LanguageSwitcher
- `src/components/Footer.tsx` — Accept locale prop, use translations + LocaleLink
- `src/components/CTASection.tsx` — Accept locale prop, use translations
- `src/components/MobileCTABar.tsx` — Accept locale prop, use translations + LocaleLink
- `src/components/Breadcrumbs.tsx` — Accept locale prop, use LocaleLink
- `src/lib/admin/page-config.ts` — Add locale param to loaders, apply resolveLocaleContent
- `src/app/(public)/page.tsx` — Call getLocale(), pass to loaders and components
- `src/app/(public)/products/page.tsx` — Same pattern
- `src/app/(public)/products/channel-letters/page.tsx` — Same pattern
- `src/app/(public)/products/channel-letters/*/page.tsx` — Same pattern (all variants)
- `src/app/(public)/products/blade-signs/page.tsx` — Same pattern
- `src/app/(public)/products/cabinet-signs/page.tsx` — Same pattern
- `src/app/(public)/products/flat-cut-letters/page.tsx` — Same pattern
- `src/app/(public)/products/lightboxes/page.tsx` — Same pattern
- `src/app/(public)/products/seg-light-boxes/page.tsx` — Same pattern
- `src/app/(public)/products/custom-fabrication/page.tsx` — Same pattern
- `src/app/(public)/products/logo-boxes/page.tsx` — Same pattern
- `src/app/(public)/products/push-through-signs/page.tsx` — Same pattern
- `src/app/(public)/about/page.tsx` — Same pattern
- `src/app/(public)/contact/page.tsx` — Same pattern
- `src/app/(public)/gallery/page.tsx` — Same pattern
- `src/app/(public)/get-a-quote/page.tsx` — Same pattern
- `src/app/(public)/services/page.tsx` — Same pattern
- `src/app/(public)/why-sunlite/*/page.tsx` — Same pattern (all sub-pages)
- `src/app/(public)/resources/*/page.tsx` — Same pattern (blog, faq, glossary, guides)
- `src/app/(public)/signs/[slug]/page.tsx` — Same pattern for landing pages
- `src/app/not-found.tsx` — Use getLocale() + translations
- `src/app/(public)/sitemap.ts` — Add German URL alternates
- `next.config.mjs` — Duplicate rewrites with `/de/` prefix
- `content/pages/home.json` — Add `de` keys (auto-translated)
- All product JSON files — Add `de` keys (auto-translated)

---

## Chunk 1: Core i18n Infrastructure

### Task 1: Create locale utility

**Files:**
- Create: `src/lib/i18n/locale.ts`

- [ ] **Step 1: Create the locale utility**

```typescript
// src/lib/i18n/locale.ts
import { headers } from "next/headers";

export type Locale = "en" | "de";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "de"];

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const locale = h.get("x-locale");
  return locale === "de" ? "de" : "en";
}

export function localePath(locale: Locale, path: string): string {
  if (locale === "de") return `/de${path}`;
  return path;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit src/lib/i18n/locale.ts 2>&1 | head -5`
Expected: No errors (or only unrelated warnings)

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/locale.ts
git commit -m "feat(i18n): add locale utility with getLocale() and localePath()"
```

---

### Task 2: Create UI translations

**Files:**
- Create: `src/lib/i18n/translations.ts`

- [ ] **Step 1: Create the translations file**

```typescript
// src/lib/i18n/translations.ts
import { Locale } from "./locale";

const translations = {
  en: {
    nav: {
      products: "Products",
      channelLetters: "Channel Letters",
      flatCutLetters: "Flat Cut Letters",
      bladeSigns: "Blade Signs",
      cabinetSigns: "Cabinet Signs",
      lightboxes: "Lightboxes",
      segLightBoxes: "SEG Light Boxes",
      customFabrication: "Custom Fabrication",
      services: "Services",
      ourStory: "Our Story",
      gallery: "Gallery",
      resources: "Resources",
      contact: "Contact",
    },
    cta: {
      getQuote: "Get Trade Quote",
      response: "24h response",
      requestPricing: "Request Wholesale Pricing",
      callUs: "Call us",
    },
    utilityBar: {
      wholesaleOnly: "Wholesale Only",
      tradeAccounts: "Trade Accounts",
      usaCanada: "USA & Canada",
      ul48: "UL 48 Listed",
    },
    footer: {
      productsTitle: "Products",
      companyTitle: "Company",
      tradeResourcesTitle: "Trade Resources",
      popularTopicsTitle: "Popular Topics",
      wholesaleBanner:
        "Sunlite Signs sells exclusively to sign companies, sign shops, and trade professionals",
      brandDescription:
        "German-engineered wholesale channel letters and illuminated signs — built exclusively for sign shops across the USA and Canada.",
      brandTagline:
        "Your clients are your clients. We are your silent manufacturing partner. No retail sales. Ever.",
      copyright: "All rights reserved.",
      blog: "Blog",
      glossary: "Glossary",
      guides: "Guides",
      faq: "FAQ",
      wholesalePolicy: "Wholesale Only Policy",
    },
    errors: {
      notFoundTitle: "Page Not Found",
      notFoundDescription:
        "The page you are looking for does not exist or has been moved.",
      goHome: "Go Home",
      getQuote: "Get a Quote",
    },
    breadcrumbs: {
      home: "Home",
    },
  },
  de: {
    nav: {
      products: "Produkte",
      channelLetters: "Leuchtbuchstaben",
      flatCutLetters: "Flachbuchstaben",
      bladeSigns: "Ausleger-Schilder",
      cabinetSigns: "Leuchtkästen",
      lightboxes: "Lichtboxen",
      segLightBoxes: "SEG-Lichtboxen",
      customFabrication: "Individuelle Fertigung",
      services: "Dienstleistungen",
      ourStory: "Über Uns",
      gallery: "Galerie",
      resources: "Ressourcen",
      contact: "Kontakt",
    },
    cta: {
      getQuote: "Angebot Anfordern",
      response: "Antwort in 24h",
      requestPricing: "Großhandelspreise Anfragen",
      callUs: "Anrufen",
    },
    utilityBar: {
      wholesaleOnly: "Nur Großhandel",
      tradeAccounts: "Händlerkonten",
      usaCanada: "USA & Kanada",
      ul48: "UL 48 Zertifiziert",
    },
    footer: {
      productsTitle: "Produkte",
      companyTitle: "Unternehmen",
      tradeResourcesTitle: "Händler-Ressourcen",
      popularTopicsTitle: "Beliebte Themen",
      wholesaleBanner:
        "Sunlite Signs verkauft ausschließlich an Schilderunternehmen, Schilderwerkstätten und Fachbetriebe",
      brandDescription:
        "Deutsche Ingenieurskunst — Leuchtbuchstaben und beleuchtete Schilder im Großhandel, exklusiv für Schilderwerkstätten in den USA und Kanada.",
      brandTagline:
        "Ihre Kunden sind Ihre Kunden. Wir sind Ihr stiller Fertigungspartner. Kein Einzelhandel. Niemals.",
      copyright: "Alle Rechte vorbehalten.",
      blog: "Blog",
      glossary: "Glossar",
      guides: "Ratgeber",
      faq: "FAQ",
      wholesalePolicy: "Nur-Großhandel-Richtlinie",
    },
    errors: {
      notFoundTitle: "Seite nicht gefunden",
      notFoundDescription:
        "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      goHome: "Zur Startseite",
      getQuote: "Angebot Anfordern",
    },
    breadcrumbs: {
      home: "Startseite",
    },
  },
} as const;

type TranslationKey = string;

export function t(locale: Locale, key: TranslationKey): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to English
      value = translations.en;
      for (const fk of keys) {
        if (value && typeof value === "object" && fk in value) {
          value = (value as Record<string, unknown>)[fk];
        } else {
          return key; // Return key if not found
        }
      }
      return typeof value === "string" ? value : key;
    }
  }
  return typeof value === "string" ? value : key;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/i18n/translations.ts
git commit -m "feat(i18n): add UI string translations for EN and DE"
```

---

### Task 3: Create resolveLocaleContent utility

**Files:**
- Create: `src/lib/i18n/resolve-locale-content.ts`

- [ ] **Step 1: Create the resolve utility**

```typescript
// src/lib/i18n/resolve-locale-content.ts
import { Locale } from "./locale";

/**
 * Resolves locale-specific content from inline `de` keys.
 *
 * Rules:
 * - Looks for `de` keys at the current object level
 * - When locale is 'de' and a `de` key exists: shallow-merge `de` over parent
 * - Arrays are replaced entirely (not merged item-by-item)
 * - The `de` key is removed from resolved output
 * - Falls back to English when `de` key is missing
 */
export function resolveLocaleContent<T extends Record<string, unknown>>(
  data: T,
  locale: Locale
): T {
  if (!data || typeof data !== "object") return data;

  // Clone to avoid mutation
  const result = { ...data };

  if (locale === "de" && "de" in result && typeof result.de === "object" && result.de !== null) {
    const deOverrides = result.de as Record<string, unknown>;
    // Shallow merge DE overrides
    for (const [key, value] of Object.entries(deOverrides)) {
      (result as Record<string, unknown>)[key] = value;
    }
  }

  // Remove the `de` key from output
  delete (result as Record<string, unknown>).de;

  return result;
}

/**
 * Resolves locale content for a page config's SEO object.
 */
export function resolveLocaleSeo<T extends Record<string, unknown>>(
  seo: T,
  locale: Locale
): T {
  return resolveLocaleContent(seo, locale);
}

/**
 * Resolves locale content for a block's data object.
 */
export function resolveLocaleBlockData<T extends Record<string, unknown>>(
  data: T,
  locale: Locale
): T {
  return resolveLocaleContent(data, locale);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/i18n/resolve-locale-content.ts
git commit -m "feat(i18n): add resolveLocaleContent utility for JSON content"
```

---

### Task 4: Create LocaleLink component

**Files:**
- Create: `src/components/LocaleLink.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/LocaleLink.tsx
"use client";

import Link from "next/link";
import { ComponentProps } from "react";

type LocaleLinkProps = ComponentProps<typeof Link> & {
  locale: string;
};

export default function LocaleLink({ href, locale, ...props }: LocaleLinkProps) {
  const hrefStr = typeof href === "string" ? href : href.pathname || "/";
  const localizedHref = locale === "de" && hrefStr.startsWith("/") && !hrefStr.startsWith("/de/") && hrefStr !== "/de"
    ? `/de${hrefStr}`
    : hrefStr;

  return <Link href={localizedHref} {...props} />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LocaleLink.tsx
git commit -m "feat(i18n): add LocaleLink component for locale-aware links"
```

---

### Task 5: Create LanguageSwitcher component

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/LanguageSwitcher.tsx
"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Calculate the path for the other language
  const switchPath = locale === "de"
    ? pathname.replace(/^\/de/, "") || "/"
    : `/de${pathname}`;

  const handleSwitch = () => {
    // Set locale-preference cookie (1 year, SameSite=Lax)
    document.cookie = `locale-preference=${locale === "de" ? "en" : "de"}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.href = switchPath;
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-heading tracking-wider transition-colors"
      aria-label={locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
    >
      <Globe className="w-3.5 h-3.5" />
      <span className={locale === "en" ? "text-white font-bold" : "opacity-50"}>EN</span>
      <span className="opacity-30">|</span>
      <span className={locale === "de" ? "text-white font-bold" : "opacity-50"}>DE</span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LanguageSwitcher.tsx
git commit -m "feat(i18n): add LanguageSwitcher component with cookie management"
```

---

### Task 6: Add middleware locale handling

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Update middleware with locale rewriting and geo-detection**

Replace the entire `src/middleware.ts` with the full integrated version. Key changes:
1. Strip `/de/` prefix from public routes and rewrite to unprefixed path with `x-locale: de` header
2. Geo-redirect DE/AT/CH visitors on first visit (using `CF-IPCountry` header)
3. Redirect cache uses `strippedPath` for matching so redirects work on both `/` and `/de/` routes
4. All existing admin auth and redirect logic stays unchanged

```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

const ADMIN_ONLY_PATTERNS = [
  /^\/admin\/users/,
  /^\/admin\/integrations/,
  /^\/admin\/redirects/,
  /^\/api\/admin\/users(?!\/check)/,
  /^\/api\/admin\/settings/,
  /^\/api\/admin\/redirects/,
];

let redirectCache: { from: string; to: string; permanent: boolean }[] | null = null;
let redirectCacheTs = 0;
const REDIRECT_CACHE_TTL = 60_000;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Locale detection ---
  const isDeRoute = pathname.startsWith("/de/") || pathname === "/de";
  const strippedPath = isDeRoute ? pathname.replace(/^\/de/, "") || "/" : pathname;

  // --- Public routes (non-admin, non-api) ---
  if (!strippedPath.startsWith("/admin") && !strippedPath.startsWith("/api")) {
    // Refresh redirect cache
    if (!redirectCache || Date.now() - redirectCacheTs > REDIRECT_CACHE_TTL) {
      try {
        const res = await fetch(`${request.nextUrl.origin}/api/public/redirects`);
        if (res.ok) {
          const data = await res.json();
          redirectCache = data.redirects || [];
          redirectCacheTs = Date.now();
        }
      } catch {
        // Don't block on errors
      }
    }

    // Check redirects against strippedPath (works for both /de/ and non-/de/ routes)
    if (redirectCache) {
      const match = redirectCache.find((r) => r.from === strippedPath);
      if (match) {
        const destPath = match.to.startsWith("http")
          ? match.to
          : isDeRoute
            ? `${request.nextUrl.origin}/de${match.to}`
            : `${request.nextUrl.origin}${match.to}`;
        return NextResponse.redirect(destPath, match.permanent ? 308 : 307);
      }
    }

    // If /de/ route, rewrite to unprefixed path with x-locale header
    if (isDeRoute) {
      const url = request.nextUrl.clone();
      url.pathname = strippedPath;
      const response = NextResponse.rewrite(url);
      response.headers.set("x-locale", "de");
      return response;
    }

    // Geo-detection for English routes (no /de/ prefix)
    const hasLocalePref = request.cookies.has("locale-preference");
    const wasGeoRedirected = request.cookies.has("geo-redirected");
    if (!hasLocalePref && !wasGeoRedirected) {
      const country = request.headers.get("cf-ipcountry");
      if (country && ["DE", "AT", "CH"].includes(country)) {
        const deUrl = new URL(`/de${pathname}`, request.url);
        const response = NextResponse.redirect(deUrl, 302);
        response.cookies.set("geo-redirected", "1", { path: "/" });
        return response;
      }
    }

    return NextResponse.next();
  }

  // --- Admin routes below (unchanged) ---
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/auth" ||
    pathname === "/api/admin/setup" ||
    pathname === "/api/admin/users/check"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const verified = verifyToken(token);
  if (!verified) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAdminOnly = ADMIN_ONLY_PATTERNS.some((p) => p.test(pathname));
  if (isAdminOnly && verified.role !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const dashUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashUrl);
  }

  const response = NextResponse.next();
  response.headers.set("x-admin-username", verified.username);
  response.headers.set("x-admin-role", verified.role);
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/de/:path*",
    "/((?!_next|api|favicon|uploads|.*\\.).*)",
  ],
};
```

- [ ] **Step 2: Test locally**

Run: `npm run dev`
- Visit `http://localhost:3000/` — should work as before (English)
- Visit `http://localhost:3000/de/` — should load the homepage (same content for now, but x-locale header set)
- Visit `http://localhost:3000/de/products` — should load products page

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat(i18n): add middleware locale rewriting and geo-detection"
```

---

### Task 7: Update root layout for dynamic lang attribute

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Make root layout dynamic**

Changes needed:
1. Import `getLocale` from `@/lib/i18n/locale`
2. Make `RootLayout` async
3. Call `getLocale()` and set `<html lang={locale}>`
4. Make metadata dynamic via `generateMetadata()` instead of static export (for OG locale)

At `src/app/layout.tsx`:
- Line 49-87: Convert the static `metadata` export to a `generateMetadata()` function that reads locale and sets `locale: locale === "de" ? "de_DE" : "en_US"` on openGraph
- Line 125-141: Make function async, add `const locale = await getLocale()`, change `<html lang="en">` to `<html lang={locale}>`

- [ ] **Step 2: Test locally**

Run: `npm run dev`
- Visit `http://localhost:3000/` — inspect HTML, should see `<html lang="en">`
- Visit `http://localhost:3000/de/` — inspect HTML, should see `<html lang="de">`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(i18n): dynamic html lang and OG locale in root layout"
```

---

### Task 8: Duplicate rewrites in next.config.mjs

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Add /de/ prefixed rewrites**

For each existing rewrite in `next.config.mjs` lines 9-36, add a duplicate with `/de/` prefix on both source and destination. Example:

```javascript
// Existing
{ source: "/wholesale-sign-products", destination: "/products" },
// New German variant
{ source: "/de/wholesale-sign-products", destination: "/de/products" },
```

Do this for all ~20 rewrites. The `/de/` prefixed destinations will be caught by middleware and rewritten.

- [ ] **Step 2: Test a German rewrite**

Visit `http://localhost:3000/de/face-lit-channel-letters` — should load the front-lit channel letters page.

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "feat(i18n): add /de/ prefixed URL rewrites"
```

---

## Chunk 2: Content Store + Page Integration

### Task 9: Update page-config.ts with locale support

**Files:**
- Modify: `src/lib/admin/page-config.ts`

- [ ] **Step 1: Add locale parameter to loader functions**

Import `Locale` and `resolveLocaleContent` at the top. Update `loadProductConfig` and `loadStaticPageConfig` to accept an optional `locale` parameter:

```typescript
import { Locale, defaultLocale } from "@/lib/i18n/locale";
import { resolveLocaleContent, resolveLocaleSeo, resolveLocaleBlockData } from "@/lib/i18n/resolve-locale-content";

export async function loadProductConfig(fileSlug: string, locale: Locale = defaultLocale): Promise<PageConfig> {
  const config = await readJson<PageConfig>(`products/${fileSlugToFilename(fileSlug)}`);
  if (!config) throw new Error(`Product config not found: ${fileSlug}`);
  return applyLocale(config, locale);
}

export async function loadStaticPageConfig(fileSlug: string, locale: Locale = defaultLocale): Promise<PageConfig> {
  const config = await readJson<PageConfig>(`pages/${fileSlugToFilename(fileSlug)}`);
  if (!config) throw new Error(`Static page config not found: ${fileSlug}`);
  return applyLocale(config, locale);
}

function applyLocale(config: PageConfig, locale: Locale): PageConfig {
  if (locale === "en") return config;
  return {
    ...config,
    seo: resolveLocaleSeo(config.seo as Record<string, unknown>, locale) as PageConfig["seo"],
    blocks: config.blocks.map((block) => ({
      ...block,
      data: resolveLocaleBlockData(block.data as Record<string, unknown>, locale),
    })),
  };
}
```

Note: Admin functions (`updateProductConfig`, `updateStaticConfig`, `getAllProductConfigs`, `getAllStaticConfigs`) do NOT get locale — they always work with the full JSON including `de` keys. Only the public-facing loaders resolve locale.

- [ ] **Step 2: Verify build**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds (existing pages still load English by default since locale defaults to "en")

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/page-config.ts
git commit -m "feat(i18n): add locale parameter to page config loaders"
```

---

### Task 10: Update public layout to pass locale

**Files:**
- Modify: `src/app/(public)/layout.tsx`

- [ ] **Step 1: Read locale and pass to Header/Footer**

```typescript
import { getLocale } from "@/lib/i18n/locale";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await loadSiteSettings();
  const consentConfig = getPublicConsentConfig(settings);
  const locale = await getLocale();

  return (
    <>
      {/* ... existing theme script ... */}
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <MobileCTABar locale={locale} />
      {/* ... rest stays the same ... */}
    </>
  );
}
```

This will cause type errors in Header/Footer/MobileCTABar until they accept the `locale` prop (Tasks 11-13). **Do NOT commit yet** — commit after Tasks 11-13 are complete to avoid a broken intermediate state.

---

### Task 11: Update Header with locale support

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Refactor Header to use translations and LocaleLink**

Key changes:
1. Accept `locale` prop
2. Replace hardcoded `navigation` array with a function that uses `t(locale, ...)` for labels
3. Replace all `<Link>` with `<LocaleLink locale={locale}>`
4. Replace hardcoded utility bar strings with `t()` calls
5. Replace hardcoded CTA text with `t()` calls
6. Add `<LanguageSwitcher locale={locale} />` next to the desktop CTA (line ~116, inside the `hidden lg:flex` div)
7. Add `<LanguageSwitcher locale={locale} />` in mobile menu (line ~178, before the CTA section)

The navigation array becomes a function:
```typescript
function getNavigation(locale: string) {
  return [
    {
      name: t(locale as Locale, "nav.products"),
      href: "/products",
      children: [
        { name: t(locale as Locale, "nav.channelLetters"), href: "/products/channel-letters" },
        { name: t(locale as Locale, "nav.flatCutLetters"), href: "/products/flat-cut-letters" },
        // ... etc for all children
      ],
    },
    { name: t(locale as Locale, "nav.services"), href: "/services" },
    { name: t(locale as Locale, "nav.ourStory"), href: "/about" },
    { name: t(locale as Locale, "nav.gallery"), href: "/gallery" },
    { name: t(locale as Locale, "nav.resources"), href: "/resources" },
    { name: t(locale as Locale, "nav.contact"), href: "/contact" },
  ];
}
```

Utility bar items:
```typescript
{[t(locale as Locale, "utilityBar.wholesaleOnly"), t(locale as Locale, "utilityBar.tradeAccounts"), t(locale as Locale, "utilityBar.usaCanada"), t(locale as Locale, "utilityBar.ul48")].map(...)}
```

- [ ] **Step 2: Test locally**

Visit `http://localhost:3000/` — header should show English nav
Visit `http://localhost:3000/de/` — header should show German nav ("Produkte", "Dienstleistungen", etc.)
Click language switcher — should navigate between `/` and `/de/`

- [ ] **Step 3: Do NOT commit yet** — wait for Task 14 consolidated commit.

---

### Task 12: Update Footer with locale support

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Refactor Footer**

Key changes:
1. Accept `locale` prop
2. Replace `<Link>` with `<LocaleLink locale={locale}>`
3. Use `t()` for column titles, wholesale banner, brand description, brand tagline, copyright
4. Footer link names use translations for link group column names. Individual link names (product names) use `t()` calls matching the nav translations.

The `footerLinks` object becomes a function `getFooterLinks(locale)` that returns translated titles and names.

- [ ] **Step 2: Test locally**

Visit `http://localhost:3000/de/` — footer should show German text

- [ ] **Step 3: Do NOT commit yet** — wait for Task 14 consolidated commit.

---

### Task 13: Update MobileCTABar and CTASection

**Files:**
- Modify: `src/components/MobileCTABar.tsx`
- Modify: `src/components/CTASection.tsx`

- [ ] **Step 1: Update MobileCTABar**

Accept `locale` prop. Replace hardcoded "Get Trade Quote" with `t(locale, "cta.getQuote")`. Replace "Call us" aria-label with `t(locale, "cta.callUs")`. Use `<LocaleLink>` for the quote link.

- [ ] **Step 2: Update CTASection**

Accept `locale` prop. Replace hardcoded defaults:
- "Trade Accounts Only" → `t(locale, "utilityBar.tradeAccounts")` or a new key
- "Request Wholesale Pricing" → `t(locale, "cta.requestPricing")`
Use `<LocaleLink>` for CTA links.

- [ ] **Step 3: Do NOT commit yet** — wait for Task 14 consolidated commit.

---

### Task 14: Update Breadcrumbs

**Files:**
- Modify: `src/components/Breadcrumbs.tsx`

- [ ] **Step 1: Add locale prop and use LocaleLink**

Accept `locale` prop. Replace `<Link>` with `<LocaleLink locale={locale}>` for breadcrumb links. The breadcrumb data comes from page components — those will pass translated labels.

- [ ] **Step 2: Commit all component + layout changes (Tasks 10-14)**

```bash
git add src/app/(public)/layout.tsx src/components/Header.tsx src/components/Footer.tsx src/components/CTASection.tsx src/components/MobileCTABar.tsx src/components/Breadcrumbs.tsx
git commit -m "feat(i18n): localize Header, Footer, CTAs, Breadcrumbs and pass locale from layout"
```

---

## Chunk 3: Page Component Updates

**Important:** Every page under `(public)` needs the locale pattern applied. This includes pages not listed individually below. The full list from the File Structure section must be covered. The pattern for each page is identical:
1. Import `getLocale` from `@/lib/i18n/locale`
2. Call `const locale = await getLocale()` at the top of the page component
3. Pass `locale` to config loaders: `loadStaticPageConfig("slug", locale)` or `loadProductConfig("slug", locale)`
4. Pass `locale` to all child components (Breadcrumbs, CTASection, etc.)
5. Replace `<Link>` with `<LocaleLink locale={locale}>` for all internal links
6. Translate breadcrumb labels using `t(locale, "...")`

### Task 15: Update homepage

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Add locale to homepage**

At the top, import and call `getLocale()`. Pass locale to `loadStaticPageConfig("home", locale)`. Pass locale to all child components (Breadcrumbs, CTASection, any LocaleLink usage).

Replace hardcoded strings throughout:
- Line 102: "Scroll" → `t(locale, "...")` or leave as-is (decorative)
- Line 182: "Portfolio" micro-label
- Line 188: "View Full Gallery"
- Line 656: "Read Guide"
- Line 709: "Get Trade Quote"

Replace all `<Link>` with `<LocaleLink locale={locale}>`.

- [ ] **Step 2: Test both languages**

Visit `http://localhost:3000/` and `http://localhost:3000/de/` — both should load. German page shows translated content from config blocks (once content is translated) and translated UI strings.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/page.tsx
git commit -m "feat(i18n): add locale support to homepage"
```

---

### Task 16: Update product pages

**Files:**
- Modify: `src/app/(public)/products/page.tsx`
- Modify: `src/app/(public)/products/channel-letters/page.tsx`
- Modify: All variant pages under `src/app/(public)/products/channel-letters/*/page.tsx`
- Modify: All other product category pages (blade-signs, cabinet-signs, flat-cut-letters, lightboxes, seg-light-boxes, custom-fabrication)

- [ ] **Step 1: Update products hub page**

Same pattern as homepage: import `getLocale()`, pass locale to config loaders and components. Translate breadcrumbs: `{ name: t(locale, "breadcrumbs.home"), href: "/" }, { name: t(locale, "nav.products") }`.

- [ ] **Step 2: Update channel-letters hub page**

Same pattern. Breadcrumbs: Home → Products → Channel Letters (all translated via `t()`).

- [ ] **Step 3: Update all channel-letters variant pages**

Apply the same pattern to: front-lit, halo-lit, front-and-halo-lit, side-lit, back-side-lit, front-side-lit, faux-neon, conical, trimless, stainless-standoff, stainless-flush, non-illuminated.

Each page: `getLocale()` + pass locale to `loadProductConfig(slug, locale)` + LocaleLink + translated breadcrumbs.

- [ ] **Step 4: Update remaining product category pages**

Apply same pattern to: blade-signs, cabinet-signs, flat-cut-letters, lightboxes, seg-light-boxes, custom-fabrication, logo-boxes, push-through-signs.

- [ ] **Step 5: Test a few product pages**

Visit `http://localhost:3000/products/channel-letters` and `http://localhost:3000/de/products/channel-letters` — both should load.

- [ ] **Step 6: Commit**

```bash
git add src/app/(public)/products/
git commit -m "feat(i18n): add locale support to all product pages"
```

---

### Task 17: Update static pages

**Files:**
- Modify: `src/app/(public)/about/page.tsx`
- Modify: `src/app/(public)/contact/page.tsx`
- Modify: `src/app/(public)/gallery/page.tsx`
- Modify: `src/app/(public)/get-a-quote/page.tsx`
- Modify: `src/app/(public)/services/page.tsx`
- Modify: `src/app/(public)/why-sunlite/*/page.tsx` (all sub-pages)
- Modify: `src/app/(public)/resources/page.tsx`
- Modify: `src/app/(public)/resources/blog/page.tsx`
- Modify: `src/app/(public)/resources/faq/page.tsx`
- Modify: `src/app/(public)/resources/glossary/page.tsx`
- Modify: `src/app/(public)/resources/guides/page.tsx`

- [ ] **Step 1: Apply locale pattern to each static page**

Same pattern: `getLocale()` → pass to loaders and components → LocaleLink → translated breadcrumbs. Apply to ALL pages listed above — do not skip any.

- [ ] **Step 2: Commit**

```bash
git add src/app/(public)/
git commit -m "feat(i18n): add locale support to static pages"
```

---

### Task 18: Update landing pages route

**Files:**
- Modify: `src/app/(public)/signs/[slug]/page.tsx`
- Modify: `src/lib/landing-pages/index.ts`

- [ ] **Step 1: Update landing pages index**

Landing pages are TypeScript files, not JSON. For now, they stay English-only but the route needs to work with `/de/` prefix. Update `getLandingPage` and `getLandingPagesByHub` — no locale filtering needed yet since landing pages aren't being translated in this phase.

- [ ] **Step 2: Update the signs/[slug] page**

Add `getLocale()`, pass locale to Breadcrumbs and LocaleLink. Content stays English until manually translated later.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/signs/ src/lib/landing-pages/
git commit -m "feat(i18n): add locale routing support to landing pages"
```

---

### Task 19: Update not-found page

**Files:**
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Use translations for error text**

Import `getLocale` and `t`. Replace hardcoded strings:
- "Page Not Found" → `t(locale, "errors.notFoundTitle")`
- "The page you are looking for..." → `t(locale, "errors.notFoundDescription")`
- "Go Home" → `t(locale, "errors.goHome")`
- "Get a Quote" → `t(locale, "errors.getQuote")`

Use `<LocaleLink>` for the links.

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat(i18n): localize 404 page"
```

---

## Chunk 4: SEO, Sitemap, and Content Translation

### Task 20: Add hreflang tags and canonical URLs

**Files:**
- Modify: All page components that have `generateMetadata()` functions

- [ ] **Step 1: Create a hreflang helper**

Add to `src/lib/i18n/locale.ts`:

```typescript
export function getAlternates(path: string) {
  const baseUrl = "https://sunlitesigns.com";
  return {
    canonical: `${baseUrl}${path}`,
    languages: {
      "en": `${baseUrl}${path}`,
      "de": `${baseUrl}/de${path}`,
      "x-default": `${baseUrl}${path}`,
    },
  };
}
```

- [ ] **Step 2: Add alternates to generateMetadata in each page**

In every page's `generateMetadata()`, add:
```typescript
const locale = await getLocale();
const pagePath = "/products/channel-letters"; // specific to each page
return {
  // ...existing metadata...
  alternates: getAlternates(pagePath),
};
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/locale.ts src/app/
git commit -m "feat(i18n): add hreflang tags and canonical URLs"
```

---

### Task 21: Update sitemap

**Files:**
- Modify: `src/app/(public)/sitemap.ts`

- [ ] **Step 1: Add German alternates to sitemap**

For each URL entry, add the alternates field:
```typescript
{
  url: `${baseUrl}/products/channel-letters`,
  lastModified: new Date(),
  alternates: {
    languages: {
      de: `${baseUrl}/de/products/channel-letters`,
    },
  },
}
```

Also add the `/de/` prefixed versions as separate entries.

- [ ] **Step 2: Commit**

```bash
git add src/app/(public)/sitemap.ts
git commit -m "feat(i18n): add German alternates to sitemap"
```

---

### Task 22: Auto-translate main content JSON files

**Files:**
- Modify: `content/pages/home.json`
- Modify: `content/pages/about.json`
- Modify: `content/pages/contact.json`
- Modify: All product JSON files in `content/products/`

- [ ] **Step 1: Translate homepage content**

Add `de` keys to each block's data in `content/pages/home.json`. For each translatable string field (title, subtitle, badge, description, CTA labels), add the German translation inside a `de` object at the same level.

Also add `de` key to the `seo` object with translated title, metaDescription, and keywords.

- [ ] **Step 2: Translate about and contact pages**

Same pattern for `content/pages/about.json` and `content/pages/contact.json`.

- [ ] **Step 3: Translate product config files**

Apply the same pattern to all files in `content/products/`. Each product page's blocks get `de` keys with German translations.

- [ ] **Step 4: Test German content**

Visit `http://localhost:3000/de/` — homepage should show German content
Visit `http://localhost:3000/de/products` — products hub should show German content
Visit `http://localhost:3000/de/products/channel-letters/front-lit` — should show German product content

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat(i18n): add German translations to main content JSON files"
```

---

### Task 23: Final verification and build test

- [ ] **Step 1: Full build test**

Run: `npx next build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Test key routes**

Start dev server and verify:
- `http://localhost:3000/` — English homepage
- `http://localhost:3000/de/` — German homepage with translated content
- `http://localhost:3000/de/products/channel-letters` — German product page
- `http://localhost:3000/de/wholesale-sign-products` — German rewrite URL
- Language switcher toggles between EN and DE
- All internal links on German pages stay on `/de/` prefix
- 404 page shows German text at `/de/nonexistent`
- View source: `<html lang="de">` on German pages
- View source: hreflang tags present on all pages

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "feat(i18n): final fixes from verification"
```

- [ ] **Step 4: Push to remote**

```bash
git push sls2026 main
```

---

## Chunk 5: Admin CMS Language Tabs

### Task 24: Add EN|DE tabs to page content editor

**Files:**
- Modify: The admin page editor component (find the CMS block editor — likely under `src/app/(admin)/admin/content/`)
- Create: `src/components/admin/LanguageTabs.tsx` — Reusable EN|DE tab component

- [ ] **Step 1: Create LanguageTabs component**

A simple tab bar component for the admin editor:

```typescript
// src/components/admin/LanguageTabs.tsx
"use client";

import { useState } from "react";

type Locale = "en" | "de";

interface LanguageTabsProps {
  activeLocale: Locale;
  onChange: (locale: Locale) => void;
}

export default function LanguageTabs({ activeLocale, onChange }: LanguageTabsProps) {
  return (
    <div className="flex gap-1 mb-4 border-b border-white/10 pb-0">
      {(["en", "de"] as Locale[]).map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 -mb-px ${
            activeLocale === loc
              ? "border-brand-gold text-brand-gold"
              : "border-transparent text-white/40 hover:text-white/60"
          }`}
        >
          {loc === "en" ? "English" : "Deutsch"}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Integrate tabs into page editor**

Find the admin content editor (the component that edits page blocks). Add:
1. `LanguageTabs` at the top of the editor
2. State: `const [editLocale, setEditLocale] = useState<"en" | "de">("en")`
3. When `editLocale === "en"`: show and edit the normal block data fields (existing behavior)
4. When `editLocale === "de"`: show the same fields but populated from `block.data.de` (or empty if no `de` key yet)
5. Saving from the DE tab writes the field values into `block.data.de` in the JSON

- [ ] **Step 3: Add "Copy from English" button**

When editing in DE tab, show a button at the top:
```typescript
<button onClick={() => copyFromEnglish()} className="...">
  Copy from English
</button>
```

This copies all field values from the English block data into the German fields as a starting point for translation.

- [ ] **Step 4: Update admin save API**

Ensure the save endpoint preserves the `de` key when saving page configs. Since admin functions use `updateProductConfig` / `updateStaticConfig` which write the full config object, this should work automatically — but verify that the admin editor sends the complete config including `de` keys.

- [ ] **Step 5: Test admin editor**

1. Go to admin → Content → edit a page
2. EN tab should show existing content
3. Switch to DE tab — fields should be empty (or show existing `de` content if already translated)
4. Click "Copy from English" — fields populate with English content
5. Edit some German text, save
6. Verify the JSON file now has a `de` key inside the block data
7. Visit the public German page — should show the translated content

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/ src/app/(admin)/
git commit -m "feat(i18n): add EN|DE language tabs to admin page editor"
```

---

### Task 25: Add "Copy from English" to landing page editor

**Files:**
- Modify: The admin landing page editor (if one exists)

- [ ] **Step 1: Add Copy from English button**

If there is a landing page editor in the admin panel, add a "Copy from English" button that populates `de` keys in the landing page data structure. If no editor exists yet, skip this task — landing pages are currently TypeScript files and would need a different approach.

- [ ] **Step 2: Commit (if applicable)**

```bash
git add src/app/(admin)/
git commit -m "feat(i18n): add Copy from English to landing page editor"
```
