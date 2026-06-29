import type {
  PermissionAccess,
  PermissionMatrix as PermissionMatrixData,
} from "@/schema/permission-matrix";

interface PermissionMatrixProps {
  readonly data: PermissionMatrixData;
  readonly caption?: string;
}

type PermissionMatrixCell = PermissionMatrixData["cells"][number];

const accessLabels: Record<PermissionAccess, string> = {
  allow: "Allow",
  deny: "Deny",
  limited: "Limited",
};

function getCell(
  data: PermissionMatrixData,
  role: string,
  action: string,
): PermissionMatrixCell | undefined {
  return data.cells.find((cell) => cell.role === role && cell.action === action);
}

export function PermissionMatrix({ data, caption }: PermissionMatrixProps) {
  return (
    <section className="viewer-panel" aria-labelledby="permission-matrix-title">
      <div className="viewer-panel__header">
        <h2 id="permission-matrix-title">{data.title}</h2>
        {caption !== undefined ? <p>{caption}</p> : null}
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
                  const cell = getCell(data, role, action);
                  const access = cell?.access ?? "deny";

                  return (
                    <td key={action}>
                      <span className={`access-pill access-pill--${access}`}>
                        {accessLabels[access]}
                      </span>
                      {cell?.note !== undefined ? (
                        <p className="permission-matrix__note">{cell.note}</p>
                      ) : null}
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
