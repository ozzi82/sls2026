import { PageConfig } from "./page-config-types";
import { readJson, writeJson, listJsonFiles, jsonExists } from "./content-store";

function fileSlugToFilename(fileSlug: string): string {
  return fileSlug + ".json";
}

// Public-facing helpers (read configs for rendering pages)
export async function loadProductConfig(fileSlug: string): Promise<PageConfig> {
  const config = await readJson<PageConfig>(`products/${fileSlugToFilename(fileSlug)}`);
  if (!config) throw new Error(`Product config not found: ${fileSlug}`);
  return config;
}

export async function loadStaticPageConfig(fileSlug: string): Promise<PageConfig> {
  const config = await readJson<PageConfig>(`pages/${fileSlugToFilename(fileSlug)}`);
  if (!config) throw new Error(`Static page config not found: ${fileSlug}`);
  return config;
}

// Product page configs
export async function getAllProductConfigs(): Promise<(PageConfig & { fileSlug: string })[]> {
  const files = await listJsonFiles("products");
  const results: (PageConfig & { fileSlug: string })[] = [];
  for (const f of files) {
    const config = await readJson<PageConfig>(`products/${f}`);
    if (config) {
      results.push({ ...config, fileSlug: f.replace(".json", "") });
    }
  }
  return results;
}

export async function getProductConfig(fileSlug: string): Promise<PageConfig | null> {
  return readJson<PageConfig>(`products/${fileSlugToFilename(fileSlug)}`);
}

export async function updateProductConfig(fileSlug: string, config: PageConfig): Promise<{ success: boolean; error?: string }> {
  const exists = await jsonExists(`products/${fileSlugToFilename(fileSlug)}`);
  if (!exists) {
    return { success: false, error: "Product config not found" };
  }
  await writeJson(`products/${fileSlugToFilename(fileSlug)}`, config);
  return { success: true };
}

// Static page configs
export async function getAllStaticConfigs(): Promise<(PageConfig & { fileSlug: string })[]> {
  const files = await listJsonFiles("pages");
  const results: (PageConfig & { fileSlug: string })[] = [];
  for (const f of files) {
    const config = await readJson<PageConfig>(`pages/${f}`);
    if (config) {
      results.push({ ...config, fileSlug: f.replace(".json", "") });
    }
  }
  return results;
}

export async function getStaticConfig(fileSlug: string): Promise<PageConfig | null> {
  return readJson<PageConfig>(`pages/${fileSlugToFilename(fileSlug)}`);
}

export async function updateStaticConfig(fileSlug: string, config: PageConfig): Promise<{ success: boolean; error?: string }> {
  const exists = await jsonExists(`pages/${fileSlugToFilename(fileSlug)}`);
  if (!exists) {
    return { success: false, error: "Static page config not found" };
  }
  await writeJson(`pages/${fileSlugToFilename(fileSlug)}`, config);
  return { success: true };
}
