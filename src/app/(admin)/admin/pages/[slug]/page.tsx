"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function EditPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pageData, setPageData] = useState<LandingPageData | null>(null);
  const [allSlugs, setAllSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/pages/${slug}`).then((r) => {
        if (!r.ok) throw new Error("Page not found");
        return r.json();
      }),
      fetch("/api/admin/pages").then((r) => r.json()),
    ])
      .then(([page, listData]) => {
        setPageData(page);
        setAllSlugs(listData.pages.map((p: LandingPageData) => p.slug));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(data: LandingPageData) {
    const res = await fetch(`/api/admin/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || "Save failed" };
    }
    return { success: true };
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error || !pageData) {
    return <p className="text-red-600">{error || "Page not found"}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Edit: {pageData.h1} {pageData.h1Highlight}
      </h2>
      <PageForm
        initialData={pageData}
        allSlugs={allSlugs}
        isEdit={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
