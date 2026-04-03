"use client";

import type { HeroData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Badge</Label>
        <Input
          value={data.badge ?? ""}
          onChange={(e) => onChange({ ...data, badge: e.target.value })}
          placeholder="Badge text"
        />
      </div>
      <div>
        <Label>Heading (h1)</Label>
        <Input
          value={data.h1}
          onChange={(e) => onChange({ ...data, h1: e.target.value })}
          placeholder="Main heading"
        />
      </div>
      <div>
        <Label>Heading Highlight</Label>
        <Input
          value={data.h1Highlight ?? ""}
          onChange={(e) => onChange({ ...data, h1Highlight: e.target.value })}
          placeholder="Highlighted portion of heading"
        />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Textarea
          value={data.subtitle}
          onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
          placeholder="Subtitle text"
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
              <Input
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Button label"
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
