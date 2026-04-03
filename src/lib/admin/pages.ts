import { LandingPage } from "@/lib/landing-pages/types";
import { readJson, writeJson } from "./content-store";

export const hubToFiles: Record<string, string[]> = {
  "cabinet-signs": ["cabinet-signs.json"],
  "channel-letters": ["channel-letters-1.json", "channel-letters-2.json"],
  "blade-signs": ["blade-signs.json"],
  "flat-cut-letters": ["flat-cut-letters.json"],
  "light-boxes": ["light-boxes.json"],
  "logo-boxes": ["logo-boxes.json"],
  "push-through-signs": ["push-through-signs.json"],
  "general": ["general.json"],
  "engineering": ["engineering.json"],
  "illumination": ["illumination.json"],
};

export const hubNames: Record<string, string> = {
  "cabinet-signs": "Cabinet Signs",
  "channel-letters": "Channel Letters",
  "blade-signs": "Blade Signs",
  "flat-cut-letters": "Flat Cut Letters",
  "light-boxes": "Light Boxes",
  "logo-boxes": "Logo Boxes",
  "push-through-signs": "Push-Through Signs",
  "general": "General",
  "engineering": "Engineering",
  "illumination": "Illumination",
};

async function readJsonFile(filename: string): Promise<LandingPage[]> {
  const data = await readJson<LandingPage[]>(`landing-pages/${filename}`);
  return data ?? [];
}

async function writeJsonFile(filename: string, data: LandingPage[]): Promise<void> {
  await writeJson(`landing-pages/${filename}`, data);
}

export async function getAllPages(): Promise<LandingPage[]> {
  const allPages: LandingPage[] = [];
  for (const files of Object.values(hubToFiles)) {
    for (const file of files) {
      const pages = await readJsonFile(file);
      allPages.push(...pages);
    }
  }
  return allPages;
}

export async function getPageBySlug(
  slug: string
): Promise<{ page: LandingPage; file: string } | null> {
  for (const [, files] of Object.entries(hubToFiles)) {
    for (const file of files) {
      const pages = await readJsonFile(file);
      const page = pages.find((p) => p.slug === slug);
      if (page) return { page, file };
    }
  }
  return null;
}

export async function updatePage(
  slug: string,
  updated: LandingPage
): Promise<{ success: boolean; error?: string }> {
  const result = await getPageBySlug(slug);
  if (!result) return { success: false, error: "Page not found" };

  const pages = await readJsonFile(result.file);
  const index = pages.findIndex((p) => p.slug === slug);
  pages[index] = updated;
  await writeJsonFile(result.file, pages);
  return { success: true };
}

export async function createPage(
  page: LandingPage
): Promise<{ success: boolean; error?: string }> {
  const existing = await getPageBySlug(page.slug);
  if (existing) {
    return { success: false, error: `Slug "${page.slug}" already exists` };
  }

  const files = hubToFiles[page.hubSlug];
  if (!files) {
    return { success: false, error: `Unknown hub: ${page.hubSlug}` };
  }

  const targetFile = files.length > 1 ? files[files.length - 1] : files[0];
  const pages = await readJsonFile(targetFile);
  pages.push(page);
  await writeJsonFile(targetFile, pages);
  return { success: true };
}

export async function deletePage(slug: string): Promise<{ success: boolean; error?: string }> {
  const result = await getPageBySlug(slug);
  if (!result) return { success: false, error: "Page not found" };

  const pages = await readJsonFile(result.file);
  const filtered = pages.filter((p) => p.slug !== slug);
  await writeJsonFile(result.file, filtered);
  return { success: true };
}
