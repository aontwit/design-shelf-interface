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
