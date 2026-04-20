"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  Save,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";

const HUB_OPTIONS = [
  { slug: "cabinet-signs", name: "Cabinet Signs" },
  { slug: "channel-letters", name: "Channel Letters" },
  { slug: "blade-signs", name: "Blade Signs" },
  { slug: "flat-cut-letters", name: "Flat Cut Letters" },
  { slug: "light-boxes", name: "Light Boxes" },
  { slug: "logo-boxes", name: "Logo Boxes" },
  { slug: "push-through-signs", name: "Push-Through Signs" },
  { slug: "general", name: "General" },
  { slug: "engineering", name: "Engineering" },
  { slug: "illumination", name: "Illumination" },
];

interface PageFormData {
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

interface PageFormProps {
  initialData?: PageFormData;
  allSlugs: string[];
  isEdit: boolean;
  onSubmit: (data: PageFormData) => Promise<{ success: boolean; error?: string }>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PageForm({
  initialData,
  allSlugs,
  isEdit,
  onSubmit,
}: PageFormProps) {
  const [form, setForm] = useState<PageFormData>(
    initialData || {
      slug: "",
      hubSlug: "",
      hubName: "",
      primaryKeyword: "",
      secondaryKeywords: [],
      title: "",
      metaDescription: "",
      h1: "",
      h1Highlight: "",
      heroSubtitle: "",
      sections: [{ heading: "", content: "" }],
      faqs: [{ question: "", answer: "" }],
      relatedSlugs: [],
      schemaType: "Product",
    }
  );

  const [seoOpen, setSeoOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [relatedInput, setRelatedInput] = useState("");

  function update<K extends keyof PageFormData>(key: K, value: PageFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-generate slug from h1 fields on create
      if (!isEdit && (key === "h1" || key === "h1Highlight")) {
        const h1 = key === "h1" ? (value as string) : prev.h1;
        const highlight = key === "h1Highlight" ? (value as string) : prev.h1Highlight;
        next.slug = slugify(`${h1} ${highlight}`);
      }
      // Auto-derive hubName from hubSlug
      if (key === "hubSlug") {
        const hub = HUB_OPTIONS.find((h) => h.slug === value);
        next.hubName = hub?.name || "";
      }
      return next;
    });
  }

  function updateSection(
    index: number,
    field: "heading" | "content",
    value: string
  ) {
    const sections = [...form.sections];
    sections[index] = { ...sections[index], [field]: value };
    setForm((prev) => ({ ...prev, sections }));
  }

