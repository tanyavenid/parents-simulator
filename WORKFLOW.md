# Workflow

This document records project workflow rules that should be followed during development.

## Iteration Artifacts

After every completed iteration, when changes are ready for commit and Pull Request creation, prepare two separate summaries automatically in chat.

Create separate summary files only when explicitly requested or when the team decides that a specific iteration needs a persistent written artifact in the repository.

### Pull Request Summary

Use this summary for GitHub Pull Requests.

Structure:

```md
# Изменения

## Интерфейс
...

## Визуальная часть
...

## Техническая часть
...
```

Rules:

- Include only completed changes.
- Do not include conclusions, future plans, reasoning, or open questions.
- Keep it concise and easy to paste into a GitHub PR description.
- Output it in chat by default.

### Iteration Summary

Use this as the internal project journal for continuing work later.

Structure:

```md
# Итерация N

## Цель итерации

## Что сделали

## Какие гипотезы проверили

## Какие решения приняли

## Что осталось открытым

## Предлагаемый следующий шаг
```

Rules:

- Treat this as a working project log, not a changelog.
- Capture why meaningful product, UX, visual, or technical decisions were made.
- Include unresolved questions and the recommended next step.
- Prepare it automatically at the end of each completed iteration without waiting for a separate request.
- Output it in chat by default.

## Open Questions

Product, UX, visual, or scenario questions that require a user decision should be reported in chat after the iteration.

Rules:

- Do not store unresolved questions in project `.md` files.
- Separate blocking questions from non-blocking questions.
- Continue documentation updates only after the user answers the relevant questions.

## Verification

Do not run long checks automatically for documentation, planning, UX, PRD, scenario, or architecture-only tasks.

Run build, tests, lint, or similar checks only when:

- code was changed;
- the user explicitly asks to verify the project;
- the check is necessary to confirm that the completed implementation still works.
