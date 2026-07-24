# Design.Shelf — Design System

Single source of truth for this app's theme. Every new page/component must follow it exactly.
(A living sample of every token is on the `#/design` page in the app.)

The app: a local design-screenshot archive — reads images from a folder, groups them by
design type (landing / dashboard / mobile etc.), click an image to open a modal with the
full view + keyword tags + "Copy image prompt" and "Copy brief" buttons (copies to the
clipboard with a neon-green pill feedback floating bottom-center).

Style: dark space NFT-landing theme (based on the Orbis.Nft system).

## Fonts (Google Fonts)

| Font | Used for | Rule |
|---|---|---|
| **Anton** | every heading, nav, big buttons | always uppercase |
| **Condiment** | cursive accent over headings | always normal-case |
| **IBM Plex Mono** | body, labels, metadata | uppercase, letter-spacing 0.04–0.08em |

## Colors

| Token | Hex | Used for |
|---|---|---|
| bg | `#010828` | deep navy background |
| cream | `#EFF4FF` | all text |
| neon | `#6FFF00` | accent: cursive type, button underline bars, pill feedback |
| purple A | `#b724ff` | circular arrow-button gradient start |
| purple B | `#7c3aed` | circular arrow-button gradient end |

No other colors allowed.

## Liquid glass

Used on navbar, cards, tags, overlay bars, social boxes:

```css
.liquid-glass{background:rgba(255,255,255,.01);background-blend-mode:luminosity;backdrop-filter:blur(4px);border:none;box-shadow:inset 0 1px 1px rgba(255,255,255,.1);position:relative;overflow:hidden}
.liquid-glass::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1.4px;background:linear-gradient(180deg,rgba(255,255,255,.45) 0%,rgba(255,255,255,.15) 20%,rgba(255,255,255,0) 40%,rgba(255,255,255,0) 60%,rgba(255,255,255,.15) 80%,rgba(255,255,255,.45) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
```

## Texture overlay

Fixed full-screen layer, z-50, pointer-events-none, noise texture, mix-blend-mode lighten, opacity 0.6.

## Page structure

max-width **1831px** on every section.

- **HERO** — full viewport, 32px rounded bottom corners, nebula + stars
- **COLLECTION** — heading "COLLECTION OF [saved] SCREENS" + liquid-glass card grid 3/2/1
- **MODAL** — two columns + cursive category overlapping the title corner
- **CTA** — 32px rounded top corners, right-aligned text + social box bottom-left
- **FOOTER** — slim end-of-page bar: logo left / links center / fine print right
- **DESIGN** (`#/design`) — design system page: every token rendered live, click to copy

Corner radii: sections 32px / media 24px.

## Never

- emoji in the UI
- colors outside the system
- blur shadows other than the circular button's purple glow
- normal-case type except Condiment
