---
name: review-ia
description: >-
  Strictly review the information architecture of an existing product, screen set, route tree, dashboard, admin interface, SaaS app, prototype, PR, or codebase. Use when the user asks to audit, review, critique, evaluate, sanity-check, or assess IA, navigation, page structure, dashboard organization, routes, tabs, settings, search/filter scope, or whether too much is happening on one screen. Read-only by default: identify structural problems, explain why they matter, and state the architectural direction, but do not redesign or implement unless the user switches to improve-ia. For starting from scratch use do-ia; for actually fixing an existing structure use improve-ia.
---

# Reviewing Information Architecture

## Initial response

When invoked without a specific artifact or question, respond only with:

> I'm ready to review the product structure against a strict IA bar.

Do not add anything else until the user provides the interface, codebase, screenshots, route map, or product description.

## Scope

This is a review skill. It does one thing: **judge whether an existing product structure makes sense**.

It does not:
- restyle the UI
- implement a redesign
- rewrite unrelated code
- turn the review into a feature brainstorm
- reward visual polish for hiding structural problems

Read the actual product structure, not just the pixels.

If reviewing a codebase, inspect enough of the following to reconstruct the IA:

- route tree
- global/sidebar/top navigation
- page components
- tabs and nested navigation
- large dashboards
- detail and collection pages
- modals/drawers used for substantial work
- settings/admin areas
- search/filter scope
- role/permission guards
- deep-link behavior where visible

## Operating posture

Assume the interface must earn clarity.

Do not ask "does this look organized?"
Ask:
- Can a user predict where a capability lives?
- Does each page have one dominant responsibility?
- Are first-class objects represented coherently?
- Does navigation express the product model?
- Is complexity placed at the right level?
- Can users preserve context as they move?

A beautiful crowded screen is still a structural failure.

## Review sequence

### 1. Reconstruct the implied product model

Identify:

- users/roles
- recurring jobs
- first-class objects
- major actions
- object relationships
- major destinations

If the UI suggests contradictory models, flag it.

### 2. Evaluate every major surface

For each important page, write mentally:

> This page exists so [role] can [verb] [object/decision].

If the sentence becomes a list of unrelated jobs, investigate.

### 3. Evaluate navigation

Check:

- global destinations are stable and parallel
- labels have strong information scent
- local/contextual navigation appears where needed
- settings and utilities are not mixed with core work
- one capability does not have multiple competing homes
- significant destinations are not buried under vague buckets

### 4. Evaluate surface fit

Check whether responsibilities are on the right kind of surface:

- dashboard
- collection
- detail/workspace
- queue/inbox
- workflow
- report
- settings/admin
- utility

### 5. Evaluate disclosure and task boundaries

Inspect:

- tab sprawl
- accordion dependence
- modal/drawer workflows
- hidden frequent actions
- overly flat all-on-one-page structures
- fragmentation that causes constant backtracking

### 6. Evaluate findability and scope

Inspect:

- search scope
- filter scope
- saved views
- drill-down context
- breadcrumbs/local orientation
- deep links
- selected nav state

### 7. Evaluate scale

Ask whether the structure survives:

- more records
- more roles
- more locations/workspaces
- more reports
- more integrations
- archived/inactive data

## Non-negotiable standards

Load `STANDARDS.md` for the complete bar.

A finding is warranted when the product violates one of these:

1. **Clear page responsibility**
2. **Coherent first-class objects**
3. **Correct surface for the job**
4. **Predictable navigation model**
5. **Dashboard discipline**
6. **Appropriate progressive disclosure**
7. **Settings/admin separation**
8. **Explicit search/filter scope**
9. **Role and consequence coherence**
10. **Wayfinding, deep-link, and scale resilience**

## Severity

Use only these levels:

- **Blocker** — structure makes a major recurring/high-consequence job unreliable, ambiguous, or dangerously easy to perform in the wrong context.
- **Major** — architecture creates substantial confusion, duplication, context loss, or unnecessary cognitive load.
- **Minor** — a real findability/orientation issue with limited task impact.
- **Note** — observation or uncertainty that needs evidence; not a defect yet.

Do not inflate severity to make the review sound rigorous.

## Required output

### Part 1 — Findings

Use one table:

| Severity | Area | Evidence | IA problem | Why it matters | Direction |
|---|---|---|---|---|---|

Be concrete. If code is available, cite route/file/component names.

Do not write a giant redesign inside the table.

### Part 2 — Architecture read

Summarize the product's current implied model in 3–8 bullets:
- what the product appears to be organized around
- where that model is coherent
- where competing models appear

### Part 3 — Decision

Use one of:

- **Pass** — no material structural issues found.
- **Pass with minor issues** — architecture is sound; localized fixes needed.
- **Needs changes** — several major issues, but the underlying model is recoverable.
- **Structural redesign needed** — the current page/route/navigation model is the source of the problems.

The decision is about the IA only, not visual quality.

## Rules

- Default to evidence, not taste.
- Do not penalize depth merely because a hierarchy has several levels.
- Do not penalize breadth merely because navigation has many items.
- Do not assume fewer clicks is better.
- Do not confuse navigation with IA; navigation is one expression of the underlying structure.
- Do not suggest tabs as the universal repair for page overload.
- Do not call something "validated" because it matches heuristics.
- When uncertainty depends on user behavior, name the appropriate validation method: tree testing, first-click testing, card sorting, task walkthrough, analytics, or usability testing.

For actual restructuring, switch to `improve-ia`.
