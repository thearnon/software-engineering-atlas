import { useEffect, useState } from "react";
import type { RefObject } from "react";

import { slugify } from "@/lib/slugify";

export interface Heading {
  readonly id: string;
  readonly text: string;
  readonly level: 2 | 3;
}

/**
 * Extracts `h2`/`h3` headings from a rendered MDX container, assigns ids when
 * missing, and tracks which heading is currently in view (scroll-spy).
 * `deps` should change when the rendered content changes (e.g. the pathname).
 */
export function useHeadings<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  deps: readonly unknown[],
): { headings: Heading[]; activeId: string } {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;

    if (container === null) {
      return;
    }

    const nodes = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    );

    const collected: Heading[] = nodes.map((node, index) => {
      const text = node.textContent ?? "";

      if (node.id.length === 0) {
        node.id = slugify(text, index);
      }

      return { id: node.id, text, level: node.tagName === "H3" ? 3 : 2 };
    });

    setHeadings(collected);
    setActiveId(collected[0]?.id ?? "");

    if (collected.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { headings, activeId };
}
