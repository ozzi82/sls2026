"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { useSettingsSection } from "@/hooks/useSettingsSection";
import type { GoogleSettings } from "@/lib/admin/site-settings-types";

export default function GoogleSettingsPage() {
  const { form, setForm, loading, saving, handleSave, hasServiceAccount } =
    useSettingsSection("google");

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  function update<K extends keyof GoogleSettings>(key: K, value: GoogleSettings[K]) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  const showDoubleTrackingWarning =
    form.ga4MeasurementId.trim() !== "" && form.gtmContainerId.trim() !== "";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Google Analytics & Ads</h1>
      <p className="text-gray-500 mb-8">
        Configure Google Analytics 4, Tag Manager, and Google Ads conversion tracking.
      </p>

      <div className="space-y-6">
        <ToggleSwitch
          checked={form.enabled}
          onChange={(v) => update("enabled", v)}
          label="Enable Google Integration"
        />

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

        {showDoubleTrackingWarning && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            When GTM is enabled, GA4 is typically managed through GTM. The direct GA4 script will
            be disabled to prevent double-tracking.
          </div>
        )}

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Ads Conversion Label
          </label>
          <Input
            value={form.adsConversionLabel}
            onChange={(e) => update("adsConversionLabel", e.target.value)}
          />
        </div>

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

        <div className="pt-4">
          <Button onClick={() => handleSave(form)} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
