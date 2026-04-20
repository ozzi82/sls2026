"use client";

import { useState } from "react";
import type { RelatedPagesData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import RichTextEditor from "../RichTextEditor";

interface RelatedPagesEditorProps {
  data: RelatedPagesData;
  onChange: (data: RelatedPagesData) => void;
}

export default function RelatedPagesEditor({ data, onChange }: RelatedPagesEditorProps) {
  const [newSlug, setNewSlug] = useState("");

  function addSlug() {
    const slug = newSlug.trim();
    if (!slug || data.slugs.includes(slug)) return;
    onChange({ ...data, slugs: [...data.slugs, slug] });
    setNewSlug("");
  }

  function removeSlug(index: number) {
    onChange({ ...data, slugs: data.slugs.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <RichTextEditor
          variant="compact"
          content={data.heading}
          onChange={(html) => onChange({ ...data, heading: html })}
        />
      </div>
      <div>
        <Label>Page Slugs</Label>
        <div className="flex gap-2">
          <Input
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="page-slug"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSlug();
              }
            }}
          />
          <Button type="button" variant="outline" size="sm" onClick={addSlug}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.slugs.map((slug, i) => (
            <Badge key={slug} variant="secondary" className="gap-1">
              {slug}
              <button
                type="button"
                onClick={() => removeSlug(i)}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
