export type Locale = "en" | "de";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "de"];

export function localePath(locale: Locale, path: string): string {
  if (locale === "de") return `/de${path}`;
  return path;
}

export function getAlternates(path: string) {
  const baseUrl = "https://sunlitesigns.com";
  return {
    canonical: `${baseUrl}${path}`,
    languages: {
      en: `${baseUrl}${path}`,
      de: `${baseUrl}/de${path}`,
      "x-default": `${baseUrl}${path}`,
    },
  };
}
