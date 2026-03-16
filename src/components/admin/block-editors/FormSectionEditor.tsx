"use client";

import type { FormSectionData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListEditor from "./ListEditor";

interface FormSectionEditorProps {
  data: FormSectionData;
  onChange: (data: FormSectionData) => void;
}

export default function FormSectionEditor({ data, onChange }: FormSectionEditorProps) {
  const sidebar = data.sidebar ?? {};

  function updateSidebar(patch: Partial<NonNullable<FormSectionData["sidebar"]>>) {
    onChange({ ...data, sidebar: { ...sidebar, ...patch } });
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Form heading"
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={data.description ?? ""}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Form description"
        />
      </div>
      <div>
        <Label>Form Type</Label>
        <Select
          value={data.formType}
          onValueChange={(v) =>
            onChange({ ...data, formType: v as "contact" | "quote" })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Form type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contact">Contact</SelectItem>
            <SelectItem value="quote">Quote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-t pt-4 space-y-4">
        <h4 className="font-medium text-sm">Sidebar</h4>

        <div>
          <Label>Business Hours</Label>
          <ListEditor
            items={sidebar.businessHours ?? []}
            onChange={(businessHours) => updateSidebar({ businessHours })}
            createItem={() => ({ day: "", hours: "" })}
            label="Hours Entry"
            renderItem={(item, _index, update) => (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={item.day}
                  onChange={(e) => update({ ...item, day: e.target.value })}
                  placeholder="Day"
                />
                <Input
                  value={item.hours}
                  onChange={(e) => update({ ...item, hours: e.target.value })}
                  placeholder="Hours"
                />
              </div>
            )}
          />
        </div>

        <div>
          <Label>Notices</Label>
          <ListEditor
            items={sidebar.notices ?? []}
            onChange={(notices) => updateSidebar({ notices })}
            createItem={() => ""}
            label="Notice"
            renderItem={(item, _index, update) => (
              <Input
                value={item}
                onChange={(e) => update(e.target.value)}
                placeholder="Notice text"
              />
            )}
          />
        </div>

        <div>
          <Label>CTA Text</Label>
          <Input
            value={sidebar.ctaText ?? ""}
            onChange={(e) => updateSidebar({ ctaText: e.target.value })}
            placeholder="Sidebar CTA text"
          />
        </div>
      </div>
    </div>
  );
}
