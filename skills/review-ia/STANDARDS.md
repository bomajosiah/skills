# Information Architecture Review Standards

Use this reference whenever a finding needs a precise standard.

## 1. Page responsibility

A major surface should have one dominant purpose.

Good:
> This page exists so a manager can review and resolve inventory exceptions.

Weak:
> This page exists so a manager can see KPIs, manage users, configure integrations, edit menu items, review incidents, and export reports.

Flag when:
- multiple unrelated primary verbs compete
- several first-class objects are managed in parallel without a shared decision
- controls have unrelated scopes
- users must visually parse most of the product to begin one job

## 2. Object coherence

First-class domain objects should have consistent identity and canonical destinations.

Flag:
- one object is represented differently in several product areas
- actions are detached from the object they affect
- backend concepts leak into user-facing IA
- the same entity has competing detail experiences
- related records have no contextual path between them

## 3. Surface fit

Default mapping:

| Need | Surface |
|---|---|
| orientation / monitoring / triage | dashboard |
| many records | collection |
| one record/object | detail/workspace |
| actionable items requiring resolution | queue/inbox |
| focused data entry | create/edit |
| ordered/branching task | workflow |
| deep multidimensional analysis | report/exploration |
| configuration | settings/admin |
| cross-cutting function | utility |

Flag when the surface is doing a job that belongs to a different category.

## 4. Navigation model

Global navigation should contain stable, recurring, high-level destinations.

Local navigation should reveal neighboring views inside the current section/object.

Contextual navigation should connect related objects or next actions.

Utility navigation should hold cross-cutting functions.

Flag:
- PRD/feature-list navigation
- database-table navigation
- org-chart navigation without user justification
- vague containers such as "More" doing structural work
- duplicated destinations
- labels that do not predict content
- important object-specific views promoted globally without reason

## 5. Dashboard discipline

A dashboard is strongest when it answers:

- What is happening?
- What changed?
- What needs attention?
- What should I do next?

Flag:
- full management tables
- long forms
- exhaustive reports
- full settings
- complete copies of dedicated destinations
- widgets whose only justification is "this feature exists"

## 6. Progressive disclosure

Good disclosure preserves essential context while deferring secondary complexity.

Flag:
- frequent actions hidden under overflow menus for aesthetic cleanliness
- 8–15 unrelated tabs
- nested drawers/modals
- advanced controls always visible despite rare use
- critical state hidden several interactions deep
- fragmentation that forces users to bounce between pages to make one decision

## 7. Settings/admin separation

Configuration is usually lower-frequency than operational work.

Flag when:
- billing/integrations/roles/permissions/system behavior compete with daily work
- settings have multiple inconsistent entry points
- destructive administration is mixed with routine editing without adequate context

Contextual shortcuts into settings are fine when they preserve a canonical destination.

## 8. Search and filter scope

Every search/filter should have a predictable target.

Flag:
- one filter silently changes unrelated widgets
- global and local filters look identical
- filters disappear on drill-down and destroy useful context
- search results mix object types without clear labeling/scoping
- high-cardinality collections lack discovery tools

## 9. Roles, permissions, and consequence

The IA should adapt to meaningful access differences without becoming a different product per role.

Flag:
- inaccessible areas appear fully navigable then fail later
- high-risk actions sit beside routine actions without hierarchy
- role-specific needs produce duplicated nav trees that drift
- users cannot tell whether something is unavailable, absent, or restricted

## 10. Wayfinding and resilience

Users should be able to understand location and recover context.

Inspect:
- page titles
- selected navigation state
- breadcrumbs when hierarchy is deep
- local nav
- back behavior
- deep links
- preserved filters/sorts
- empty/error/archived states
- responsive behavior

Flag structures that only make sense from one entry point or one screen width.

## Validation methods

Use the right test for the uncertainty:

- **Card sorting** — discover possible groupings and labels.
- **Tree testing** — evaluate whether users can find destinations in a proposed hierarchy.
- **First-click testing** — evaluate whether users choose the right initial path.
- **Task walkthrough/usability test** — evaluate context loss and end-to-end flow.
- **Search/support-query analysis** — discover user language and missing paths.
- **Analytics/path analysis** — inspect backtracking, dead ends, shortcuts, and heavily used destinations.

Heuristics identify risk. Testing validates the IA.
