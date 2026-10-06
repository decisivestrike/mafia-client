# Mafia

Браузерный клиент для игры «Мафия». Next.js 16 + React 19, Tailwind CSS v4, TypeScript.

## Технологии

**Фреймворки и библиотеки:**

- Next.js 16 (App Router), React 19
- @base-ui/react
- TanStack React Query
- Tailwind CSS v4
- `cn`
- Zod
- next-themes
- Jotai v3

**Инструменты:**

- TypeScript 7
- oxlint / oxfmt
- PostCSS

**Инфраструктура:**

- npm
- TurboPack

## Архитектура

Feature-Sliced Design (адаптированный):

- **`app/`** — страницы Next.js App Router. Группировка через `(группа)`. Файлы: `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`.
- **`entities/`** — доменные сущности (`user/`). Внутри: `models/`, `api/`, `components/`.
- **`features/`** — фичи (`auth/`, `theme/`). Внутри: `api/`, `components/`, `schemas/`, `common/`. Публичный API через `index.ts`.
- **`shared/`** — общая инфраструктура: `api/` (клиент, auth), `components/` (переиспользуемые UI), `hooks/`, `utils.ts`.
- **`widgets/`** — страничные компоненты (Header).
- **`_app/`** — инициализация приложения (CSS, шрифты, провайдеры, store).

## Паттерны кода

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

## Коммиты

Conventional Commits. Пример: `feat(auth): add login form validation`.
