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
| Success | `success` | Green 500 |
| Warning | `warning` | Amber 500 |
| Danger | `danger` | Red 500 |
| Info | `info` | Sky 500 |
| Highlight (search) | `highlight` | Yellow 200 (dark) / Yellow 300 (light) |
| Fallback badge | `fallback` | Zinc 600 bg + Zinc 300 text |

### Typography

| Use | Font | Notes |
| --- | --- | --- |
| UI / navigation | Inter | ภาษาอังกฤษ, fallback system-ui |
| Thai content | Sarabun | Google Fonts, น้ำหนัก 400 / 600 |
| Code | JetBrains Mono | fallback monospace |

- Base size: 16px minimum (สำคัญสำหรับ Thai readability)
- Line height: 1.7 สำหรับ prose, 1.4 สำหรับ UI
- Thai font ต้องโหลดผ่าน CSS `@font-face`, Vite asset pipeline, หรือ font provider strategy ที่ควบคุม performance ได้

### Heading Scale

| Context | Element | Size | Weight | Notes |
| --- | --- | --- | --- | --- |
| Homepage hero | `.hero-title` | 2.5rem / 40px | 700 | Brand positioning only |
| Article / page title | `h1` | 1.875rem / 30px | 700 | ใช้ได้ครั้งเดียวต่อหน้า |
| Section heading | `h2` | 1.5rem / 24px | 600 | ทั้งใน prose และ reference panel |
| Subsection | `h3` | 1.25rem / 20px | 600 | |
| Body prose | `p` | 1rem / 16px | 400 | |
| Card / sidebar label | `.label` | 0.875rem / 14px | 500 | ไม่ใช้ขนาดเล็กกว่านี้สำหรับ Thai |
| Code inline | `code` | 0.9em (relative) | 400 | |

`h1` ใน article ไม่ใช้ขนาด hero-scale — hero-title ใช้เฉพาะ homepage เท่านั้น

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

### Sidebar Design Detail

Sidebar จัดเป็น expandable groups ตาม Atlas Areas 9 หมวด:

```text
┌─────────────────────────┐
│ ▼ Architecture           │  ← expanded (active area)
│   ● RBAC                 │  ← active topic
│   ○ Clean Architecture   │
│   ○ Hexagonal Arch       │
├─────────────────────────┤
│ ▶ Process                │  ← collapsed group
├─────────────────────────┤
│ ▶ Database               │
│ ▶ Testing                │
│  …                       │
└─────────────────────────┘
```

- Area group label ใช้ภาษาตาม locale ปัจจุบัน (`Architecture` / `สถาปัตยกรรม`)
- Topic links ใน group ก็ใช้ภาษาตาม locale เช่นกัน
- Area มี icon หรือ compact marker ได้ แต่ไม่ให้ใหญ่จน icon แย่ง focus จากชื่อหัวข้อ
- Active area group: highlighted border-left หรือ bg-accent subtle
- Active topic: `accent` text color + bold weight
- Collapsed by default ยกเว้น area ที่ active อยู่
- Mobile: drawer ลอยจากซ้าย, overlay backdrop, close เมื่อ tap backdrop หรือ navigate

---

## 4. Navigation Model

### URL Structure

```text
/
/{locale}
/{locale}/{area}
/{locale}/{area}/{topic}

ตัวอย่าง:
/th
/en
/th/architecture
/th/architecture/rbac
/en/architecture/rbac
/th/process/user-story
/th/database/indexing
```

Route contract:

- `/` - redirect ไป `/{defaultLocale}` (`/th`)
- `/{locale}` - homepage ของ locale นั้น
- `/{locale}/{area}` - area index page
- `/{locale}/{area}/{topic}` - topic page

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

- **Breadcrumb**: Home > [Area] สำหรับ area index และ Home > [Area] > [Topic] สำหรับ topic page
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
  areas.ts                # typed area metadata: labels, descriptions, lifecycle position, related areas
  topics.ts               # typed topic metadata, locale, area, slug, relationships
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
│   │   ├── home.tsx        # /{locale}
│   │   ├── area.tsx        # /{locale}/{area}
│   │   └── topic.tsx       # /{locale}/{area}/{topic}
│   ├── content/
│   │   ├── th/             # Thai MDX content
│   │   │   └── [area]/[topic].mdx
│   │   └── en/             # English MDX content
│   │       └── [area]/[topic].mdx
│   ├── data/               # Typed topic, area, and viewer data
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

