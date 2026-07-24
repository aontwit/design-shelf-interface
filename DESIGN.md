---
name: Design.Shelf
description: A local archive of saved design screens, fixed beyond time and place
colors:
  abyss-navy: "#010828"
  starlight-cream: "#EFF4FF"
  signal-lime: "#6FFF00"
  nebula-violet: "#b724ff"
  deep-violet: "#7c3aed"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(40px, 7.5vw, 90px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(32px, 4.6vw, 60px)"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(18px, 2vw, 26px)"
    fontWeight: 400
    lineHeight: 1
  script:
    fontFamily: "Condiment, cursive"
    fontSize: "clamp(24px, 3.4vw, 48px)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.04em"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  tag: "14px"
  overlay: "20px"
  media: "24px"
  navpill: "28px"
  section: "32px"
  pill: "99px"
  circle: "50%"
components:
  button-bar:
    textColor: "{colors.starlight-cream}"
  button-bar-alt:
    textColor: "{colors.starlight-cream}"
  button-go:
    backgroundColor: "{colors.deep-violet}"
    textColor: "{colors.starlight-cream}"
    rounded: "{rounded.circle}"
    size: "48px"
  tag:
    textColor: "{colors.starlight-cream}"
    rounded: "{rounded.tag}"
    padding: "10px 16px"
  card:
    rounded: "{rounded.section}"
    padding: "18px"
  nav:
    rounded: "{rounded.navpill}"
    padding: "24px 52px"
  toast:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.abyss-navy}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
---

# Design System: Design.Shelf

## 1. Overview

**Creative North Star: "The Orbital Archive"**

A shelf drifting in deep space. Every screen you ever saved is cargo in a dark hold: nebula gradients and twinkling stars behind, noise texture over everything, mono telemetry labels naming each item. The surface is a personal tool, but it presents itself like an NFT landing page (the reference system is Orbis.Nft), because in this app the collection IS the show.

The component doctrine is **loud type, quiet chrome**. Anton does the shouting in full uppercase; containers are barely-there liquid glass; buttons are words with a neon bar under them, not boxes. Condiment cursive is the single human touch, always overlapping a heading at a slight tilt. Motion follows the same split: one orchestrated hero entrance (headline lines rise from clips, staggered), quiet scroll reveals everywhere else, and 200ms exits. Transform and opacity only; `prefers-reduced-motion` silences all of it.

This system explicitly rejects: emoji in the UI, any color outside the five tokens, decorative shadows, and normal-case type anywhere but Condiment.

**Key Characteristics:**
- Deep-navy space scene (nebula + stars + noise) behind every major section
- All type uppercase except the cursive accent; mono for everything that isn't a heading
- Liquid glass as the only container treatment; no opaque panels
- One neon accent doing all interactive feedback; violet reserved for the circular go button
- Sections capped at 1831px; section corners 32px, media 24px
- One entrance choreography, then restraint: reveals ≤650ms, state changes ≤300ms

## 2. Colors

A closed five-token palette: near-black navy, one warm-white, one loud accent, and a violet pair that exists only inside a gradient.

