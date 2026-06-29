import type { ReactNode } from "react";

import type { AtlasArea } from "@/data/areas";

const shapes: Record<AtlasArea, ReactNode> = {
  process: <path d="M4 6h16M4 12h10M4 18h7" />,
  requirement: (
    <>
      <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" />
      <path d="m9 11 3 3 9-9" />
    </>
  ),
  architecture: <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" />,
  "code-design": <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  testing: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />,
  deployment: (
    <>
      <path d="M12 3a8 8 0 0 1 8 8M12 3a8 8 0 0 0-8 8" />
      <path d="M12 13V5m-4 4 4-4 4 4M5 21h14" />
    </>
  ),
  security: <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />,
  "ux-ui": (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M9 18v3M15 18v3" />
    </>
  ),
};

interface AreaIconProps {
  readonly area: AtlasArea;
  readonly size?: number;
  readonly className?: string;
}

export function AreaIcon({ area, size = 18, className }: AreaIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      width={size}
    >
      {shapes[area]}
    </svg>
  );
}
