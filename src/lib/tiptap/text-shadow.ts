import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textShadow: {
      setTextShadow: (value: string) => ReturnType;
      unsetTextShadow: () => ReturnType;
    };
  }
}

export const TextShadow = Extension.create({
  name: "textShadow",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textShadow: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.textShadow || null,
            renderHTML: (attributes: Record<string, string>) => {
              if (!attributes.textShadow) return {};
              return { style: `text-shadow: ${attributes.textShadow}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setTextShadow:
        (value: string) =>
        ({ chain }) =>
          chain().setMark("textStyle", { textShadow: value }).run(),
      unsetTextShadow:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { textShadow: null }).removeEmptyTextStyle().run(),
    };
  },
});
