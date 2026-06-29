import { expect, test } from "@playwright/test";

test("navigates Thai and English SEA routes", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/th$/);
  await expect(
    page.getByRole("heading", { name: /Software Engineering Atlas/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Software development lifecycle map" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "สถาปัตยกรรม" }).first().click();
  await expect(page).toHaveURL(/\/th\/architecture$/);
  await expect(
    page.getByRole("heading", { name: "สถาปัตยกรรม" }),
  ).toBeVisible();

  await page
    .getByRole("main")
    .getByRole("link", { name: /RBAC คืออะไร/ })
    .click();
  await expect(page).toHaveURL(/\/th\/architecture\/rbac$/);
  await expect(page.getByRole("heading", { name: "RBAC คืออะไร" })).toBeVisible();
  await expect(
    page.getByRole("table", { name: "RBAC permission matrix" }),
  ).toBeVisible();

  await page
    .getByLabel("Primary navigation")
    .getByRole("link", { name: "EN" })
    .click();
  await expect(page).toHaveURL(/\/en\/architecture\/rbac$/);
  await expect(
    page.getByRole("heading", { name: "Role-Based Access Control" }),
  ).toBeVisible();
});

test("sidebar exposes locale-aware area groups", async ({ page }) => {
  await page.goto("/en/architecture/rbac");

  const sidebar = page.getByLabel("Topic tree");

  await expect(sidebar.getByRole("link", { name: "Architecture" })).toHaveAttribute(
    "href",
    "/en/architecture",
  );
  await expect(
    sidebar.getByRole("link", { name: "Role-Based Access Control" }),
  ).toBeVisible();
});
