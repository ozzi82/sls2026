"use client";

import type { ProcessStepsData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";

interface ProcessStepsEditorProps {
  data: ProcessStepsData;
  onChange: (data: ProcessStepsData) => void;
}

export default function ProcessStepsEditor({ data, onChange }: ProcessStepsEditorProps) {
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
