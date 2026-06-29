import { lazy, Suspense, useRef } from "react";
import { Link, Navigate, useParams } from "react-router";

import { mdxComponents } from "@/components/mdx-components";
import { TableOfContents } from "@/components/TableOfContents";
import { TopicPager } from "@/components/TopicPager";
import { getAreaById } from "@/data/areas";
import { rbacPermissions } from "@/data/rbac-permissions";
import {
  getRelatedTopics,
  getTopicByRoute,
  getTopicNeighbors,
} from "@/data/topics";
import { defaultLocale, isLocale } from "@/lib/locales";
import { usePageMeta } from "@/lib/use-document-title";
import { useHeadings } from "@/lib/use-headings";
import { NotFound } from "@/routes/not-found";
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
    return <NotFound locale={localeParam} />;
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
  usePageMeta({ title: topic.title, description: topic.summary, locale });

  const proseRef = useRef<HTMLDivElement>(null);
  const { headings, activeId } = useHeadings(proseRef, [locale, topic.slug]);

  const Content = topic.Content;
  const areaMeta = getAreaById(topic.area, locale);
  const areaLabel = areaMeta?.label ?? topic.area;
  const relatedTopics = getRelatedTopics(locale, topic.relatedTopicIds);
  const { prev, next } = getTopicNeighbors(locale, topic.area, topic.slug);

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
      </header>
      <div className={`topic-body${headings.length > 0 ? " has-toc" : ""}`}>
        <div className="prose" ref={proseRef}>
          <Content components={mdxComponents} />
        </div>
        <TableOfContents
          activeId={activeId}
          headings={headings}
          locale={locale}
        />
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
      <TopicPager locale={locale} next={next} prev={prev} />
    </article>
  );
}
