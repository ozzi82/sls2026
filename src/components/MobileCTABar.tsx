"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg-primary/95 backdrop-blur-md border-t border-white/[0.06] px-4 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <a
          href="tel:+6892940912"
          className="flex items-center justify-center w-11 h-11 border border-white/10 rounded-lg text-white/50 hover:text-brand-gold transition-colors"
          aria-label="Call us"
        >
          <Phone className="w-4 h-4" />
        </a>
        <Link href="/get-a-quote" className="btn-primary flex-1 text-center text-xs py-3 flex items-center justify-center gap-2">
          Get Trade Quote
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span className="hidden sm:block text-[9px] text-white/30 font-heading uppercase tracking-wider whitespace-nowrap">
          24h reply
        </span>
      </div>
    </div>
  );
}
