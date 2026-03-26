"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import type { SiteSettings } from "@/lib/admin/site-settings-types"

type SettingsResponse = SiteSettings & { hasServiceAccount: boolean }

export function useSettingsSection<K extends keyof SiteSettings>(sectionKey: K) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullSettings, setFullSettings] = useState<SettingsResponse | null>(null)
  const [form, setForm] = useState<SiteSettings[K] | null>(null)

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: SettingsResponse) => {
        setFullSettings(data)
        setForm(data[sectionKey])
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false))
  }, [sectionKey])

  async function handleSave(formData: SiteSettings[K]) {
    if (!fullSettings) return
    setSaving(true)
    try {
      const body: SiteSettings = {
        google: fullSettings.google,
        openreplay: fullSettings.openreplay,
        cookieConsent: fullSettings.cookieConsent,
        [sectionKey]: formData,
      }
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Save failed")
      setFullSettings({ ...fullSettings, [sectionKey]: formData })
      toast.success("Settings saved")
    } catch {
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  return {
    form,
    setForm,
    loading,
    saving,
    handleSave,
    hasServiceAccount: fullSettings?.hasServiceAccount ?? false,
  }
}
