import { Link, Navigate, useParams } from "react-router";

import { getAreasByLocale } from "@/data/areas";
import { getTopicsByLocale } from "@/data/topics";
import { defaultLocale, isLocale } from "@/lib/locales";

export function HomeRoute() {
  const { locale: localeParam } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  const topics = getTopicsByLocale(localeParam);
  const areas = getAreasByLocale(localeParam);

  return (
    <article className="home-page">
      <section className="hero-section">
        <div>
          <h1>Software Engineering Atlas</h1>
          <p>
            แผนที่ความรู้แบบ interactive สำหรับ software engineering,
            architecture, และ enterprise web applications.
          </p>
          <label className="search-panel">
            <span>{localeParam === "th" ? "ค้นหาใน SEA" : "Search SEA"}</span>
            <input
              placeholder={
                localeParam === "th"
                  ? "ค้นหา topic, workflow, architecture..."
                  : "Search topics, workflows, architecture..."
              }
              type="search"
            />
          </label>
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
          {localeParam === "th" ? "สำรวจตามพื้นที่ความรู้" : "Explore by area"}
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
                to={`/${localeParam}/${area.id}`}
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
          {localeParam === "th" ? "หัวข้อเริ่มต้น" : "Featured starting topics"}
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
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
