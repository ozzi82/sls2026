import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sunlitesigns.com";

  const staticPages = [
    "",
    "/products",
    "/products/channel-letters",
    "/products/channel-letters/front-lit",
    "/products/channel-letters/halo-lit",
    "/products/channel-letters/front-and-halo-lit",
    "/products/channel-letters/trimless",
    "/products/channel-letters/non-illuminated",
    "/products/flat-cut-letters",
    "/products/blade-signs",
    "/products/lightboxes",
    "/products/custom-fabrication",
    "/why-sunlite",
    "/why-sunlite/german-engineering",
    "/why-sunlite/ul-listing",
    "/why-sunlite/quality-process",
    "/why-sunlite/wholesale-only",
    "/gallery",
    "/resources",
    "/resources/blog",
    "/resources/glossary",
    "/resources/guides",
    "/resources/guides/channel-letter-buying-guide",
    "/resources/guides/sign-installation-tips",
    "/resources/guides/choosing-illumination-types",
    "/resources/faq",
    "/about",
    "/contact",
    "/get-a-quote",
  ];

  const blogSlugs = [
    "channel-letter-types-explained",
    "trimless-vs-trimcap-channel-letters",
    "how-to-choose-sign-illumination",
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path === "/get-a-quote" ? 0.9 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/resources/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...blogPages];
}
