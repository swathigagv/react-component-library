# Search & Filter

A React + Vite product directory with debounced search, multi-select category filters, an in-stock toggle, and sortable results — with matched search terms highlighted inline.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Debounced search** — filters by product name, but only after you pause typing for 300ms, not on every keystroke
- **Match highlighting** — the part of the product name that matched your search is visually highlighted
- **Multi-select category filters** — toggle any combination of Audio, Wearables, Photography, Computing, Gaming, Accessories
- **In-stock only toggle** — narrow results to available products
- **Sorting** — by name (A–Z / Z–A), price (low–high / high–low), or rating (high–low)
- **Combined filtering** — search, category, and stock filters all apply together, not one-at-a-time
- **Live result count** — shows how many products match the current filters
- **Clear filters** — one click resets search, categories, and the stock toggle, only shown when a filter is active
- **Empty state** — a clear "no results" message when filters are too narrow
- **Accessible & responsive** — labeled inputs, keyboard-usable controls, visible focus states

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Data           | Local product array (no external API) |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (numeric values) — via Google Fonts |

No search or state-management library — debouncing, filtering, sorting, and highlighting are all hand-written with core React hooks.

---

## What I Learned

- **Debouncing with a custom hook** — writing `useDebouncedValue`, a reusable hook that delays updating a value until the input has been "quiet" for a set time, using `setTimeout` inside `useEffect` with cleanup on every keystroke
- **Why debouncing matters** — without it, every keystroke would re-run the filter/sort pipeline; debouncing means it only re-runs once the user actually pauses
- **`useMemo` for derived state** — recomputing the filtered + sorted list only when `debouncedQuery`, `activeCategories`, `inStockOnly`, or `sortBy` actually change, instead of on every render
- **Composable filters** — writing each filter (search, category, stock) as an independent boolean check combined with `&&`, so adding a new filter later means adding one more condition, not restructuring the logic
- **Multi-select filter state** — toggling category chips in and out of an array with `includes`/`filter`, versus the single-select pattern used in earlier projects (like the quote generator's category tabs)
- **Text highlighting without a library** — splitting a string around a case-insensitive match and wrapping the matched substring in `<mark>`, handling the "no match" and "empty query" cases explicitly
- **Controlled `<select>` for sorting** — driving a sort function from a dropdown's value, and keeping the sort comparator logic (`sortProducts`) separate from the component so it's independently testable
- **Meaningful empty states** — showing a distinct "no results" UI rather than an empty list, so the user understands *why* nothing appeared

---

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Structure

```
search-filter/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Search/filter/sort logic + UI
    ├── App.css            # Component styles
    ├── data.js             # Local product data + sort comparator
    ├── useDebouncedValue.js # Reusable debounce hook
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Add a price range slider as an additional filter
- Persist filter/sort state in the URL query string so results are shareable
- Virtualize the results list for large datasets (e.g. `react-window`)
- Add unit tests for the filter/sort pipeline and the debounce hook (Vitest)