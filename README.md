> [!WARNING]
> **API Seed Issue** If the app fails to load users, the seed value cached on randomuser.me's servers may be in a broken state . To fix it, change the `SEED` constant in `src/features/users/api/usersApi.ts` to any other string (e.g. `"abc123"`) and restart. This has no impact on functionality the seed only ensures pagination consistency.

# User Directory

React + TypeScript + React Query app consuming the [randomuser.me](https://randomuser.me) public API.

## Running locally

```bash
npm install && npm run dev
```

## Architecture

Feature-based folder structure under `src/features/` code is organized by domain (`users`, `search`, `pagination`) rather than by type. Each feature owns its API, types, hooks, and components and exposes a single `index.ts` barrel.

## Key decisions

**URL-driven state** `?page=2&pageSize=10&q=john` means links are shareable, the back button works, and pasting a URL into a new tab restores the exact view. Most implementations reach for `useState` and lose all of this.

**React Query** handles caching, retry logic, and background refetch. The next page is prefetched silently so pagination feels instant, and `placeholderData` keeps the previous page visible while the next one loads no layout flicker.

**Stable seed** a fixed `?seed=` parameter is passed to randomuser.me so pages are consistent and non-overlapping. Without it, each request generates a fresh random set and page 2 can return duplicates from page 1.

## Tradeoffs

Search filters client-side on the current page's cached data intentional for this scope. In a production app with a large dataset, filtering would move server-side. `data-testid` attributes are in place on key elements for E2E coverage with Playwright.