React Router เป็นเจ้าของ route segments หลัก:

- `/` redirect ไป `/{defaultLocale}`
- `/:locale` render homepage
- `/:locale/:area` render area index page
- `/:locale/:area/:topic` render topic page

Fumadocs Core/Fumadocs MDX เป็น content source และ MDX pipeline สำหรับ topic content

```ts
export const locales = ["th", "en"] as const;
export const defaultLocale = "th";
```

Route loader หรือ content helper ต้อง:

- validate `locale` ด้วย locale contract
- validate `area` ด้วย `src/data/areas.ts`
- resolve area index จาก `locale` + `area` + topic metadata
- resolve topic page จาก `locale` + `area` + `topic`
- คืน content, metadata, relationships, และ fallback state ให้ UI

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

## 11. Homepage / Entry Experience

### Routes

- `/` — redirect ไป `/{defaultLocale}` (`/th`)
- `/th` และ `/en` — homepage ของ locale นั้น

### Layout

```text
┌─────────────────────────────────────────────────────┐
│  [Hero]                                              │
│   SEA brand + positioning tagline                   │
│   Search bar (prominent, locale-aware)              │
├─────────────────────────────────────────────────────┤
│  [Area Grid]                                         │
│   9 cards (1 per Atlas Area)                        │
│   แต่ละ card: icon, area name, brief description,   │
│   topic count                                       │
├─────────────────────────────────────────────────────┤
│  [Featured Starting Topics]                          │
│   2-3 topic cards แบบ curated — เพื่อให้ผู้อ่าน    │
│   ใหม่มี entry point ที่ชัด                         │
├─────────────────────────────────────────────────────┤
│  [Static Lifecycle Map / Relationship Strip]        │
│   Phase 1: static, scrollable, non-interactive       │
│   Phase 5+: upgrade เป็น interactive graph viewer   │
└─────────────────────────────────────────────────────┘
```

### Design Decisions

- ห้ามใช้ "latest posts" หรือ date-sorted content เป็น primary pattern บน homepage
- Search bar อยู่ใน hero — prominent ไม่ใช่แค่ icon ใน nav
- Area Grid คือ navigation path หลัก — ออกแบบให้ scan ได้เร็ว
- Featured Topics คือ curated ไม่ใช่ algorithmic
- Static Lifecycle Map ต้องมีตั้งแต่ Phase 1 เพื่อให้หน้าแรกสื่อว่า SEA เป็น atlas ไม่ใช่ docs directory
- Interactive graph behavior เก็บไว้ Phase 5+ และต้อง degrade กลับเป็น static/scrollable view ได้

---

## 12. Area Index Page

### Route

`/{locale}/{area}` เช่น `/th/architecture`

### Breadcrumb

`Home > Architecture` หรือ `หน้าแรก > สถาปัตยกรรม` ตาม locale

### Page Layout

```text
┌─────────────────────────────────────────────────────┐
│  [Area Header]                                       │
│   Area title + description                          │
│   Lifecycle position: "อยู่ใน SDLC ช่วงไหน"        │
├─────────────────────────────────────────────────────┤
│  [Topic Cards Grid]                                  │
│   แสดง TopicCard ทุก topic ใน area นี้             │
├─────────────────────────────────────────────────────┤
│  [Related Areas]                                     │
│   Chip links ไปยัง area อื่นที่ connect กัน        │
├─────────────────────────────────────────────────────┤
│  [Empty State]   ← ถ้ายังไม่มี topic              │
│   "ยังไม่มีหัวข้อในหมวดนี้"                         │
│   link กลับ homepage                                │
└─────────────────────────────────────────────────────┘
```

### Empty State

แสดงเมื่อ area ยังไม่มี topic ใด ๆ:

- ข้อความ: `"ยังไม่มีหัวข้อในหมวดนี้"` (ไทย) / `"No topics in this area yet"` (EN)
- Link กลับ homepage
- ไม่แสดง error หรือ 404 — area มีอยู่จริง แค่ยังไม่มี content

### Area Metadata

Area header ต้องดึงข้อมูลจาก typed data file ไม่ใช่ hard-code ใน UI:

```text
/src/data/
  areas.ts    # typed area metadata: id, localized label/description, lifecyclePosition, relatedAreas
```

---

## 13. Component Patterns

### TopicCard

ใช้ใน: area index page, homepage featured topics, related topics section

**Props contract (design-level — ไม่ใช่ TypeScript จริง):**

