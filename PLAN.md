# Plan

Tasks for the agent loop. One row = one task = one PR. Add rows by hand or with `/pitwall:queue <task in words>` (the row lands with the task's PR). Ticked rows stay as history.

## Tasks

| ID | Task | Files | Done when |
|---|---|---|---|
| 1.0 | [ ] 🚪 Owner lands the collection filter bar (`FilterBar`, `.filter-bar`) and the hover "Copy prompt" pill on `main` (spec: PRODUCT.md "Search (phase 1)") | `src/App.jsx`, `src/orbis.css`, `DESIGN.md` | `git show origin/main:src/App.jsx` contains `function FilterBar` |
| 1.1 | [ ] Search box in the filter bar: case-insensitive, every typed word must appear in name, category, tags, image prompt or brief; runs inside the active folder; folder counts show matches; applies to both Folders and Recent views; zero matches shows `No screens match "<query>"` in the existing empty-state line, not the "drop images and run scan" one — needs 1.0 merged (spec: PRODUCT.md "Search (phase 1)"; DESIGN.md "Inputs / Fields") | `src/App.jsx`, `src/orbis.css`, `DESIGN.md` | In the browser at 1366 and 393 px: a word from one screen's tags leaves only that screen; two words narrow to screens that have both; folder counts change with the query; a nonsense word shows `No screens match "<that word>"`; clearing the box brings every screen back; the active folder stays clickable at 0 matches; console errors = 0; `npm run build` passes; DESIGN.md "Inputs / Fields" describes the field |
| 1.2 | [ ] Search keyboard: `/` focuses the search box (ignored while the modal is open or another field has focus), Esc empties it and leaves the box; the box has an accessible name — needs 1.1 merged (spec: PRODUCT.md "Search (phase 1)") | `src/App.jsx`, `DESIGN.md` | In the browser: `/` from the page focuses the box; `/` with the modal open does nothing; Esc in a filled box empties it and the full grid returns; the box is announced by its label in the accessibility tree; console errors = 0; `npm run build` passes |

## Answered

| Question | Answer | Date |
|---|---|---|
| What does the next phase deliver? | Search the shelf (phase 1). Tag filter, auto-describe and keyboard browsing were not picked | 2026-10-20 |
| How does the loop run this phase? | Queue the whole phase; one PR per row, the owner merges | 2026-10-20 |
| Does search wait for the owner's filter bar? | Yes: the owner commits the filter bar first (row 1.0), search lives in it | 2026-10-20 |

## Open questions

| # | Question | Blocks |
|---|---|---|

## Progress log

| Date | Task | PR | Evidence |
|---|---|---|---|
