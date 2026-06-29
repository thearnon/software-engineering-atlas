import { useEffect } from "react";

const SITE_NAME = "Software Engineering Atlas";

/**
 * Sets `document.title` for the current page. Pass the page-specific title;
 * the site name is appended automatically except on the homepage.
 */
export function useDocumentTitle(title: string, isHome = false): void {
  useEffect(() => {
    document.title = isHome ? SITE_NAME : `${title} — ${SITE_NAME}`;
  }, [title, isHome]);
}
