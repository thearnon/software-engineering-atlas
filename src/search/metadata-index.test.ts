import { searchTopics } from "./metadata-index";

describe("metadata search index", () => {
  it("finds topics by Thai metadata", () => {
    const results = searchTopics("สิทธิ์", "th");

    expect(results[0]?.id).toBe("rbac");
  });

  it("finds topics by English metadata", () => {
    const results = searchTopics("permission", "en");

    expect(results[0]?.id).toBe("rbac");
  });

  it("returns no results for blank queries", () => {
    expect(searchTopics("   ", "th")).toEqual([]);
  });
});
