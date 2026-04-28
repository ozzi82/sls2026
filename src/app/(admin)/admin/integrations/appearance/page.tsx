"use client";

import { Button } from "@/components/ui/button";
import { useSettingsSection } from "@/hooks/useSettingsSection";
import type { AppearanceSettings } from "@/lib/admin/site-settings-types";
import { Check } from "lucide-react";

const themes = [
  {
    id: "gold" as const,
    label: "Warm Gold",
    swatch: "#C9A96E",
    fonts: "Space Grotesk + Inter",
  },
  {
    id: "blue" as const,
    label: "Electric Blue",
    swatch: "#38BDF8",
    fonts: "Space Grotesk + Inter",
  },
  {
    id: "red" as const,
    label: "Industrial Red",
    swatch: "#DC2626",
    fonts: "Outfit + DM Sans",
  },
  {
    id: "emerald" as const,
    label: "Midnight Emerald",
    swatch: "#10B981",
    fonts: "Space Grotesk + Inter",
  },
  {
    id: "bold" as const,
    label: "Bold Statement",
    swatch: "#F97316",
    fonts: "Bebas Neue + Source Sans",
  },
];

export default function AppearancePage() {
  const { form, setForm, loading, saving, handleSave } =
    useSettingsSection("appearance");

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  function handleSelect(themeId: AppearanceSettings["theme"]) {
    setForm({ theme: themeId });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Appearance</h1>
      <p className="text-gray-500 mb-8">
        Choose the design template for your public website.
      </p>

      <div className="grid gap-3">
        {themes.map((theme) => {
          const isActive = form.theme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                isActive
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 shadow-inner"
                style={{ backgroundColor: theme.swatch }}
              />
              <div className="flex-1">
                <span className="text-sm font-semibold text-gray-900 block">
                  {theme.label}
                </span>
                <span className="text-xs text-gray-500">{theme.fonts}</span>
              </div>
              {isActive && (
                <Check className="h-5 w-5 text-gray-900 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-6">
        <Button onClick={() => handleSave(form)} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
