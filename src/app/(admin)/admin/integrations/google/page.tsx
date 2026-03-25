"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SiteSettings, GoogleSettings } from "@/lib/admin/site-settings-types";

export default function GoogleSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullSettings, setFullSettings] = useState<SiteSettings | null>(null);
  const [hasServiceAccount, setHasServiceAccount] = useState(false);
  const [form, setForm] = useState<GoogleSettings>({
    enabled: false,
    ga4MeasurementId: "",
    ga4PropertyId: "",
    gtmContainerId: "",
    adsConversionId: "",
    adsConversionLabel: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: SiteSettings & { hasServiceAccount: boolean }) => {
        setFullSettings(data);
        setHasServiceAccount(data.hasServiceAccount);
        setForm(data.google);
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof GoogleSettings>(key: K, value: GoogleSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!fullSettings) return;
    setSaving(true);
    try {
      const body: SiteSettings = {
        ...fullSettings,
        google: form,
      };
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Save failed");
      setFullSettings(body);
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  const showDoubleTrackingWarning =
    form.ga4MeasurementId.trim() !== "" && form.gtmContainerId.trim() !== "";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Google Analytics & Ads</h1>
      <p className="text-gray-500 mb-8">
        Configure Google Analytics 4, Tag Manager, and Google Ads conversion tracking.
      </p>

      <div className="space-y-6">
        {/* Enable toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={form.enabled}
            onClick={() => update("enabled", !form.enabled)}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors ${
              form.enabled ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
                form.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-900">Enable Google Integration</span>
        </label>

        {/* GA4 Measurement ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GA4 Measurement ID
          </label>
          <Input
            value={form.ga4MeasurementId}
            onChange={(e) => update("ga4MeasurementId", e.target.value)}
            placeholder="G-XXXXXXXXXX"
          />
          <p className="mt-1 text-xs text-gray-400">
            Found in GA4 Admin &rarr; Data Streams
          </p>
        </div>

        {/* GA4 Property ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GA4 Property ID
          </label>
          <Input
            value={form.ga4PropertyId}
            onChange={(e) => update("ga4PropertyId", e.target.value)}
            placeholder="123456789"
          />
          <p className="mt-1 text-xs text-gray-400">
            Numeric ID found in GA4 Admin &rarr; Property Settings. Required for dashboard
            analytics.
          </p>
        </div>

        {/* GTM Container ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GTM Container ID
          </label>
          <Input
            value={form.gtmContainerId}
            onChange={(e) => update("gtmContainerId", e.target.value)}
            placeholder="GTM-XXXXXXX"
          />
          <p className="mt-1 text-xs text-gray-400">Found in GTM workspace header</p>
        </div>

        {/* Double-tracking warning */}
        {showDoubleTrackingWarning && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            When GTM is enabled, GA4 is typically managed through GTM. The direct GA4 script will
            be disabled to prevent double-tracking.
          </div>
        )}

        {/* Google Ads Conversion ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Ads Conversion ID
          </label>
          <Input
            value={form.adsConversionId}
            onChange={(e) => update("adsConversionId", e.target.value)}
            placeholder="AW-XXXXXXXXX"
          />
        </div>

        {/* Google Ads Conversion Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Ads Conversion Label
          </label>
          <Input
            value={form.adsConversionLabel}
            onChange={(e) => update("adsConversionLabel", e.target.value)}
          />
        </div>

        {/* Service Account status */}
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          <span className="font-medium">Service Account:</span>{" "}
          {hasServiceAccount ? (
            <span className="text-green-700">Service account configured &#10003;</span>
          ) : (
            <span>
              To see analytics on the dashboard, set the{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                GOOGLE_SERVICE_ACCOUNT_KEY
              </code>{" "}
              environment variable.
            </span>
          )}
        </div>

        {/* Save */}
        <div className="pt-4">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
