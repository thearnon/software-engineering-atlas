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

    expect(thaiTopics).toHaveLength(1);
    expect(thaiTopics[0]?.locale).toBe("th");
  });

  it("lists only topics for the requested locale and area", () => {
    const architectureTopics = getTopicsByLocaleAndArea("th", "architecture");
    const testingTopics = getTopicsByLocaleAndArea("th", "testing");

    expect(architectureTopics.map((topic) => topic.slug)).toEqual(["rbac"]);
    expect(testingTopics).toEqual([]);
  });
});
