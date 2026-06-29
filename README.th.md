# Software Engineering Atlas (SEA)

[English](README.md) | [ไทย](README.th.md)

**Software Engineering Atlas** หรือ **SEA** คือแผนที่ความรู้แบบ interactive และ bilingual สำหรับ software engineering ที่ใช้งานได้จริง

> A visual knowledge base for software engineering, architecture, and enterprise web applications.
>
> by thearnon

SEA เชื่อมโยงแนวคิดตลอด software development lifecycle ตั้งแต่ requirement, process, architecture, code design, database, testing, deployment, security ไปจนถึง UX/UI

มุมมองหลักของโปรเจกต์คือการสร้างระบบเว็บองค์กรจริง เช่น internal tools, approval systems, dashboards, KPI systems, workflow systems, และ business software ที่ดูแลต่อได้ระยะยาว

## SEA คืออะไร

SEA ไม่ใช่ blog ตามวันที่ และไม่ใช่ที่เก็บ note แบบกระจัดกระจาย แต่เป็น knowledge product ที่มีโครงสร้าง:

- **Visual knowledge base** สำหรับเก็บและทบทวนความรู้ software engineering
- **Learning map** สำหรับเห็นความสัมพันธ์ระหว่างหัวข้อ
- **Reference system** สำหรับกลับมาเปิดดู concept, pattern, trade-off, และ common mistake
- **Interactive documentation** สำหรับ viewer, matrix, decision tree, workflow, และ diagram

เป้าหมายคือเปลี่ยนความรู้ที่กระจัดกระจายใน chat, note, file, และ article ให้กลายเป็นระบบเดียวที่อ่านง่าย สำรวจง่าย และต่อยอดเป็น public knowledge product ได้

## กลุ่มเป้าหมาย

- **Ken / thearnon** - ใช้เป็นคลังความรู้ส่วนตัว พื้นที่ทบทวน และระบบจัดระเบียบความคิด
- **Developer ที่กำลังเรียนรู้ภาพรวมของ software** - โดยเฉพาะคนที่เริ่มเห็นว่า software ไม่ใช่แค่ code
- **คนที่สนใจ enterprise web application** - เช่น internal tools, approval systems, KPI systems, dashboards, และ workflow digitization

## Content Layers

SEA content แบ่งเป็น 3 ชั้น:

1. **Article** - บทความอ่านง่าย เป็น entry point ของหัวข้อ
2. **Knowledge Base / Reference** - เนื้อหา structured สำหรับทบทวนและค้นกลับ
3. **Interactive Viewer** - เครื่องมือ visual หรือ interactive ที่ทำให้ concept มองเห็นและใช้งานได้จริง

ตัวอย่าง viewer ได้แก่ knowledge map, comparison matrix, decision tree, workflow viewer, permission matrix, architecture layer viewer, และ testing pyramid viewer

## Language Model

SEA เป็น bilingual product ตั้งแต่ต้น:

- Default locale: `th`
- Alternate locale: `en`

หน้าไทยและหน้าอังกฤษควรเป็น localized page หรือ content entry จริง ไม่ใช่การผสม full copy สองภาษาไว้ในทุกหน้าเสมอไป คำ technical term เช่น `workflow`, `architecture`, `deployment`, `RBAC`, `schema`, และ `viewer` สามารถคงเป็นภาษาอังกฤษได้เมื่อช่วยให้สื่อสารชัดกว่า

## Technical Direction

App foundation ใช้:

- **React + Vite** เป็น core app
- **React Router** สำหรับ locale-aware routes
- **TypeScript strict** สำหรับ application code
- **Fumadocs Core + Fumadocs MDX** สำหรับ content source และ MDX pipeline
- **MDX** สำหรับ content และการฝัง viewer components
- **Tailwind CSS** สำหรับ styling
- **Zod + inferred TypeScript types** สำหรับ data contracts
- **Typed React viewer components** สำหรับ interactive views
- **Vitest + Playwright + `tsc --noEmit`** เป็น quality gates
- **Local metadata search index** ก่อน แล้วค่อยเพิ่ม Pagefind ภายหลัง

Boundary สำคัญ:

- `content` - localized MDX pages และ prose
- `data` - typed structured knowledge data
- `viewer` - React components สำหรับ interactive views
- `schema` - Zod schemas และ inferred TypeScript types
- `search` - local metadata index และ future Pagefind integration

## Foundation Docs

- [Design Reference](DESIGN.md)
- [SEA Product Brief](docs/sea-product-brief.md)
- [Content Model](docs/content-model.md)
- [Roadmap](docs/roadmap.md)
- [Agent Instructions](AGENTS.md)

## Current Status

ตอนนี้ repository มี initial SEA app foundation แล้ว:

- React + Vite + React Router app shell
- Locale-aware homepage, area index pages, และ topic pages
- Typed metadata สำหรับ 9 Atlas Areas
- Strict TypeScript setup
- Fumadocs MDX/Core content pipeline
- Tailwind CSS styling
- Zod-validated typed viewer data
- Initial bilingual RBAC topic พร้อม related seed topics
- Permission Matrix viewer
- Local metadata search index
- Vitest unit tests และ Playwright e2e smoke tests

## Useful Commands

บน Windows PowerShell ให้ใช้ `npm.cmd` ถ้า `npm.ps1` ถูก block จาก execution policy

```powershell
npm.cmd run dev
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```
