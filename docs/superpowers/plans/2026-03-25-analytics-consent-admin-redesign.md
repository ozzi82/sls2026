# Analytics, Cookie Consent & Admin Panel Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Google Analytics/GTM/Ads integration, OpenReplay heatmap support, a fully customizable cookie consent system, and redesign the admin panel with a proper dashboard — all controlled from admin settings pages.

**Architecture:** File-based JSON config in `content/settings/site-settings.json` (matching existing pattern). In-memory `globalThis` cache for analytics API data with 15-min TTL. Cookie consent is custom-built, no third-party library. All tracking scripts are consent-gated.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, shadcn, Zod validation, `@google-analytics/data`, `@openreplay/tracker`, lucide-react icons

**Spec:** `docs/superpowers/specs/2026-03-25-analytics-consent-admin-redesign-design.md`

---

## Chunk 1: Settings Infrastructure & Admin Redesign

### Task 1: Environment & Gitignore Setup

**Files:**
- Modify: `.gitignore`
- Modify: `.env.local`

- [ ] **Step 1: Update .gitignore**

Add to `.gitignore`:
```
# Site settings (contains integration config)
content/settings/site-settings.json
content/settings/edit-log.json
```

- [ ] **Step 2: Add environment variable placeholder**

Add to `.env.local`:
```
# Google Analytics Data API (JSON string of service account key)
# GOOGLE_SERVICE_ACCOUNT_KEY=
```

- [ ] **Step 3: Create settings directory and default config**

Create `content/settings/site-settings.json`:
```json
{
  "google": {
    "enabled": false,
    "ga4MeasurementId": "",
    "ga4PropertyId": "",
    "gtmContainerId": "",
    "adsConversionId": "",
    "adsConversionLabel": ""
  },
  "openreplay": {
    "enabled": false,
    "serverUrl": "",
    "projectKey": "",
    "ingestPoint": ""
  },
  "cookieConsent": {
    "enabled": false,
    "position": "bottom-bar",
    "title": "We use cookies",
    "description": "We use cookies to improve your experience and analyze site traffic.",
    "acceptAllText": "Accept All",
    "rejectAllText": "Reject All",
    "manageText": "Manage Preferences",
    "privacyPolicyUrl": "/privacy",
    "consentExpiryDays": 365,
    "colors": {
      "bannerBg": "#1a1a1a",
      "bannerText": "#ffffff",
      "acceptBg": "#22c55e",
      "acceptText": "#ffffff",
      "rejectBg": "#374151",
      "rejectText": "#ffffff",
      "manageBg": "transparent",
      "manageText": "#9ca3af"
    },
    "categories": [
      {
        "id": "necessary",
        "name": "Necessary",
        "description": "Essential for the website to function",
        "required": true,
        "integrations": []
      },
      {
        "id": "analytics",
        "name": "Analytics",
        "description": "Help us understand how visitors use our site",
        "required": false,
        "integrations": ["ga4", "openreplay"]
      },
      {
        "id": "marketing",
        "name": "Marketing",
        "description": "Used for advertising and conversion tracking",
        "required": false,
        "integrations": ["gtm", "google-ads"]
      }
    ]
  }
}
```

- [ ] **Step 4: Create empty edit log**

Create `content/settings/edit-log.json`:
```json
[]
```

- [ ] **Step 5: Commit**

```bash
git add .gitignore content/settings/
git commit -m "chore: add settings infrastructure — gitignore, env, default config"
```

---

### Task 2: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Google Analytics Data API client**

```bash
npm install @google-analytics/data
```

- [ ] **Step 2: Install OpenReplay tracker**

```bash
npm install @openreplay/tracker
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @google-analytics/data and @openreplay/tracker dependencies"
```

---

### Task 3: Settings Types & Zod Validation

**Files:**
- Create: `src/lib/admin/site-settings-types.ts`
- Create: `src/lib/admin/site-settings-validation.ts`

- [ ] **Step 1: Create TypeScript types**

Create `src/lib/admin/site-settings-types.ts`:
```typescript
export interface GoogleSettings {
  enabled: boolean
  ga4MeasurementId: string
  ga4PropertyId: string
  gtmContainerId: string
  adsConversionId: string
  adsConversionLabel: string
}

export interface OpenReplaySettings {
  enabled: boolean
  serverUrl: string
  projectKey: string
  ingestPoint: string
}

export interface ConsentCategory {
  id: string
  name: string
  description: string
  required: boolean
  integrations: string[]
}

export interface ConsentColors {
  bannerBg: string
  bannerText: string
  acceptBg: string
  acceptText: string
  rejectBg: string
  rejectText: string
  manageBg: string
  manageText: string
}

export interface CookieConsentSettings {
  enabled: boolean
  position: "bottom-bar" | "bottom-left" | "bottom-right"
  title: string
  description: string
  acceptAllText: string
  rejectAllText: string
  manageText: string
  privacyPolicyUrl: string
  consentExpiryDays: number
  colors: ConsentColors
  categories: ConsentCategory[]
}

export interface SiteSettings {
  google: GoogleSettings
  openreplay: OpenReplaySettings
  cookieConsent: CookieConsentSettings
}

export interface EditLogEntry {
  slug: string
  pageType: "product" | "landing" | "static"
  label: string
  timestamp: string
}

// Public consent config (no secrets) — inlined into layout
export interface PublicConsentConfig {
  enabled: boolean
  position: "bottom-bar" | "bottom-left" | "bottom-right"
  title: string
  description: string
  acceptAllText: string
  rejectAllText: string
  manageText: string
  privacyPolicyUrl: string
  consentExpiryDays: number
  colors: ConsentColors
  categories: ConsentCategory[]
}
```

- [ ] **Step 2: Create Zod validation schemas**

