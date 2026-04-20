"use client";

import Link from "next/link";
import { ComponentProps } from "react";

type LocaleLinkProps = ComponentProps<typeof Link> & {
  locale: string;
};

export default function LocaleLink({
  href,
  locale,
  ...props
}: LocaleLinkProps) {
  const hrefStr = typeof href === "string" ? href : href.pathname || "/";
  const localizedHref =
    locale === "de" &&
    hrefStr.startsWith("/") &&
    !hrefStr.startsWith("/de/") &&
    hrefStr !== "/de"
      ? `/de${hrefStr}`
      : hrefStr;
  return <Link href={localizedHref} {...props} />;
}
