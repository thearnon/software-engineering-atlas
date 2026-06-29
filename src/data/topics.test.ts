import { getAreasByLocale } from "./areas";
import {
  getTopicByRoute,
  getTopicNeighbors,
  getTopicsByLocale,
  getTopicsByLocaleAndArea,
} from "./topics";

const expectedAreaTopics = {
  requirement: ["user-story"],
  process: ["approval-workflow"],
  architecture: ["rbac", "permission-matrix"],
  "code-design": ["service-layer"],
  database: ["database-indexing"],
  testing: ["acceptance-testing"],
  deployment: ["deployment-pipeline"],
  security: ["audit-log"],
  "ux-ui": ["workflow-screen-design"],
} as const;

describe("topic catalog", () => {
  it("resolves the Thai RBAC topic by route", () => {
    const topic = getTopicByRoute("th", "architecture", "rbac");

    expect(topic?.title).toBe("RBAC คืออะไร");
    expect(topic?.locale).toBe("th");
    expect(topic?.relatedTopicIds).toContain("audit-log");
  });

  it("resolves the English RBAC topic by the same area and slug", () => {
    const topic = getTopicByRoute("en", "architecture", "rbac");

    expect(topic?.title).toBe("Role-Based Access Control");
    expect(topic?.locale).toBe("en");
  });

  it("keeps topic identity shared across locales", () => {
    const thaiTopic = getTopicByRoute("th", "architecture", "rbac");
    const englishTopic = getTopicByRoute("en", "architecture", "rbac");

    expect(thaiTopic?.id).toBe("rbac");
    expect(englishTopic?.id).toBe("rbac");
  });

  it("lists only topics for the requested locale", () => {
    const thaiTopics = getTopicsByLocale("th");

    expect(thaiTopics).toHaveLength(10);
    expect(thaiTopics[0]?.locale).toBe("th");
  });

  it("covers every Atlas Area with at least one topic in each locale", () => {
    for (const locale of ["th", "en"] as const) {
      const areas = getAreasByLocale(locale);

      for (const area of areas) {
        expect(getTopicsByLocaleAndArea(locale, area.id).length).toBeGreaterThan(
          0,
        );
      }
    }
  });

  it("lists only topics for the requested locale and area", () => {
    for (const [area, slugs] of Object.entries(expectedAreaTopics)) {
      expect(
        getTopicsByLocaleAndArea("th", area as keyof typeof expectedAreaTopics).map(
          (topic) => topic.slug,
        ),
      ).toEqual(slugs);
    }
  });

  it("resolves every related topic id in each locale", () => {
    for (const locale of ["th", "en"] as const) {
      const localeTopics = getTopicsByLocale(locale);
      const localeTopicIds = new Set(localeTopics.map((topic) => topic.id));

      for (const topic of localeTopics) {
        for (const relatedTopicId of topic.relatedTopicIds) {
          expect(localeTopicIds.has(relatedTopicId)).toBe(true);
        }
      }
    }
  });

  it("keeps seeded topic ids shared across Thai and English", () => {
    const thaiIds = getTopicsByLocale("th").map((topic) => topic.id);
    const englishIds = getTopicsByLocale("en").map((topic) => topic.id);

    expect(englishIds).toEqual(thaiIds);
  });

  it("derives prev/next neighbors from area order", () => {
    const first = getTopicNeighbors("th", "architecture", "rbac");
    const second = getTopicNeighbors("th", "architecture", "permission-matrix");

    expect(first.prev).toBeUndefined();
    expect(first.next?.slug).toBe("permission-matrix");
    expect(second.prev?.slug).toBe("rbac");
    expect(second.next).toBeUndefined();
  });

  it("returns no neighbors for unknown or partial routes", () => {
    expect(getTopicNeighbors("th", "architecture", "nope")).toEqual({});
    expect(getTopicNeighbors("th", undefined, undefined)).toEqual({});
  });
});
