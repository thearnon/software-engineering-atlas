import { expect, test } from "@playwright/test";

test("navigates Thai and English SEA routes", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/th$/);
  await expect(page.getByRole("heading", { name: /Software Engineering Atlas/ })).toBeVisible();

  await page.getByRole("link", { name: "RBAC คืออะไร", exact: true }).click();
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
