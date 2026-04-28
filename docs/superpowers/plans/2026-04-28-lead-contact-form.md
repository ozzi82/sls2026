# Lead Contact Form System — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace HubSpot with a self-hosted lead form system featuring Cloudflare Turnstile spam protection, OneDrive file uploads, Resend email notifications, and an admin inbox.

**Architecture:** Public forms POST to `/api/forms/submit` which saves leads as JSON, uploads files to OneDrive via Graph API, and sends emails via Resend. Admin panel gets an email-style inbox at `/admin/leads` backed by JSON files in `content/leads/` with an `_index.json` summary for fast listing.

**Tech Stack:** Next.js 14 API routes, Zod validation, Cloudflare Turnstile, Microsoft Graph API (OneDrive), Resend (email), existing content-store pattern (JSON files on disk).

**Spec:** `docs/superpowers/specs/2026-04-28-lead-contact-form-design.md`

---

## Chunk 1: Dependencies, Types, and Core Libraries

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install npm packages**

```bash
npm install resend @microsoft/microsoft-graph-client
```

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend and microsoft-graph-client dependencies"
```

---

### Task 2: Lead Types and Validation

**Files:**
- Create: `src/lib/leads/types.ts`
- Create: `src/lib/leads/validation.ts`

- [ ] **Step 1: Create lead types**

Create `src/lib/leads/types.ts`:

```typescript
export interface LeadSubmission {
  id: string
  formType: "contact" | "quote"
  status: "new" | "read" | "replied" | "archived"
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  quoteFields?: {
    projectType: string
    dimensions: string
    quantity: string
    deadline: string
    notes: string
  }
  files?: Array<{
    name: string
    oneDriveUrl: string
    size: number
  }>
  submittedAt: string
  readAt?: string
}

export interface LeadIndexEntry {
  id: string
  formType: "contact" | "quote"
  status: "new" | "read" | "replied" | "archived"
  name: string
  email: string
  submittedAt: string
  hasFiles: boolean
  messagePreview: string
}
```

- [ ] **Step 2: Create Zod validation schemas**

Create `src/lib/leads/validation.ts`:

```typescript
import { z } from "zod"

const baseFields = {
  formType: z.enum(["contact", "quote"]),
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").max(320),
  company: z.string().max(200).optional().default(""),
  phone: z.string().max(200).optional().default(""),
  message: z.string().min(1, "Message is required").max(5000),
  turnstileToken: z.string().min(1, "Verification required"),
}

export const contactFormSchema = z.object({
  ...baseFields,
  formType: z.literal("contact"),
  subject: z.string().max(200).optional().default(""),
})

export const quoteFormSchema = z.object({
  ...baseFields,
  formType: z.literal("quote"),
  projectType: z.string().max(500).optional().default(""),
  dimensions: z.string().max(500).optional().default(""),
  quantity: z.string().max(500).optional().default(""),
  deadline: z.string().max(500).optional().default(""),
  notes: z.string().max(500).optional().default(""),
})

export const formSubmissionSchema = z.discriminatedUnion("formType", [
  contactFormSchema,
  quoteFormSchema,
])

export type ContactFormData = z.infer<typeof contactFormSchema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>
export type FormSubmissionData = z.infer<typeof formSubmissionSchema>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/leads/types.ts src/lib/leads/validation.ts
git commit -m "feat(leads): add lead types and Zod validation schemas"
```

---

### Task 3: Leads CRUD (Content Store)

**Files:**
- Create: `src/lib/leads/store.ts`

- [ ] **Step 1: Implement leads store**

Create `src/lib/leads/store.ts`. Uses existing `content-store.ts` functions (`readJson`, `writeJson`, `deleteJson`, `listJsonFiles`).

```typescript
import { readJson, writeJson, deleteJson } from "@/lib/admin/content-store"
import type { LeadSubmission, LeadIndexEntry } from "./types"

const LEADS_DIR = "leads"
const INDEX_PATH = "leads/_index.json"

function toIndexEntry(lead: LeadSubmission): LeadIndexEntry {
  return {
    id: lead.id,
    formType: lead.formType,
    status: lead.status,
    name: lead.name,
    email: lead.email,
    submittedAt: lead.submittedAt,
    hasFiles: Array.isArray(lead.files) && lead.files.length > 0,
    messagePreview: lead.message.slice(0, 120),
  }
}

