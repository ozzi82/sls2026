"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { getConsentState } from "@/lib/consent"
import type { GoogleSettings, CookieConsentSettings } from "@/lib/admin/site-settings-types"

interface Props {
  google: GoogleSettings
  consentCategories: CookieConsentSettings["categories"]
}

export default function TrackingScripts({ google, consentCategories }: Props) {
  const [consented, setConsented] = useState<string[]>([])

  useEffect(() => {
    function checkConsent() {
      const state = getConsentState()
      setConsented(state?.accepted || [])
    }
    checkConsent()
    window.addEventListener("consent-updated", checkConsent)
    return () => window.removeEventListener("consent-updated", checkConsent)
  }, [])

  if (!google.enabled) return null

  const hasAnalyticsConsent = consentCategories.some(
    (cat) => consented.includes(cat.id) && cat.integrations.includes("ga4")
  )
  const hasMarketingConsent = consentCategories.some(
    (cat) => consented.includes(cat.id) && cat.integrations.includes("gtm")
  )

  const useDirectGA4 = google.ga4MeasurementId && !google.gtmContainerId
  const useGTM = google.gtmContainerId

  return (
    <>
      {useGTM && hasMarketingConsent && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${google.gtmContainerId}');`,
          }}
        />
      )}

      {useDirectGA4 && hasAnalyticsConsent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${google.ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${google.ga4MeasurementId}');`,
            }}
          />
        </>
      )}

      {google.adsConversionId && !useGTM && hasMarketingConsent && (
        <Script
          id="gads-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `gtag('config','${google.adsConversionId}');`,
          }}
        />
      )}
    </>
  )
}
