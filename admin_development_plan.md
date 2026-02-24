# แผนพัฒนาเว็บไซต์และระบบจัดการเนื้อหา (CMS Development Plan)

## 1. เป้าหมายหลัก (Objectives)
- **ระบบจัดการเนื้อหา (CMS)**: สร้างระบบหลังบ้าน (Admin Panel) บน Frontend ที่ใช้งานง่าย ไม่ต้องเข้าถึง Strapi
- **รองรับหลายเว็บไซต์ (Multi-Site Support)**: แยกการจัดการระหว่าง DataGOV และ PDPA อย่างชัดเจน
- **ภาษาไทย (Localization)**: เมนูและข้อความทั้งหมดในระบบจัดการต้องเป็นภาษาไทย
- **ครบทุกหมวดหมู่ (Comprehensive Management)**: ควบคุมเนื้อหาหน้าบ้านได้ครบถ้วน (ข่าว, เอกสาร, ข้อมูลติดต่อ, แบนเนอร์)

## 2. โครงสร้างระบบ (Architecture)
### Backend (Strapi)
- **Content Types**:
  - `SiteConfig` (ตั้งค่าเว็บไซต์): ชื่อเว็บ, โลโก้, ข้อมูลติดต่อ, Hero Banner
  - `Feature` (จุดเด่น/หลักการ): สำหรับแสดงในหน้าแรกและหน้า PDPA
  - `Article` (ข่าว/กิจกรรม): ข้อมูลข่าวสาร
  - `PolicyDocument` (เอกสารเผยแพร่): เอกสารดาวน์โหลด
  - `ContactSubmission` (ข้อความจากผู้ใช้): ข้อมูลการติดต่อ

### Frontend (Next.js)
- **Admin Layout**: แยก Layout สำหรับหลังบ้านโดยเฉพาะ
- **Authentication**: ระบบ Login เชื่อมต่อกับ Strapi (JWT)
- **Role Control**: ตรวจสอบสิทธิ์การเข้าถึง (Admin Only)

## 3. แผนการดำเนินงาน (Implementation Steps)

### Phase 1: Authentication & Navigation (ระบบเข้าสู่ระบบและนำทาง)
- [x] สร้างหน้า Login (`/admin/login`)
- [x] ปรับปรุง Admin Layout ให้เป็นภาษาไทยทั้งหมด
- [x] เพิ่ม Context เพื่อแยกการทำงานระหว่าง DataGOV และ PDPA
- [x] สร้าง Sidebar Menu ที่เปลี่ยนตามบริบทของไซต์ที่เลือก

### Phase 2: Core Content Management (จัดการเนื้อหาหลัก)
- [x] **ตั้งค่าเว็บไซต์ (Site Settings)**
  - แก้ไขชื่อเว็บ, ประกาศตัววิ่ง, ข้อมูลติดต่อ (ที่อยู่/เบอร์โทร)
  - แก้ไข Hero Banner (หัวข้อ/คำโปรย)
- [x] **จัดการจุดเด่น/หลักการ (Features Management)** *New*
  - เพิ่ม/ลบ/แก้ไข Card ที่แสดงหน้าแรก (Highlights)
  - เพิ่ม/ลบ/แก้ไข Card ที่หน้า PDPA (Principles)

### Phase 3: Dynamic Content (เนื้อหาที่มีการเคลื่อนไหว)
- [x] **ข่าวประชาสัมพันธ์ (News & Activities)**
  - รายการข่าว (List View) พร้อมตัวกรอง
  - ฟอร์มสร้าง/แก้ไขข่าว (Rich Text Editor)
- [x] **เอกสารเผยแพร่ (Documents)**
  - รายการเอกสาร (List View)
  - ฟอร์มข้อมูลเอกสารและหมวดหมู่

### Phase 4: User Interaction (การตอบโต้กับผู้ใช้)
- [x] **จัดการคำร้องเรียน (Inbox)**
  - ดูรายการข้อความจาก Contact Form
  - เปลี่ยนสถานะ (รับเรื่อง/ดำเนินการ/เสร็จสิ้น)

## 4. ตัวอย่างหน้าจอ (UI Mockups)
- **Dashboard**: แสดงสรุปจำนวนคนเข้าชม, จำนวนเรื่องร้องเรียนใหม่
- **Site Config Form**: ฟอร์มกรอกข้อมูลพื้นฐาน พร้อม Preview
- **CMS Table**: ตารางจัดการข้อมูล พร้อมปุ่ม แก้ไข/ลบ

---
**สถานะปัจจุบัน**: เสร็จสิ้น Phase 1-4 เรียบร้อยแล้ว