export async function loadLeadIndex(): Promise<LeadIndexEntry[]> {
  const data = await readJson<LeadIndexEntry[]>(INDEX_PATH)
  return data ?? []
}

async function saveIndex(index: LeadIndexEntry[]): Promise<void> {
  // Sort newest first
  index.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
  await writeJson(INDEX_PATH, index)
}

export async function saveLead(lead: LeadSubmission): Promise<void> {
  await writeJson(`${LEADS_DIR}/${lead.id}.json`, lead)
  const index = await loadLeadIndex()
  // Remove existing entry if updating
  const filtered = index.filter((e) => e.id !== lead.id)
  filtered.push(toIndexEntry(lead))
  await saveIndex(filtered)
}

export async function loadLead(id: string): Promise<LeadSubmission | null> {
  // Prevent path traversal
  if (!/^[a-f0-9-]{36}$/.test(id)) return null
  return readJson<LeadSubmission>(`${LEADS_DIR}/${id}.json`)
}

export async function updateLeadStatus(
  id: string,
  status: LeadSubmission["status"]
): Promise<LeadSubmission | null> {
  const lead = await loadLead(id)
  if (!lead) return null
  lead.status = status
  if (status === "read" && !lead.readAt) {
    lead.readAt = new Date().toISOString()
  }
  await saveLead(lead)
  return lead
}

export async function deleteLead(id: string): Promise<boolean> {
  const lead = await loadLead(id)
  if (!lead) return false
  await deleteJson(`${LEADS_DIR}/${id}.json`)
  const index = await loadLeadIndex()
  const filtered = index.filter((e) => e.id !== id)
  await saveIndex(filtered)
  return true
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/leads/store.ts
git commit -m "feat(leads): add leads CRUD with index for fast listing"
```

---

### Task 4: Turnstile Verification

**Files:**
- Create: `src/lib/turnstile.ts`

- [ ] **Step 1: Implement Turnstile server-side verification**

Create `src/lib/turnstile.ts`:

```typescript
interface TurnstileResult {
  success: boolean
  error?: string
}

export async function verifyTurnstile(token: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification")
    return { success: true }
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    )
    const data = await res.json()
    if (data.success) return { success: true }
    return { success: false, error: "Verification failed" }
  } catch (err) {
    console.error("Turnstile verification error:", err)
    return { success: false, error: "Verification service unavailable" }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/turnstile.ts
git commit -m "feat(leads): add Cloudflare Turnstile server-side verification"
```

---

### Task 5: OneDrive Upload Helper

**Files:**
- Create: `src/lib/onedrive.ts`

- [ ] **Step 1: Implement OneDrive upload with token caching**

Create `src/lib/onedrive.ts`:

```typescript
import { Client } from "@microsoft/microsoft-graph-client"

interface UploadedFile {
  name: string
  oneDriveUrl: string
  size: number
}

// In-memory token cache
let tokenCache: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token
  }

  const tenantId = process.env.AZURE_TENANT_ID!
  const clientId = process.env.AZURE_CLIENT_ID!
  const clientSecret = process.env.AZURE_CLIENT_SECRET!

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  )

  if (!res.ok) {
    throw new Error(`Token fetch failed: ${res.status}`)
  }

  const data = await res.json()
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  return data.access_token
}

function getGraphClient(accessToken: string): Client {
  return Client.init({
    authProvider: (done) => done(null, accessToken),
  })
}

