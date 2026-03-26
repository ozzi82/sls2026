"use client"

import { useEffect, useRef } from "react"
import { getConsentState } from "@/lib/consent"
import type { OpenReplaySettings, CookieConsentSettings } from "@/lib/admin/site-settings-types"

interface Props {
  openreplay: OpenReplaySettings
  consentCategories: CookieConsentSettings["categories"]
}

export default function OpenReplayTracker({ openreplay, consentCategories }: Props) {
  const trackerRef = useRef<any>(null)

  useEffect(() => {
    if (!openreplay.enabled || !openreplay.serverUrl || !openreplay.projectKey) return

    async function initTracker() {
      const state = getConsentState()
      const accepted = state?.accepted || []
      const hasConsent = consentCategories.some(
        (cat) => accepted.includes(cat.id) && cat.integrations.includes("openreplay")
      )
      if (!hasConsent) return

      const { default: Tracker } = await import("@openreplay/tracker")
      if (trackerRef.current) return

      const tracker = new Tracker({
        projectKey: openreplay.projectKey,
        ingestPoint: openreplay.ingestPoint || `${openreplay.serverUrl}/ingest`,
      })
      tracker.start()
      trackerRef.current = tracker
    }

    initTracker()

    function onConsentChange() {
      if (!trackerRef.current) {
        initTracker()
      }
    }
    window.addEventListener("consent-updated", onConsentChange)
    return () => {
      window.removeEventListener("consent-updated", onConsentChange)
      trackerRef.current?.stop()
      trackerRef.current = null
    }
  }, [openreplay, consentCategories])

  return null
}
