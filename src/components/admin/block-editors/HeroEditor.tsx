"use client";

import type { HeroData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Badge</Label>
        <RichTextEditor
          variant="compact"
          content={data.badge ?? ""}
          onChange={(html) => onChange({ ...data, badge: html })}
        />
      </div>
      <div>
        <Label>Heading (h1)</Label>
        <RichTextEditor
          variant="compact"
          content={data.h1}
          onChange={(html) => onChange({ ...data, h1: html })}
        />
      </div>
      <div>
        <Label>Heading Highlight</Label>
        <RichTextEditor
          variant="compact"
          content={data.h1Highlight ?? ""}
          onChange={(html) => onChange({ ...data, h1Highlight: html })}
        />
      </div>
      <div>
        <Label>Subtitle</Label>
        <RichTextEditor
          variant="full"
          content={data.subtitle}
          onChange={(html) => onChange({ ...data, subtitle: html })}
        />
      </div>
      <div>
        <Label>Image</Label>
        <ImageUpload
          value={data.image ?? ""}
          onChange={(result) => onChange({ ...data, image: typeof result === "string" ? result : result.url })}
          placeholder="/uploads/hero.jpg"
        />
      </div>
      <div>
        <Label>
          Overlay Opacity — {data.overlayOpacity ?? 60}%
        </Label>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={data.overlayOpacity ?? 60}
          onChange={(e) =>
            onChange({ ...data, overlayOpacity: Number(e.target.value) })
          }
          className="w-full accent-brand-gold"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Controls how dark the overlay is on top of the hero background images. 0% = no overlay, 100% = fully dark.
        </p>
      </div>
      <div>
        <Label>CTAs</Label>
        <ListEditor
          items={data.ctas}
          onChange={(ctas) => onChange({ ...data, ctas })}
          createItem={() => ({ label: "", href: "", variant: "primary" as const })}
          label="CTA"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <RichTextEditor
                variant="compact"
                content={item.label}
                onChange={(html) => update({ ...item, label: html })}
              />
              <Input
                value={item.href}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="/page-slug"
              />
              <Select
                value={item.variant}
                onValueChange={(v) =>
                  update({ ...item, variant: v as "primary" | "secondary" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}