export async function uploadToOneDrive(
  submissionId: string,
  files: Array<{ name: string; buffer: Buffer; size: number }>
): Promise<UploadedFile[]> {
  const userId = process.env.ONEDRIVE_USER_ID
  const folder = process.env.ONEDRIVE_UPLOAD_FOLDER || "Sunlite Leads"

  if (!userId || !process.env.AZURE_TENANT_ID) {
    console.warn("OneDrive not configured — skipping upload")
    return []
  }

  const accessToken = await getAccessToken()
  const client = getGraphClient(accessToken)

  const now = new Date()
  const monthFolder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  const basePath = `/users/${userId}/drive/root:/${folder}/${monthFolder}/${submissionId}`

  const results: UploadedFile[] = []

  for (const file of files) {
    try {
      // Upload file (simple upload for files < 4MB, works for most form uploads)
      const uploadPath = `${basePath}/${file.name}:/content`
      await client.api(uploadPath).put(file.buffer)

      // Create sharing link
      const itemPath = `${basePath}/${file.name}`
      const shareRes = await client.api(`${itemPath}:/createLink`).post({
        type: "view",
        scope: "organization",
      })

      results.push({
        name: file.name,
        oneDriveUrl: shareRes.link?.webUrl || "",
        size: file.size,
      })
    } catch (err) {
      console.error(`OneDrive upload failed for ${file.name}:`, err)
      // Best-effort: continue with other files
    }
  }

  return results
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/onedrive.ts
git commit -m "feat(leads): add OneDrive upload helper with token caching"
```

---

### Task 6: Email Helper (Resend)

**Files:**
- Create: `src/lib/email.ts`

- [ ] **Step 1: Implement email sending via Resend**

Create `src/lib/email.ts`:

```typescript
import { Resend } from "resend"
import type { LeadSubmission } from "./leads/types"

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn("RESEND_API_KEY not set — skipping email")
    return null
  }
  return new Resend(key)
}

