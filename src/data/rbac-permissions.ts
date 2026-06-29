import { parsePermissionMatrix } from "@/schema/permission-matrix";

export const rbacPermissions = parsePermissionMatrix({
  title: "RBAC permission matrix",
  roles: ["Requester", "Approver", "Admin", "Auditor"],
  actions: [
    "create-request",
    "approve-request",
    "manage-roles",
    "view-audit-log",
  ],
  cells: [
    {
      role: "Requester",
      action: "create-request",
      access: "allow",
      note: "Creates a request in an approval workflow.",
    },
    { role: "Requester", action: "approve-request", access: "deny" },
    { role: "Requester", action: "manage-roles", access: "deny" },
    { role: "Requester", action: "view-audit-log", access: "deny" },
    { role: "Approver", action: "create-request", access: "limited" },
    {
      role: "Approver",
      action: "approve-request",
      access: "allow",
      note: "Approves requests assigned to their scope.",
    },
    { role: "Approver", action: "manage-roles", access: "deny" },
    { role: "Approver", action: "view-audit-log", access: "limited" },
    { role: "Admin", action: "create-request", access: "allow" },
    { role: "Admin", action: "approve-request", access: "allow" },
    {
      role: "Admin",
      action: "manage-roles",
      access: "allow",
      note: "Owns role and permission configuration.",
    },
    { role: "Admin", action: "view-audit-log", access: "allow" },
    { role: "Auditor", action: "create-request", access: "deny" },
    { role: "Auditor", action: "approve-request", access: "deny" },
    { role: "Auditor", action: "manage-roles", access: "deny" },
    {
      role: "Auditor",
      action: "view-audit-log",
      access: "allow",
      note: "Reviews access decisions without changing data.",
    },
  ],
});
