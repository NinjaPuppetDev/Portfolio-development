# AGENTS.md

## Project overview

This repository is a Next.js 16 portfolio app for David Raigoza, using the App Router, TypeScript, Tailwind CSS, and a mix of static content pages plus interactive client-side experiences.

- App entry points: [app/page.tsx](app/page.tsx), [app/layout.tsx](app/layout.tsx)
- Main docs: [README.md](README.md), [package.json](package.json)
- Route structure: [app](app)

## Working conventions

- Prefer the existing architecture: server components by default, and explicit `"use client"` only for interactive UI.
- Keep new work aligned with the portfolio’s dark, editorial, high-contrast design language.
- Reuse existing data modules and component patterns before creating new abstractions.
- Preserve SEO metadata and structured data when modifying layout or route-level content.
- Be careful with analytics/third-party scripts in [app/layout.tsx](app/layout.tsx); changes should not break the existing tracking setup.

## Commands

Use the project scripts from [package.json](package.json):

- `pnpm dev` — local development server
- `pnpm build` — production build
- `pnpm lint` — eslint validation
- `pnpm start` — run built app

Use `pnpm` as the default package manager; avoid introducing npm-only or yarn-specific workflows unless explicitly requested.

## Architecture notes

- [app/components](app/components) contains the interactive UI layer and the main portfolio experience.
- [app/data](app/data) stores project data and content definitions.
- [app/api](app/api) contains route handlers for contact, chat, discovery, and body-signal ingestion.
- [lib](lib) contains server-side helper modules such as Supabase and AI integrations.
- [app/store](app/store) contains Zustand state for interactive client features.

## Environment and service boundaries

- Browser-exposed config should use `NEXT_PUBLIC_*` naming.
- Supabase and AI provider keys are likely server-side values; follow the pattern in [lib/supabaseBody.ts](lib/supabaseBody.ts).
- The project includes mock/fallback behavior for some integrations; preserve that behavior unless the task explicitly changes it.

## Content and UX guidance

- Maintain the existing “product design engineer / portfolio” narrative and messaging consistency.
- Keep case-study pages and landing sections consistent with the existing visual system and motion patterns.
- When adding or editing data-driven sections, prefer structured objects and typed data over ad hoc strings.

## Safe edit strategy

- Start by checking the closest existing module or page before creating a new pattern.
- Avoid broad refactors without a clear need; this project has many highly specific, handcrafted UI sections.
- If the task impacts a route, check the related page and relevant API or data module together.

## Do not

- Do not add unrelated framework churn or generic boilerplate.
- Do not remove analytics, structured data, or accessibility patterns without an explicit reason.
- Do not break the fallback behavior for optional external services.

