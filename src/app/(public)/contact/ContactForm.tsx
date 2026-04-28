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
