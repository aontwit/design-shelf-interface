// Shared UI primitives — the button vocabulary from DESIGN.md §5 Components.
// Loud type, quiet chrome: a BarButton is a word and a bar, never a box.

/** Primary action: Anton uppercase text over a neon bar (alt = violet gradient bar). */
export function BarButton({ alt, children, ...props }) {
  return (
    <button className={alt ? 'btn alt' : 'btn'} {...props}>
      <span className="t">{children}</span><span className="bar" />
    </button>
  )
}

/** The circular violet-gradient chevron button (the system's one glow shadow).
 *  Pass label={null} when it is decorative (e.g. inside a card that is already a button). */
export function GoButton({ label = 'open', ...props }) {
  return (
    <button className="go" aria-label={label || undefined} {...props}>
      <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></svg>
    </button>
  )
}
