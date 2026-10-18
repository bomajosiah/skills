---
name: review-ui
description: >-
  Strictly review the UI of an existing product, screen, dashboard, PR, prototype or codebase for AI smells and weak visual hierarchy: eyebrow text, narrating captions, rationale or status leaking into copy, literary headings, card soup, explained metrics, always-on teaching, off-system styling. Use when the user asks to review, critique, audit or sanity-check an interface, says it "looks AI-made", "feels generic", or asks what's wrong with a screen. Read-only: finds and ranks problems and names where each piece of information should go instead, but does not edit. For fixing use improve-ui; for building new screens use do-ui; for structure and navigation use review-ia.
---

# Reviewing UI

## Initial response

When invoked without a screen, codebase or screenshot, respond only with:

> I'm ready to review the interface against a strict bar for AI smells and hierarchy.

## Scope

This skill judges the **surface**: copy on screen, hierarchy, composition and disclosure. It does not judge structure or navigation (that's `review-ia`) and doesn't redesign anything.

Load `SMELLS.md` (the catalog, ids A1–D2) and `SINKS.md` (where information goes instead) before writing findings.

## Evidence

Review what users see, not just the code.

1. **Look at the screens.** If a browser is available, open the running app and screenshot the key surfaces (home or dashboard, a collection, a detail, a form, sign-in, an empty state). If you only have code, say the review is code-only and lower your confidence on composition findings (C1–C6).
2. **Scan the code** for candidates with the bundled scanner: `node scripts/smells.mjs <repo>` (the path is relative to this skill's folder; Node 18+, no dependencies). It prints counts by smell id, the component APIs causing them, and file and line for each. If you can't run Node, grep for narration props (`eyebrow`, `subtitle`, `description`, `hint`, `kicker`, `overline`), `uppercase` with letter-spacing, and inline styles.
3. **Find the cause**, not only the instances. Check the component APIs (does `Card` or `PageHeader` offer a narration slot?), the system's rules (does the design README *require* the eyebrow?), and whether any sinks exist (info tip, walkthrough, empty state, system banner). One cause usually explains dozens of instances.

The scanner finds candidates; you judge them. A pattern match is not a finding until you've seen it in context.

## Posture

- Read each screen as its user, mid-task. Ask "does this help them act?", not "is this well written?"
- Thoughtful-sounding copy is not a defense. Narration that reads well in a diff is noise on screen.
- Don't reward consistency. 106 identical eyebrows are one consistent mistake.
- Don't penalize real help: a consequence line on a destructive action, or a format hint, is correct.

Follow the review discipline in `SMELLS.md`: three widths, every state, stress data, and any warning counts as a failure unless you can defend it in one sentence. Say plainly that a clean scan doesn't prove good design.

## Severity

- **Blocker**: a smell is built into the system (a component API or design rule produces it on every screen), or copy is misleading (status or provenance claims that may be false).
- **Major**: a smell repeats across a surface type (every dashboard card, every page header), or a primary screen has no clear hierarchy.
- **Minor**: an isolated instance.
- **Note**: taste or uncertain; needs the human's eye.

## Output

### Part 1 · Causes
Up to five root causes, each with evidence (file and line, rule text) and how many instances it explains.

### Part 2 · Findings

| Severity | Smell | Where | What it says / shows | Goes to |
|---|---|---|---|---|

"Goes to" is a sink from `SINKS.md` (info tip, walkthrough, empty state, banner, decision record, delete). Group repeated instances into one row with a count and three examples.

### Part 3 · Missing sinks
Which sink components the system lacks. Without them, a fix pass will regrow the smells.

### Part 4 · Decision
- **Clean**: no material smells.
- **Local fixes**: smells are isolated; the system is sound.
- **System fix needed**: the cause is in component APIs, rules or missing sinks. Fix those before touching screens.

## Rules

- Quote the actual text. Don't paraphrase a smell into something milder.
- Cite file and line, or a screenshot, for every finding.
- Never rewrite the copy in the review. Name the sink; rewriting is `improve-ui`'s job.
- Keep taste calls (density, type scale, brand expression) as Notes for the human.
