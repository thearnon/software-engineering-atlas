import type { Locale } from "@/lib/locales";

export type AtlasArea =
  | "process"
  | "requirement"
  | "architecture"
  | "code-design"
  | "database"
  | "testing"
  | "deployment"
  | "security"
  | "ux-ui";

export interface AreaEntry {
  readonly id: AtlasArea;
  readonly label: string;
  readonly description: string;
  readonly lifecyclePosition: string;
  readonly relatedAreas: readonly AtlasArea[];
}

interface AreaDefinition {
  readonly id: AtlasArea;
  readonly relatedAreas: readonly AtlasArea[];
  readonly locales: Record<
    Locale,
    {
      readonly label: string;
      readonly description: string;
      readonly lifecyclePosition: string;
    }
  >;
}

const areaDefinitions = [
  {
    id: "process",
    relatedAreas: ["requirement", "testing", "deployment"],
    locales: {
      th: {
        label: "กระบวนการ",
        description:
          "วิธีจัดงาน software ตั้งแต่ idea, planning, delivery, review, และ continuous improvement.",
        lifecyclePosition:
          "ครอบคลุมทั้ง SDLC และช่วยเชื่อม business goal เข้ากับการส่งมอบ software.",
      },
      en: {
        label: "Process",
        description:
          "How software work moves from ideas and planning to delivery, review, and improvement.",
        lifecyclePosition:
          "Spans the SDLC and connects business goals to software delivery.",
      },
    },
  },
  {
    id: "requirement",
    relatedAreas: ["process", "ux-ui", "testing"],
    locales: {
      th: {
        label: "Requirement",
        description:
          "การแปลง business need เป็น scope, user story, acceptance criteria, และ workflow ที่ตรวจสอบได้.",
        lifecyclePosition:
          "อยู่ช่วง discovery และ analysis ก่อนออกแบบ solution structure.",
      },
      en: {
        label: "Requirement",
        description:
          "Turning business needs into scope, user stories, acceptance criteria, and reviewable workflows.",
        lifecyclePosition:
          "Lives in discovery and analysis before solution structure is designed.",
      },
    },
  },
  {
    id: "architecture",
    relatedAreas: ["requirement", "database", "security", "deployment"],
    locales: {
      th: {
        label: "สถาปัตยกรรม",
        description:
          "การจัดโครงสร้างระบบ ขอบเขต responsibility และ trade-off สำหรับ enterprise web applications.",
        lifecyclePosition:
          "แปลง requirement เป็น solution structure ก่อนลงรายละเอียด code, data, และ deployment.",
      },
      en: {
        label: "Architecture",
        description:
          "System structure, responsibility boundaries, and trade-offs for enterprise web applications.",
        lifecyclePosition:
          "Turns requirements into solution structure before code, data, and deployment details.",
      },
    },
  },
  {
    id: "code-design",
    relatedAreas: ["architecture", "testing", "database"],
    locales: {
      th: {
        label: "Code Design",
        description:
          "การออกแบบ module, type, function, component, และ boundary ให้แก้ไขได้ในระยะยาว.",
        lifecyclePosition:
          "อยู่ช่วง implementation และ refactoring หลัง architecture กำหนดทิศทางหลักแล้ว.",
      },
      en: {
        label: "Code Design",
        description:
          "Designing modules, types, functions, components, and boundaries for long-term change.",
        lifecyclePosition:
          "Lives in implementation and refactoring after architecture sets the main direction.",
      },
    },
  },
  {
    id: "database",
    relatedAreas: ["requirement", "architecture", "deployment"],
    locales: {
      th: {
        label: "ฐานข้อมูล",
        description:
          "schema, transaction, query, index, migration, และ data integrity สำหรับระบบธุรกิจ.",
        lifecyclePosition:
          "เริ่มจาก data requirement และต่อเนื่องไปถึง performance กับ operations.",
      },
      en: {
        label: "Database",
        description:
          "Schema, transactions, queries, indexes, migrations, and data integrity for business systems.",
        lifecyclePosition:
          "Starts from data requirements and continues into performance and operations.",
      },
    },
  },
  {
    id: "testing",
    relatedAreas: ["requirement", "code-design", "deployment"],
    locales: {
      th: {
        label: "Testing",
        description:
          "unit, integration, e2e, contract, และ acceptance tests ที่ช่วยป้องกัน regression.",
        lifecyclePosition:
          "ผูกกับ acceptance criteria ระหว่าง implementation และก่อน release.",
      },
      en: {
        label: "Testing",
        description:
          "Unit, integration, e2e, contract, and acceptance tests that prevent regressions.",
        lifecyclePosition:
          "Connects to acceptance criteria during implementation and before release.",
      },
    },
  },
  {
    id: "deployment",
    relatedAreas: ["architecture", "database", "testing", "security"],
    locales: {
      th: {
        label: "Deployment",
        description:
          "CI/CD, release, environment, observability, rollback, และ operation ของระบบจริง.",
        lifecyclePosition:
          "อยู่ช่วงส่งมอบและดูแล production หลัง software พร้อมใช้งาน.",
      },
      en: {
        label: "Deployment",
        description:
          "CI/CD, releases, environments, observability, rollbacks, and production operations.",
        lifecyclePosition:
          "Covers delivery and production operations after software is ready to run.",
      },
    },
  },
  {
    id: "security",
    relatedAreas: ["architecture", "deployment", "ux-ui"],
    locales: {
      th: {
        label: "Security",
        description:
          "authentication, authorization, audit, threat modeling, และ security review สำหรับระบบองค์กร.",
        lifecyclePosition:
          "เป็น cross-cutting concern ตั้งแต่ requirement จนถึง operations.",
      },
      en: {
        label: "Security",
        description:
          "Authentication, authorization, audits, threat modeling, and security reviews for enterprise systems.",
        lifecyclePosition:
          "A cross-cutting concern from requirements through operations.",
      },
    },
  },
  {
    id: "ux-ui",
    relatedAreas: ["requirement", "security", "testing"],
    locales: {
      th: {
        label: "UX/UI",
        description:
          "workflow screen, dashboard, form, permission state, และ interaction สำหรับ internal tools.",
        lifecyclePosition:
          "แปลง workflow และ business rule ให้เป็นหน้าจอที่คนใช้ทำงานได้จริง.",
      },
      en: {
        label: "UX/UI",
        description:
          "Workflow screens, dashboards, forms, permission states, and interactions for internal tools.",
        lifecyclePosition:
          "Turns workflows and business rules into screens people can actually use.",
      },
    },
  },
] as const satisfies readonly AreaDefinition[];

export function getAreasByLocale(locale: Locale): readonly AreaEntry[] {
  return areaDefinitions.map((area) => ({
    id: area.id,
    relatedAreas: area.relatedAreas,
    ...area.locales[locale],
  }));
}

export function getAreaById(
  areaId: string | undefined,
  locale: Locale,
): AreaEntry | undefined {
  const area = areaDefinitions.find((entry) => entry.id === areaId);

  if (area === undefined) {
    return undefined;
  }

  return {
    id: area.id,
    relatedAreas: area.relatedAreas,
    ...area.locales[locale],
  };
}
