import type { Locale } from "@/lib/locales";
import { useTheme } from "@/lib/theme";

interface ThemeToggleProps {
  readonly locale: Locale;
}

export function ThemeToggle({ locale }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const label = isDark
    ? locale === "th"
      ? "สลับเป็นโหมดสว่าง"
      : "Switch to light mode"
    : locale === "th"
      ? "สลับเป็นโหมดมืด"
      : "Switch to dark mode";

  return (
    <button
      aria-label={label}
      className="nav-button theme-toggle"
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
