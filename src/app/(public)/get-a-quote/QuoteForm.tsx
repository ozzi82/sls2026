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
