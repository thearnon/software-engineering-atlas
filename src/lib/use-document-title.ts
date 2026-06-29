import { useEffect } from "react";
import { useLocation } from "react-router";

import type { Locale } from "@/lib/locales";

const SITE_NAME = "Software Engineering Atlas";

interface PageMetaOptions {
  /** Page-specific title; ignored when `isHome` is true. */
  readonly title: string;
  readonly description: string;
  readonly locale: Locale;
  readonly isHome?: boolean;
}

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (element === null) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector =
    hreflang === undefined
      ? `link[rel="${rel}"]:not([hreflang])`
      : `link[rel="${rel}"][hreflang="${hreflang}"]`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (element === null) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);

    if (hreflang !== undefined) {
      element.setAttribute("hreflang", hreflang);
    }

    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

/**
 * Keeps document title plus description, canonical, Open Graph and hreflang
 * alternates in sync with the current page. Bilingual alternates are derived
 * by swapping the leading locale segment of the current path.
 */
export function usePageMeta({
  title,
  description,
  locale,
  isHome = false,
}: PageMetaOptions): void {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = isHome ? SITE_NAME : `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    const origin = window.location.origin;
    const segments = pathname.split("/").filter(Boolean);
    const altPath = (target: Locale): string => {
      const next = [...segments];

      if (next.length === 0) {
        next.push(target);
      } else {
        next[0] = target;
      }

      return `${origin}/${next.join("/")}`;
    };

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", locale === "th" ? "th_TH" : "en_US");

    upsertLink("canonical", `${origin}${pathname}`);
    upsertLink("alternate", altPath("th"), "th");
    upsertLink("alternate", altPath("en"), "en");
    upsertLink("alternate", altPath("th"), "x-default");
  }, [title, description, locale, isHome, pathname]);
}
