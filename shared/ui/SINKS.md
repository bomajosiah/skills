# Where information goes instead

Agents put explanation on the page because nothing else is available. This file lists the alternatives: standard patterns that hold information until the user asks for it, or until the moment it matters. A design system needs these components **before** you remove the narration, or the narration grows back.

## Routing

For every sentence you want to add to a screen, take the first match:

| The sentence… | Goes to | Example |
|---|---|---|
| prevents a mistake on this action, now | **Inline, at the point of action**: label, error, consequence line on a destructive confirm | "Deleting removes 14 tickets. This can't be undone." |
| states a format most users get wrong | **Field hint** | "DD/MM/YYYY" |
| defines a metric, term or calculation | **Info tip** | ⓘ next to "Turnaround" |
| needs more than two sentences to define | **Help article** linked from the info tip ("Learn more") | |
| teaches a feature at the moment it becomes relevant | **Just-in-time tip**, triggered by behavior, once | After the first ticket is scanned: "Scan the tag to move it to the bench" |
| teaches where things are, or how an area works | **Walkthrough** (coach marks): one step ideally, 3–4 at most | A new area the user opened on purpose |
| needs more than a one-sentence hint on a form | **Question page**: the question gets its own page with the explanation | GOV.UK pattern |
| gets a new account working | **Setup checklist** that disappears when complete | "Connect payments · Invite your team" |
| explains why nothing is here | **Empty state**: one line plus an action | "No overdue invoices." |
| confirms something happened | **Toast**, or an inline success state | "Reprinted. Same tag number." |
| describes the whole environment (test mode, demo data, an integration that's down) | **One system banner**, app-wide | "Test mode. Payments aren't real." |
| announces a change | **What's new / changelog** entry, plus an optional one-time badge | |
| explains a permission | **Enforcement**, plus a refusal only at the boundary | "Only account holders can change billing." |
| says why it was designed this way | **Decision record or code comment**. Never the UI. | |
| is obvious | **Nowhere** | |

## The sink components

Specs short enough to build from. Use the system's primitives (Base UI, Radix, React Aria, or whatever the repo uses) for focus and positioning. Don't hand-roll them.

### Info tip
- An `i` (or `?`) icon button placed **after** the label it explains, in the label's color at reduced emphasis. 16px icon, 24px or larger hit area.
- Opens a **popover on click/tap and focus**, not hover only: hover tooltips don't exist on touch and can't hold a link. A hover preview is fine as an addition.
- Content: one or two sentences, plain text, an optional "Learn more" link. If it needs a heading or a list, it's a help article.
- Accessible name: "About {label}". Escape closes it, focus returns to the trigger.
- One per label at most. If every label on a screen needs one, the labels are wrong.
- Never holds what the user needs to complete the action (password rules, a required format). That goes inline. Never repeats the label (A9).

### Tooltip (different from an info tip)
- Names an icon-only control ("Archive"). Hover and focus. Never holds explanations, links or anything a touch user needs.

### Help entry point
- One persistent Help menu or icon (in the top bar or account menu). It holds "Take the tour" for each area, What's new and search over help articles, and it opens help for the current location first. Anything dismissed can be found again here.

### Help article / side sheet
- For long explanations: a right-side sheet over the current screen (keeps context) or a docs page. Linked from info tips, empty states and the Help menu.

### Just-in-time tip (pull revelation)
- One coach mark, shown the first time a user's behavior makes it relevant (first use of a feature, or a repeated manual action that has a shortcut). NN/g prefers this to tours at launch.
- Once per user, dismissible, logged so it never repeats.

### Walkthrough (product tour, coach marks, spotlight)
- **One step ideally, three or four at most** (Atlassian's spotlight guidance), one at a time. Each step highlights a real element (dimmed backdrop with a cutout, or a ring) with a popover: a title, at most two lines, "Next" and "Skip". Avoid chains of tips (NN/g).
- Prefer a **pull trigger** (the user opened the area on purpose, or a feature flag announces a change) over pushing a tour on first login. Completion is stored per user, server-side if the product has accounts.
- Never the only way to reach or understand a feature.
- Always skippable, never blocks work, and replayable from Help ("Take the tour").
- Anchors are stable `data-tour="…"` attributes, not CSS classes, so tours survive restyling.
- Steps whose anchor is missing (different role, empty data) are skipped silently.

### Setup checklist
- For new accounts: 3–6 tasks with progress, in one place (the home screen or a sidebar card). Each item links to where the task is done and checks itself off from real state.
- Dismissible, and it disappears when done. It's the right home for "connect your payment platform" messages that would otherwise leak into every metric (A6).

### Empty state
- One line saying what will appear here, plus one action that makes it appear. An optional illustration only if the system has a set.
- First-use empty states in complex apps may add **one** sentence on what the feature is for (NN/g's learning cues). No-results and cleared states never do.
- Separate types: first use ("No customers yet. Add customer"), no results ("No matches. Clear filters"), cleared ("No overdue invoices.": good news, no action).

### System banner
- A single app-wide strip for environment state (test mode, demo data, degraded integration). Dismissible per session if not critical. It replaces every per-card provenance note.

### Field hint
- One short sentence, no full stop, no links, tied to the field with `aria-describedby`. Never in the placeholder (GOV.UK).

### Toast
- Confirms something done in the background or off-screen. Short, past tense, with an Undo action where it's possible. Don't use it for errors that need fixing (use inline) or for anything the user must read.

### Decision record
- Where the reasoning goes: a value, a reason, a date and where it applies. Agents read it, users never see it. This is the sink for A5 (rationale leak).

## Building the sinks into a system

1. Add **Info tip**, **Empty state**, **System banner**, **Toast**, **Just-in-time tip**, **Walkthrough** and a **Help entry point** to the component registry, with when-to-use and when-not-to-use.
2. Remove narration slots from component APIs (`eyebrow`, `description`, `subtitle` on cards and page headers), or restrict them to marketing components. A slot that exists gets filled.
3. Give `PageHeader` / `Card` a typed `info` prop that renders an info tip next to the title. That turns the urge to explain into a sink instead of a sentence.
4. Write the routing table above into the system's writing guidance and its `AGENTS.md`.
5. Ratchet: run `node scripts/smells.mjs . --check` in CI so counts can only go down.
