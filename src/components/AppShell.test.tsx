import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";

import { AppShell } from "@/components/AppShell";

function renderShell() {
  const router = createMemoryRouter(
    [
      {
        path: "/:locale",
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <div>Home content</div>,
          },
        ],
      },
    ],
    {
      initialEntries: ["/th"],
    },
  );

  return render(<RouterProvider router={router} />);
}

describe("AppShell", () => {
  it("uses the transparent SEA icon as the global brand mark", () => {
    renderShell();

    const homeLink = screen.getByRole("link", { name: "SEA home" });
    const brandIcon = screen.getByRole("img", {
      name: "Software Engineering Atlas icon",
    });

    expect(homeLink).toContainElement(brandIcon);
    expect(brandIcon).toHaveAttribute(
      "src",
      expect.stringContaining("sea-icon-transparent.png"),
    );
  });
});
