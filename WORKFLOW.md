# Workflow

This document records project workflow rules that should be followed during development.

## Iteration Artifacts

After every completed iteration, when changes are ready for commit and Pull Request creation, prepare two separate artifacts automatically.

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
