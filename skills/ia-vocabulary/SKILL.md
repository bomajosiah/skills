---
name: ia-vocabulary
description: Reverse-lookup glossary for information architecture and product-structure language. Use when the user describes an interface-structure idea vaguely and asks "what is this called?", "what's the UX/IA term for…?", or wants more precise words to prompt an AI agent or communicate with designers/engineers. Map plain descriptions such as "a page with all the customers before you open one" to Collection/Index, "navigation that changes based on the project you're in" to Local or Contextual navigation, or "when the whole app gets stuffed into the dashboard" to Everything Dashboard. For naming concepts only; do not redesign the product unless explicitly asked.
---

# Information Architecture Vocabulary

Turn vague descriptions of product structure into precise IA language so the user can communicate and prompt more accurately.

## Initial response

When invoked without a specific description, respond only with:

> Describe the structure or behavior you're trying to name and I'll give you the precise IA term.

## Quick start

The user describes something loosely.

Return:

> **Term** — concise definition.

Then, only if useful:

> **Prompt it as:** "..."

If several terms could fit, list the best match first and at most two close alternatives with one-line distinctions.

## Instructions

1. Read for the underlying structural concept, not keywords.
2. Use `GLOSSARY.md` as the authoritative vocabulary for this skill.
3. Distinguish close terms instead of collapsing them.
4. Prefer the most commonly useful practitioner term over obscure academic language.
5. When a term is a practical shorthand coined in this skill rather than a broadly established industry term, say **working term**.
6. Do not invent a formal-sounding term if the glossary has no match.
7. Do not redesign the UI. This skill names concepts.
8. Keep naming answers tight unless the user asks for teaching/examples.
9. When the user wants language for prompting an agent, provide one natural sentence using the term correctly.

## Common disambiguations

### Global vs local vs contextual navigation

- **Global navigation** — stable access to major product areas.
- **Local navigation** — neighboring destinations within the current section or object.
- **Contextual navigation** — links/actions that appear because of the current object or task.

### Collection vs dashboard

- **Collection / index** — browse/manage many objects of one type.
- **Dashboard / overview** — monitor status, changes, exceptions, and next actions across an area.

### Workflow vs wizard

- **Workflow** — the broader task or process, which may branch or span time.
- **Wizard** — a UI pattern that breaks a guided task into sequential steps.

### Taxonomy vs ontology

- **Taxonomy** — how things are categorized and labeled.
- **Ontology** — what kinds of things exist and how they relate.

### Progressive disclosure vs hiding

- **Progressive disclosure** — intentionally reveal secondary complexity when needed.
- Hiding a frequent or critical action for visual cleanliness is not good progressive disclosure.

### Drill-down vs deep link

- **Drill-down** — moving from summary to more detailed information.
- **Deep link** — a URL that lands directly on a specific nested destination/state.

## Examples

User:
> What's the term for when I have a page with all projects and clicking one opens the page for that project?

Answer:
> **Collection → detail pattern** — A collection/index lets users browse many objects; selecting one opens that object's detail/workspace.
>
> **Prompt it as:** "Use a collection-to-detail IA for Projects rather than managing individual projects inside dashboard cards."

User:
> What's it called when tabs are being used to hide basically five separate products?

Answer:
> **Tab Dump** *(working term)* — Unrelated product areas are forced into tabs even though they have different jobs or conceptual locations.
>
> **Prompt it as:** "Avoid a tab dump; promote independent product areas to routes or local navigation."

User:
> The nav inside one customer changes to Overview, Orders, Notes, Billing.

Answer:
> **Local navigation** — Navigation scoped to the user's current section or object, showing sibling views within that context.
>
> A related term is **object subnavigation** if you want to emphasize that all views belong to the same Customer.

Load `GLOSSARY.md` for the full reverse-lookup vocabulary.
