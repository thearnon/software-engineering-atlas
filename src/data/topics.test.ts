import {
  getTopicByRoute,
  getTopicsByLocale,
  getTopicsByLocaleAndArea,
} from "./topics";

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

    expect(thaiTopics).toHaveLength(4);
    expect(thaiTopics[0]?.locale).toBe("th");
  });

  it("lists only topics for the requested locale and area", () => {
    const architectureTopics = getTopicsByLocaleAndArea("th", "architecture");
    const processTopics = getTopicsByLocaleAndArea("th", "process");
    const securityTopics = getTopicsByLocaleAndArea("th", "security");
    const testingTopics = getTopicsByLocaleAndArea("th", "testing");

    expect(architectureTopics.map((topic) => topic.slug)).toEqual([
      "rbac",
      "permission-matrix",
    ]);
    expect(processTopics.map((topic) => topic.slug)).toEqual([
      "approval-workflow",
    ]);
    expect(securityTopics.map((topic) => topic.slug)).toEqual(["audit-log"]);
    expect(testingTopics).toEqual([]);
  });

  it("resolves the initial RBAC related topics as real routes", () => {
    expect(getTopicByRoute("th", "security", "audit-log")?.id).toBe(
      "audit-log",
    );
    expect(getTopicByRoute("th", "process", "approval-workflow")?.id).toBe(
      "approval-workflow",
    );
    expect(
      getTopicByRoute("th", "architecture", "permission-matrix")?.id,
    ).toBe("permission-matrix");
  });

  it("keeps seeded related topics shared across Thai and English", () => {
    const thaiIds = getTopicsByLocale("th").map((topic) => topic.id);
    const englishIds = getTopicsByLocale("en").map((topic) => topic.id);

    expect(englishIds).toEqual(thaiIds);
  });
});
