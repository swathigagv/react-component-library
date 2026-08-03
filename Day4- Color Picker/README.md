# Color Picker

A React + Vite color picker that lets you pick, fine-tune, and save colors across **HEX, RGB, and HSL** — with live contrast checking so you know if your text will actually be readable on top of it.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Native color picker** — click the big preview to open the OS color dialog
- **Three synced formats** — HEX, RGB, and HSL always reflect the same color; edit any one and the others update instantly
- **Editable RGB & HSL sliders** — drag R/G/B or H/S/L to fine-tune a color channel by channel
- **Editable HEX input** — type a hex code directly; invalid input is tolerated while typing and only applied once it's a real color
- **One-click copy** — copy the HEX, RGB, or HSL string to your clipboard, with "Copied ✓" feedback
- **Contrast checker** — shows the best-readable text color (black or white) for the current background, its WCAG contrast ratio, and an AA / AAA / Low-contrast label
- **Random color generator** — jump to a random hex value
- **Saved palette** — save up to 10 colors, click a saved swatch to load it back, remove any you don't need
- **Accessible & responsive** — labeled controls, visible focus states, and `prefers-reduced-motion` respected

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Color math     | Hand-written utilities (no library) — HEX ↔ RGB ↔ HSL conversion, WCAG relative luminance & contrast ratio |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (color values) — via Google Fonts |

No color-picker or state-management libraries — the conversion math, clipboard handling, and UI state are all built from scratch to reinforce the fundamentals.

---

## What I Learned

- **Multi-format state sync** — keeping HEX as the single source of truth, then deriving RGB and HSL from it on every render (instead of storing three separate values that can drift out of sync)
- **Color math from scratch** — implementing HEX↔RGB, RGB↔HSL, and HSL↔RGB conversions, and understanding *why* HSL is easier for humans to reason about (hue as an angle, saturation/lightness as percentages)
- **Accessibility math** — calculating WCAG relative luminance and contrast ratio to decide programmatically whether black or white text is more readable on a given background
- **Reusable components** — extracting `FormatRow` and `Slider` as small presentational components driven entirely by props, instead of repeating the same JSX three times
- **Controlled inputs with "forgiving" validation** — letting the HEX text field hold an invalid draft while typing, and only committing it to real state once it parses as a valid color
- **Clipboard API** — using `navigator.clipboard.writeText` with a `try/catch` fallback, and a timed `useState` reset to show temporary "Copied ✓" feedback
- **Derived vs. stored state** — recognizing that RGB/HSL/contrast values don't need their own `useState`; they're cheap to recompute from `color` on every render
- **`<input type="color">` as a UI building block** — using the native picker for the "physical" color selection while layering custom sliders and inputs on top for precision

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
color-picker/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Picker logic + UI
    ├── App.css            # Component styles
    ├── color.js           # HEX/RGB/HSL conversion + contrast utilities
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Persist saved colors to `localStorage` so they survive a refresh
- Generate color harmonies (complementary, triadic, analogous) from the current color
- Export the saved palette as a CSS variables file or Tailwind config snippet
- Add unit tests for the conversion functions in `color.js` (Vitest)