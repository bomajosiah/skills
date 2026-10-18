# Boma’s Skills

A growing collection of agent skills for designers and engineers, for making AI-built products that feel designed. Two suites so far: **structure** (information architecture) and **surface** (UI without the AI smells).

## Install

```sh
npx skills add bomajosiah/skills
```

Choose skills and your agent interactively, or install some by name:

```sh
npx skills add bomajosiah/skills --skill review-ui --skill improve-ui
```

The landing page is prepared for `skill.bomajosiah.com`. See [PUBLISHING.md](PUBLISHING.md) for publishing, previewing, and adding more skills.

## Information architecture

The suite separates four jobs that are often conflated:

- `do-ia` — design information architecture from scratch.
- `review-ia` — strictly review an existing architecture without redesigning it by default.
- `improve-ia` — diagnose and fix an existing product's information architecture.
- `ia-vocabulary` — reverse-lookup precise IA terminology from vague descriptions.

This separation is intentional. A construction skill should make decisions. A review skill should find failures. An improvement skill should restructure what already exists. A vocabulary skill should name things precisely without pretending to design them.

## Interface

The second suite works on the surface, after the structure is right. It targets the patterns that make an interface read as agent-made: eyebrow text, narrating captions, design reasoning on screen, literary headings, card soup.

- `do-ui`: compose new screens with a copy budget and help in the right places.
- `review-ui`: find the smells and the system choices that keep producing them. Read-only.
- `improve-ui`: fix the cause (component APIs, rules, missing sinks), sweep the screens, ratchet.
- `ui-vocabulary`: name UI and help patterns precisely (eyebrow, toggletip, coach mark, spotlight).

The shared references are canonical in `shared/ui/` (`SMELLS.md`: the catalog; `SINKS.md`: where information goes instead) and copied into each skill at build time (`shared/manifest.json`). Edit them there, not in the skill folders. `shared/ui/scripts/smells.mjs` is the scanner, bundled into `do-ui`, `review-ui` and `improve-ui` as `scripts/smells.mjs`. It has no dependencies and can be copied into any repo for CI. Its tests (`npm test`) check that every rule fires on a bad fixture and stays silent on a clean one. Tools like UX Mapper can call an installed copy, but the skills don't depend on them.

**Information goes somewhere.** Removing narration only sticks if the system has a place for the information: an info tip, a walkthrough, an empty state, a decision record.

## Repo layout

```text
shared/ui/              canonical SMELLS.md, SINKS.md, scripts/smells.mjs
shared/manifest.json    which shared files each skill gets at build time
tests/                  scanner fixtures: bad/ must fire, clean/ must stay silent
skills/
  do-ui/ review-ui/ improve-ui/
    SKILL.md
    SMELLS.md SINKS.md  (copied from shared/)
    scripts/smells.mjs  (copied from shared/)
  ui-vocabulary/
    SKILL.md
    GLOSSARY.md
  do-ia/
    SKILL.md
    FRAMEWORK.md
    ANTI-PATTERNS.md
  review-ia/
    SKILL.md
    STANDARDS.md
  improve-ia/
    SKILL.md
    AUDIT.md
    PLAN-TEMPLATE.md
  ia-vocabulary/
    SKILL.md
    GLOSSARY.md
```

Each skill is self-contained enough to install independently.

## Recommended order

When several skills are available:

1. New product or major new area: `do-ia`
2. Existing structure, critique only: `review-ia`
3. Existing structure, asked to make it better: `improve-ia`
4. User is trying to name a pattern/concept: `ia-vocabulary`

Then the surface, the same way: `do-ui` for new screens, `review-ui` to critique, `improve-ui` to fix, `ui-vocabulary` to name things. Structure comes first. Polishing a screen that's in the wrong place is wasted work.

Don't run every skill by default.

## Core philosophy

**Architecture before composition.**

AI agents are often competent at composing components while skipping the structural decisions that should precede them. These skills force a sequence:

`users → jobs → objects → actions → relationships → surfaces → navigation → disclosure → layout`

The goal is not minimalism or fewer screens. The goal is a structure where users can predict where things live, understand where they are, and complete work without carrying unnecessary context in memory.

See `RESEARCH-BASIS.md` for the source material behind the standards and `evals/` for before/after prompts.
