# SEA Product Brief

## Vision

**Software Engineering Atlas (SEA)** คือเว็บแผนที่ความรู้ด้าน software engineering ที่ช่วยให้ Ken เก็บ ทบทวน เชื่อมโยง และอธิบายความรู้สายพัฒนา software ตั้งแต่ business/process ไปจนถึง architecture, code, database, testing, deployment, security และ UX/UI ในรูปแบบที่อ่านง่าย เห็นภาพ และ interactive มากกว่า Markdown ธรรมดา

English positioning:

> Software Engineering Atlas is a visual knowledge base for software engineering, architecture, and enterprise web applications.

SEA เริ่มจากการเป็นพื้นที่เรียนรู้ส่วนตัว แต่ถูกออกแบบให้โตเป็น public knowledge product ได้ในอนาคต

## What SEA Is Not

SEA ไม่ควรถูกออกแบบเป็นแค่:

- Blog ที่เรียงบทความตามวันที่
- Personal note dump ที่เก็บทุกอย่างแบบไม่เป็นระบบ
- Encyclopedia ที่แปลนิยามจาก textbook อย่างเดียว
- Docs site ที่มีแต่ Markdown ไม่มี visual หรือ interaction

SEA ควรเป็น atlas: คนอ่านควรรู้ว่าหัวข้อหนึ่งอยู่ตรงไหนของ software development lifecycle และเกี่ยวข้องกับหัวข้ออื่นยังไง

## Audience

กลุ่มหลักของ SEA มี 3 กลุ่ม:

- **Ken / thearnon** - ใช้เป็นคลังความรู้ส่วนตัว พื้นที่ทบทวน และระบบจัดระเบียบความคิด
- **Developer / software engineer ที่กำลังเรียนรู้ภาพรวม** - โดยเฉพาะคนที่เริ่มเข้าใจว่า software มีมากกว่า code
- **คนที่สนใจ enterprise web application** - เช่น internal tools, approval systems, KPI systems, dashboards, และ workflow digitization

## Core Principles

- **Atlas over blog** - เชื่อมโยง concept เป็นแผนที่ ไม่ใช่บทความลอย ๆ
- **Practical over abstract** - อธิบายจากงานจริง ไม่ใช่แค่นิยาม
- **Visual over text-only** - ใช้ diagram, matrix, decision tree, viewer, และ interactive UI เมื่อช่วยให้เข้าใจชัดขึ้น
- **Structured over scattered** - แยก content, data, viewer, และ schema ให้ agent กับคนช่วยกันดูแลได้
- **Bilingual by design** - ภาษาไทยเป็น default และภาษาอังกฤษเป็น alternate ไม่ใช่ส่วนเสริมที่ค่อยแปะทีหลัง

## Atlas Areas

SEA ควรครอบคลุมพื้นที่ความรู้หลักเหล่านี้:

- Project / Process Level
- Requirement / Business Level
- Architecture Level
- Code Design Level
- Database Level
- Testing Level
- Deployment / Operation Level
- Security Level
- UX/UI Level

ตัวอย่างการเชื่อมโยง:

```text
User Story
  -> Acceptance Criteria
  -> Workflow
  -> Architecture
  -> Database Design
  -> Testing
  -> Deployment
  -> Observability
```

เป้าหมายไม่ใช่แค่ตอบว่า "คำนี้คืออะไร" แต่ช่วยให้เห็นว่าคำนั้นอยู่ตรงไหนของระบบ software ทั้งก้อน

## Content Layers

SEA content มี 3 ชั้น:

1. **Article** - บทความอ่านง่าย เป็น entry point ของหัวข้อ
2. **Knowledge Base / Reference** - เนื้อหา structured สำหรับทบทวนและค้นกลับ
3. **Interactive Viewer** - เครื่องมือ visual หรือ interactive ที่ทำให้ concept ใช้งานได้จริง

ตัวอย่าง viewer ที่เหมาะกับ SEA:

- Knowledge Map
- Comparison Matrix
- Decision Tree
- Workflow Viewer
- Permission Matrix
- Architecture Layer Viewer
- Testing Pyramid Viewer
- CI/CD Pipeline Viewer
- UX Checklist Viewer

## Practical Enterprise Angle

เอกลักษณ์ของ SEA คือการเชื่อมทฤษฎีกับงานจริง โดยเฉพาะงาน enterprise internal web application

ทุกหัวข้อควรตอบคำถามแนวนี้ได้เมื่อเหมาะสม:

- เรื่องนี้ใช้จริงในระบบองค์กรยังไง
- เกี่ยวกับ approval workflow, requirement, data, role, permission, หรือ reporting ยังไง
- ถ้าออกแบบผิดจะ maintain ยากตรงไหน
- ควรใช้แค่ไหนถึงไม่ over-engineer
- มี trade-off อะไรในระบบที่ต้องอยู่กับ business change นาน ๆ

## Brand

ชื่อหลัก:

```text
Software Engineering Atlas
```

ชื่อย่อ:

```text
SEA
```

Brand line:

```text
Software Engineering Atlas
A visual knowledge base for software engineering, architecture, and enterprise web applications.

by thearnon
```

`by thearnon` ช่วยผูกกับ personal brand โดยไม่ทำให้ชื่อหลักดูเป็น personal blog เกินไป
