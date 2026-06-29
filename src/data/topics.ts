import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

import EnPermissionMatrixContent from "@/content/en/architecture/permission-matrix.mdx";
import EnRbacContent from "@/content/en/architecture/rbac.mdx";
import EnServiceLayerContent from "@/content/en/code-design/service-layer.mdx";
import EnDatabaseIndexingContent from "@/content/en/database/database-indexing.mdx";
import EnDeploymentPipelineContent from "@/content/en/deployment/deployment-pipeline.mdx";
import EnApprovalWorkflowContent from "@/content/en/process/approval-workflow.mdx";
import EnUserStoryContent from "@/content/en/requirement/user-story.mdx";
import EnAuditLogContent from "@/content/en/security/audit-log.mdx";
import EnAcceptanceTestingContent from "@/content/en/testing/acceptance-testing.mdx";
import EnWorkflowScreenDesignContent from "@/content/en/ux-ui/workflow-screen-design.mdx";
import ThPermissionMatrixContent from "@/content/th/architecture/permission-matrix.mdx";
import ThRbacContent from "@/content/th/architecture/rbac.mdx";
import ThServiceLayerContent from "@/content/th/code-design/service-layer.mdx";
import ThDatabaseIndexingContent from "@/content/th/database/database-indexing.mdx";
import ThDeploymentPipelineContent from "@/content/th/deployment/deployment-pipeline.mdx";
import ThApprovalWorkflowContent from "@/content/th/process/approval-workflow.mdx";
import ThUserStoryContent from "@/content/th/requirement/user-story.mdx";
import ThAuditLogContent from "@/content/th/security/audit-log.mdx";
import ThAcceptanceTestingContent from "@/content/th/testing/acceptance-testing.mdx";
import ThWorkflowScreenDesignContent from "@/content/th/ux-ui/workflow-screen-design.mdx";
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
    id: "user-story",
    locale: "th",
    area: "requirement",
    slug: "user-story",
    title: "User Story คืออะไร",
    summary:
      "วิธีเล่า requirement จากมุมผู้ใช้ เพื่อเชื่อม business need ไปสู่ workflow, acceptance criteria และ test.",
    layer: "article",
    keywords: [
      "user story",
      "requirement",
      "acceptance criteria",
      "workflow",
      "scope",
    ],
    relatedTopicIds: [
      "approval-workflow",
      "acceptance-testing",
      "workflow-screen-design",
      "database-indexing",
    ],
    Content: ThUserStoryContent,
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
    relatedTopicIds: [
      "user-story",
      "rbac",
      "permission-matrix",
      "acceptance-testing",
      "workflow-screen-design",
      "audit-log",
    ],
    Content: ThApprovalWorkflowContent,
  },
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
    relatedTopicIds: [
      "approval-workflow",
      "permission-matrix",
      "audit-log",
      "service-layer",
      "workflow-screen-design",
    ],
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
    relatedTopicIds: [
      "rbac",
      "approval-workflow",
      "acceptance-testing",
      "audit-log",
    ],
    viewer: "permission-matrix",
    Content: ThPermissionMatrixContent,
  },
  {
    id: "service-layer",
    locale: "th",
    area: "code-design",
    slug: "service-layer",
    title: "Service Layer คืออะไร",
    summary:
      "ชั้น application logic ที่รับ use case จาก UI หรือ API แล้วประสาน domain rule, permission, transaction และ integration.",
    layer: "article",
    keywords: [
      "service layer",
      "application service",
      "use case",
      "transaction",
      "code design",
    ],
    relatedTopicIds: [
      "user-story",
      "rbac",
      "database-indexing",
      "acceptance-testing",
      "audit-log",
    ],
    Content: ThServiceLayerContent,
  },
  {
    id: "database-indexing",
    locale: "th",
    area: "database",
    slug: "database-indexing",
    title: "Database Indexing คืออะไร",
    summary:
      "การออกแบบ index เพื่อให้ query สำคัญของระบบธุรกิจเร็วขึ้น โดยยังคุม trade-off ด้าน write และ migration.",
    layer: "article",
    keywords: [
      "database indexing",
      "index",
      "query performance",
      "schema",
      "migration",
    ],
    relatedTopicIds: [
      "user-story",
      "service-layer",
      "acceptance-testing",
      "deployment-pipeline",
    ],
    Content: ThDatabaseIndexingContent,
  },
  {
    id: "acceptance-testing",
    locale: "th",
    area: "testing",
    slug: "acceptance-testing",
    title: "Acceptance Testing คืออะไร",
    summary:
      "การทดสอบจาก acceptance criteria เพื่อยืนยันว่า workflow สำคัญทำงานตรงกับ business rule.",
    layer: "article",
    keywords: [
      "acceptance testing",
      "acceptance criteria",
      "testing",
      "workflow",
      "regression",
    ],
    relatedTopicIds: [
      "user-story",
      "approval-workflow",
      "permission-matrix",
      "deployment-pipeline",
    ],
    Content: ThAcceptanceTestingContent,
  },
  {
    id: "deployment-pipeline",
    locale: "th",
    area: "deployment",
    slug: "deployment-pipeline",
    title: "Deployment Pipeline คืออะไร",
    summary:
      "เส้นทางจาก code change ไปสู่ production ผ่าน build, test, release, rollback และ observability gate.",
    layer: "article",
    keywords: [
      "deployment pipeline",
      "CI/CD",
      "release",
      "rollback",
      "observability",
    ],
    relatedTopicIds: [
      "acceptance-testing",
      "database-indexing",
      "service-layer",
      "audit-log",
    ],
    Content: ThDeploymentPipelineContent,
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
    relatedTopicIds: [
      "rbac",
      "approval-workflow",
      "permission-matrix",
      "deployment-pipeline",
    ],
    Content: ThAuditLogContent,
  },
  {
    id: "workflow-screen-design",
    locale: "th",
    area: "ux-ui",
    slug: "workflow-screen-design",
    title: "Workflow Screen Design คืออะไร",
    summary:
      "การออกแบบหน้าจอให้ผู้ใช้เห็นสถานะ งานถัดไป สิทธิ์ที่ทำได้ และเหตุผลเมื่อ action ถูกจำกัด.",
    layer: "article",
    keywords: [
      "workflow screen",
      "UX",
      "UI",
      "permission state",
      "internal tools",
    ],
    relatedTopicIds: [
      "user-story",
      "approval-workflow",
      "rbac",
      "acceptance-testing",
      "audit-log",
    ],
    Content: ThWorkflowScreenDesignContent,
  },
  {
    id: "user-story",
    locale: "en",
    area: "requirement",
    slug: "user-story",
    title: "User Story",
    summary:
      "A requirement format that connects user intent to workflow, acceptance criteria, and tests.",
    layer: "article",
    keywords: [
      "user story",
      "requirement",
      "acceptance criteria",
      "workflow",
      "scope",
    ],
    relatedTopicIds: [
      "approval-workflow",
      "acceptance-testing",
      "workflow-screen-design",
      "database-indexing",
    ],
    Content: EnUserStoryContent,
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
    relatedTopicIds: [
      "user-story",
      "rbac",
      "permission-matrix",
      "acceptance-testing",
      "workflow-screen-design",
      "audit-log",
    ],
    Content: EnApprovalWorkflowContent,
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
    relatedTopicIds: [
      "approval-workflow",
      "permission-matrix",
      "audit-log",
      "service-layer",
      "workflow-screen-design",
    ],
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
    relatedTopicIds: [
      "rbac",
      "approval-workflow",
      "acceptance-testing",
      "audit-log",
    ],
    viewer: "permission-matrix",
    Content: EnPermissionMatrixContent,
  },
  {
    id: "service-layer",
    locale: "en",
    area: "code-design",
    slug: "service-layer",
    title: "Service Layer",
    summary:
      "An application logic boundary that coordinates use cases, domain rules, permissions, transactions, and integrations.",
    layer: "article",
    keywords: [
      "service layer",
      "application service",
      "use case",
      "transaction",
      "code design",
    ],
    relatedTopicIds: [
      "user-story",
      "rbac",
      "database-indexing",
      "acceptance-testing",
      "audit-log",
    ],
    Content: EnServiceLayerContent,
  },
  {
    id: "database-indexing",
    locale: "en",
    area: "database",
    slug: "database-indexing",
    title: "Database Indexing",
    summary:
      "Designing indexes for important business queries while managing write, storage, and migration trade-offs.",
    layer: "article",
    keywords: [
      "database indexing",
      "index",
      "query performance",
      "schema",
      "migration",
    ],
    relatedTopicIds: [
      "user-story",
      "service-layer",
      "acceptance-testing",
      "deployment-pipeline",
    ],
    Content: EnDatabaseIndexingContent,
  },
  {
    id: "acceptance-testing",
    locale: "en",
    area: "testing",
    slug: "acceptance-testing",
    title: "Acceptance Testing",
    summary:
      "Testing from acceptance criteria to confirm that important workflows match business rules.",
    layer: "article",
    keywords: [
      "acceptance testing",
      "acceptance criteria",
      "testing",
      "workflow",
      "regression",
    ],
    relatedTopicIds: [
      "user-story",
      "approval-workflow",
      "permission-matrix",
      "deployment-pipeline",
    ],
    Content: EnAcceptanceTestingContent,
  },
  {
    id: "deployment-pipeline",
    locale: "en",
    area: "deployment",
    slug: "deployment-pipeline",
    title: "Deployment Pipeline",
    summary:
      "The path from code change to production through build, test, release, rollback, and observability gates.",
    layer: "article",
    keywords: [
      "deployment pipeline",
      "CI/CD",
      "release",
      "rollback",
      "observability",
    ],
    relatedTopicIds: [
      "acceptance-testing",
      "database-indexing",
      "service-layer",
      "audit-log",
    ],
    Content: EnDeploymentPipelineContent,
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
    relatedTopicIds: [
      "rbac",
      "approval-workflow",
      "permission-matrix",
      "deployment-pipeline",
    ],
    Content: EnAuditLogContent,
  },
  {
    id: "workflow-screen-design",
    locale: "en",
    area: "ux-ui",
    slug: "workflow-screen-design",
    title: "Workflow Screen Design",
    summary:
      "Designing screens that show status, next actions, allowed permissions, and reasons when actions are restricted.",
    layer: "article",
    keywords: [
      "workflow screen",
      "UX",
      "UI",
      "permission state",
      "internal tools",
    ],
    relatedTopicIds: [
      "user-story",
      "approval-workflow",
      "rbac",
      "acceptance-testing",
      "audit-log",
    ],
    Content: EnWorkflowScreenDesignContent,
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

export function getTopicNeighbors(
  locale: Locale,
  area: string | undefined,
  slug: string | undefined,
): { prev?: TopicEntry; next?: TopicEntry } {
  if (area === undefined || slug === undefined) {
    return {};
  }

  const areaTopics = topics.filter(
    (topic) => topic.locale === locale && topic.area === area,
  );
  const index = areaTopics.findIndex((topic) => topic.slug === slug);

  if (index === -1) {
    return {};
  }

  return { prev: areaTopics[index - 1], next: areaTopics[index + 1] };
}
