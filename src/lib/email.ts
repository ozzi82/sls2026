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
