import { lazy, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router";

import { getAreaById } from "@/data/areas";
import { rbacPermissions } from "@/data/rbac-permissions";
import {
  getRelatedTopics,
  getTopicByRoute,
  hasTranslation,
} from "@/data/topics";
import { defaultLocale, isLocale, otherLocale } from "@/lib/locales";
import { useDocumentTitle } from "@/lib/use-document-title";
import { ViewerSkeleton } from "@/viewer/ViewerSkeleton";

const PermissionMatrix = lazy(() =>
  import("@/viewer/PermissionMatrix").then((module) => ({
    default: module.PermissionMatrix,
  })),
);

export function TopicRoute() {
  const { area, locale: localeParam, topic: slug } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  const topic = getTopicByRoute(localeParam, area, slug);

  if (topic === undefined) {
    return <Navigate to={`/${localeParam}`} replace />;
  }

  return <TopicView locale={localeParam} topic={topic} />;
}

function TopicView({
  locale,
  topic,
}: {
  readonly locale: "th" | "en";
  readonly topic: NonNullable<ReturnType<typeof getTopicByRoute>>;
}) {
  useDocumentTitle(topic.title);

  const Content = topic.Content;
  const alternateLocale = otherLocale(locale);
  const areaMeta = getAreaById(topic.area, locale);
  const areaLabel = areaMeta?.label ?? topic.area;
  const relatedTopics = getRelatedTopics(locale, topic.relatedTopicIds);
  const translationExists = hasTranslation(topic.id, locale);

  const matrixCaption =
    locale === "th"
      ? "ตารางสิทธิ์ตาม role × action สำหรับใช้ตรวจสอบสิทธิ์ใน enterprise workflow"
      : "A role × action permission table for reviewing access in enterprise workflows.";

  return (
    <article className="topic-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to={`/${locale}`}>{locale === "th" ? "หน้าแรก" : "Home"}</Link>
        <Link to={`/${locale}/${topic.area}`}>{areaLabel}</Link>
        <span>{topic.title}</span>
      </nav>
      <header className="topic-header">
        <div>
          <p>{areaLabel}</p>
          <h1>{topic.title}</h1>
          <span>{topic.summary}</span>
        </div>
        {translationExists ? (
          <Link
            className="locale-card"
            to={`/${alternateLocale}/${topic.area}/${topic.slug}`}
          >
            {alternateLocale === "en" ? "EN" : "ไทย"}
          </Link>
        ) : (
          <span className="fallback-badge">
            {locale === "th" ? "ไม่มีเวอร์ชัน EN" : "ไม่มีเวอร์ชันภาษาไทย"}
          </span>
        )}
      </header>
      <div className="prose">
        <Content />
      </div>
      {topic.viewer === "permission-matrix" ? (
        <Suspense fallback={<ViewerSkeleton />}>
          <PermissionMatrix caption={matrixCaption} data={rbacPermissions} />
        </Suspense>
      ) : null}
      {relatedTopics.length > 0 ? (
        <section
          className="related-topics"
          aria-labelledby="related-topics-title"
        >
          <h2 id="related-topics-title">
            {locale === "th" ? "หัวข้อที่เกี่ยวข้อง" : "Related topics"}
          </h2>
          <div className="topic-list">
            {relatedTopics.map((related) => (
              <Link
                className="topic-card"
                key={`${related.locale}-${related.id}`}
                to={`/${related.locale}/${related.area}/${related.slug}`}
              >
                <span>{related.title}</span>
                <small>{related.summary}</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
