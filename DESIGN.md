# SEA Design

เอกสารนี้เป็น reference หลักสำหรับการออกแบบ **Software Engineering Atlas (SEA)** ทั้งด้าน visual/UX และ technical architecture ใช้เป็น source of truth ก่อนเริ่ม Phase 2 (App Scaffold) และตลอดการพัฒนา

---

## 1. Design Philosophy

SEA ควรรู้สึกเหมือน atlas หรือแผนที่ความรู้ ไม่ใช่ blog หรือ docs site ทั่วไป

- **Exploration over chronology** - ผู้อ่านเลือกสำรวจหัวข้อตามความสัมพันธ์ ไม่ใช่ตามวันที่เขียน
- **Wayfinding by default** - ทุกหน้าควรบอกว่าผู้อ่านอยู่ตรงไหนของ knowledge map
- **Calm and professional** - ไม่ฉูดฉาด สี texture และ typography ต้องช่วยให้อ่านสบายและดูน่าเชื่อถือ
- **Thai-first** - layout และ typography ต้องรองรับภาษาไทยเป็นหลัก ไม่ใช่ค่อยปรับทีหลัง
- **Visual over text-only** - ใช้ viewer, diagram, matrix เมื่อช่วยให้เข้าใจมากกว่า prose

---

## 2. Visual Identity

### Color System

ใช้ neutral base กับ accent สีเดียวที่ชัดเจน

| Role | Token | Value (proposed) |
| --- | --- | --- |
| Background | `surface` | Zinc 950 (dark) / Zinc 50 (light) |
| Surface elevated | `surface-raised` | Zinc 900 (dark) / White (light) |
| Border | `border` | Zinc 800 (dark) / Zinc 200 (light) |
| Text primary | `text` | Zinc 100 (dark) / Zinc 900 (light) |
| Text muted | `text-muted` | Zinc 400 |
| Accent / interactive | `accent` | Indigo 500 |
| Accent hover | `accent-hover` | Indigo 400 |
| Code surface | `code-surface` | Zinc 800 (dark) / Zinc 100 (light) |

### Typography

| Use | Font | Notes |
| --- | --- | --- |
| UI / navigation | Inter | ภาษาอังกฤษ, fallback system-ui |
| Thai content | Sarabun | Google Fonts, น้ำหนัก 400 / 600 |
| Code | JetBrains Mono | fallback monospace |

- Base size: 16px minimum (สำคัญสำหรับ Thai readability)
- Line height: 1.7 สำหรับ prose, 1.4 สำหรับ UI
- Thai font ต้องโหลดผ่าน CSS `@font-face`, Vite asset pipeline, หรือ font provider strategy ที่ควบคุม performance ได้

### Dark / Light Mode

- Default: **dark** - เหมาะกับ knowledge tool ที่อ่านนาน
- Light mode: รองรับเต็มรูปแบบ ไม่ใช่ optional
- Toggle: ปุ่มใน top nav หรือ system preference via `prefers-color-scheme`
- Implementation: Tailwind `dark:` variant + class strategy (`class="dark"` บน `<html>`)

### Spacing

- Base grid: 4px (Tailwind default)
- ใช้ Tailwind spacing scale ตลอด ไม่ใช่ magic numbers

---

## 3. Layout Architecture

```text
┌─────────────────────────────────────────────────────┐
│  Top Nav: Logo | Search | Locale Switch | Theme      │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│   Sidebar    │   Content Area                        │
│   Topic Tree │   (article / reference / viewer)      │
│   (collapsible)                                     │
│              │                                       │
├──────────────┴──────────────────────────────────────┤
│  Footer: links, locale, attribution                  │
└─────────────────────────────────────────────────────┘
```

- **Top nav**: sticky, height ~56px, มี logo (SEA), search, locale switch (ไทย / EN), dark/light toggle
- **Sidebar**: collapsible topic tree จัดตาม Atlas Areas ไม่จัดตามวันที่ - collapse เป็น hamburger บน mobile
- **Content area**: centered, max-width ขึ้นกับ content layer (ดู Section 5)
- **Atlas map view** (Phase 5+): full-width canvas สำหรับ knowledge graph - ซ่อน sidebar เมื่อเปิด

