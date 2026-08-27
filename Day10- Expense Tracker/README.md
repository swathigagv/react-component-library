# Expense Tracker (React)

A React + Vite rebuild of a vanilla JS/HTML/CSS expense tracker — same core idea (log income and expenses, see your balance), rebuilt as proper React state with a few real improvements: inline validation, filters, undo, and persistence through a reusable hook.

**[Live Demo](#)** • **[Screenshots](#)**

---

## What changed from the original

The original was a single `script.js` manipulating the DOM directly (`innerHTML`, manual event delegation, `localStorage` calls scattered through the code). This version keeps the same visual language but rebuilds the logic as React state, and adds:

- **Inline validation** instead of `alert()` — errors show under the exact field that's wrong
- **Filter tabs** (All / Income / Expenses) — the original always showed everything
- **Undo on delete** — a 4-second toast lets you bring a deleted transaction back, instead of it being gone the instant you click ✕
- **Clear all** — a confirm-gated reset for the whole list
- **Dates on each transaction** — every entry now records when it was added and shows it
- **Currency formatting** via `Intl.NumberFormat` instead of manual `.toFixed(2)` string building
- **Component structure** — one 90-line file is now `Summary`, `TransactionForm`, `TransactionList`, `TransactionItem`, and `UndoToast`, each with one job

---

## Features

- **Add transactions** — description + amount (positive = income, negative = expense)
- **Live balance, income, and expense totals** — always computed from the full transaction list, independent of the active filter
- **Filter by type** — All / Income / Expenses tabs over the history list
- **Delete with undo** — remove a transaction, then undo it within a few seconds via a toast
- **Clear all** — wipe the whole history in one confirmed action
- **Inline form validation** — description required, amount must be a non-zero number, errors shown per field
- **Persistent storage** — everything survives a page refresh via `localStorage`
- **Empty states** — a distinct message for "no transactions yet" vs. "no results for this filter"
- **Accessible & responsive** — labeled inputs with `aria-invalid`/`aria-describedby`, `aria-label`s on icon buttons, visible focus states

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) — palette carried over from the original design |
| Persistence    | `localStorage`, wrapped in a reusable `useLocalStorage` hook |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (amounts) — via Google Fonts |

No state-management or form library — everything is core React hooks plus one small custom hook.

---

## What I Learned

- **Porting imperative DOM code to declarative state** — the original directly created `<li>` elements with `innerHTML` and manually wired a delete listener via event delegation; in React, the list is just `transactions.map(...)`, and delete is a state update that reactively re-renders the DOM
- **Writing a reusable custom hook** — extracting `useLocalStorage(key, initialValue)` so persistence logic (read on mount, write on every change) lives in one place instead of being called inline throughout the app, and can be reused for other keyed state later
- **Derived state vs. stored state** — balance/income/expense are recalculated from `transactions` with `useMemo` rather than kept as separate state that could drift out of sync (the original recalculated on every `render()` call too — this is the same idea, just declarative)
- **Filtering without losing the source of truth** — totals always use the *full* transaction list, while only the rendered rows are filtered, so switching tabs never affects the numbers at the top
- **Optimistic delete with undo** — removing an item from state immediately, but keeping a reference to it for a few seconds so it can be spliced back in; managing the accompanying timer with `useRef` + cleanup so switching away mid-countdown doesn't leak
- **Splitting a single-file app into components** — deciding where the seams go (`Summary`, `TransactionForm`, `TransactionList`, `TransactionItem`) based on what data and behavior each piece actually needs, and passing callbacks down as props instead of components reaching into shared globals
- **Accessible inline validation** — replacing a blocking `alert()` with `aria-invalid` and `aria-describedby` pointing at a visible error message, so the failure state is available to screen readers too

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
expense-tracker/
├── index.html               # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React root render
    ├── App.jsx                # Top-level state (transactions, filter, undo) + layout
    ├── App.css                 # Component styles
    ├── format.js                # Currency + date formatting helpers
    ├── useLocalStorage.js        # Reusable localStorage-backed state hook
    ├── index.css                # Global resets & theme variables
    └── components/
        ├── Summary.jsx           # Balance / income / expense cards
        ├── TransactionForm.jsx    # Add-transaction form with inline validation
        ├── TransactionList.jsx     # Filter tabs + list + empty state
        ├── TransactionItem.jsx      # Single transaction row
        └── UndoToast.jsx             # "Deleted X · Undo" toast
```

---

## Possible Next Steps

- Add categories (Food, Rent, Salary…) with a small breakdown chart
- Add a date range filter alongside the type filter
- Support editing a transaction instead of only delete-and-re-add
- Add unit tests for the totals calculation and the undo timing (Vitest)