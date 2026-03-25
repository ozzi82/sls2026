# Analytics, Cookie Consent & Admin Panel Redesign — Design Spec

**Date:** 2026-03-25
**Status:** Approved

## Overview

Add Google Analytics/GTM/Ads integration, OpenReplay heatmap/session recording support, and a fully customizable cookie consent system — all controlled from a redesigned admin panel with a proper dashboard featuring analytics widgets.

## Architecture Decisions

- **File-based config** — `content/settings/site-settings.json` (consistent with existing page config pattern)
- **Hybrid caching** — Analytics data cached via in-memory `globalThis` cache with 15-minute TTL (works on both local and Vercel serverless)
- **Custom cookie consent** — No third-party library; fully built in-house for complete admin control
- **Consent-gated scripts** — No tracking scripts load until visitor grants consent for the relevant category
- **Deployment** — Currently local/git + Vercel. Admin write operations (settings saves) work locally; on Vercel the last-committed config is served read-only. OpenReplay requires self-hosted server (deferred until Hetzner migration)
- **Service account key** — Stored as `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable (not a file), works on both local (.env) and Vercel (env vars dashboard)
- **Zod validation** — All settings inputs validated with Zod schemas (consistent with existing `landingPageSchema` pattern)

## 1. Admin Panel Redesign

### New Sidebar Navigation

```
SUNLITE ADMIN

-- Main --
  Dashboard              → /admin (analytics widget grid)

-- Content --
  Product Pages          → /admin/content/products
  Landing Pages          → /admin/content/landing-pages
  Static Pages           → /admin/content/static-pages
  + New Landing Page     → /admin/pages/new

-- Integrations --
  Google Analytics       → /admin/integrations/google
  Heatmap & Sessions     → /admin/integrations/openreplay
  Cookie Consent         → /admin/integrations/cookie-consent

```

Content management pages (Product/Landing/Static) move from dashboard tabs to their own sidebar links. The dashboard becomes a proper analytics overview.

### Dashboard Widget Grid

| Widget | Data Source | Display |
|--------|------------|---------|
| Visitors (today/week/month) | GA4 Data API | Sparkline + number |
| Top Pages | GA4 Data API | Top 5 by page views |
| Traffic Sources | GA4 Data API | Bar chart of referrers |
| Active Sessions | OpenReplay API | Live count |
| Recent Recordings | OpenReplay API | Last 5 sessions with links |
| Top Clicked Areas | OpenReplay API | Most interacted pages |
| Content Overview | Internal | Product/landing/static page counts |
| SEO Health | Internal | Pages missing meta descriptions, titles, OG images |
| Recent Edits | Internal (edit log) | Last 5 edited pages |

**Phasing:** Internal widgets (Content Overview, SEO Health, Recent Edits) ship first. GA4 and OpenReplay widgets show "Configure in Integrations" placeholder until their respective services are connected and tested.

Each widget is a self-contained card component. Unconfigured services show a "Configure in Integrations" prompt instead of data.

## 2. Google Analytics, GTM & Ads Integration

### Admin Settings Page (`/admin/integrations/google`)

Fields:
- GA4 Measurement ID (e.g., `G-XXXXXXXXXX`) + enable toggle — used for client-side tracking script
- GA4 Property ID (e.g., `123456789`) — numeric ID used for GA4 Data API dashboard queries
- GTM Container ID (e.g., `GTM-XXXXXXX`) + enable toggle
- Google Ads Conversion ID (e.g., `AW-XXXXXXXXX`) + enable toggle
- Google Ads Conversion Label
- Google Service Account Key (JSON upload/paste for GA4 Data API access)

### Script Injection

- Public layout reads site settings at request time
- `<TrackingScripts />` component renders in `<head>` via `next/script`
- Scripts only load after cookie consent is granted for the relevant category
- Loading order: GTM first (manages other tags) → GA4 direct (if no GTM) → Ads conversion alongside GA4
- **Double-tracking guard:** When GTM is enabled, direct GA4 script injection is automatically disabled. Admin UI shows a notice: "GA4 is managed through GTM — direct GA4 injection disabled."

### GA4 Data API for Dashboard

- Service account key read from `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable (JSON string)
- Admin settings page shows whether a key is configured (boolean indicator) but never displays the key
- API route `/api/admin/analytics/google` fetches GA4 Data API using `@google-analytics/data`
- Results cached in-memory via `globalThis` with 15-minute TTL

## 3. OpenReplay (Self-Hosted Heatmaps & Session Recording)

### Admin Settings Page (`/admin/integrations/openreplay`)

Fields:
- Server URL (e.g., `https://openreplay.yourdomain.com`)
- Project Key
- Ingest Point (optional override)
- Enable/disable toggle

### Tracker Component

- `<OpenReplayTracker />` client component in public layout
- Uses `@openreplay/tracker` npm package (~40KB gzipped), loaded via `next/dynamic` with `ssr: false` and dynamic `import()` so the bundle is never in the initial page load
- Only initializes after cookie consent granted for "Analytics" category
- Tracks: clicks, scrolls, mouse movements, console errors, network requests

### Dashboard Widgets

