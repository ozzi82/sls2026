"use client";

import type { ContactInfoData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvailableIconNames } from "@/lib/admin/icon-map";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface ContactInfoEditorProps {
  data: ContactInfoData;
  onChange: (data: ContactInfoData) => void;
}

export default function ContactInfoEditor({ data, onChange }: ContactInfoEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <RichTextEditor
          variant="compact"
          content={data.heading ?? ""}
          onChange={(html) => onChange({ ...data, heading: html })}
        />
      </div>
      <div>
        <Label>Cards</Label>
        <ListEditor
          items={data.cards}
          onChange={(cards) => onChange({ ...data, cards })}
          createItem={() => ({ icon: "", title: "", value: "", note: "", href: "", description: "" })}
          label="Card"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Select
                value={item.icon}
                onValueChange={(v) => update({ ...item, icon: v ?? "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon..." />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableIconNames().map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RichTextEditor
                variant="compact"
                content={item.title}
                onChange={(html) => update({ ...item, title: html })}
              />
              <Input
                value={item.value}
                onChange={(e) => update({ ...item, value: e.target.value })}
                placeholder="Value"
              />
              <RichTextEditor
                variant="compact"
                content={item.note ?? ""}
                onChange={(html) => update({ ...item, note: html })}
              />
              <Input
                value={item.href ?? ""}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="Link href"
              />
              <RichTextEditor
                variant="full"
                content={item.description ?? ""}
                onChange={(html) => update({ ...item, description: html })}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
