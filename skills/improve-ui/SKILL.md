---
name: improve-ui
description: >-
  Remove AI smells from an existing product UI and keep them from coming back: eyebrow text, narrating captions and hints, rationale or status leaking into copy, literary headings, explained metrics, card soup, always-on teaching. Use when the user asks to clean up, de-slop, de-AI, polish, tighten copy, or make an interface "feel designed", or after review-ui found smells. Fixes the cause first (component APIs, design rules, missing sinks like info tips and walkthroughs), then sweeps the screens, then adds a check so the count can only go down. For critique only use review-ui; for new screens use do-ui; for structure use improve-ia.
---

# Improving UI

## Initial response

When invoked without a target, respond only with:

> I'm ready to remove the AI smells from this interface, starting with whatever keeps producing them.

## Principle

**Fix the factory, then the products.** Smells come from the system: a component with a narration slot, a design rule that requires an eyebrow, the absence of an info tip or tour, an agent brief that rewards explaining. Rewriting 100 captions without fixing that means 100 new ones next month.

Load `SMELLS.md` and `SINKS.md` first.

## Sequence

Stop at each gate for the human. Don't change product code before gate 1 unless told to.

### 1. Diagnose
- Run `review-ui` (or follow its Evidence steps): screenshots of key surfaces, `node scripts/smells.mjs <repo>` for counts (the scanner bundled with this skill), the causes.
- Save the baseline: `node scripts/smells.mjs <repo> --baseline` writes `smells.baseline.json` at the repo root. If the repo shouldn't carry it yet, pass `--baseline-file` somewhere outside version control.
- **Gate 1:** present causes, counts by smell id, missing sinks and the plan. The human confirms which narration is actually needed (some of it encodes real product knowledge that must move, not vanish).

### 2. Fix the system (on a branch)
In this order:
1. **Add the sinks** the routing needs: info tip, empty state, system banner, toast, walkthrough (spec in `SINKS.md`). Use the repo's primitives and register each with when-to-use and when-not-to-use.
2. **Change the component APIs.** Remove or rename narration slots (`eyebrow`, `description`, `subtitle`) on app components. Add a typed `info` prop on `PageHeader`/`Card` that renders an info tip. Keep a slot only on marketing components, with its limits documented.
3. **Rewrite the rules.** Delete design rules that require smells ("sentence case except the tracked eyebrow"). Add the routing table and the test from `SMELLS.md` to the system's writing guidance and `AGENTS.md`/`CLAUDE.md`.
- **Gate 2:** show the new components in isolation (in a component workbench or Storybook if the repo has one) and the rule changes.

### 3. Sweep the screens
For every instance, route the information. Don't just delete it:
- **Sort before deleting.** Expect a third of eyebrows and captions to be data (item numbers, dates, amounts, counts): move them to a badge or a values-only slot. Swap inverted pairs (label above, data as title).
- **Delete** what's obvious (A2, A3 "duh" cases, A7).
- **Move to an info tip** what defines a metric or term (A1 definitions, C3, D2).
- **Move to a decision record** what justifies a design (A5). Keep the reasoning: the team needs it, users don't.
- **Collapse into one system banner or setup checklist** what describes integration or data state (A6).
- **Move to a walkthrough** what teaches an area (D1). Write tour steps against `data-tour` anchors.
- **Relabel** literary headings as nouns (B1–B3).
- **Restructure** uniform anatomy and card soup (C1, C2) only screen by screen, with before/after screenshots. Composition changes are design calls, so show options.

Work one surface type at a time (all page headers, then dashboard cards, then forms). Commit per surface type with the counts before and after.

Keep a **relocation log** (`relocations.md`, kept with your other working notes): text removed → where it went (info tip on X, decision record Y, deleted). This is how the human checks nothing important disappeared.

Re-check each fixed surface in the browser at every width. A smell can hide a second cause: removing an eyebrow that crushed a page title showed the title could still shrink to one letter, because the layout let it.

### 4. Lock it in
- Copy `scripts/smells.mjs` into the repo's own `scripts/` and run `node scripts/smells.mjs . --check` in CI or pre-commit, with `smells.baseline.json` committed. It fails if any count rises above the baseline. Re-baseline after each sweep so the ratchet tightens.
- Add one cold-agent test: give a fresh agent the system and a brief for a new dashboard card. If it writes an eyebrow or caption, the guidance is still unclear, so fix the guidance.
- **Gate 3:** screenshots before/after of the golden surfaces, the relocation log, the new counts.

## Rules

- Never drop information silently. Every removal is logged with its destination.
- Never reword narration into shorter narration. "Your view only" → "Private" is still A3. Move it or delete it.
- Preserve the stack; build sinks from the primitives already in the repo.
- Don't codify accidents: if the human wants to keep a pattern the catalog calls a smell (say, eyebrows on marketing pages), record it in the decision record with its limits and teach the scanner the exception (`smells.config.json` at the repo root: `{ "ignore": ["regex"], "exceptions": [{ "rule": "A1", "path": "marketing/", "why": "…" }] }`).
- Composition, density and brand expression are the human's call. Show options with a recommendation.
