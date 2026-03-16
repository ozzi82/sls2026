import { z } from "zod";

export const landingPageSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  hubSlug: z.string().min(1),
  hubName: z.string().min(1),
  primaryKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()),
  title: z.string().min(1),
  metaDescription: z.string().min(1),
  h1: z.string().min(1),
  h1Highlight: z.string().min(1),
  heroSubtitle: z.string().min(1),
  sections: z.array(
    z.object({
      heading: z.string().min(1),
      content: z.string().min(1),
    })
  ),
  faqs: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
  relatedSlugs: z.array(z.string()),
  schemaType: z.enum(["Product", "Service"]),
});

// PageConfig validation for product and static pages
const blockSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "hero", "features_grid", "product_types", "specs_table", "use_cases",
    "gallery", "faq", "cta", "related_pages", "text_section", "stats_strip",
    "marquee", "timeline", "contact_info", "form_section", "process_steps",
    "product_grid", "resource_cards", "guides_list",
  ]),
  label: z.string().min(1),
  visible: z.boolean(),
  data: z.record(z.string(), z.unknown()),
});

const pageSeoSchema = z.object({
  title: z.string().min(1),
  metaDescription: z.string().min(1),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

export const pageConfigSchema = z.object({
  slug: z.string().min(1),
  pageType: z.enum(["product", "landing", "static"]),
  label: z.string().min(1),
  seo: pageSeoSchema,
  blocks: z.array(blockSchema),
});
