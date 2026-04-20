"use client";

import LocaleLink from "@/components/LocaleLink";
import SafeHtml from "@/components/SafeHtml";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

interface LandingPageHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
  breadcrumbs: { label: string; href: string }[];
  locale?: string;
}

export default function LandingPageHero({ title, highlight, subtitle, breadcrumbs, locale = "en" }: LandingPageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-navy to-[#0F0F2D]" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)]" />
      <div className="relative z-10 container-max section-padding !py-0">
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mt-8"
        >
          <div className="gold-line mb-8" />
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.02em] mb-6">
            <SafeHtml html={title} /> <span className="text-brand-gold"><SafeHtml html={highlight} /></span>
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-lg font-body leading-relaxed mb-10">
            <SafeHtml html={subtitle} />
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <LocaleLink locale={locale} href="/get-a-quote" className="btn-primary">
              Request Wholesale Pricing
            </LocaleLink>
            <LocaleLink locale={locale} href="/products" className="btn-secondary gap-2">
              View Products <ArrowRight className="w-4 h-4" />
            </LocaleLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
