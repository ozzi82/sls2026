"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navigation = [
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Channel Letters", href: "/products/channel-letters" },
      { name: "Flat Cut Letters", href: "/products/flat-cut-letters" },
      { name: "Blade Signs", href: "/products/blade-signs" },
      { name: "Cabinet Signs", href: "/products/cabinet-signs" },
      { name: "Lightboxes", href: "/products/lightboxes" },
      { name: "SEG Light Boxes", href: "/products/seg-light-boxes" },
      { name: "Custom Fabrication", href: "/products/custom-fabrication" },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A] border-b border-white/[0.06] shadow-[0_1px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      {/* Utility bar — always visible, collapses on scroll */}
      <div className={`transition-all duration-500 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"}`}>
        <div className="border-b border-white/[0.04] bg-[#0A0A0A]">
          <div className="container-max flex items-center justify-center gap-6 px-4 py-1.5">
            {["Wholesale Only", "Trade Accounts", "USA & Canada", "UL 48 Listed"].map((item, i) => (
              <span key={i} className="hidden sm:flex items-center gap-2 text-[10px] font-heading uppercase tracking-[0.15em] text-white/30">
                {i > 0 && <span className="text-brand-gold/30 text-[6px]">&#x25C6;</span>}
                {item}
              </span>
            ))}
            <span className="sm:hidden text-[10px] font-heading uppercase tracking-[0.15em] text-white/30">
              Wholesale Only &middot; Trade Accounts
            </span>
          </div>
        </div>
      </div>
      <div className="container-max">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-text-light font-heading font-bold text-lg tracking-[0.02em] transition-colors">
              SUNLITE
            </span>
            <span className="w-px h-4 bg-brand-gold/40 transition-colors group-hover:bg-brand-gold" />
            <span className="text-brand-gold font-heading font-bold text-lg tracking-[0.02em]">
              SIGNS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-white/60 hover:text-white text-[13px] font-heading font-medium uppercase tracking-[0.08em] transition-colors flex items-center gap-1"
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="w-3 h-3 opacity-40" />
                  )}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-3">
                    <div className="bg-bg-card border border-white/5 rounded-sm shadow-2xl py-2 min-w-[240px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-white/50 hover:text-brand-gold hover:bg-white/[0.02] transition-colors"
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
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+6892940912"
              className="flex items-center gap-2 text-white/40 hover:text-brand-gold text-xs font-heading tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (689) 294-0912
            </a>
            <Link
              href="/get-a-quote"
              className="bg-gradient-to-r from-cta to-cta-hover text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md px-6 py-2.5 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all flex items-center gap-3"
            >
              Get Trade Quote
              <span className="text-[9px] font-normal normal-case tracking-normal text-white/60 border-l border-white/20 pl-3">
                24h response
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-light p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-bg-primary/98 backdrop-blur-md">
            <div className="px-4 py-6 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-white/60 hover:text-brand-gold font-heading text-sm uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-0.5 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-white/30 hover:text-brand-gold text-sm transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 border-t border-white/5 space-y-3">
                <a
                  href="tel:+6892940912"
                  className="flex items-center gap-2 text-white/40 text-sm py-2"
                >
                  <Phone className="w-4 h-4" />
                  (689) 294-0912
                </a>
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
