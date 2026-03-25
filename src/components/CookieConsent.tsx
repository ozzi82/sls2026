"use client"

import { useEffect, useState } from "react"
import type { PublicConsentConfig, ConsentCategory } from "@/lib/admin/site-settings-types"
import { getConsentState, setConsentState, revokeConsentCookies } from "@/lib/consent"

export default function CookieConsent() {
  const [config, setConfig] = useState<PublicConsentConfig | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const cfg = window.__CONSENT_CONFIG__
    if (!cfg || !cfg.enabled) return
    setConfig(cfg)

    const requiredIds = cfg.categories.filter((c) => c.required).map((c) => c.id)
    const state = getConsentState()
    if (!state) {
      setSelectedCategories(new Set(requiredIds))
      setShowBanner(true)
    } else {
      setSelectedCategories(new Set(state.accepted))
    }
  }, [])

  if (!mounted || !config) return null

  const { categories, colors, position, consentExpiryDays } = config
  const allIds = categories.map((c) => c.id)
  const requiredIds = categories.filter((c) => c.required).map((c) => c.id)

  function dispatchConsentUpdated() {
    window.dispatchEvent(new CustomEvent("consent-updated"))
  }

  function handleAcceptAll() {
    setConsentState(allIds, consentExpiryDays)
    setSelectedCategories(new Set(allIds))
    setShowBanner(false)
    setShowPreferences(false)
    dispatchConsentUpdated()
  }

  function handleRejectAll() {
    setConsentState(requiredIds, consentExpiryDays)
    const nonRequired = allIds.filter((id) => !requiredIds.includes(id))
    setSelectedCategories(new Set(requiredIds))
    setShowBanner(false)
    setShowPreferences(false)
    dispatchConsentUpdated()
    revokeConsentCookies(nonRequired, categories)
  }

  function handleSavePreferences() {
    const selectedIds = Array.from(selectedCategories)
    const deselected = allIds.filter((id) => !selectedCategories.has(id))
    setConsentState(selectedIds, consentExpiryDays)
    setShowBanner(false)
    setShowPreferences(false)
    dispatchConsentUpdated()
    if (deselected.length > 0) {
      revokeConsentCookies(deselected, categories)
    }
  }

  function handleOpenSettings() {
    const state = getConsentState()
    if (state) {
      setSelectedCategories(new Set(state.accepted))
    }
    setShowPreferences(true)
  }

  function toggleCategory(id: string, required: boolean) {
    if (required) return
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Position classes for banner card variants
  const positionClasses: Record<string, string> = {
    "bottom-bar": "fixed bottom-0 left-0 right-0 w-full",
    "bottom-left": "fixed bottom-4 left-4 max-w-sm w-full",
    "bottom-right": "fixed bottom-4 right-4 max-w-sm w-full",
  }
  const bannerClass = positionClasses[position] ?? positionClasses["bottom-bar"]

  const hasConsentAlready = !showBanner && getConsentState() !== null

  return (
    <>
      {/* Cookie Settings floating button — shown after consent given */}
      {hasConsentAlready && !showPreferences && (
        <button
          onClick={handleOpenSettings}
          className="fixed bottom-4 left-4 z-[9999] rounded-full px-4 py-2 text-xs font-medium shadow-md backdrop-blur-sm transition-opacity hover:opacity-90"
          style={{
            background: colors.manageBg,
            color: colors.manageText,
            opacity: 0.85,
          }}
          aria-label="Cookie Settings"
        >
          Cookie Settings
        </button>
      )}

      {/* Main banner */}
      {showBanner && !showPreferences && (
        <div
          className={`${bannerClass} z-[9999] shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
          style={{ background: colors.bannerBg, color: colors.bannerText }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
        >
          <div className="p-5 flex flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold mb-1">{config.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{config.description}</p>
              {config.privacyPolicyUrl && (
                <a
                  href={config.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline opacity-80 hover:opacity-100 mt-1 inline-block"
                  style={{ color: colors.bannerText }}
                >
                  Privacy Policy
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: colors.acceptBg, color: colors.acceptText }}
              >
                {config.acceptAllText}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: colors.rejectBg, color: colors.rejectText }}
              >
                {config.rejectAllText}
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: colors.manageBg, color: colors.manageText }}
              >
                {config.manageText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPreferences(false)}
          />

          {/* Modal card */}
          <div
            className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
            style={{ background: colors.bannerBg, color: colors.bannerText }}
          >
            <div className="p-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
              <div>
                <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                <p className="text-sm opacity-80 mt-1">
                  Choose which cookies you allow. Necessary cookies are always enabled.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {categories.map((cat: ConsentCategory) => (
                  <div key={cat.id} className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{cat.name}</span>
                        {cat.required && (
                          <span className="text-xs opacity-60 italic">Always on</span>
                        )}
                      </div>
                      <p className="text-xs opacity-70 mt-0.5 leading-relaxed">{cat.description}</p>
                    </div>
                    {/* Toggle switch */}
                    <button
                      role="switch"
                      aria-checked={cat.required || selectedCategories.has(cat.id)}
                      aria-label={`Toggle ${cat.name}`}
                      disabled={cat.required}
                      onClick={() => toggleCategory(cat.id, cat.required)}
                      className={`relative flex-shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                        cat.required ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      }`}
                      style={{
                        background:
                          cat.required || selectedCategories.has(cat.id)
                            ? colors.acceptBg
                            : "#9ca3af",
                      }}
                    >
                      <span
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                        style={{
                          transform:
                            cat.required || selectedCategories.has(cat.id)
                              ? "translateX(20px)"
                              : "translateX(0)",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ background: colors.acceptBg, color: colors.acceptText }}
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ background: colors.manageBg, color: colors.manageText }}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
