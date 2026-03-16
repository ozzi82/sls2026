"use client";

import type { UseCasesData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";

interface UseCasesEditorProps {
  data: UseCasesData;
  onChange: (data: UseCasesData) => void;
}

export default function UseCasesEditor({ data, onChange }: UseCasesEditorProps) {
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
        <Label>Use Cases</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ""}
          label="Use Case"
          renderItem={(item, _index, update) => (
            <Input
              value={item}
              onChange={(e) => update(e.target.value)}
              placeholder="Use case text"
            />
          )}
        />
      </div>
    </div>
  );
}
