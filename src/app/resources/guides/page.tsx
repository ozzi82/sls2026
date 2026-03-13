import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Gem, Lightbulb, Wrench, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Guides — Channel Letter Buying Guides for Sign Shops | Sunlite Signs",
  description:
    "In-depth wholesale guides for sign shop professionals and trade buyers. Channel letter selection, illumination types, installation best practices, and ordering from a wholesale-only manufacturer.",
  keywords: [
    "wholesale channel letter buying guide",
    "sign illumination guide trade",
    "sign installation guide wholesale",
    "wholesale sign ordering guide",
    "channel letter specification guide",
    "sign shop wholesale guides",
  ],
  openGraph: {
    title: "Wholesale Guides — Channel Letter Buying Guides for Sign Shops | Sunlite Signs",
    description:
      "In-depth wholesale guides for sign shop professionals covering channel letter selection, illumination, and installation.",
    url: "https://sunlitesigns.com/resources/guides",
  },
};

const guides = [
  {
    title: "The Complete Channel Letter Buying Guide",
    description:
      "Everything sign shop professionals need to know about specifying and ordering wholesale channel letters. Covers letter types, illumination options, materials, sizing, mounting, and what to look for in a wholesale-only manufacturer.",
    href: "/resources/guides/channel-letter-buying-guide",
    icon: BookOpen,
    image: "Guide cover — channel letter manufacturing process",
    readTime: "12 min read",
  },
  {
    title: "Sign Installation Tips for Channel Letters",
    description:
      "Practical installation guidance for trade professionals covering site preparation, mounting methods, electrical requirements, and quality assurance. Ensure every wholesale channel letter install goes smoothly.",
    href: "/resources/guides/sign-installation-tips",
    icon: Wrench,
    image: "Guide cover — installer mounting channel letters on building",
    readTime: "8 min read",
  },
  {
    title: "Choosing the Right Illumination Type",
    description:
      "A detailed comparison of face-lit, halo-lit, front-and-halo, and non-illuminated channel letters for trade buyers. Learn when to specify each type based on visibility, brand, and budget.",
    href: "/resources/guides/choosing-illumination-types",
    icon: Lightbulb,
    image: "Guide cover — four illumination types shown at night",
    readTime: "10 min read",
  },
  {
    title: "What Are Trimless Channel Letters?",
    description:
      "The definitive guide to trimless channel letters. How they differ from traditional trim cap construction, why architects are specifying them, construction details, and how to order wholesale from Sunlite Signs.",
    href: "/resources/guides/trimless-channel-letters-guide",
    icon: Gem,
    image: "Guide cover — trimless channel letter close-up showing seamless face-to-return joint",
    readTime: "8 min read",
  },
];

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Guides" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Wholesale Guides
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              In-depth resources written for sign shop professionals and trade buyers. Make informed decisions about
              wholesale channel letters, illumination, installation, and ordering from a manufacturer that sells exclusively to the trade.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="space-y-8">
            {guides.map((guide, index) => (
              <AnimatedSection key={guide.href} delay={index * 0.1}>
                <Link href={guide.href} className="group block">
                  <article className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5 lg:w-1/3">
                        <PlaceholderImage
                          label={guide.image}
                          className="rounded-none border-0 h-full"
                          aspectRatio="aspect-[4/3] md:aspect-auto"
                        />
                      </div>
                      <div className="md:w-3/5 lg:w-2/3 p-6 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                            <guide.icon className="w-5 h-5 text-brand-gold" />
                          </div>
                          <span className="text-xs font-heading font-medium text-white/40 uppercase tracking-wider">
                            {guide.readTime}
                          </span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors mb-4">
                          {guide.title}
                        </h2>
                        <p className="text-white/50 leading-relaxed mb-6">
                          {guide.description}
                        </p>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          Read Guide{" "}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      <CTASection />
    </>
  );
}
