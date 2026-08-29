# Modal

A reusable, accessible React modal component — built once, used three ways: an info dialog, a confirm-delete prompt, and a small subscribe form. Rendered through a React portal, with a real focus trap, Escape-to-close, backdrop-click-to-close, and body scroll locking.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **One reusable `<Modal>` component** — takes `isOpen`, `onClose`, `title`, `size`, and any `children`, so it can host completely different content without changing its own code
- **Three demo use cases** — an informational dialog, a destructive-action confirm dialog, and a form dialog with its own submit handling
- **React portal rendering** — the modal renders into a separate `#modal-root` DOM node outside the app tree, so it always sits above the page regardless of the trigger's position in the layout
- **Real focus trap** — `Tab` and `Shift+Tab` cycle only through focusable elements inside the open modal; focus can't silently leak to the page behind it
- **Focus restoration** — closing the modal returns focus to whatever element had it before the modal opened (usually the trigger button)
- **Escape to close** — pressing `Esc` anywhere closes the active modal
- **Click-outside to close** — clicking the backdrop (not the dialog itself) closes it
- **Body scroll lock** — the page behind the modal can't be scrolled while it's open
- **Three sizes** — `sm` / `md` / `lg` via a single prop
- **Accessible markup** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the visible title

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks, `createPortal`) |
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Fonts          | Space Grotesk (display), Inter (body) — via Google Fonts |

No dialog/modal library (like Radix or Headless UI) — portals, the focus trap, and scroll locking are all hand-built to understand what those libraries actually do under the hood.

---

## What I Learned

- **Portals for overlay UI** — using `createPortal(content, domNode)` to render the modal into a sibling DOM node (`#modal-root`) instead of wherever the trigger button happens to live in the component tree, which avoids `overflow: hidden` and `z-index` fights from parent containers
- **Building a focus trap manually** — querying all focusable elements inside the dialog (`querySelectorAll` with a broad selector), and intercepting `Tab`/`Shift+Tab` at the boundaries to loop focus back around instead of letting it escape to the page
- **Focus restoration** — capturing `document.activeElement` in a ref right before the modal opens, then calling `.focus()` on it again when the modal closes — small detail, big difference for keyboard and screen-reader users
- **Body scroll locking as a side effect** — toggling a `modal-open` class on `<body>` inside `useEffect`, with cleanup that always removes it, so an early unmount can't leave the page permanently unscrollable
- **One component, many contents** — designing the `Modal` component to know nothing about what's inside it (`children`) or what happens on submit/confirm — that logic lives in the parent, keeping `Modal` fully reusable
- **`useEffect` dependency correctness** — making sure the keydown listener and focus-management effects only attach while `isOpen` is true, and always clean up on close or unmount to avoid duplicate listeners piling up across multiple open/close cycles

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
modal-demo/
├── index.html               # HTML entry point, includes #modal-root portal target
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React root render
    ├── App.jsx                # Demo triggers for the three modal use cases
    ├── App.css                 # Demo page styles
    ├── index.css                # Global resets & theme variables (+ scroll-lock class)
    └── components/
        ├── Modal.jsx            # The reusable modal component
        └── Modal.css              # Modal-specific styles (backdrop, dialog, animation)
```

---

## Possible Next Steps

- Add an exit animation (currently the modal unmounts instantly on close)
- Support stacking multiple modals at once
- Add a `<ModalProvider>` + `useModal()` context so modals can be triggered from anywhere without prop drilling `isOpen`/`onClose`
- Add unit/interaction tests for the focus trap (React Testing Library + `userEvent`)