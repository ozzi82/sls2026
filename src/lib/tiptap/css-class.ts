import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    cssClass: {
      setCssClass: (className: string) => ReturnType;
      unsetCssClass: () => ReturnType;
    };
  }
}

export const CssClass = Mark.create({
  name: "cssClass",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  addAttributes() {
    return {
      class: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: "span[data-css-class]" }];
  },
  renderHTML({ HTMLAttributes }) {
    if (!HTMLAttributes.class) return ["span", {}, 0];
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, {
        "data-css-class": "true",
        class: HTMLAttributes.class,
      }),
      0,
    ];
  },
  addCommands() {
    return {
      setCssClass:
        (className: string) =>
        ({ chain }) =>
          chain().setMark(this.name, { class: className }).run(),
      unsetCssClass:
        () =>
        ({ chain }) =>
          chain().unsetMark(this.name).run(),
    };
  },
});
