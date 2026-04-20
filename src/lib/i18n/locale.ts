import { headers } from "next/headers";

export type Locale = "en" | "de";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "de"];

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const locale = h.get("x-locale");
  return locale === "de" ? "de" : "en";
}

export function localePath(locale: Locale, path: string): string {
  if (locale === "de") return `/de${path}`;
  return path;
}
