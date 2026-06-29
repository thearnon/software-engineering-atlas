# Software Engineering Atlas (SEA)

**Software Engineering Atlas** หรือ **SEA** คือแผนที่ความรู้แบบ interactive สำหรับสำรวจ เรียนรู้ และเชื่อมโยงแนวคิดด้าน software engineering ตั้งแต่ requirement, process, architecture, code design, database, testing, deployment, security ไปจนถึง UX/UI โดยเน้นการอธิบายแบบ practical จากมุมมองการสร้างระบบเว็บองค์กรจริง

> A visual knowledge base for software engineering, architecture, and enterprise web applications.
>
> by thearnon

## SEA คืออะไร

SEA ไม่ใช่แค่ blog และไม่ใช่แค่ note ส่วนตัว แต่เป็น:

- **Visual knowledge base** สำหรับเก็บและทบทวนความรู้
- **Learning map** สำหรับเห็นความสัมพันธ์ของหัวข้อ software engineering
- **Reference system** สำหรับกลับมาเปิดดู concept, pattern, trade-off, และ mistake ได้เร็ว
- **Interactive documentation** สำหรับ viewer, matrix, decision tree, workflow, และ diagram ที่ช่วยให้เข้าใจมากกว่า Markdown ธรรมดา

แนวคิดหลักคือทำให้ความรู้ที่มักกระจัดกระจายใน chat, note, file, และ article กลายเป็นระบบเดียวที่อ่านง่าย เห็นภาพ และต่อยอดเป็นเว็บความรู้สาธารณะได้

## English Summary

Software Engineering Atlas is an interactive bilingual knowledge atlas for practical software engineering. It connects concepts across the software development lifecycle, from business requirements and workflows to architecture, code design, databases, testing, deployment, security, and UX/UI.

SEA is designed as a knowledge product, not a chronological blog. Articles are entry points, references are structured knowledge, and interactive viewers make abstract concepts visible and usable.

## กลุ่มเป้าหมาย

- **Ken / thearnon** ใช้เป็นคลังความรู้ส่วนตัว พื้นที่ทบทวน และระบบจัดระเบียบความคิด
- **Developer / software engineer ที่กำลังเรียนรู้ภาพรวม** โดยเฉพาะคนที่เริ่มเห็นว่า software ไม่ใช่แค่ code
- **คนที่สนใจ enterprise web application** เช่น internal tools, approval systems, KPI systems, dashboards, และ workflow digitization

## Content Layers

SEA content แบ่งเป็น 3 ชั้นหลัก:

1. **Article** - บทความอ่านง่าย เช่น RBAC คืออะไร, Clean Architecture ใช้จริงยังไง, SDLC ต่างจาก Agile ยังไง
2. **Knowledge Base / Reference** - เนื้อหา structured สำหรับทบทวน เช่น definition, why it matters, when to use, common mistakes, related topics
3. **Interactive Viewer** - เครื่องมือเห็นภาพ เช่น knowledge map, comparison matrix, decision tree, workflow viewer, permission matrix, architecture layer viewer

## Language Model

ภาษา default ของ SEA คือ `th` และมี `en` เป็น alternate language สำหรับ public/global reach

เป้าหมายของระบบภาษาในอนาคตคือมี language switch ระหว่างไทยกับอังกฤษจริง ไม่ใช่การผสมสองภาษาไว้ในหน้าเดียวเสมอไป คำ technical term ภาษาอังกฤษสามารถคงไว้ได้เมื่อช่วยให้เข้าใจตรงกับ industry vocabulary

## Technical Direction

Stack ที่ตั้งใจใช้เมื่อเริ่ม scaffold app:

- **React + Vite** เป็น core app foundation
- **React Router** สำหรับ locale-aware routing และ topic routes
- **TypeScript strict** สำหรับ application code ทั้งหมด
- **Fumadocs Core + Fumadocs MDX** สำหรับ content source และ MDX pipeline
- **MDX** สำหรับเขียนเนื้อหาและฝัง viewer components
- **Tailwind CSS** สำหรับ styling/design system
- **Zod + TS inferred types** สำหรับ data contract
- **React viewer components** ที่รับ typed props และ validated data
- **Vitest + Playwright + `tsc --noEmit`** สำหรับ quality gates
- **Local metadata index** ก่อน แล้วค่อยเพิ่ม Pagefind full-text static search

แนวคิดโครงสร้างในอนาคต:

- `content` - เนื้อหา MDX
- `data` - ข้อมูล structured แบบ typed `.ts` เป็นหลัก
- `viewer` - React components สำหรับแสดงผล
- `schema` - Zod schemas และ inferred TypeScript types
- `search` - metadata index และ future Pagefind integration

## Foundation Docs

- [Design Reference](DESIGN.md)
- [SEA Product Brief](docs/sea-product-brief.md)
- [Content Model](docs/content-model.md)
- [Roadmap](docs/roadmap.md)
- [Agent Instructions](AGENTS.md)

## Current Status

ตอนนี้ repository นี้มี **Phase 2 app scaffold** แล้ว:

- React + Vite + React Router app shell
- Strict TypeScript setup
- Fumadocs MDX/Core content pipeline
- Tailwind CSS styling
- Zod-validated typed data
- Initial bilingual RBAC topic
- Permission Matrix viewer
- Local metadata search index
- Vitest unit tests and Playwright e2e smoke test

Useful commands:

- `npm.cmd run dev`
- `npm.cmd test`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- `npm.cmd run test:e2e`
