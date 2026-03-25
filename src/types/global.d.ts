import type { PublicConsentConfig } from "@/lib/admin/site-settings-types"

declare global {
  interface Window {
    __CONSENT_CONFIG__?: PublicConsentConfig
    dataLayer?: any[]
  }
}

export {}
