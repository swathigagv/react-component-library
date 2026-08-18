# Random Quote Generator

A React + Vite app that serves up a random quote from a local, categorized quote bank — with category filtering, a favorites list, copy-to-clipboard, and a one-click tweet share.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Random quote on demand** — click "New quote" to get a fresh one, with a smooth fade transition between quotes
- **Category filtering** — filter by Motivation, Wisdom, Life, Success, or Humor (or view All)
- **No-repeat logic** — the next random quote avoids repeating the one currently on screen when possible
- **Favorites list** — heart a quote to save it; unheart or remove it from the favorites panel
- **Copy to clipboard** — copy the quote and author as a ready-to-paste string, with "✓" feedback
- **Tweet sharing** — opens a pre-filled Twitter/X share intent with the quote text
- **Offline-first data** — quotes live in a local array, not an external API, so the app works without a network call
- **Accessible & responsive** — `aria-live` region announces new quotes, labeled icon buttons, visible focus states, `prefers-reduced-motion` respected

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Data           | Local hand-curated quote array (no external API) |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (accents) — via Google Fonts |

No quote API or state-management library — data, filtering, favorites, and clipboard/share logic are all built directly with React state.

---

## What I Learned

- **Filtering + randomness together** — deriving a random pick from a *filtered* subset of data (`category === 'All' ? all : filtered`), and re-rolling once if the random pick happens to match the previous quote
- **Timed transitions with `useState` + `setTimeout`** — using a short `fading` state window before actually swapping the quote, so the CSS opacity transition has something to animate instead of an instant content swap
- **Managing a derived "is this favorited" flag** — checking `favorites.some(f => f.id === quote.id)` on every render instead of storing a separate boolean that could drift out of sync with the favorites list
- **Building share intents manually** — constructing a Twitter/X intent URL with `encodeURIComponent`, and understanding why it's just a link (`<a href>`) rather than an API call
- **Component-level cleanup with multiple timers** — clearing both a copy-feedback timeout and a fade timeout in the same `useEffect` cleanup to avoid stale timers firing after unmount
- **Data modeling for a small local dataset** — structuring quotes as `{ id, text, author, category }` up front made filtering, favoriting (by id), and no-repeat logic straightforward instead of ad hoc
- **List state updates** — adding/removing items from `favorites` immutably with `filter` and spread, rather than mutating the array directly

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
quote-generator/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Quote logic + UI
    ├── App.css            # Component styles
    ├── quotes.js           # Local quote data + random-pick helper
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Persist favorites to `localStorage` so they survive a refresh
- Swap the local data source for a real quotes API (e.g. Quotable) with loading/error states
- Add a "quote of the day" mode seeded by the date so everyone sees the same quote
- Add unit tests for `getRandomQuote`'s filtering and no-repeat behavior (Vitest)