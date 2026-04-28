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
          await saveLead(lead)
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
