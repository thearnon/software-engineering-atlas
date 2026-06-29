import type {
  PermissionAccess,
  PermissionMatrix as PermissionMatrixData,
} from "@/schema/permission-matrix";

interface PermissionMatrixProps {
  readonly data: PermissionMatrixData;
}

const accessLabels: Record<PermissionAccess, string> = {
  allow: "Allow",
  deny: "Deny",
  limited: "Limited",
};

function getAccess(
  data: PermissionMatrixData,
  role: string,
  action: string,
): PermissionAccess {
  return (
    data.cells.find((cell) => cell.role === role && cell.action === action)
      ?.access ?? "deny"
  );
}

export function PermissionMatrix({ data }: PermissionMatrixProps) {
  return (
    <section className="viewer-panel" aria-labelledby="permission-matrix-title">
      <div className="viewer-panel__header">
        <h2 id="permission-matrix-title">{data.title}</h2>
        <p>
          Validated typed data rendered as a role x action matrix for SEA viewer
          components.
        </p>
      </div>
      <div className="matrix-scroll">
        <table aria-label={data.title} className="permission-matrix">
          <thead>
            <tr>
              <th scope="col">Role</th>
              {data.actions.map((action) => (
                <th scope="col" key={action}>
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.roles.map((role) => (
              <tr key={role}>
                <th scope="row">{role}</th>
                {data.actions.map((action) => {
                  const access = getAccess(data, role, action);

                  return (
                    <td key={action}>
                      <span className={`access-pill access-pill--${access}`}>
                        {accessLabels[access]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