---

## 4. Navigation Model

### URL Structure

```text
/[locale]/[area]/[topic]

ตัวอย่าง:
/th/architecture/rbac
/en/architecture/rbac
/th/process/user-story
/th/database/indexing
```

Atlas Areas ที่ใช้เป็น URL segment:

- `process` - Project / Process Level
- `requirement` - Requirement / Business Level
- `architecture` - Architecture Level
- `code-design` - Code Design Level
- `database` - Database Level
- `testing` - Testing Level
- `deployment` - Deployment / Operation Level
- `security` - Security Level
- `ux-ui` - UX/UI Level

### Wayfinding

- **Breadcrumb**: Home > [Area] > [Topic] - แสดงทุกหน้า
- **Related topics**: section ล่างสุดของทุก article และ reference - เชื่อมตาม relationship types (`prerequisite`, `related`, `leads-to` ฯลฯ)
- **Search**: locale-aware - Phase 1 ใช้ local metadata index, Phase 2 ใช้ Pagefind full-text static search
- ไม่มี archive ตามวันที่ ไม่มี "latest posts"

---

## 5. Content Presentation Patterns

| Layer | Container | Max Width | Key UI Elements |
| --- | --- | --- | --- |
| Article | Prose | `65ch` | headings, body, callout boxes, inline code, images |
| Reference | Structured panel | `65ch` | definition boxes, when-to-use cards, comparison tables |
| Viewer | Canvas | `full` หรือ `2/3 viewport` | toolbar, interactive canvas, legend |

- Article และ Reference ใช้ `max-w-prose` ของ Tailwind (ประมาณ 65ch)
- Viewer ขยายเต็ม content area - sidebar อาจ collapse อัตโนมัติ
- ทุก page มี `<article>` semantic wrapper สำหรับ accessibility

---

## 6. Bilingual UX

- **Locale switcher**: ใน top nav - label: `ไทย` / `EN`
- **Switch behavior**: พาไปยัง locale อื่นของ topic เดิมถ้ามี translation ถ้าไม่มีพากลับ homepage
- **Fallback badge**: ถ้าหน้าภาษาอังกฤษยังไม่มี ให้แสดง Thai version พร้อม badge `"ยังไม่มีเวอร์ชันภาษาอังกฤษ"` (และในทางกลับกัน)
- **Technical terms**: คงไว้เป็นภาษาอังกฤษในทั้งสองภาษา เช่น `RBAC`, `workflow`, `schema`

---

## 7. Interactive Viewer Design

### Embedding in MDX

```mdx
import { PermissionMatrix } from "@/viewer/PermissionMatrix"
import { rbacPermissions } from "@/data/rbac-permissions"

<PermissionMatrix data={rbacPermissions} />
```

- Viewer รับ typed data จาก prop - ไม่ hard-code data ใน component
- Structured data ต้อง validate ด้วย Zod ก่อนส่งเข้า viewer
- ทุก viewer ต้องมี **fallback** เป็น static table หรือ image สำหรับ no-JS และ print
- Viewer ที่หนักควร lazy load ด้วย `React.lazy` และ `Suspense`

### Viewer Types (Initial)

| Viewer | Data source | Use case |
| --- | --- | --- |
| `KnowledgeMap` | graph nodes/edges | แสดงความสัมพันธ์ระหว่าง topics |
| `PermissionMatrix` | roles x permissions table | RBAC, access control |
| `DecisionTree` | decision nodes | when-to-use decisions |
| `WorkflowViewer` | workflow steps | approval flow, SDLC |
| `ComparisonMatrix` | option x criteria table | เปรียบเทียบ pattern/approach |

### Data Convention

```text
/src/data/
  rbac.ts                 # typed RBAC topic data
  rbac-permissions.ts     # typed permission matrix data
  sdlc-workflow.ts        # typed workflow viewer data

/src/schema/
  permission-matrix.ts    # Zod schema + inferred types
  workflow.ts             # Zod schema + inferred types
```

---

## 8. Technical Architecture

### Directory Structure

