import { Link, Navigate, Outlet, useLocation, useParams } from "react-router";

import { getAreasByLocale } from "@/data/areas";
import { getTopicsByLocale } from "@/data/topics";
import { defaultLocale, isLocale, otherLocale } from "@/lib/locales";

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
  const location = useLocation();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  const locale = localeParam;
  const topics = getTopicsByLocale(locale);
  const areas = getAreasByLocale(locale);
  const alternateLocale = otherLocale(locale);
  const activeArea = location.pathname.split("/").filter(Boolean)[1];

  return (
    <div className="app-shell">
      <header className="top-nav">
        <Link className="brand" to={`/${locale}`} aria-label="SEA home">
          <span className="brand-mark">SEA</span>
          <span>
            <strong>Software Engineering Atlas</strong>
            <small>by thearnon</small>
          </span>
        </Link>
        <nav className="top-nav__actions" aria-label="Primary navigation">
          <Link to={`/${locale}`}>Atlas</Link>
          <Link to={switchLocalePath(location.pathname, alternateLocale)}>
            {alternateLocale === "en" ? "EN" : "ไทย"}
          </Link>
        </nav>
      </header>
      <div className="atlas-layout">
        <aside className="sidebar" aria-label="Topic tree">
          <nav>
            {areas.map((area) => {
              const areaTopics = topics.filter((topic) => topic.area === area.id);
              const isActiveArea = activeArea === area.id;

              return (
                <section
                  className={`sidebar-area${isActiveArea ? " is-active" : ""}`}
                  key={area.id}
                >
                  <Link
                    aria-current={isActiveArea ? "page" : undefined}
                    className="sidebar-area__label"
                    to={`/${locale}/${area.id}`}
                  >
                    <span>{area.label}</span>
                    {areaTopics.length > 0 ? (
                      <small>{areaTopics.length}</small>
                    ) : null}
                  </Link>
                  {isActiveArea && areaTopics.length > 0 ? (
                    <div className="sidebar-area__topics">
                      {areaTopics.map((topic) => (
                        <Link
                          key={`${topic.locale}-${topic.id}`}
                          to={`/${topic.locale}/${topic.area}/${topic.slug}`}
                        >
                          {topic.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </nav>
        </aside>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
