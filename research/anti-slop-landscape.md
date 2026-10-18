# Anti-slop landscape: skills, rules and lint tools for product UI and UI copy

Researched 2026-10-18. Read-only web research; nothing was installed. Star and install counts are as shown on the fetched page that day and change quickly. "Verified" means the page itself was fetched. "Search only" means it was seen only through search results or third-party listings.

Baseline compared against: `shared/ui/SMELLS.md` (A1–A8, B1–B4, C1–C7, D1–D2) and `shared/ui/SINKS.md` (info tip, tooltip, help article, walkthrough, setup checklist, empty state, system banner, toast, decision record, plus the routing table).

**Main finding.** Most of the ecosystem targets **marketing and landing-page visuals** (fonts, gradients, cards, hero layouts) or **long-form prose** (essays, docs). Almost nothing targets **narration in working product screens**, which is what our A-class and D-class smells cover. No skill we found has a routing table or sink catalog like `SINKS.md`. The useful imports are (a) the detector rule format and specific visual and copy rules, (b) prose-tell lists that map onto our B class, and (c) help-pattern research that should correct our walkthrough and tooltip specs.

---

## 1) Top picks to adapt (ranked)

1. **gesso-build/skills `anti-slop`** (MIT). https://github.com/gesso-build/skills
   **Take the rule format:** each of its 73 guards has an id, a condition, a numeric threshold and a tier: **FIX** (deterministic auto-fix), **FLAG** (needs judgment) or **GATE** (blocks shipping). Rebuild `ux smells` on this format. Copy these rules nearly as they are: `hero-kicker-eyebrow` and `row-kicker-eyebrow` (A1, with structural conditions), `nested-cards` (C2), `edge-stripe` (≥3px side border, C5), `emoji-icon`, `not-x-but-y-cadence` (B2), `benefit-speak`, `fabricated-precision`, `apologetic-error-copy`, `em-dash-copy`, `lorem-ipsum`, `live-clock-eyebrow`, `stat-label-icon`, `icon-topped-feature-card`, `overstuffed-row` (>4 info slots per repeated row) and `ghost-card`. Its workflow is also worth copying: run the detector, apply the FIXes, propose edits for the FLAGs, then add the agent's own judgment, labelled as such.

2. **Impeccable** by Paul Bakaus (Apache-2.0, about 82.5k stars). https://github.com/pbakaus/impeccable, catalog at https://impeccable.style/slop
   **Take:** (a) the named-tell catalog. Items we lack include *label above a heading*, *badge above the main headline*, *icon tile stacked above heading*, *tiny numbered section labels*, *pulsing status dot*, *flat type hierarchy*, *monotonous spacing*, *hero metric layout*, *forced contrast* and *calling things "theater"*. (b) The **design hook** that runs the detector on every UI edit, which is a better trigger than CI alone. (c) Directional commands (`quieter`, `distill`, `clarify`). `distill` and `quieter` are close to our improve-ui intent. (d) Severity tiers P0–P3, with **placeholder-only labels as P0**. (e) Its candid caveat that a clean run does not prove quality, which we should state in review-ui too.

3. **Anthropic `frontend-design`** (Apache-2.0). https://github.com/anthropics/skills/tree/main/skills/frontend-design
   **Take:** its explicit tell list for typography and decorative devices. Most of these are new to us: **tracked all-caps eyebrows and "unnecessary typographic labels above content"** (confirms A1), **accenting one word in a headline**, **middle-dot meta strings ("A · B · C")**, **"WORD — fragment" labels**, **arrows appended to link and button text**, **numbered markers (01/02/03) when the content isn't a sequence**, **monospace for small data labels**, **fade-and-slide-up on every section**, **hover transitions on every card**, **identical rounded SaaS cards with the same soft shadow**, and **the big-number hero with supporting stats**. Also take two process steps: *review the plan against the brief and revise anything that reads as a generic default*, and *critique from a screenshot, then remove one element*. Both fit do-ui and review-ui.

