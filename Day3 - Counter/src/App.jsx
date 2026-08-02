import { useEffect, useRef, useState } from 'react'
import './App.css'

const STEP_OPTIONS = [1, 5, 10]
const MAX_LOG_ENTRIES = 6

function App() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [log, setLog] = useState([])
  const [pulse, setPulse] = useState(null) // 'up' | 'down' | 'reset' | null
  const pulseTimeout = useRef(null)

  const applyChange = (delta, label) => {
    setCount((prev) => {
      const next = prev + delta
      setLog((prevLog) => [{ label, value: next, id: Date.now() }, ...prevLog].slice(0, MAX_LOG_ENTRIES))
      return next
    })
    triggerPulse(delta > 0 ? 'up' : delta < 0 ? 'down' : 'reset')
  }

  const triggerPulse = (kind) => {
    setPulse(kind)
    clearTimeout(pulseTimeout.current)
    pulseTimeout.current = setTimeout(() => setPulse(null), 350)
  }

  const increment = () => applyChange(step, `+${step}`)
  const decrement = () => applyChange(-step, `-${step}`)
  const reset = () => {
    setCount(0)
    setLog((prevLog) => [{ label: 'reset', value: 0, id: Date.now() }, ...prevLog].slice(0, MAX_LOG_ENTRIES))
    triggerPulse('reset')
  }

  // Keyboard support: Arrow Up/Down to change count, R to reset
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        increment()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        decrement()
      } else if (e.key.toLowerCase() === 'r') {
        reset()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => () => clearTimeout(pulseTimeout.current), [])

  const mood = count > 0 ? 'positive' : count < 0 ? 'negative' : 'neutral'

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Counter</h1>
        <p className="app__subtitle">Track a value up, down, or back to zero.</p>
      </header>

      <section className={`dial dial--${mood} ${pulse ? `dial--pulse-${pulse}` : ''}`} aria-live="polite">
        <span className="dial__ring" />
        <span className="dial__value">{count}</span>
      </section>

      <div className="controls">
        <button
          className="controls__btn controls__btn--decrement"
          onClick={decrement}
          aria-label={`Decrease by ${step}`}
        >
          −
        </button>
        <button className="controls__btn controls__btn--reset" onClick={reset} aria-label="Reset to zero">
          Reset
        </button>
        <button
          className="controls__btn controls__btn--increment"
          onClick={increment}
          aria-label={`Increase by ${step}`}
        >
          +
        </button>
      </div>

      <div className="step-picker" role="group" aria-label="Choose step size">
        <span className="step-picker__label">Step</span>
        {STEP_OPTIONS.map((option) => (
          <button
            key={option}
            className={`step-picker__btn ${step === option ? 'step-picker__btn--active' : ''}`}
            onClick={() => setStep(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <section className="log">
        <h2 className="log__title">Activity</h2>
        {log.length === 0 ? (
          <p className="log__empty">Nothing yet — press + or − to start.</p>
        ) : (
          <ul className="log__list">
            {log.map((entry) => (
              <li key={entry.id} className="log__item">
                <span className="log__label">{entry.label}</span>
                <span className="log__arrow">→</span>
                <span className="log__value">{entry.value}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="hint">Keyboard: ↑ increase · ↓ decrease · R reset</p>
    </main>
  )
}

export default App