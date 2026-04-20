"use client";

import type { CTAData } from "@/lib/admin/page-config-types";
import { Label } from "@/components/ui/label";
import RichTextEditor from "../RichTextEditor";

interface CTAEditorProps {
  data: CTAData;
  onChange: (data: CTAData) => void;
}

export default function CTAEditor({ data, onChange }: CTAEditorProps) {
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
        <Label>Heading Highlight</Label>
        <RichTextEditor
          variant="compact"
          content={data.headingHighlight ?? ""}
          onChange={(html) => onChange({ ...data, headingHighlight: html })}
        />
      </div>
      <div>
        <Label>Description</Label>
        <RichTextEditor
          variant="full"
          content={data.description}
          onChange={(html) => onChange({ ...data, description: html })}
        />
      </div>
    </div>
  );
}
