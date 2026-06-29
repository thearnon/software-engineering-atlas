import { slugify } from "./slugify";

describe("slugify", () => {
  it("slugifies English headings", () => {
    expect(slugify("Things to watch", 0)).toBe("things-to-watch");
  });

  it("preserves Thai characters", () => {
    expect(slugify("สิ่งที่ควรระวัง", 0)).toBe("สิ่งที่ควรระวัง");
  });

  it("drops punctuation but keeps words", () => {
    expect(slugify("RBAC: what & why", 1)).toBe("rbac-what-why");
  });

  it("falls back to a positional id when nothing usable remains", () => {
    expect(slugify("!!!", 3)).toBe("section-3");
  });
});
