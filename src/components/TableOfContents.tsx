import type { Locale } from "@/lib/locales";
import type { Heading } from "@/lib/use-headings";

interface TableOfContentsProps {
  readonly headings: readonly Heading[];
  readonly activeId: string;
  readonly locale: Locale;
}

export function TableOfContents({
  headings,
  activeId,
  locale,
}: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  const label = locale === "th" ? "ในหน้านี้" : "On this page";

  return (
    <aside className="toc" aria-label={label}>
      <p className="toc__title">{label}</p>
      <nav>
        <ul>
          {headings.map((heading) => (
            <li
              className={`toc__item toc__item--h${heading.level}`}
              key={heading.id}
            >
              <a
                aria-current={heading.id === activeId ? "true" : undefined}
                className={heading.id === activeId ? "is-active" : undefined}
                href={`#${heading.id}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
