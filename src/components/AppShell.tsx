import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useParams } from "react-router";

import { AreaIcon } from "@/components/AreaIcon";
import { CommandSearch } from "@/components/CommandSearch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getAreasByLocale } from "@/data/areas";
import { getTopicsByLocale } from "@/data/topics";
import type { Locale } from "@/lib/locales";
import { defaultLocale, isLocale, otherLocale } from "@/lib/locales";

const seaTransparentIconUrl = new URL(
  "../assets/images/sea-icon-transparent.png",
  import.meta.url,
).href;

function switchLocalePath(pathname: string, targetLocale: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  segments[0] = targetLocale;
  return `/${segments.join("/")}`;
}

export function AppShell() {
  const { locale: localeParam } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  return <AtlasLayout locale={localeParam} />;
}

function AtlasLayout({ locale }: { readonly locale: Locale }) {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Keep the document language in sync with the active locale for screen
  // readers and SEO; the static HTML only declares the default locale.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Close the mobile drawer whenever navigation changes.
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const topics = getTopicsByLocale(locale);
  const areas = getAreasByLocale(locale);
  const alternateLocale = otherLocale(locale);
  const segments = location.pathname.split("/").filter(Boolean);
  const activeArea = segments[1];
  const activeSlug = segments[2];

  const isThai = locale === "th";

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {isThai ? "ข้ามไปยังเนื้อหา" : "Skip to content"}
      </a>
      <header className="top-nav">
        <div className="top-nav__lead">
          <button
            aria-controls="topic-tree"
            aria-expanded={navOpen}
            aria-label={isThai ? "เปิดเมนูหัวข้อ" : "Open topic menu"}
            className="nav-toggle"
            onClick={() => setNavOpen((open) => !open)}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link className="brand" to={`/${locale}`} aria-label="SEA home">
            <span className="brand-mark">
              <img
                alt="Software Engineering Atlas icon"
                height="40"
                src={seaTransparentIconUrl}
                width="40"
              />
            </span>
            <span>
              <strong>Software Engineering Atlas</strong>
              <small>by thearnon</small>
            </span>
          </Link>
        </div>
        <nav className="top-nav__actions" aria-label="Primary navigation">
          <CommandSearch locale={locale} />
          <Link
            className="nav-button"
            to={switchLocalePath(location.pathname, alternateLocale)}
          >
            {alternateLocale === "en" ? "EN" : "ไทย"}
          </Link>
          <ThemeToggle locale={locale} />
        </nav>
      </header>
      <div className="atlas-layout">
        {navOpen ? (
          <button
            aria-label={isThai ? "ปิดเมนู" : "Close menu"}
            className="sidebar-backdrop"
            onClick={() => setNavOpen(false)}
            type="button"
          />
        ) : null}
        <aside
          className={`sidebar${navOpen ? " is-open" : ""}`}
          id="topic-tree"
          aria-label={isThai ? "แผนผังหัวข้อ" : "Topic tree"}
        >
          <nav>
            {areas.map((area) => {
              const areaTopics = topics.filter(
                (topic) => topic.area === area.id,
              );
              const isActiveArea = activeArea === area.id;
              const isOpen = expanded[area.id] ?? isActiveArea;
              const canExpand = areaTopics.length > 0;

              return (
                <section
                  className={`sidebar-area${isActiveArea ? " is-active" : ""}`}
                  key={area.id}
                >
                  <div className="sidebar-area__header">
                    <Link
                      aria-current={isActiveArea ? "page" : undefined}
                      className="sidebar-area__label"
                      to={`/${locale}/${area.id}`}
                    >
                      <span className="sidebar-area__name">
                        <AreaIcon area={area.id} size={16} />
                        {area.label}
                      </span>
                      {canExpand ? <small>{areaTopics.length}</small> : null}
                    </Link>
                    {canExpand ? (
                      <button
                        aria-expanded={isOpen}
                        aria-label={
                          isThai
                            ? `สลับหัวข้อใน ${area.label}`
                            : `Toggle ${area.label} topics`
                        }
                        className={`sidebar-area__toggle${isOpen ? " is-open" : ""}`}
                        onClick={() =>
                          setExpanded((current) => ({
                            ...current,
                            [area.id]: !isOpen,
                          }))
                        }
                        type="button"
                      >
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="16"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="16"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                  {isOpen && canExpand ? (
                    <div className="sidebar-area__topics">
                      {areaTopics.map((topic) => {
                        const isCurrent =
                          topic.area === activeArea &&
                          topic.slug === activeSlug;

                        return (
                          <Link
                            aria-current={isCurrent ? "page" : undefined}
                            className={isCurrent ? "is-current" : undefined}
                            key={`${topic.locale}-${topic.id}`}
                            to={`/${topic.locale}/${topic.area}/${topic.slug}`}
                          >
                            {topic.title}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </nav>
        </aside>
        <main className="content-area" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <footer className="site-footer">
        <div>
          <strong>Software Engineering Atlas</strong>
          <small>by thearnon</small>
        </div>
      </footer>
    </div>
  );
}
