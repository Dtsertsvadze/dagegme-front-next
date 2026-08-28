# Dagegme user frontend

The public Dagegme website built with Next.js and the App Router.

## Commands

- `npm run dev` starts local development.
- `npm test` runs the dependency-free unit tests.
- `npm run lint` checks the application with ESLint.
- `npm run build` creates the production build.
- `npm start` runs the production server after a build.

## Environment

Copy `.env.example` to `.env.local` when you need a different API:

```env
API_BASE_URL=http://127.0.0.1:8000/api
```

`API_BASE_URL` is server-only. The production fallback is
`https://api.dagegme.com/api`.

## Structure

- `src/app`: routes, layouts, metadata, loading and error boundaries.
- `src/components`: reusable UI and layout components.
- `src/features`: page composition, listing normalization, and server data access.
- `src/content`: bilingual website content and provider categories.
- `src/state`: browser preference and wishlist state.
- `src/styles`: the original visual system, organized by concern.
- `tests`: fast unit tests for pure business logic.

Provider lists keep the order returned by the API. `sort_order` and
`vip_order` are not re-sorted in the browser.
