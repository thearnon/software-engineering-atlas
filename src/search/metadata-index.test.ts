import { searchTopics } from "./metadata-index";

function resultIds(query: string, locale: "th" | "en"): string[] {
  return searchTopics(query, locale).map((result) => result.id);
}

describe("metadata search index", () => {
  it("finds topics by Thai metadata", () => {
    expect(resultIds("สิทธิ์", "th")).toContain("rbac");
  });

  it("finds topics by English metadata", () => {
    expect(resultIds("permission", "en")).toContain("rbac");
  });

  it("finds seeded topics across the SEA lifecycle", () => {
    expect(resultIds("user story", "th")).toContain("user-story");
    expect(resultIds("service layer", "en")).toContain("service-layer");
    expect(resultIds("database indexing", "en")).toContain(
      "database-indexing",
    );
    expect(resultIds("rollback", "th")).toContain("deployment-pipeline");
  });

  it("finds the seeded RBAC-related Thai topics", () => {
    expect(resultIds("อนุมัติ", "th")).toContain("approval-workflow");
    expect(resultIds("ตรวจสอบย้อนหลัง", "th")).toContain("audit-log");
  });

  it("finds the seeded RBAC-related English topics", () => {
    expect(resultIds("permission inventory", "en")).toContain(
      "permission-matrix",
    );
  });

  it("returns no results for blank queries", () => {
    expect(searchTopics("   ", "th")).toEqual([]);
  });
});