Create `src/lib/admin/site-settings-validation.ts`:
```typescript
import { z } from "zod"

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color")
const hexOrTransparent = z.string().regex(/^(#[0-9a-fA-F]{6}|transparent)$/, "Must be hex color or transparent")

export const googleSettingsSchema = z.object({
  enabled: z.boolean(),
  ga4MeasurementId: z.string().regex(/^(G-[A-Z0-9]+)?$/, "Must match G-XXXXXXXXXX format").or(z.literal("")),
  ga4PropertyId: z.string().regex(/^([0-9]+)?$/, "Must be a numeric property ID").or(z.literal("")),
  gtmContainerId: z.string().regex(/^(GTM-[A-Z0-9]+)?$/, "Must match GTM-XXXXXXX format").or(z.literal("")),
  adsConversionId: z.string().regex(/^(AW-[0-9]+)?$/, "Must match AW-XXXXXXXXX format").or(z.literal("")),
  adsConversionLabel: z.string(),
})

export const openreplaySettingsSchema = z.object({
  enabled: z.boolean(),
  serverUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  projectKey: z.string(),
  ingestPoint: z.string().url("Must be a valid URL").or(z.literal("")),
})

const consentCategorySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Lowercase alphanumeric and hyphens only"),
  name: z.string().min(1, "Category name required"),
  description: z.string(),
  required: z.boolean(),
  integrations: z.array(z.string()),
})

const consentColorsSchema = z.object({
  bannerBg: hexColor,
  bannerText: hexColor,
  acceptBg: hexColor,
  acceptText: hexColor,
  rejectBg: hexColor,
  rejectText: hexColor,
  manageBg: hexOrTransparent,
  manageText: hexColor,
})

export const cookieConsentSettingsSchema = z.object({
  enabled: z.boolean(),
  position: z.enum(["bottom-bar", "bottom-left", "bottom-right"]),
  title: z.string().min(1),
  description: z.string().min(1),
  acceptAllText: z.string().min(1),
  rejectAllText: z.string().min(1),
  manageText: z.string().min(1),
  privacyPolicyUrl: z.string(),
  consentExpiryDays: z.number().int().min(1).max(3650),
  colors: consentColorsSchema,
  categories: z.array(consentCategorySchema).min(1),
})

export const siteSettingsSchema = z.object({
  google: googleSettingsSchema,
  openreplay: openreplaySettingsSchema,
  cookieConsent: cookieConsentSettingsSchema,
})
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/site-settings-types.ts src/lib/admin/site-settings-validation.ts
git commit -m "feat: add site settings types and Zod validation schemas"
```

---

### Task 3: Settings File I/O

**Files:**
- Create: `src/lib/admin/site-settings.ts`

- [ ] **Step 1: Create settings read/write utility**

Create `src/lib/admin/site-settings.ts`:
```typescript
import fs from "fs"
import path from "path"
import type { SiteSettings, EditLogEntry, PublicConsentConfig } from "./site-settings-types"

const SETTINGS_PATH = path.join(process.cwd(), "content/settings/site-settings.json")
const EDIT_LOG_PATH = path.join(process.cwd(), "content/settings/edit-log.json")
const MAX_EDIT_LOG_ENTRIES = 50

export function loadSiteSettings(): SiteSettings {
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8")
    return JSON.parse(raw)
  } catch {
    // Return defaults if file doesn't exist
    return getDefaultSettings()
  }
}

export function saveSiteSettings(settings: SiteSettings): void {
  const dir = path.dirname(SETTINGS_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8")
}

export function getPublicConsentConfig(settings: SiteSettings): PublicConsentConfig {
  const { cookieConsent } = settings
  return {
    enabled: cookieConsent.enabled,
    position: cookieConsent.position,
    title: cookieConsent.title,
    description: cookieConsent.description,
    acceptAllText: cookieConsent.acceptAllText,
    rejectAllText: cookieConsent.rejectAllText,
    manageText: cookieConsent.manageText,
    privacyPolicyUrl: cookieConsent.privacyPolicyUrl,
    consentExpiryDays: cookieConsent.consentExpiryDays,
    colors: cookieConsent.colors,
    categories: cookieConsent.categories,
  }
}

export function loadEditLog(): EditLogEntry[] {
  try {
    const raw = fs.readFileSync(EDIT_LOG_PATH, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function appendEditLog(entry: Omit<EditLogEntry, "timestamp">): void {
  const log = loadEditLog()
  log.unshift({ ...entry, timestamp: new Date().toISOString() })
  // Cap at MAX_EDIT_LOG_ENTRIES
  const trimmed = log.slice(0, MAX_EDIT_LOG_ENTRIES)
  fs.writeFileSync(EDIT_LOG_PATH, JSON.stringify(trimmed, null, 2), "utf-8")
}

function getDefaultSettings(): SiteSettings {
  return {
    google: {
      enabled: false,
      ga4MeasurementId: "",
      ga4PropertyId: "",
      gtmContainerId: "",
      adsConversionId: "",
      adsConversionLabel: "",
    },
    openreplay: {
      enabled: false,
      serverUrl: "",
      projectKey: "",
      ingestPoint: "",
    },
    cookieConsent: {
      enabled: false,
      position: "bottom-bar",
      title: "We use cookies",
      description: "We use cookies to improve your experience and analyze site traffic.",
      acceptAllText: "Accept All",
      rejectAllText: "Reject All",
      manageText: "Manage Preferences",
      privacyPolicyUrl: "/privacy",
      consentExpiryDays: 365,
      colors: {
        bannerBg: "#1a1a1a",
        bannerText: "#ffffff",
        acceptBg: "#22c55e",
        acceptText: "#ffffff",
        rejectBg: "#374151",
        rejectText: "#ffffff",
        manageBg: "transparent",
        manageText: "#9ca3af",
      },
      categories: [
        { id: "necessary", name: "Necessary", description: "Essential for the website to function", required: true, integrations: [] },
        { id: "analytics", name: "Analytics", description: "Help us understand how visitors use our site", required: false, integrations: ["ga4", "openreplay"] },
        { id: "marketing", name: "Marketing", description: "Used for advertising and conversion tracking", required: false, integrations: ["gtm", "google-ads"] },
      ],
    },
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/admin/site-settings.ts
git commit -m "feat: add site settings file I/O with edit log tracking"
```

---

### Task 4: Settings API Routes

**Files:**
- Create: `src/app/api/admin/settings/route.ts`

- [ ] **Step 1: Create settings GET/PUT API**

