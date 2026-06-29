import type { MDXComponents } from "mdx/types";

import { Callout } from "@/components/Callout";

/**
 * Custom components made available to every MDX topic via the `components`
 * prop, so authors can use `<Callout>` without importing it per file.
 */
export const mdxComponents: MDXComponents = {
  Callout,
};
