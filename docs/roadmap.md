# SEA Roadmap

## Phase 1: Foundation Docs

Goal: ทำให้ repository มี source of truth สำหรับ vision, agent instructions, content model, และ delivery direction

Deliverables:

- Populate `README.md`
- Populate `AGENTS.md`
- Add `design.md`
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

Planned stack:

- Next.js
- Fumadocs
- MDX
- Tailwind CSS
- React

Deliverables:

- Basic Next.js app
- Fumadocs content layer
- Tailwind styling setup
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
- Viewer component
- Example RBAC matrix
- Documentation explaining how content, data, viewer, and schema connect

## Phase 6: Deployment

Goal: ทำให้ SEA เปิดดูได้บนเว็บจริง

Deliverables:

- Production build
- Hosting setup
- Basic metadata and SEO
- Public URL
- Lightweight contribution or authoring notes for future agent-assisted content
