import fs from "fs"
import path from "path"
import type { SiteSettings, EditLogEntry, PublicConsentConfig } from "./site-settings-types"

const SETTINGS_PATH = path.join(process.cwd(), "content/settings/site-settings.json")
const EDIT_LOG_PATH = path.join(process.cwd(), "content/settings/edit-log.json")
const MAX_EDIT_LOG_ENTRIES = 50

// Module-level cache to avoid re-reading file on every request
let settingsCache: { data: SiteSettings; ts: number } | null = null
const SETTINGS_CACHE_TTL = 5000 // 5 seconds

export function loadSiteSettings(): SiteSettings {
  if (settingsCache && Date.now() - settingsCache.ts < SETTINGS_CACHE_TTL) {
    return settingsCache.data
  }
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8")
    const data = JSON.parse(raw)
    settingsCache = { data, ts: Date.now() }
    return data
  } catch {
    return getDefaultSettings()
  }
}

export function saveSiteSettings(settings: SiteSettings): void {
  const dir = path.dirname(SETTINGS_PATH)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8")
  // Invalidate cache on write
  settingsCache = { data: settings, ts: Date.now() }
}

export function getPublicConsentConfig(settings: SiteSettings): PublicConsentConfig {
  return settings.cookieConsent
}

export function loadEditLog(): EditLogEntry[] {
  try {
    const raw = fs.readFileSync(EDIT_LOG_PATH, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function appendEditLog(entry: Omit<EditLogEntry, "timestamp">): void {
  const log = loadEditLog()
  log.unshift({ ...entry, timestamp: new Date().toISOString() })
  const trimmed = log.slice(0, MAX_EDIT_LOG_ENTRIES)
  fs.writeFileSync(EDIT_LOG_PATH, JSON.stringify(trimmed, null, 2), "utf-8")
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
