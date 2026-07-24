// Living style guide — source of truth is DESIGN.md; this page renders every token.

import { BarButton } from './ui.jsx'

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
  'max-width 1831px on every section — radius 32px / media 24px',
  'card grid 3 / 2 / 1 columns (breaks at 1024px / 640px)',
  'texture overlay: fixed full-screen, noise, mix-blend lighten, opacity .6',
  'space background: nebula gradients + twinkling stars',
  'never: emoji in UI, colors outside the system, normal-case except Condiment',
]

const MOTION = [
  'easing: --ease-out (state changes) / --ease-out-expo (entrances) — never bounce',
  'durations: entrances 500–800ms · state changes ≤300ms · exits ~75% of enter',
  'hero: one orchestrated load — nav drops, headline lines rise from clips, staggered',
  'scroll reveals: put data-rev on section-level elements, .in added on first sight',
  'modal: fade+rise enter, 200ms .closing exit — keep it mounted while closing',
  'feedback: img.ld fade on load, card hover zoom 1.04, toast rises, cue bar wipes',
  'transform + opacity only — prefers-reduced-motion disables everything',
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
        <p className="ds-note">// source of truth: DESIGN.md. every token on this page is live, click to copy</p>

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
            <span className="ds-font-name">Anton — heading / nav / big buttons — always uppercase</span>
            <span className="grotesk ds-sample-grotesk">Every screen ever saved</span>
          </div>
          <div className="ds-font">
            <span className="ds-font-name">Condiment — cursive accent over headings — always normal-case</span>
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
          <BarButton onClick={() => copy(GLASS, 'glass css copied')}>Copy css</BarButton>
        </div>

        <Row g="Components" n="samples" />
        <div className="ds-samples">
          <nav className="nav liquid-glass"><a className="on">Active</a><a>Link</a><a>Link</a></nav>
          <div className="tags"><span className="liquid-glass">tag label</span><span className="liquid-glass">neon pill</span></div>
          <span className="open-cue"><span className="t">Open</span><span className="bar" /></span>
          <BarButton>Neon bar button</BarButton>
          <BarButton alt>Purple bar button</BarButton>
        </div>

        <Row g="Layout" n="rules" />
        <ul className="ds-rules">
          {RULES.map((r) => <li key={r}>{r}</li>)}
        </ul>

        <Row g="Motion" n="rules" />
        <ul className="ds-rules">
          {MOTION.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>
    </main>
  )
}
