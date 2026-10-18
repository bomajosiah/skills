# Research Basis

This suite synthesizes established information-architecture and product-interface guidance into operational rules for AI agents.

## Core IA and UX references

### Nielsen Norman Group

- Information Architecture: Study Guide
  https://www.nngroup.com/articles/ia-study-guide/
- Information Architecture vs. Navigation
  https://www.nngroup.com/articles/ia-vs-navigation/
- Progressive Disclosure
  https://www.nngroup.com/articles/progressive-disclosure/
- Tree Testing: Evaluate Menu Labels and Categories
  https://www.nngroup.com/articles/tree-testing/
- Card Sorting vs. Tree Testing
  https://www.nngroup.com/articles/card-sorting-tree-testing-differences/
- Local Navigation Is a Valuable Orientation and Wayfinding Aid
  https://www.nngroup.com/articles/local-navigation/
- Information Architecture topic collection
  https://www.nngroup.com/topic/information-architecture/

### GOV.UK Design System

- Breadcrumbs
  https://design-system.service.gov.uk/components/breadcrumbs/
- Tabs
  https://design-system.service.gov.uk/components/tabs/
- Step by step navigation
  https://design-system.service.gov.uk/patterns/step-by-step-navigation/
- Navigate a service
  https://design-system.service.gov.uk/patterns/navigate-a-service/

### Microsoft

- Recommendations for implementing an information architecture
  https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/information-architecture

### Tableau

- Best Practices for Effective Dashboards
  https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm

## Skill-structure references

The division into construction, review, improvement, and vocabulary skills is inspired by the way strong public agent-skill libraries keep responsibilities narrow.

Especially useful:

- Emil Kowalski's animation skills:
  - `animate`
  - `review-animations`
  - `improve-animations`
  - `animation-vocabulary`
  https://emilkowal.ski/skill
- Anthropic skill-creator
- Anthropic frontend-design
- Vercel web-design-guidelines

The IA standards in this repo are original synthesis, not a reproduction of any source.

## Interface suite (UI skills and the smells catalog)

Surveyed 2026-10-18; the full landscape with what we took from each is in `research/anti-slop-landscape.md`. Ideas are paraphrased, not copied. The licenses (MIT, Apache-2.0) are recorded there.

### Anti-slop skills and detectors
- gesso-build anti-slop (FIX / FLAG / GATE tiers, rule format) — https://github.com/gesso-build/skills
- Impeccable by Paul Bakaus (named tells, edit-time hook, "a clean scan isn't proof") — https://github.com/pbakaus/impeccable · https://impeccable.style/slop
- Anthropic frontend-design (template-chrome tells: eyebrows, middle dots, arrows, 01/02 markers; remove one element) — https://github.com/anthropics/skills
- taste-skill (three widths; a warning is a failure unless defended; no invented proof) — https://github.com/Leonxlnx/taste-skill
- Vercel web interface guidelines (every state, recovery paths, term economy) — https://github.com/vercel-labs/web-interface-guidelines
- humanizer and Wikipedia's Signs of AI writing (chatbot residue, heading echo) — https://github.com/blader/humanizer · https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- stop-slop (structures: negative listing, false agency) — https://github.com/hardikpandya/stop-slop

### Help patterns (sinks)
- NN/g, Tooltip guidelines — https://www.nngroup.com/articles/tooltip-guidelines/
- NN/g, Instructional overlays and coach marks — https://www.nngroup.com/articles/mobile-instructional-overlay/
- NN/g, Onboarding tutorials vs contextual help — https://www.nngroup.com/articles/onboarding-tutorials/
- NN/g, Empty states in complex applications — https://www.nngroup.com/articles/empty-state-interface-design/
- Atlassian, Onboarding (spotlight) usage — https://atlassian.design/components/onboarding/usage
- GOV.UK Design System, Text input (hint text) — https://design-system.service.gov.uk/components/text-input/

### What none of them cover
None of the surveyed skills targets narration on working product screens (eyebrows, permission and mechanism narration, rationale and status leaks), and none routes removed explanation to a destination. That's the gap this suite fills.
