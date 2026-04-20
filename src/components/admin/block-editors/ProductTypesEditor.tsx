"use client";

import type { ProductTypesData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface ProductTypesEditorProps {
  data: ProductTypesData;
  onChange: (data: ProductTypesData) => void;
}

export default function ProductTypesEditor({ data, onChange }: ProductTypesEditorProps) {
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
        <Label>Product Types</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ name: "", description: "", image: "", href: "" })}
          label="Product Type"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <RichTextEditor
                variant="compact"
                content={item.name}
                onChange={(html) => update({ ...item, name: html })}
              />
              <RichTextEditor
                variant="full"
                content={item.description}
                onChange={(html) => update({ ...item, description: html })}
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
