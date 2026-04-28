import { z } from "zod"

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color")
const hexOrTransparent = z.string().regex(/^(#[0-9a-fA-F]{6}|transparent)$/, "Must be hex color or transparent")

export const googleSettingsSchema = z.object({
  enabled: z.boolean(),
  ga4MeasurementId: z.string().regex(/^(G-[A-Z0-9]+)?$/, "Must match G-XXXXXXXXXX format").or(z.literal("")),
  ga4PropertyId: z.string().regex(/^([0-9]+)?$/, "Must be a numeric property ID").or(z.literal("")),
  gtmContainerId: z.string().regex(/^(GTM-[A-Z0-9]+)?$/, "Must match GTM-XXXXXXX format").or(z.literal("")),
  adsConversionId: z.string().regex(/^(AW-[0-9]+)?$/, "Must match AW-XXXXXXXXX format").or(z.literal("")),
  adsConversionLabel: z.string(),
})

export const openreplaySettingsSchema = z.object({
  enabled: z.boolean(),
  serverUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  projectKey: z.string(),
  ingestPoint: z.string().url("Must be a valid URL").or(z.literal("")),
})

const consentCategorySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Lowercase alphanumeric and hyphens only"),
  name: z.string().min(1, "Category name required"),
  description: z.string(),
  required: z.boolean(),
  integrations: z.array(z.string()),
})

const consentColorsSchema = z.object({
  bannerBg: hexColor,
  bannerText: hexColor,
  acceptBg: hexColor,
  acceptText: hexColor,
  rejectBg: hexColor,
  rejectText: hexColor,
  manageBg: hexOrTransparent,
  manageText: hexColor,
})

export const cookieConsentSettingsSchema = z.object({
  enabled: z.boolean(),
  position: z.enum(["bottom-bar", "bottom-left", "bottom-right"]),
  title: z.string().min(1),
  description: z.string().min(1),
  acceptAllText: z.string().min(1),
  rejectAllText: z.string().min(1),
  manageText: z.string().min(1),
  privacyPolicyUrl: z.string(),
  consentExpiryDays: z.number().int().min(1).max(3650),
  colors: consentColorsSchema,
  categories: z.array(consentCategorySchema).min(1),
})

export const appearanceSettingsSchema = z.object({
  theme: z.enum(["gold", "blue", "red", "emerald", "bold"]),
})

export const siteSettingsSchema = z.object({
  google: googleSettingsSchema,
  openreplay: openreplaySettingsSchema,
  cookieConsent: cookieConsentSettingsSchema,
  appearance: appearanceSettingsSchema,
})