```text
/
├── src/
│   ├── main.tsx            # Vite entrypoint
│   ├── app.tsx             # App shell composition
│   ├── routes/             # React Router route modules
│   │   ├── root.tsx
│   │   ├── home.tsx
│   │   └── topic.tsx
│   ├── content/
│   │   ├── th/             # Thai MDX content
│   │   │   └── [area]/[topic].mdx
│   │   └── en/             # English MDX content
│   │       └── [area]/[topic].mdx
│   ├── data/               # Typed structured data for viewers
│   ├── viewer/             # React viewer components
│   ├── schema/             # Zod schemas and inferred types
│   ├── search/             # Local metadata index, later Pagefind integration
│   ├── components/         # Shared UI components (nav, sidebar, etc.)
│   └── styles/             # Global CSS, Tailwind config
└── public/
```

### Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Core app | React + Vite | Fast static/client-first app foundation |
| Routing | React Router | Locale and topic routes |
| Language | TypeScript strict | No application JavaScript unless a tool requires it |
| Content layer | Fumadocs Core + Fumadocs MDX | Content source and MDX pipeline |
| MDX | MDX | MDX-in-content สำหรับ viewer embed |
| UI docs layer | Optional Fumadocs UI | Use only if it fits the custom SEA shell |
| Styling | Tailwind CSS | dark mode via class strategy |
| Data contract | Zod + TS inferred types | Validate structured content before render |
| Testing | Vitest + Playwright | Unit/component and browser workflow coverage |
| Type gate | `tsc --noEmit` | Required before implementation is complete |
| Search Phase 1 | Local metadata index | Lightweight topic/relationship search |
| Search Phase 2 | Pagefind | Static full-text search |
| Deployment | Static hosting | Vercel, Netlify, Cloudflare Pages, or equivalent |

### Locale Routing

React Router เป็นเจ้าของ route segment `/:locale/:area/:topic` ส่วน Fumadocs Core/Fumadocs MDX เป็น content source และ MDX pipeline

```ts
export const locales = ["th", "en"] as const;
export const defaultLocale = "th";
```

Route loader หรือ content helper ต้อง resolve topic จาก `locale`, `area`, และ `topic` แล้วคืน content, metadata, relationship, และ fallback state ให้ UI

### TypeScript and Data Rules

- All application code must be TypeScript
- Avoid JavaScript files unless a tool explicitly requires them
- Use strict TypeScript
- Do not use `any`
- Validate structured content with Zod
- Prefer typed `.ts` data files over raw `.json` when possible
- Viewer components must accept typed props
- Run `tsc --noEmit` before considering work complete

---

## 9. Performance Strategy

- **Static build by default**: build ออกเป็น static assets จาก Vite
- **Viewer lazy loading**: `React.lazy` + `Suspense` - viewer ไม่บวม initial bundle
- **Lightweight viewers**: ไม่ใช้ library ขนาดใหญ่เช่น D3 ถ้าทำด้วย SVG custom ได้ - ลด bundle size
- **Font optimization**: ใช้ `@font-face`, preconnect/preload, หรือ font pipeline ที่ควบคุมได้ - ป้องกัน FOUT และ layout shift
- **Images**: ใช้ optimized static assets, responsive dimensions, และ lazy loading

---

## 10. Responsive Design

- **Mobile-first**: Tailwind breakpoints `sm` (640px) -> `md` (768px) -> `lg` (1024px)
- **Sidebar**: collapse เป็น hamburger menu บน `< lg`
- **Viewers**: fallback เป็น horizontal-scroll table บน `< md` - ไม่บังคับให้ดู interactive canvas บน mobile ขนาดเล็ก
- **Thai text**: base 16px minimum ไม่มีการลดขนาดต่ำกว่านี้
- **Touch targets**: minimum 44x44px สำหรับ interactive elements

---

## Relation to Other Foundation Docs

| Doc | ครอบคลุม | DESIGN.md เพิ่ม |
| --- | --- | --- |
| `docs/sea-product-brief.md` | WHY - vision, audience, principles, brand | HOW - how it looks and is built |
| `docs/content-model.md` | WHAT - content layers, locale model, relationships | HOW - presentation and component patterns |
| `docs/roadmap.md` | WHEN - phases and deliverables | Design reference ที่ Phase 2 builds from |
