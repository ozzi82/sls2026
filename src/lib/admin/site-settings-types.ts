export interface GoogleSettings {
  enabled: boolean
  ga4MeasurementId: string
  ga4PropertyId: string
  gtmContainerId: string
  adsConversionId: string
  adsConversionLabel: string
}

export interface OpenReplaySettings {
  enabled: boolean
  serverUrl: string
  projectKey: string
  ingestPoint: string
}

export interface ConsentCategory {
  id: string
  name: string
  description: string
  required: boolean
  integrations: string[]
}

export interface ConsentColors {
  bannerBg: string
  bannerText: string
  acceptBg: string
  acceptText: string
  rejectBg: string
  rejectText: string
  manageBg: string
  manageText: string
}

export interface CookieConsentSettings {
  enabled: boolean
  position: "bottom-bar" | "bottom-left" | "bottom-right"
  title: string
  description: string
  acceptAllText: string
  rejectAllText: string
  manageText: string
  privacyPolicyUrl: string
  consentExpiryDays: number
  colors: ConsentColors
  categories: ConsentCategory[]
}

export interface AppearanceSettings {
  theme: "gold" | "blue" | "red" | "emerald" | "bold"
}

export interface SiteSettings {
  google: GoogleSettings
  openreplay: OpenReplaySettings
  cookieConsent: CookieConsentSettings
  appearance: AppearanceSettings
}

export interface EditLogEntry {
  slug: string
  pageType: "product" | "landing" | "static"
  label: string
  timestamp: string
  username?: string
}

// Public consent config (no secrets) — currently identical to CookieConsentSettings
// Kept as separate type alias in case the public shape diverges in the future
export type PublicConsentConfig = CookieConsentSettings
