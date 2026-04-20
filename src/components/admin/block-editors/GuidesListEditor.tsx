"use client";

import type { GuidesListData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface GuidesListEditorProps {
  data: GuidesListData;
  onChange: (data: GuidesListData) => void;
}

export default function GuidesListEditor({ data, onChange }: GuidesListEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <RichTextEditor
          variant="compact"
          content={data.heading ?? ""}
          onChange={(html) => onChange({ ...data, heading: html })}
        />
      </div>
      <div>
        <Label>Guides</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ title: "", description: "", readTime: "", href: "", image: "" })}
          label="Guide"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <RichTextEditor
                variant="compact"
                content={item.title}
                onChange={(html) => update({ ...item, title: html })}
              />
              <RichTextEditor
                variant="full"
                content={item.description}
                onChange={(html) => update({ ...item, description: html })}
              />
              <Input
                value={item.readTime}
                onChange={(e) => update({ ...item, readTime: e.target.value })}
                placeholder="Read time (e.g. 5 min)"
              />
              <Input
                value={item.href}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="Link href"
              />
              <ImageUpload
                value={item.image ?? ""}
                onChange={(result) => update({ ...item, image: typeof result === "string" ? result : result.url })}
                placeholder="Image URL"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
