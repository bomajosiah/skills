---
name: do-ui
description: >-
  Compose new product screens, dashboards, forms and components that don't read as AI-made: labels instead of narration, one primary region and action, metrics with definitions on demand, help in info tips and walkthroughs instead of on the page. Use when building a new surface, page, dashboard card, settings screen, sign-in or onboarding flow, or when setting up a new design system or starter kit so agents build clean UI from day one. Run after the structure is decided (do-ia). For existing UI use review-ui or improve-ui.
---

# Doing UI

## Initial response

When invoked without a brief, respond only with:

> Tell me the surface, who uses it and what they do there, and I'll compose it without narration.

## Before you compose

0. **State your read** of the brief in one line (who, doing what, on what device) and check the plan against it. Anything that reads as a generic default (a hero metric, a card grid, an icon over every heading) needs a reason.
1. **Structure first.** Know the surface's job ("this page exists so [role] can [verb] [object]") and its place in navigation. If that's unclear, run `do-ia`.
2. **Read the system.** Its tokens, components and writing rules. Use what's there; a missing component is a system gap to raise, not a one-off to inline.
3. **Check the sinks exist.** Info tip, empty state, toast, system banner, walkthrough (`SINKS.md`). If they're missing, add them to the system first, or flag it. Without them, explanation has nowhere to go but onto the page.

## Copy budget

Before writing any text on a screen, list each string with its job:

| String | Type | Why it's here |
|---|---|---|

Allowed types: **label** (title, nav, column, field), **value** (data), **action** (verb and object), **state** (status, error, empty, success), **consequence** (what an action will do, only when it's irreversible or surprising), **hint** (only for non-obvious formats).

Anything else (description, subtitle, eyebrow, caption, tagline, reassurance, explanation) has no type. Route it with `SINKS.md`, or drop it. A working screen should get through this table with no rows that need defending.

## Composition

- **One primary region** per screen. It gets the most space and the strongest type. Everything else is visibly secondary.
- **One primary action** per view.
- **Vary the treatment** by content: a list for items, a table for comparison, a bare number for a metric. Not everything is a card.
- **Headings are labels**: nouns users can scan and find again. "Overdue invoices", not "Money that has gone quiet".
- **Metrics** are label, value, optional change. The definition is an info tip on the label.
- **Empty, loading, error and success states** are designed with the surface, not added later.
- **New areas** that need teaching get a just-in-time tip or a short walkthrough (one step ideally, 3–4 at most, on `data-tour` anchors), not intro copy.

## Self-check before calling it done

1. Screenshot it. Judge the pixels, not the JSX.
2. Squint test: is the primary region obvious at a glance? Is anything uppercase and tracked that isn't a nav or table header?
3. Run the bundled scanner: `node scripts/smells.mjs <repo> --check` (the path is relative to this skill's folder). It fails if any smell count is above the baseline, and with no baseline it holds the count to zero.
4. Read every id in `SMELLS.md` against the screenshot, at 1440, 768 and 390 wide. Any match means fix it before handing over.
5. Remove one element and look again. If nothing is lost, leave it out.

## For a new system or starter kit

Build the absence of smells into the kit, so no one has to remember:
- Card and page header APIs have `title`, `actions`, `info`. No `eyebrow`/`description` slot outside marketing components.
- The sinks ship as components with docs.
- Writing guidance includes the copy budget and the routing table.
- `AGENTS.md` routes "writing copy for a screen" to that guidance.
- The smells check runs in CI from the first commit with a baseline of zero.
