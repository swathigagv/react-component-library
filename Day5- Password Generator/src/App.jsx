import { useEffect, useRef, useState } from 'react'
import './App.css'
import { generatePassword, estimateStrength } from './Password.js'

const MAX_HISTORY = 6

const STRENGTH_COLORS = {
  0: 'var(--text-dim)',
  1: 'var(--danger)',
  2: 'var(--warn)',
  3: 'var(--aqua)',
  4: 'var(--good)',
}

function App() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  })
  const [password, setPassword] = useState('')
  const [history, setHistory] = useState([])
  const [copied, setCopied] = useState(false)
  const copyTimeout = useRef(null)

  const hasAnyOption = Object.values(options).some((v, i) => i < 4 && v) // ignore excludeAmbiguous
  const strength = estimateStrength(password, options)

  const handleGenerate = () => {
    if (!hasAnyOption) return
    const next = generatePassword(length, options)
    setPassword(next)
    setHistory((prev) => [{ value: next, id: Date.now() }, ...prev].slice(0, MAX_HISTORY))
  }

  // Generate an initial password on mount, and regenerate whenever
  // length or character-set options change.
  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options.lowercase, options.uppercase, options.numbers, options.symbols, options.excludeAmbiguous])

  useEffect(() => () => clearTimeout(copyTimeout.current), [])

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable — fail quietly.
    }
  }

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Password Generator</h1>
        <p className="app__subtitle">Generate strong, random passwords you control.</p>
      </header>

      <section className="output">
        <span className="output__value">{password || 'Select at least one option'}</span>
        <div className="output__actions">
          <button className="output__btn" onClick={handleGenerate} aria-label="Generate new password" disabled={!hasAnyOption}>
            ↻
          </button>
          <button
            className="output__btn"
            onClick={() => handleCopy(password)}
            aria-label="Copy password"
            disabled={!password}
          >
            {copied ? '✓' : '⧉'}
          </button>
        </div>
      </section>

      <section className="strength">
        <div className="strength__bar">
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className="strength__segment"
              style={{
                background: step <= strength.score ? STRENGTH_COLORS[strength.score] : 'var(--border)',
              }}
            />
          ))}
        </div>
        <span className="strength__label">
          {strength.label} {password && `· ~${Math.round(strength.bits)} bits`}
        </span>
      </section>

      <section className="settings">
        <label className="settings__length">
          <span>
            Length: <strong>{length}</strong>
          </span>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <div className="settings__checks">
          <Checkbox label="Uppercase (A–Z)" checked={options.uppercase} onChange={() => toggleOption('uppercase')} />
          <Checkbox label="Lowercase (a–z)" checked={options.lowercase} onChange={() => toggleOption('lowercase')} />
          <Checkbox label="Numbers (0–9)" checked={options.numbers} onChange={() => toggleOption('numbers')} />
          <Checkbox label="Symbols (!@#$…)" checked={options.symbols} onChange={() => toggleOption('symbols')} />
          <Checkbox
            label="Exclude ambiguous (l, 1, O, 0…)"
            checked={options.excludeAmbiguous}
            onChange={() => toggleOption('excludeAmbiguous')}
          />
        </div>
        {!hasAnyOption && <p className="settings__warning">Pick at least one character type.</p>}
      </section>

      <section className="history">
        <h2 className="history__title">Recent</h2>
        {history.length === 0 ? (
          <p className="history__empty">Generated passwords will show up here.</p>
        ) : (
          <ul className="history__list">
            {history.map((entry) => (
              <li key={entry.id} className="history__item">
                <span className="history__value">{entry.value}</span>
                <button
                  className="history__copy"
                  onClick={() => handleCopy(entry.value)}
                  aria-label={`Copy password ${entry.value}`}
                >
                  ⧉
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkbox__box" />
      <span className="checkbox__label">{label}</span>
    </label>
  )
}

export default App