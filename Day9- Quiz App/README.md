# Quiz App

A React + Vite multiple-choice quiz with a per-question countdown timer, instant answer feedback, a progress bar, and a results screen with a full answer review.

**[Live Demo](#)** • **[Screenshots](#)**

---

## Features

- **Start screen** — shows question count and time limit before committing to the quiz
- **Multiple-choice questions** — 4 options per question, one correct answer
- **Per-question countdown timer** — 20 seconds per question; running out of time auto-locks the question as unanswered
- **Instant answer feedback** — the correct option turns green immediately; if you picked wrong, your choice turns red too
- **Progress bar** — visually tracks how far through the quiz you are, in sync with the question counter
- **Low-time warning** — the timer turns red in the last 5 seconds of a question
- **Results screen** — final score, percentage, and a verdict message that scales with performance
- **Full answer review** — every question listed with a ✓/✕ icon and the correct answer, so you can see exactly what you missed
- **Retry** — restart the quiz from question one with a single click
- **Accessible & responsive** — disabled options after answering (no double-submits), visible focus states, keyboard-usable buttons

---

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Library        | React 18 (function components, hooks)|
| Build tool     | Vite 5                              |
| Language       | JavaScript (JSX)                    |
| Styling        | Plain CSS with custom properties (no framework) |
| Data           | Local question bank (no external API) |
| Fonts          | Space Grotesk (display), Inter (body), JetBrains Mono (timer/progress) — via Google Fonts |

No quiz or state-management library — the stage machine (start → playing → finished), timer, and scoring are all built directly with React state.

---

## What I Learned

- **A simple state machine with `useState`** — modeling the quiz as three explicit stages (`'start' | 'playing' | 'finished'`) instead of a tangle of booleans (`hasStarted`, `isDone`, etc.), so each screen renders from one unambiguous value
- **A countdown timer tied to component state** — running a `setTimeout`-based countdown inside `useEffect`, guarding it so it stops once an answer is locked in, and re-arming it fresh for each new question via the dependency array
- **Auto-submitting on timeout** — treating "time ran out" as a valid answer path (`selectedIndex: null`, always incorrect) rather than leaving the quiz stuck waiting for input that will never come
- **Locking in an answer** — using an `isAnswered` guard so a user can't click multiple options once they've chosen one, and disabling the buttons to reinforce that visually
- **Building a review, not just a score** — storing every answer (`questionId`, `selectedIndex`, `correct`) as the quiz progresses, so the results screen can reconstruct a full per-question breakdown instead of just a final number
- **Composing screens as sub-components** — splitting `StartScreen`, `PlayingScreen`, and `ResultsScreen` out of `App`, each taking only the props it needs, instead of one large component with conditional JSX everywhere
- **Resetting state cleanly on restart** — `startQuiz` resets every piece of quiz state (index, answers, selection, timer) in one place, so "Try again" can't leave stale data from the previous run

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
quiz-app/
├── index.html          # HTML entry point, loads fonts + mounts React
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx         # React root render
    ├── App.jsx           # Quiz flow, timer, scoring + screens
    ├── App.css            # Component styles
    ├── questions.js         # Local question bank + timer config
    └── index.css          # Global resets & theme variables
```

---

## Possible Next Steps

- Add difficulty levels or category selection before starting
- Persist high scores to `localStorage`
- Swap the local question bank for a trivia API (e.g. Open Trivia DB) with loading/error states
- Add unit tests for the scoring and timer-expiry logic (Vitest)