| Prop | Type | Description |
| --- | --- | --- |
| `title` | string | ชื่อ topic ตาม locale |
| `summary` | string | 1-2 ประโยค สรุป topic |
| `area` | string | area slug |
| `areaLabel` | string | ชื่อ area ตาม locale สำหรับแสดงใน card |
| `layers` | `{ article: boolean, reference: boolean, viewer: boolean }` | layer ที่มี content แล้ว |
| `hasTranslation` | boolean | มี content ใน locale อื่นหรือเปล่า |
| `href` | string | route ไปยัง topic |

**Visual:**

- Title (bold)
- Summary excerpt (2 lines max, ellipsis)
- Area tag (chip style) แสดง `areaLabel` ไม่ใช่ slug
- Layer badges: `Article`, `Reference`, `Viewer` — แสดงเฉพาะที่มี, greyed-out ถ้าไม่มี
- Fallback badge: `"ไม่มีเวอร์ชัน EN"` หรือ `"No Thai version"` ตาม locale ปัจจุบัน

---

### Callout

ใช้ใน: article, reference panel

| Type | Color | Icon name | ใช้เมื่อ |
| --- | --- | --- | --- |
| `note` | `info` (Sky) | `info` | ข้อมูลเพิ่มเติมทั่วไป |
| `tip` | `success` (Green) | `check-circle` | คำแนะนำที่ actionable |
| `warning` | `warning` (Amber) | `alert-triangle` | ต้องระวัง / common mistake |
| `enterprise` | `accent` (Indigo) | `building-2` | บริบท enterprise โดยเฉพาะ |
| `definition` | neutral surface | `book-open` | นิยาม term / glossary |

Icon names เป็น semantic contract เท่านั้น implementation ควร map ไปยัง icon library ที่ใช้อยู่ เช่น `lucide-react`

**Visual:**

- Colored left border (4px)
- Semantic icon + optional bold title บรรทัดแรก
- Body prose
- ไม่มี background สีจัดจ้าน — subtle tint เท่านั้น

---

### SidebarAreaGroup

**Props contract:**

| Prop | Type | Description |
| --- | --- | --- |
| `area` | string | area slug |
| `label` | string | ชื่อ area ตาม locale |
| `href` | string | route ไปยัง area index |
| `iconName` | optional string | semantic icon หรือ compact marker |
| `topics` | `{ href, label, isActive }[]` | topics ใน group |
| `isExpanded` | boolean | default: false ยกเว้น active area |
| `hasActiveTopic` | boolean | drive active visual state |

Group header แสดง localized label และเป็น link ไป area index ส่วน chevron หรือ disclosure control ใช้ expand/collapse group

---

### ViewerSkeleton

ใช้ระหว่าง lazy-load ของ viewer component

- Full-width block, height = ประมาณ viewer จริง (เช่น 400px)
- Animated pulse (Tailwind `animate-pulse`)
- สีจาก `surface-raised` — ไม่ใช้สีสว่างจนฉูดฉาด
- ไม่มีข้อความใน skeleton — ใช้ shape เท่านั้น

---

## 14. Loading States & Transitions

### Skeleton States

| Component | Skeleton Shape |
| --- | --- |
| `ViewerSkeleton` | Full-width block 400px, animated pulse |
| Topic card (loading) | Card shape: title bar 60%, summary bar 100%+80%, badge row |
| Sidebar (loading) | 5-6 stacked rows ความยาวสลับกัน |

### Transition Principles

- ทุก transition ต้องรองรับ `prefers-reduced-motion: reduce` — ถ้า user ตั้งค่านี้ ให้ตัด animation ออกทันที
- Sidebar collapse/expand: 150ms `ease-out`
- Viewer mount (fade-in): 200ms `ease-in`
- Hover states: 100ms
- Locale switch: route transition ปกติ ไม่มี custom animation
- ห้ามใช้ spring/bounce หรือ delay > 300ms ในทุกกรณี

---

## Relation to Other Foundation Docs

| Doc | ครอบคลุม | DESIGN.md เพิ่ม |
| --- | --- | --- |
| `docs/sea-product-brief.md` | WHY - vision, audience, principles, brand | HOW - how it looks and is built |
| `docs/content-model.md` | WHAT - content layers, locale model, relationships | HOW - presentation and component patterns |
| `docs/roadmap.md` | WHEN - phases and deliverables | Design reference ที่ Phase 2 builds from |
