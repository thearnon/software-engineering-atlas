# Software Engineering Atlas (SEA)

[English](README.md) | [Thai](README.th.md)

**Software Engineering Atlas** (SEA) is a bilingual interactive knowledge atlas for practical software engineering.

> A visual knowledge base for software engineering, architecture, and enterprise web applications.
>
> by thearnon

SEA connects concepts across the software development lifecycle: requirements, process, architecture, code design, databases, testing, deployment, security, and UX/UI.

It is designed from the perspective of building real enterprise web applications, especially internal tools, approval systems, dashboards, KPI systems, workflow systems, and maintainable business software.

## What SEA Is

SEA is not a chronological blog or a loose note dump. It is a structured knowledge product:

- **Visual knowledge base** for storing and reviewing practical engineering knowledge
- **Learning map** for understanding how software engineering topics connect
- **Reference system** for revisiting concepts, patterns, trade-offs, and common mistakes
- **Interactive documentation** for viewers, matrices, decision trees, workflows, and diagrams

The goal is to turn scattered engineering knowledge into a system that is easy to read, navigate, extend, and eventually publish.

## Audience

- **Ken / thearnon** - personal knowledge base, review space, and thinking system
- **Developers learning the bigger software picture** - especially people moving beyond code-only thinking
- **People interested in enterprise web applications** - internal tools, approval systems, KPI systems, dashboards, and workflow digitization

## Content Layers

SEA content has three layers:

1. **Article** - approachable entry points for learning a topic
2. **Knowledge Base / Reference** - structured material for review and lookup
3. **Interactive Viewer** - visual or interactive tools that make abstract concepts visible

Examples of viewer patterns include knowledge maps, comparison matrices, decision trees, workflow viewers, permission matrices, architecture layer viewers, and testing pyramid viewers.

## Language Model

SEA is bilingual by design:

- Default locale: `th`
- Alternate locale: `en`

Thai and English should be real localized pages or content entries, not permanent full-copy language mixing on every page. Standard software terms such as `workflow`, `architecture`, `deployment`, `RBAC`, `schema`, and `viewer` can remain in English when that is clearer.

## Technical Direction

The app foundation uses:

- **React + Vite** for the core app
- **React Router** for locale-aware routes
- **TypeScript strict** for application code
- **Fumadocs Core + Fumadocs MDX** for the content source and MDX pipeline
- **MDX** for content and embedded viewer components
- **Tailwind CSS** for styling
- **Zod + inferred TypeScript types** for data contracts
- **Typed React viewer components** for interactive views
- **Vitest + Playwright + `tsc --noEmit`** as quality gates
- **Local metadata search index** first, with Pagefind planned later

Key boundaries:

- `content` - localized MDX pages and prose
- `data` - typed structured knowledge data
- `viewer` - React components for interactive views
- `schema` - Zod schemas and inferred TypeScript types
- `search` - local metadata index and future Pagefind integration

## Foundation Docs

- [Design Reference](DESIGN.md)
- [SEA Product Brief](docs/sea-product-brief.md)
- [Content Model](docs/content-model.md)
- [Roadmap](docs/roadmap.md)
- [Agent Instructions](AGENTS.md)

## Current Status

The repository currently includes an initial SEA app foundation:

- React + Vite + React Router app shell
- Locale-aware homepage, area index pages, and topic pages
- Typed metadata for the 9 Atlas Areas
- Strict TypeScript setup
- Fumadocs MDX/Core content pipeline
- Tailwind CSS styling
- Zod-validated typed viewer data
- Initial bilingual topic coverage across all 9 Atlas Areas
- Permission Matrix viewer
- Local metadata search index
- Vitest unit tests and Playwright e2e smoke tests

## Useful Commands

On Windows PowerShell, use `npm.cmd` if `npm.ps1` is blocked by execution policy.

```powershell
npm.cmd run dev
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

