"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const projectTypes = [
  "Channel Letters — Front Lit",
  "Channel Letters — Halo Lit",
  "Channel Letters — Front & Halo",
  "Channel Letters — Trimless / EdgeLuxe",
  "Channel Letters — Non-Illuminated",
  "Flat Cut Letters",
  "Blade Signs",
  "Lightboxes",
  "Custom Fabrication",
  "Other",
];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    const form = e.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>('[name="website"]');
    if (honeypot && honeypot.value) return;

    // Client-side only for now — Ozan will connect HubSpot
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white/5 border border-brand-gold/20 rounded-xl p-12 text-center">
        <CheckCircle className="w-16 h-16 text-brand-gold mx-auto mb-6" />
        <h3 className="text-2xl font-heading font-bold text-text-light mb-3">
          Wholesale Pricing Request Received
        </h3>
        <p className="text-text-light/60 max-w-md mx-auto">
          Thank you for your interest. Our trade team will review your project details and send
          detailed wholesale pricing within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="ABC Sign Co."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="john@abcsignco.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
          Project Type *
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
        >
          <option value="" className="bg-primary-dark">Select a product type...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-primary-dark">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
          Project Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors resize-none"
          placeholder="Describe your project — number of letters, size, illumination type, colors, installation location, etc."
        />
      </div>

      <div>
        <label htmlFor="files" className="block text-sm font-heading font-medium text-text-light/70 mb-2">
          Upload Files (Optional)
        </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          accept=".pdf,.ai,.eps,.svg,.jpg,.jpeg,.png,.dwg"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-light/50 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-brand-gold/20 file:text-brand-gold file:font-heading file:text-xs file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-brand-gold/30 transition-colors"
        />
        <p className="text-text-light/30 text-xs mt-1">
          PDF, AI, EPS, SVG, JPG, PNG, DWG accepted
        </p>
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto gap-2">
        <Send className="w-4 h-4" />
        Request Wholesale Pricing
      </button>

      <p className="text-text-light/30 text-xs">
        Trade accounts only. Your information is kept confidential and used exclusively to prepare your wholesale quote.
      </p>
    </form>
  );
}