  function addSection() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "", content: "" }],
    }));
  }

  function removeSection(index: number) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const sections = [...form.sections];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
    setForm((prev) => ({ ...prev, sections }));
  }

  function updateFaq(
    index: number,
    field: "question" | "answer",
    value: string
  ) {
    const faqs = [...form.faqs];
    faqs[index] = { ...faqs[index], [field]: value };
    setForm((prev) => ({ ...prev, faqs }));
  }

  function addFaq() {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }

  function removeFaq(index: number) {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  }

  function moveFaq(index: number, direction: -1 | 1) {
    const faqs = [...form.faqs];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= faqs.length) return;
    [faqs[index], faqs[newIndex]] = [faqs[newIndex], faqs[index]];
    setForm((prev) => ({ ...prev, faqs }));
  }

  function addKeyword() {
    const kw = keywordInput.trim();
    if (kw && !form.secondaryKeywords.includes(kw)) {
      update("secondaryKeywords", [...form.secondaryKeywords, kw]);
    }
    setKeywordInput("");
  }

  function removeKeyword(kw: string) {
    update(
      "secondaryKeywords",
      form.secondaryKeywords.filter((k) => k !== kw)
    );
  }

  function addRelatedSlug() {
    const slug = relatedInput.trim();
    if (slug && !form.relatedSlugs.includes(slug) && allSlugs.includes(slug)) {
      update("relatedSlugs", [...form.relatedSlugs, slug]);
    }
    setRelatedInput("");
  }

  function removeRelatedSlug(slug: string) {
    update(
      "relatedSlugs",
      form.relatedSlugs.filter((s) => s !== slug)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await onSubmit(form);
    if (result.success) {
      setMessage({ type: "success", text: "Saved successfully!" });
    } else {
      setMessage({ type: "error", text: result.error || "Save failed" });
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Save button + status */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hub</Label>
              <Select
                value={form.hubSlug}
                onValueChange={(v) => update("hubSlug", v || "")}
                disabled={isEdit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hub..." />
                </SelectTrigger>
                <SelectContent>
                  {HUB_OPTIONS.map((hub) => (
                    <SelectItem key={hub.slug} value={hub.slug}>
                      {hub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Schema Type</Label>
              <Select
                value={form.schemaType}
                onValueChange={(v) =>
                  update("schemaType", (v || "Product") as "Product" | "Service")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              disabled={isEdit}
              className="font-mono"
            />
            {!isEdit && (
              <p className="text-xs text-gray-500">
                Auto-generated from heading. Edit if needed.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hero */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>H1</Label>
              <RichTextEditor
                variant="compact"
                content={form.h1}
                onChange={(html) => update("h1", html)}
              />
            </div>
            <div className="space-y-2">
              <Label>H1 Highlight</Label>
              <RichTextEditor
                variant="compact"
                content={form.h1Highlight}
                onChange={(html) => update("h1Highlight", html)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <RichTextEditor
              variant="full"
              content={form.heroSubtitle}
              onChange={(html) => update("heroSubtitle", html)}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO (collapsible) */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setSeoOpen(!seoOpen)}
        >
          <div className="flex items-center justify-between">
            <CardTitle>SEO</CardTitle>
            {seoOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </CardHeader>
        {seoOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Primary Keyword</Label>
              <Input
                value={form.primaryKeyword}
                onChange={(e) => update("primaryKeyword", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Keywords</Label>
              <div className="flex gap-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="Type and press Enter"
                />
                <Button type="button" variant="outline" onClick={addKeyword}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.secondaryKeywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="gap-1">
                    {kw}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeKeyword(kw)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Content Sections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content Sections</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addSection}>
              <Plus className="h-4 w-4 mr-1" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.sections.map((section, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Section {i + 1}
                </span>
                <div className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === form.sections.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(i)}
                  disabled={form.sections.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <RichTextEditor
                  variant="compact"
                  content={section.heading}
                  onChange={(html) => updateSection(i, "heading", html)}
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor
                  content={section.content}
                  onChange={(html) => updateSection(i, "content", html)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>FAQs</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addFaq}>
              <Plus className="h-4 w-4 mr-1" />
              Add FAQ
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  FAQ {i + 1}
                </span>
                <div className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveFaq(i, -1)}
                  disabled={i === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveFaq(i, 1)}
                  disabled={i === form.faqs.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFaq(i)}
                  disabled={form.faqs.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Question</Label>
                <RichTextEditor
                  variant="compact"
                  content={faq.question}
                  onChange={(html) => updateFaq(i, "question", html)}
                />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <RichTextEditor
                  variant="full"
                  content={faq.answer}
                  onChange={(html) => updateFaq(i, "answer", html)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Related Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={relatedInput} onValueChange={(v) => setRelatedInput(v || "")}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a page..." />
              </SelectTrigger>
              <SelectContent>
                {allSlugs
                  .filter((s) => !form.relatedSlugs.includes(s) && s !== form.slug)
                  .map((slug) => (
                    <SelectItem key={slug} value={slug}>
                      {slug}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button type="button" variant="outline" onClick={addRelatedSlug}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.relatedSlugs.map((slug) => (
              <Badge key={slug} variant="secondary" className="gap-1">
                {slug}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeRelatedSlug(slug)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Bottom save */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
