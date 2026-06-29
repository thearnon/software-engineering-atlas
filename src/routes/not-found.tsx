import { Link, useParams } from "react-router";

import { HeroSearch } from "@/components/HeroSearch";
import type { Locale } from "@/lib/locales";
import { defaultLocale, isLocale } from "@/lib/locales";
import { usePageMeta } from "@/lib/use-document-title";

export function NotFound({ locale }: { readonly locale: Locale }) {
  const isThai = locale === "th";

  usePageMeta({
    title: isThai ? "ไม่พบหน้านี้" : "Page not found",
    description: isThai
      ? "ไม่พบหน้าที่คุณกำลังมองหาใน Software Engineering Atlas"
      : "The page you are looking for was not found in Software Engineering Atlas.",
    locale,
  });

  return (
    <article className="not-found">
      <p className="not-found__code">404</p>
      <h1>{isThai ? "ไม่พบหน้านี้" : "Page not found"}</h1>
      <p className="not-found__lead">
        {isThai
          ? "หน้าที่คุณเปิดอาจถูกย้าย หรือยังไม่มีในแผนที่ความรู้ ลองค้นหาหัวข้อที่ต้องการได้เลย"
          : "This page may have moved or does not exist yet in the atlas. Try searching for a topic below."}
      </p>
      <HeroSearch locale={locale} />
      <Link className="nav-button not-found__home" to={`/${locale}`}>
        {isThai ? "กลับหน้าแรก" : "Back to homepage"}
      </Link>
    </article>
  );
}

export function NotFoundRoute() {
  const { locale } = useParams();
  const safeLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return <NotFound locale={safeLocale} />;
}
