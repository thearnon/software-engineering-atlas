import { Link } from "react-router";

import type { TopicEntry } from "@/data/topics";
import type { Locale } from "@/lib/locales";

interface TopicPagerProps {
  readonly locale: Locale;
  readonly prev?: TopicEntry;
  readonly next?: TopicEntry;
}

export function TopicPager({ locale, prev, next }: TopicPagerProps) {
  if (prev === undefined && next === undefined) {
    return null;
  }

  const isThai = locale === "th";

  return (
    <nav
      className="topic-pager"
      aria-label={isThai ? "หัวข้อก่อนหน้าและถัดไป" : "Previous and next topic"}
    >
      {prev !== undefined ? (
        <Link
          className="topic-pager__link topic-pager__link--prev"
          to={`/${prev.locale}/${prev.area}/${prev.slug}`}
        >
          <small>{isThai ? "ก่อนหน้า" : "Previous"}</small>
          <span>{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next !== undefined ? (
        <Link
          className="topic-pager__link topic-pager__link--next"
          to={`/${next.locale}/${next.area}/${next.slug}`}
        >
          <small>{isThai ? "ถัดไป" : "Next"}</small>
          <span>{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
