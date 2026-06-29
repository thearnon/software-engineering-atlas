/**
 * Turns heading text into a URL-fragment id. Keeps unicode letters (including
 * Thai) and numbers, lowercases, and joins words with hyphens. Falls back to a
 * positional id when the text has no usable characters.
 */
export function slugify(text: string, index: number): string {
  const slug = text
    .trim()
    .toLowerCase()
    // Keep unicode letters, combining marks (Thai vowels/tones are \p{M}),
    // numbers, whitespace and hyphens; drop everything else.
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");

  return slug.length > 0 ? slug : `section-${index}`;
}
