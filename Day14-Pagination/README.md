# Day 14 — Pagination 📄

A team directory table with a reusable pagination component: page numbers,
previous/next controls, smart ellipses for large page counts, and an
adjustable rows-per-page selector.

Part of a daily React learning series (Day 14 of the component-a-day build).

## Features

- **Paginated table** — a 63-row sample team directory sliced into pages,
  showing name, role, team, and email.
- **Reusable `Pagination` component** — takes `currentPage`, `totalPages`,
  and `onPageChange`; has no knowledge of the data it's paging through, so
  it can be dropped into any list.
- **Smart page-number window with ellipses** — for large page counts it
  shows something like `1 … 4 5 6 … 12` instead of every page number,
  always keeping the first page, last page, and a window around the
  current page visible.
- **Previous / Next controls** — disabled automatically on the first and
  last page.
- **Rows-per-page selector** — switch between 5, 10, and 15 rows per page;
  the current page is clamped if it would otherwise go out of range.
- **"Showing X–Y of Z" range label** — always reflects the current page and
  page size.
- **Responsive table** — the email column hides on narrow screens to keep
  the table legible on mobile.

## Tech used

| Layer      | Choice                                          |
|------------|---------------------------------------------------|
| UI library | React 18 (function components + hooks)             |
| Build tool | Vite 5                                              |
| Language   | JavaScript (JSX)                                    |
| Styling    | Plain CSS with custom properties (no framework)     |
| Data       | Local generated array (`src/data.js`) — no API calls |

## What I learned

- **Deriving pages from data, not storing them** — `totalPages` and the
  current page's rows are computed from `directory.length`, `pageSize`,
  and `currentPage` on each render with `useMemo`, rather than keeping a
  separate "pages" array in state that could drift out of sync.
- **Building a page-range algorithm** — writing `buildPageRange()` to
  produce a compact list like `[1, 'left-ellipsis', 4, 5, 6,
  'right-ellipsis', 12]` instead of rendering every page button, and
  handling the edge case where the total page count is small enough that
  no ellipses are needed at all.
- **Keeping a component "dumb" and reusable** — `Pagination` only receives
  primitives and a callback; it doesn't know about people, tables, or
  rows-per-page, so it could paginate a gallery or a blog list just as
  easily.
- **Clamping state on a dependency change** — when `pageSize` changes,
  `currentPage` might now point past the new `totalPages` (e.g. page 7 of
  10-per-page doesn't exist at 15-per-page). A `useEffect` watching
  `totalPages` clamps the page back into range instead of showing an
  empty table.
- **Resetting to page 1 on a filter/config change** — changing the page
  size resets `currentPage` to `1` immediately, which feels more
  predictable than trying to preserve position across a different slice
  size.
- **`useMemo` for a derived slice** — avoiding re-slicing the full array
  on every unrelated re-render by memoizing `visibleRows` against
  `[currentPage, pageSize]`.
- **Accessible pagination markup** — using `<nav aria-label="Pagination">`,
  `aria-current="page"` on the active button, and `aria-label`s on the
  prev/next controls so screen readers announce them meaningfully.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Project structure

```
day14-pagination/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React entry point
    ├── App.jsx          # Table, page-size selector, and layout
    ├── Pagination.jsx   # Reusable pagination controls
    ├── data.js          # Generated sample directory data
    └── App.css          # Dark navy/indigo/aqua design system
```

## Possible next steps

- Add a search/filter input above the table and re-paginate the filtered
  results.
- Sync `currentPage` to the URL query string so a page is shareable/
  bookmarkable.
- Add keyboard navigation (arrow keys) across page buttons.

  Happy learning!
