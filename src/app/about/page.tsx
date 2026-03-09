import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Phone, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Story — Sunlite Signs",
  description:
    "The story of Sunlite Signs LLC — from German engineering roots in Nuremberg to a wholesale-only LED signage manufacturer in Florida. Built exclusively for sign shops across the USA and Canada.",
  openGraph: {
    title: "Our Story — Sunlite Signs",
    description:
      "From Nuremberg to Florida — how German engineering heritage became a wholesale-only signage manufacturer built exclusively for the trade.",
    url: "https://sunlitesigns.com/about",
  },
};

const timelineEntries = [
  {
    number: "01",
    title: "The Foundation: LKF Lichtwerbung, Nuremberg",
    text: "The story begins with LKF Lichtwerbung in Nuremberg, Germany — a company built on decades of precision engineering in illuminated signage. European craftsmanship at its finest. The German standard for channel letter manufacturing that would eventually find its way across the Atlantic.",
    imageLabel: "LKF Lichtwerbung facility in Nuremberg, Germany",
    imageSrc: "/story-01-lkf.png",
  },
  {
    number: "02",
    title: "Father & Son: A Legacy of Precision",
    text: "The growth of LKF under father-son collaboration deepened a heritage of German engineering excellence. Every letterform, every LED integration, every structural calculation refined over generations. A legacy that demanded nothing less than perfection.",
    imageLabel: "Father and son working together at LKF — precision engineering heritage",
    imageSrc: "/story-02-father-son.jpeg",
  },
  {
    number: "03",
    title: "Kenan Meets Ozan in Germany",
    text: "A chance meeting in Germany between Kenan and Ozan sparked a shared vision. Two minds united by a passion for precision signage and a belief that the American market deserved better — European engineering quality at wholesale prices, delivered direct to sign shops.",
    imageLabel: "Kenan and Ozan — the meeting that started it all",
    imageSrc: "/story-03-kenan-ozan.jpeg",
  },
  {
    number: "04",
    title: "A Friendship Becomes Something Larger",
    text: "What started as a friendship evolved into a business vision: bring German-engineered signage to the USA, exclusively for the trade. No retail. No competing with customers. A wholesale manufacturing partner that stays in its lane.",
    imageLabel: "Vision taking shape — planning the wholesale signage business",
    imageSrc: "/story-04-friendship.jpeg",
  },
  {
    number: "05",
    title: "Ozan & Ayla Move to Florida",
    text: "Ozan and Ayla, together with their family, made the move to Florida — establishing the American base for what would become Sunlite Signs. The sunshine state became home to a new kind of signage manufacturer: one that would never sell retail.",
    imageLabel: "Ozan and Ayla — building a new home and business in Florida",
  },
  {
    number: "06",
    title: "Sunlite Signs Is Born",
    text: "Sunlite Signs LLC — founded on one unbreakable principle: we manufacture, you sell. German-engineered, UL-listed channel letters and illuminated signs, delivered in 3 weeks door to door, exclusively to sign shops across the USA and Canada. The beginning of something larger.",
    imageLabel: "Sunlite Signs LLC — wholesale signage manufacturer, Florida",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sunlite Signs LLC",
    description:
      "Florida-based wholesale-only LED signage manufacturer with German engineering heritage. UL listed channel letters, blade signs, flat cut letters, and lightboxes exclusively for sign shops across the USA and Canada.",
    url: "https://sunlitesigns.com",
    telephone: "+1-234-567-890",
    email: "hello@sunlitesigns.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    knowsAbout: [
      "Wholesale Channel Letters",
      "Wholesale Halo Lit Signs",
      "Trimless Channel Letters",
      "Wholesale Blade Signs",
      "Wholesale Flat Cut Letters",
      "Wholesale LED Lightboxes",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-navy/20 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />

        <div className="relative z-10 pt-20">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Our Story" },
              ]}
            />
          </div>

          <div className="section-padding pb-12">
            <div className="container-max text-center">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                  <Lock className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                    Wholesale Only
                  </span>
                </div>
                <div className="gold-line mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-light mb-6">
                  Our Story
                </h1>
                <p className="text-lg text-text-light/60 max-w-2xl mx-auto">
                  What makes us passionate about signage and experience.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      {timelineEntries.map((entry, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? "bg-light-bg" : "bg-primary-dark";
        const titleColor = isEven ? "text-text-dark" : "text-text-light";
        const textColor = isEven ? "text-text-dark/70" : "text-text-light/60";
        const imageFirst = isEven;

        return (
          <section key={entry.number} className={`section-padding ${bgClass}`}>
            <div className="container-max">
              <div
                className={`flex flex-col ${
                  imageFirst ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-12 md:gap-16`}
              >
                {/* Image side */}
                <AnimatedSection className="flex-1 w-full">
                  <div className="relative">
                    {/* Numbered accent circle */}
                    <div className="absolute -top-4 -left-4 z-10 w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
                      <span className="text-white font-heading font-bold text-lg">
                        {entry.number}
                      </span>
                    </div>
                    {entry.imageSrc ? (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image
                          src={entry.imageSrc}
                          alt={entry.imageLabel}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage
                        label={entry.imageLabel}
                        className="rounded-xl"
                        aspectRatio="aspect-[4/3]"
                      />
                    )}
                  </div>
                </AnimatedSection>

                {/* Text side */}
                <AnimatedSection className="flex-1" delay={0.1}>
                  <div className="gold-line mb-6" />
                  <h2
                    className={`text-3xl md:text-4xl font-heading font-bold ${titleColor} mb-6`}
                  >
                    {entry.title}
                  </h2>
                  <p className={`${textColor} leading-relaxed text-lg`}>
                    {entry.text}
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section-padding bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />
        <div className="container-max relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">
                  Trade Accounts Only
                </span>
              </div>
              <div className="gold-line mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light mb-4">
                Get Your Product Started
              </h2>
              <p className="text-text-light/60 max-w-xl mx-auto mb-8">
                Ready to work with a wholesale partner that holds itself to the
                highest standards — and stays out of your market? Get trade
                pricing today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/get-a-quote" className="btn-primary gap-2">
                  Request Wholesale Pricing{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="btn-secondary">
                  View Products
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-light/50 text-sm">
                <a
                  href="tel:+6892940912"
                  className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (689) 294-0912
                </a>
                <a
                  href="mailto:hello@sunlitesigns.com"
                  className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@sunlitesigns.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom spacer for mobile CTA bar */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
