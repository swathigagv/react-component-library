# Counter App

A small, polished counter built with **React + Vite**. Increment, decrement, reset, change the step size, and watch every change land in a live activity log — all wrapped in a dark, glowing UI with keyboard support.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Increment / Decrement** — adjust the count with dedicated buttons
- **Adjustable step size** — switch between +1, +5, or +10 per click
- **Reset** — snap the counter back to zero anytime
- **Keyboard controls** — `↑` to increase, `↓` to decrease, `R` to reset
- **Activity log** — the last 6 changes are listed with their resulting value, so you can trace how you got to the current count
- **Animated dial** — the counter pulses and shifts color (aqua for positive, red for negative) on every change, giving instant visual feedback
- **Responsive & accessible** — usable on mobile, visible focus states for keyboard navigation, and `prefers-reduced-motion` respected
- **Dark theme UI** — deep navy background with an indigo-to-aqua gradient ring

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Fonts          | Space Grotesk (display), Inter (body) — via Google Fonts |

No external state management or UI libraries — everything is built with core React and CSS to keep the fundamentals front and center.

---

## What I Learned

- **React state with `useState`** — managing a numeric value and a growing log array, and updating state based on the *previous* state safely (`setCount(prev => prev + delta)`)
- **`useEffect` for side effects** — wiring up and cleaning up a `keydown` event listener on `window`, and clearing a `setTimeout` on unmount to avoid memory leaks
- **Derived state / computed values** — calculating the dial's "mood" (positive / negative / neutral) from `count` on every render instead of storing it separately
- **Controlled UI feedback** — using a short-lived `pulse` state plus CSS keyframe animations to give tactile feedback without a library
- **Component structure** — splitting a small app into clear visual sections (header, dial, controls, step picker, log) while keeping it a single component, appropriate for the app's size
- **Accessible interactions** — `aria-label`s on icon-only buttons, `aria-live` on the dial so screen readers announce count changes, and keyboard-first design
- **CSS custom properties & theming** — building a reusable color system (`--indigo`, `--aqua`, `--bg`, etc.) instead of hardcoding values throughout the stylesheet
- **Vite project structure** — how a minimal Vite + React app is wired together (`index.html` → `main.jsx` → `App.jsx`) compared to Create React App

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
counter-app/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Counter logic + UI
    ├── App.css            # Component styles
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Persist the count and log to `localStorage` so it survives a refresh
- Add a "max/min limit" setting to cap the counter
- Add unit tests for the increment/decrement/reset logic (Vitest + React Testing Library)
- Animate the activity log with enter/exit transitions