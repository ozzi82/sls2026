"use client";

import type { ProductGridData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";

interface ProductGridEditorProps {
  data: ProductGridData;
  onChange: (data: ProductGridData) => void;
}

export default function ProductGridEditor({ data, onChange }: ProductGridEditorProps) {
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
        <Label>Description</Label>
        <Textarea
          value={data.description ?? ""}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Section description"
        />
      </div>
      <div>
        <Label>Products</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ name: "", model: "", image: "", href: "" })}
          label="Product"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Input
                value={item.name}
                onChange={(e) => update({ ...item, name: e.target.value })}
                placeholder="Product name"
              />
              <Input
                value={item.model ?? ""}
                onChange={(e) => update({ ...item, model: e.target.value })}
                placeholder="Model"
              />
              <ImageUpload
                value={item.image ?? ""}
                onChange={(result) => update({ ...item, image: typeof result === "string" ? result : result.url })}
                placeholder="Image URL"
              />
              <Input
                value={item.href ?? ""}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="Link href"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
