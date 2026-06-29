# Agent Instructions

This repository is for **Software Engineering Atlas (SEA)**.

SEA is a bilingual interactive knowledge atlas for practical software engineering. Treat it as a **visual knowledge base + learning map + reference system + interactive documentation**, not as a generic blog or loose personal notes.

## Product Identity

- Preserve the name **Software Engineering Atlas** and short name **SEA**.
- Use the positioning: "A visual knowledge base for software engineering, architecture, and enterprise web applications."
- Keep `by thearnon` as the personal brand attribution instead of merging `thearnon` into the main product name.
- Explain concepts from the perspective of building real enterprise web applications, especially internal tools, approval systems, dashboards, KPI systems, workflow systems, and maintainable business software.

## Language Rules

- Default locale is `th`.
- Alternate locale is `en`.
- Future app work should support switching between Thai and English as real localized pages or content entries.
- Do not solve bilingual support by permanently mixing full Thai and English copies in every page.
- It is fine to keep software terms in English when they are standard industry vocabulary, such as `workflow`, `architecture`, `deployment`, `RBAC`, `schema`, and `viewer`.
- Preserve UTF-8 Thai text correctly when editing Markdown.

## Content Model

SEA content should support three layers:

1. **Article** - approachable entry points for readers who are learning a topic.
2. **Knowledge Base / Reference** - structured, concise reference material for review.
3. **Interactive Viewer** - visual or interactive tools such as maps, matrices, decision trees, workflow viewers, permission matrices, architecture layer viewers, and testing pyramid viewers.

When adding content, connect topics across the software development lifecycle instead of treating each article as isolated. For example, `User Story` should naturally connect to acceptance criteria, workflow, architecture, database design, testing, deployment, and observability.

## Technical Direction

The intended future stack is:

- `React`
- `Vite`
- `React Router`
- `TypeScript strict`
- `Fumadocs Core`
- `Fumadocs MDX`
- `MDX`
- `Tailwind CSS`
- Optional `Fumadocs UI`
- `Zod`
- TS inferred types
- Typed React viewer components
- `Vitest`
- `Playwright`
- `tsc --noEmit` as a required gate
- Phase 1 search: local metadata index
- Phase 2 search: Pagefind full-text static search

No app scaffold exists yet. Do not assume package scripts, test commands, or framework files until they are actually added.

Future implementation should keep these concerns distinct:

- `content` for MDX writing
- `data` for structured knowledge data, preferably typed `.ts` files
- `viewer` for typed React components that render interactive views
- `schema` for Zod data contracts and inferred TypeScript types
- `search` for generated metadata and later Pagefind indexes

## TypeScript and Data Rules

- All application code must be TypeScript.
- Avoid JavaScript files unless a tool explicitly requires them.
- Use strict TypeScript.
- Do not use `any`.
- Validate structured content with Zod.
- Prefer typed `.ts` data files over raw `.json` when possible.
- Viewer components must accept typed props.
- Viewer data must be validated before it is rendered.
- Run `tsc --noEmit` before considering implementation work complete.

## Repository Instructions

- `README.md` is the public project overview.
- `DESIGN.md` is the visual and technical design reference for the app.
- `docs/sea-product-brief.md` is the durable concept brief.
- `docs/content-model.md` is the content and localization model.
- `docs/roadmap.md` is the phased delivery direction.
- `.agents/skills/` is the canonical source for repo-local agent skills.
- `.claude/skills/` is a Claude Code runtime mirror of `.agents/skills/`, not an independent source of truth.
- `CLAUDE.md` imports this file using `@AGENTS.md`; keep this file as the canonical project instruction file.

## Editing Guidance

- Keep foundation docs concise but decision-useful.
- Prefer practical examples over textbook-only explanations.
- Avoid reframing SEA as a date-based blog.
- Avoid introducing app code, package setup, or build tooling unless explicitly requested.
- Before claiming completion, verify edited Markdown can be read as UTF-8 and that documented links still point to existing files.
