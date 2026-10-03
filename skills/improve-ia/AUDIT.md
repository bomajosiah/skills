# IA Improvement Audit

Audit by root cause, then repair.

## Category 1 — Product model conflict

Hunt for:
- different parts of the UI organizing the same domain differently
- duplicate names for one object
- one label used for multiple concepts
- backend entities exposed as user concepts
- first-class objects with no canonical destination

Repair:
- establish one user-facing domain model
- choose canonical object names and homes
- connect related objects contextually

## Category 2 — Page responsibility overload

Hunt for:
- pages with several unrelated primary verbs
- one page requiring unrelated filter sets
- settings mixed with operations
- creation, monitoring, analysis, and administration on one surface

Repair:
- separate by primary job/object/cadence/consequence
- keep only information required for the same decision together

## Category 3 — Dashboard sprawl

Hunt for:
- exhaustive tables
- edit forms
- management interfaces
- full reports
- configuration
- duplicated collections

Repair:
- reduce to health, change, exceptions, triage, next actions
- provide drill-down into canonical destinations

## Category 4 — Navigation mismatch

Hunt for:
- PRD-shaped nav
- database-shaped nav
- org-chart nav
- vague "More/Tools/Hub" buckets
- unrelated top-level siblings
- object-specific views promoted globally
- duplicate destinations

Repair:
- global = stable product domains
- local = current section/object
- contextual = related object/action
- utility = account/help/search/notifications/workspace

## Category 5 — Wrong surface type

Hunt for:
- collection management inside dashboard cards
- deep reports in modal windows
- multi-step tasks in drawers
- independent areas hidden in tabs
- configuration embedded in operational pages

Repair:
choose the correct surface:
- dashboard
- collection
- detail/workspace
- queue/inbox
- workflow
- report/exploration
- settings/admin
- utility

## Category 6 — Disclosure failure

Hunt for:
- critical actions hidden in overflow
- 8+ unrelated tabs
- nested accordions as product structure
- nested drawers/modals
- all advanced controls always visible
- excessive page splitting causing context loss

Repair:
- expose frequent/critical actions
- defer genuinely secondary complexity
- use routes/local nav for substantial peers
- keep same-decision information together

## Category 7 — Search/filter ambiguity

Hunt for:
- controls with unclear scope
- one filter changing unrelated modules
- global search that silently excludes important object types
- context lost on drill-down/back
- large collections without suitable filtering

Repair:
- label scope
- separate global/scoped search
- preserve query/filter state
- use saved views where repeated analysis is common

## Category 8 — Settings/admin leakage

Hunt for:
- roles, billing, integrations, policies, notifications preferences mixed with daily work
- several settings homes
- destructive/admin actions beside routine actions

Repair:
- consolidate administration
- use contextual links into the canonical settings destination
- preserve role/permission clarity

## Category 9 — Wayfinding/context loss

Hunt for:
- no selected nav state
- pages that cannot explain their parent context
- deep routes with no local orientation
- back behavior that destroys state
- modal stacks
- orphan pages reachable only from one obscure path

Repair:
- titles
- selected states
- local nav
- breadcrumbs when useful
- durable URLs
- preserved filters/state
- contextual links

## Category 10 — Scale failure

Hunt for assumptions that only work with:
- a handful of records
- one role
- one location
- a few reports
- a few integrations

Repair:
- collections
- search/filter/sort
- grouping
- saved views
- contextual subnavigation
- archives/status
- permission-aware visibility

## Anti-pattern shorthand

Use these names when useful:

- Everything Dashboard
- Cardification
- Tab Dump
- Modal Application
- Feature-List Navigation
- Database IA
- Org-Chart IA
- Settings Leakage
- Dashboard Duplication
- Filter Soup
- More-as-Architecture
- Premature Minimalism
- Click Compression
- Disconnected Actions

These are diagnostic labels, not substitutes for evidence.
