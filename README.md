## User Directory

React + TypeScript + React Query app consuming randomuser.me.

### Running locally

npm install && npm run dev

### Architecture

Feature-based folder structure under `src/features/`.
State lives in the URL (page, pageSize, search query) — links are shareable and the back button works correctly.

### Tradeoffs

Search filters client-side on the current page's cached data.
Server-side filtering would require a different API. A stable `?seed=`
parameter is passed to randomuser.me to ensure consistent pagination
(without it, pages can return overlapping results).
