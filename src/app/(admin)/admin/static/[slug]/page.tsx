"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlockEditor from "@/components/admin/BlockEditor";
import { PageConfig } from "@/lib/admin/page-config-types";

export default function StaticPageEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const [config, setConfig] = useState<PageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/static-pages/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setConfig)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-gray-500 p-8">Loading...</p>;
  if (error || !config) return <p className="text-red-500 p-8">Error: {error || "Config not found"}</p>;

  return <BlockEditor config={config} fileSlug={slug} apiBase="/api/admin/static-pages" backHref="/admin" />;
}
