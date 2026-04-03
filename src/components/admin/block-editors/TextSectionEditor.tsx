"use client";

import type { TextSectionData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface TextSectionEditorProps {
  data: TextSectionData;
  onChange: (data: TextSectionData) => void;
}

export default function TextSectionEditor({ data, onChange }: TextSectionEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Section heading"
        />
      </div>
      <div>
        <Label>Content</Label>
        <RichTextEditor
          content={data.content}
          onChange={(content) => onChange({ ...data, content })}
        />
      </div>
      <div>
        <Label>Image URL</Label>
        <ImageUpload
          value={data.image ?? ""}
          onChange={(result) => onChange({ ...data, image: typeof result === "string" ? result : result.url })}
          placeholder="/images/section.jpg"
        />
      </div>
      <div>
        <Label>Image Position</Label>
        <Select
          value={data.imagePosition ?? "left"}
          onValueChange={(v) =>
            onChange({ ...data, imagePosition: v as "left" | "right" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Image position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Background</Label>
        <Select
          value={data.background ?? "light"}
          onValueChange={(v) =>
            onChange({ ...data, background: v as "light" | "dark" | "navy" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Background style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="navy">Navy</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
