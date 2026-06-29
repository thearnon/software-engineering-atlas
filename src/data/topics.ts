import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

import EnPermissionMatrixContent from "@/content/en/architecture/permission-matrix.mdx";
import EnRbacContent from "@/content/en/architecture/rbac.mdx";
import EnApprovalWorkflowContent from "@/content/en/process/approval-workflow.mdx";
import EnAuditLogContent from "@/content/en/security/audit-log.mdx";
import ThPermissionMatrixContent from "@/content/th/architecture/permission-matrix.mdx";
import ThRbacContent from "@/content/th/architecture/rbac.mdx";
import ThApprovalWorkflowContent from "@/content/th/process/approval-workflow.mdx";
import ThAuditLogContent from "@/content/th/security/audit-log.mdx";
import type { AtlasArea } from "@/data/areas";
import type { Locale } from "@/lib/locales";

export type { AtlasArea } from "@/data/areas";

export type ContentLayer = "article" | "reference" | "viewer";

export type ViewerId = "permission-matrix";

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
  readonly viewer?: ViewerId;
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
    viewer: "permission-matrix",
    Content: ThRbacContent,
  },
  {
    id: "permission-matrix",
    locale: "th",
    area: "architecture",
    slug: "permission-matrix",
    title: "Permission Matrix คืออะไร",
    summary:
      "ตารางตรวจสอบว่า role แต่ละตัวทำ action ไหนได้ใน workflow และระบบองค์กร.",
    layer: "reference",
    keywords: [
      "permission matrix",
      "สิทธิ์",
      "role",
      "action",
      "permission inventory",
    ],
    relatedTopicIds: ["rbac", "approval-workflow", "audit-log"],
    viewer: "permission-matrix",
    Content: ThPermissionMatrixContent,
  },
  {
    id: "approval-workflow",
    locale: "th",
    area: "process",
    slug: "approval-workflow",
    title: "Approval Workflow คืออะไร",
    summary:
      "ลำดับการตรวจสอบและอนุมัติคำขอในระบบธุรกิจ เช่น ขอสิทธิ์ ขอซื้อ หรือแก้ configuration.",
    layer: "article",
    keywords: ["approval workflow", "อนุมัติ", "request", "status", "workflow"],
    relatedTopicIds: ["rbac", "permission-matrix", "audit-log"],
    Content: ThApprovalWorkflowContent,
  },
  {
    id: "audit-log",
    locale: "th",
    area: "security",
    slug: "audit-log",
    title: "Audit Log คืออะไร",
    summary:
      "บันทึกเหตุการณ์สำคัญเพื่อให้ตรวจสอบย้อนหลังได้ว่าใครทำอะไร เมื่อไร และกับข้อมูลใด.",
    layer: "article",
    keywords: [
      "audit log",
      "ตรวจสอบย้อนหลัง",
      "security review",
      "traceability",
      "incident",
    ],
    relatedTopicIds: ["rbac", "approval-workflow", "permission-matrix"],
    Content: ThAuditLogContent,
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
    viewer: "permission-matrix",
    Content: EnRbacContent,
  },
  {
    id: "permission-matrix",
    locale: "en",
    area: "architecture",
    slug: "permission-matrix",
    title: "Permission Matrix",
    summary:
      "A role-by-action table for reviewing access rules in enterprise workflows.",
    layer: "reference",
    keywords: [
      "permission matrix",
      "permission inventory",
      "role",
      "action",
      "access review",
    ],
    relatedTopicIds: ["rbac", "approval-workflow", "audit-log"],
    viewer: "permission-matrix",
    Content: EnPermissionMatrixContent,
  },
  {
    id: "approval-workflow",
    locale: "en",
    area: "process",
    slug: "approval-workflow",
    title: "Approval Workflow",
    summary:
      "The review and approval path for requests such as access, purchasing, or configuration changes.",
    layer: "article",
    keywords: ["approval workflow", "approval", "request", "status", "workflow"],
    relatedTopicIds: ["rbac", "permission-matrix", "audit-log"],
    Content: EnApprovalWorkflowContent,
  },
  {
    id: "audit-log",
    locale: "en",
    area: "security",
    slug: "audit-log",
    title: "Audit Log",
    summary:
      "A record of important system events used to trace who did what, when, and in which context.",
    layer: "article",
    keywords: [
      "audit log",
      "traceability",
      "security review",
      "incident",
      "compliance",
    ],
    relatedTopicIds: ["rbac", "approval-workflow", "permission-matrix"],
    Content: EnAuditLogContent,
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

export function getRelatedTopics(
  locale: Locale,
  relatedTopicIds: readonly string[],
): readonly TopicEntry[] {
  const related: TopicEntry[] = [];

  for (const id of relatedTopicIds) {
    const match = topics.find(
      (topic) => topic.locale === locale && topic.id === id,
    );

    if (match !== undefined) {
      related.push(match);
    }
  }

  return related;
}

export function hasTranslation(id: string, locale: Locale): boolean {
  const target: Locale = locale === "th" ? "en" : "th";
  return topics.some((topic) => topic.id === id && topic.locale === target);
}
