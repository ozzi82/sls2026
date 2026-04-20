import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MobileCTABar from "@/components/MobileCTABar";
import { loadSiteSettings, getPublicConsentConfig } from "@/lib/admin/site-settings"
import CookieConsent from "@/components/CookieConsent"
import TrackingScripts from "@/components/TrackingScripts"
import OpenReplayTracker from "@/components/OpenReplayTracker"
import { getLocale } from "@/lib/i18n/get-locale"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await loadSiteSettings()
  const consentConfig = getPublicConsentConfig(settings)
  const locale = await getLocale()

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('sunlite-theme');if(t)document.documentElement.classList.add('theme-'+t)}catch(e){}})()`,
        }}
      />
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <MobileCTABar locale={locale} />
      <ThemeSwitcher />

      {/* Consent config inlined for client components */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__CONSENT_CONFIG__=${JSON.stringify(consentConfig)};`,
        }}
      />

      {/* GTM noscript fallback */}
      {settings.google.enabled && settings.google.gtmContainerId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${settings.google.gtmContainerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}

      {/* Tracking & consent components */}
      <TrackingScripts google={settings.google} consentCategories={settings.cookieConsent.categories} />
      <OpenReplayTracker openreplay={settings.openreplay} consentCategories={settings.cookieConsent.categories} />
      <CookieConsent />
    </>
  );
}
