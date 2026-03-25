"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SiteSettings, OpenReplaySettings } from "@/lib/admin/site-settings-types";

export default function OpenReplaySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullSettings, setFullSettings] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState<OpenReplaySettings>({
    enabled: false,
    serverUrl: "",
    projectKey: "",
    ingestPoint: "",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: SiteSettings & { hasServiceAccount: boolean }) => {
        setFullSettings(data);
        setForm(data.openreplay);
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof OpenReplaySettings>(key: K, value: OpenReplaySettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!fullSettings) return;
    setSaving(true);
    try {
      const body: SiteSettings = {
        ...fullSettings,
        openreplay: form,
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

  const notConnected = !form.serverUrl.trim() || !form.projectKey.trim();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Heatmap & Session Recording</h1>
      <p className="text-gray-500 mb-6">
        Configure OpenReplay for session recording, heatmaps, and user behavior analysis.
      </p>

      {/* Info banner */}
      <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 mb-8">
        OpenReplay requires a self-hosted server. Deploy via Docker/Coolify on your server, then
        enter the connection details below.
      </div>

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
          <span className="text-sm font-medium text-gray-900">Enable OpenReplay</span>
        </label>

        {/* Server URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Server URL</label>
          <Input
            value={form.serverUrl}
            onChange={(e) => update("serverUrl", e.target.value)}
            placeholder="https://openreplay.yourdomain.com"
          />
        </div>

        {/* Project Key */}
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

        {/* Ingest Point */}
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

        {/* Status indicator */}
        {notConnected && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
            Not connected — enter server URL and project key to activate.
          </div>
        )}

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
