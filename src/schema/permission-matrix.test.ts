import { permissionMatrixSchema } from "./permission-matrix";

describe("permission matrix schema", () => {
  it("validates a role and permission matrix", () => {
    const parsed = permissionMatrixSchema.parse({
      title: "RBAC permission matrix",
      roles: ["Requester", "Approver"],
      actions: ["create-request", "approve-request"],
      cells: [
        { role: "Requester", action: "create-request", access: "allow" },
        { role: "Approver", action: "approve-request", access: "allow" },
      ],
    });

    expect(parsed.roles).toEqual(["Requester", "Approver"]);
  });

  it("rejects unsupported access values", () => {
    expect(() =>
      permissionMatrixSchema.parse({
        title: "Broken matrix",
        roles: ["Requester"],
        actions: ["create-request"],
        cells: [
          { role: "Requester", action: "create-request", access: "maybe" },
        ],
      }),
    ).toThrow();
  });
});
