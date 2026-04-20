"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Block, BlockType } from "@/lib/admin/page-config-types";
import {
  HeroEditor,
  FeaturesGridEditor,
  SpecsTableEditor,
  FAQEditor,
  GalleryEditor,
  TextSectionEditor,
  CTAEditor,
  UseCasesEditor,
  ProductTypesEditor,
  StatsStripEditor,
  TimelineEditor,
  ProcessStepsEditor,
  ContactInfoEditor,
  FormSectionEditor,
  MarqueeEditor,
  ProductGridEditor,
  ResourceCardsEditor,
  GuidesListEditor,
  RelatedPagesEditor,
} from "./block-editors";

interface BlockCardProps {
  block: Block;
  onChange: (block: Block) => void;
  editLocale: "en" | "de";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const editorMap: Record<BlockType, React.ComponentType<{ data: any; onChange: (data: any) => void }>> = {
  hero: HeroEditor,
  features_grid: FeaturesGridEditor,
  product_types: ProductTypesEditor,
  specs_table: SpecsTableEditor,
  use_cases: UseCasesEditor,
  gallery: GalleryEditor,
  faq: FAQEditor,
  cta: CTAEditor,
  related_pages: RelatedPagesEditor,
  text_section: TextSectionEditor,
  stats_strip: StatsStripEditor,
  marquee: MarqueeEditor,
  timeline: TimelineEditor,
  contact_info: ContactInfoEditor,
  form_section: FormSectionEditor,
  process_steps: ProcessStepsEditor,
  product_grid: ProductGridEditor,
  resource_cards: ResourceCardsEditor,
  guides_list: GuidesListEditor,
};

export default function BlockCard({ block, onChange, editLocale }: BlockCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Editor = editorMap[block.type];
  // For DE mode: use the de data if it exists and has content, otherwise fall back to English data
  // (so editors always have properly-shaped data and don't crash on missing fields)
  const rawDe = (block.data as any).de;
  const hasDeContent = rawDe && typeof rawDe === "object" && Object.keys(rawDe).length > 0;
  const deData = hasDeContent ? rawDe : Object.fromEntries(
    Object.entries(block.data as any).filter(([k]) => k !== "de")
  );

  return (
    <div className={`border rounded-lg ${block.visible ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50 opacity-75"}`}>
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${block.visible ? "bg-green-500" : "bg-gray-300"}`}
            onClick={(e) => {
              e.stopPropagation();
              onChange({ ...block, visible: !block.visible });
            }}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${block.visible ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className="font-medium text-sm text-gray-900">{block.label}</span>
          <span className="text-xs text-gray-400 font-mono">{block.type}</span>
          {block.hideOnMobile && (
            <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Hidden on mobile</span>
          )}
          {block.hideOnDesktop && (
            <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Hidden on desktop</span>
          )}
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </div>
      {expanded && Editor && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          {/* Visibility options */}
          <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-100">
            <label className="flex items-center gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                checked={block.hideOnMobile || false}
                onChange={(e) => onChange({ ...block, hideOnMobile: e.target.checked || undefined })}
                className="rounded border-gray-300"
              />
              Hide on mobile
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                checked={block.hideOnDesktop || false}
                onChange={(e) => onChange({ ...block, hideOnDesktop: e.target.checked || undefined })}
                className="rounded border-gray-300"
              />
              Hide on desktop
            </label>
          </div>
          {editLocale === "de" && (
            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  const enData = Object.fromEntries(
                    Object.entries(block.data as any).filter(([k]) => k !== "de")
                  );
                  onChange({ ...block, data: { ...block.data, de: { ...enData } } as any });
                }}
                className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1"
              >
                Copy from English
              </button>
              {!hasDeContent && (
                <span className="text-xs text-gray-400 ml-2">No German content yet — showing English as starting point</span>
              )}
            </div>
          )}
          <Editor
            data={editLocale === "de" ? deData : block.data}
            onChange={(newData) => {
              if (editLocale === "de") {
                onChange({ ...block, data: { ...block.data, de: newData } as any });
              } else {
                onChange({ ...block, data: newData });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
