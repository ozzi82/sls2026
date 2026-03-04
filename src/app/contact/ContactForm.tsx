"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    const form = e.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>('[name="company_url"]');
    if (honeypot && honeypot.value) return;

    // Client-side only for now
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white/5 border border-brand-gold/20 rounded-xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-brand-gold mx-auto mb-6" />
        <h3 className="text-2xl font-heading font-bold text-text-light mb-3">
          Message Sent
        </h3>
        <p className="text-text-light/60 max-w-md mx-auto">
          Thank you for reaching out. Our team will get back to you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-heading font-medium text-text-light/70 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-heading font-medium text-text-light/70 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="john@abcsignco.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-heading font-medium text-text-light/70 mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
          placeholder="General inquiry, partnership, technical question..."
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-heading font-medium text-text-light/70 mb-2"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto gap-2">
        <Send className="w-4 h-4" />
        Send Message
      </button>

      <p className="text-text-light/30 text-xs">
        Your information is kept confidential. We typically respond within one
        business day.
      </p>
    </form>
  );
}
