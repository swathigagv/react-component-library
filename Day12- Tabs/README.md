# Tabs

A reusable, accessible React Tabs component with a sliding indicator, full keyboard navigation, and the WAI-ARIA tabs pattern — demoed in two different contexts to prove it's actually reusable, not hardcoded to one layout.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **One reusable `<Tabs>` component** — takes an `items` array (`{ id, label, content }`) and a `defaultTabId`; works for any content, any number of tabs
- **Two demo use cases** — Account Settings (Profile / Notifications / Security) and Product Info (Description / Specifications / Reviews), same component
- **Sliding active indicator** — a pill glides between tabs on click or keyboard navigation, measured from real DOM positions rather than hardcoded percentages
- **Full keyboard navigation** — `←` `→` to move between tabs, `Home` / `End` to jump to the first/last tab
- **Roving tabindex** — only the active tab is in the page's normal Tab order, per the standard ARIA tabs pattern, so keyboard users don't have to tab through every single tab button to get past them
- **Accessible markup** — `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby` all wired correctly
- **Optional icons** — tab items can include an emoji/icon alongside the label
- **Animated panel transitions** — a subtle fade/slide when switching panels

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks) |
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Fonts          | Space Grotesk (display), Inter (body) — via Google Fonts |

No tabs/UI library (like Radix or Headless UI) — the ARIA pattern, keyboard handling, and sliding indicator math are all hand-built.

---

## What I Learned

- **The WAI-ARIA tabs pattern, precisely** — `tablist` contains `tab`s, each `tab` controls a `tabpanel` via `aria-controls`, and the panel points back via `aria-labelledby` — getting this pair-up right is what makes screen readers announce tabs correctly
- **Roving tabindex** — instead of every tab button being reachable by `Tab`, only the active one has `tabIndex={0}`; the rest are `tabIndex={-1}` and become reachable only via arrow keys once focus is inside the tablist. This is the standard pattern for any composite widget (tabs, menus, toolbars)
- **Measuring the DOM for a sliding indicator** — using `useLayoutEffect` (not `useEffect`) with `getBoundingClientRect()` on the active tab button to compute pixel `left`/`width` values, and why `useLayoutEffect` matters here: it runs before the browser paints, avoiding a visible flash of the indicator in the wrong position
- **A `Map` of refs instead of an array** — since tabs are rendered from data with an `id`, storing each button's ref in a `Map` keyed by `id` (via a callback ref) made looking up "the currently active tab's DOM node" straightforward regardless of render order
- **Keyboard nav wrapping** — implementing `←`/`→` wrap-around (last tab's right arrow goes to the first tab, and vice versa) and `Home`/`End` jump-to-ends, all inside one `onKeyDown` handler on the tablist rather than one per button
- **Designing a component around data, not markup** — accepting `items` as an array of `{ id, label, content }` rather than expecting `<Tabs><Tab>...</Tab></Tabs>` children meant the same component could describe both demo panels without any structural duplication

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
tabs-demo/
├── index.html               # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React root render
    ├── App.jsx                # Two demo Tabs instances with their data
    ├── App.css                 # Demo page styles
    ├── index.css                # Global resets & theme variables
    └── components/
        ├── Tabs.jsx              # The reusable Tabs component
        └── Tabs.css                # Tabs-specific styles (indicator, panel transitions)
```

---

## Possible Next Steps

- Support vertical tab orientation (`ArrowUp`/`ArrowDown` instead of left/right)
- Make it a controlled component option (`activeId` + `onChange` from the parent) alongside the current uncontrolled default
- Sync the active tab to the URL query string so a tab is linkable/shareable
- Add interaction tests for the keyboard navigation (React Testing Library + `userEvent`)