"use client";

import type { SpecsTableData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";

interface SpecsTableEditorProps {
  data: SpecsTableData;
  onChange: (data: SpecsTableData) => void;
}

export default function SpecsTableEditor({ data, onChange }: SpecsTableEditorProps) {
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
        <Label>Image URL</Label>
        <Input
          value={data.image ?? ""}
          onChange={(e) => onChange({ ...data, image: e.target.value })}
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
              <Input
                value={item.label}
                onChange={(e) => update({ ...item, label: e.target.value })}
                placeholder="Label"
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
