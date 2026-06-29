import { render, screen } from "@testing-library/react";

import { rbacPermissions } from "@/data/rbac-permissions";
import { PermissionMatrix } from "./PermissionMatrix";

describe("PermissionMatrix", () => {
  it("renders validated roles and actions as an accessible table", () => {
    render(<PermissionMatrix data={rbacPermissions} />);

    expect(
      screen.getByRole("table", { name: "RBAC permission matrix" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Requester")).toBeInTheDocument();
    expect(screen.getByText("approve-request")).toBeInTheDocument();
    expect(screen.getAllByText("Allow")).not.toHaveLength(0);
  });
});
