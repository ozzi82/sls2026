import type { ConsentCategory } from "@/lib/admin/site-settings-types"

const CONSENT_COOKIE_NAME = "cookie_consent"

export interface ConsentState {
  accepted: string[]
  timestamp: string
}

export function getConsentState(): ConsentState | null {
  if (typeof document === "undefined") return null
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`))
  if (!cookie) return null
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]))
  } catch {
    return null
  }
}

export function setConsentState(accepted: string[], expiryDays: number): void {
  const state: ConsentState = {
    accepted,
    timestamp: new Date().toISOString(),
  }
  const expires = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))};expires=${expires};path=/;SameSite=Lax`
}

export function hasConsentFor(integrationId: string, categories: ConsentCategory[]): boolean {
  const state = getConsentState()
  if (!state) return false
  return categories.some(
    (cat) =>
      (cat.required || state.accepted.includes(cat.id)) &&
      cat.integrations.includes(integrationId)
  )
}

export function revokeConsentCookies(revokedCategories: string[], categories: ConsentCategory[]): void {
  const revokedIntegrations = categories
    .filter((cat) => revokedCategories.includes(cat.id))
    .flatMap((cat) => cat.integrations)

  const cookiesToDelete: Record<string, string[]> = {
    ga4: ["_ga", "_ga_*", "_gid"],
    gtm: ["_gcl_au"],
    "google-ads": ["_gcl_aw", "_gcl_dc"],
    openreplay: ["__openreplay_*"],
  }

  for (const integration of revokedIntegrations) {
    const cookies = cookiesToDelete[integration] || []
    for (const name of cookies) {
      const deleteCookie = (cookieName: string) => {
        const hostname = window.location.hostname
        const domains = [hostname, `.${hostname}`, ""]
        for (const domain of domains) {
          const domainStr = domain ? `;domain=${domain}` : ""
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainStr}`
        }
      }

      if (name.includes("*")) {
        const prefix = name.replace("*", "")
        document.cookie.split("; ").forEach((c) => {
          const cookieName = c.split("=")[0]
          if (cookieName.startsWith(prefix)) {
            deleteCookie(cookieName)
          }
        })
      } else {
        deleteCookie(name)
      }
    }
  }
}