Create `src/app/api/admin/settings/route.ts`:
```typescript
import { NextResponse } from "next/server"
import { loadSiteSettings, saveSiteSettings } from "@/lib/admin/site-settings"
import { siteSettingsSchema } from "@/lib/admin/site-settings-validation"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const settings = loadSiteSettings()
    // Include whether Google service account is configured
    const hasServiceAccount = !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    return NextResponse.json({ ...settings, hasServiceAccount })
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const result = siteSettingsSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      )
    }

    saveSiteSettings(result.data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify the route works**

Run: `npm run dev` and test:
- `GET http://localhost:3000/api/admin/settings` — should return default settings
- `PUT http://localhost:3000/api/admin/settings` with valid JSON — should save

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/settings/
git commit -m "feat: add settings API route with Zod validation"
```

---

### Task 5: Admin Panel Sidebar Redesign

**Files:**
- Modify: `src/app/(admin)/admin/layout.tsx`

- [ ] **Step 1: Redesign the admin layout with new sidebar navigation**

Replace the sidebar section of `src/app/(admin)/admin/layout.tsx` with the new navigation structure:

**New sidebar sections:**
- **Main:** Dashboard
- **Content:** Product Pages (`/admin/content/products`), Landing Pages (`/admin/content/landing-pages`), Static Pages (`/admin/content/static-pages`), + New Landing Page (`/admin/pages/new`)
- **Integrations:** Google Analytics (`/admin/integrations/google`), Heatmap & Sessions (`/admin/integrations/openreplay`), Cookie Consent (`/admin/integrations/cookie-consent`)

Use lucide-react icons:
- Dashboard: `LayoutDashboard`
- Product Pages: `Package`
- Landing Pages: `FileText`
- Static Pages: `File`
- New Landing Page: `FilePlus`
- Google Analytics: `BarChart3`
- Heatmap & Sessions: `MousePointerClick`
- Cookie Consent: `Cookie`

Add section headers ("Main", "Content", "Integrations") styled as muted uppercase labels.

Use `usePathname()` for active state — highlight if pathname starts with the nav item's href.

- [ ] **Step 2: Verify sidebar renders correctly**

Run: `npm run dev` → navigate to `/admin` → verify:
- All sections and links visible
- Active state highlights correctly
- Links navigate to correct routes (even if pages don't exist yet — they'll show 404)

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/layout.tsx
git commit -m "feat: redesign admin sidebar with content & integrations sections"
```

---

### Task 6: Content Management Pages (Move from Dashboard Tabs)

**Files:**
- Create: `src/app/(admin)/admin/content/products/page.tsx`
- Create: `src/app/(admin)/admin/content/landing-pages/page.tsx`
- Create: `src/app/(admin)/admin/content/static-pages/page.tsx`

- [ ] **Step 1: Extract Product Pages tab into standalone page**

Create `src/app/(admin)/admin/content/products/page.tsx`:

Extract the product pages table from the current dashboard (`src/app/(admin)/admin/page.tsx`, the "Product Pages" tab content). This page should:
- Fetch from `GET /api/admin/products`
- Display the same table with search functionality
- Include page title "Product Pages" as an `<h1>`
- Keep the same columns: Name, Route, Blocks, Hidden, Preview link

- [ ] **Step 2: Extract Landing Pages tab into standalone page**

Create `src/app/(admin)/admin/content/landing-pages/page.tsx`:

Extract the landing pages table from the dashboard. This page should:
- Fetch from `GET /api/admin/pages`
- Display the same table with hub filter and search
- Include delete functionality
- Include "New Landing Page" button linking to `/admin/pages/new`
- Page title: "Landing Pages"

- [ ] **Step 3: Extract Static Pages tab into standalone page**

Create `src/app/(admin)/admin/content/static-pages/page.tsx`:

Extract the static pages table from the dashboard. This page should:
- Fetch from `GET /api/admin/static-pages`
- Display the same table with search
- Page title: "Static Pages"

- [ ] **Step 4: Verify all three pages work**

Run: `npm run dev` → navigate to each:
- `/admin/content/products` — shows product pages table
- `/admin/content/landing-pages` — shows landing pages with hub filter
- `/admin/content/static-pages` — shows static pages table

- [ ] **Step 5: Commit**

```bash
git add src/app/(admin)/admin/content/
git commit -m "feat: extract content management into standalone admin pages"
```

---

## Chunk 2: Integration Settings Pages

### Task 7: Google Analytics Settings Page

**Files:**
- Create: `src/app/(admin)/admin/integrations/google/page.tsx`

- [ ] **Step 1: Build Google Analytics settings page**

Create `src/app/(admin)/admin/integrations/google/page.tsx` as a `"use client"` component:

**Layout:**
- Page title: "Google Analytics & Ads"
- Description text: "Configure Google Analytics 4, Tag Manager, and Google Ads conversion tracking."

**Form fields (each with label, input, help text):**
- **Enable Google Integration** — toggle switch
- **GA4 Measurement ID** — text input, placeholder `G-XXXXXXXXXX`, help: "Found in GA4 Admin → Data Streams"
- **GA4 Property ID** — text input, placeholder `123456789`, help: "Numeric ID found in GA4 Admin → Property Settings. Required for dashboard analytics."
- **GTM Container ID** — text input, placeholder `GTM-XXXXXXX`, help: "Found in GTM workspace header"
- **Google Ads Conversion ID** — text input, placeholder `AW-XXXXXXXXX`
- **Google Ads Conversion Label** — text input

**Double-tracking warning:** When both GA4 Measurement ID and GTM Container ID are filled, show a yellow notice: "When GTM is enabled, GA4 is typically managed through GTM. The direct GA4 script will be disabled to prevent double-tracking."

**Service Account status:** Read-only indicator showing whether `GOOGLE_SERVICE_ACCOUNT_KEY` env var is configured (from the `hasServiceAccount` field in GET response). If not configured, show: "To see analytics on the dashboard, set the GOOGLE_SERVICE_ACCOUNT_KEY environment variable."

**Save button:** PUTs to `/api/admin/settings` with the full settings object. Show success/error toast via `sonner`.

