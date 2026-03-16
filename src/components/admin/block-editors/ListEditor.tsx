"use client";

import type React from "react";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface ListEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (updated: T) => void) => React.ReactNode;
  createItem: () => T;
  label: string;
  minItems?: number;
}

export default function ListEditor<T>({
  items,
  onChange,
  renderItem,
  createItem,
  label,
  minItems = 0,
}: ListEditorProps<T>) {
  const baseId = useId();

  function add() {
    onChange([...items, createItem()]);
  }

  function remove(index: number) {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const next = [...items];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  }

  function update(index: number, updated: T) {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={`${baseId}-${i}`} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-1 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => move(i, -1)} disabled={i === 0}>
              <ArrowUp className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
              <ArrowDown className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)} disabled={items.length <= minItems}>
              <Trash2 className="h-3 w-3 text-red-500" />
            </Button>
          </div>
          {renderItem(item, i, (updated) => update(i, updated))}
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus className="h-3 w-3 mr-1" />
        Add {label}
      </Button>
    </div>
  );
}
