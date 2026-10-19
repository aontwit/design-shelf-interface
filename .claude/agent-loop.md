# Agent loop — profile of this repo

Repo values that pitwall (`/pitwall`, `/pitwall:gauge`, `/pitwall:ticket`) reads. The skills hold none of these. Sections follow the "Profile contract" in the pitwall `SKILL.md`; `/pitwall:doctor` checks them.

## repo

| | |
|---|---|
| name | design-shelf (Design.Shelf — local design-screenshot vault, React 18 + Vite SPA, no backend) |
| loop state | one folder per repo, outside the checkout: Windows `%LOCALAPPDATA%\Agent-Loop\design-shelf\state.json` · macOS `~/Library/Application Support/Agent-Loop/design-shelf/state.json` · Linux `~/.local/state/agent-loop/design-shelf/state.json` |
| loop checkout | `C:\personal\design-shelf` (main checkout) — nobody works in it while the loop runs |

## language

| Used for | Language |
|---|---|
| user — questions, reports, tick boxes | English · recommended option marked `(Recommended)` |
| PR body / PR title / commit | English |
| tracker comments and task descriptions | none (no tracker) |

## git

| | |
|---|---|
| base | `main` — pulled at the start of every round, PRs target it |
| never push / check out to edit | `main` |
| agent branch | `agent/<id>-<slug>` |
| commit / PR title | imperative sentence, capitalised, no type prefix, no trailing period — e.g. `Remove GoButton, index dashboard screenshot` (shape of the last 9 commits; no hook or commitlint enforces it) |
| hooks | none — never `--no-verify` |
| resolve conflicts yourself | `PLAN.md` (append-only rows and log lines, safe to union) · everything else → a human |
| ignored checks | none (no CI) |

## checks (level A)

```bash
npm ci              # when package-lock.json changes or node_modules is missing
# typecheck: none (plain JSX, no TypeScript)
# lint: none (no linter configured) · lintBaseline: none
# test: none (no test runner)
npm run build       # vite build — must exit 0
```

PR-body check: `node <pitwall dir>/scripts/check-pr-body.mjs --file <body file>` (default)

## level B (browser)

| | |
|---|---|
| dev server | `BROWSER=none npm run dev -- --strictPort` on port `4610` (`vite.config.js` sets `open: true`; `BROWSER=none` stops it opening the user's browser) · port already in use by someone else → never kill it, item B becomes ⏳ case 3 |
| browser | built-in browser (Claude app browser pane, `mcp__Claude_Browser__*`) |
| pages | `/` (the shelf: hero, filters, grid, card modal with Copy image prompt / Copy brief) · `/#/design` (design system page) |
| viewports | 1366 px (primary — desktop-only use per `PRODUCT.md`) and 393 px (must not break) · console errors = 0 |
| time | ~10 minutes per method per item, then change method |
| human-only steps | none |
| verification skill | none — the built-in browser covers level B directly |
| upkeep | none |

## states to build

- **Shelf data**: `public/data.json` + `public/screenshots/` (tracked, 4 items) is the default state.
- **More / different items**: `node scan.mjs "<folder of images>"` copies images into `public/screenshots/` and rebuilds `public/data.json`, keeping existing metadata by filename. Run it on a scratch folder only inside the task branch, and revert `public/` before committing unless the task is about data.
- **Empty shelf**: temporarily replace `public/data.json` with `[]` (`scan.mjs` writes a plain array) on the task branch, check, then restore.

## repo-specific evidence

| Changed files | Evidence | Level |
|---|---|---|
| `src/**/*.jsx`, `src/orbis.css`, `index.html` | page renders at both viewports, the changed UI is exercised (click / copy / filter), console errors = 0, screenshot in the PR | B |
| `src/orbis.css` tokens, `DESIGN.md` | tokens in `DESIGN.md` and `orbis.css` still match; `/#/design` shows the change | B |
| `scan.mjs` | run it on a scratch folder of 2+ images; `public/data.json` is valid JSON with the expected items and old metadata preserved | A |
| `public/data.json` | `node -e "JSON.parse(require('fs').readFileSync('public/data.json'))"` passes and the shelf renders every item | B |

## plan

| | |
|---|---|
| location | `PLAN.md` read from `origin/main` |
| reading order | `PRODUCT.md` → `DESIGN.md` → `PLAN.md` |
| task row | `\| <id> \| [ ] <task> \| <files> \| <Done when> \|` |
| open questions | `PLAN.md` → `## Open questions` |
| not queued | 🚪 rows (owner gates, e.g. 1.0) |
| playbook per row type | bug → `bug-fix` · refactor that must stay identical → `move-only` · new UI / feature → `feature` |
| spec | `PRODUCT.md` |
| question banks | `DESIGN.md` (visual design rules and tokens) |

## tracker

`tracker: none` — no tasks, the PR is the record

## agents per task

| Role | subagent | model |
|---|---|---|
| research | `Explore` | default |
| `code role` — follows an existing pattern | `pitwall:pitwall-agent` | sonnet |
| `code role` — design across modules, docs, playbooks | `pitwall:pitwall-agent` | opus |
| `review panel` — every task | `pitwall:pitwall-agent` ×2 | opus + sonnet — the same prompt |
| `verifier` — fresh, read-only, before every PR | `pitwall:pitwall-agent` | sonnet |

| Work | checklist in the brief |
|---|---|
| every review | `DESIGN.md` (tokens and rules) · `PRODUCT.md` (design principles, anti-references) |

## repo rules

`PRODUCT.md` (users, purpose, design principles, anti-references) · `DESIGN.md` (design system source of truth; living copy at `/#/design`) · shared UI primitives belong in `src/ui.jsx` (README) · no `CLAUDE.md` / `AGENTS.md` / rules folders · principles turned off: none

## permissions

- allow: `npm ci`, `npm run build`, `npm run dev`, `node scan.mjs *`, `git fetch`, `git switch`, `git pull --ff-only`, `git add`, `git commit`, `git push -u origin agent/*`, `gh pr list`, `gh pr view`, `gh pr create`, `gh pr edit`
- deny: `gh pr merge`, `git push --force*`, `git push * main`, `--no-verify`, edits to `.env*`
