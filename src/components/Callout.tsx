import type { ReactNode } from "react";

export type CalloutType =
  | "note"
  | "tip"
  | "warning"
  | "enterprise"
  | "definition";

interface CalloutProps {
  readonly type?: CalloutType;
  readonly title?: string;
  readonly children: ReactNode;
}

const iconProps = {
  "aria-hidden": true,
  fill: "none",
  height: 20,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  width: 20,
} as const;

const icons: Record<CalloutType, ReactNode> = {
  note: (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  tip: (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M9 12.5 11 14.5 15.5 10" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  enterprise: (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M16 9h3a2 2 0 0 1 2 2v10" />
      <path d="M9 7h.01M9 11h.01M9 15h.01" />
    </svg>
  ),
  definition: (
    <svg viewBox="0 0 24 24" {...iconProps}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  ),
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  return (
    <aside className={`callout callout--${type}`}>
      <span className="callout__icon">{icons[type]}</span>
      <div className="callout__body">
        {title !== undefined ? <p className="callout__title">{title}</p> : null}
        <div className="callout__content">{children}</div>
      </div>
    </aside>
  );
}
