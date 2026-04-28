# Lead Contact Form System — Design Spec

**Date:** 2026-04-28
**Status:** Approved

## Problem

The site uses HubSpot for contact/quote forms, which is expensive. Two client-side form stubs exist (Contact + Quote) but have no backend. Need a self-hosted replacement with file uploads, spam protection, email notifications, and admin management.

## Decisions

- **Email service:** Resend (free tier, 100 emails/day)
- **File storage:** OneDrive via Microsoft Graph API (Office 365 business)
- **Spam protection:** Cloudflare Turnstile (already on Cloudflare DNS)
- **Admin inbox:** Email-style split view (list + detail panel)
- **Auto-reply:** Confirmation email sent to submitter
- **Data storage:** JSON files in `content/leads/` (matches existing content-store pattern)

## Architecture

```
[Public Forms] → POST /api/forms/submit
                      │
                      ├── Verify Turnstile token
                      ├── Validate with Zod
                      ├── Upload files → OneDrive (Graph API)
                      ├── Save to content/leads/{id}.json
                      ├── Send notification email → admin (Resend)
                      └── Send auto-reply email → submitter (Resend)

[Admin Panel] → /admin/leads
                      │
                      ├── GET /api/admin/leads (list, filter, paginate)
                      ├── GET /api/admin/leads/[id] (detail)
                      └── PATCH /api/admin/leads/[id] (update status)
```

## Components

### 1. Form Submission API

**Route:** `POST /api/forms/submit`

