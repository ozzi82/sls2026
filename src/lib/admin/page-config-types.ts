export type BlockType =
  | "hero"
  | "features_grid"
  | "product_types"
  | "specs_table"
  | "use_cases"
  | "gallery"
  | "faq"
  | "cta"
  | "related_pages"
  | "text_section"
  | "stats_strip"
  | "marquee"
  | "timeline"
  | "contact_info"
  | "form_section"
  | "process_steps"
  | "product_grid"
  | "resource_cards"
  | "guides_list";

export interface HeroData {
  badge?: string;
  h1: string;
  h1Highlight?: string;
  subtitle: string;
  image?: string;
  overlayOpacity?: number; // 0-100, controls hero image overlay darkness
  ctas: { label: string; href: string; variant: "primary" | "secondary" }[];
}

export interface FeaturesGridData {
  heading: string;
  items: { icon: string; title: string; description: string }[];
}

export interface ProductTypesData {
  heading: string;
  description?: string;
  items: { name: string; description: string; image?: string; href?: string }[];
}

export interface SpecsTableData {
  heading: string;
  description?: string;
  image?: string;
  specs: { label: string; value: string }[];
}

export interface UseCasesData {
  heading: string;
  description?: string;
  image?: string;
  items: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
  type?: string;
  location?: string;
  turnaround?: string;
}

export interface GalleryData {
  heading: string;
  categories: string[];
  images: GalleryImage[];
}

export interface FAQData {
  heading: string;
  items: { question: string; answer: string }[];
}

export interface CTAData {
  heading: string;
  headingHighlight?: string;
  description: string;
}

export interface RelatedPagesData {
  heading: string;
  slugs: string[];
}

export interface TextSectionData {
  heading: string;
  content: string;
  image?: string;
  imagePosition?: "left" | "right";
  background?: "light" | "dark" | "navy";
}

export interface StatsStripData {
  items: { icon: string; label: string; sublabel?: string }[];
}

export interface MarqueeData {
  messages: string[];
}

export interface TimelineData {
  heading?: string;
  entries: { step: number; title: string; text: string; image?: string }[];
}

export interface ContactInfoData {
  heading?: string;
  cards: { icon: string; title: string; value: string; note?: string; href?: string; description?: string }[];
}

export interface FormSectionData {
  heading: string;
  description?: string;
  formType: "contact" | "quote";
  sidebar?: {
    businessHours?: { day: string; hours: string }[];
    notices?: string[];
    ctaText?: string;
  };
}

export interface ProcessStepsData {
  heading: string;
  steps: { step: number; title: string; description: string; image?: string }[];
}

export interface ProductGridData {
  heading: string;
  description?: string;
  items: { name: string; model?: string; image?: string; href?: string }[];
}

export interface ResourceCardsData {
  heading?: string;
  items: { icon: string; title: string; description: string; href: string; date?: string; category?: string }[];
}

export interface GuidesListData {
  heading?: string;
  items: { title: string; description: string; readTime: string; href: string; image?: string; icon?: string }[];
}

export type BlockDataMap = {
  hero: HeroData;
  features_grid: FeaturesGridData;
  product_types: ProductTypesData;
  specs_table: SpecsTableData;
  use_cases: UseCasesData;
  gallery: GalleryData;
  faq: FAQData;
  cta: CTAData;
  related_pages: RelatedPagesData;
  text_section: TextSectionData;
  stats_strip: StatsStripData;
  marquee: MarqueeData;
  timeline: TimelineData;
  contact_info: ContactInfoData;
  form_section: FormSectionData;
  process_steps: ProcessStepsData;
  product_grid: ProductGridData;
  resource_cards: ResourceCardsData;
  guides_list: GuidesListData;
};

export interface Block<T extends BlockType = BlockType> {
  id: string;
  type: T;
  label: string;
  visible: boolean;
  data: BlockDataMap[T];
}

export interface PageSeo {
  title: string;
  metaDescription: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface PageConfig {
  slug: string;
  pageType: "product" | "landing" | "static";
  label: string;
  seo: PageSeo;
  blocks: Block[];
}
