import { Locale } from "./locale";

/**
 * Resolves locale-specific content from inline `de` keys.
 * - Looks for `de` key at current object level
 * - When locale is 'de' and `de` key exists: shallow-merge over parent
 * - Arrays replaced entirely (not merged)
 * - `de` key removed from output
 * - Falls back to English when `de` key missing
 */
export function resolveLocaleContent<T extends Record<string, unknown>>(
  data: T,
  locale: Locale
): T {
  if (!data || typeof data !== "object") return data;
  const result = { ...data };
  if (
    locale === "de" &&
    "de" in result &&
    typeof result.de === "object" &&
    result.de !== null
  ) {
    const deOverrides = result.de as Record<string, unknown>;
    for (const [key, value] of Object.entries(deOverrides)) {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  delete (result as Record<string, unknown>).de;
  return result;
}

export function resolveLocaleSeo<T extends Record<string, unknown>>(
  seo: T,
  locale: Locale
): T {
  return resolveLocaleContent(seo, locale);
}

export function resolveLocaleBlockData<T extends Record<string, unknown>>(
  data: T,
  locale: Locale
): T {
  return resolveLocaleContent(data, locale);
}
