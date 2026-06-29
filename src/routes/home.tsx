import { Link, Navigate, useParams } from "react-router";

import { getTopicsByLocale } from "@/data/topics";
import { defaultLocale, isLocale } from "@/lib/locales";

export function HomeRoute() {
  const { locale: localeParam } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  const topics = getTopicsByLocale(localeParam);

  return (
    <article className="home-page">
      <section className="hero-section">
        <div>
          <h1>Software Engineering Atlas</h1>
          <p>
            แผนที่ความรู้แบบ interactive สำหรับ software engineering,
            architecture, และ enterprise web applications.
          </p>
        </div>
        <div className="hero-map" aria-hidden="true">
          <span>Requirement</span>
          <span>Workflow</span>
          <span>Architecture</span>
          <span>Testing</span>
          <span>Deployment</span>
        </div>
      </section>
      <section className="topic-section" aria-labelledby="topics-title">
        <h2 id="topics-title">Start exploring</h2>
        <div className="topic-list">
          {topics.map((topic) => (
            <Link
              className="topic-row"
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
