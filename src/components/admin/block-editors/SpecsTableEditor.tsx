"use client";

import type { SpecsTableData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface SpecsTableEditorProps {
  data: SpecsTableData;
  onChange: (data: SpecsTableData) => void;
}

export default function SpecsTableEditor({ data, onChange }: SpecsTableEditorProps) {
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
        <Label>Image URL</Label>
        <ImageUpload
          value={data.image ?? ""}
          onChange={(result) => onChange({ ...data, image: typeof result === "string" ? result : result.url })}
          placeholder="/images/specs.jpg"
        />
      </div>
      <div>
        <Label>Specs</Label>
        <ListEditor
          items={data.specs}
          onChange={(specs) => onChange({ ...data, specs })}
          createItem={() => ({ label: "", value: "" })}
          label="Spec"
          renderItem={(item, _index, update) => (
            <div className="grid grid-cols-2 gap-2">
              <RichTextEditor
                variant="compact"
                content={item.label}
                onChange={(html) => update({ ...item, label: html })}
              />
              <Input
                value={item.value}
                onChange={(e) => update({ ...item, value: e.target.value })}
                placeholder="Value"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
