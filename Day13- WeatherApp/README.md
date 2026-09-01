# Day 13 — Weather App 🌤️

A city weather lookup app built with React and Vite. Search any city and get
current conditions, an hourly outlook, and a 6-day forecast — no API key
required.

Part of a daily React learning series (Day 13 of the component-a-day build).

## Features

- **City search** — type any city name and fetch its live weather via a free
  geocoding + forecast API pipeline (Open-Meteo).
- **Current conditions** — temperature, "feels like", humidity, wind speed,
  and a weather-condition icon/label derived from WMO weather codes.
- **Hourly outlook** — a horizontally scrollable strip of the next 8 hours,
  each with time, icon, and temperature.
- **6-day forecast** — daily high/low temperatures with condition icons.
- **°C / °F toggle** — switch units instantly without a re-fetch.
- **Default city on load** — the app isn't empty on first render; it loads a
  starting city automatically.
- **Loading and error states** — a visible loading state while fetching, and
  a friendly message if a city isn't found or the request fails.
- **Responsive, single-card layout** — works from mobile width up, with
  visible keyboard focus states and `prefers-reduced-motion` respected.

## Tech used

| Layer      | Choice                                            |
|------------|----------------------------------------------------|
| UI library | React 18 (function components + hooks)             |
| Build tool | Vite 5                                              |
| Language   | JavaScript (JSX)                                    |
| Styling    | Plain CSS with custom properties (no framework)     |
| Data       | [Open-Meteo](https://open-meteo.com/) Geocoding API + Forecast API (free, no key) |

## What I learned

- **`useState` for multi-field UI state** — tracking the search query, unit
  preference, fetched place, weather payload, and a `status` state machine
  (`idle` / `loading` / `error` / `ready`) separately, rather than one giant
  object.
- **`useEffect` for a "load on mount" side effect** — fetching a default
  city's weather once when the component first renders, with an empty
  dependency array (aside from the memoized fetch function).
- **`useCallback` to keep fetch functions stable** — wrapping `loadWeather`
  and `searchCity` so they aren't recreated on every render and can be
  safely referenced from `useEffect`'s dependency array.
- **Chaining two API calls** — geocoding a city name into `latitude`/
  `longitude` first, then using those coordinates in a second request to
  get the actual forecast.
- **Mapping numeric codes to meaning** — Open-Meteo returns WMO weather
  codes as integers; building a lookup table to turn `61` into "Slight
  rain" + 🌦️ instead of hardcoding `if/else` chains.
- **Deriving view data instead of storing it** — the hourly and daily lists
  shown on screen are computed fresh from the raw API response on each
  render (slicing the next 8 hours, formatting day names) rather than
  stored as separate state, which avoids sync bugs.
- **Handling network failure and empty results distinctly** — a failed
  `fetch` and a `fetch` that succeeds but returns zero geocoding results
  need different messages, so both are checked explicitly.
- **Unit conversion without re-fetching** — converting Celsius to
  Fahrenheit at render time from a single stored value, instead of storing
  both units or hitting the API again on toggle.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Project structure

```
day13-weather-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx     # React entry point
    ├── App.jsx      # Search, fetch logic, and layout
    └── App.css      # Dark navy/indigo/aqua design system
```

## Possible next steps

- Add geolocation ("use my current location") using the browser's
  Geolocation API.
- Cache recent searches in `localStorage`.
- Add a 7-day chart of temperature trend using a lightweight charting
  library.