4. **NN/g plus Atlassian help-pattern guidance** (cite only, do not copy).
   **Take corrections to SINKS.md:** NN/g says to **avoid chains of tips**, show **one hint at the relevant moment**, and prefer **pull** revelations (triggered by a user signal; Figma shows a text tip only after a text box is added) over **push** tours at launch. Atlassian says spotlights should **ideally have a single step**, with 3–4 at most, one at a time, never as the only path to a feature, and with copy kept to two lines. Our walkthrough spec currently says "3–5 steps on first visit", which conflicts with both. NN/g tooltip guidance adds: **never repeat the label in the tooltip**, never put task-critical information in one (password rules), and don't use tooltips for feature announcements.

5. **Vercel `web-interface-guidelines` / `web-design-guidelines` skill** (MIT, about 1.0k stars). https://github.com/vercel-labs/web-interface-guidelines
   **Take the state and copy checks:** every screen designs **empty, sparse, dense and error** states; **every screen offers a next step or recovery path**; errors say how to fix the problem; labels are specific; **introduce as few unique terms as possible**; numerals for counts; currency with either 0 or 2 decimals per context, never mixed; status never by color alone; layouts handle short, average and very long content. **Tension:** it says to prefer inline explanations and use tooltips only as a last resort. Our routing already sends mistake-preventing text inline, so add a sentence to SINKS.md: an info tip is for *definitions a user sometimes wants*, never for what they need to complete the action. Note that its Title Case rule is marked Vercel-specific.

6. **blader/humanizer** (MIT, about 57.9k stars) **with Wikipedia "Signs of AI writing"** (CC BY-SA).
   https://github.com/blader/humanizer · https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
   **Take:** the prose patterns that apply to UI strings: *bold as decoration*, *decorative headings* (emoji or arrows in headings; humanizer prefers sentence case), *heading repeated in the first sentence* (our A2), *writing about the document instead of its subject* (our B4), *re-explaining what the reader knows* (our A3), *chatbot residue* ("Certainly!", "I hope this helps"), which matters for AI features in product, *inflated significance* and *forced triads* (B3). Also take Wikipedia's caveat that surface signs are symptoms, which supports our "fix the cause" section. Paraphrase only; do not copy Wikipedia text (share-alike).

