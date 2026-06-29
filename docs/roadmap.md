# SEA Roadmap

## Phase 1: Foundation Docs

Goal: ทำให้ repository มี source of truth สำหรับ vision, agent instructions, content model, และ delivery direction

Deliverables:

- Populate `README.md`
- Populate `AGENTS.md`
- Add `DESIGN.md`
- Add `docs/sea-product-brief.md`
- Add `docs/content-model.md`
- Add `docs/roadmap.md`

Acceptance:

- Thai text renders correctly as UTF-8
- README links point to existing docs
- Design reference is linked from README and recognized by `AGENTS.md`
- `CLAUDE.md` still imports `AGENTS.md`
- No app scaffold or package setup is introduced

## Phase 2: App Scaffold

Goal: สร้าง web app foundation สำหรับ SEA

Status: initial scaffold implemented.

Planned stack:

- React
- Vite
- React Router
- TypeScript strict
- Fumadocs Core
- Fumadocs MDX
- MDX
- Optional Fumadocs UI
- Tailwind CSS
- Zod
- Vitest
- Playwright

Deliverables:

- Basic React + Vite app
- React Router locale and topic routes
- Strict TypeScript setup
- Fumadocs Core + Fumadocs MDX content layer
- Tailwind styling setup
- Zod schema/data contract setup
- `tsc --noEmit` typecheck script
- Vitest and Playwright testing setup
- Phase 1 local metadata search index
- Initial layout that feels like an atlas, not a generic blog
- Basic navigation for Thai default locale and English alternate locale

## Phase 3: Bilingual Content Structure

Goal: ทำให้ SEA รองรับภาษาไทยและอังกฤษเป็น first-class content model

Deliverables:

- `th` default content path
- `en` alternate content path
- Language switch behavior
- Shared topic identity between Thai and English entries
- Initial content authoring rules for localized pages

## Phase 4: First SEA Topic

Goal: สร้าง topic แรกที่พิสูจน์ content model ได้จริง

Recommended first topic:

```text
RBAC
```

Why RBAC:

- เชื่อม business workflow, security, role, permission, database, testing, และ UI ได้ดี
- เหมาะกับ enterprise internal web application
- มีโอกาสทำ interactive viewer ชัดเจน เช่น permission matrix หรือ decision tree

Deliverables:

- Thai article
- English article or summary page
- Structured reference
- Related topic links

## Phase 5: First Interactive Viewer

Goal: ทำให้ SEA แตกต่างจาก Markdown docs ด้วย viewer แรก

Recommended viewer:

```text
Permission Matrix Viewer
```

Deliverables:

- Structured permission data
- Zod-validated typed data
- Viewer component with typed props
- Example RBAC matrix
- Documentation explaining how content, data, viewer, and schema connect

## Phase 6: Search Upgrade

Goal: ทำให้ SEA ค้นหาเนื้อหาได้ดีขึ้นเมื่อ content เริ่มเยอะ

Deliverables:

- Pagefind full-text static search
- Locale-aware search results
- Metadata fallback for topics without indexed full text
- Search UI that supports Thai and English content

## Phase 7: Deployment

Goal: ทำให้ SEA เปิดดูได้บนเว็บจริง

Deliverables:

- Production build
- Hosting setup
- Basic metadata and SEO
- Public URL
- Lightweight contribution or authoring notes for future agent-assisted content
