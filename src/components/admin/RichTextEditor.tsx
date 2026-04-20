"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { FontSize } from "@/lib/tiptap/font-size";
import { TextShadow } from "@/lib/tiptap/text-shadow";
import { GradientText } from "@/lib/tiptap/gradient-text";
import { CssClass } from "@/lib/tiptap/css-class";
import ColorPickerButton from "./ColorPickerButton";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Code,
  MoreHorizontal,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  variant?: "compact" | "full";
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  variant = "full",
  placeholder,
}: RichTextEditorProps) {
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState("");
  const [expanded, setExpanded] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "" },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      FontSize,
      TextShadow,
      GradientText,
      CssClass,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        ...(placeholder ? { "data-placeholder": placeholder } : {}),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  const Separator = () => <div className="w-px h-6 bg-gray-200 mx-1" />;

  function getActiveHeading(): string {
    if (!editor) return "p";
    for (const level of [1, 2, 3, 4] as const) {
      if (editor.isActive("heading", { level })) return String(level);
    }
    return "p";
  }

  const showFullToolbar = variant === "full" || expanded;

  const renderRow1 = () => (
    <div className="flex flex-wrap items-center gap-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <Separator />
      <select
        value={getActiveHeading()}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "p") editor.chain().focus().setParagraph().run();
          else
            editor
              .chain()
              .focus()
              .toggleHeading({ level: Number(val) as 1 | 2 | 3 | 4 })
              .run();
        }}
        className="h-8 text-xs border border-gray-200 rounded px-1"
      >
        <option value="p">P</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
      </select>
      <input
        type="text"
        placeholder="px"
        className="h-8 w-14 text-xs border border-gray-200 rounded px-2 text-center"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const val = (e.target as HTMLInputElement).value;
            if (val)
              editor
                .chain()
                .focus()
                .setFontSize(val.includes("px") ? val : `${val}px`)
                .run();
            else editor.chain().focus().unsetFontSize().run();
          }
        }}
      />
      <Separator />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );

  const renderRow2 = () => (
    <div className="flex flex-wrap items-center gap-1">
      <ColorPickerButton
        color={editor.getAttributes("textStyle").color || ""}
        onChange={(color) => {
          if (color) editor.chain().focus().setColor(color).run();
          else editor.chain().focus().unsetColor().run();
        }}
        title="Text Color"
      />
      <ColorPickerButton
        color={editor.getAttributes("highlight").color || ""}
        onChange={(color) => {
          if (color) editor.chain().focus().toggleHighlight({ color }).run();
          else editor.chain().focus().unsetHighlight().run();
        }}
        title="Highlight Color"
      />
      <Separator />
      <select
        onChange={(e) => {
          const val = e.target.value;
          if (val === "none") editor.chain().focus().unsetTextShadow().run();
          else if (val === "custom") {
            const custom = window.prompt("CSS text-shadow value:");
            if (custom) editor.chain().focus().setTextShadow(custom).run();
          } else {
            editor.chain().focus().setTextShadow(val).run();
          }
        }}
        className="h-8 text-xs border border-gray-200 rounded px-1"
        defaultValue="none"
      >
        <option value="none">Shadow: None</option>
        <option value="1px 1px 2px rgba(0,0,0,0.3)">Subtle</option>
        <option value="2px 2px 4px rgba(0,0,0,0.5)">Medium</option>
        <option value="3px 3px 6px rgba(0,0,0,0.7)">Strong</option>
        <option value="custom">Custom...</option>
      </select>
      <select
        onChange={(e) => {
          const val = e.target.value;
          if (val === "none") editor.chain().focus().unsetGradient().run();
          else if (val === "gold")
            editor.chain().focus().setGradient("#f59e0b", "#fbbf24").run();
          else if (val === "sunset")
            editor.chain().focus().setGradient("#f97316", "#ec4899").run();
          else if (val === "custom") {
            const from = window.prompt(
              "Gradient start color (hex):",
              "#f59e0b"
            );
            const to = window.prompt("Gradient end color (hex):", "#fbbf24");
            if (from && to)
              editor.chain().focus().setGradient(from, to).run();
          }
        }}
        className="h-8 text-xs border border-gray-200 rounded px-1"
        defaultValue="none"
      >
        <option value="none">Gradient: None</option>
        <option value="gold">Gold</option>
        <option value="sunset">Sunset</option>
        <option value="custom">Custom...</option>
      </select>
      <Separator />
      <input
        type="text"
        placeholder="CSS class"
        className="h-8 w-24 text-xs border border-gray-200 rounded px-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const val = (e.target as HTMLInputElement).value;
            if (val) editor.chain().focus().setCssClass(val).run();
            else editor.chain().focus().unsetCssClass().run();
          }
        }}
      />
    </div>
  );

  const renderRow3 = () => (
    <div className="flex flex-wrap items-center gap-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <Separator />
      <ToolbarButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        title="Add Link"
      >
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      {editor.isActive("link") && (
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Remove Link"
        >
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
      )}
      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Image URL:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        title="Insert Image"
      >
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <Separator />
      <div className="flex-1" />
      <ToolbarButton
        onClick={() => {
          if (sourceMode) {
            editor.commands.setContent(sourceHtml, { emitUpdate: false });
            onChange(sourceHtml);
          } else {
            setSourceHtml(editor.getHTML());
          }
          setSourceMode(!sourceMode);
        }}
        isActive={sourceMode}
        title="Source Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );

  const renderCompactToolbar = () => (
    <div className="flex flex-wrap items-center gap-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ColorPickerButton
        color={editor.getAttributes("textStyle").color || ""}
        onChange={(color) => {
          if (color) editor.chain().focus().setColor(color).run();
          else editor.chain().focus().unsetColor().run();
        }}
        title="Text Color"
      />
      <input
        type="text"
        placeholder="px"
        className="h-8 w-14 text-xs border border-gray-200 rounded px-2 text-center"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const val = (e.target as HTMLInputElement).value;
            if (val)
              editor
                .chain()
                .focus()
                .setFontSize(val.includes("px") ? val : `${val}px`)
                .run();
            else editor.chain().focus().unsetFontSize().run();
          }
        }}
      />
      <ToolbarButton
        onClick={() => {
          if (sourceMode) {
            editor.commands.setContent(sourceHtml, { emitUpdate: false });
            onChange(sourceHtml);
          } else {
            setSourceHtml(editor.getHTML());
          }
          setSourceMode(!sourceMode);
        }}
        isActive={sourceMode}
        title="Source Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => setExpanded(!expanded)}
        isActive={expanded}
        title="More options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex flex-col gap-1 p-2 border-b bg-gray-50">
        {!showFullToolbar ? (
          renderCompactToolbar()
        ) : (
          <>
            {renderRow1()}
            {renderRow2()}
            {renderRow3()}
          </>
        )}
      </div>

      {/* Editor / Source */}
      {sourceMode ? (
        <textarea
          value={sourceHtml}
          onChange={(e) => {
            setSourceHtml(e.target.value);
            onChange(e.target.value);
          }}
          className={`w-full p-4 font-mono text-sm bg-gray-900 text-green-400 focus:outline-none ${
            variant === "compact" ? "min-h-[40px]" : "min-h-[200px]"
          }`}
        />
      ) : (
        <EditorContent
          editor={editor}
          className={`prose prose-sm max-w-none p-4 focus:outline-none [&_.ProseMirror]:outline-none text-gray-900 ${
            variant === "compact"
              ? "[&_.ProseMirror]:min-h-[20px]"
              : "[&_.ProseMirror]:min-h-[180px]"
          }`}
        />
      )}
    </div>
  );
}