- API route `/api/admin/analytics/openreplay` calls OpenReplay REST API
- Fetches: active sessions, recent session list, most visited pages
- Cached in-memory via `globalThis` with 15-minute TTL
- Links directly to session recordings in OpenReplay UI

### Current Status

Admin config page is fully functional. Tracker component is built and ready. Activates only when a valid server URL + project key are provided. Until Hetzner migration, dashboard widget shows "OpenReplay not configured — requires self-hosted server."

## 4. Cookie Consent System

### Admin Settings Page (`/admin/integrations/cookie-consent`)

**Banner Customization:**
- Banner title text
- Banner description text
- "Accept All" / "Reject All" / "Manage Preferences" button text
- Button colors (bg + text for each)
- Banner background color, text color
- Banner position: bottom bar / bottom-left popup / bottom-right popup
- Privacy policy URL
- Consent expiry (days)

**Cookie Categories (fully editable):**
Each category has:
- ID, name, description
- Required toggle (Necessary = always on)
- Assigned integrations (ga4, gtm, google-ads, openreplay)

Admin can add/remove/rename categories and reassign scripts.

### Default Categories

| Category | Required | Integrations |
|----------|----------|-------------|
| Necessary | Yes | (admin session cookie) |
| Analytics | No | GA4, OpenReplay |
| Marketing | No | GTM, Google Ads |

### Frontend Behavior

- `<CookieConsent />` client component in public layout
- First visit: banner appears, zero tracking scripts load
- Consent stored in `cookie_consent` cookie (JSON of accepted category IDs)
- `<TrackingScripts />` and `<OpenReplayTracker />` read consent cookie before loading
- "Reject All" = only necessary cookies, zero tracking
- **Consent revocation cleanup:** When a visitor revokes a category, cookies belonging to that category are deleted (e.g., `_ga`, `_gid` for Analytics; OpenReplay cookies for Heatmap)
- Floating "Cookie Settings" button (or footer link) lets visitors change preferences
- Consent expires after configurable period (default 365 days)

### Consent Config Delivery

Consent config is inlined into the public layout as a server-rendered `<script>` tag (`window.__CONSENT_CONFIG__`), avoiding an extra network request on every page load. No separate API endpoint needed for the public side.

## 5. Settings File Structure

### `content/settings/site-settings.json`

```json
{
  "google": {
    "enabled": false,
    "ga4MeasurementId": "",
    "ga4PropertyId": "",
    "gtmContainerId": "",
    "adsConversionId": "",
    "adsConversionLabel": "",
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
      { "id": "necessary", "name": "Necessary", "description": "Essential for the website to function", "required": true, "integrations": [] },
      { "id": "analytics", "name": "Analytics", "description": "Help us understand how visitors use our site", "required": false, "integrations": ["ga4", "openreplay"] },
      { "id": "marketing", "name": "Marketing", "description": "Used for advertising and conversion tracking", "required": false, "integrations": ["gtm", "google-ads"] }
    ]
  }
}
```

### Environment Variables

- `GOOGLE_SERVICE_ACCOUNT_KEY` — GA4 API service account JSON string (set in `.env.local` locally, Vercel env vars in production)

### Gitignore Additions

```
content/settings/site-settings.json
```

### Recent Edits Tracking

Save endpoints (`updateProductConfig`, `updateStaticConfig`, `updatePage`) append to `content/settings/edit-log.json` — a simple array of `{ slug, pageType, timestamp }` entries, capped at 50. This provides reliable "Recent Edits" data regardless of filesystem timestamp behavior.

## 6. API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/settings` | GET | Read site-settings.json |
| `/api/admin/settings` | PUT | Write site-settings.json |
| `/api/admin/analytics/google` | GET | Fetch GA4 data (in-memory cached, 15-min TTL) |
| `/api/admin/analytics/openreplay` | GET | Fetch OpenReplay data (in-memory cached, 15-min TTL) |
| `/api/admin/analytics/internal` | GET | Content stats (page counts, SEO health, recent edits from edit-log.json) |

All `/api/admin/*` routes are protected by existing admin auth middleware.

## 7. New Dependencies

| Package | Purpose | Bundle Impact |
|---------|---------|---------------|
| `@google-analytics/data` | GA4 Data API for dashboard | Server-only |
| `@openreplay/tracker` | Session recording | ~40KB gzipped (client, loaded after consent) |

## 8. Validation

All settings inputs validated with Zod schemas:

- GA4 Measurement ID: `/^G-[A-Z0-9]+$/`
- GTM Container ID: `/^GTM-[A-Z0-9]+$/`
- Google Ads Conversion ID: `/^AW-[0-9]+$/`
- URLs: valid URL format
- Color values: valid hex codes (`/^#[0-9a-fA-F]{6}$|^transparent$/`)
- Consent expiry: positive integer (1-3650)
- Category IDs: lowercase alphanumeric + hyphens

## 9. Security Considerations

- Service account key stored as environment variable, never exposed to client or committed to git
- Consent config inlined into layout server-side — no public API endpoint exposing settings
- All tracking scripts gated behind explicit cookie consent
- Admin API routes protected by existing session auth
- No tracking data stored locally — all analytics data stays in GA4/OpenReplay
- In-memory cache contains only aggregated stats, no PII
- Consent cookie is client-side only (not tamper-proof); acceptable since manipulation only affects the user's own browser
