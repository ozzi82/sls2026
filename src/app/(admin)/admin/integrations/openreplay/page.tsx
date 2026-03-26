"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { useSettingsSection } from "@/hooks/useSettingsSection";
import type { OpenReplaySettings } from "@/lib/admin/site-settings-types";

export default function OpenReplaySettingsPage() {
  const { form, setForm, loading, saving, handleSave } = useSettingsSection("openreplay");

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  function update<K extends keyof OpenReplaySettings>(key: K, value: OpenReplaySettings[K]) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  const notConnected = !form.serverUrl.trim() || !form.projectKey.trim();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Heatmap & Session Recording</h1>
      <p className="text-gray-500 mb-6">
        Configure OpenReplay for session recording, heatmaps, and user behavior analysis.
      </p>

      <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 mb-8">
        OpenReplay requires a self-hosted server. Deploy via Docker/Coolify on your server, then
        enter the connection details below.
      </div>

      <div className="space-y-6">
        <ToggleSwitch
          checked={form.enabled}
          onChange={(v) => update("enabled", v)}
          label="Enable OpenReplay"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Server URL</label>
          <Input
            value={form.serverUrl}
            onChange={(e) => update("serverUrl", e.target.value)}
            placeholder="https://openreplay.yourdomain.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Key</label>
          <Input
            value={form.projectKey}
            onChange={(e) => update("projectKey", e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-400">
            Found in OpenReplay &rarr; Project Settings
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingest Point{" "}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <Input
            value={form.ingestPoint}
            onChange={(e) => update("ingestPoint", e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-400">
            Override the default data collection endpoint
          </p>
        </div>

        {notConnected && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
            Not connected — enter server URL and project key to activate.
          </div>
        )}

        <div className="pt-4">
          <Button onClick={() => handleSave(form)} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
