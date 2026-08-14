# Digital Clock

A React + Vite digital clock with a live seconds ring, 12/24-hour toggle, a time-based greeting, and a small world clock strip for a few other time zones.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Live-updating time** — hours, minutes, and seconds tick every second, no page refresh
- **12-hour / 24-hour toggle** — switch formats instantly, AM/PM shown only in 12-hour mode
- **Seconds progress ring** — an SVG ring around the clock face fills up over each 60-second cycle
- **Time-based greeting** — "Good morning / afternoon / evening / night" based on the current hour
- **Full date display** — weekday, month, day, and year, formatted with `Intl.DateTimeFormat`
- **World clock strip** — live times for New York, London, Chennai, Tokyo, and Sydney, each with a sun/moon icon showing roughly whether it's day or night there
- **Accessible & responsive** — `aria-live` region so the time updates are announced sensibly, visible focus states on the format toggle, `prefers-reduced-motion` respected

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Time handling  | Native `Date` + `Intl.DateTimeFormat` (no date library) |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (time readout) — via Google Fonts |

No date/time library (like `date-fns` or `dayjs`) — everything, including time-zone conversion for the world clock, runs on the built-in `Intl` API.

---

## What I Learned

- **`setInterval` inside `useEffect`, with cleanup** — starting a 1-second ticker on mount and clearing it with `clearInterval` in the effect's cleanup function so the interval doesn't keep running (or double up) after the component unmounts or re-renders
- **`Intl.DateTimeFormat` over manual string formatting** — using `formatToParts()` to pull out hour/minute/second/day-period separately (instead of slicing `Date` strings) so I could style the seconds and AM/PM differently from the main time
- **Real time-zone conversion without a library** — passing a IANA `timeZone` string (e.g. `'Asia/Kolkata'`) into `Intl.DateTimeFormat` to correctly compute another city's local time from the same underlying `Date` object
- **Derived values from a single source of truth** — `now` (one `Date` state) drives the main clock, the date string, the greeting, and every world-clock entry; nothing else needed its own timer
- **SVG progress indicators** — using a circle's `stroke-dasharray`/`stroke-dashoffset` and `circumference = 2πr` to animate a ring filling up per second, then rotating the SVG so it starts at 12 o'clock
- **CSS transitions vs. re-render timing** — matching the ring's `transition` duration to the 1-second tick interval so the fill animates smoothly instead of jumping
- **Rough day/night logic** — deriving a simple boolean (`hour >= 6 && hour < 18`) per time zone to drive a small UI detail, without needing sunrise/sunset APIs

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
digital-clock/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Clock logic + UI
    ├── App.css            # Component styles
    ├── clock.js            # Time/date formatting + world clock utilities
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Add an alarm feature using the Notifications API
- Let users add/remove their own cities to the world clock list
- Add a stopwatch or countdown timer mode
- Add unit tests for the formatting utilities in `clock.js` (Vitest), mocking `Intl` output