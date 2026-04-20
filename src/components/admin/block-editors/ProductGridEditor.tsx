"use client";

import type { ProductGridData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface ProductGridEditorProps {
  data: ProductGridData;
  onChange: (data: ProductGridData) => void;
}

export default function ProductGridEditor({ data, onChange }: ProductGridEditorProps) {
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
        <Label>Description</Label>
        <RichTextEditor
          variant="full"
          content={data.description ?? ""}
          onChange={(html) => onChange({ ...data, description: html })}
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
              <RichTextEditor
                variant="compact"
                content={item.name}
                onChange={(html) => update({ ...item, name: html })}
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
