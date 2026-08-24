import { useMemo, useState } from 'react'
import './App.css'
import { CATEGORIES, PRODUCTS, SORT_OPTIONS, sortProducts } from './data.js'
import { useDebouncedValue } from './useDebouncedValue.js'

function App() {
  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('name-asc')

  // Debounce the search term so filtering doesn't re-run on every keystroke,
  // only once the user pauses typing for 300ms.
  const debouncedQuery = useDebouncedValue(query, 300)

  const toggleCategory = (category) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const clearFilters = () => {
    setQuery('')
    setActiveCategories([])
    setInStockOnly(false)
  }

  const hasActiveFilters = query || activeCategories.length > 0 || inStockOnly

  // Recompute the visible list only when a dependency actually changes,
  // instead of filtering + sorting on every render.
  const results = useMemo(() => {
    const needle = debouncedQuery.trim().toLowerCase()

    const filtered = PRODUCTS.filter((product) => {
      const matchesQuery = needle === '' || product.name.toLowerCase().includes(needle)
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(product.category)
      const matchesStock = !inStockOnly || product.inStock
      return matchesQuery && matchesCategory && matchesStock
    })

    return sortProducts(filtered, sortBy)
  }, [debouncedQuery, activeCategories, inStockOnly, sortBy])

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1 className="app__title">Search &amp; Filter</h1>
        <p className="app__subtitle">Find products by name, category, and availability.</p>
      </header>

      <div className="search">
        <span className="search__icon" aria-hidden="true">
          ⌕
        </span>
        <input
          className="search__input"
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        {query && (
          <button className="search__clear" onClick={() => setQuery('')} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      <div className="categories" role="group" aria-label="Filter by category">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`categories__chip ${activeCategories.includes(category) ? 'categories__chip--active' : ''}`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <label className="toolbar__stock">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span>In stock only</span>
        </label>

        <select
          className="toolbar__sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort results"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="results-bar">
        <span className="results-bar__count">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button className="results-bar__clear" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <span className="empty__icon" aria-hidden="true">
            ¯\_(ツ)_/¯
          </span>
          <p className="empty__text">No products match your search.</p>
        </div>
      ) : (
        <ul className="results">
          {results.map((product) => (
            <li key={product.id} className="results__item">
              <div className="results__main">
                <span className="results__name">
                  <Highlight text={product.name} query={debouncedQuery} />
                </span>
                <span className="results__category">{product.category}</span>
              </div>
              <div className="results__meta">
                <span className="results__price">${product.price}</span>
                <span className="results__rating">★ {product.rating.toFixed(1)}</span>
                <span className={`results__stock ${product.inStock ? '' : 'results__stock--out'}`}>
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

// Splits `text` around the (case-insensitive) `query` and wraps matches
// in <mark> so search hits are visually highlighted in the results list.
function Highlight({ text, query }) {
  if (!query.trim()) return text

  const needle = query.trim()
  const index = text.toLowerCase().indexOf(needle.toLowerCase())
  if (index === -1) return text

  const before = text.slice(0, index)
  const match = text.slice(index, index + needle.length)
  const after = text.slice(index + needle.length)

  return (
    <>
      {before}
      <mark className="highlight">{match}</mark>
      {after}
    </>
  )
}

export default App