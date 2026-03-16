"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Save, ChevronDown, ChevronUp } from "lucide-react";
import BlockCard from "./BlockCard";
import { PageConfig, Block } from "@/lib/admin/page-config-types";

interface BlockEditorProps {
  config: PageConfig;
  apiBase: string;
  backHref: string;
}

export default function BlockEditor({ config: initial, apiBase, backHref }: BlockEditorProps) {
  const router = useRouter();
  const [config, setConfig] = useState<PageConfig>(initial);
  const [seoOpen, setSeoOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateSeo(key: string, value: string | string[] | undefined) {
    setConfig((prev) => ({
      ...prev,
      seo: { ...prev.seo, [key]: value },
    }));
  }

  function updateBlock(index: number, block: Block) {
    const blocks = [...config.blocks];
    blocks[index] = block;
    setConfig((prev) => ({ ...prev, blocks }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      // Derive fileSlug from the config slug for the API call
      const fileSlug = config.slug.replace(/^\//, "").replace(/\//g, "--");
      const res = await fetch(`${apiBase}/${fileSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Saved successfully!" });
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Save failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
    setSaving(false);
  }

  const previewUrl = config.slug.startsWith("/") ? config.slug : `/${config.slug}`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push(backHref)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{config.label}</h2>
            <p className="text-sm text-gray-500 font-mono">{previewUrl}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            Preview
          </a>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </div>
      )}

      {/* SEO Section */}
      <Card className="mb-6">
        <CardHeader className="cursor-pointer" onClick={() => setSeoOpen(!seoOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle>SEO Settings</CardTitle>
            {seoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {seoOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input value={config.seo.title} onChange={(e) => updateSeo("title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea value={config.seo.metaDescription} onChange={(e) => updateSeo("metaDescription", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input value={config.seo.canonical || ""} onChange={(e) => updateSeo("canonical", e.target.value || undefined)} />
            </div>
            <div className="space-y-2">
              <Label>OG Title</Label>
              <Input value={config.seo.ogTitle || ""} onChange={(e) => updateSeo("ogTitle", e.target.value || undefined)} />
            </div>
            <div className="space-y-2">
              <Label>OG Description</Label>
              <Textarea value={config.seo.ogDescription || ""} onChange={(e) => updateSeo("ogDescription", e.target.value || undefined)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>OG Image URL</Label>
              <Input value={config.seo.ogImage || ""} onChange={(e) => updateSeo("ogImage", e.target.value || undefined)} />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Blocks */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Content Blocks</h3>
        {config.blocks.map((block, index) => (
          <BlockCard
            key={block.id}
            block={block}
            onChange={(updated) => updateBlock(index, updated)}
          />
        ))}
      </div>

      {/* Bottom save */}
      <div className="mt-6 flex items-center gap-4">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
