# Mafia

Браузерный клиент для игры "Мафия". Next.js 16 + React 19, TypeScript.

## Технологии

**Фреймворки и библиотеки:**

- Next.js 16 (App Router), React 19
- @base-ui/react
- TanStack React Query
- Zod
- next-themes
- Jotai

**Инструменты:**

- TypeScript 6
- oxlint / oxfmt

**Инфраструктура:**

- npm
- TurboPack

## Архитектура

Feature-Sliced Design (FSD). Слои сверху вниз:

- **`app/`** — слой `pages` (Next.js App Router). Страницы, сгруппированные через `(группа)`. Файлы: `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`.
- **`setup/`** — слой `app` (инициализация приложения). CSS, шрифты, провайдеры, store, глобальные настройки.
- **`widgets/`** — композиции сущностей и фич в осмысленные блоки (например, Header).
- **`features/`** — пользовательские сценарии (`auth/`, `theme/`). Внутри: `api/`, `components/`, `schemas/`, `common/`. Публичный API через `index.ts`.
- **`entities/`** — бизнес-сущности (`user/`). Внутри: `models/`, `api/`, `components/`.
- **`shared/`** — переиспользуемая инфраструктура: `api/` (клиент, auth), `components/` (UI-кит), `hooks/`, `utils.ts`.

## Паттерны кода

- Компоненты: директория `ComponentName/` с файлами `index.tsx` и
  `component-name.module.css`.
- Клиентские компоненты: `'use client'` в начале.
- API-функции возвращают `SomeData | ApiError`, где `SomeData` — тип данных конкретной ручки. `ApiError = { details: string }`.
- `export default` — только для page, layout (Next.js convention) и моделей. Всё остальное — именованные `export`.
- Импорты — именованные, кроме Next.js convention (например, `import Link from 'next/link'`).
- `index.ts` в папках — только реэкспорты. Для default экспортов: `export { default as Name }`, для именованных: `export { Name }`.
- Стиль: single quotes, точка с запятой, trailing comma везде, явный `type` для импортов типов (`import type { ... }`).
- Максимальная ширина строки: 85 символов.

## Линтинг и форматирование

- После изменений: `npx oxlint --fix`, затем `npx oxfmt`.
- Перед завершением: `npx oxlint --deny-warnings --format=agent`.
- Конфиги: `.oxlintrc.json` (включая type-aware), `.oxfmtrc.json`.

## Тестирование

**Фреймворки:**

- **Vitest** — модульное и интеграционное тестирование серверных и клиентских
  компонентов, хуков, утилит, моделей и API.
- **Playwright** — сквозное (e2e) тестирование UI, пользовательских сценариев и
  кросс-браузерной совместимости.

**Структура тестов:**

- Тесты Vitest располагаются рядом с тестируемым модулем.
- E2E-тесты Playwright — в `tests/` в корне проекта.

**Команды:**

- `npm run test` — запуск Vitest (unit/integration).
- `npm run test:e2e` — запуск Playwright (e2e).

## Коммиты

Conventional Commits. Пример: `feat(auth): add login form validation`.
