"use client";

import { useState, useEffect } from "react";
import LocaleLink from "@/components/LocaleLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/locale";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

function getNavigation(locale: string) {
  return [
    {
      name: t(locale as Locale, "nav.products"),
      href: "/products",
      children: [
        { name: t(locale as Locale, "nav.channelLetters"), href: "/products/channel-letters" },
        { name: t(locale as Locale, "nav.flatCutLetters"), href: "/products/flat-cut-letters" },
        { name: t(locale as Locale, "nav.bladeSigns"), href: "/products/blade-signs" },
        { name: t(locale as Locale, "nav.cabinetSigns"), href: "/products/cabinet-signs" },
        { name: t(locale as Locale, "nav.lightboxes"), href: "/products/lightboxes" },
        { name: t(locale as Locale, "nav.segLightBoxes"), href: "/products/seg-light-boxes" },
        { name: t(locale as Locale, "nav.customFabrication"), href: "/products/custom-fabrication" },
      ],
    },
    { name: t(locale as Locale, "nav.services"), href: "/services" },
    { name: t(locale as Locale, "nav.ourStory"), href: "/about" },
    { name: t(locale as Locale, "nav.gallery"), href: "/gallery" },
    { name: t(locale as Locale, "nav.resources"), href: "/resources" },
    { name: t(locale as Locale, "nav.contact"), href: "/contact" },
  ];
}

export default function Header({ locale }: { locale: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigation = getNavigation(locale);

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
          : "bg-[#0A0A0A]/80 backdrop-blur-md"
      }`}
    >
      {/* Utility bar — always visible, collapses on scroll */}
      <div className={`transition-all duration-500 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"}`}>
        <div className="border-b border-white/[0.04] bg-[#0A0A0A]">
          <div className="container-max flex items-center justify-center gap-6 px-4 py-1.5">
            {[t(locale as Locale, "utilityBar.wholesaleOnly"), t(locale as Locale, "utilityBar.tradeAccounts"), t(locale as Locale, "utilityBar.usaCanada"), t(locale as Locale, "utilityBar.ul48")].map((item, i) => (
              <span key={i} className="hidden sm:flex items-center gap-2 text-[10px] font-heading uppercase tracking-[0.15em] text-white/30">
                {i > 0 && <span className="text-brand-gold/30 text-[6px]">&#x25C6;</span>}
                {item}
              </span>
            ))}
            <span className="sm:hidden text-[10px] font-heading uppercase tracking-[0.15em] text-white/30">
              {t(locale as Locale, "utilityBar.wholesaleOnly")} &middot; {t(locale as Locale, "utilityBar.tradeAccounts")}
            </span>
          </div>
        </div>
      </div>
      <div className="container-max">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <LocaleLink locale={locale} href="/" className="flex items-center gap-2.5 group">
            <span className="text-text-light font-heading font-bold text-lg tracking-[0.02em] transition-colors">
              SUNLITE
            </span>
            <span className="w-px h-4 bg-brand-gold/40 transition-colors group-hover:bg-brand-gold" />
            <span className="text-brand-gold font-heading font-bold text-lg tracking-[0.02em]">
              SIGNS
            </span>
          </LocaleLink>

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
                <LocaleLink
                  locale={locale}
                  href={item.href}
                  className="text-white/60 hover:text-white text-[13px] font-heading font-medium uppercase tracking-[0.08em] transition-colors flex items-center gap-1"
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="w-3 h-3 opacity-40" />
                  )}
                </LocaleLink>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-3">
                    <div className="bg-bg-card border border-white/5 rounded-sm shadow-2xl py-2 min-w-[240px]">
                      {item.children.map((child) => (
                        <LocaleLink
                          locale={locale}
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-white/50 hover:text-brand-gold hover:bg-white/[0.02] transition-colors"
                        >
                          {child.name}
                        </LocaleLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher locale={locale} />
            <a
              href="tel:+6892940912"
              className="flex items-center gap-2 text-white/40 hover:text-brand-gold text-xs font-heading tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (689) 294-0912
            </a>
            <LocaleLink
              locale={locale}
              href="/get-a-quote"
              className="bg-gradient-to-r from-cta to-cta-hover text-white font-heading font-bold text-xs uppercase tracking-wider rounded-md px-6 py-2.5 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all flex items-center gap-3"
            >
              {t(locale as Locale, "cta.getQuote")}
              <span className="text-[9px] font-normal normal-case tracking-normal text-white/60 border-l border-white/20 pl-3">
                {t(locale as Locale, "cta.response")}
              </span>
            </LocaleLink>
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
                  <LocaleLink
                    locale={locale}
                    href={item.href}
                    className="block py-3 text-white/60 hover:text-brand-gold font-heading text-sm uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </LocaleLink>
                  {item.children && (
                    <div className="pl-4 space-y-0.5 mb-2">
                      {item.children.map((child) => (
                        <LocaleLink
                          locale={locale}
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-white/30 hover:text-brand-gold text-sm transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </LocaleLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 border-t border-white/5 space-y-3">
                <LanguageSwitcher locale={locale} />
                <a
                  href="tel:+6892940912"
                  className="flex items-center gap-2 text-white/40 text-sm py-2"
                >
                  <Phone className="w-4 h-4" />
                  (689) 294-0912
                </a>
                <LocaleLink
                  locale={locale}
                  href="/get-a-quote"
                  className="btn-primary w-full text-center text-xs"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(locale as Locale, "cta.requestPricing")}
                </LocaleLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