export async function sendNotificationEmail(lead: LeadSubmission): Promise<void> {
  const resend = getResend()
  if (!resend) return

  const from = process.env.RESEND_FROM_EMAIL || "noreply@sunlitesigns.com"
  const to = process.env.NOTIFICATION_EMAIL
  if (!to) {
    console.warn("NOTIFICATION_EMAIL not set — skipping notification")
    return
  }

  const formLabel = lead.formType === "quote" ? "Quote Request" : "Contact Message"
  const fileLinks = lead.files?.length
    ? lead.files.map((f) => `• <a href="${f.oneDriveUrl}">${f.name}</a> (${(f.size / 1024).toFixed(0)} KB)`).join("<br>")
    : "None"

  const quoteSection = lead.quoteFields
    ? `
      <tr><td style="padding:4px 8px;color:#666;">Project Type</td><td style="padding:4px 8px;">${lead.quoteFields.projectType}</td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Dimensions</td><td style="padding:4px 8px;">${lead.quoteFields.dimensions || "—"}</td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Quantity</td><td style="padding:4px 8px;">${lead.quoteFields.quantity || "—"}</td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Deadline</td><td style="padding:4px 8px;">${lead.quoteFields.deadline || "—"}</td></tr>
      <tr><td style="padding:4px 8px;color:#666;">Notes</td><td style="padding:4px 8px;">${lead.quoteFields.notes || "—"}</td></tr>
    `
    : ""

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;">
      <h2 style="color:#1a1a1a;">New ${formLabel}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:4px 8px;color:#666;">Name</td><td style="padding:4px 8px;font-weight:bold;">${lead.name}</td></tr>
        <tr><td style="padding:4px 8px;color:#666;">Email</td><td style="padding:4px 8px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        ${lead.company ? `<tr><td style="padding:4px 8px;color:#666;">Company</td><td style="padding:4px 8px;">${lead.company}</td></tr>` : ""}
        ${lead.phone ? `<tr><td style="padding:4px 8px;color:#666;">Phone</td><td style="padding:4px 8px;">${lead.phone}</td></tr>` : ""}
        ${lead.subject ? `<tr><td style="padding:4px 8px;color:#666;">Subject</td><td style="padding:4px 8px;">${lead.subject}</td></tr>` : ""}
        ${quoteSection}
      </table>
      <div style="margin-top:16px;padding:12px;background:#f5f5f5;border-radius:8px;">
        <p style="margin:0;white-space:pre-wrap;">${lead.message}</p>
      </div>
      <div style="margin-top:16px;">
        <strong>Files:</strong><br>${fileLinks}
      </div>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/admin/leads">View in Admin Panel</a>
      </p>
    </div>
  `

  await resend.emails.send({
    from,
    to,
    subject: `[Sunlite] New ${formLabel} from ${lead.name}`,
    html,
  })
}

export async function sendAutoReply(lead: LeadSubmission): Promise<void> {
  const resend = getResend()
  if (!resend) return

  const from = process.env.RESEND_FROM_EMAIL || "noreply@sunlitesigns.com"

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;">
      <h2 style="color:#1a1a1a;">Thank you for contacting Sunlite Signs</h2>
      <p>Hi ${lead.name},</p>
      <p>We've received your ${lead.formType === "quote" ? "quote request" : "message"} and our team will review it shortly. You can expect to hear back from us within <strong>24 hours</strong> during business days.</p>
      <p>If you have any urgent questions, feel free to call us at <strong>(714) 324-0882</strong>.</p>
      <p style="margin-top:24px;">Best regards,<br>Sunlite Signs Team</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
      <p style="font-size:12px;color:#999;">Sunlite Signs — Premium Wholesale Channel Letters<br>sunlitesigns.com</p>
    </div>
  `

  await resend.emails.send({
    from,
    to: lead.email,
    subject: "Thanks for contacting Sunlite Signs",
    html,
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat(leads): add Resend email helpers for notification and auto-reply"
```

---

## Chunk 2: Form Submission API and Rate Limiting

### Task 7: Form Submission API Route

**Files:**
- Create: `src/app/api/forms/submit/route.ts`

- [ ] **Step 1: Implement the form submission endpoint**

Create `src/app/api/forms/submit/route.ts`:

```typescript
import { NextResponse } from "next/server"
import crypto from "crypto"
import { formSubmissionSchema } from "@/lib/leads/validation"
import type { LeadSubmission } from "@/lib/leads/types"
import { saveLead } from "@/lib/leads/store"
import { verifyTurnstile } from "@/lib/turnstile"
import { uploadToOneDrive } from "@/lib/onedrive"
import { sendNotificationEmail, sendAutoReply } from "@/lib/email"

export const dynamic = "force-dynamic"

// --- Rate limiting ---
const submissions = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = submissions.get(ip)?.filter((t) => now - t < RATE_WINDOW) ?? []
  submissions.set(ip, timestamps)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  return false
}

// --- Allowed file types ---
const ALLOWED_EXTENSIONS = new Set([
  "pdf", "ai", "eps", "svg", "jpg", "jpeg", "png", "dwg",
])
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const MAX_FILES = 3

export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    // Parse form data (multipart for file uploads)
    const contentType = request.headers.get("content-type") || ""
    let fields: Record<string, string> = {}
    let rawFiles: Array<{ name: string; buffer: Buffer; size: number }> = []

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (rawFiles.length < MAX_FILES && value.size <= MAX_FILE_SIZE && value.size > 0) {
            const ext = value.name.split(".").pop()?.toLowerCase() || ""
            if (ALLOWED_EXTENSIONS.has(ext)) {
              const buffer = Buffer.from(await value.arrayBuffer())
              rawFiles.push({ name: value.name, buffer, size: value.size })
            }
          }
        } else {
          fields[key] = value.toString()
        }
      }
    } else {
      fields = await request.json()
    }

    // Honeypot check
    if (fields._hp) {
      // Silently reject — bots filled the hidden field
      return NextResponse.json({ success: true })
    }

    // Verify Turnstile
    const turnstileResult = await verifyTurnstile(fields.turnstileToken || "")
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error || "Verification failed" },
        { status: 400 }
      )
    }

    // Validate form data
    const parsed = formSubmissionSchema.safeParse(fields)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const id = crypto.randomUUID()

    // Build lead object
    const lead: LeadSubmission = {
      id,
      formType: data.formType,
      status: "new",
      name: data.name,
      email: data.email,
      company: data.company || undefined,
      phone: data.phone || undefined,
      message: data.message,
      submittedAt: new Date().toISOString(),
    }

    if (data.formType === "contact") {
      lead.subject = data.subject || undefined
    }

    if (data.formType === "quote") {
      lead.quoteFields = {
        projectType: data.projectType || "",
        dimensions: data.dimensions || "",
        quantity: data.quantity || "",
        deadline: data.deadline || "",
        notes: data.notes || "",
      }
    }

    // Save lead first (before file upload / email — always preserve the submission)
    await saveLead(lead)

    // Upload files to OneDrive (best-effort)
    if (rawFiles.length > 0) {
      try {
        const uploaded = await uploadToOneDrive(id, rawFiles)
        if (uploaded.length > 0) {
          lead.files = uploaded
          await saveLead(lead) // Update with file URLs
        }
      } catch (err) {
        console.error("OneDrive upload failed:", err)
      }
    }

    // Send emails (best-effort)
    try {
      await sendNotificationEmail(lead)
    } catch (err) {
      console.error("Notification email failed:", err)
    }

    try {
      await sendAutoReply(lead)
    } catch (err) {
      console.error("Auto-reply email failed:", err)
    }

    return NextResponse.json({ success: true, id })
  } catch (err) {
    console.error("Form submission error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Add `/api/forms` to middleware matcher**

The public `/api/forms/submit` route must NOT go through admin auth. Check `src/middleware.ts` — the matcher includes `"/api/admin/:path*"` but not `/api/forms`. The current matcher `"/((?!_next|api|favicon|uploads|.*\\.).*)"` explicitly excludes `/api` routes from public-route handling, so `/api/forms/submit` will pass through without middleware interference. No changes needed.

- [ ] **Step 3: Verify build compiles**

```bash
npx next build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/forms/submit/route.ts
git commit -m "feat(leads): add form submission API with rate limiting and best-effort email/upload"
```

---

## Chunk 3: Admin Leads API and Inbox

### Task 8: Admin Leads API Routes

**Files:**
- Create: `src/app/api/admin/leads/route.ts`
- Create: `src/app/api/admin/leads/[id]/route.ts`
- Modify: `src/middleware.ts` — add admin-only pattern for leads

- [ ] **Step 1: Add leads admin-only pattern to middleware**

In `src/middleware.ts`, add to the `ADMIN_ONLY_PATTERNS` array:

```typescript
/^\/api\/admin\/leads/,
```

This ensures only admin users can access leads API routes.

- [ ] **Step 2: Create leads list API route**

Create `src/app/api/admin/leads/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server"
import { loadLeadIndex } from "@/lib/leads/store"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const typeFilter = searchParams.get("type")
    const statusFilter = searchParams.get("status")

    let leads = await loadLeadIndex()

    if (typeFilter && (typeFilter === "contact" || typeFilter === "quote")) {
      leads = leads.filter((l) => l.formType === typeFilter)
    }
    if (
      statusFilter &&
      ["new", "read", "replied", "archived"].includes(statusFilter)
    ) {
      leads = leads.filter((l) => l.status === statusFilter)
    }

    return NextResponse.json({ leads })
  } catch (err) {
    console.error("Failed to load leads:", err)
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 })
  }
}
```

- [ ] **Step 3: Create single lead API route (GET, PATCH, DELETE)**

Create `src/app/api/admin/leads/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server"
import { loadLead, updateLeadStatus, deleteLead } from "@/lib/leads/store"

export const dynamic = "force-dynamic"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const lead = await loadLead(id)
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }
  return NextResponse.json(lead)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const status = body.status

  if (!["new", "read", "replied", "archived"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const lead = await updateLeadStatus(id, status)
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }
  return NextResponse.json(lead)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const deleted = await deleteLead(id)
  if (!deleted) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
```

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts src/app/api/admin/leads/route.ts "src/app/api/admin/leads/[id]/route.ts"
git commit -m "feat(leads): add admin leads API routes with list, detail, status update, delete"
```

---

### Task 9: Admin Leads Inbox Page

**Files:**
- Create: `src/app/(admin)/admin/leads/page.tsx`
- Modify: `src/app/(admin)/admin/layout.tsx` — add Leads nav item

- [ ] **Step 1: Create the admin leads inbox page**

Create `src/app/(admin)/admin/leads/page.tsx`:

```typescript
"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import {
  Mail,
  FileText,
  Paperclip,
  ExternalLink,
  Trash2,
  CheckCircle2,
  MessageSquare,
  Archive,
} from "lucide-react"
import type { LeadSubmission, LeadIndexEntry } from "@/lib/leads/types"

const statusColors: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  read: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-500",
}

