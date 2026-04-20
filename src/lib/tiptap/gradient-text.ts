import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    gradientText: {
      setGradient: (from: string, to: string) => ReturnType;
      unsetGradient: () => ReturnType;
    };
  }
}

export const GradientText = Mark.create({
  name: "gradientText",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  addAttributes() {
    return {
      from: { default: null },
      to: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: "span[data-gradient]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const { from, to } = HTMLAttributes;
    if (!from || !to) return ["span", {}, 0];
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, {
        "data-gradient": "true",
        style: `background: linear-gradient(90deg, ${from}, ${to}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`,
      }),
      0,
    ];
  },
  addCommands() {
    return {
      setGradient:
        (from: string, to: string) =>
        ({ chain }) =>
          chain().setMark(this.name, { from, to }).run(),
      unsetGradient:
        () =>
        ({ chain }) =>
          chain().unsetMark(this.name).run(),
    };
  },
});
