# Product

## Register

brand

## Users

One person: the owner, a designer/developer who hoards good screens. Uses it on a desktop
browser, locally (vite dev server), usually at night while building something else. The job:
skim the shelf, find the saved screen that matches the vibe in their head, and leave with a
ready-to-paste image prompt or build brief for Claude Code.

## Product Purpose

A local design-screenshot vault that turns saved inspiration into usable prompts. Success:
a screen can be found in seconds, and every screen ends in one click on "Copy image prompt"
or "Copy brief". The site itself doubles as a design flex; it should look like something
worth saving to its own shelf.

## Brand Personality

Loud, nocturnal, meticulous. "Cosmic collector": NFT-landing energy (deep space, huge Anton
display type, neon accents, liquid glass) applied with an archivist's discipline. The frame
shouts; the archive underneath is orderly and precise.

## Anti-references

- Generic SaaS landing: purple-on-white, three-icon feature cards, hero metrics
- Corporate dashboard: gray KPI tables, dense admin-panel chrome
- Beige minimal portfolio: cream, quiet serif, forgettable restraint

## Design Principles

1. **The shelf is the show.** Saved screenshots are the heroes; the chrome stays dark and
   recedes so the art pops. Never let decoration compete with the archive.
2. **Loud frame, quiet function.** Display type and neon carry the voice, but the copy loop
   (find, open, copy) stays one click with instant feedback.
3. **Everything ends in a prompt.** Every item carries tags, an image prompt, and a brief;
   any new feature must feed that loop, not distract from it.
4. **One system, no drift.** Three fonts, five colors, liquid glass. New UI reuses tokens
   from DESIGN.md; nothing gets invented per-screen.

## Accessibility & Inclusion

Personal tool, but keyboard and screen-reader basics are non-negotiable: visible focus,
reachable cards and modal, announced copy feedback. Respect prefers-reduced-motion (the
space theme animates a lot). Contrast targets WCAG AA where it doesn't fight the theme;
the neon accent on deep navy passes comfortably.

## Search (phase 1)

Serves "a screen can be found in seconds" (Product Purpose).

- One search box, living in the sticky collection filter bar; search rows wait for the filter bar to be on `main` (owner 2026-10-20)
- Matching: case-insensitive, every typed word must appear somewhere in the screen's name, category, tags, image prompt or brief (owner 2026-10-20)
- With a folder filter on: search runs inside that folder; the folder counts show matches per folder (owner 2026-10-20)
- No matches: the existing empty-state line reads `No screens match "<query>"`; no extra button (owner 2026-10-20)
- Keyboard: `/` jumps to the search box, Esc empties it and gives the full grid back (owner 2026-10-20)
- Not in phase 1 (owner 2026-10-20): highlighting matched words, keeping the query in the page address, tag filtering, auto-describing new screens, keyboard browsing in the modal
