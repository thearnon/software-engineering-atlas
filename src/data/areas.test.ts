import { getAreaById, getAreasByLocale } from "./areas";

describe("area catalog", () => {
  it("defines the nine SEA atlas areas for Thai navigation", () => {
    const thaiAreas = getAreasByLocale("th");

    expect(thaiAreas).toHaveLength(9);
    expect(thaiAreas.map((area) => area.id)).toContain("architecture");
    expect(thaiAreas[0]?.label).toBe("กระบวนการ");
  });

  it("resolves localized area metadata by id", () => {
    const thaiArea = getAreaById("architecture", "th");
    const englishArea = getAreaById("architecture", "en");

    expect(thaiArea?.label).toBe("สถาปัตยกรรม");
    expect(thaiArea?.lifecyclePosition).toContain("solution structure");
    expect(thaiArea?.relatedAreas).toContain("security");
    expect(englishArea?.label).toBe("Architecture");
  });

  it("returns undefined for unknown area ids", () => {
    expect(getAreaById("unknown-area", "th")).toBeUndefined();
  });
});
