import { defaultLocale, isLocale, locales, otherLocale } from "./locales";

describe("locale helpers", () => {
  it("defines Thai as the default locale and English as alternate", () => {
    expect(defaultLocale).toBe("th");
    expect(locales).toEqual(["th", "en"]);
  });

  it("recognizes supported locales only", () => {
    expect(isLocale("th")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("jp")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it("returns the alternate locale for the language switcher", () => {
    expect(otherLocale("th")).toBe("en");
    expect(otherLocale("en")).toBe("th");
  });
});
