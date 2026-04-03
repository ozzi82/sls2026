"use client";

import type { GuidesListData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";

interface GuidesListEditorProps {
  data: GuidesListData;
  onChange: (data: GuidesListData) => void;
}

export default function GuidesListEditor({ data, onChange }: GuidesListEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading ?? ""}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Section heading"
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
              <Input
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
              />
              <Textarea
                value={item.description}
                onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Description"
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
