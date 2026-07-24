# Design.Shelf

A local design-screenshot vault that turns saved inspiration into usable prompts. Point `scan.mjs` at your screenshots folder to index them into the shelf, and every card ends in one click: **Copy image prompt** or **Copy brief**, ready to paste into Claude Code.

Dark-space NFT-landing theme ("The Orbital Archive"): Anton display type, IBM Plex Mono telemetry labels, Condiment cursive accents, one Signal Lime accent on deep navy, liquid glass.

## Stack

React 18 + Vite. No backend; the archive is your local filesystem.

## Run

```bash
npm install
npm run dev      # vite dev server (port 4610)
node scan.mjs "C:\path\to\screenshots"   # copy into public/screenshots + rebuild public/data.json
npm run build    # production build
```

## Design system

`DESIGN.md` is the source of truth (tokens + rules). A living copy of every token renders at `#/design` inside the app. Shared UI primitives live in `src/ui.jsx`.