7. **hardikpandya/stop-slop** (MIT, about 18.1k stars). https://github.com/hardikpandya/stop-slop
   **Take:** the **5-dimension rubric** (directness, rhythm, trust, authenticity, density, each 1–10, revise below 35/50) as an optional copy score in review-ui. Also take its structure list: *negative listing* (saying what something isn't before what it is), *rhetorical setups*, *false agency* (inanimate subjects doing work, which hides who acts, e.g. "The system decided…", close to A4), *throat-clearing openers* and emphasis adverbs.

8. **Leonxlnx/taste-skill** (MIT, about 98.6k stars). https://github.com/Leonxlnx/taste-skill
   **Take the inspector discipline:** check at **1440 / 768 / 390px**; any FAIL must be fixed, and **any WARN is treated as wrong unless it can be defended in one sentence**. This is a strong review-ui rule. Also take **"no invented proof"** (no fake customers, testimonials, logos or business statistics) and "sample details must be listed in the report for confirmation". That is a fix for demo data in product mockups. Its scope is public pages, not dashboards, and the source says so, so don't import its imagery and motion minimums.

Honourable mention: **GOV.UK Design System hint text** (https://design-system.service.gov.uk/components/text-input/). Use help that most users need, written as **one short sentence with no full stop and no links**. Never use placeholder text as a label, hint or example. This sharpens C4 and the field-hint sink.

---

## 2) Full inventory

| Name | URL | Author | Covers | License | Stars / installs | Take / overlap |
|---|---|---|---|---|---|---|
| anti-slop (skill) + /gesso-critique | github.com/gesso-build/skills ; skills.sh/gesso-build/skills/anti-slop | Gesso (gesso-build) | 73 HTML/CSS guards across color, type, visual, layout, motion, copy, imagery and quality; FIX/FLAG/GATE tiers | MIT (repo README) | 92 stars, 34 installs | Rule format; A1, B2, C2, C5 overlap; new: benefit-speak, fabricated-precision, apologetic errors, em dash, LIVE eyebrow, overstuffed rows. Has no rules for helper text, tooltips or empty states (we lead there) |
| Impeccable | github.com/pbakaus/impeccable ; impeccable.style/slop | Paul Bakaus | 1 skill, 24 commands; `npx impeccable detect` with 59 deterministic rules; editor hook | Apache-2.0 | about 82.5k stars | Tell catalog, hook trigger, P0–P3; overlaps A1, C1, C2, C5; new: icon tile, numbered labels, pulsing dot, flat hierarchy, placeholder-only label |
| frontend-design | github.com/anthropics/skills (skills/frontend-design) | Anthropic | Art direction plus explicit slop list for color, type, decoration, motion and copy | Apache-2.0 (LICENSE.txt) | n/a (top of skills.sh design topic) | Typographic and decorative tells; "revise generic defaults"; "remove one element" |
| taste-skill (design-taste-frontend and variants) | github.com/Leonxlnx/taste-skill | Leonxlnx | Public-page art direction, bans, `inspect.mjs` browser check, `lint.mjs` stock phrases | MIT | about 98.6k stars | Inspector discipline, no invented proof; bans eyebrows/pills/"New" chips (A1), card grids (C2), emoji and gradients (C5) |
| anti-slop-frontend | skills.sh/cryptognome/claude-kit/anti-slop-frontend | cryptognome | Derivative of taste-skill; "Design Read" step, dials | Not stated | 1 install | Low value; "state your read of the brief in one line first" is a nice do-ui opener |
| web-interface-guidelines / web-design-guidelines skill | github.com/vercel-labs/web-interface-guidelines | Vercel | Interactions, a11y, content, copywriting; packaged as a skill and AGENTS.md | MIT | about 1.0k stars | All-states check, no dead ends, error recovery, term economy, numerals and currency; tooltip-last-resort tension |
| emil-design-eng and 15 sibling skills | emilkowal.ski/skill | Emil Kowalski | Motion and polish; `break-ui` stress-tests worst-case data | Not stated on page | n/a | `break-ui` idea = new check (long names, huge counts, empty lists). No copy or anti-slop rules |
| ui-skills (baseline-ui and others) | github.com/ibelick/ui-skills | ibelick | Constraint review for spacing, type, layout; limits gradients and glow (per listings) | MIT | about 9.8k stars | Output format (line, why, code fix). Rules not visible on the fetched page |
| stop-slop | github.com/hardikpandya/stop-slop | Hardik Pandya | Prose: banned phrases, 11 structures, 5-dimension rubric | MIT | about 18.1k stars | Rubric; B2/B3 overlap; new: negative listing, false agency, throat-clearing |
| humanizer | github.com/blader/humanizer | blader | 26 prose patterns (page count on fetch day; listings say 24–29) built on Wikipedia's list | MIT | about 57.9k stars | Bold as decoration, chatbot residue, heading echo (A2), document-about-itself (B4) |
| no-ai-slop | github.com/petergyang/no-ai-slop | Peter Yang | 20+ prose patterns | MIT | about 12.5k stars | New: synonym cycling (term drift in UI), colon reveals, fake-profound endings |
| Voices | github.com/jdkato/voices | jdkato (Vale author) | Vale styles; core = no-ai-slop word lists as Vale rules | MIT | 3 stars | Proof that copy rules can run as Vale; template for a UI-strings Vale style |
| slopless | github.com/berelevant-ai/slopless | berelevant-ai | 50+ deterministic textlint rules for Markdown prose | MIT | 335 stars | textlint preset model; prose only, no UI rules |
| vale-ai-tells | (repo URL not verified) | Krishna Sunkam (per listings) | 17 Vale rules, error vs suggestion tiers, benchmark folder for recall and false positives | MIT (per listings) | n/a | **Search only.** Copy the benchmark idea for our detector |
| deslop (Vale) | (repo URL not verified) | JMill (per listings) | Vale package; each rule must fire on a sloppy sample and stay silent on clean prose | n/a | n/a | **Search only.** Copy the test discipline |
| ux-writing-skill | github.com/content-designer/ux-writing-skill | content-designer | Microcopy patterns and templates (buttons, errors, empty states, onboarding) | MIT | 241 stars, about 1.25k installs (per listings) | Templates for empty states and errors; nothing on AI tells or redundancy |
| owl-listener ux-writing, Uxcel ux-microcopy, nickcrew ux-writer | (aggregator pages only) | various | Microcopy skills | n/a | about 980 / n/a / 1 (listings) | **Search only.** Uxcel: name the outcome on buttons ("Delete file", not "OK") |
| tropes.fyi | (not fetched) | n/a | About 33 AI writing tropes | n/a | n/a | **Search only.** Source for skill-deslop and others |
| Wikipedia: Signs of AI writing | en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing | WikiProject AI Cleanup | Descriptive catalog of tells, with caveats | CC BY-SA | n/a | Title-case headings, boldface, emoji as formatting, negative parallelisms, rule of three; symptoms ≠ cause |
| NN/g Tooltip guidelines | nngroup.com/articles/tooltip-guidelines/ | Nielsen Norman Group | When to use tooltips and what not to put in them | © NN/g | n/a | Never echo the label; nothing vital; not for announcements; hover + focus |
| NN/g Instructional overlays and coach marks | nngroup.com/articles/mobile-instructional-overlay/ | NN/g | Coach-mark findings | © NN/g | n/a | One tip at the relevant moment; avoid chains |
| NN/g Onboarding tutorials vs contextual help | nngroup.com/articles/onboarding-tutorials/ | Page Laubheimer, NN/g (2023) | Push vs pull help | © NN/g | n/a | Pull-triggered tips; dismissible and refindable; skip help for conventional elements |
| NN/g Empty states in complex apps | nngroup.com/articles/empty-state-interface-design/ | NN/g | 3 guidelines | © NN/g | n/a | Status, learning cues, direct pathways; distinguish "loading" from "none" |
| GOV.UK text input / hint text | design-system.service.gov.uk/components/text-input/ | GDS | Hint text and placeholder rules | GOV.UK content is generally OGL v3 (verify) | n/a | One sentence, no full stop, no links; no placeholder as hint |
| Atlassian onboarding (spotlight) | atlassian.design/components/onboarding/usage | Atlassian | Spotlight usage (page deprecated, points to @atlaskit/spotlight) | © Atlassian | n/a | Single step ideal, max 3–4, one at a time, two lines, never the only path |
| Material help & feedback | m2.material.io/design/communication/help-feedback.html | Google | Help placement and icons | © Google | n/a | **Fetch returned no body.** Search snippets: help matches current location; standard Help icon; help in nav drawer or overflow |
| Shopify Polaris content | polaris-react.shopify.com/content/* | Shopify | Content guidelines | © Shopify | n/a | **Not fetched:** the old URL now 301s to shopify.dev/docs/api/polaris. Snippets only (grade 7 reading level; imperative verbs) |
| cursor.directory / awesome-cursorrules | n/a | community | Rules directories | n/a | n/a | **Nothing UI-copy-specific found** in search; not cited |

skills.sh note: the leaderboard and search pages did not render install counts or rows when fetched. The `/topic/design` page lists, without counts: anthropics frontend-design and canvas-design, vercel-labs web-design-guidelines, nextlevelbuilder ui-ux-pro-max, sleekdotdesign sleek-design-mobile-apps, six impeccable commands (polish, critique, bolder, delight, distill, quieter), arvindrk extract-design-system, leonxlnx design-taste-frontend and high-end-visual-design, and emilkowalski emil-design-eng. ui-ux-pro-max was not examined.

---

## 3) New smells, sinks and checks we're missing

Proposed ids continue our scheme. Every one cites its source.

### New smells
| Proposed id | Smell | Spot | Source |
|---|---|---|---|
| A9 | **Tooltip echo** | Tooltip or info tip text restates the label | NN/g tooltips; humanizer #24 (heading echo) |
| A10 | **Placeholder as label or hint** | `placeholder` carries the only label, or the format or example | GOV.UK; Impeccable P0; Vercel |
| A11 | **Chatbot residue in product** | "Certainly!", "Great question", "I hope this helps", knowledge-cutoff disclaimers in AI feature output or UI strings | humanizer #22–23; Wikipedia |
| B5 | **Benefit-speak** | Elevate / Supercharge / Seamless / Unlock / world-class in product copy | gesso `benefit-speak`; Impeccable "generic marketing claims" |
| B6 | **Vague verbs** | Buttons say Submit / Continue / OK instead of naming the outcome | Anthropic frontend-design; Impeccable clarify; Uxcel |
| B7 | **Apologetic or dead-end errors** | "Oops", "Something went wrong" with no fix | gesso `apologetic-error-copy`; Vercel; Anthropic |
| B8 | **Term drift (synonym cycling)** | The same object is called Job / Ticket / Repair on different screens | no-ai-slop; Vercel "few unique terms" |
| B9 | **Colon reveal and dash cadence** | "The result: …", em dash in nearly every string, "WORD — fragment" labels | gesso `em-dash-copy`; Voices; Anthropic; stop-slop |
| B10 | **Negative listing and false agency** | Saying what something isn't first; "The system decided…" | stop-slop structures (extends B2 and A4) |
| C8 | **Typographic labelling devices** | Middle-dot meta strings, 01/02/03 markers on non-sequences, arrows appended to links, monospace small labels, one accented word in a headline, bold as decoration | Anthropic; taste; Impeccable; gesso; humanizer |
| C9 | **Icon tile above heading** | A rounded-square icon above every heading or card (icon-topped feature cards) | Impeccable; gesso `icon-topped-feature-card` |
| C10 | **Status-chip and pulse noise** | Pulsing dots, "LIVE 09:41" badges, chips on non-status text | Impeccable; gesso `live-clock-eyebrow` |
| C11 | **Uniform motion** | Fade-and-slide-up on every section, hover lift on every card, bounce easing | Anthropic; Impeccable; gesso |
| C12 | **Invented proof and fabricated precision** | Fake stats (99.9%, 10x, "trusted by thousands"), fake logos or testimonials, demo numbers presented as real | gesso `fabricated-precision`; taste-skill |
| C13 | **Overstuffed rows** | More than 4 info slots per repeated list row | gesso `overstuffed-row` |
| C14 | **Hero-metric template** | Huge number + small label + stat strip + gradient as the default dashboard top | Anthropic; Impeccable |

Self-check: SINKS.md's own example "Connect payments · Invite your team" uses a middle-dot meta string (C8). Fine as notation, but don't let it read as a UI recommendation.

### Corrections and new sinks
- **Walkthrough spec (correction):** change "3–5 steps" to "**ideally one step, at most 3–4**, one spotlight at a time, never the only way to reach the feature, copy at most two lines". Prefer **pull triggers** (after the user does X) over first-visit push. Sources: Atlassian; NN/g overlays; NN/g onboarding.
- **New sink: just-in-time tip** (pull revelation). A single tip triggered by a behavioral signal (first use of a feature, or a repeated manual action leading to an automation suggestion). Shown once. Sources: NN/g onboarding (Figma example); Atlassian power-user spotlight.
- **New sink: Help entry point.** A persistent Help menu or icon where dismissed tours, "What's new" and articles can be found again. Help content matches the current location. Sources: NN/g ("easy to find again"); Material help & feedback (snippets).
- **New sink: question page** (GOV.UK). When a form field needs more than a one-sentence hint, give the question its own page with explanation instead of a long hint. Source: GOV.UK text input.
- **Empty state nuance:** NN/g allows "learning cues" (what the feature does and how to start) in complex apps. Keep A8 but allow **one** sentence of purpose on *first-use* empty states, never on no-results or cleared states.
- **Info tip vs inline:** add to SINKS.md that an info tip never holds what is needed to complete the action (Vercel "tooltips as last resort"; NN/g "vital information").
- **Field hint rules:** one short sentence, no full stop, no links, referenced via `aria-describedby` (GOV.UK).

### New checks and tooling
- **Tiered rules (FIX / FLAG / GATE)** with documented thresholds (gesso), plus a **P0–P3 severity** on review output (Impeccable).
- **Edit-time hook:** run `ux smells` on UI edits, not only in CI (Impeccable design hook).
- **Detector test discipline:** each rule must fire on a sloppy fixture and stay silent on a clean fixture; keep a recall and false-positive benchmark folder (deslop; vale-ai-tells; both search only).
- **Copy lint via Vale:** ship a Vale style for UI string files (i18n JSON, `*.tsx` literals) covering B2/B5/B6/B7/B9 (Voices shows the pattern).
- **Responsive inspector:** screenshot at 1440 / 768 / 390, and treat a WARN as a failure unless defended in one sentence (taste-skill).
- **All-states check:** every screen has empty, sparse, dense, error and loading states, plus a next step or recovery path (Vercel; NN/g empty states).
- **Worst-case data stress test:** long names, huge counts, one-letter names, empty lists (Emil `break-ui`; Vercel long-content rule).
- **Number hygiene:** numerals for counts, consistent currency decimals, tabular figures in comparisons, abbreviate figures of 10,000 and over in tiles (Vercel; gesso `oversized-number`).
- **Copy score (optional):** stop-slop's 5-dimension rubric applied to all strings on a screen.
- **Process steps for do-ui:** state a one-line read of the brief (cryptognome/taste); revise anything that reads as a generic default; after a screenshot, remove one element (Anthropic).

---

## 4) Licensing notes

- **Apache-2.0** (Anthropic frontend-design, Impeccable): you may copy and adapt text. Keep the license and NOTICE, and mark modified files as changed. Safest approach: paraphrase rules into our own words and credit the source in RESEARCH-BASIS.md.
- **MIT** (gesso-build/skills, taste-skill, Vercel web-interface-guidelines, stop-slop, humanizer, no-ai-slop, Voices, slopless, ui-skills, ux-writing-skill): you may copy, provided the copyright and permission notice travel with substantial portions. Rule *ideas* and ids aren't copyrightable, but if we vendor a rules file (for example gesso `rules.md`), include their LICENSE.
- **Wikipedia (CC BY-SA 4.0):** copying text obliges share-alike for the derivative. **Paraphrase and link only.**
- **NN/g, Atlassian, Google Material, Shopify:** copyrighted guidance. Cite and summarize; don't copy text.
- **GOV.UK Design System:** GOV.UK content is generally under the Open Government Licence v3.0, which allows reuse with attribution. I did not check the licence statement on the fetched page, so verify before quoting.
- **Not stated** on fetched pages: emilkowal.ski/skill, cryptognome/claude-kit. Don't copy from them.

---

## 5) Sources for RESEARCH-BASIS.md (verified: page fetched 2026-10-18)

- https://github.com/gesso-build/skills
- https://raw.githubusercontent.com/gesso-build/skills/main/skills/anti-slop/references/rules.md
- https://skills.sh/gesso-build/skills/anti-slop
- https://github.com/pbakaus/impeccable
- https://impeccable.style
- https://impeccable.style/slop
- https://github.com/anthropics/skills (file: skills/frontend-design/SKILL.md, LICENSE.txt = Apache-2.0)
- https://github.com/Leonxlnx/taste-skill (file: skills/taste-skill/SKILL.md)
- https://github.com/vercel-labs/web-interface-guidelines
- https://github.com/hardikpandya/stop-slop (file: references/structures.md)
- https://github.com/blader/humanizer
- https://github.com/petergyang/no-ai-slop
- https://github.com/jdkato/voices
- https://github.com/berelevant-ai/slopless
- https://github.com/ibelick/ui-skills
- https://github.com/content-designer/ux-writing-skill
- https://emilkowal.ski/skill
- https://skills.sh/topic/design
- https://www.skills.sh/cryptognome/claude-kit/anti-slop-frontend
- https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- https://www.nngroup.com/articles/tooltip-guidelines/
- https://www.nngroup.com/articles/mobile-instructional-overlay/
- https://www.nngroup.com/articles/onboarding-tutorials/
- https://www.nngroup.com/articles/empty-state-interface-design/
- https://design-system.service.gov.uk/components/text-input/
- https://atlassian.design/components/onboarding/usage

**Not verified (do not cite as fetched):** vale-ai-tells and deslop repos (seen via everydev.ai and tomevault listings only); tropes.fyi; Polaris content pages (301 to shopify.dev, not followed); Material help & feedback and M3 tooltips (fetch returned no body); cursor.directory; Uxcel and owl-listener ux-writing skills.