**Data flow:**
- On mount: `GET /api/admin/settings` → populate form
- On save: merge google fields into full settings → `PUT /api/admin/settings`
- Use Zod client-side validation before submit (import `googleSettingsSchema`)

- [ ] **Step 2: Verify the page works**

Run: `npm run dev` → `/admin/integrations/google`:
- Form loads with default values
- Enter a GA4 ID like `G-TEST123` → Save → Reload → value persists
- Enter invalid ID like `INVALID` → validation error shown

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/integrations/google/
git commit -m "feat: add Google Analytics/GTM/Ads settings page"
```

---

### Task 8: OpenReplay Settings Page

**Files:**
- Create: `src/app/(admin)/admin/integrations/openreplay/page.tsx`

- [ ] **Step 1: Build OpenReplay settings page**

Create `src/app/(admin)/admin/integrations/openreplay/page.tsx` as a `"use client"` component:

**Layout:**
- Page title: "Heatmap & Session Recording"
- Description: "Configure OpenReplay for session recording, heatmaps, and user behavior analysis."
- Info banner: "OpenReplay requires a self-hosted server. Deploy via Docker/Coolify on your server, then enter the connection details below."

**Form fields:**
- **Enable OpenReplay** — toggle switch
- **Server URL** — text input, placeholder `https://openreplay.yourdomain.com`
- **Project Key** — text input, help: "Found in OpenReplay → Project Settings"
- **Ingest Point** — text input (optional), help: "Override the default data collection endpoint"

**Status indicator:** When not configured (empty serverUrl or projectKey), show: "Not connected — enter server URL and project key to activate."

**Save button:** Same pattern as Google settings — merge into full settings, PUT, toast feedback.

- [ ] **Step 2: Verify the page works**

Run: `npm run dev` → `/admin/integrations/openreplay`:
- Form loads with defaults
- Save with valid URL → persists
- Save with invalid URL → validation error

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/integrations/openreplay/
git commit -m "feat: add OpenReplay settings page"
```

---

### Task 9: Cookie Consent Settings Page

**Files:**
- Create: `src/app/(admin)/admin/integrations/cookie-consent/page.tsx`

- [ ] **Step 1: Build Cookie Consent settings page**

Create `src/app/(admin)/admin/integrations/cookie-consent/page.tsx` as a `"use client"` component:

This is the most complex settings page. Organize into collapsible sections:

**Section 1: General**
- **Enable Cookie Consent Banner** — toggle
- **Banner Position** — select: "Bottom Bar", "Bottom Left", "Bottom Right"
- **Privacy Policy URL** — text input
- **Consent Expiry (days)** — number input (1-3650)

**Section 2: Text Customization**
- **Banner Title** — text input
- **Banner Description** — textarea
- **Accept All Button Text** — text input
- **Reject All Button Text** — text input
- **Manage Preferences Button Text** — text input

**Section 3: Colors**
Display color pickers (native `<input type="color">`) in a grid:
- Banner Background / Banner Text
- Accept Button Background / Accept Button Text
- Reject Button Background / Reject Button Text
- Manage Button Background / Manage Button Text

For "Manage Button Background", since it can be `transparent`, add a checkbox "Transparent background" that overrides the color picker.

**Section 4: Cookie Categories**
- List of category cards, each showing: name, description, required badge, integrations list
- "Add Category" button at the bottom
- Each category card has:
  - Name input
  - Description textarea
  - Required toggle (disabled for the first "necessary" category)
  - Integrations multi-select (checkboxes): ga4, gtm, google-ads, openreplay
  - Delete button (disabled for "necessary" category)
- ID auto-generated from name (lowercase, spaces→hyphens)

**Live Preview:** At the bottom, show a small preview of how the banner will look with current settings (simplified mockup using the configured colors and text).

**Save button:** Same pattern — full settings merge, PUT, toast.

- [ ] **Step 2: Verify the page works**

Run: `npm run dev` → `/admin/integrations/cookie-consent`:
- All sections expand/collapse
- Color pickers work
- Add/remove categories works
- Save persists all values
- Live preview updates with changes

- [ ] **Step 3: Commit**

```bash
git add src/app/(admin)/admin/integrations/cookie-consent/
git commit -m "feat: add cookie consent settings page with full customization"
```

---

## Chunk 3: Frontend Components (Consent & Tracking)

### Task 10: Cookie Consent Frontend Component

**Files:**
- Create: `src/components/CookieConsent.tsx`
- Create: `src/lib/consent.ts`

- [ ] **Step 1: Create consent utility**

Create `src/lib/consent.ts`:
```typescript
import type { PublicConsentConfig, ConsentCategory } from "@/lib/admin/site-settings-types"

const CONSENT_COOKIE_NAME = "cookie_consent"

export interface ConsentState {
  accepted: string[]  // Array of accepted category IDs
  timestamp: string
}

export function getConsentState(): ConsentState | null {
  if (typeof document === "undefined") return null
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`))
  if (!cookie) return null
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]))
  } catch {
    return null
  }
}

export function setConsentState(accepted: string[], expiryDays: number): void {
  const state: ConsentState = {
    accepted,
    timestamp: new Date().toISOString(),
  }
  const expires = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))};expires=${expires};path=/;SameSite=Lax`
}

export function hasConsentFor(integrationId: string, categories: ConsentCategory[]): boolean {
  const state = getConsentState()
  if (!state) return false
  return categories.some(
    (cat) =>
      (cat.required || state.accepted.includes(cat.id)) &&
      cat.integrations.includes(integrationId)
  )
}

