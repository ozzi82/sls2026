"use client";

import { useState, useEffect } from "react";
import LocaleLink from "@/components/LocaleLink";
import { t } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/locale";
import { Phone, ArrowRight } from "lucide-react";

export default function MobileCTABar({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/[0.08] px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          <a
            href="tel:+6892940912"
            className="flex items-center justify-center w-11 h-11 border border-white/10 rounded-lg text-white/50 hover:text-brand-gold transition-colors shrink-0"
            aria-label={t(locale as Locale, "cta.callUs")}
          >
            <Phone className="w-4 h-4" />
          </a>
          <LocaleLink locale={locale} href="/get-a-quote" className="btn-primary flex-1 text-center text-xs py-3 flex items-center justify-center gap-2">
            {t(locale as Locale, "cta.getQuote")}
            <ArrowRight className="w-3.5 h-3.5" />
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
