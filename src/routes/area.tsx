import { Link, Navigate, useParams } from "react-router";

import { AreaIcon } from "@/components/AreaIcon";
import { getAreaById, getAreasByLocale } from "@/data/areas";
import type { AreaEntry } from "@/data/areas";
import { getTopicsByLocaleAndArea } from "@/data/topics";
import { defaultLocale, isLocale } from "@/lib/locales";
import { usePageMeta } from "@/lib/use-document-title";
import { NotFound } from "@/routes/not-found";

export function AreaRoute() {
  const { area: areaParam, locale: localeParam } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  const area = getAreaById(areaParam, localeParam);

  if (area === undefined) {
    return <NotFound locale={localeParam} />;
  }

  return <AreaView area={area} locale={localeParam} />;
}

function AreaView({
  area,
  locale,
}: {
  readonly area: AreaEntry;
  readonly locale: "th" | "en";
}) {
  usePageMeta({
    title: area.label,
    description: area.description,
    locale,
  });

  const topics = getTopicsByLocaleAndArea(locale, area.id);
  const relatedAreas = getAreasByLocale(locale).filter((relatedArea) =>
    area.relatedAreas.includes(relatedArea.id),
  );

  return (
    <article className="area-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to={`/${locale}`}>{locale === "th" ? "หน้าแรก" : "Home"}</Link>
        <span>{area.label}</span>
      </nav>
      <header className="area-header">
        <p>Atlas Area</p>
        <h1>
          <AreaIcon area={area.id} className="area-header__icon" size={26} />
          {area.label}
        </h1>
        <span>{area.description}</span>
        <small>{area.lifecyclePosition}</small>
      </header>
      <section className="topic-section" aria-labelledby="area-topics-title">
        <h2 id="area-topics-title">
          {locale === "th" ? "หัวข้อในหมวดนี้" : "Topics in this area"}
        </h2>
        {topics.length > 0 ? (
          <div className="topic-list">
            {topics.map((topic) => (
              <Link
                className="topic-card"
                key={`${topic.locale}-${topic.id}`}
                to={`/${topic.locale}/${topic.area}/${topic.slug}`}
              >
                <span>{topic.title}</span>
                <small>{topic.summary}</small>
                <span className="layer-badges">
                  <span>{topic.layer}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              {locale === "th"
                ? "ยังไม่มีหัวข้อในหมวดนี้"
                : "No topics in this area yet"}
            </p>
            <Link to={`/${locale}`}>
              {locale === "th" ? "กลับหน้าแรก" : "Back to homepage"}
            </Link>
          </div>
        )}
      </section>
      {relatedAreas.length > 0 ? (
        <section className="related-areas" aria-labelledby="related-areas-title">
          <h2 id="related-areas-title">
            {locale === "th" ? "หมวดที่เกี่ยวข้อง" : "Related areas"}
          </h2>
          <div>
            {relatedAreas.map((relatedArea) => (
              <Link key={relatedArea.id} to={`/${locale}/${relatedArea.id}`}>
                {relatedArea.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
