import { useEffect, useRef, useState } from 'react'

const ORDER = ['Landing', 'Dashboard', 'Mobile', 'Spec']
const NAV = ['All screens', 'Landing', 'Dashboard', 'Mobile']

const SPEC = `สร้างเว็บแอป local "Design.Shelf": คลังสกรีนช็อตดีไซน์ อ่านรูปจากโฟลเดอร์ที่กำหนด, จัดกลุ่มตามประเภทดีไซน์ (landing / dashboard / mobile ฯลฯ), คลิกภาพเปิด modal แสดงภาพใหญ่ + แท็กคีย์เวิร์ด + ปุ่ม "Copy image prompt" และ "Copy brief" (copy ลง clipboard พร้อม pill feedback สีเขียวนีออนลอยกลางล่างจอ)

สไตล์: ธีม dark space แบบ NFT landing (อ้างอิงระบบ Orbis.Nft) — ต้องตามนี้เป๊ะ:

FONTS (Google Fonts): Anton (ทุก heading, nav, ปุ่มใหญ่ — uppercase เสมอ) / Condiment (cursive accent ทับ heading — normal-case เสมอ) / IBM Plex Mono (body, label, metadata — uppercase, letter-spacing 0.04-0.08em)

COLORS: พื้นหลัง #010828 (deep navy), cream #EFF4FF (ตัวอักษรทั้งหมด), neon #6FFF00 (accent: ตัว cursive, แถบใต้ปุ่ม), ม่วง gradient #b724ff → #7c3aed (ปุ่มลูกศรวงกลม) ห้ามเพิ่มสีอื่น

LIQUID GLASS (ใช้กับ navbar, การ์ด, tag, overlay bar, กล่อง social):
.liquid-glass{background:rgba(255,255,255,.01);background-blend-mode:luminosity;backdrop-filter:blur(4px);border:none;box-shadow:inset 0 1px 1px rgba(255,255,255,.1);position:relative;overflow:hidden}
.liquid-glass::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.4px;background:linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.15) 20%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 60%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}

TEXTURE OVERLAY: เลเยอร์ fixed เต็มจอ z-50 pointer-events-none, noise texture, mix-blend-mode lighten, opacity 0.6

โครงหน้า (max-width 1831px ทุก section): HERO เต็ม viewport มุมล่างโค้ง 32px nebula+ดาว / COLLECTION heading "COLLECTION OF [saved] SCREENS" + กริดการ์ด liquid-glass 3/2/1 / MODAL สองคอลัมน์ + cursive หมวดทับมุมชื่อ / CTA มุมบนโค้ง 32px ข้อความชิดขวา + กล่อง social ซ้ายล่าง

ห้าม: อีโมจิใน UI, สีนอกระบบ, เงา blur อื่นนอกจากเงาม่วงของปุ่มวงกลม, ตัวอักษร normal-case ยกเว้น Condiment`

/* ---------- icons (SVG เดิมจาก mockup) ---------- */
const MailIcon = () => (
  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 4.5 6a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8.1 8.1 0 0 1 3 19.6 11.4 11.4 0 0 0 9.3 21c7.5 0 11.7-6.3 11.4-12 .8-.6 1.5-1.3 2-2.1" /></svg>
)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7.8 8.7a3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.5 9.5 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.8c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2" /></svg>
)
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></svg>
)

