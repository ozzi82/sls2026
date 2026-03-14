export interface LandingPage {
  slug: string;
  hubSlug: string;
  hubName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  h1Highlight: string;
  heroSubtitle: string;
  sections: {
    heading: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
  schemaType: "Product" | "Service";
}