export function revokeConsentCookies(revokedCategories: string[], categories: ConsentCategory[]): void {
  // Find integrations in revoked categories
  const revokedIntegrations = categories
    .filter((cat) => revokedCategories.includes(cat.id))
    .flatMap((cat) => cat.integrations)

  // Delete known cookies for each integration
  const cookiesToDelete: Record<string, string[]> = {
    ga4: ["_ga", "_ga_*", "_gid"],
    gtm: ["_gcl_au"],
    "google-ads": ["_gcl_aw", "_gcl_dc"],
    openreplay: ["__openreplay_*"],
  }

  for (const integration of revokedIntegrations) {
    const cookies = cookiesToDelete[integration] || []
    for (const name of cookies) {
      const deleteCookie = (cookieName: string) => {
        const hostname = window.location.hostname
        // Try all domain variants to catch cross-subdomain cookies
        const domains = [hostname, `.${hostname}`, ""]
        for (const domain of domains) {
          const domainStr = domain ? `;domain=${domain}` : ""
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainStr}`
        }
      }

      if (name.includes("*")) {
        // Wildcard — delete all matching
        const prefix = name.replace("*", "")
        document.cookie.split("; ").forEach((c) => {
          const cookieName = c.split("=")[0]
          if (cookieName.startsWith(prefix)) {
            deleteCookie(cookieName)
          }
        })
      } else {
        deleteCookie(name)
      }
    }
  }
}
```

- [ ] **Step 2: Create CookieConsent component**

Create `src/components/CookieConsent.tsx` as a `"use client"` component:

**Behavior:**
- Reads consent config from `window.__CONSENT_CONFIG__` (inlined by server)
- If consent config not enabled, render nothing
- If consent already given (cookie exists), render only a small "Cookie Settings" floating button (bottom-left, pill-shaped)
- If no consent yet, render the full banner

**Banner UI (based on `position` setting):**
- `bottom-bar`: Full-width bar at bottom of viewport, fixed position
- `bottom-left` / `bottom-right`: Card popup in the corner

**Banner content:**
- Title (h3)
- Description paragraph
- Privacy policy link
- Three buttons: Accept All, Reject All, Manage Preferences
- Colors from config

**Manage Preferences modal:**
- When "Manage Preferences" clicked, show a modal/overlay
- Lists all categories with toggle switches
- "Necessary" category toggle is disabled (always on)
- Each category shows: name, description, integrations listed
- "Save Preferences" button at bottom

**On Accept All:** Set consent for all category IDs → close banner → dispatch `consent-updated` custom event
**On Reject All:** Set consent for only required categories → close banner → dispatch event → call `revokeConsentCookies` for non-required categories
**On Save Preferences:** Set consent for selected categories → close banner → dispatch event → call `revokeConsentCookies` for deselected categories

**"Cookie Settings" button:** When clicked, re-opens the Manage Preferences modal with current selections.

- [ ] **Step 3: Verify consent component**

Run: `npm run dev` → visit homepage:
- Banner should not show (consent not enabled in settings yet)
- Enable consent in admin → reload → banner appears
- Accept → banner disappears, cookie set, floating button visible
- Click floating button → preferences modal opens

- [ ] **Step 4: Commit**

```bash
git add src/components/CookieConsent.tsx src/lib/consent.ts
git commit -m "feat: add cookie consent banner with category management"
```

---

### Task 11: Tracking Scripts Component

**Files:**
- Create: `src/components/TrackingScripts.tsx`
- Create: `src/components/OpenReplayTracker.tsx`

- [ ] **Step 1: Create TrackingScripts component**

Create `src/components/TrackingScripts.tsx` as a `"use client"` component:

```typescript
"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { getConsentState } from "@/lib/consent"
import type { GoogleSettings, CookieConsentSettings } from "@/lib/admin/site-settings-types"

interface Props {
  google: GoogleSettings
  consentCategories: CookieConsentSettings["categories"]
}

export default function TrackingScripts({ google, consentCategories }: Props) {
  const [consented, setConsented] = useState<string[]>([])

  useEffect(() => {
    function checkConsent() {
      const state = getConsentState()
      setConsented(state?.accepted || [])
    }
    checkConsent()
    // Listen for consent changes
    window.addEventListener("consent-updated", checkConsent)
    return () => window.removeEventListener("consent-updated", checkConsent)
  }, [])

  if (!google.enabled) return null

  // Determine which integrations have consent
  const hasAnalyticsConsent = consentCategories.some(
    (cat) => consented.includes(cat.id) && cat.integrations.includes("ga4")
  )
  const hasMarketingConsent = consentCategories.some(
    (cat) => consented.includes(cat.id) && cat.integrations.includes("gtm")
  )

  // Double-tracking guard: if GTM is enabled, skip direct GA4
  const useDirectGA4 = google.ga4MeasurementId && !google.gtmContainerId
  const useGTM = google.gtmContainerId

  return (
    <>
      {/* GTM */}
      {useGTM && hasMarketingConsent && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${google.gtmContainerId}');`,
            }}
          />
        </>
      )}

      {/* Direct GA4 (only if no GTM) */}
      {useDirectGA4 && hasAnalyticsConsent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${google.ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${google.ga4MeasurementId}');`,
            }}
          />
        </>
      )}

      {/* Google Ads conversion — only when direct GA4 is active (gtag exists) */}
      {/* When GTM is enabled, Ads conversion should be configured through GTM */}
      {google.adsConversionId && !useGTM && hasMarketingConsent && (
        <Script
          id="gads-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `gtag('config','${google.adsConversionId}');`,
          }}
        />
      )}
    </>
  )
}
```

- [ ] **Step 2: Create OpenReplayTracker component**

Create `src/components/OpenReplayTracker.tsx` as a `"use client"` component:

```typescript
"use client"

import { useEffect, useRef } from "react"
import { getConsentState } from "@/lib/consent"
import type { OpenReplaySettings, CookieConsentSettings } from "@/lib/admin/site-settings-types"

interface Props {
  openreplay: OpenReplaySettings
  consentCategories: CookieConsentSettings["categories"]
}

