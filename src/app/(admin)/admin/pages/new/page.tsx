"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageForm from "@/components/admin/PageForm";

interface LandingPageData {
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
  sections: { heading: string; content: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  schemaType: "Product" | "Service";
}

export default function NewPage() {
  const router = useRouter();
  const [allSlugs, setAllSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((data) => {
        setAllSlugs(data.pages.map((p: LandingPageData) => p.slug));
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(data: LandingPageData) {
    const res = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || "Create failed" };
    }
    // Redirect to edit page after creation
    router.push(`/admin/pages/${data.slug}`);
    return { success: true };
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">New Landing Page</h2>
      <PageForm
        allSlugs={allSlugs}
        isEdit={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
