"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { useSettingsSection } from "@/hooks/useSettingsSection";
import type { GoogleSettings } from "@/lib/admin/site-settings-types";
import { ExternalLink } from "lucide-react";

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
          {step}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}

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
        Follow the steps below to connect Google Analytics to your site.
      </p>

      <div className="space-y-6">
        <ToggleSwitch
          checked={form.enabled}
          onChange={(v) => update("enabled", v)}
          label="Enable Google Integration"
        />

        {/* Step 1: GA4 Measurement ID */}
        <StepCard step={1} title="Add your GA4 Measurement ID">
          <p className="text-sm text-gray-500 mb-3">
            This is the tracking ID that sends visitor data to Google Analytics.
          </p>
          <ol className="text-sm text-gray-600 space-y-1 mb-3 list-decimal list-inside">
            <li>
              Open{" "}
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Google Analytics <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>Go to <strong>Admin</strong> (gear icon, bottom left)</li>
            <li>Under your property, click <strong>Data Streams</strong></li>
            <li>Click your web stream</li>
            <li>Copy the <strong>Measurement ID</strong> (starts with G-)</li>
          </ol>
          <Input
            value={form.ga4MeasurementId}
            onChange={(e) => update("ga4MeasurementId", e.target.value)}
            placeholder="G-XXXXXXXXXX"
          />
          <p className="mt-1 text-xs text-gray-400">
            Don&apos;t have GA4 yet?{" "}
            <a
              href="https://support.google.com/analytics/answer/9304153"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Create a free account
            </a>
          </p>
        </StepCard>

        {/* Step 2: GA4 Property ID (for dashboard) */}
        <StepCard step={2} title="Add your GA4 Property ID (for dashboard stats)">
          <p className="text-sm text-gray-500 mb-3">
            This numeric ID lets the admin dashboard show visitor stats.
          </p>
          <ol className="text-sm text-gray-600 space-y-1 mb-3 list-decimal list-inside">
            <li>In Google Analytics, go to <strong>Admin</strong></li>
            <li>Click <strong>Property Settings</strong></li>
            <li>Copy the <strong>Property ID</strong> (a number like 123456789)</li>
          </ol>
          <Input
            value={form.ga4PropertyId}
            onChange={(e) => update("ga4PropertyId", e.target.value)}
            placeholder="123456789"
          />
        </StepCard>

        {/* Step 3: GTM (optional) */}
        <StepCard step={3} title="Google Tag Manager (optional)">
          <p className="text-sm text-gray-500 mb-3">
            Only needed if you use GTM to manage tags. Most small sites don&apos;t need this — skip if unsure.
          </p>
          <ol className="text-sm text-gray-600 space-y-1 mb-3 list-decimal list-inside">
            <li>
              Open{" "}
              <a
                href="https://tagmanager.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Google Tag Manager <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>Your Container ID is shown at the top (starts with GTM-)</li>
          </ol>
          <Input
            value={form.gtmContainerId}
            onChange={(e) => update("gtmContainerId", e.target.value)}
            placeholder="GTM-XXXXXXX"
          />
        </StepCard>

        {showDoubleTrackingWarning && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            When GTM is enabled, GA4 is typically managed through GTM. The direct GA4 script will
            be disabled to prevent double-tracking.
          </div>
        )}

        {/* Step 4: Google Ads (optional) */}
        <StepCard step={4} title="Google Ads Conversion Tracking (optional)">
          <p className="text-sm text-gray-500 mb-3">
            Only needed if you run Google Ads and want to track conversions.
          </p>
          <ol className="text-sm text-gray-600 space-y-1 mb-3 list-decimal list-inside">
            <li>
              Open{" "}
              <a
                href="https://ads.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Google Ads <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>Go to <strong>Tools &rarr; Conversions</strong></li>
            <li>Click your conversion action, then <strong>Tag setup</strong></li>
            <li>Copy the <strong>Conversion ID</strong> (starts with AW-) and <strong>Label</strong></li>
          </ol>
          <div className="space-y-3">
            <Input
              value={form.adsConversionId}
              onChange={(e) => update("adsConversionId", e.target.value)}
              placeholder="AW-XXXXXXXXX"
            />
            <Input
              value={form.adsConversionLabel}
              onChange={(e) => update("adsConversionLabel", e.target.value)}
              placeholder="Conversion Label"
            />
          </div>
        </StepCard>

        {/* Service Account status */}
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          <span className="font-medium">Dashboard Analytics:</span>{" "}
          {hasServiceAccount ? (
            <span className="text-green-700">Service account configured &#10003;</span>
          ) : (
            <span>
              To show Google Analytics data on the dashboard, add the{" "}
              <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                GOOGLE_SERVICE_ACCOUNT_KEY
              </code>{" "}
              environment variable in Coolify. This is a JSON key from a Google Cloud service account
              with GA4 read access.
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
