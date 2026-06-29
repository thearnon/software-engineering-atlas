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

  it("finds the seeded RBAC-related Thai topics", () => {
    expect(searchTopics("อนุมัติ", "th")[0]?.id).toBe("approval-workflow");
    expect(searchTopics("ตรวจสอบย้อนหลัง", "th")[0]?.id).toBe("audit-log");
  });

  it("finds the seeded RBAC-related English topics", () => {
    expect(searchTopics("permission inventory", "en")[0]?.id).toBe(
      "permission-matrix",
    );
  });

  it("returns no results for blank queries", () => {
    expect(searchTopics("   ", "th")).toEqual([]);
  });
});
