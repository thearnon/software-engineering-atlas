import { Link, Navigate, useParams } from "react-router";

import { getAreaById } from "@/data/areas";
import { rbacPermissions } from "@/data/rbac-permissions";
import { getTopicByRoute } from "@/data/topics";
import { PermissionMatrix } from "@/viewer/PermissionMatrix";
import { defaultLocale, isLocale, otherLocale } from "@/lib/locales";

export function TopicRoute() {
  const { area, locale: localeParam, topic: slug } = useParams();

  if (!isLocale(localeParam)) {
    return <Navigate to={`/${defaultLocale}`} replace />;
  }

  const topic = getTopicByRoute(localeParam, area, slug);

  if (topic === undefined) {
    return <Navigate to={`/${localeParam}`} replace />;
  }

  const Content = topic.Content;
  const alternateLocale = otherLocale(localeParam);
  const areaMeta = getAreaById(topic.area, localeParam);
  const areaLabel = areaMeta?.label ?? topic.area;

  return (
    <article className="topic-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to={`/${localeParam}`}>
          {localeParam === "th" ? "หน้าแรก" : "Home"}
        </Link>
        <Link to={`/${localeParam}/${topic.area}`}>{areaLabel}</Link>
        <span>{topic.title}</span>
      </nav>
      <header className="topic-header">
        <div>
          <p>{areaLabel}</p>
          <h1>{topic.title}</h1>
          <span>{topic.summary}</span>
        </div>
        <Link
          className="locale-card"
          to={`/${alternateLocale}/${topic.area}/${topic.slug}`}
        >
          {alternateLocale === "en" ? "EN" : "ไทย"}
        </Link>
      </header>
      <div className="prose">
        <Content />
      </div>
      <PermissionMatrix data={rbacPermissions} />
    </article>
  );
}
