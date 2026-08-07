# Password Generator

A React + Vite app that generates strong, random passwords — with adjustable length, character-set toggles, a live strength meter, and a recent-passwords list. Randomness is sourced from the Web Crypto API, not `Math.random()`, so it's actually suitable for real passwords.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Adjustable length** — slider from 6 to 32 characters
- **Character-set toggles** — uppercase, lowercase, numbers, symbols, mixed and matched independently
- **Exclude ambiguous characters** — optionally strip easily-confused characters like `l`, `1`, `I`, `O`, `0`
- **Guaranteed character coverage** — if you select uppercase + numbers + symbols, the result is guaranteed to contain at least one of each, not just a lucky roll
- **Cryptographically secure randomness** — built on `crypto.getRandomValues`, with rejection sampling to avoid modulo bias
- **Live strength meter** — a 4-segment bar plus label (Weak / Fair / Strong / Very strong) based on estimated entropy in bits
- **Auto-regenerate** — a new password is generated automatically whenever you change the length or character options
- **One-click copy** — copy the current password, or any password from the recent list, straight to your clipboard
- **Recent history** — the last 6 generated passwords, so you can go back if you generated the "right one" and then hit regenerate
- **Accessible & responsive** — custom checkboxes with visible focus states, disabled states when no character set is selected

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Randomness     | Web Crypto API (`crypto.getRandomValues`) — no libraries |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (password output) — via Google Fonts |

No password-generation or state-management libraries — the generation algorithm, entropy estimate, and clipboard handling are all hand-written.

---

## What I Learned

- **Why `Math.random()` isn't good enough for security** — it's not cryptographically secure and can be predictable; `crypto.getRandomValues()` is the correct tool for anything password- or token-related
- **Avoiding modulo bias** — naively doing `randomInt % max` skews toward lower numbers when `max` doesn't evenly divide the random range; rejection sampling (regenerating on out-of-range values) removes that bias
- **Guaranteeing constraints in random output** — generating one required character per selected category first, then filling the rest randomly, then Fisher–Yates shuffling so the guaranteed characters aren't predictably placed at the start
- **Entropy as a real strength measure** — calculating strength as `length × log2(charsetSize)` instead of naive rules like "has a number = strong," and mapping bits to human labels
- **Syncing UI state with a side effect** — using `useEffect` with specific dependencies (`length`, each toggle) to auto-regenerate the password only when relevant settings change, not on every render
- **Small controlled inputs, custom-styled** — building an accessible custom checkbox (hidden native input + styled box) that still works with keyboard navigation and screen readers
- **Derived UI state** — computing `hasAnyOption` and `strength` fresh each render instead of tracking them separately and risking them going stale

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
password-generator/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Generator logic + UI
    ├── App.css            # Component styles
    ├── password.js         # Generation algorithm + strength estimation
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Add a "pronounceable" or passphrase mode (e.g. word-based, à la Diceware)
- Persist settings (length, toggles) to `localStorage` between visits
- Warn if the generated password appears in a known breached-password list (k-anonymity API check)
- Add unit tests for `generatePassword` and `estimateStrength` (Vitest)