"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-primary-dark/95 backdrop-blur-sm border-t border-white/10 px-4 py-3">
      <div className="flex items-center gap-3">
        <a
          href="tel:+1234567890"
          className="flex items-center justify-center w-12 h-12 border border-white/20 rounded text-text-light hover:text-brand-gold transition-colors"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
        </a>
        <Link href="/get-a-quote" className="btn-primary flex-1 text-center text-xs py-3">
          Request Wholesale Pricing
        </Link>
      </div>
    </div>
  );
}
