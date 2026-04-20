"use client";

import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const switchPath =
    locale === "de" ? pathname.replace(/^\/de/, "") || "/" : `/de${pathname}`;

  const handleSwitch = () => {
    document.cookie = `locale-preference=${locale === "de" ? "en" : "de"}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.href = switchPath;
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-heading tracking-wider transition-colors"
      aria-label={
        locale === "de" ? "Switch to English" : "Auf Deutsch wechseln"
      }
    >
      <Globe className="w-3.5 h-3.5" />
      <span
        className={locale === "en" ? "text-white font-bold" : "opacity-50"}
      >
        EN
      </span>
      <span className="opacity-30">|</span>
      <span
        className={locale === "de" ? "text-white font-bold" : "opacity-50"}
      >
        DE
      </span>
    </button>
  );
}
