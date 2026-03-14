"use client";

import { useState, useEffect } from "react";

const themes = [
  {
    id: "gold",
    label: "Warm Gold",
    swatch: "#C9A96E",
    sub: "Space Grotesk + Inter",
  },
  {
    id: "blue",
    label: "Electric Blue",
    swatch: "#38BDF8",
    sub: "Space Grotesk + Inter",
  },
  {
    id: "red",
    label: "Industrial Red",
    swatch: "#DC2626",
    sub: "Outfit + DM Sans",
  },
  {
    id: "emerald",
    label: "Midnight Emerald",
    swatch: "#10B981",
    sub: "Space Grotesk + Inter",
  },
  {
    id: "bold",
    label: "Bold Statement",
    swatch: "#F97316",
    sub: "Bebas Neue + Source Sans",
  },
];

const themeClasses = themes.map((t) => `theme-${t.id}`);

export default function ThemeSwitcher() {
  const [active, setActive] = useState("blue");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sunlite-theme");
    if (saved && themes.find((t) => t.id === saved)) {
      setActive(saved);
      applyTheme(saved);
    }
  }, []);

  function applyTheme(id: string) {
    const root = document.documentElement;
    root.classList.remove(...themeClasses);
    root.classList.add(`theme-${id}`);
    localStorage.setItem("sunlite-theme", id);
  }

  function handleSelect(id: string) {
    setActive(id);
    applyTheme(id);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {open && (
        <div className="mb-3 bg-[#111118] border border-white/10 rounded-xl p-4 shadow-2xl shadow-black/50 min-w-[220px]">
          <p className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
            Design Template
          </p>
          <div className="flex flex-col gap-1.5">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  active === theme.id
                    ? "bg-white/10 border border-white/20"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                  style={{
                    backgroundColor: theme.swatch,
                    borderColor:
                      active === theme.id
                        ? "white"
                        : "rgba(255,255,255,0.2)",
                  }}
                />
                <div>
                  <span className="text-sm text-white font-medium block leading-tight">
                    {theme.label}
                  </span>
                  <span className="text-[10px] text-white/40 leading-tight">
                    {theme.sub}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-[#111118] border border-white/10 shadow-lg shadow-black/30 flex items-center justify-center hover:border-white/20 transition-all group"
        aria-label="Switch theme"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white/60 group-hover:text-white transition-colors"
        >
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 3a7 7 0 0 1 0 14V3z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
