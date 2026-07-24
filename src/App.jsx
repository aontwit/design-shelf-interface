import { useEffect, useRef, useState } from 'react'
import DesignPage from './DesignPage.jsx'

const ORDER = ['Landing', 'Dashboard', 'Mobile', 'Spec']
const NAV = ['All screens', 'Landing', 'Dashboard', 'Mobile']

/* ---------- icons (SVGs from the original mockup) ---------- */
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
  const [route, setRoute] = useState(window.location.hash)
  const toastTimer = useRef()

  useEffect(() => {
    fetch('/data.json').then((r) => r.json()).then(setItems).catch(() => setItems([]))
  }, [])

  // two-phase close so the exit animation (.overlay.closing) can play before unmount
  const [closing, setClosing] = useState(false)
  const closeModal = () => {
    setClosing(true)
    setTimeout(() => { setCur(null); setClosing(false) }, 200)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeModal()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash)
      setCur(null)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const onDesign = route.startsWith('#/design')

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

  // scroll reveals: everything tagged data-rev fades/rises in once, on first sight
  useEffect(() => {
    const els = document.querySelectorAll('[data-rev]:not(.in)')
    if (!els.length) return
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items, cat, route])

  return (
    <>
      <div className="texture" />

      {onDesign ? <DesignPage copy={copy} /> : <>

      {/* ============ HERO ============ */}
      <section className="hero space">
        <div className="nebula" /><div className="stars" />
        <div className="wrap hero-head">
          <div className="logo">Design.Shelf</div>
          <nav className="nav liquid-glass">
            {NAV.map((c) => (
              <a key={c} role="button" tabIndex={0} className={cat === c ? 'on' : ''} onClick={() => pickCat(c)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickCat(c) } }}>{c}</a>
            ))}
            <a href="#/design">Design</a>
          </nav>
          <div aria-hidden style={{ width: 56 }} />
        </div>
        <div className="wrap hero-main">
          <div className="hero-inner">
            <div className="h-title">
              <h1>
                <span className="hl"><span className="hl-in">Every screen</span></span>
                <span className="hl"><span className="hl-in"><span className="paren">(</span> you <span className="paren">)</span> ever saved</span></span>
              </h1>
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
          <div className="col-head" data-rev>
            <h2 className="col-title">Collection of<span className="ind"><span className="sc">saved</span>screens</span></h2>
            <button className="seeall" onClick={() => setCat('All screens')}>
              <span className="r1"><span className="big">See</span><span className="stack"><span>all</span><span>folders</span></span></span>
              <span className="bar" />
            </button>
          </div>
          {items === null && <div className="empty">loading…</div>}
          {items !== null && !groups.length && (
            <div className="empty">No screenshots in this folder yet. Drop images and run npm run scan</div>
          )}
          {groups.map((g) => (
            <div key={g.c}>
              <div className="group-row" data-rev><span className="g">{g.c}</span><span className="n">{String(g.list.length).padStart(2, '0')} files</span><span className="ln" /></div>
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
      {cur && <Modal item={cur} closing={closing} onClose={closeModal} copy={copy} flash={flash} />}

      {/* ============ CTA ============ */}
      <section className="cta space">
        <div className="nebula" /><div className="stars" />
        <div className="wrap cta-inner">
          <div className="cta-block" data-rev>
            <span className="cta-script">Go beyond</span>
            <h2><span className="first">Open the shelf.</span>Tag what's saved.<br />Prompt what's next.<br />Follow the signal.</h2>
          </div>
        </div>
        <div className="cta-social liquid-glass" data-rev>
          <button><MailIcon />Mail</button>
          <button><TwitterIcon />Twitter</button>
          <button><GithubIcon />Github</button>
        </div>
      </section>

      </>}

      <Footer />

      <div id="copied" role="status" aria-live="polite" className={toast ? 'show' : ''}>{toast}</div>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-in">
        <a className="logo" href="#/">Design.Shelf</a>
        <nav className="foot-nav">
          <a href="#/">Shelf</a>
          <a href="#/design">Design system</a>
        </nav>
        <span className="foot-fine">© 2026 design.shelf · local archive</span>
      </div>
    </footer>
  )
}

function Card({ item, phIndex, onOpen }) {
  const [err, setErr] = useState(false)
  const [ld, setLd] = useState(false)
  const imgRef = useRef(null)
  // cached images can be complete before onLoad attaches; never leave one at opacity 0
  useEffect(() => { if (imgRef.current?.complete) setLd(true) }, [])
  return (
    <div className="card liquid-glass" data-rev role="button" tabIndex={0} aria-label={'open ' + item.name} onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}>
      <div className="media">
        {err
          ? <div className={`ph ph-${phIndex}`} />
          : <img ref={imgRef} className={ld ? 'ld' : ''} src={item.file} alt={item.name} loading="lazy" onLoad={() => setLd(true)} onError={() => setErr(true)} />}
        <div className="bar-ov liquid-glass">
          <div style={{ minWidth: 0 }}>
            <div className="lab">{item.name}</div>
            <div className="val">{(item.tags || []).length} tags</div>
          </div>
          <button className="go" aria-hidden="true" tabIndex={-1}><ChevronIcon /></button>
        </div>
      </div>
    </div>
  )
}

function Modal({ item, closing, onClose, copy, flash }) {
  const [size, setSize] = useState('…')
  const [ld, setLd] = useState(false)
  const imgRef = useRef(null)
  const onImg = () => {
    const im = imgRef.current
    if (!im || !im.naturalWidth) return
    setSize(im.naturalWidth + ' × ' + im.naturalHeight)
    setLd(true)
  }
  useEffect(() => { if (imgRef.current?.complete) onImg() }, [])
  return (
    <div className={'overlay open' + (closing ? ' closing' : '')} role="dialog" aria-modal="true" aria-label={item.name} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modalbox liquid-glass">
        <button className="mclose" aria-label="close" autoFocus onClick={onClose}>✕</button>
        <div className="media">
          <img ref={imgRef} className={ld ? 'ld' : ''} src={item.file} alt={item.name} onLoad={onImg} />
        </div>
        <div>
          <h3>{item.name}<span className="msc">{item.category.toLowerCase()}</span></h3>
          <div className="meta-row">
            <span>Folder: {item.category.toLowerCase()}</span>
            <span>Added: {item.addedAt || '—'}</span>
            <span>{size}</span>
          </div>
          <div className="tags">
            {(item.tags || []).map((t, i) => <span key={t} className="liquid-glass" style={{ '--i': i }}>{t}</span>)}
          </div>
          <div className="acts">
            <button className="btn" onClick={() => item.imagePrompt ? copy(item.imagePrompt, 'image prompt copied') : flash('no prompt yet, ask claude to fill it')}>
              <span className="t">Copy image prompt</span><span className="bar" />
            </button>
            <button className="btn alt" onClick={() => item.brief ? copy(item.brief, 'brief copied') : flash('no brief yet, ask claude to fill it')}>
              <span className="t">Copy brief</span><span className="bar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
