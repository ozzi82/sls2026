"use client";

import type { UseCasesData } from "@/lib/admin/page-config-types";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface UseCasesEditorProps {
  data: UseCasesData;
  onChange: (data: UseCasesData) => void;
}

export default function UseCasesEditor({ data, onChange }: UseCasesEditorProps) {
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
        <Label>Use Cases</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ""}
          label="Use Case"
          renderItem={(item, _index, update) => (
            <RichTextEditor
              variant="full"
              content={item}
              onChange={(html) => update(html)}
            />
          )}
        />
      </div>
    </div>
  );
}