const formTypeColors: Record<string, string> = {
  contact: "bg-purple-100 text-purple-700",
  quote: "bg-blue-100 text-blue-700",
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadIndexEntry[]>([])
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const fetchLeads = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (typeFilter !== "all") params.set("type", typeFilter)
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/admin/leads?${params}`)
      const data = await res.json()
      setLeads(data.leads || [])
    } catch {
      toast.error("Failed to load leads")
    } finally {
      setLoading(false)
    }
  }, [typeFilter, statusFilter])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  async function selectLead(entry: LeadIndexEntry) {
    try {
      const res = await fetch(`/api/admin/leads/${entry.id}`)
      const lead = await res.json()
      setSelectedLead(lead)
      // Auto-mark as read
      if (entry.status === "new") {
        await fetch(`/api/admin/leads/${entry.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        })
        fetchLeads()
      }
    } catch {
      toast.error("Failed to load lead details")
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success(`Marked as ${status}`)
      fetchLeads()
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: status as LeadSubmission["status"] })
      }
    } catch {
      toast.error("Failed to update status")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Permanently delete this lead?")) return
    try {
      await fetch(`/api/admin/leads/${id}`, { method: "DELETE" })
      toast.success("Lead deleted")
      if (selectedLead?.id === id) setSelectedLead(null)
      fetchLeads()
    } catch {
      toast.error("Failed to delete lead")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading leads...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-md px-3 py-1.5"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-md px-3 py-1.5"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Mail className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>No leads yet</p>
        </div>
      ) : (
        <div className="flex gap-4 h-[calc(100vh-180px)]">
          {/* Left panel — list */}
          <div className="w-[380px] flex-shrink-0 overflow-y-auto border border-gray-200 rounded-lg bg-white">
            {leads.map((entry) => (
              <button
                key={entry.id}
                onClick={() => selectLead(entry)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedLead?.id === entry.id ? "bg-blue-50" : ""
                } ${entry.status === "new" ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      entry.status === "new" ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {entry.name}
                  </span>
                  <span className="text-xs text-gray-400">{timeAgo(entry.submittedAt)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mb-1.5">{entry.messagePreview}</p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      formTypeColors[entry.formType]
                    }`}
                  >
                    {entry.formType}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      statusColors[entry.status]
                    }`}
                  >
                    {entry.status}
                  </span>
                  {entry.hasFiles && <Paperclip className="h-3 w-3 text-gray-400" />}
                </div>
              </button>
            ))}
          </div>

          {/* Right panel — detail */}
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg bg-white p-6">
            {selectedLead ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedLead.name}</h2>
                    <p className="text-sm text-gray-500">
                      <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                        {selectedLead.email}
                      </a>
                      {selectedLead.company && ` · ${selectedLead.company}`}
                      {selectedLead.phone && ` · ${selectedLead.phone}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selectedLead.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => updateStatus(selectedLead.id, "replied")}
                      className="p-1.5 rounded hover:bg-green-50 text-green-600"
                      title="Mark as Replied"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(selectedLead.id, "archived")}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                      title="Archive"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedLead.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {selectedLead.subject && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {selectedLead.subject}
                  </p>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>

                {selectedLead.quoteFields && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Quote Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedLead.quoteFields.projectType && (
                        <div>
                          <span className="text-gray-500">Project Type:</span>{" "}
                          {selectedLead.quoteFields.projectType}
                        </div>
                      )}
                      {selectedLead.quoteFields.dimensions && (
                        <div>
                          <span className="text-gray-500">Dimensions:</span>{" "}
                          {selectedLead.quoteFields.dimensions}
                        </div>
                      )}
                      {selectedLead.quoteFields.quantity && (
                        <div>
                          <span className="text-gray-500">Quantity:</span>{" "}
                          {selectedLead.quoteFields.quantity}
                        </div>
                      )}
                      {selectedLead.quoteFields.deadline && (
                        <div>
                          <span className="text-gray-500">Deadline:</span>{" "}
                          {selectedLead.quoteFields.deadline}
                        </div>
                      )}
                      {selectedLead.quoteFields.notes && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Notes:</span>{" "}
                          {selectedLead.quoteFields.notes}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedLead.files && selectedLead.files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h3>
                    <div className="space-y-1.5">
                      {selectedLead.files.map((file, i) => (
                        <a
                          key={i}
                          href={file.oneDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 bg-gray-50 rounded px-3 py-2"
                        >
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0 ml-auto" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p>Select a lead to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add Leads nav item to admin sidebar**

In `src/app/(admin)/admin/layout.tsx`:

1. Add `Mail` to the lucide-react import.
2. Add this item to the "Content" section's `items` array, after "Media Library":

```typescript
{ href: "/admin/leads", label: "Leads", icon: Mail },
```

- [ ] **Step 3: Verify build compiles**

```bash
npx next build
```

- [ ] **Step 4: Commit**

```bash
git add "src/app/(admin)/admin/leads/page.tsx" "src/app/(admin)/admin/layout.tsx"
git commit -m "feat(leads): add admin leads inbox page with email-style split view"
```

---

## Chunk 4: Public Form Updates (Turnstile + API Wiring)

### Task 10: Turnstile Client Component

**Files:**
- Create: `src/components/Turnstile.tsx`

- [ ] **Step 1: Create Turnstile widget component**

Create `src/components/Turnstile.tsx`:

```typescript
"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          "error-callback"?: () => void
          "expired-callback"?: () => void
          theme?: "light" | "dark" | "auto"
          size?: "normal" | "compact"
        }
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface TurnstileProps {
  onToken: (token: string) => void
  theme?: "light" | "dark" | "auto"
}

export default function Turnstile({ onToken, theme = "dark" }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return

    function renderWidget() {
      if (!containerRef.current || !window.turnstile) return
      if (widgetIdRef.current) return // Already rendered

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey!,
        callback: onToken,
        "expired-callback": () => onToken(""),
        theme,
      })
    }

    // Load script if not already loaded
    if (!document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
      script.async = true
      script.onload = () => setTimeout(renderWidget, 100)
      document.head.appendChild(script)
    } else {
      // Script already loaded, render directly
      setTimeout(renderWidget, 100)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [onToken, theme])

  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return null

  return <div ref={containerRef} />
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Turnstile.tsx
git commit -m "feat(leads): add Turnstile client widget component"
```

---

### Task 11: Update ContactForm

**Files:**
- Modify: `src/app/(public)/contact/ContactForm.tsx`

- [ ] **Step 1: Rewrite ContactForm with Turnstile and API submission**

Replace the contents of `src/app/(public)/contact/ContactForm.tsx` with:

```typescript
"use client"

import { useState, useCallback } from "react"
import { Send, CheckCircle, Loader2 } from "lucide-react"
import Turnstile from "@/components/Turnstile"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const handleToken = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot check
    if (formData.get("_hp")) return

    setSubmitting(true)

    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          turnstileToken,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Submission failed")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-bg-card border border-brand-gold/20 rounded-xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-brand-gold mx-auto mb-6" />
        <h3 className="text-2xl font-heading font-bold text-white mb-3">Message Sent</h3>
        <p className="text-white/60 max-w-md mx-auto">
          Thank you for reaching out. Our team will get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="john@abcsignco.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-heading font-medium text-white/60 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
          placeholder="General inquiry, partnership, technical question..."
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-heading font-medium text-white/60 mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <Turnstile onToken={handleToken} />

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto gap-2">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {submitting ? "Sending..." : "Send Message"}
      </button>

      <p className="text-white/30 text-xs">
        Your information is kept confidential. We typically respond within one business day.
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(public)/contact/ContactForm.tsx"
git commit -m "feat(leads): wire ContactForm to API with Turnstile verification"
```

---

### Task 12: Update QuoteForm

**Files:**
- Modify: `src/app/(public)/get-a-quote/QuoteForm.tsx`

- [ ] **Step 1: Rewrite QuoteForm with Turnstile, file upload, and API submission**

Replace the contents of `src/app/(public)/get-a-quote/QuoteForm.tsx` with:

```typescript
"use client"

import { useState, useCallback } from "react"
import { Send, CheckCircle, Loader2 } from "lucide-react"
import Turnstile from "@/components/Turnstile"

const projectTypes = [
  "Channel Letters — Face Lit",
  "Channel Letters — Halo Lit",
  "Channel Letters — Front & Halo",
  "Channel Letters — Trimless",
  "Channel Letters — Non-Illuminated",
  "Flat Cut Letters",
  "Blade Signs",
  "Cabinet Signs",
  "Lightboxes",
  "SEG Light Boxes",
  "Custom Fabrication",
  "Other",
]

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")

  const handleToken = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const form = e.currentTarget
    const htmlFormData = new FormData(form)

    // Honeypot check
    if (htmlFormData.get("_hp")) return

    setSubmitting(true)

    try {
      // Build multipart FormData with all fields + files
      const submitData = new FormData()
      submitData.set("formType", "quote")
      submitData.set("name", htmlFormData.get("name") as string)
      submitData.set("email", htmlFormData.get("email") as string)
      submitData.set("company", htmlFormData.get("company") as string || "")
      submitData.set("phone", htmlFormData.get("phone") as string || "")
      submitData.set("message", htmlFormData.get("description") as string || "")
      submitData.set("projectType", htmlFormData.get("projectType") as string || "")
      submitData.set("dimensions", htmlFormData.get("dimensions") as string || "")
      submitData.set("quantity", htmlFormData.get("quantity") as string || "")
      submitData.set("deadline", htmlFormData.get("deadline") as string || "")
      submitData.set("notes", "")
      submitData.set("turnstileToken", turnstileToken)

      // Attach files
      const fileInput = form.querySelector<HTMLInputElement>('input[name="files"]')
      if (fileInput?.files) {
        for (const file of Array.from(fileInput.files)) {
          submitData.append("files", file)
        }
      }

      const res = await fetch("/api/forms/submit", {
        method: "POST",
        body: submitData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Submission failed")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-bg-card border border-brand-gold/20 rounded-xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-brand-gold mx-auto mb-6" />
        <h3 className="text-2xl font-heading font-bold text-white mb-3">
          Wholesale Pricing Request Received
        </h3>
        <p className="text-white/60 max-w-md mx-auto">
          Thank you for your interest. Our trade team will review your project details and send
          detailed wholesale pricing within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="ABC Sign Co."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="john@abcsignco.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-heading font-medium text-white/60 mb-2">
          Project Type *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
        >
          <option value="" className="bg-bg-primary">Select a product type...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-bg-primary">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label htmlFor="dimensions" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Dimensions
          </label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder='e.g. 24" tall letters'
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="e.g. 1 set, 12 letters"
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-heading font-medium text-white/60 mb-2">
            Deadline
          </label>
          <input
            type="text"
            id="deadline"
            name="deadline"
            className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="e.g. 4 weeks, ASAP"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-heading font-medium text-white/60 mb-2">
          Project Notes
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors resize-none"
          placeholder="Colors, illumination preferences, installation details, or any other notes..."
        />
      </div>

      <div>
        <label htmlFor="files" className="block text-sm font-heading font-medium text-white/60 mb-2">
          Upload Files (Optional)
        </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          accept=".pdf,.ai,.eps,.svg,.jpg,.jpeg,.png,.dwg"
          className="w-full bg-bg-card border border-white/[0.06] rounded-lg px-4 py-3 text-white/60 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-brand-gold/20 file:text-brand-gold file:font-heading file:text-xs file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-brand-gold/30 transition-colors"
        />
        <p className="text-white/30 text-xs mt-1">
          PDF, AI, EPS, SVG, JPG, PNG, DWG accepted · Max 10 MB per file · Up to 3 files
        </p>
      </div>

      <Turnstile onToken={handleToken} />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto gap-2">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting ? "Submitting..." : "Request Wholesale Quote"}
        </button>
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Typical response time: within 24 hours
        </div>
      </div>

      <p className="text-white/30 text-xs">
        Trade accounts only. Your information is kept confidential and used exclusively to prepare your wholesale quote.
      </p>
    </form>
  )
}
```

Note: The `description` field in the HTML form maps to `message` in the API submission via `submitData.set("message", htmlFormData.get("description"))`.

- [ ] **Step 2: Commit**

```bash
git add "src/app/(public)/get-a-quote/QuoteForm.tsx"
git commit -m "feat(leads): wire QuoteForm to API with Turnstile and file upload"
```

---

## Chunk 5: Environment Setup and Final Verification

### Task 13: Environment Variables Template

**Files:**
- Modify: `.env.local` — add placeholder vars (do not commit secrets)

- [ ] **Step 1: Add env vars to .env.local**

Add these lines to `.env.local` (do NOT commit this file — it should be in `.gitignore`):

```
# Resend (email)
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
ONEDRIVE_USER_ID=
ONEDRIVE_UPLOAD_FOLDER=Sunlite Leads
```

- [ ] **Step 2: No commit needed** — .env.local is gitignored

---

### Task 14: Build Verification and Final Push

- [ ] **Step 1: Build the project**

```bash
npx next build
```

Expected: Build succeeds with no type errors.

- [ ] **Step 2: Fix any build errors**

If there are type errors or import issues, fix them.

- [ ] **Step 3: Push to remote**

```bash
git push sls2026 main
```
