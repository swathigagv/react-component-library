import { useEffect, useState } from 'react'
import './App.css'
import { WORLD_CITIES, getGreeting, splitTime, formatDate, formatCityTime, isDaytime } from './clock.js'

const SECONDS_CIRCUMFERENCE = 2 * Math.PI * 54 // matches the SVG circle radius below

function App() {
  const [now, setNow] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(false)

  // Tick every second. Cleared on unmount to avoid a dangling interval.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { main, seconds, period } = splitTime(now, is24Hour)
  const greeting = getGreeting(now.getHours())
  const secondsProgress = Number(seconds) / 60
  const dashOffset = SECONDS_CIRCUMFERENCE * (1 - secondsProgress)

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Digital Clock</h1>
        <p className="app__subtitle">{greeting}, it's currently:</p>
      </header>

      <section className="face" aria-live="polite">
        <svg className="face__ring" viewBox="0 0 120 120">
          <circle className="face__ring-track" cx="60" cy="60" r="54" />
          <circle
            className="face__ring-progress"
            cx="60"
            cy="60"
            r="54"
            style={{
              strokeDasharray: SECONDS_CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>
        <div className="face__readout">
          <span className="face__time">{main}</span>
          <div className="face__meta">
            <span className="face__seconds">{seconds}</span>
            {period && <span className="face__period">{period}</span>}
          </div>
        </div>
      </section>

      <p className="date">{formatDate(now)}</p>

      <div className="format-toggle" role="group" aria-label="Time format">
        <button
          className={`format-toggle__btn ${!is24Hour ? 'format-toggle__btn--active' : ''}`}
          onClick={() => setIs24Hour(false)}
        >
          12-hour
        </button>
        <button
          className={`format-toggle__btn ${is24Hour ? 'format-toggle__btn--active' : ''}`}
          onClick={() => setIs24Hour(true)}
        >
          24-hour
        </button>
      </div>

      <section className="world">
        <h2 className="world__title">World clock</h2>
        <ul className="world__list">
          {WORLD_CITIES.map((city) => (
            <li key={city.timeZone} className="world__item">
              <span className="world__dot" aria-hidden="true">
                {isDaytime(now, city.timeZone) ? '☀' : '☾'}
              </span>
              <span className="world__label">{city.label}</span>
              <span className="world__time">{formatCityTime(now, city.timeZone, is24Hour)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App