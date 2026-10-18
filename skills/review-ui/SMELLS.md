# AI smells in product UI

A catalog of the patterns that make an interface read as agent-made. Each entry has an id (used by reviews and by the bundled scanner, `scripts/smells.mjs`), how to spot it, why it's wrong, and what to do instead. "Instead" usually means **moving the information to the right place** (see `SINKS.md`), not rewording it.

Each entry has a **tier**, borrowed from gesso's anti-slop guards:
- **FIX**: deterministic; delete or replace without asking.
- **FLAG**: needs judgment; propose a change with its destination.
- **GATE**: blocks shipping until a person decides (it's in the system, or the claim may be false).

A clean scan doesn't prove quality (Impeccable makes the same point). The scanner catches tells; a person judges design.

## Why agents produce these

Fix the cause, or the smell comes back on the next screen.

1. **Explaining by default.** In chat, a model justifies every answer, and that habit carries into the interface. A screen is not an answer, though, and it doesn't need to defend itself.
2. **Rationale leak.** The PRD, the decision log and the agent's own reasoning are in context, so they end up in the copy. Design reasoning belongs in the decision record.
3. **Slot filling.** An optional `eyebrow`, `subtitle`, `description` or `hint` prop is a blank, and agents fill every blank. If a component API offers a narration slot, expect it on every instance.
4. **No sink.** If the system has no info tip, tour or help link, the explanation has nowhere to go except onto the page.
5. **Grading by reading.** An agent that can't see the screen judges it by its words, and thoughtful-sounding words pass. Narration looks like care in a diff but like noise on screen.
6. **House voice bleed.** The repo's literary voice (commit messages, docs) becomes the UI's voice.

## A. Narration: copy about the interface

### A1 · Eyebrow narration · FLAG (GATE when it's a component prop)
**Spot:** small uppercase, letter-spaced text above a title on an app screen or card. `eyebrow=`, `kicker=`, `overline=` props; `textTransform: uppercase` with `letterSpacing`.
**Example:** `YOUR VIEW ONLY / Sign in` · `LOAD IN MINUTES, NOT HEADCOUNT / By person` · `THE TILL, THE INVOICES, AND WHAT HAS GONE QUIET / Money`
**Why:** it adds a second headline that is always read first, it's harder to read (uppercase plus tracking), and it gives every block the same anatomy, so nothing stands out. Well-designed operational dashboards don't do this.
**Instead:** delete it. If it defines a metric, use an info tip. If it gives a count or state ("3 urgent"), put a badge or count next to the title. If it's a category, the navigation or breadcrumb already says so.
**Allowed:** on marketing pages, at most one per page, as a real category label of three words or fewer ("Pricing", "Case study"). Never a sentence.

### A2 · Restating caption
**Spot:** a subtitle or description that repeats the title in more words.
**Example:** `Customers: all of your customers in one place` · `Settings: manage your settings`
**Instead:** delete it.

### A3 · Reassurance and permission narration
**Spot:** telling the user what they can't see, can't do, or don't need to worry about.
**Example:** `Your view only` · `Each person sees only their own work` · `No password needed` · `Only the account holder changes these`
**Why:** it's either obvious ("duh") or a permission rule the interface should *enforce*, not announce. Explaining access on every screen reads as anxious.
**Instead:** enforce it silently. Show a refusal only when someone actually hits the boundary, at that moment ("Only account holders can change billing. Ask Jo.").

### A4 · Mechanism narration
**Spot:** explaining how the system works internally.
**Example:** `Where you land is decided by your account` · `Reprints never change the number` · `Matched from the platform`
**Instead:** let the behavior speak. If it really surprises people, it goes in a help article or tour, or appears once at the moment it happens (a toast after the reprint: "Reprinted. Same tag number.").

### A5 · Rationale leak
**Spot:** defensive or philosophical asides that justify a design decision; "not X" and "rather than" phrasing aimed at an imagined critic.
**Example:** `Workload over the window. Not a ranking.` · `Turn a rule down rather than the agent off`
**Why:** this is the builder arguing with themselves on screen. Users didn't raise the objection.
**Instead:** decision record or code comment. If it really matters to users (for example, a metric that could be misused), state the metric's definition in its info tip.

### A6 · Status and provenance leak
**Spot:** implementation state, data sources or integration status written into feature copy.
**Example:** `Approved quote value, from our own records. Settled revenue comes from the payment platform once that integration is live.`
**Instead:** one system-level indicator (a test-mode or demo banner, a "Connect payments" setup task) and the metric's definition in an info tip. Never repeat it per card.

### A7 · Sort and scope narration
**Spot:** `Newest first` · `Per channel and per purpose` · `Showing all items` as captions.
**Instead:** the sort control, column header arrow or filter chip shows it. If there's no control, the default doesn't need announcing.

### A8 · Lecturing empty state
**Spot:** an empty state with a paragraph explaining the feature's philosophy.
**Instead:** one line saying what will appear here, plus the action that makes it appear. Separate "nothing yet" from "no results".

### A9 · Tooltip echo · FIX
**Spot:** tooltip or info tip text that repeats the label ("Turnaround: the turnaround time").
**Instead:** define it, or remove the tip.

### A10 · Placeholder as label or hint · GATE
**Spot:** a field whose only label, format or example is in `placeholder`.
**Why:** it disappears on typing and fails accessibility (GOV.UK, Impeccable P0).
**Instead:** a visible label, plus a hint if the format is non-obvious.

### A11 · Chatbot residue · FIX
**Spot:** "Certainly!", "Great question", "I hope this helps", "As an AI…" in UI strings or AI-feature output shown to users.
**Instead:** strip it in the output pipeline; the product voice is the shop's, not the model's.

## B. Voice: clever over clear

### B1 · Literary headings
**Spot:** headings that are phrases, not labels. `Money that has gone quiet` · `What a job through each door is worth` · `Who has what`
**Why:** dashboards are scanned, not read. Labels are nouns a user can find again.
**Instead:** `Overdue invoices` · `Revenue by channel` · `Assignments`.

### B2 · Antithesis tic
**Spot:** "X, not Y." `Load in minutes, not headcount.` `Measured, not guessed.`
**Instead:** say X. If Y matters, it's a definition (info tip) or a decision (record).

### B3 · Rule-of-three lists
**Spot:** headings and captions built as triads. `The till, the invoices, and what has gone quiet.`
**Instead:** the section title. The contents show the rest.

### B4 · Second-person hand-holding
**Spot:** `Here you can…` · `This page lets you…` · `You'll see…` · `Your morning message`
**Instead:** name the thing. "Morning message".

### B5 · Benefit-speak · FIX
**Spot:** seamless, effortless, supercharge, unlock, elevate, world-class, powerful, in product copy.
**Instead:** say what it does.

### B6 · Vague verbs · FLAG
**Spot:** buttons labelled Submit, OK, Continue, Confirm, Done where an outcome could be named.
**Instead:** verb and object: "Send quote", "Delete file".

### B7 · Apologetic or dead-end errors · FIX
**Spot:** "Oops", "Uh-oh", "Something went wrong" with no cause and no next step.
**Instead:** what happened, and what to do. Keep the user's input.

### B8 · Term drift · FLAG
**Spot:** one object with several names across screens (job / ticket / repair / order).
**Instead:** one term per object, recorded in the system's vocabulary. Agents vary synonyms to avoid repetition; interfaces need repetition.

### B9 · Dash and colon cadence · FIX
**Spot:** an em dash in most strings, "The result: …" reveals, "WORD — fragment" labels.
**Instead:** plain sentences. Labels have no punctuation drama.

## C. Composition: everything the same weight

### C1 · Uniform block anatomy
**Spot:** every section is eyebrow, title, caption, then a card. Squint: is anything louder than anything else?
**Instead:** one primary region per screen. Vary the treatment (a plain list, a table, a bare number) instead of wrapping everything the same way.

### C2 · Card soup
**Spot:** every group in a bordered, rounded, padded card; cards inside cards; a card holding a single sentence.
**Instead:** use space and dividers for grouping. Save a card for something that is an object (a ticket, a customer) or a distinct region.

### C3 · Explained metrics
**Spot:** a caption under every number. `42 · jobs in progress, counted from intake to pickup`
**Instead:** a short label, the number, and an optional change or comparison. The definition goes in an info tip on the label.

### C4 · A hint on every field
**Spot:** helper text under fields whose format is obvious.
**Instead:** a hint only when the format is non-obvious or most users get it wrong (a date format, an ID's location). GOV.UK's rule: hint text is for help most users need.

### C5 · Decoration as design
**Spot:** a colored left border on cards, gradient blobs, an icon in every heading, emoji, pills for non-status text, glows.
**Instead:** color carries meaning (status, data series, one accent). Icons do the job of a label or replace one; they don't sit next to every label.

### C6 · No primary action
**Spot:** several same-weight buttons; every section has its own button row.
**Instead:** one primary action per view; the rest secondary or in an overflow menu.

### C7 · Off-system styling
**Spot:** inline `style={{…}}`, raw hex values, one-off font sizes in screens.
**Why:** it's how the smells above get past the system. Each one-off is an untested design decision.
**Instead:** compose system components and tokens. Missing a component is a system gap, so add it to the system.

### C8 · Typographic labelling devices · FLAG
**Spot:** middle-dot meta strings ("A · B · C") as decoration, 01/02/03 markers on things that aren't a sequence, "→" appended to links and buttons, monospace for small labels that aren't data, one accented word in a headline, bold as decoration. (Anthropic's frontend-design names most of these as template chrome.)
**Instead:** structural devices only where they carry information: numbers for real steps, mono for real codes and IDs.

### C9 · Icon tile above every heading · FIX
**Spot:** a rounded square holding an icon, stacked above each heading or feature card.
**Instead:** drop it, or put a small inline icon only where it aids recognition.

### C10 · Status noise · FLAG
**Spot:** pulsing dots, "LIVE" badges, chips on text that isn't a status.
**Instead:** status shown only for real state changes, with text, not color alone.

### C11 · Uniform motion · FLAG
**Spot:** every section fades and slides up; every card lifts on hover.
**Instead:** motion where it explains a change (something opened, moved, arrived). See the animation skills.

### C12 · Invented proof · GATE
**Spot:** fake stats (99.9%, 10x), "trusted by thousands", placeholder logos and testimonials, demo numbers presented as real.
**Instead:** real evidence or nothing. Sample data is labelled as sample.

### C13 · Overstuffed rows · FLAG
**Spot:** a repeated list row with more than four pieces of information.
**Instead:** keep what the user scans by; move the rest to the detail view.

### C14 · Hero-metric template · FLAG
**Spot:** huge number, small label, strip of supporting stats, gradient accent, used as the default top of a dashboard.
**Instead:** lead with what needs action (a queue, the overdue list), not a vanity number.

## D. Disclosure: help in the wrong place

### D1 · Always-on teaching
**Spot:** onboarding copy permanently on a working screen ("Start here: tickets move left to right as…").
**Instead:** a just-in-time tip triggered by what the user does, or a short walkthrough (one step ideally, three or four at most), dismissible and findable again from Help. Or a setup checklist that disappears when done.

### D2 · Inline docs
**Spot:** a paragraph explaining a concept above a table or chart.
**Instead:** an info tip for one or two sentences; a "Learn more" link to a help article for anything longer.

## Review discipline

Borrowed from the strongest public skills (see RESEARCH-BASIS.md):
- **Judge pixels at three widths**: 1440, 768 and 390. Code-only reviews say so.
- **A warning is a failure** unless you can defend it in one sentence (taste-skill).
- **Check every state**: empty, sparse, dense, error, loading, and a next step from each (Vercel).
- **Stress the data**: long names, huge counts, one-letter names, empty lists (Emil Kowalski's break-ui).
- **Remove one thing.** After the screenshot critique, take one element away and see if anything is lost (Anthropic frontend-design).

## The test

Cover the copy and ask, for each sentence on screen:

1. Would a user do something wrong, or lose something, without it, **right here**? Keep it, at the point of action.
2. Would a user *sometimes* want it? Move it to the place they can pull it from (`SINKS.md`).
3. Neither? Delete it.

A good working screen is mostly nouns, numbers and verbs.
