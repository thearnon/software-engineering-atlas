import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router";

import type { Locale } from "@/lib/locales";
import { searchTopics } from "@/search/metadata-index";
import type { SearchResult } from "@/search/metadata-index";

const isMac =
  typeof navigator !== "undefined" && /mac/i.test(navigator.platform);

interface CommandSearchProps {
  readonly locale: Locale;
}

export function CommandSearch({ locale }: CommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const listboxId = useId();

  const isThai = locale === "th";
  const trimmed = query.trim();
  const results = trimmed.length > 0 ? searchTopics(trimmed, locale) : [];

  // Global ⌘K / Ctrl+K to toggle, Escape to close.
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset and focus when the dialog opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }

    return undefined;
  }, [open]);

  const goTo = (result: SearchResult): void => {
    setOpen(false);
    navigate(`/${result.locale}/${result.area}/${result.slug}`);
  };

  const onInputKeyDown = (
    event: ReactKeyboardEvent<HTMLInputElement>,
  ): void => {
    if (results.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const result = results[active];

      if (result !== undefined) {
        goTo(result);
      }
    }
  };

  return (
    <>
      <button
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        className="nav-search"
        onClick={() => setOpen(true)}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span>{isThai ? "ค้นหา" : "Search"}</span>
        <kbd className="cmd-kbd">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

      {open ? (
        <div
          className="cmd-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
          role="presentation"
        >
          <div
            aria-label={isThai ? "ค้นหาหัวข้อ" : "Search topics"}
            aria-modal="true"
            className="cmd-dialog"
            role="dialog"
          >
            <div className="cmd-input">
              <svg
                aria-hidden="true"
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="18"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                aria-activedescendant={
                  results.length > 0 ? `${listboxId}-${active}` : undefined
                }
                aria-controls={listboxId}
                autoComplete="off"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder={
                  isThai ? "ค้นหา topic, area..." : "Search topics, areas..."
                }
                ref={inputRef}
                type="text"
                value={query}
              />
            </div>
            {trimmed.length > 0 ? (
              results.length > 0 ? (
                <ul className="cmd-results" id={listboxId} role="listbox">
                  {results.map((result, index) => (
                    <li
                      aria-selected={index === active}
                      className={`cmd-result${index === active ? " is-active" : ""}`}
                      id={`${listboxId}-${index}`}
                      key={`${result.locale}-${result.id}`}
                      onClick={() => goTo(result)}
                      onMouseEnter={() => setActive(index)}
                      role="option"
                    >
                      <span>{result.title}</span>
                      <small>{result.summary}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="cmd-empty">
                  {isThai ? "ไม่พบหัวข้อที่ตรงกับคำค้น" : "No matching topics"}
                </p>
              )
            ) : (
              <p className="cmd-empty">
                {isThai
                  ? "พิมพ์เพื่อค้นหาหัวข้อในแผนที่ความรู้"
                  : "Type to search the knowledge atlas"}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
