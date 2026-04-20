import { headers } from "next/headers";
import { Locale } from "./locale";

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const locale = h.get("x-locale");
  return locale === "de" ? "de" : "en";
}
