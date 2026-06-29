import { useId, useState } from "react";
import { Link } from "react-router";

import type { Locale } from "@/lib/locales";
import { searchTopics } from "@/search/metadata-index";

interface HeroSearchProps {
  readonly locale: Locale;
}

export function HeroSearch({ locale }: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const trimmed = query.trim();
  const results = trimmed.length > 0 ? searchTopics(trimmed, locale) : [];

  const copy =
    locale === "th"
      ? {
          label: "ค้นหาใน SEA",
          placeholder: "ค้นหา topic, workflow, architecture...",
          empty: "ไม่พบหัวข้อที่ตรงกับคำค้น",
          count: (n: number) => `พบ ${n} หัวข้อ`,
        }
      : {
          label: "Search SEA",
          placeholder: "Search topics, workflows, architecture...",
          empty: "No topics match your search",
          count: (n: number) => `${n} topic${n === 1 ? "" : "s"} found`,
        };

  return (
    <div className="hero-search">
      <label className="search-panel" htmlFor={inputId}>
        <span>{copy.label}</span>
        <input
          autoComplete="off"
          id={inputId}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.placeholder}
          type="search"
          value={query}
        />
      </label>
      {trimmed.length > 0 ? (
        <div aria-live="polite" className="hero-search__results">
          {results.length > 0 ? (
            <>
              <p className="hero-search__count">{copy.count(results.length)}</p>
              <ul>
                {results.map((result) => (
                  <li key={`${result.locale}-${result.id}`}>
                    <Link
                      className="hero-search__result"
                      to={`/${result.locale}/${result.area}/${result.slug}`}
                    >
                      <span>{result.title}</span>
                      <small>{result.summary}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="hero-search__empty">{copy.empty}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
