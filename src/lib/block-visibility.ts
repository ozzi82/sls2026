import { Block } from "@/lib/admin/page-config-types";

/**
 * Returns CSS class string for block responsive visibility.
 * Uses Tailwind's responsive prefixes.
 */
export function blockVisibilityClass(block: Block | undefined): string {
  if (!block) return "";
  const classes: string[] = [];
  if (block.hideOnMobile) classes.push("hidden md:block");
  if (block.hideOnDesktop) classes.push("md:hidden");
  return classes.join(" ");
}
