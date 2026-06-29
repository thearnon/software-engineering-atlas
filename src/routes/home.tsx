import { Link, Navigate, useParams } from "react-router";

import { HeroSearch } from "@/components/HeroSearch";
import { getAreasByLocale } from "@/data/areas";
import { getTopicsByLocale } from "@/data/topics";
import { defaultLocale, isLocale } from "@/lib/locales";
import { usePageMeta } from "@/lib/use-document-title";

export function HomeRoute() {
  const { locale: localeParam } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  return <HomeView locale={localeParam} />;
}

function HomeView({ locale }: { readonly locale: "th" | "en" }) {
  const topics = getTopicsByLocale(locale);
  const areas = getAreasByLocale(locale);

  const tagline =
    locale === "th"
      ? "แผนที่ความรู้แบบ interactive สำหรับ software engineering, architecture และ enterprise web applications"
      : "An interactive knowledge map for software engineering, architecture, and enterprise web applications.";

  usePageMeta({ title: "", description: tagline, locale, isHome: true });

  return (
    <article className="home-page">
      <section className="hero-section">
        <div>
          <h1>Software Engineering Atlas</h1>
          <p>{tagline}</p>
          <HeroSearch locale={locale} />
        </div>
        <section
          className="hero-map"
          aria-label="Software development lifecycle map"
        >
          <span>Requirement</span>
          <span>Workflow</span>
          <span>Architecture</span>
          <span>Testing</span>
          <span>Deployment</span>
        </section>
      </section>
      <section className="area-section" aria-labelledby="areas-title">
        <h2 id="areas-title">
          {locale === "th" ? "สำรวจตามพื้นที่ความรู้" : "Explore by area"}
        </h2>
        <div className="area-grid">
          {areas.map((area) => {
            const topicCount = topics.filter(
              (topic) => topic.area === area.id,
            ).length;

            return (
              <Link
                className="area-card"
                key={area.id}
                to={`/${locale}/${area.id}`}
              >
                <span>{area.label}</span>
                <small>{area.description}</small>
                <em>
                  {topicCount} {topicCount === 1 ? "topic" : "topics"}
                </em>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="topic-section" aria-labelledby="topics-title">
        <h2 id="topics-title">
          {locale === "th" ? "หัวข้อเริ่มต้น" : "Featured starting topics"}
        </h2>
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
      </section>
    </article>
  );
}
