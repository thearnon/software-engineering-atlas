# SEA Roadmap

## Phase 1: Foundation Docs

Goal: ทำให้ repository มี source of truth สำหรับ vision, agent instructions, content model, และ delivery direction

Status: implemented.

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

Status: implemented as an initial atlas app foundation.

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
- Area index route `/{locale}/{area}`
- Typed area metadata for 9 Atlas Areas
- Homepage area grid and static lifecycle map

## Phase 3: Bilingual Content Structure

Goal: ทำให้ SEA รองรับภาษาไทยและอังกฤษเป็น first-class content model

Status: initial implementation complete.

Deliverables:

- `th` default content path
- `en` alternate content path
- Language switch behavior
- Shared topic identity between Thai and English entries
- Initial content authoring rules for localized pages

Current coverage:

- Thai and English MDX content paths exist
- Topic metadata shares ids across locales
- Locale switch exists for topic routes
- Content is localized per page instead of mixing full Thai and English copies

## Phase 4: First SEA Topic

Goal: สร้าง topic แรกที่พิสูจน์ content model ได้จริง

Status: initial implementation complete.

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
- English article
- Structured topic metadata
- Related topic links
- Seed related topics: `approval-workflow`, `audit-log`, `permission-matrix`

## Phase 5: First Interactive Viewer

Goal: ทำให้ SEA แตกต่างจาก Markdown docs ด้วย viewer แรก

Status: initial implementation complete.

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

Current coverage:

- `PermissionMatrix` viewer renders on the RBAC topic
- Permission matrix data is typed and validated with Zod
- Unit/component tests cover schema and viewer behavior

## Phase 6: Search Upgrade

Goal: ทำให้ SEA ค้นหาเนื้อหาได้ดีขึ้นเมื่อ content เริ่มเยอะ

Status: next major product capability.

Deliverables:

- Pagefind full-text static search
- Locale-aware search results
- Metadata fallback for topics without indexed full text
- Search UI that supports Thai and English content

## Phase 7: Deployment

Goal: ทำให้ SEA เปิดดูได้บนเว็บจริง

Status: future.

Deliverables:

- Production build
- Hosting setup
- Basic metadata and SEO
- Public URL
- Lightweight contribution or authoring notes for future agent-assisted content
