"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { useSettingsSection } from "@/hooks/useSettingsSection";
import type {
  CookieConsentSettings,
  ConsentCategory,
  ConsentColors,
} from "@/lib/admin/site-settings-types";

const INTEGRATION_OPTIONS = [
  { value: "ga4", label: "Google Analytics 4" },
  { value: "gtm", label: "Google Tag Manager" },
  { value: "google-ads", label: "Google Ads" },
  { value: "openreplay", label: "OpenReplay" },
];

function nameToId(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function CookieConsentSettingsPage() {
  const { form, setForm, loading, saving, handleSave } = useSettingsSection("cookieConsent");

  // Collapsible sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    general: true,
    text: false,
    colors: false,
    categories: false,
  });

  function toggleSection(key: string) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function updateForm<K extends keyof CookieConsentSettings>(
    key: K,
    value: CookieConsentSettings[K]
  ) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  function updateColor<K extends keyof ConsentColors>(key: K, value: string) {
    setForm((prev) => prev ? ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }) : prev);
  }

  function updateCategory(index: number, partial: Partial<ConsentCategory>) {
    setForm((prev) => {
      if (!prev) return prev;
      const cats = [...prev.categories];
      cats[index] = { ...cats[index], ...partial };
      if (partial.name !== undefined && index > 0) {
        cats[index].id = nameToId(partial.name);
      }
      return { ...prev, categories: cats };
    });
  }

  function toggleCategoryIntegration(catIndex: number, integration: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const cats = [...prev.categories];
      const current = cats[catIndex].integrations;
      cats[catIndex] = {
        ...cats[catIndex],
        integrations: current.includes(integration)
          ? current.filter((i) => i !== integration)
          : [...current, integration],
      };
      return { ...prev, categories: cats };
    });
  }

  function addCategory() {
    setForm((prev) => prev ? ({
      ...prev,
      categories: [
        ...prev.categories,
        { id: "", name: "", description: "", required: false, integrations: [] },
      ],
    }) : prev);
  }

  function removeCategory(index: number) {
    setForm((prev) => prev ? ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }) : prev);
  }

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  // Derive transparent state from form data (no redundant state)
  const manageBgTransparent = form.colors.manageBg === "transparent";

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Cookie Consent</h1>
      <p className="text-gray-500 mb-8">
        Customize the cookie consent banner appearance, text, and cookie categories.
      </p>

      <div className="space-y-4">
        {/* ═══ Section 1: General ═══ */}
        <Section
          title="General"
          open={openSections.general}
          onToggle={() => toggleSection("general")}
        >
          <div className="space-y-5">
            <ToggleSwitch
              checked={form.enabled}
              onChange={(v) => updateForm("enabled", v)}
              label="Enable Cookie Consent Banner"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Position
              </label>
              <select
                value={form.position}
                onChange={(e) =>
                  updateForm(
                    "position",
                    e.target.value as CookieConsentSettings["position"]
                  )
                }
                className="h-8 w-full max-w-xs rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="bottom-bar">Bottom Bar</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy URL
              </label>
              <Input
                value={form.privacyPolicyUrl}
                onChange={(e) => updateForm("privacyPolicyUrl", e.target.value)}
                placeholder="/privacy-policy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consent Expiry (days)
              </label>
              <Input
                type="number"
                min={1}
                max={3650}
                value={form.consentExpiryDays}
                onChange={(e) =>
                  updateForm("consentExpiryDays", parseInt(e.target.value) || 365)
                }
                className="max-w-[140px]"
              />
            </div>
          </div>
        </Section>

        {/* ═══ Section 2: Text Customization ═══ */}
        <Section
          title="Text Customization"
          open={openSections.text}
          onToggle={() => toggleSection("text")}
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Title
              </label>
              <Input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="We value your privacy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-y"
                placeholder="We use cookies to enhance your browsing experience..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accept All Button Text
                </label>
                <Input
                  value={form.acceptAllText}
                  onChange={(e) => updateForm("acceptAllText", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reject All Button Text
                </label>
                <Input
                  value={form.rejectAllText}
                  onChange={(e) => updateForm("rejectAllText", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manage Preferences Button Text
              </label>
              <Input
                value={form.manageText}
                onChange={(e) => updateForm("manageText", e.target.value)}
              />
            </div>
          </div>
        </Section>

        {/* ═══ Section 3: Colors ═══ */}
        <Section
          title="Colors"
          open={openSections.colors}
          onToggle={() => toggleSection("colors")}
        >
          <div className="grid grid-cols-2 gap-4">
            <ColorField
              label="Banner Background"
              value={form.colors.bannerBg}
              onChange={(v) => updateColor("bannerBg", v)}
            />
            <ColorField
              label="Banner Text"
              value={form.colors.bannerText}
              onChange={(v) => updateColor("bannerText", v)}
            />
            <ColorField
              label="Accept Button Background"
              value={form.colors.acceptBg}
              onChange={(v) => updateColor("acceptBg", v)}
            />
            <ColorField
              label="Accept Button Text"
              value={form.colors.acceptText}
              onChange={(v) => updateColor("acceptText", v)}
            />
            <ColorField
              label="Reject Button Background"
              value={form.colors.rejectBg}
              onChange={(v) => updateColor("rejectBg", v)}
            />
            <ColorField
              label="Reject Button Text"
              value={form.colors.rejectText}
              onChange={(v) => updateColor("rejectText", v)}
            />
            <div>
              <ColorField
                label="Manage Button Background"
                value={manageBgTransparent ? "#000000" : form.colors.manageBg}
                onChange={(v) => updateColor("manageBg", v)}
                disabled={manageBgTransparent}
              />
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={manageBgTransparent}
                  onChange={(e) => {
                    updateColor("manageBg", e.target.checked ? "transparent" : "#000000");
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-xs text-gray-500">Transparent background</span>
              </label>
            </div>
            <ColorField
              label="Manage Button Text"
              value={form.colors.manageText}
              onChange={(v) => updateColor("manageText", v)}
            />
          </div>
        </Section>

        {/* ═══ Section 4: Cookie Categories ═══ */}
        <Section
          title="Cookie Categories"
          open={openSections.categories}
          onToggle={() => toggleSection("categories")}
        >
          <div className="space-y-4">
            {form.categories.map((cat, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        value={cat.name}
                        onChange={(e) => updateCategory(i, { name: e.target.value })}
                        disabled={i === 0}
                      />
                      {cat.id && (
                        <p className="mt-0.5 text-xs text-gray-400">
                          ID: <code>{cat.id}</code>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={cat.description}
                        onChange={(e) =>
                          updateCategory(i, { description: e.target.value })
                        }
                        rows={2}
                        className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-y"
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cat.required}
                        onChange={(e) =>
                          updateCategory(i, { required: e.target.checked })
                        }
                        disabled={i === 0}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Required (cannot be disabled by user)</span>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Integrations
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {INTEGRATION_OPTIONS.map((opt) => (
                          <label
                            key={opt.value}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={cat.integrations.includes(opt.value)}
                              onChange={() => toggleCategoryIntegration(i, opt.value)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCategory(i)}
                      className="text-gray-400 hover:text-red-600 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addCategory}>
              <Plus className="h-4 w-4 mr-1" />
              Add Category
            </Button>
          </div>
        </Section>

        {/* ═══ Live Preview ═══ */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Banner Preview</h3>
          <div
            className={`rounded-lg p-5 ${
              form.position === "bottom-bar" ? "w-full" : "max-w-sm"
            }`}
            style={{
              backgroundColor: form.colors.bannerBg,
              color: form.colors.bannerText,
            }}
          >
            {form.title && (
              <p className="font-semibold text-sm mb-1">{form.title}</p>
            )}
            <p className="text-xs opacity-90 mb-3">
              {form.description || "Cookie consent banner description will appear here."}
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="inline-block rounded px-3 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: form.colors.acceptBg,
                  color: form.colors.acceptText,
                }}
              >
                {form.acceptAllText || "Accept All"}
              </span>
              <span
                className="inline-block rounded px-3 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: form.colors.rejectBg,
                  color: form.colors.rejectText,
                }}
              >
                {form.rejectAllText || "Reject All"}
              </span>
              <span
                className="inline-block rounded px-3 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: form.colors.manageBg,
                  color: form.colors.manageText,
                  border:
                    form.colors.manageBg === "transparent"
                      ? `1px solid ${form.colors.manageText}`
                      : "none",
                }}
              >
                {form.manageText || "Manage Preferences"}
              </span>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="pt-4 pb-8">
          <Button onClick={() => handleSave(form)} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable sub-components ─── */

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200 ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pb-4 pt-1">{children}</div>
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  // Ensure we always pass a valid hex to the color input
  const colorValue = value.startsWith("#") ? value : "#000000";
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={colorValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-8 w-10 rounded border border-gray-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <span className="text-xs text-gray-500 font-mono">
          {disabled ? "transparent" : value}
        </span>
      </div>
    </div>
  );
}
