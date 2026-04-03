import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import PlaceholderImage from "@/components/PlaceholderImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import { loadStaticPageConfig } from "@/lib/admin/page-config";
import type { HeroData, ResourceCardsData } from "@/lib/admin/page-config-types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadStaticPageConfig("resources--blog");
  return {
    title: config.seo.title,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const config = await loadStaticPageConfig("resources--blog");

  function getBlock<T>(id: string) {
    return config.blocks.find((b) => b.id === id) as
      | { visible: boolean; data: T }
      | undefined;
  }

  const hero = getBlock<HeroData>("hero");
  const blogPosts = getBlock<ResourceCardsData>("blog-posts");

  return (
    <>
      {/* Hero */}
      {hero?.visible && (
        <section className="bg-bg-primary pt-32 pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }, { name: "Blog" }]} />
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">{hero.data.badge}</span>
              </div>
              <div className="gold-line mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">{hero.data.h1}</h1>
              <p className="text-lg text-white/60 max-w-2xl">{hero.data.subtitle}</p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {blogPosts?.visible && (
        <section className="section-padding bg-bg-primary">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.data.items.map((post, index) => (
                <AnimatedSection key={post.href} delay={index * 0.1}>
                  <Link href={post.href} className="group block h-full">
                    <article className="bg-bg-card border border-white/[0.06] rounded-xl overflow-hidden h-full hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5">
                      <PlaceholderImage label={`Blog hero — ${post.title}`} className="rounded-none border-0" aspectRatio="aspect-[16/9]" />
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center gap-4 mb-4">
                          {post.category && (
                            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          )}
                          {post.date && (
                            <span className="flex items-center gap-1.5 text-xs text-white/40">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.date)}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-heading font-bold text-white group-hover:text-brand-gold transition-colors mb-3">{post.title}</h2>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">{post.description}</p>
                        <span className="text-brand-gold text-sm font-heading font-medium uppercase tracking-wider flex items-center gap-2">
                          Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
