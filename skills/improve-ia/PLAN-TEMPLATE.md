# IA Migration Plan Template

Use for changes too large to execute safely in one pass.

## Plan title

A short structural change, e.g.:
`Extract inventory management from Operations dashboard`

## Problem

- Current user job:
- Current surface(s):
- Root IA failure:
- Evidence:
- User/task impact:

## Target structure

### Canonical destination

`/example/path`

Responsibility:
> This page exists so [role] can [verb] [object/decision].

### Navigation

- Global:
- Local:
- Contextual:
- Utility:

### Drill-down

- Parent →
- Collection →
- Detail →
- Related object/workflow →

## Moves

| Capability | Current home | Target home | Keep shortcut? |
|---|---|---|---|

## Route migration

- new routes
- removed routes
- redirects
- query/state preservation
- browser/back behavior

## Implementation steps

1.
2.
3.

Each step should name concrete routes/components/files when known.

## Do not change

List working logic or unrelated visual areas outside scope.

## Verification

- page responsibility
- dashboard scope
- canonical object home
- nav selected state
- deep link
- filters/sort preserved
- permissions
- responsive navigation
- empty/error/archive states
- no orphaned capability

## Validation after implementation

Choose only what is useful:
- tree test
- first-click test
- task walkthrough
- usability test
- analytics/path review
