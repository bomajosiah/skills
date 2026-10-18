# UI glossary

Grouped by what people are trying to describe. Synonyms in parentheses.

## Text around a title

- **Eyebrow** (overline, kicker, pre-heading, tagline): small, often uppercase and tracked text above a heading. Editorial and marketing device. In app UI it's usually smell A1.
- **Subtitle** (subheading, description, lede): text under a title. In app UI it's usually A2 (restating) or narration.
- **Caption**: small text attached to a figure, chart or metric. Under a metric it's usually C3; use an info tip.
- **Helper text** (hint, assistive text, description): text under a form field. Only for non-obvious formats (C4).
- **Label**: the name of a field, column, metric or section. What most "descriptions" should have been.
- **Microcopy**: all the small UI text together: labels, buttons, errors, hints.

## Help on demand

- **Tooltip**: hover/focus label for an icon-only control. Text only, no links. Not for explanations.
- **Info tip** (info icon, help icon, toggletip, contextual help): an ⓘ button that opens a small popover with a definition. Click/tap, not hover only.
- **Toggletip**: an info tip opened by click (Inclusive Components' term).
- **Popover**: a non-modal floating panel anchored to a trigger. It can hold links and controls.
- **Help panel** (side sheet, help drawer): a panel at the side with longer help, keeping the page visible.
- **Help center / knowledge base**: the external docs that info tips link to with "Learn more".

## Teaching new users

- **Walkthrough** (product tour, guided tour, onboarding tour): a sequence of steps over the real interface.
- **Coach mark**: one step of a walkthrough, a callout pointing at an element.
- **Spotlight** (highlight, hotspot): dimming the page except the target element. "Spotlight" is also Atlassian's name for its tour component.
- **Hotspot / beacon**: a small pulsing dot inviting the user to open a coach mark, without interrupting them.
- **Setup checklist** (onboarding checklist, getting started): a persistent task list for new accounts that checks itself off.
- **Empty state**: what a screen shows with no data. The best place to teach once.
- **Feature announcement** ("What's new", changelog): telling users about changes, once.

## Feedback and status

- **Toast** (snackbar): a brief, non-blocking confirmation that disappears on its own, often with Undo.
- **Banner** (system banner, global alert): a full-width strip for app-wide state (test mode, outage).
- **Inline alert** (callout, notice): a message inside the page about that page's content.
- **Inline validation**: an error at the field, as or after the user types.
- **Badge** (pill, tag, chip, lozenge): a small label for status or count. A count badge sits next to a title instead of an eyebrow ("Needs you · 3").
- **Skeleton**: a placeholder in the shape of content while it loads.

## Layout and hierarchy

- **Page header**: the title row of a page, with actions on the right. Not a place for prose.
- **Card**: a bounded container for one object or region. Overuse is card soup (C2).
- **Stat / KPI tile** (metric card, scorecard): label, number, change.
- **Visual hierarchy**: what the eye reads first, second, third. Uniform anatomy (C1) flattens it.
- **Primary action**: the one most important button in a view, given the strongest treatment.
- **Overflow menu** (kebab, "more" menu): where secondary actions go.
- **Progressive disclosure**: showing more only when asked. Info tips, walkthroughs and "Show more" are all forms of it.

## AI-smell names, for briefing agents

| You see | Say |
|---|---|
| Uppercase text over every card | eyebrow narration (A1) |
| A caption that says what the title says | restating caption (A2) |
| "Only you can see this" copy | permission narration (A3) |
| How-it-works text on a working screen | mechanism narration (A4) |
| The UI justifying its own design | rationale leak (A5) |
| "Once the integration is live…" on a metric | status leak (A6) |
| Poetic section titles | literary headings (B1) |
| "X, not Y" | antithesis tic (B2) |
| Every section built the same | uniform block anatomy (C1) |
| Boxes inside boxes | card soup (C2) |
