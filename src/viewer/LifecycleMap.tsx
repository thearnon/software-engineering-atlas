import { Link, useNavigate } from "react-router";

import { AreaIcon } from "@/components/AreaIcon";
import type { AreaEntry, AtlasArea } from "@/data/areas";
import type { Locale } from "@/lib/locales";

interface LifecycleMapProps {
  readonly areas: readonly AreaEntry[];
  readonly locale: Locale;
}

const NODE_WIDTH = 156;
const NODE_HEIGHT = 46;

// Curated static layout: SDLC reads left→right, top→bottom (DESIGN §11).
const positions: Record<AtlasArea, { x: number; y: number }> = {
  requirement: { x: 20, y: 18 },
  architecture: { x: 302, y: 18 },
  security: { x: 584, y: 18 },
  process: { x: 20, y: 167 },
  "code-design": { x: 302, y: 167 },
  deployment: { x: 584, y: 167 },
  "ux-ui": { x: 20, y: 316 },
  database: { x: 302, y: 316 },
  testing: { x: 584, y: 316 },
};

function center(area: AtlasArea): { cx: number; cy: number } {
  const { x, y } = positions[area];
  return { cx: x + NODE_WIDTH / 2, cy: y + NODE_HEIGHT / 2 };
}

interface Edge {
  readonly from: AtlasArea;
  readonly to: AtlasArea;
}

function buildEdges(areas: readonly AreaEntry[]): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];

  for (const area of areas) {
    for (const related of area.relatedAreas) {
      const key = [area.id, related].sort().join("|");

      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ from: area.id, to: related });
      }
    }
  }

  return edges;
}

export function LifecycleMap({ areas, locale }: LifecycleMapProps) {
  const navigate = useNavigate();
  const edges = buildEdges(areas);
  const title =
    locale === "th" ? "เส้นทางความรู้ใน SDLC" : "The software lifecycle";

  return (
    <section className="lifecycle-map" aria-label="Software development lifecycle map">
      <h2>{title}</h2>
      <svg
        className="lifecycle-map__canvas"
        role="presentation"
        viewBox="0 0 760 380"
      >
        <g className="lifecycle-map__edges">
          {edges.map((edge) => {
            const a = center(edge.from);
            const b = center(edge.to);

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
              />
            );
          })}
        </g>
        {areas.map((area) => {
          const { x, y } = positions[area.id];
          const to = `/${locale}/${area.id}`;

          return (
            <a
              className="lifecycle-map__node"
              href={to}
              key={area.id}
              onClick={(event) => {
                event.preventDefault();
                navigate(to);
              }}
            >
              <rect
                x={x}
                y={y}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={9}
              />
              <text x={x + NODE_WIDTH / 2} y={y + NODE_HEIGHT / 2 + 5}>
                {area.label}
              </text>
            </a>
          );
        })}
      </svg>
      <ul className="lifecycle-map__fallback">
        {areas.map((area) => (
          <li key={area.id}>
            <Link to={`/${locale}/${area.id}`}>
              <AreaIcon area={area.id} />
              <span>{area.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
