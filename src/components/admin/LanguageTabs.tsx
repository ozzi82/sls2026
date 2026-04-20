"use client";

interface LanguageTabsProps {
  activeLocale: "en" | "de";
  onChange: (locale: "en" | "de") => void;
}

export default function LanguageTabs({ activeLocale, onChange }: LanguageTabsProps) {
  return (
    <div className="flex gap-1 mb-4 border-b border-gray-200 pb-0">
      {(["en", "de"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 -mb-px ${
            activeLocale === loc
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          {loc === "en" ? "English" : "Deutsch"}
        </button>
      ))}
    </div>
  );
}
