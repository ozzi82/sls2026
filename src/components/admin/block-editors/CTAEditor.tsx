"use client";

import type { CTAData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CTAEditorProps {
  data: CTAData;
  onChange: (data: CTAData) => void;
}

export default function CTAEditor({ data, onChange }: CTAEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="CTA heading"
        />
      </div>
      <div>
        <Label>Heading Highlight</Label>
        <Input
          value={data.headingHighlight ?? ""}
          onChange={(e) => onChange({ ...data, headingHighlight: e.target.value })}
          placeholder="Highlighted portion"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="CTA description"
        />
      </div>
    </div>
  );
}
