import type { SiteSettings, EditLogEntry, PublicConsentConfig } from "./site-settings-types"
import { readJson, writeJson } from "./content-store"

const MAX_EDIT_LOG_ENTRIES = 50

// Module-level cache to avoid re-reading on every request
let settingsCache: { data: SiteSettings; ts: number } | null = null
const SETTINGS_CACHE_TTL = 5000 // 5 seconds

export async function loadSiteSettings(): Promise<SiteSettings> {
  if (settingsCache && Date.now() - settingsCache.ts < SETTINGS_CACHE_TTL) {
    return settingsCache.data
  }
  const data = await readJson<Partial<SiteSettings>>("settings/site-settings.json")
  if (data) {
    const defaults = getDefaultSettings()
    const merged: SiteSettings = { ...defaults, ...data, appearance: data.appearance ?? defaults.appearance }
    settingsCache = { data: merged, ts: Date.now() }
    return merged
  }
  return getDefaultSettings()
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  await writeJson("settings/site-settings.json", settings)
  settingsCache = { data: settings, ts: Date.now() }
}

export function getPublicConsentConfig(settings: SiteSettings): PublicConsentConfig {
  return settings.cookieConsent
}

export async function loadEditLog(): Promise<EditLogEntry[]> {
  const data = await readJson<EditLogEntry[]>("settings/edit-log.json")
  return data ?? []
}

export async function appendEditLog(entry: Omit<EditLogEntry, "timestamp">): Promise<void> {
  const log = await loadEditLog()
  log.unshift({ ...entry, timestamp: new Date().toISOString() })
  const trimmed = log.slice(0, MAX_EDIT_LOG_ENTRIES)
  await writeJson("settings/edit-log.json", trimmed)
}

function getDefaultSettings(): SiteSettings {
  return {
    google: {
      enabled: false,
      ga4MeasurementId: "",
      ga4PropertyId: "",
      gtmContainerId: "",
      adsConversionId: "",
      adsConversionLabel: "",
    },
    openreplay: {
      enabled: false,
      serverUrl: "",
      projectKey: "",
      ingestPoint: "",
    },
    appearance: {
      theme: "blue",
    },
    cookieConsent: {
      enabled: false,
      position: "bottom-bar",
      title: "We use cookies",
      description: "We use cookies to improve your experience and analyze site traffic.",
      acceptAllText: "Accept All",
      rejectAllText: "Reject All",
      manageText: "Manage Preferences",
      privacyPolicyUrl: "/privacy",
      consentExpiryDays: 365,
      colors: {
        bannerBg: "#1a1a1a",
        bannerText: "#ffffff",
        acceptBg: "#22c55e",
        acceptText: "#ffffff",
        rejectBg: "#374151",
        rejectText: "#ffffff",
        manageBg: "transparent",
        manageText: "#9ca3af",
      },
      categories: [
        { id: "necessary", name: "Necessary", description: "Essential for the website to function", required: true, integrations: [] },
        { id: "analytics", name: "Analytics", description: "Help us understand how visitors use our site", required: false, integrations: ["ga4", "openreplay"] },
        { id: "marketing", name: "Marketing", description: "Used for advertising and conversion tracking", required: false, integrations: ["gtm", "google-ads"] },
      ],
    },
  }
}
