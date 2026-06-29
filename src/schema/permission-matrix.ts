import { z } from "zod";

export const permissionAccessSchema = z.enum(["allow", "deny", "limited"]);

export const permissionMatrixCellSchema = z.object({
  role: z.string().min(1),
  action: z.string().min(1),
  access: permissionAccessSchema,
  note: z.string().optional(),
});

export const permissionMatrixSchema = z.object({
  title: z.string().min(1),
  roles: z.array(z.string().min(1)).min(1),
  actions: z.array(z.string().min(1)).min(1),
  cells: z.array(permissionMatrixCellSchema).min(1),
});

export type PermissionAccess = z.infer<typeof permissionAccessSchema>;
export type PermissionMatrix = z.infer<typeof permissionMatrixSchema>;

export function parsePermissionMatrix(input: unknown): PermissionMatrix {
  return permissionMatrixSchema.parse(input);
}
