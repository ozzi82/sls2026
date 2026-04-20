import { MetadataRoute } from "next";
import { allLandingPages } from "@/lib/landing-pages";

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
    "/products/channel-letters/side-lit",
    "/products/channel-letters/back-side-lit",
    "/products/channel-letters/front-side-lit",
    "/products/channel-letters/faux-neon",
    "/products/channel-letters/conical",
    "/products/channel-letters/stainless-standoff",
    "/products/channel-letters/stainless-flush",
    "/products/flat-cut-letters",
    "/products/blade-signs",
    "/products/lightboxes",
    "/products/seg-light-boxes",
    "/products/custom-fabrication",
    "/products/cabinet-signs",
    "/services",
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
    "/resources/guides/trimless-channel-letters-guide",
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

  const pages: MetadataRoute.Sitemap = staticPages.flatMap((path) => [
    {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1.0 : path === "/get-a-quote" ? 0.9 : 0.8,
      alternates: {
        languages: {
          de: `${baseUrl}/de${path}`,
        },
      },
    },
    {
      url: `${baseUrl}/de${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 0.9 : path === "/get-a-quote" ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}${path}`,
        },
      },
    },
  ]);

  const blogPages: MetadataRoute.Sitemap = blogSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/resources/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          de: `${baseUrl}/de/resources/blog/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/de/resources/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/resources/blog/${slug}`,
        },
      },
    },
  ]);

  const landingPageEntries: MetadataRoute.Sitemap = allLandingPages.flatMap((page) => [
    {
      url: `${baseUrl}/signs/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          de: `${baseUrl}/de/signs/${page.slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/de/signs/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/signs/${page.slug}`,
        },
      },
    },
  ]);

  return [...pages, ...blogPages, ...landingPageEntries];
}
