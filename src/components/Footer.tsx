import Link from "next/link";
import { Mail, Phone, MapPin, Lock } from "lucide-react";

const footerLinks = {
  Products: [
    { name: "Channel Letters", href: "/products/channel-letters" },
    { name: "Flat Cut Letters", href: "/products/flat-cut-letters" },
    { name: "Blade Signs", href: "/products/blade-signs" },
    { name: "Cabinet Signs", href: "/products/cabinet-signs" },
    { name: "Lightboxes", href: "/products/lightboxes" },
    { name: "SEG Light Boxes", href: "/products/seg-light-boxes" },
    { name: "Custom Fabrication", href: "/products/custom-fabrication" },
  ],
  Company: [
    { name: "Our Story", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Wholesale Only Policy", href: "/why-sunlite/wholesale-only" },
    { name: "Contact", href: "/contact" },
  ],
  "Trade Resources": [
    { name: "Blog", href: "/resources/blog" },
    { name: "Glossary", href: "/resources/glossary" },
    { name: "Guides", href: "/resources/guides" },
    { name: "FAQ", href: "/resources/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-bg-primary to-bg-navy">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* Wholesale Banner */}
      <div className="border-b border-white/[0.06]">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3">
            <Lock className="w-3.5 h-3.5 text-brand-gold/60 flex-shrink-0" />
            <p className="text-white/30 text-[11px] font-heading uppercase tracking-[0.15em]">
              Sunlite Signs sells exclusively to sign companies, sign shops, and
              trade professionals
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <span className="text-text-light font-heading font-bold text-lg tracking-[0.02em]">
                SUNLITE
              </span>
              <span className="w-px h-4 bg-brand-gold/40" />
              <span className="text-brand-gold font-heading font-bold text-lg tracking-[0.02em]">
                SIGNS
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm">
              German-engineered wholesale channel letters and illuminated signs
              — built exclusively for sign shops across the USA and Canada.
            </p>
            <p className="text-white/30 text-xs leading-relaxed mb-8 max-w-sm">
              Your clients are your clients. We are your silent manufacturing
              partner. No retail sales. Ever.
            </p>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold font-heading font-semibold text-xs uppercase tracking-wider rounded-sm px-5 py-2.5 hover:bg-brand-gold/5 hover:border-brand-gold/50 transition-all"
            >
              <Lock className="w-3 h-3" />
              Request Trade Pricing
            </Link>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white/60 font-heading font-semibold text-xs uppercase tracking-[0.15em] mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-brand-gold text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-white/40">
            <a
              href="tel:+6892940912"
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (689) 294-0912
            </a>
            <a
              href="mailto:hello@sunlitesigns.com"
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              hello@sunlitesigns.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Florida, USA
            </span>
          </div>
          <p className="text-white/15 text-xs">
            &copy; {new Date().getFullYear()} Sunlite Signs LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
