# Boma’s Skills

A growing collection of agent skills for designers and engineers. The first collection focuses on making AI-built products structurally coherent before visual polish.

## Install

After the repository is published:

```sh
npx skills add bomajosiah/skills
```

Choose a skill and your agent interactively, or install one with `npx skills add bomajosiah/skills --skill do-ia`.

The landing page is prepared for `skill.bomajosiah.com`. See [PUBLISHING.md](PUBLISHING.md) for publishing, previewing, and adding more skills.

## Information architecture

The suite separates four jobs that are often conflated:

- `do-ia` — design information architecture from scratch.
- `review-ia` — strictly review an existing architecture without redesigning it by default.
- `improve-ia` — diagnose and fix an existing product's information architecture.
- `ia-vocabulary` — reverse-lookup precise IA terminology from vague descriptions.

This separation is intentional. A construction skill should make decisions. A review skill should find failures. An improvement skill should restructure what already exists. A vocabulary skill should name things precisely without pretending to design them.

## Suggested install / repo layout

```text
skills/
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

Do not run all four by default.

## Core philosophy

**Architecture before composition.**

AI agents are often competent at composing components while skipping the structural decisions that should precede them. These skills force a sequence:

`users → jobs → objects → actions → relationships → surfaces → navigation → disclosure → layout`

The goal is not minimalism or fewer screens. The goal is a structure where users can predict where things live, understand where they are, and complete work without carrying unnecessary context in memory.

See `RESEARCH-BASIS.md` for the source material behind the standards and `evals/` for before/after prompts.