export default function App() {
  const [items, setItems] = useState(null) // null = loading, [] = error/empty
  const [cat, setCat] = useState('All screens')
  const [cur, setCur] = useState(null)
  const [toast, setToast] = useState('')
  const toastTimer = useRef()

  useEffect(() => {
    fetch('/data.json').then((r) => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setCur(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const flash = (m) => {
    setToast(m)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 1600)
  }
  const copy = (text, msg) => {
    navigator.clipboard.writeText(text).then(() => flash(msg)).catch(() => flash('copy failed'))
  }

  const pool = cat === 'All screens' ? items || [] : (items || []).filter((i) => i.category === cat)
  const groups = ORDER.map((c) => ({ c, list: pool.filter((i) => i.category === c) })).filter((g) => g.list.length)

  const pickCat = (c) => {
    setCat(c)
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="texture" />

      {/* ============ HERO ============ */}
      <section className="hero space">
        <div className="nebula" /><div className="stars" />
        <div className="wrap hero-head">
          <div className="logo">Design.Shelf</div>
          <nav className="nav liquid-glass">
            {NAV.map((c) => (
              <a key={c} className={cat === c ? 'on' : ''} onClick={() => pickCat(c)}>{c}</a>
            ))}
            <a href="#handoff">Spec</a>
          </nav>
        </div>
        <div className="wrap hero-main">
          <div className="hero-inner">
            <div className="h-title">
              <h1>Every screen<br /><span className="paren">(</span> you <span className="paren">)</span> ever saved</h1>
              <span className="h-script">design shelf</span>
            </div>
          </div>
        </div>
        <div className="wrap hero-foot">
          <p>A local archive of screens fixed beyond time and place. Sorted, tagged, ready to prompt.</p>
          <div className="scroll-cue">scroll<i /></div>
        </div>
      </section>

      {/* ============ COLLECTION ============ */}
      <section className="collection" id="collection">
        <div className="wrap">
          <div className="col-head">
            <h2 className="col-title">Collection of<span className="ind"><span className="sc">saved</span>screens</span></h2>
            <button className="seeall" onClick={() => setCat('All screens')}>
              <span className="r1"><span className="big">See</span><span className="stack"><span>all</span><span>folders</span></span></span>
              <span className="bar" />
            </button>
          </div>
          {items === null && <div className="empty">loading…</div>}
          {items !== null && !groups.length && (
            <div className="empty">ยังไม่มีสกรีนช็อตในหมวดนี้ — วางรูปแล้วรัน npm run scan</div>
          )}
          {groups.map((g) => (
            <div key={g.c}>
              <div className="group-row"><span className="g">{g.c}</span><span className="n">{String(g.list.length).padStart(2, '0')} files</span><span className="ln" /></div>
              <div className="grid">
                {g.list.map((it, i) => (
                  <Card key={it.id} item={it} phIndex={(i % 3) + 1} onOpen={() => setCur(it)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ MODAL ============ */}
      {cur && <Modal item={cur} onClose={() => setCur(null)} copy={copy} flash={flash} />}

      {/* ============ CTA ============ */}
      <section className="cta space">
        <div className="nebula" /><div className="stars" />
        <div className="wrap cta-inner">
          <div className="cta-block">
            <span className="cta-script">Go beyond</span>
            <h2><span className="first">Open the shelf.</span>Tag what's saved.<br />Prompt what's next.<br />Follow the signal.</h2>
          </div>
        </div>
        <div className="cta-social liquid-glass">
          <button><MailIcon />Mail</button>
          <button><TwitterIcon />Twitter</button>
          <button><GithubIcon />Github</button>
        </div>
      </section>

      {/* ============ HANDOFF ============ */}
      <section className="handoff" id="handoff">
        <div className="wrap">
          <div className="handoff-in">
            <div className="palette">
              {[
                { c: '#010828' },
                { c: '#EFF4FF', dark: true },
                { c: '#6FFF00', dark: true },
                { c: '#b724ff' },
                { c: '#7c3aed' },
              ].map(({ c, dark }) => (
                <button key={c} style={{ '--c': c }} onClick={() => copy(c, 'copied ' + c)}>
                  <i style={dark ? { color: '#010828' } : undefined}>{c}</i>
                </button>
              ))}
            </div>
            <button className="spec-btn" onClick={() => copy(SPEC, 'spec copied — paste in claude code')}>
              <span className="t">Copy spec → Claude Code</span><span className="bar" />
            </button>
          </div>
          <p>// spec รวมทุกอย่าง: liquid glass, texture overlay, ระบบฟอนต์ anton / condiment / mono, โครงหน้า, การ์ด, modal และปุ่มห้ามหลุดธีม — วางในช่อง claude code ได้ทันที</p>
        </div>
      </section>

      <div id="copied" className={toast ? 'show' : ''}>{toast}</div>
    </>
  )
}

function Card({ item, phIndex, onOpen }) {
  const [err, setErr] = useState(false)
  return (
    <div className="card liquid-glass" onClick={onOpen}>
      <div className="media">
        {err
          ? <div className={`ph ph-${phIndex}`} />
          : <img src={item.file} alt={item.name} loading="lazy" onError={() => setErr(true)} />}
        <div className="bar-ov liquid-glass">
          <div style={{ minWidth: 0 }}>
            <div className="lab">{item.name}</div>
            <div className="val">{(item.tags || []).length} tags</div>
          </div>
          <button className="go" aria-label="open"><ChevronIcon /></button>
        </div>
      </div>
    </div>
  )
}

function Modal({ item, onClose, copy, flash }) {
  const [size, setSize] = useState('…')
  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modalbox liquid-glass">
        <button className="mclose" aria-label="close" onClick={onClose}>✕</button>
        <div className="media">
          <img src={item.file} alt={item.name} onLoad={(e) => setSize(e.target.naturalWidth + ' × ' + e.target.naturalHeight)} />
        </div>
        <div>
          <h3>{item.name}<span className="msc">{item.category.toLowerCase()}</span></h3>
          <div className="meta-row">
            <span>Folder: {item.category.toLowerCase()}</span>
            <span>Added: {item.addedAt || '—'}</span>
            <span>{size}</span>
          </div>
          <div className="tags">
            {(item.tags || []).map((t) => <span key={t} className="liquid-glass">{t}</span>)}
          </div>
          <div className="acts">
            <button className="btn" onClick={() => item.imagePrompt ? copy(item.imagePrompt, 'image prompt copied') : flash('ยังไม่มี prompt — ให้ claude เติมก่อน')}>
              <span className="t">Copy image prompt</span><span className="bar" />
            </button>
            <button className="btn alt" onClick={() => item.brief ? copy(item.brief, 'brief copied') : flash('ยังไม่มี brief — ให้ claude เติมก่อน')}>
              <span className="t">Copy brief</span><span className="bar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
