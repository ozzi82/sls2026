"use client";

import type { ProcessStepsData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface ProcessStepsEditorProps {
  data: ProcessStepsData;
  onChange: (data: ProcessStepsData) => void;
}

export default function ProcessStepsEditor({ data, onChange }: ProcessStepsEditorProps) {
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
        <Label>Steps</Label>
        <ListEditor
          items={data.steps}
          onChange={(steps) => onChange({ ...data, steps })}
          createItem={() => ({ step: data.steps.length + 1, title: "", description: "", image: "" })}
          label="Step"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Input
                type="number"
                value={item.step}
                onChange={(e) => update({ ...item, step: Number(e.target.value) })}
                placeholder="Step number"
              />
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
