import { useEffect, useRef, useState } from 'react'
import './App.css'
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  isValidHex,
  normalizeHex,
  bestTextColor,
  randomHex,
} from './color.js'

const MAX_SAVED = 10

function App() {
  const [color, setColor] = useState('#6366F1')
  const [hexDraft, setHexDraft] = useState(color)
  const [saved, setSaved] = useState([])
  const [copiedField, setCopiedField] = useState(null)
  const copyTimeout = useRef(null)

  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb)
  const text = bestTextColor(rgb)
  const ratioLabel =
    text.ratio >= 7 ? 'AAA' : text.ratio >= 4.5 ? 'AA' : text.ratio >= 3 ? 'AA Large' : 'Low contrast'

  // Keep the hex text field in sync whenever the color changes from
  // somewhere else (sliders, random, saved swatches) — but not while
  // the user is mid-typing an invalid value.
  useEffect(() => {
    setHexDraft(color)
  }, [color])

  useEffect(() => () => clearTimeout(copyTimeout.current), [])

  const applyHexDraft = (value) => {
    const normalized = normalizeHex(value)
    if (isValidHex(normalized)) {
      setColor(normalized)
    } else {
      setHexDraft(value) // let them keep typing, don't force it back yet
    }
  }

  const updateRgbChannel = (channel, value) => {
    const next = { ...rgb, [channel]: Number(value) }
    setColor(rgbToHex(next))
  }

  const updateHslChannel = (channel, value) => {
    const next = { ...hsl, [channel]: Number(value) }
    setColor(rgbToHex(hslToRgb(next)))
  }

  const handleRandom = () => setColor(randomHex())

  const handleCopy = async (field, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopiedField(null), 1500)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail quietly.
    }
  }

  const handleSave = () => {
    setSaved((prev) => {
      if (prev.includes(color)) return prev
      return [color, ...prev].slice(0, MAX_SAVED)
    })
  }

  const removeSaved = (hex) => {
    setSaved((prev) => prev.filter((c) => c !== hex))
  }

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Color Picker</h1>
        <p className="app__subtitle">Pick, tune, and save colors in HEX, RGB, and HSL.</p>
      </header>

      <section
        className="stage"
        style={{ background: color, color: text.color }}
      >
        <input
          type="color"
          className="stage__native"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Pick a color"
        />
        <span className="stage__hex">{color}</span>
        <span className="stage__contrast">
          Best text: <strong>{text.color}</strong> · {text.ratio.toFixed(2)}:1 · {ratioLabel}
        </span>
      </section>

      <div className="actions">
        <button className="actions__btn actions__btn--primary" onClick={handleRandom}>
          🎲 Random
        </button>
        <button className="actions__btn" onClick={handleSave}>
          + Save color
        </button>
      </div>

      <section className="formats">
        <FormatRow
          label="HEX"
          value={hexDraft}
          onChange={(v) => {
            setHexDraft(v)
            applyHexDraft(v)
          }}
          onCopy={() => handleCopy('hex', color)}
          copied={copiedField === 'hex'}
          editable
        />
        <FormatRow
          label="RGB"
          value={rgbString}
          onCopy={() => handleCopy('rgb', rgbString)}
          copied={copiedField === 'rgb'}
        >
          <div className="sliders">
            <Slider label="R" value={rgb.r} max={255} onChange={(v) => updateRgbChannel('r', v)} />
            <Slider label="G" value={rgb.g} max={255} onChange={(v) => updateRgbChannel('g', v)} />
            <Slider label="B" value={rgb.b} max={255} onChange={(v) => updateRgbChannel('b', v)} />
          </div>
        </FormatRow>
        <FormatRow
          label="HSL"
          value={hslString}
          onCopy={() => handleCopy('hsl', hslString)}
          copied={copiedField === 'hsl'}
        >
          <div className="sliders">
            <Slider label="H" value={hsl.h} max={360} onChange={(v) => updateHslChannel('h', v)} />
            <Slider label="S" value={hsl.s} max={100} onChange={(v) => updateHslChannel('s', v)} />
            <Slider label="L" value={hsl.l} max={100} onChange={(v) => updateHslChannel('l', v)} />
          </div>
        </FormatRow>
      </section>

      <section className="palette">
        <h2 className="palette__title">Saved colors</h2>
        {saved.length === 0 ? (
          <p className="palette__empty">Nothing saved yet — pick a color and hit "Save color".</p>
        ) : (
          <ul className="palette__list">
            {saved.map((hex) => (
              <li key={hex} className="palette__item">
                <button
                  className="palette__swatch"
                  style={{ background: hex }}
                  onClick={() => setColor(hex)}
                  aria-label={`Use saved color ${hex}`}
                />
                <span className="palette__hex">{hex}</span>
                <button
                  className="palette__remove"
                  onClick={() => removeSaved(hex)}
                  aria-label={`Remove saved color ${hex}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

function FormatRow({ label, value, onChange, onCopy, copied, editable, children }) {
  return (
    <div className="format-row">
      <div className="format-row__head">
        <span className="format-row__label">{label}</span>
        {editable ? (
          <input
            className="format-row__input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
          />
        ) : (
          <span className="format-row__value">{value}</span>
        )}
        <button className="format-row__copy" onClick={onCopy}>
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      {children}
    </div>
  )
}

function Slider({ label, value, max, onChange }) {
  return (
    <label className="slider">
      <span className="slider__label">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="slider__value">{value}</span>
    </label>
  )
}

export default App