export default function OpenReplayTracker({ openreplay, consentCategories }: Props) {
  const trackerRef = useRef<any>(null)

  useEffect(() => {
    if (!openreplay.enabled || !openreplay.serverUrl || !openreplay.projectKey) return

    async function initTracker() {
      const state = getConsentState()
      const accepted = state?.accepted || []
      const hasConsent = consentCategories.some(
        (cat) => accepted.includes(cat.id) && cat.integrations.includes("openreplay")
      )
      if (!hasConsent) return

      // Dynamic import to avoid bundling in initial load
      const { default: Tracker } = await import("@openreplay/tracker")
      if (trackerRef.current) return // Already initialized

      const tracker = new Tracker({
        projectKey: openreplay.projectKey,
        ingestPoint: openreplay.ingestPoint || `${openreplay.serverUrl}/ingest`,
      })
      tracker.start()
      trackerRef.current = tracker
    }

    initTracker()

    // Listen for consent changes
    function onConsentChange() {
      if (!trackerRef.current) {
        initTracker()
      }
    }
    window.addEventListener("consent-updated", onConsentChange)
    return () => window.removeEventListener("consent-updated", onConsentChange)
  }, [openreplay, consentCategories])

  return null
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TrackingScripts.tsx src/components/OpenReplayTracker.tsx
git commit -m "feat: add consent-gated tracking scripts and OpenReplay tracker"
```

---

### Task 12: Integrate Components into Public Layout

**Files:**
- Modify: `src/app/(public)/layout.tsx` (tracking components + GTM noscript)

- [ ] **Step 1: Add tracking and consent to public layout**

Modify `src/app/(public)/layout.tsx`:

At the top, import and call `loadSiteSettings` and `getPublicConsentConfig` (server-side):
```typescript
import { loadSiteSettings, getPublicConsentConfig } from "@/lib/admin/site-settings"
import CookieConsent from "@/components/CookieConsent"
import TrackingScripts from "@/components/TrackingScripts"
import OpenReplayTracker from "@/components/OpenReplayTracker"
```

In the component body (this is a server component):
```typescript
const settings = loadSiteSettings()
const consentConfig = getPublicConsentConfig(settings)
```

In the JSX, after `<MobileCTABar />`:
1. Inline consent config as a `<script>` tag:
```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `window.__CONSENT_CONFIG__=${JSON.stringify(consentConfig)};`,
  }}
