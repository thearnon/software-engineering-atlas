import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("app icon metadata", () => {
  it("uses the normal SEA icon for browser and touch icons", () => {
    const indexHtml = readFileSync(resolve("index.html"), "utf8");

    expect(indexHtml).toContain(
      '<link rel="icon" type="image/png" href="/src/assets/images/sea-icon.png" />',
    );
    expect(indexHtml).toContain(
      '<link rel="apple-touch-icon" href="/src/assets/images/sea-icon.png" />',
    );
  });
});
