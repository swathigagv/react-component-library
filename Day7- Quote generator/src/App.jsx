import { useEffect, useRef, useState } from 'react'
import './App.css'
import { CATEGORIES, getRandomQuote } from './quotes.js'

const FADE_MS = 200

function App() {
  const [category, setCategory] = useState('All')
  const [quote, setQuote] = useState(() => getRandomQuote('All'))
  const [favorites, setFavorites] = useState([])
  const [fading, setFading] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyTimeout = useRef(null)
  const fadeTimeout = useRef(null)

  const isFavorite = favorites.some((f) => f.id === quote?.id)

  const showNewQuote = (nextCategory = category) => {
    setFading(true)
    clearTimeout(fadeTimeout.current)
    fadeTimeout.current = setTimeout(() => {
      setQuote(getRandomQuote(nextCategory, quote?.id))
      setFading(false)
    }, FADE_MS)
  }

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory)
    showNewQuote(nextCategory)
  }

  const toggleFavorite = () => {
    if (!quote) return
    setFavorites((prev) =>
      isFavorite ? prev.filter((f) => f.id !== quote.id) : [quote, ...prev]
    )
  }

  const handleCopy = async () => {
    if (!quote) return
    try {
      await navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`)
      setCopied(true)
      clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable — fail quietly.
    }
  }

  useEffect(
    () => () => {
      clearTimeout(copyTimeout.current)
      clearTimeout(fadeTimeout.current)
    },
    []
  )

  const tweetUrl = quote
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" — ${quote.author}`)}`
    : '#'

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Random Quote Generator</h1>
        <p className="app__subtitle">A little inspiration, one click at a time.</p>
      </header>

      <div className="categories" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`categories__chip ${category === c ? 'categories__chip--active' : ''}`}
            onClick={() => handleCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <section className={`card ${fading ? 'card--fading' : ''}`} aria-live="polite">
        <span className="card__mark" aria-hidden="true">
          “
        </span>
        <p className="card__text">{quote?.text}</p>
        <p className="card__author">— {quote?.author}</p>
        <span className="card__category">{quote?.category}</span>
      </section>

      <div className="actions">
        <button className="actions__btn actions__btn--primary" onClick={() => showNewQuote()}>
          🔀 New quote
        </button>
        <button
          className={`actions__btn actions__icon ${isFavorite ? 'actions__icon--active' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        <button className="actions__btn actions__icon" onClick={handleCopy} aria-label="Copy quote">
          {copied ? '✓' : '⧉'}
        </button>
        <a className="actions__btn actions__icon" href={tweetUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          𝕏
        </a>
      </div>

      <section className="favorites">
        <h2 className="favorites__title">Favorites ({favorites.length})</h2>
        {favorites.length === 0 ? (
          <p className="favorites__empty">Tap ♡ on a quote to save it here.</p>
        ) : (
          <ul className="favorites__list">
            {favorites.map((f) => (
              <li key={f.id} className="favorites__item">
                <p className="favorites__text">"{f.text}"</p>
                <div className="favorites__meta">
                  <span className="favorites__author">— {f.author}</span>
                  <button
                    className="favorites__remove"
                    onClick={() => setFavorites((prev) => prev.filter((q) => q.id !== f.id))}
                    aria-label={`Remove quote by ${f.author} from favorites`}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App