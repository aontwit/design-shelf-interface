# Design.Shelf — Design System

Single source of truth สำหรับธีมของแอปนี้ ทุกหน้า/คอมโพเนนต์ใหม่ต้องตามนี้เป๊ะ
(ตัวอย่างที่มีชีวิตของทุก token อยู่ที่หน้า `#/design` ในแอป)

แอปคือ: คลังสกรีนช็อตดีไซน์ local — อ่านรูปจากโฟลเดอร์, จัดกลุ่มตามประเภทดีไซน์
(landing / dashboard / mobile ฯลฯ), คลิกภาพเปิด modal แสดงภาพใหญ่ + แท็กคีย์เวิร์ด +
ปุ่ม "Copy image prompt" และ "Copy brief" (copy ลง clipboard พร้อม pill feedback
สีเขียวนีออนลอยกลางล่างจอ)

สไตล์: ธีม dark space แบบ NFT landing (อ้างอิงระบบ Orbis.Nft)

## Fonts (Google Fonts)

| Font | ใช้กับ | กติกา |
|---|---|---|
| **Anton** | ทุก heading, nav, ปุ่มใหญ่ | uppercase เสมอ |
| **Condiment** | cursive accent ทับ heading | normal-case เสมอ |
| **IBM Plex Mono** | body, label, metadata | uppercase, letter-spacing 0.04–0.08em |

## Colors

| Token | Hex | ใช้กับ |
|---|---|---|
| bg | `#010828` | พื้นหลัง deep navy |
| cream | `#EFF4FF` | ตัวอักษรทั้งหมด |
| neon | `#6FFF00` | accent: ตัว cursive, แถบใต้ปุ่ม, pill feedback |
| purple A | `#b724ff` | จุดเริ่ม gradient ปุ่มลูกศรวงกลม |
| purple B | `#7c3aed` | จุดจบ gradient ปุ่มลูกศรวงกลม |

ห้ามเพิ่มสีอื่น

## Liquid glass

ใช้กับ navbar, การ์ด, tag, overlay bar, กล่อง social:

```css
.liquid-glass{background:rgba(255,255,255,.01);background-blend-mode:luminosity;backdrop-filter:blur(4px);border:none;box-shadow:inset 0 1px 1px rgba(255,255,255,.1);position:relative;overflow:hidden}
.liquid-glass::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.4px;background:linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.15) 20%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 60%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
```

## Texture overlay

เลเยอร์ fixed เต็มจอ z-50 pointer-events-none, noise texture, mix-blend-mode lighten, opacity 0.6

## โครงหน้า

max-width **1831px** ทุก section

- **HERO** — เต็ม viewport มุมล่างโค้ง 32px, nebula + ดาว
- **COLLECTION** — heading "COLLECTION OF [saved] SCREENS" + กริดการ์ด liquid-glass 3/2/1
- **MODAL** — สองคอลัมน์ + cursive หมวดทับมุมชื่อ
- **CTA** — มุมบนโค้ง 32px ข้อความชิดขวา + กล่อง social ซ้ายล่าง
- **FOOTER** — แถบบางท้ายหน้า: logo ซ้าย / ลิงก์กลาง / fine print ขวา
- **DESIGN** (`#/design`) — หน้า design system: token ทุกตัวเป็นตัวอย่างจริง คลิก copy ได้

รัศมีมุม: section 32px / media 24px

## ห้าม

- อีโมจิใน UI
- สีนอกระบบ
- เงา blur อื่นนอกจากเงาม่วงของปุ่มวงกลม
- ตัวอักษร normal-case ยกเว้น Condiment