/>
```
2. Add `<CookieConsent />`
3. Add `<TrackingScripts google={settings.google} consentCategories={settings.cookieConsent.categories} />`
4. Add `<OpenReplayTracker openreplay={settings.openreplay} consentCategories={settings.cookieConsent.categories} />`

- [ ] **Step 2: Add GTM noscript fallback to public layout**

In `src/app/(public)/layout.tsx`, right after `<main>` opening, add conditionally (server-side):
```tsx
{settings.google.enabled && settings.google.gtmContainerId && (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${settings.google.gtmContainerId}`}
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
)}
```
Note: This goes in the public layout (not root layout) to avoid rendering on admin pages.

- [ ] **Step 3: Verify integration**

Run: `npm run dev`:
- Visit homepage → no banner (consent disabled by default)
- Enable consent in admin → reload → banner appears
- Accept All → check DevTools cookies → `cookie_consent` set
- Configure a GA4 ID → Accept analytics → check Network tab → GA script loaded
- Reject All → GA script not loaded

- [ ] **Step 4: Commit**

```bash
git add src/app/(public)/layout.tsx src/app/layout.tsx
git commit -m "feat: integrate consent banner and tracking scripts into public layout"
```

---

## Chunk 4: Dashboard & Analytics Widgets

### Task 13: Internal Analytics API Route

**Files:**
- Create: `src/app/api/admin/analytics/internal/route.ts`

- [ ] **Step 1: Create internal analytics endpoint**

Create `src/app/api/admin/analytics/internal/route.ts`:

```typescript
import { NextResponse } from "next/server"
import { getAllProductConfigs, getAllStaticConfigs } from "@/lib/admin/page-config"
import { getAllPages } from "@/lib/admin/pages"
import { loadEditLog } from "@/lib/admin/site-settings"
import type { PageConfig } from "@/lib/admin/page-config-types"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const products = getAllProductConfigs()
    const statics = getAllStaticConfigs()
    const landingPages = getAllPages()
    const editLog = loadEditLog()

    // SEO health check
    const allConfigs: PageConfig[] = [
      ...products.map((p) => p),
      ...statics.map((s) => s),
    ]

    const seoIssues = allConfigs
      .filter((c) => {
        const seo = c.seo
        return !seo.metaDescription || !seo.title || !seo.ogImage
      })
      .map((c) => ({
        slug: c.slug,
        label: c.label,
        pageType: c.pageType,
        missing: [
          ...(!c.seo.title ? ["title"] : []),
          ...(!c.seo.metaDescription ? ["metaDescription"] : []),
          ...(!c.seo.ogImage ? ["ogImage"] : []),
        ],
      }))

    return NextResponse.json({
      counts: {
        products: products.length,
        landingPages: landingPages.length,
        staticPages: statics.length,
        totalBlocks: allConfigs.reduce((sum, c) => sum + c.blocks.length, 0),
      },
      seoIssues,
      recentEdits: editLog.slice(0, 5),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/analytics/internal/
git commit -m "feat: add internal analytics API (content stats, SEO health, recent edits)"
```

---

### Task 14: Google Analytics Data API Route

**Files:**
- Create: `src/app/api/admin/analytics/google/route.ts`
- Create: `src/lib/admin/analytics-cache.ts`

- [ ] **Step 1: Create in-memory cache utility**

Create `src/lib/admin/analytics-cache.ts`:
```typescript
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

// Use globalThis to persist across serverless invocations in same instance
const cache = (globalThis as any).__analyticsCache ||= new Map<string, CacheEntry<any>>()

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.data
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() })
}
```

- [ ] **Step 2: Create GA4 Data API route**

Create `src/app/api/admin/analytics/google/route.ts`:
```typescript
import { NextResponse } from "next/server"
import { loadSiteSettings } from "@/lib/admin/site-settings"
import { getCached, setCache } from "@/lib/admin/analytics-cache"

export const dynamic = "force-dynamic"

const CACHE_KEY = "google-analytics"

export async function GET() {
  try {
    const settings = loadSiteSettings()

    if (!settings.google.enabled || !settings.google.ga4MeasurementId) {
      return NextResponse.json({ configured: false, message: "Google Analytics not configured" })
    }

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!serviceAccountKey) {
      return NextResponse.json({ configured: false, message: "Service account key not configured" })
    }

    // Check cache
    const cached = getCached(CACHE_KEY)
    if (cached) {
      return NextResponse.json({ configured: true, cached: true, ...cached })
    }

    // Fetch from GA4 Data API
    const { BetaAnalyticsDataClient } = await import("@google-analytics/data")
    const credentials = JSON.parse(serviceAccountKey)
    const analyticsClient = new BetaAnalyticsDataClient({ credentials })

    // GA4 Property ID (numeric) — separate from Measurement ID (G-xxx)
    const propertyId = settings.google.ga4PropertyId
    if (!propertyId) {
      return NextResponse.json({ configured: false, message: "GA4 Property ID not configured" })
    }
    const property = `properties/${propertyId}`

    // Fetch visitors — separate calls per date range for reliable parsing
    const [todayRes, weekRes, monthRes, topPagesRes, sourcesRes] = await Promise.all([
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
    ])

    const getMetric = (res: any, idx: number) => res[0]?.rows?.[0]?.metricValues?.[idx]?.value || "0"

    const data = {
      visitors: {
        today: getMetric(todayRes, 0),
        week: getMetric(weekRes, 0),
        month: getMetric(monthRes, 0),
      },
      pageViews: {
        today: getMetric(todayRes, 1),
        week: getMetric(weekRes, 1),
        month: getMetric(monthRes, 1),
      },
      topPages: (topPagesRes[0].rows || []).map((row: any) => ({
        path: row.dimensionValues?.[0]?.value || "",
        views: row.metricValues?.[0]?.value || "0",
      })),
      trafficSources: (sourcesRes[0].rows || []).map((row: any) => ({
        source: row.dimensionValues?.[0]?.value || "(direct)",
        sessions: row.metricValues?.[0]?.value || "0",
      })),
    }

    setCache(CACHE_KEY, data)
    return NextResponse.json({ configured: true, cached: false, ...data })
  } catch (error: any) {
    console.error("GA4 API error:", error)
    return NextResponse.json(
      { configured: true, error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/analytics-cache.ts src/app/api/admin/analytics/google/
git commit -m "feat: add GA4 Data API route with in-memory caching"
```

---

### Task 15: OpenReplay Analytics API Route

**Files:**
- Create: `src/app/api/admin/analytics/openreplay/route.ts`

- [ ] **Step 1: Create OpenReplay API route**

Create `src/app/api/admin/analytics/openreplay/route.ts`:
```typescript
import { NextResponse } from "next/server"
import { loadSiteSettings } from "@/lib/admin/site-settings"
import { getCached, setCache } from "@/lib/admin/analytics-cache"

export const dynamic = "force-dynamic"

const CACHE_KEY = "openreplay-analytics"

export async function GET() {
  try {
    const settings = loadSiteSettings()

    if (!settings.openreplay.enabled || !settings.openreplay.serverUrl || !settings.openreplay.projectKey) {
      return NextResponse.json({
        configured: false,
        message: "OpenReplay not configured — requires self-hosted server",
      })
    }

    // Check cache
    const cached = getCached(CACHE_KEY)
    if (cached) {
      return NextResponse.json({ configured: true, cached: true, ...cached })
    }

    const { serverUrl, projectKey } = settings.openreplay

    // Fetch from OpenReplay API
    // Note: OpenReplay API endpoints may vary by version
    const [sessionsRes] = await Promise.all([
      fetch(`${serverUrl}/api/v1/${projectKey}/sessions/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 5,
          startDate: Date.now() - 24 * 60 * 60 * 1000,
          endDate: Date.now(),
        }),
      }).catch(() => null),
    ])

    const sessionsData = sessionsRes?.ok ? await sessionsRes.json() : null

    const data = {
      activeSessions: sessionsData?.total || 0,
      recentSessions: (sessionsData?.sessions || []).slice(0, 5).map((s: any) => ({
        id: s.sessionId,
        duration: s.duration,
        pages: s.pagesCount,
        url: `${serverUrl}/session/${s.sessionId}`,
      })),
    }

    setCache(CACHE_KEY, data)
    return NextResponse.json({ configured: true, cached: false, ...data })
  } catch (error: any) {
    console.error("OpenReplay API error:", error)
    return NextResponse.json(
      { configured: true, error: error.message || "Failed to fetch OpenReplay data" },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/analytics/openreplay/
git commit -m "feat: add OpenReplay analytics API route with caching"
```

---

### Task 16: Dashboard Redesign with Widgets

**Files:**
- Modify: `src/app/(admin)/admin/page.tsx` (complete rewrite)
- Create: `src/components/admin/dashboard/DashboardWidget.tsx`
- Create: `src/components/admin/dashboard/ContentOverviewWidget.tsx`
- Create: `src/components/admin/dashboard/SeoHealthWidget.tsx`
- Create: `src/components/admin/dashboard/RecentEditsWidget.tsx`
- Create: `src/components/admin/dashboard/GoogleAnalyticsWidgets.tsx`
- Create: `src/components/admin/dashboard/OpenReplayWidgets.tsx`

- [ ] **Step 1: Create base DashboardWidget wrapper**

Create `src/components/admin/dashboard/DashboardWidget.tsx`:

A reusable card wrapper with:
- Title (with optional icon)
- Loading state (skeleton)
- Error state
- "Not configured" state with link to settings page
- Content slot (children)

Style: rounded card with border, padded, consistent with admin UI.

- [ ] **Step 2: Create internal stat widgets**

Create `src/components/admin/dashboard/ContentOverviewWidget.tsx`:
- Fetches from `GET /api/admin/analytics/internal`
- Shows: Product count, Landing page count, Static page count, Total blocks
- Each stat as a number with label, arranged in a 2x2 grid

Create `src/components/admin/dashboard/SeoHealthWidget.tsx`:
- Uses same data from internal analytics
- Lists pages with missing SEO fields
- Each item shows: page label, what's missing (title/description/ogImage)
- If no issues: green checkmark "All pages have complete SEO"

Create `src/components/admin/dashboard/RecentEditsWidget.tsx`:
- Uses `recentEdits` from internal analytics
- Lists last 5 edits: page label, page type badge, relative timestamp
- If empty: "No recent edits"

- [ ] **Step 3: Create Google Analytics widgets**

Create `src/components/admin/dashboard/GoogleAnalyticsWidgets.tsx`:

Exports three widget components:

**VisitorsWidget:**
- Fetches from `GET /api/admin/analytics/google`
- Shows visitors count for today/week/month in a row
- If not configured: "Configure Google Analytics" link to `/admin/integrations/google`

**TopPagesWidget:**
- Shows top 5 pages by views
- Each row: page path + view count

**TrafficSourcesWidget:**
- Shows top traffic sources as horizontal bar segments
- Each source: name + session count

- [ ] **Step 4: Create OpenReplay widgets**

Create `src/components/admin/dashboard/OpenReplayWidgets.tsx`:

Exports two widget components:

**ActiveSessionsWidget:**
- Fetches from `GET /api/admin/analytics/openreplay`
- Shows active session count as a large number
- If not configured: info message about needing self-hosted server + link to settings

**RecentRecordingsWidget:**
- Lists last 5 session recordings
- Each: duration, page count, link to OpenReplay UI

- [ ] **Step 5: Rewrite dashboard page**

Rewrite `src/app/(admin)/admin/page.tsx`:

Replace the existing tab-based dashboard with a widget grid layout:

```tsx
"use client"

// Page title: "Dashboard"
// Grid layout: responsive grid, 1 col on mobile, 2 cols on md, 3 cols on lg

// Row 1: Key metrics
// - Content Overview (1 col)
// - Visitors (1 col) — GA4
// - Active Sessions (1 col) — OpenReplay

// Row 2: Details
// - Top Pages (1 col) — GA4
// - Traffic Sources (1 col) — GA4
// - SEO Health (1 col)

// Row 3: Activity
// - Recent Edits (1 col)
// - Recent Recordings (2 cols) — OpenReplay
```

Each widget fetches its own data independently. Use `useEffect` + `useState` pattern.

- [ ] **Step 6: Verify dashboard**

Run: `npm run dev` → `/admin`:
- Widget grid renders with internal stats populated
- GA4 widgets show "Configure" state (not configured yet)
- OpenReplay widgets show "Not configured" state
- Responsive layout works on different screen widths

- [ ] **Step 7: Commit**

```bash
git add src/components/admin/dashboard/ src/app/(admin)/admin/page.tsx
git commit -m "feat: redesign dashboard with analytics widget grid"
```

---

## Chunk 5: Edit Log Integration & Final Wiring

### Task 17: Wire Edit Log into Existing Save Endpoints

**Files:**
- Modify: `src/app/api/admin/products/[slug]/route.ts`
- Modify: `src/app/api/admin/static-pages/[slug]/route.ts`
- Modify: `src/app/api/admin/pages/route.ts`

- [ ] **Step 1: Add edit log to product page saves**

In `src/app/api/admin/products/[slug]/route.ts`, in the PUT handler, after `updateProductConfig()`:
```typescript
import { appendEditLog } from "@/lib/admin/site-settings"

// After saving config:
appendEditLog({
  slug: config.slug,
  pageType: "product",
  label: config.label,
})
```

- [ ] **Step 2: Add edit log to static page saves**

Same pattern in `src/app/api/admin/static-pages/[slug]/route.ts` PUT handler.

- [ ] **Step 3: Add edit log to landing page saves**

In `src/app/api/admin/pages/route.ts`, add to both the POST handler (new page) and in the individual page PUT route if it exists, or in the pages update endpoint.

Also check `src/app/api/admin/pages/[slug]/route.ts` for PUT handler.

- [ ] **Step 4: Verify edit log**

Run: `npm run dev`:
- Edit a product page → save
- Check `content/settings/edit-log.json` → should have an entry
- Visit dashboard → Recent Edits widget shows the edit

- [ ] **Step 5: Commit**

```bash
git add src/app/api/admin/products/ src/app/api/admin/static-pages/ src/app/api/admin/pages/
git commit -m "feat: wire edit log tracking into all content save endpoints"
```

---

### Task 19: Final Build Verification & Cleanup

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Fix any errors.

- [ ] **Step 2: Manual smoke test**

1. Start dev server: `npm run dev`
2. Visit `/admin` → Dashboard with widget grid
3. Navigate sidebar → Content pages work
4. `/admin/integrations/google` → configure GA4 ID → save → reload → persists
5. `/admin/integrations/openreplay` → shows "not configured" status
6. `/admin/integrations/cookie-consent` → customize all fields → save
7. Visit homepage → cookie banner appears (if enabled)
8. Accept → banner closes, floating button appears
9. Click floating button → preferences modal opens
10. Check DevTools → tracking scripts only load after consent

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: build errors and smoke test fixes"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Environment & gitignore setup | `.gitignore`, `.env.local`, `content/settings/` |
| 2 | Install dependencies | `package.json` |
| 3 | Settings types & Zod validation | `site-settings-types.ts`, `site-settings-validation.ts` |
| 4 | Type declarations | `global.d.ts` |
| 5 | Settings file I/O | `site-settings.ts` |
| 6 | Settings API route | `api/admin/settings/route.ts` |
| 7 | Admin sidebar redesign | `admin/layout.tsx` |
| 8 | Content management pages | `admin/content/products/`, `landing-pages/`, `static-pages/` |
| 9 | Google Analytics settings | `admin/integrations/google/page.tsx` |
| 10 | OpenReplay settings | `admin/integrations/openreplay/page.tsx` |
| 11 | Cookie consent settings | `admin/integrations/cookie-consent/page.tsx` |
| 12 | Cookie consent component | `CookieConsent.tsx`, `consent.ts` |
| 13 | Tracking scripts | `TrackingScripts.tsx`, `OpenReplayTracker.tsx` |
| 14 | Layout integration | `(public)/layout.tsx` |
| 15 | Internal analytics API | `api/admin/analytics/internal/route.ts` |
| 16 | GA4 Data API route | `api/admin/analytics/google/route.ts`, `analytics-cache.ts` |
| 17 | OpenReplay API route | `api/admin/analytics/openreplay/route.ts` |
| 18 | Dashboard widgets | `admin/dashboard/` components, `admin/page.tsx` |
| 19 | Final build verification | All files |
