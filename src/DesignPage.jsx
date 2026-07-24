// Living style guide — source of truth is DESIGN.md; this page renders every token.

const COLORS = [
  { c: '#010828', label: 'bg' },
  { c: '#EFF4FF', label: 'cream', dark: true },
  { c: '#6FFF00', label: 'neon', dark: true },
  { c: '#b724ff', label: 'purple a' },
  { c: '#7c3aed', label: 'purple b' },
]

const GLASS = `.liquid-glass{background:rgba(255,255,255,.01);background-blend-mode:luminosity;backdrop-filter:blur(4px);border:none;box-shadow:inset 0 1px 1px rgba(255,255,255,.1);position:relative;overflow:hidden}
.liquid-glass::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.4px;background:linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.15) 20%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 60%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}`

const RULES = [
  'max-width 1831px ทุก section — radius 32px / media 24px',
  'grid การ์ด 3 / 2 / 1 คอลัมน์ (1024px / 640px)',
  'texture overlay: fixed เต็มจอ, noise, mix-blend lighten, opacity .6',
  'พื้นหลัง space: nebula gradients + ดาว twinkle',
  'ห้าม: อีโมจิใน UI, สีนอกระบบ, normal-case ยกเว้น Condiment',
]

function Row({ g, n }) {
  return (
    <div className="group-row"><span className="g">{g}</span><span className="n">{n}</span><span className="ln" /></div>
  )
}

export default function DesignPage({ copy }) {
  return (
    <main className="ds">
      <div className="wrap">
        <div className="ds-head">
          <a className="logo" href="#/">Design.Shelf</a>
          <a className="ds-back mono-body" href="#/">← back to shelf</a>
        </div>

        <h1 className="col-title">Design<span className="ind"><span className="sc">living</span>system</span></h1>
        <p className="ds-note">// source of truth: DESIGN.md — หน้านี้คือ token ทุกตัวแบบมีชีวิต คลิกเพื่อ copy</p>

        <Row g="Colors" n="05 tokens" />
        <div className="palette">
          {COLORS.map(({ c, label, dark }) => (
            <button key={c} style={{ '--c': c }} onClick={() => copy(c, 'copied ' + c)}>
              <i style={dark ? { color: '#010828' } : undefined}>{c} · {label}</i>
            </button>
          ))}
        </div>

        <Row g="Typography" n="03 fonts" />
        <div className="ds-fonts">
          <div className="ds-font">
            <span className="ds-font-name">Anton — heading / nav / ปุ่มใหญ่ — uppercase เสมอ</span>
            <span className="grotesk ds-sample-grotesk">Every screen ever saved</span>
          </div>
          <div className="ds-font">
            <span className="ds-font-name">Condiment — cursive accent ทับ heading — normal-case เสมอ</span>
            <span className="script ds-sample-script">design shelf</span>
          </div>
          <div className="ds-font">
            <span className="ds-font-name">IBM Plex Mono — body / label / metadata — uppercase, 0.04–0.08em</span>
            <span className="mono-body">Sorted, tagged, ready to prompt.</span>
          </div>
        </div>

        <Row g="Liquid glass" n="recipe" />
        <div className="ds-glass">
          <div className="ds-glass-demo liquid-glass"><span className="mono-body">navbar / card / tag / overlay bar</span></div>
          <button className="btn" onClick={() => copy(GLASS, 'glass css copied')}>
            <span className="t">Copy css</span><span className="bar" />
          </button>
        </div>

        <Row g="Components" n="samples" />
        <div className="ds-samples">
          <nav className="nav liquid-glass"><a className="on">Active</a><a>Link</a><a>Link</a></nav>
          <div className="tags"><span className="liquid-glass">tag label</span><span className="liquid-glass">neon pill</span></div>
          <button className="go" aria-label="open sample"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></svg></button>
          <button className="btn"><span className="t">Neon bar button</span><span className="bar" /></button>
          <button className="btn alt"><span className="t">Purple bar button</span><span className="bar" /></button>
        </div>

        <Row g="Layout" n="rules" />
        <ul className="ds-rules">
          {RULES.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>
    </main>
  )
}
