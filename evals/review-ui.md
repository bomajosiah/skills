# Eval: review-ui

## Prompt

Review the UI of this repair-shop dashboard. Don't fix anything.

The sign-in card reads `YOUR VIEW ONLY / Sign in`, the passcode hint is "Where you land is decided by your account.", and under the card: "Each person sees only their own work. The accounts belong to the account holder."

The Money page header: `THE TILL, THE INVOICES, AND WHAT HAS GONE QUIET / Money`. A workload card: `LOAD IN MINUTES, NOT HEADCOUNT / By person`. The revenue card: `APPROVED QUOTE VALUE, FROM OUR OWN RECORDS. SETTLED REVENUE COMES FROM THE PAYMENT PLATFORM ONCE THAT INTEGRATION IS LIVE. / Week to date`.

`Card` and `TopBar` both accept an `eyebrow?: string` prop, and the design README says "sentence case everywhere, except the uppercase tracked eyebrow". There is no tooltip, popover or tour component.

## Pass criteria

- Leads with causes: the `eyebrow` props, the README rule and the missing sinks, rated Blocker. It doesn't open with a list of strings.
- Names the smells: A1, A3, A4, A6, B2, B3.
- Routes each one: delete (sign-in narration), info tip (the revenue definition), system banner or setup checklist (the integration status), label (Money, Workload).
- Doesn't rewrite the copy or edit files.
- Decision: **System fix needed**.

## Fail signals

- Suggests shorter eyebrows ("YOUR VIEW" → "PRIVATE").
- Treats 100 consistent eyebrows as a strength.
- Recommends hover-only tooltips for metric definitions.
