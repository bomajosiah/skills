---
name: improve-ia
description: >-
  Diagnose and fix the information architecture of an existing product, interface, prototype, or codebase. Use when the user asks to improve, clean up, simplify, restructure, reorganize, fix, refactor, or make sense of an existing dashboard, SaaS app, admin panel, navigation system, route tree, settings area, or feature-rich UI. Unlike review-ia, this skill is action-oriented: reconstruct the current model, identify the highest-leverage structural problems, define a target IA, then apply or specify the restructuring while preserving working capabilities and user context. For a read-only critique use review-ia; for a brand-new product use do-ia.
---

# Improving Information Architecture

## Initial response

When invoked without a specific artifact or question, respond only with:

> I'm ready to find the structural problems and fix the product architecture.

Do not add anything else until the user provides the product, codebase, screenshots, routes, or brief.

## Scope

This is a restructuring skill.

It does one thing: **take an existing product structure that is confusing, overloaded, fragmented, or inconsistent and move it toward a coherent target architecture**.

If source code is available and the user asked to fix the product, implement the IA changes.

If only screenshots/specs are available, produce a concrete restructuring specification that an implementation agent can execute.

Do not stop at "consider simplifying this."

## Operating posture

Treat structural debt like code debt.

The highest-leverage fix is often not:
- a smaller card
- another tab
- a better empty state
- a redesigned sidebar

It may be:
- moving a responsibility to a different surface
- giving a first-class object a canonical route
- separating settings from operations
- turning a dashboard table into a collection
- replacing modal workflows with routes
- defining local navigation
- merging duplicate destinations
- clarifying search/filter scope

Preserve useful capability. Change where and how it is organized.

## Workflow

### 1. Recon

Reconstruct the current IA from available evidence:

- route tree
- navigation
- page responsibilities
- first-class objects
- collections/details
- dashboard modules
- workflows
- overlays
- reports
- settings/admin
- search/filter controls
- role gates

Do not redesign from a screenshot alone if the codebase reveals a different underlying structure.

### 2. Audit

Load `AUDIT.md`.

Identify anti-patterns and structural conflicts.

Group findings by root cause, not by component count.

Example:
- Bad: "Card A is crowded, Card B is crowded, Card C is crowded."
- Better: "The dashboard is acting as the canonical management surface for three independent objects."

### 3. Prioritize

Prioritize using:

**impact × frequency × consequence × structural leverage**

Prefer a small number of changes that remove whole classes of problems.

Typical high-leverage fixes:
- establish canonical object destinations
- repair global navigation
- separate dashboard from management
- extract configuration into settings
- fix route boundaries
- remove modal applications
- clarify collection/detail hierarchy
- define contextual/local navigation

### 4. Define the target architecture

Before editing code, write a compact target map:

- major domains
- routes/surfaces
- page responsibilities
- navigation placement
- important drill-down relationships
- settings/admin ownership
- redirects or route migrations if needed

The target model must be coherent before implementation.

### 5. Apply the changes

When modifying a codebase:

- preserve working business logic
- reuse existing components when the problem is structural, not visual
- move capabilities rather than deleting them
- update navigation and routes together
- keep URL/back-button behavior coherent
- preserve meaningful query/filter state
- add redirects for changed routes when appropriate
- avoid unrelated aesthetic redesign
- do not introduce a second parallel IA during migration

### 6. Verify

Check the new structure against `AUDIT.md`.

Verify:
- every major page has one dominant responsibility
- the dashboard has a narrower purpose
- first-class objects have canonical homes
- navigation reflects the product model
- settings/config are separated appropriately
- complex workflows have durable surfaces
- search/filter scope is explicit
- no feature was accidentally orphaned
- deep links and back behavior still make sense

## Hard rules

1. Fix structural causes before local layout symptoms.
2. Do not "solve" overload by adding tabs unless the contents are peer views of the same context.
3. Do not "solve" overload by hiding frequent actions.
4. Do not move substantial workflows into drawers.
5. Do not make every object top-level navigation.
6. Do not create a new destination unless it has a clear responsibility.
7. Do not delete capability merely to make the IA look cleaner.
8. Keep a canonical home for every first-class object/capability.
9. Preserve user context during route and surface transitions.
10. Do not rewrite unrelated visual design or product logic unless needed for the structural fix.

## Invocation variants

If the user specifies:

- **quick** — inspect the highest-impact architecture only; fix obvious structural failures.
- **deep** — inspect the full route/navigation/surface system and secondary states.
- **dashboard** — focus on dashboard scope, drill-down, and competing responsibilities.
- **navigation** — focus on global/local/contextual/utility navigation and labels.
- **settings** — focus on administration, permissions, integrations, billing, preferences.
- **routes** — focus on page boundaries, canonical destinations, deep links, overlays.
- **plan only** — diagnose and produce a migration plan without modifying code.

## Required output after improvement

Keep the user-facing summary compact:

1. **What changed** — the structural changes.
2. **New architecture** — a short route/surface tree.
3. **Why these changes** — root causes fixed.
4. **Remaining risks** — only unresolved structural questions.
5. **Validation** — what should be tree-tested/usability-tested if evidence is needed.

If code was changed, also name the relevant files/routes.

Use `PLAN-TEMPLATE.md` when the work is large enough to require staged implementation.
