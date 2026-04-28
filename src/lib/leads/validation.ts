import { z } from "zod"

const baseFields = {
  formType: z.enum(["contact", "quote"]),
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").max(320),
  company: z.string().max(200).optional().default(""),
  phone: z.string().max(200).optional().default(""),
  message: z.string().min(1, "Message is required").max(5000),
  turnstileToken: z.string().min(1, "Verification required"),
}

export const contactFormSchema = z.object({
  ...baseFields,
  formType: z.literal("contact"),
  subject: z.string().max(200).optional().default(""),
})

export const quoteFormSchema = z.object({
  ...baseFields,
  formType: z.literal("quote"),
  projectType: z.string().max(500).optional().default(""),
  dimensions: z.string().max(500).optional().default(""),
  quantity: z.string().max(500).optional().default(""),
  deadline: z.string().max(500).optional().default(""),
  notes: z.string().max(500).optional().default(""),
})

export const formSubmissionSchema = z.discriminatedUnion("formType", [
  contactFormSchema,
  quoteFormSchema,
])

export type ContactFormData = z.infer<typeof contactFormSchema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>
export type FormSubmissionData = z.infer<typeof formSubmissionSchema>
