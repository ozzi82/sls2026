"use client";

import type { FAQData } from "@/lib/admin/page-config-types";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface FAQEditorProps {
  data: FAQData;
  onChange: (data: FAQData) => void;
}

export default function FAQEditor({ data, onChange }: FAQEditorProps) {
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
        <Label>Questions</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ question: "", answer: "" })}
          label="Question"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <RichTextEditor
                variant="compact"
                content={item.question}
                onChange={(html) => update({ ...item, question: html })}
              />
              <RichTextEditor
                variant="full"
                content={item.answer}
                onChange={(html) => update({ ...item, answer: html })}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
