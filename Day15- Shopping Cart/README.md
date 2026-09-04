# Day 15 — Shopping Cart 🛍️

A product catalog with a live shopping cart: add items, adjust quantities,
remove items, see running totals with a free-shipping threshold, and have
the cart survive a page refresh.

Part of a daily React learning series (Day 15 of the component-a-day build).

## Features

- **Product grid** — 12 sample products with name, category, price, and an
  "Add to cart" button that shows how many of that item are already in
  the cart.
- **Cart panel** — a persistent sidebar listing every cart item with its
  own quantity controls (`−` / `+`) and a remove button.
- **Quantity management** — incrementing/decrementing updates totals
  instantly; decrementing a quantity of 1 removes the item automatically
  instead of leaving a 0-quantity row.
- **Live totals** — subtotal, shipping, and total recalculate on every
  change.
- **Free shipping threshold** — orders over ₹2,000 ship free; below that,
  a hint shows exactly how much more to add to qualify.
- **Empty cart state** — a clear message when there's nothing in the cart
  yet, instead of an empty list.
- **Clear cart** — one button to empty the whole cart at once.
- **Persistence across refresh** — the cart is saved to `localStorage` and
  restored on load, so reloading the page doesn't lose your selections.
- **Responsive layout** — cart panel sits beside the product grid on
  desktop and stacks below it on narrow screens.

## Tech used

| Layer      | Choice                                                |
|------------|---------------------------------------------------------|
| UI library | React 18 (function components + hooks)                   |
| State      | `useReducer` + Context API (custom `useCart` hook)        |
| Build tool | Vite 5                                                    |
| Language   | JavaScript (JSX)                                          |
| Styling    | Plain CSS with custom properties (no framework)           |
| Persistence| Browser `localStorage`                                    |
| Data       | Local static catalog (`src/data.js`) — no API calls        |

## What I learned

- **`useReducer` for cart logic** — with several related actions (add,
  increment, decrement, remove, clear), a reducer keeps every state
  transition in one place (`cartReducer`) instead of scattering
  `setState` calls with inline logic across components.
- **Context API to avoid prop drilling** — `CartContext` + a `CartProvider`
  lets both `ProductGrid` and `CartPanel` read and update the same cart
  state without passing cart props down through every level.
- **A custom hook (`useCart`) as the public API** — wrapping
  `useContext(CartContext)` in a hook that throws a clear error if used
  outside the provider, so a missing `<CartProvider>` fails loudly
  instead of silently returning `undefined`.
- **Lazy `useReducer` initialization** — passing a third argument
  (`loadInitialCart`) to `useReducer` so the cart is read from
  `localStorage` once on mount, rather than reading storage on every
  render.
- **Syncing state to `localStorage` with `useEffect`** — persisting the
  cart any time it changes, wrapped in `try/catch` so a storage failure
  (private browsing, quota limits) doesn't crash the app.
- **Deriving totals instead of storing them** — `itemCount` and
  `subtotal` are computed with `reduce()` from the cart array on every
  render rather than kept as separate state that could fall out of sync
  with the actual items.
- **Conditional business logic in the UI** — the free-shipping threshold
  check (`subtotal >= FREE_SHIPPING_THRESHOLD`) drives both the displayed
  shipping fee and a helper message, from one shared calculation.
- **Removing vs. zeroing out** — modeling "decrement to zero" as a filter
  step in the reducer (`.filter(item => item.quantity > 0)`) so the cart
  array never holds a zero-quantity item.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Project structure

```
day15-shopping-cart/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Layout: wraps grid + cart in CartProvider
    ├── CartContext.jsx   # useReducer cart logic, Context, useCart hook
    ├── ProductGrid.jsx   # Product catalog grid
    ├── CartPanel.jsx     # Cart sidebar with quantity controls & totals
    ├── data.js           # Static product catalog + currency formatter
    └── App.css           # Dark navy/indigo/aqua design system
```

## Possible next steps

- Add a quantity input the user can type into directly, not just +/−.
- Add a coupon/discount code field that adjusts the total.
- Persist cart to a backend instead of `localStorage` once auth exists.