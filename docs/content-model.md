# SEA Content Model

## Purpose

เอกสารนี้นิยาม content model ขั้นต้นของ **Software Engineering Atlas (SEA)** เพื่อให้ future app scaffold, MDX content, structured data, viewer components, และ AI agent ทำงานไปในทิศทางเดียวกัน

ตอนนี้ยังเป็น concept-level contract ไม่ใช่ final schema

## Locale Model

SEA เป็น bilingual product ตั้งแต่ต้น:

- Default locale: `th`
- Alternate locale: `en`

ข้อกำหนดสำคัญ:

- ระบบในอนาคตควรมี language switch ระหว่างไทยกับอังกฤษ
- หน้าไทยและหน้าอังกฤษควรเป็น localized content ที่สัมพันธ์กัน ไม่ใช่ copy สองภาษาปนเต็มหน้าเดียวกันเสมอไป
- ภาษาไทยเป็น default เพราะเป็นภาษาหลักในการจัดระบบความคิดของ Ken
- ภาษาอังกฤษช่วยให้ project public-ready และใช้ technical vocabulary ได้ตรงกับ software industry

แนวคิด future route หรือ content key:

```text
/th/...
/en/...
```

หรือ content structure ที่เทียบเคียงกัน:

```text
content/th/...
content/en/...
```

การเลือกรูปแบบจริงให้ตัดสินตอน scaffold React/Vite/React Router/Fumadocs MDX

## Content Layers

### 1. Article

Article คือ entry point ที่อ่านง่ายสำหรับหัวข้อหนึ่ง

เหมาะกับคำถามเช่น:

- RBAC คืออะไร
- Clean Architecture ใช้จริงยังไง
- SDLC ต่างจาก Agile ยังไง
- User Story กับ Acceptance Criteria ต่างกันยังไง
- Database Indexing สำคัญยังไง

Article ควรเน้น context, example, practical use, และ connection ไปยัง reference หรือ viewer ที่เกี่ยวข้อง

### 2. Knowledge Base / Reference

Reference คือเนื้อหา structured สำหรับเปิดทบทวนเร็ว

Section พื้นฐานที่ใช้ซ้ำได้:

- Definition
- Why it matters
- When to use
- When not to use
- Common mistakes
- Related topics
- References

Reference ควรกระชับกว่า article และควรเชื่อมโยงไปยัง concept อื่นใน atlas

### 3. Interactive Viewer

Interactive Viewer คือส่วนที่ทำให้ SEA ต่างจาก Markdown/blog ทั่วไป

ตัวอย่าง:

- Knowledge Map
- Comparison Matrix
- Decision Tree
- Workflow Viewer
- Permission Matrix
- Architecture Layer Viewer
- Testing Pyramid Viewer
- CI/CD Pipeline Viewer
- UX Checklist Viewer

Viewer ควรรับข้อมูลจาก structured data ที่ validate ด้วย Zod และส่งเข้า component ผ่าน typed props เพื่อให้แก้ data ได้โดยไม่ต้องแก้ viewer ทุกครั้ง

## Primary Topic Layout

บท `RBAC คืออะไร` ที่ `src/content/th/architecture/rbac.mdx` เป็น reference implementation สำหรับ topic article หลักของ SEA ในช่วงแรก

ไม่จำเป็นต้องให้ทุกหัวข้อมี section เหมือนกันทุกคำ แต่หัวข้อหลักควรพาคนอ่านจาก concept ไปสู่การใช้งานจริงและความสัมพันธ์กับหัวข้ออื่นใน atlas

โครงที่ควรใช้เป็น default สำหรับหัวข้อหลัก:

```text
## [Topic] คืออะไร
## ทำไม [Topic] สำคัญในระบบองค์กร
## องค์ประกอบหลักของ [Topic]
## Case ตัวอย่าง: [enterprise internal tool scenario]
## จาก case สู่ [reference / matrix / viewer]
## [Topic] เชื่อมกับหัวข้ออื่นยังไง
## Common Mistakes
## Checklist ตอนออกแบบ [Topic]
## อ่านต่อจากหัวข้อนี้
## Viewer ที่เกี่ยวข้อง
```

