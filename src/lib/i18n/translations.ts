import { Locale } from "./locale";

const translations: Record<Locale, Record<string, Record<string, string>>> = {
  en: {
    nav: {
      products: "Products",
      channelLetters: "Channel Letters",
      flatCutLetters: "Flat Cut Letters",
      bladeSigns: "Blade Signs",
      cabinetSigns: "Cabinet Signs",
      lightboxes: "Lightboxes",
      segLightBoxes: "SEG Light Boxes",
      customFabrication: "Custom Fabrication",
      services: "Services",
      ourStory: "Our Story",
      gallery: "Gallery",
      resources: "Resources",
      contact: "Contact",
    },
    cta: {
      getQuote: "Get Quote",
      response: "Response in 24h",
      requestPricing: "Wholesale Pricing",
      callUs: "Call Us",
    },
    utilityBar: {
      wholesaleOnly: "Wholesale Only",
      tradeAccounts: "Trade Accounts",
      usaCanada: "USA & Canada",
      ul48: "UL 48 Certified",
    },
    footer: {
      productsTitle: "Products",
      companyTitle: "Company",
      tradeResourcesTitle: "Trade Resources",
      popularTopicsTitle: "Popular Topics",
      wholesaleBanner:
        "Sunlite Signs sells exclusively to sign companies, sign shops, and trade professionals",
      brandDescription:
        "German-engineered channel letters and illuminated signage, wholesale exclusively for sign shops across the USA and Canada.",
      brandTagline:
        "Your customers are your customers. We are your silent manufacturing partner. No retail. Ever.",
      copyright: "All rights reserved.",
      blog: "Blog",
      glossary: "Glossary",
      guides: "Guides",
      faq: "FAQ",
      wholesalePolicy: "Wholesale-Only Policy",
    },
    errors: {
      notFoundTitle: "Page Not Found",
      notFoundDescription:
        "The page you are looking for does not exist or has been moved.",
      goHome: "Go Home",
      getQuote: "Get Quote",
    },
    breadcrumbs: {
      home: "Home",
    },
  },
  de: {
    nav: {
      products: "Produkte",
      channelLetters: "Leuchtbuchstaben",
      flatCutLetters: "Flachbuchstaben",
      bladeSigns: "Ausleger-Schilder",
      cabinetSigns: "Leuchtkästen",
      lightboxes: "Lichtboxen",
      segLightBoxes: "SEG-Lichtboxen",
      customFabrication: "Individuelle Fertigung",
      services: "Dienstleistungen",
      ourStory: "Über Uns",
      gallery: "Galerie",
      resources: "Ressourcen",
      contact: "Kontakt",
    },
    cta: {
      getQuote: "Angebot Anfordern",
      response: "Antwort in 24h",
      requestPricing: "Großhandelspreise Anfragen",
      callUs: "Anrufen",
    },
    utilityBar: {
      wholesaleOnly: "Nur Großhandel",
      tradeAccounts: "Händlerkonten",
      usaCanada: "USA & Kanada",
      ul48: "UL 48 Zertifiziert",
    },
    footer: {
      productsTitle: "Produkte",
      companyTitle: "Unternehmen",
      tradeResourcesTitle: "Händler-Ressourcen",
      popularTopicsTitle: "Beliebte Themen",
      wholesaleBanner:
        "Sunlite Signs verkauft ausschließlich an Schilderunternehmen, Schilderwerkstätten und Fachbetriebe",
      brandDescription:
        "Deutsche Ingenieurskunst — Leuchtbuchstaben und beleuchtete Schilder im Großhandel, exklusiv für Schilderwerkstätten in den USA und Kanada.",
      brandTagline:
        "Ihre Kunden sind Ihre Kunden. Wir sind Ihr stiller Fertigungspartner. Kein Einzelhandel. Niemals.",
      copyright: "Alle Rechte vorbehalten.",
      blog: "Blog",
      glossary: "Glossar",
      guides: "Ratgeber",
      faq: "FAQ",
      wholesalePolicy: "Nur-Großhandel-Richtlinie",
    },
    errors: {
      notFoundTitle: "Seite nicht gefunden",
      notFoundDescription:
        "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      goHome: "Zur Startseite",
      getQuote: "Angebot Anfordern",
    },
    breadcrumbs: {
      home: "Startseite",
    },
  },
};

export function t(locale: Locale, key: string): string {
  const parts = key.split(".");
  const lang = translations[locale];
  const en = translations.en;

  let current: Record<string, string> | undefined;
  let fallback: Record<string, string> | undefined;

  if (parts.length === 2) {
    const [section, field] = parts;
    current = lang[section];
    fallback = en[section];
    if (current && field in current) return current[field];
    if (fallback && field in fallback) return fallback[field];
  }

  return key;
}

export default translations;
