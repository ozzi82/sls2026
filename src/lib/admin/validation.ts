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
