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

การเลือกรูปแบบจริงให้ตัดสินตอน scaffold Next.js/Fumadocs

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

Viewer ควรรับข้อมูลจาก structured data หรือ schema ที่ชัดเจน เพื่อให้แก้ data ได้โดยไม่ต้องแก้ component ทุกครั้ง

## Separation of Concerns

เมื่อเริ่ม app scaffold ให้รักษา boundary เหล่านี้:

- `content` - MDX pages และ prose
- `data` - structured knowledge เช่น nodes, edges, matrices, decisions, workflows
- `viewer` - React components สำหรับ render interactive views
- `schema` - TypeScript หรือ JSON schema สำหรับ validate shape ของ data

หลักคิด:

- Content อธิบาย
- Data จัดรูป
- Viewer แสดงผล
- Schema ตั้งกติกา

Boundary นี้ทำให้ทั้งคนและ AI agent ช่วยเขียน เติม ปรับ และตรวจ content ได้ง่ายขึ้น

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
