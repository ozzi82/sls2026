"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navigation = [
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Channel Letters", href: "/products/channel-letters" },
      { name: "Flat Cut Letters", href: "/products/flat-cut-letters" },
      { name: "Blade Signs", href: "/products/blade-signs" },
      { name: "Lightboxes", href: "/products/lightboxes" },
      { name: "SEG Light Boxes", href: "/products/seg-light-boxes" },
      { name: "Custom Fabrication", href: "/products/custom-fabrication" },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="container-max">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-gold rounded flex items-center justify-center">
              <span className="text-primary-dark font-heading font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-text-light font-heading font-bold text-xl tracking-tight">
                SUNLITE
              </span>
              <span className="text-brand-gold font-heading font-bold text-xl tracking-tight ml-1">
                SIGNS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-text-light/80 hover:text-brand-gold text-sm font-heading font-medium uppercase tracking-wider transition-colors"
                >
                  {item.name}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-primary-dark border border-white/10 rounded-lg shadow-xl py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-text-light/70 hover:text-brand-gold hover:bg-white/5 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-text-light/70 hover:text-brand-gold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(123) 456-7890</span>
            </a>
            <Link href="/get-a-quote" className="btn-primary text-xs py-3 px-6">
              Request Wholesale Pricing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-light p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-primary-dark">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-text-light/80 hover:text-brand-gold font-heading text-sm uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-text-light/50 hover:text-brand-gold text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/get-a-quote"
                  className="btn-primary w-full text-center text-xs"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request Wholesale Pricing
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