หลักการของ layout นี้:

- เริ่มจากนิยามที่อ่านง่ายก่อนลงรายละเอียด
- อธิบายจากมุม enterprise web application ไม่ใช่ textbook อย่างเดียว
- มี case จริงหรือ scenario ที่ทำให้ role, workflow, data, UI, testing และ audit เชื่อมกันได้
- แปลง case เป็น reference หรือ viewer เมื่อเหมาะสม เช่น matrix, checklist, decision tree หรือ workflow
- แยกหัวข้อใกล้เคียงให้ชัดว่าเหมือนกัน ต่างกัน เกี่ยวข้องกัน หรือใช้คู่กันยังไง
- จบด้วย common mistakes, checklist และหัวข้อที่ควรอ่านต่อ เพื่อให้บทความเป็นทั้ง article และ reference

สำหรับหัวข้อที่มี viewer ให้รักษาความสอดคล้องระหว่าง prose, structured data และ viewer เช่น RBAC article ใช้ case credit limit request และ permission matrix data ใช้ action จาก case เดียวกัน

ถ้าบทหนึ่งยังเป็น seed content ให้เริ่มจาก 3 section ขั้นต่ำ:

```text
## ใช้จริงในระบบองค์กรยังไง
## เชื่อมกับหัวข้ออื่นยังไง
## สิ่งที่ควรระวัง
```

เมื่อหัวข้อนั้นกลายเป็น topic หลัก ให้ยกระดับเป็น primary topic layout ด้านบน

## Separation of Concerns

เมื่อเริ่ม app scaffold ให้รักษา boundary เหล่านี้:

- `content` - MDX pages และ prose
- `data` - structured knowledge เช่น nodes, edges, matrices, decisions, workflows โดย prefer typed `.ts`
- `viewer` - React components สำหรับ render interactive views ด้วย typed props
- `schema` - Zod schemas และ inferred TypeScript types สำหรับ validate shape ของ data
- `search` - local metadata index ใน Phase 1 และ Pagefind full-text static search ใน Phase 2

หลักคิด:

- Content อธิบาย
- Data จัดรูป
- Viewer แสดงผล
- Schema ตั้งกติกา
- Search ช่วยค้นหาและสำรวจ atlas

Boundary นี้ทำให้ทั้งคนและ AI agent ช่วยเขียน เติม ปรับ และตรวจ content ได้ง่ายขึ้น

## Data Contract Rules

- Structured content ต้อง validate ด้วย Zod ก่อนส่งให้ viewer
- ใช้ TypeScript inferred types จาก Zod schema เพื่อลดการเขียน type ซ้ำ
- หลีกเลี่ยง `any`
- prefer typed `.ts` data files over raw `.json` เมื่อ data ต้องถูก import เข้า viewer หรือ test
- raw `.json` ใช้ได้เฉพาะกรณี tool ต้องการ format นั้นจริง ๆ
- `tsc --noEmit` เป็น required gate ก่อนถือว่างาน implementation เสร็จ

## Initial Topic Shape

หนึ่ง topic ใน SEA อาจมีส่วนประกอบแบบนี้:

```text
Topic: RBAC
Locales: th, en
Article: approachable explanation
Reference: definition, use cases, mistakes, related topics
Viewer: permission matrix or decision tree
Relations: authentication, authorization, user roles, approval workflow, audit log
```

Topic ไม่จำเป็นต้องมีครบทุก layer ตั้งแต่วันแรก แต่ควรออกแบบให้เพิ่ม layer ได้ภายหลังโดยไม่ต้องย้ายโครงสร้างใหญ่

## Relationship Model

SEA ต้องรักษาความเป็น atlas ด้วย relationship ระหว่างหัวข้อ

ความสัมพันธ์เบื้องต้น:

- prerequisite
- related
- part-of
- compared-with
- used-in
- leads-to

ตัวอย่าง:

```text
User Story -> Acceptance Criteria -> Workflow -> Testing
RBAC -> Permission Matrix -> Audit Log -> Security Review
Database Index -> Query Performance -> Observability
```

Relationship เหล่านี้จะใช้ได้ทั้งใน navigation, knowledge map, related topics, และ future viewer components

