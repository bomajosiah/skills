---
name: do-ia
description: Design information architecture from scratch for a new product, feature area, dashboard, admin panel, SaaS app, internal tool, marketplace, analytics product, settings system, or other multi-surface interface. Trigger before visual layout or frontend implementation whenever the product structure is not already explicit and validated — even if the user only says "build this app", "make a dashboard", or lists many features. Turn requirements into users, jobs, domain objects, relationships, surfaces, routes, navigation, disclosure rules, and page responsibilities before composing UI. For critiquing an existing structure use review-ia; for restructuring an existing product use improve-ia; for naming IA concepts use ia-vocabulary.
---

# Designing Information Architecture

## Initial response

When invoked without a specific task, respond only with:

> I'm ready to structure the product before we design the screens.

Do not add anything else until the user provides a product, feature set, or brief.

## Scope

This is a construction skill. It does one thing: **turn an ambiguous product brief into a coherent product structure before visual composition or coding**.

It owns:

- domain-object modeling for the interface
- page and route boundaries
- dashboard scope
- navigation hierarchy
- local/contextual navigation
- search/filter scope
- settings/admin separation
- role-aware structure
- progressive disclosure
- page responsibility
- wayfinding

It does not primarily own visual style, motion, component styling, frontend performance, or whether the business should build a feature at all.

If another visual-design skill is available, this skill runs first.

## Operating posture

You are the product's information architect, not a component arranger.

A feature list is raw material, not a sitemap.

Do not translate every bullet in a brief into:
- a card
- a tab
- a sidebar item
- a dashboard widget
- a modal
- a route

First establish what the product *is*.

The goal is not the fewest screens or the fewest clicks. The goal is a structure users can predict.

## Required sequence

Run these steps in order.

### 1. Identify users and recurring jobs

For each meaningful role, identify:

- recurring jobs
- occasional jobs
- high-consequence jobs
- objects they view, own, create, approve, or manage
- permission differences that materially change the experience

Avoid duplicating the whole product per role unless the roles truly have different mental models.

### 2. Identify first-class domain objects

Look for nouns with identity, lifecycle, attributes, relationships, or history.

Examples:
- Customer
- Order
- Project
- Location
- Employee
- Invoice
- Campaign
- Incident

A real first-class object usually deserves a canonical place in the product.

Do not expose backend tables, join records, or implementation concepts unless users genuinely think in those terms.

### 3. Attach actions and decisions to objects

Look for verbs:

- review
- approve
- compare
- schedule
- assign
- investigate
- pay
- publish
- configure
- export

Put actions near the object or workflow they affect.

Do not make users select context in one area and perform the related action somewhere unrelated.

### 4. Map object relationships

Examples:

- Location has Staff
- Customer has Orders
- Project has Tasks
- Supplier has Purchase Orders
- Campaign has Creatives and Results

Relationships determine drill-down, contextual navigation, parent/child structure, and what must remain visible.

### 5. Choose a surface for every major responsibility

Use the surface chooser in `FRAMEWORK.md`.

Typical surface types:

- overview/dashboard
- collection/index
- detail/workspace
- create/edit
- workflow
- queue/inbox
- report/exploration
- settings/administration
- utility/system surface

Never use the dashboard as the default home for a requirement simply because no other home has been designed yet.

### 6. Give each important page one dominant responsibility

Complete:

> This page exists so **[role]** can **[primary verb] [object or decision]**.

A page can support related secondary actions. It should not require a sentence with five unrelated "and"s to explain its purpose.

Split a surface when primary objects, jobs, cadence, permissions, consequence, filters, or revisit patterns diverge.

Keep content together when the same decision genuinely requires it to be seen together.

### 7. Define navigation from the model

Global navigation is for stable, recurring, high-level destinations.

Local navigation is for neighboring views inside the current area or object.

Contextual navigation connects related objects or actions.

Utility navigation holds cross-cutting functions such as account, help, notifications, search, and workspace switching.

Do not make global navigation mirror:
- the PRD
- the database
- the org chart
- the component tree

### 8. Define disclosure

Decide what must be:

- visible immediately
- one click away
- revealed contextually
- hidden in advanced controls
- moved to a dedicated route

Keep frequent and decision-critical actions visible.

Progressive disclosure is not permission to hide important functionality for aesthetic cleanliness.

### 9. Define findability and scope

For search, filters, and sorting, state what each control affects.

Distinguish:

- global search
- scoped search
- page-level filters
- table/list filters
- widget-level controls

Never let a filter silently affect unrelated regions of a page.

### 10. Compose or implement only after the architecture is stable

If the user asked for code, proceed to implementation.

If the user asked for IA only, return the architecture itself.

Do not dump lengthy internal reasoning unless requested.

## Hard rules

1. **Architecture before composition.**
2. A prompt listing many features is not permission to put them on one screen.
3. Dashboards are for orientation, monitoring, triage, exceptions, trends, and useful next actions.
4. Full CRUD, long forms, deep analysis, and system configuration do not belong on the dashboard by default.
5. Tabs are peer views of the same context, not a hiding place for unrelated product areas.
6. Substantial multi-step or revisitable work gets a route, not a modal stack.
7. Settings, billing, integrations, permissions, and system configuration are separated from everyday operational work unless required in context.
8. First-class objects need consistent canonical destinations.
9. Navigation labels should use user/domain language and strong information scent.
10. Do not optimize raw click count at the expense of scan cost, context, comprehension, or error rate.
11. Do not enforce arbitrary rules such as "maximum seven nav items" or "never more than three levels deep."
12. If evidence is missing, make a reasonable structural assumption and state it briefly rather than collapsing everything into one page.

## Dashboard admission gate

Before placing anything on a dashboard, ask:

- Does this help orient, monitor, triage, or choose a next action?
- Is it valuable at dashboard frequency?
- Can it be summarized without becoming misleading?
- Is there a natural drill-down destination?
- Would removing it make the overview materially less useful?

If most answers are no, it belongs elsewhere.

## Route admission gate

A capability probably deserves its own route when users may need to:

- bookmark or share it
- return later
- navigate within it
- compare records
- preserve filters/state
- complete many fields or steps
- recover from errors
- work with it independently of the current page

## Required output when the user asks for an IA deliverable

Return, in this order:

1. **Product model** — users, core jobs, first-class objects.
2. **Surface map** — the major destinations and each page's responsibility.
3. **Navigation model** — global, local/contextual, utility.
4. **Key drill-down paths** — how major objects/workflows connect.
5. **Disclosure decisions** — what is overview vs detail vs settings.
6. **Assumptions / open risks** — only the ones that materially affect structure.

Use a compact tree or table where useful.

## Before finishing

Run the checks in `FRAMEWORK.md` and `ANTI-PATTERNS.md`.

A polished screen with unresolved architecture is not done.
