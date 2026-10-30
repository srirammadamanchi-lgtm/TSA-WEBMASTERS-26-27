# Rules for every AI model working in this repo

Paste or point your AI tool at this file before asking it to change anything.

## What this is

A TSA Webmaster competition entry: an AI learning portal for high school students (grades 9-12).
Static site: Vite + React + TypeScript + Tailwind CSS v4 + React Router. No backend.

## Commands

- `npm install` once, then `npm run dev` to work
- `npm test` and `npm run build` must both pass before opening a PR

## Where things go

| Path | What | Who edits |
|---|---|---|
| `src/modules/prompt-engineering/` | Prompt Engineering lessons | prompt engineering owner |
| `src/modules/concepts/` | AI Fundamentals lessons | concepts owner |
| `src/modules/ethics/` | Ethical AI lessons | ethics owner |
| `src/pages/Start.tsx`, `src/game.ts`, `src/profile.ts` | Start page, AI models, trophies, ranks | start page owner |
| `src/pages/LearnHub.tsx` | Folder-style learning hub | learn hub owner |
| `src/progress/` | XP, levels, badges | gamification owner |
| `src/pages/References.tsx` | Sources (required by TSA) | everyone adds their sources |
| `src/components/` (except `reactbits/`; includes `PageBackground.tsx`, the per-page React Bits 3D background), `src/index.css`, `src/palette.ts`, `src/site.ts`, `src/types.ts`, `src/App.tsx`, `src/pages/Learn.tsx` | Shared shell | change only in a dedicated PR the whole team agrees to |

Stay inside your own folder. If your task seems to need a shared-file change, stop and ask the team.

## Adding a lesson

1. Create a component file in your module folder (any component that returns the lesson content).
2. Add one entry to the `lessons` array in your module's `index.tsx`.

That is all: routing, page title, the "Mark complete" button, XP and badges work automatically.
Never rename a lesson `id` once merged; it is the saved-progress key.

## Hard rules

- **No accounts, logins, passwords or backend.** Progress is saved with the existing store in `src/progress/`. Do not write to `localStorage` anywhere else; new saved state goes through `createPersisted` in `src/lib/persisted.ts` (see `src/profile.ts`).
- **No names, school, city or state anywhere** (pages, images, alt text, comments, metadata). TSA allows the team ID only.
- **No new npm dependencies** without team agreement. If one is added, also list it in `References.tsx`.
- **Colors and fonts come from `src/index.css` tokens** (`bg-brand`, `text-muted`, `bg-card`...). No hex codes or new fonts in components (React Bits props that need real color strings use `src/palette.ts`, which mirrors the tokens).
- **Check React Bits first** (https://reactbits.dev) for any UI component or animation. Copied components live in `src/components/reactbits/` next to their `LICENSE.md`; list each one in `References.tsx`.
- **Reuse** `.btn`, `.card`, `.prose-lesson` and `ProgressBar` before creating anything similar.
- **Every fact gets a source** added to `References.tsx` in the team's citation style. No invented statistics, quotes or links.
- **Every image is original or cited.** No copyrighted images, logos or music without written permission.
- **Must work on a phone** (375px wide) and with keyboard only. Images need `alt` text.
- **No API keys in the code**, and no calls to paid AI APIs.
- English only. No broken links.

## Pull requests

- One section per PR, small enough to review in ten minutes.
- Fill in the AI log in the PR template honestly; it feeds the required TSA AI Reflection form.
- Someone else reviews and merges. You must be able to explain your own code out loud: the interview scores it.
