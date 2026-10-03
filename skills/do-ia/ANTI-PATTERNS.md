# IA Anti-Patterns

Use these as automatic warnings during construction.

## Everything Dashboard

**Symptom:** metrics, full tables, forms, settings, users, reports, logs, and alerts all land on the home screen.

**Repair:** keep only orientation, monitoring, exceptions, trends, and next actions. Give operational work and configuration canonical homes.

## Cardification

**Symptom:** every requirement becomes a card.

**Repair:** define conceptual grouping and route boundaries before choosing visual containers.

## Tab Dump

**Symptom:** a crowded page becomes many unrelated tabs.

**Repair:** reserve tabs for peer views of the same context. Promote independent areas to routes or local navigation.

## Modal Application

**Symptom:** drawers/modals contain entire workflows or nested navigation.

**Repair:** move substantial, revisitable work to a dedicated route.

## Feature-List Navigation

**Symptom:** top-level navigation mirrors feature bullets from a PRD.

**Repair:** organize around user jobs and first-class objects.

## Database IA

**Symptom:** each backend table becomes a destination.

**Repair:** expose user-facing concepts, not storage structures.

## Org-Chart IA

**Symptom:** navigation mirrors internal departments.

**Repair:** organize around user goals unless the organization itself is the user's mental model.

## Settings Leakage

**Symptom:** billing, roles, integrations, and system configuration compete with daily work.

**Repair:** consolidate administration; add contextual shortcuts only where necessary.

## Dashboard Duplication

**Symptom:** dashboard contains near-complete copies of dedicated collections/reports.

**Repair:** summarize and drill down. One destination should be canonical.

## Filter Soup

**Symptom:** many controls with unclear scope or side effects.

**Repair:** define global/page/list/widget scope explicitly.

## "More" as Architecture

**Symptom:** unresolved destinations accumulate under More, Tools, Miscellaneous.

**Repair:** create meaningful categories or elevate recurring destinations.

## Premature Minimalism

**Symptom:** labels or frequent actions are hidden to make the UI look cleaner.

**Repair:** reduce conceptual complexity before hiding controls.

## Click Compression

**Symptom:** everything is put on one page to avoid clicks.

**Repair:** optimize task cost, information scent, context preservation, and error risk instead of raw click count.

## Disconnected Actions

**Symptom:** users choose an object in one place and act on it elsewhere.

**Repair:** attach actions to the object/workflow and preserve context through transitions.