**Flow:**
1. Parse multipart form data (fields + files)
2. Verify Turnstile token against Cloudflare API
3. Check honeypot field — both forms send a `_hp` field (standardize from current `company_url` / `website` names)
4. Validate form data with Zod (schema per form type)
5. Generate ID via `crypto.randomUUID()`, save submission as `content/leads/{id}.json`
6. If files present: upload to OneDrive, get shareable links, update the saved lead with file URLs
7. Send notification email to admin with form data + file links (best-effort — log on failure, don't reject submission)
8. Send auto-reply to submitter (best-effort — same)
9. Return success response

**Error handling:** The lead is always saved first (step 5). OneDrive upload and email sending are best-effort — failures are logged but don't reject the submission. A transient outage in Resend or OneDrive won't lose form data.

**Rate limiting:** 5 submissions per IP per hour (in-memory tracker, resets on restart — sufficient for this traffic level).

**Field validation limits:**
- `name`: max 200 chars
- `email`: max 320 chars
- `message`: max 5000 chars
- `subject`, `company`, `phone`: max 200 chars each
- Quote fields: max 500 chars each

**File constraints:**
- Max 3 files per submission
- Max 10 MB per file
- Allowed types: PDF, AI, EPS, SVG, JPG, PNG, DWG (matches existing quote form UI)

### 2. OneDrive Integration

**Module:** `src/lib/onedrive.ts`

**Auth:** Microsoft Entra ID app registration with client credentials flow (no user login needed). The app gets `Files.ReadWrite.All` permission on a specific OneDrive account.

**Upload path:** `Sunlite Leads/{YYYY-MM}/{submission-id}/{filename}`

**Returns:** `{ name, oneDriveUrl, size }` for each uploaded file. The `oneDriveUrl` is a shareable link created via Graph API.

**Auth implementation:** Direct `fetch` to `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` for client credentials token. No heavy SDK needed — just a token fetch + Graph API calls via `fetch`. Token cached in-memory with TTL.

**Dependency:** `@microsoft/microsoft-graph-client` (lightweight Graph client only — no `@azure/identity`)

### 3. Email via Resend

**Module:** `src/lib/email.ts`

**Notification email (to admin):**
- Subject: `[Sunlite] New {formType} from {name}`
- Body: all form fields formatted, OneDrive links for files, link to admin panel lead detail

**Auto-reply email (to submitter):**
- Subject: `Thanks for contacting Sunlite Signs`
- Body: confirmation message, mention 24h response time, company contact info

**Dependency:** `resend`

### 4. Cloudflare Turnstile

**Client-side:** Embed Turnstile widget in both Contact and Quote forms. The widget renders an invisible or managed challenge and produces a token.

**Server-side:** `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` with the token + secret key. Reject submission if verification fails.

**Env vars:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`

### 5. Public Form Updates

**ContactForm.tsx changes:**
- Add Turnstile widget
- On submit: POST to `/api/forms/submit` with JSON body + Turnstile token
- Show loading state, success message, or error
- Keep honeypot field

**QuoteForm.tsx changes:**
- Add Turnstile widget
- On submit: POST to `/api/forms/submit` with FormData (multipart, for files)
- Wire up existing file input to actual upload
- Show upload progress, loading state, success/error
- Keep honeypot field

### 6. Admin Leads Inbox

**Page:** `src/app/(admin)/admin/leads/page.tsx`

**Layout:** Email-style split view
- **Left panel:** Scrollable list of submissions, sorted by date (newest first)
  - Each row: name, preview text, form type badge, date, status badge, file indicator
  - Unread (new) submissions highlighted
  - Filter bar: All / Contact / Quote, status filter dropdown
- **Right panel:** Full submission detail when a lead is selected
  - All form fields displayed
  - File attachments as clickable OneDrive links
  - Status actions: Mark as Read, Mark as Replied, Archive

**API routes:**
- `GET /api/admin/leads` — list submissions, supports `?type=contact|quote&status=new|read|replied|archived`
- `GET /api/admin/leads/[id]` — single submission detail
- `PATCH /api/admin/leads/[id]` — update status (`{ status: "read" | "replied" | "archived" }`)
- `DELETE /api/admin/leads/[id]` — permanently delete a lead (admin only)

**Nav:** Add "Leads" item to admin sidebar under "Content" section with `Mail` icon from lucide-react. Show unread count badge.

### 7. Data Model

**File:** `content/leads/{uuid}.json`

```typescript
interface LeadSubmission {
  id: string                    // UUID v4
  formType: "contact" | "quote"
  status: "new" | "read" | "replied" | "archived"

  // Common fields
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string              // Contact form only
  message: string               // Maps from "message" (contact) or "description" (quote)

  // Quote-specific fields
  quoteFields?: {
    projectType: string
    dimensions: string
    quantity: string
    deadline: string
    notes: string
  }

  // File attachments
  files?: Array<{
    name: string
    oneDriveUrl: string
    size: number
  }>

  submittedAt: string           // ISO 8601
  readAt?: string               // ISO 8601
}
```

## Leads Index

To avoid reading every JSON file on each list request, maintain a summary index at `content/leads/_index.json`. This is an array of `{ id, formType, status, name, email, submittedAt, hasFiles }` objects. Updated on every write/status-change. The full detail is read from individual files only when viewing a single lead.

## Admin Auth

All `/api/admin/leads/*` routes use the same cookie-based auth middleware as existing admin routes. No additional auth mechanism needed.

## Deleting Leads

`DELETE /api/admin/leads/[id]` removes the lead JSON file and updates the index. Available to admin role only.

## Auto-Reply Language

Auto-reply emails are English-only for now. i18n for emails is out of scope in this phase.

## New Dependencies

- `resend` — email sending
- `@microsoft/microsoft-graph-client` — OneDrive Graph API client

No `uuid` (use native `crypto.randomUUID()`), no `@azure/identity` (direct token fetch).

## Environment Variables

```
# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@sunlitesigns.com
NOTIFICATION_EMAIL=ozan@sunlitesigns.com

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Microsoft / OneDrive
AZURE_TENANT_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
ONEDRIVE_USER_ID=               # The user whose OneDrive to upload to
ONEDRIVE_UPLOAD_FOLDER=Sunlite Leads
```

## Files to Create

- `src/app/api/forms/submit/route.ts` — form submission handler
- `src/lib/onedrive.ts` — OneDrive upload helper
- `src/lib/email.ts` — Resend email helpers
- `src/lib/turnstile.ts` — Turnstile verification helper
- `src/lib/admin/leads.ts` — leads CRUD (read/write JSON)
- `src/app/api/admin/leads/route.ts` — list leads API
- `src/app/api/admin/leads/[id]/route.ts` — single lead API
- `src/app/(admin)/admin/leads/page.tsx` — admin inbox page

## Files to Modify

- `src/app/(public)/contact/ContactForm.tsx` — add Turnstile, wire to API
- `src/app/(public)/get-a-quote/QuoteForm.tsx` — add Turnstile, wire to API with file upload
- `src/app/(admin)/admin/layout.tsx` — add Leads nav item
- `package.json` — add new dependencies

## Out of Scope

- CRM features (tagging, notes, assignment)
- Email thread tracking / reply-from-admin
- Analytics on form submissions
- Admin-configurable email templates (hardcoded for now)
- i18n for auto-reply emails (English only for now)
