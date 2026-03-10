import Link from "next/link";
import { Mail, Phone, MapPin, Lock } from "lucide-react";

const footerLinks = {
  Products: [
    { name: "Channel Letters", href: "/products/channel-letters" },
    { name: "Flat Cut Letters", href: "/products/flat-cut-letters" },
    { name: "Blade Signs", href: "/products/blade-signs" },
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
    <footer className="bg-primary-dark border-t border-white/10">
      {/* Wholesale Banner */}
      <div className="bg-brand-gold/10 border-b border-brand-gold/20">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Lock className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <p className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-wider">
              Sunlite Signs sells exclusively to sign companies, sign shops, and trade professionals. We do not sell to the general public.
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-gold rounded flex items-center justify-center">
                <span className="text-primary-dark font-heading font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-text-light font-heading font-bold text-xl">SUNLITE</span>
                <span className="text-brand-gold font-heading font-bold text-xl ml-1">SIGNS</span>
              </div>
            </Link>
            <p className="text-text-light/60 text-sm leading-relaxed mb-4 max-w-sm">
              German-engineered wholesale channel letters and illuminated signs — built exclusively
              for sign shops across the USA and Canada. We never sell retail.
            </p>
            <p className="text-text-light/40 text-xs leading-relaxed mb-6 max-w-sm">
              Your clients are your clients. We are your silent manufacturing partner. No retail storefront. No direct-to-consumer sales. Ever.
            </p>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 bg-brand-gold text-primary-dark font-heading font-semibold text-xs uppercase tracking-wider rounded px-5 py-2.5 hover:bg-brand-gold-light transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              Request Wholesale Pricing
            </Link>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-text-light font-heading font-semibold text-sm uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-light/50 hover:text-brand-gold text-sm transition-colors"
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
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-text-light/50">
            <a href="tel:+6892940912" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <Phone className="w-4 h-4" />
              (689) 294-0912
            </a>
            <a href="mailto:hello@sunlitesigns.com" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <Mail className="w-4 h-4" />
              hello@sunlitesigns.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Florida, USA
            </span>
          </div>
          <p className="text-text-light/30 text-xs">
            &copy; {new Date().getFullYear()} Sunlite Signs LLC. All rights reserved. Wholesale only.
          </p>
          <p className="text-text-light/20 text-[10px] mt-1">v0.3.0</p>
        </div>
      </div>
    </footer>
  );
}