### Primary
- **Signal Lime** (#6FFF00): the only interactive voice. Cursive accents, button underline bars, the copy-feedback toast, nav hover/active, selection highlight. Usually rendered with `mix-blend-mode: exclusion` over imagery so it stays radioactive on any backdrop.

### Secondary
- **Nebula Violet** (#b724ff): gradient start of the circular go button, and the alt bar-button underline. Never used alone as a flat fill.
- **Deep Violet** (#7c3aed): gradient end of the same pair; also seeds the nebula backdrop glow.

### Neutral
- **Abyss Navy** (#010828): the page. Every section sits on it; the space scene is painted over it.
- **Starlight Cream** (#EFF4FF): all text. Secondary emphasis comes from opacity steps of this one color (.8 body, .7 labels, .6 metadata, .45 fine print), never from a new gray.

### Named Rules
**The Closed Palette Rule.** Five tokens, no additions. Need a gray? Use Starlight Cream at reduced opacity. Need emphasis? Use scale or the accent, never a new hue.
**The Gradient Cage Rule.** The violets exist only as the `135deg` pair on the go button (and the alt bar). A flat violet fill anywhere is a violation.

## 3. Typography

**Display Font:** Anton (sans-serif fallback)
**Body Font:** IBM Plex Mono (monospace fallback)
**Accent Font:** Condiment (cursive fallback)

**Character:** A poster shouting in a server room. Anton compresses headlines into monolithic uppercase slabs; IBM Plex Mono spaces everything else out like telemetry; Condiment scrawls one lime word across the formality.

### Hierarchy
- **Display** (400, clamp(40px, 7.5vw, 90px), line-height 1): hero headline only, uppercase.
- **Headline** (400, clamp(32px, 4.6vw, 60px), line-height 1.05): section titles ("Collection of saved screens"), CTA, uppercase, often with an indented second line.
- **Title** (400, clamp(18px, 2vw, 26px)): group labels and nav-scale UI type, uppercase.
- **Script** (400, clamp(24px, 3.4vw, 48px)): Condiment, normal-case, Signal Lime, `mix-blend-mode: exclusion`, rotated -1 to -2deg, absolutely positioned to overlap its heading.
- **Body** (400, 12-14px, line-height 1.8, letter-spacing 0.04em): IBM Plex Mono, uppercase.
- **Label** (400, 10-12px, letter-spacing 0.08-0.1em): IBM Plex Mono, uppercase; metadata, tags, fine print.

### Named Rules
**The Case Rule.** Everything is uppercase except Condiment, which is never uppercase.
**The Overlap Rule.** Condiment never sits in its own row. It overlaps a heading's corner, slightly rotated, or it doesn't appear.

## 4. Elevation

Flat glass, not shadows. Depth comes from layering: the space scene at the bottom, liquid-glass surfaces above it (1.4px gradient edge + 4px backdrop blur + luminosity blend), and the fixed noise texture over everything at 60% lighten. Surfaces read as panes of a window, not floating cards.

### Shadow Vocabulary
- **Violet glow** (`box-shadow: 0 10px 24px rgba(168,85,247,.5)`): the circular go button only.
- **Glass edge** (`box-shadow: inset 0 1px 1px rgba(255,255,255,.1)`): part of the liquid-glass recipe, not a depth cue.

### Named Rules
**The One Shadow Rule.** The go button's violet glow is the only blur shadow in the system. Any other `box-shadow` with blur is forbidden.

## 5. Components

Loud type, quiet chrome: interactive elements are typography plus one neon cue; containers are glass.

### Buttons
Shared primitives live in `src/ui.jsx` (`BarButton`, `GoButton`); the CSS is `.btn` / `.go` in `orbis.css`.
- **Bar button** (`BarButton`): no background, no border. Anton uppercase text (clamp(16px, 1.6vw, 22px)) over a 6px Signal Lime bar. Hover: the bar eases to `scaleX(.65)` from the left, 250ms. This is the primary action shape.
- **Alt bar button** (`BarButton alt`): identical, bar carries the violet gradient. Use for the secondary action beside a neon one.
- **Go button** (`GoButton`): 48px circle, `linear-gradient(135deg, #b724ff, #7c3aed)`, Starlight Cream chevron, the system's one glow shadow. Hover: scale 1.1; inside a card, the whole-card hover also scales it 1.06 and nudges the chevron 2px right.
- **See-all composite**: the oversized Anton "See all folders" lockup with the same neon bar; a one-off, not a primitive.
- **CTA social links** (`.cta-links`): Mail / Twitter / Github as giant Anton words (clamp(30px, 4vw, 58px)) on the CTA's left, balancing the headline slab, each with a mono telemetry sub-label and a neon bar that draws in on hover. Replaced the old glass social box.

### Chips
- **Tag**: liquid-glass pill, 14px radius, 10px 16px padding, uppercase mono 12px. In the modal they trickle in 40ms apart.

### Cards / Containers
- **Corner Style:** cards and sections 32px; media inside 24px; the overlay bar 20px.
- **Background:** liquid glass over the space scene; screenshot fills the media frame.
- **Shadow Strategy:** none (see Elevation); hover raises the glass tint to `rgba(255,255,255,.1)` and zooms the image to 1.04 over 900ms.
- **Internal Padding:** 18px; overlay bar 16px 20px.
- **Behavior:** images fade in on load; cards reveal on scroll with an 80ms per-column stagger.

### Inputs / Fields
None exist yet. When one is needed: glass surface, no border at rest, Signal Lime treatment on focus, uppercase mono text.

### Navigation
- Liquid-glass pill (28px radius, 24px 52px padding), Anton 13px uppercase links, 38px gaps. Default Starlight Cream; hover and active Signal Lime; no underlines. Hidden below 1024px.

### Modal (signature)
- Two-column glass box (32px radius, image column + metadata column), Condiment category name overlapping the title corner at -2deg. Enters with overlay fade + box rise (500ms ease-out-expo); exits in 200ms via a `.closing` phase that keeps it mounted until the animation lands. Backdrop: `rgba(1,8,40,.72)` + 10px blur.

### Toast (signature)
- The copy-feedback pill: Signal Lime background, Abyss Navy uppercase mono text, 99px radius, fixed bottom-center; rises 10px with its fade, auto-dismisses in 1.6s.

## 6. Do's and Don'ts

### Do:
- **Do** keep every section inside the 1831px max-width wrap, sections at 32px radius, media at 24px.
- **Do** make new interactive elements answer in Signal Lime (#6FFF00): bar, glow, or text shift; nothing else signals interactivity.
- **Do** derive every gray from Starlight Cream opacity steps (.8 / .7 / .6 / .45).
- **Do** animate with transform and opacity only, easing on `--ease-out` / `--ease-out-expo`, and keep exits at ~75% of enter durations.
- **Do** reuse `BarButton` / `GoButton` from `src/ui.jsx` instead of restyling `<button>`.

### Don't:
- **Don't** use emoji in the UI.
- **Don't** introduce colors outside the five tokens; no new grays, no flat violet fills.
- **Don't** add blur shadows anywhere except the go button's violet glow.
- **Don't** set normal-case type in anything but Condiment.
- **Don't** give buttons backgrounds, borders, or boxes; a bar button is a word and a bar.
- **Don't** animate layout properties (width, height, margins) or ship motion that ignores `prefers-reduced-motion`.
- **Don't** add a second orchestrated entrance; the hero owns page-load choreography, everything else reveals quietly on scroll.
