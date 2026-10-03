# IA Construction Framework

Use this reference when requirements could plausibly live in more than one place.

## Placement sequence

Ask, in order:

1. What object or decision is this about?
2. What user job requires it?
3. How often is that job performed?
4. What context must remain visible?
5. Does it have an independent lifecycle or URL-worthy state?
6. Who is allowed to see/change it?
7. What happens if users miss it?
8. Does it require comparison with adjacent information?

Then place it.

## Surface chooser

| User need | Default surface |
|---|---|
| Monitor overall health | Dashboard / overview |
| Find or manage many objects | Collection / index |
| Understand or act on one object | Detail / workspace |
| Work through actionable items | Queue / inbox |
| Enter focused information | Create / edit |
| Complete ordered or branching work | Workflow |
| Analyze deeply across dimensions | Report / exploration |
| Change product/system behavior | Settings / administration |
| Access cross-cutting functions | Utility surface |

## Split-or-keep test

### Bias toward splitting

Split when one or more are strongly true:

- primary verbs differ
- primary objects differ
- cadence differs strongly
- permissions differ substantially
- consequence/risk differs
- controls/filters are unrelated
- independent linking or revisiting would be useful
- the page responsibility becomes a list rather than one dominant clause

### Bias toward keeping together

Keep together when:

- simultaneous comparison is needed
- the same object context is essential
- the same decision requires both sets of information
- splitting creates memory burden or repeated backtracking
- the secondary content is brief and directly supportive

Do not split merely to reduce scrolling.
Do not combine merely to reduce clicks.

## Tab admission test

Tabs are appropriate when:

- every tab is a peer view of the same context
- switching does not change the user's conceptual location
- the tabs share the same parent object or task
- simultaneous viewing is unnecessary
- each view is substantial enough to justify switching

If a tab is effectively a different product area, make it a route.

## Overlay admission test

Use a modal/drawer/popover only when the task is:

- bounded
- contextual
- short enough to recover from easily
- disposable after completion

Use a route when the task needs history, deep linking, multi-step input, comparison, extensive validation, or substantial navigation.

## Navigation-level test

Promote a destination higher when it is:

- stable
- recurring
- conceptually parallel to neighboring destinations
- relevant across multiple workflows
- understandable without current object context

Keep object-specific views contextual.

## Label test

A label should help the user predict what appears after clicking.

Prefer:
- established domain nouns
- clear action verbs when the destination itself is an action
- one stable term per concept

Avoid:
- vague buckets such as More, Hub, Center, Tools
- internal team language
- implementation terminology
- different names for the same thing

## Scale test

Ask what happens when:
- 12 records become 12,000
- one role becomes five
- one location becomes 500
- one report becomes 40
- one integration becomes 30
- archived/inactive records accumulate

A good IA scales by adding depth, filtering, saved views, contextual navigation, and clear ownership — not by turning global navigation into an unstructured feature list.
