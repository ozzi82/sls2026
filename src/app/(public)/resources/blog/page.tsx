import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale Sign Industry Blog — Channel Letter Expertise for Trade Professionals",
  description:
    "Expert wholesale articles on channel letters, sign illumination, manufacturing processes, and trade signage industry trends from Sunlite Signs — written for sign shop professionals.",
  keywords: [
    "wholesale channel letter blog",
    "sign industry articles trade",
    "LED sign manufacturing blog",
    "wholesale sign industry insights",
    "illuminated sign technology",
    "sign shop trade blog",
  ],
  openGraph: {
    title: "Wholesale Sign Industry Blog — Channel Letter Expertise for Trade Professionals | Sunlite Signs",
    description:
      "Expert wholesale articles on channel letters, sign illumination, and trade signage industry trends for sign shop professionals.",
    url: "https://sunlitesigns.com/resources/blog",
  },
};

const blogPosts = [
  {
    slug: "channel-letter-types-explained",
    title: "Channel Letter Types Explained: A Complete Guide for Sign Shops",
    excerpt:
      "From face-lit to halo-lit, trimless to reverse channel letters, learn about every channel letter type available and when to recommend each to your clients. Written for wholesale trade buyers.",
    date: "2025-12-15",
    image: "Blog hero — various channel letter types on building facades",
    category: "Education",
  },
  {
    slug: "trimless-vs-trimcap-channel-letters",
    title: "Trimless vs. Trim Cap Channel Letters: Which Should You Specify?",
    excerpt:
      "The architectural trend toward trimless channel letters is growing fast. Compare trimless and trim cap options to help your sign shop clients choose the right look at wholesale pricing.",
    date: "2025-11-28",
    image: "Blog hero — side-by-side comparison of trimless and trim cap letters",
    category: "Product Spotlight",
  },
  {
    slug: "how-to-choose-sign-illumination",
    title: "How to Choose the Right Sign Illumination for Any Project",
    excerpt:
      "Face-lit, halo-lit, front-and-halo, or non-illuminated? Walk through the decision factors including visibility, brand aesthetic, building facade, and budget — a guide for trade professionals.",
    date: "2025-11-10",
    image: "Blog hero — different illumination types shown at night",
    category: "Guides",
  },
  {
    slug: "ul-listing-why-it-matters",
    title: "UL Listing for Channel Letters: Why It Matters for Your Sign Business",
    excerpt:
      "UL listing is more than a safety checkbox. Learn how UL-listed wholesale signage protects your clients, reduces your liability, and differentiates your sign shop from competitors.",
    date: "2025-10-22",
    image: "Blog hero — UL certification label on channel letter wiring",
    category: "Industry",
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Blog" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Wholesale Industry Blog
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Industry insights, product spotlights, and expert knowledge written exclusively for sign shop
              professionals and wholesale trade partners. Stay informed on channel letter technology, manufacturing trends, and
              best practices.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-bg-primary">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.slug} delay={index * 0.1}>
                <Link href={`/resources/blog/${post.slug}`} className="group block h-full">
                  <article className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden h-full hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                    <PlaceholderImage
                      label={post.image}
                      className="rounded-none border-0"
                      aspectRatio="aspect-[16/9]"
                    />
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-white/40">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h2 className="text-xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                        Read More{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
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
