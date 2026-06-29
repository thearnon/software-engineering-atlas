import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

import EnRbacContent from "@/content/en/architecture/rbac.mdx";
import ThRbacContent from "@/content/th/architecture/rbac.mdx";
import type { AtlasArea } from "@/data/areas";
import type { Locale } from "@/lib/locales";

export type { AtlasArea } from "@/data/areas";

export type ContentLayer = "article" | "reference" | "viewer";

export interface TopicEntry {
  readonly id: string;
  readonly locale: Locale;
  readonly area: AtlasArea;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly layer: ContentLayer;
  readonly keywords: readonly string[];
  readonly relatedTopicIds: readonly string[];
  readonly Content: ComponentType<MDXProps>;
}

export const topics = [
  {
    id: "rbac",
    locale: "th",
    area: "architecture",
    slug: "rbac",
    title: "RBAC คืออะไร",
    summary:
      "Role-Based Access Control สำหรับออกแบบสิทธิ์ใน enterprise internal web application.",
    layer: "article",
    keywords: ["RBAC", "สิทธิ์", "role", "permission", "approval workflow"],
    relatedTopicIds: ["audit-log", "approval-workflow", "permission-matrix"],
    Content: ThRbacContent,
  },
  {
    id: "rbac",
    locale: "en",
    area: "architecture",
    slug: "rbac",
    title: "Role-Based Access Control",
    summary:
      "A practical RBAC entry point for permissions in enterprise internal web applications.",
    layer: "article",
    keywords: ["RBAC", "permission", "role", "approval workflow", "audit log"],
    relatedTopicIds: ["audit-log", "approval-workflow", "permission-matrix"],
    Content: EnRbacContent,
  },
] as const satisfies readonly TopicEntry[];

export function getTopicsByLocale(locale: Locale): readonly TopicEntry[] {
  return topics.filter((topic) => topic.locale === locale);
}

export function getTopicsByLocaleAndArea(
  locale: Locale,
  area: AtlasArea,
): readonly TopicEntry[] {
  return topics.filter(
    (topic) => topic.locale === locale && topic.area === area,
  );
}

export function getTopicByRoute(
  locale: Locale,
  area: string | undefined,
  slug: string | undefined,
): TopicEntry | undefined {
  return topics.find(
    (topic) =>
      topic.locale === locale && topic.area === area && topic.slug === slug,
  );
}
