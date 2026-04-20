import LocaleLink from "@/components/LocaleLink";
import { t } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/locale";
import { Mail, Phone, MapPin, Lock } from "lucide-react";

function getFooterLinks(locale: string) {
  return {
    [t(locale as Locale, "footer.productsTitle")]: [
      { name: t(locale as Locale, "nav.channelLetters"), href: "/products/channel-letters" },
      { name: t(locale as Locale, "nav.flatCutLetters"), href: "/products/flat-cut-letters" },
      { name: t(locale as Locale, "nav.bladeSigns"), href: "/products/blade-signs" },
      { name: t(locale as Locale, "nav.cabinetSigns"), href: "/products/cabinet-signs" },
      { name: t(locale as Locale, "nav.lightboxes"), href: "/products/lightboxes" },
      { name: t(locale as Locale, "nav.segLightBoxes"), href: "/products/seg-light-boxes" },
      { name: t(locale as Locale, "nav.customFabrication"), href: "/products/custom-fabrication" },
    ],
    [t(locale as Locale, "footer.companyTitle")]: [
      { name: t(locale as Locale, "nav.ourStory"), href: "/about" },
      { name: t(locale as Locale, "nav.services"), href: "/services" },
      { name: t(locale as Locale, "nav.gallery"), href: "/gallery" },
      { name: t(locale as Locale, "footer.wholesalePolicy"), href: "/why-sunlite/wholesale-only" },
      { name: t(locale as Locale, "nav.contact"), href: "/contact" },
    ],
    [t(locale as Locale, "footer.tradeResourcesTitle")]: [
      { name: t(locale as Locale, "footer.blog"), href: "/resources/blog" },
      { name: t(locale as Locale, "footer.glossary"), href: "/resources/glossary" },
      { name: t(locale as Locale, "footer.guides"), href: "/resources/guides" },
      { name: t(locale as Locale, "footer.faq"), href: "/resources/faq" },
    ],
    [t(locale as Locale, "footer.popularTopicsTitle")]: [
      { name: "Trimless vs Trimcap", href: "/signs/trimless-vs-trimcap-channel-letters" },
      { name: "Front Lit Channel Letters", href: "/signs/front-lit-channel-letters" },
      { name: "UL Listed Signs", href: "/signs/ul-listed-signs-explained" },
      { name: "LED Illumination Types", href: "/signs/led-illumination-types-for-signs" },
      { name: "Wholesale Sign Manufacturer", href: "/signs/wholesale-sign-manufacturer" },
      { name: "Channel Letter Installation", href: "/signs/channel-letter-installation-guide" },
    ],
  };
}

export default function Footer({ locale }: { locale: string }) {
  const footerLinks = getFooterLinks(locale);

  return (
    <footer className="bg-gradient-to-b from-bg-primary to-bg-navy">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* Wholesale Banner */}
      <div className="border-b border-white/[0.06]">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3">
            <Lock className="w-3.5 h-3.5 text-brand-gold/60 flex-shrink-0" />
            <p className="text-white/30 text-[11px] font-heading uppercase tracking-[0.15em]">
              {t(locale as Locale, "footer.wholesaleBanner")}
            </p>
          </div>
        </div>
      </div>

      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <LocaleLink locale={locale} href="/" className="flex items-center gap-2.5 mb-6">
              <span className="text-text-light font-heading font-bold text-lg tracking-[0.02em]">
                SUNLITE
              </span>
              <span className="w-px h-4 bg-brand-gold/40" />
              <span className="text-brand-gold font-heading font-bold text-lg tracking-[0.02em]">
                SIGNS
              </span>
            </LocaleLink>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm">
              {t(locale as Locale, "footer.brandDescription")}
            </p>
            <p className="text-white/30 text-xs leading-relaxed mb-8 max-w-sm">
              {t(locale as Locale, "footer.brandTagline")}
            </p>
            <LocaleLink
              locale={locale}
              href="/get-a-quote"
              className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold font-heading font-semibold text-xs uppercase tracking-wider rounded-sm px-5 py-2.5 hover:bg-brand-gold/5 hover:border-brand-gold/50 transition-all"
            >
              <Lock className="w-3 h-3" />
              {t(locale as Locale, "cta.requestPricing")}
            </LocaleLink>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white/60 font-heading font-semibold text-xs uppercase tracking-[0.15em] mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <LocaleLink
                      locale={locale}
                      href={link.href}
                      className="text-white/40 hover:text-brand-gold text-sm transition-colors"
                    >
                      {link.name}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-white/40">
            <a
              href="tel:+6892940912"
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (689) 294-0912
            </a>
            <a
              href="mailto:hello@sunlitesigns.com"
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              hello@sunlitesigns.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Florida, USA
            </span>
          </div>
          <p className="text-white/15 text-xs">
            &copy; {new Date().getFullYear()} Sunlite Signs LLC. {t(locale as Locale, "footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
