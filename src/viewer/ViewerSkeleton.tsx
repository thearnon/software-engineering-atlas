/**
 * Placeholder shown while a lazily-loaded viewer component is being fetched.
 * Shape-only (no text), animated pulse honoring `prefers-reduced-motion`.
 */
export function ViewerSkeleton() {
  return <div aria-hidden="true" className="viewer-skeleton" />;
}
