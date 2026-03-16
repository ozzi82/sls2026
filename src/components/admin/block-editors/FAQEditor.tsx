"use client";

import type { FAQData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";

interface FAQEditorProps {
  data: FAQData;
  onChange: (data: FAQData) => void;
}

export default function FAQEditor({ data, onChange }: FAQEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="FAQ section heading"
        />
      </div>
      <div>
        <Label>Questions</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ question: "", answer: "" })}
          label="Question"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Input
                value={item.question}
                onChange={(e) => update({ ...item, question: e.target.value })}
                placeholder="Question"
              />
              <Textarea
                value={item.answer}
                onChange={(e) => update({ ...item, answer: e.target.value })}
                placeholder="Answer"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
