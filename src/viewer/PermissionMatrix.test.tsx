import { render, screen } from "@testing-library/react";

import { rbacPermissions } from "@/data/rbac-permissions";
import { PermissionMatrix } from "./PermissionMatrix";

describe("PermissionMatrix", () => {
  it("renders validated roles, actions, and cell notes as an accessible table", () => {
    render(<PermissionMatrix data={rbacPermissions} />);

    expect(
      screen.getByRole("table", { name: "Credit limit RBAC permission matrix" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Requester")).toBeInTheDocument();
    expect(screen.getByText("Approve within scope")).toBeInTheDocument();
    expect(screen.getAllByText("Allow")).not.toHaveLength(0);
    expect(
      screen.getByText(
        "Assigned requests only; must match department, amount limit, and non-self-approval rules.",
      ),
    ).toBeInTheDocument();
  });
});
