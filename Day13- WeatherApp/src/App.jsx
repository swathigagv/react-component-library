import { useState, useEffect, useCallback } from 'react'

// Open-Meteo needs no API key — geocoding turns a place name into
// coordinates, then forecast turns coordinates into weather data.
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// WMO weather codes -> a short label + an emoji icon.
// https://open-meteo.com/en/docs#weathervariables
const WEATHER_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Slight snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '🌨️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  81: { label: 'Rain showers', icon: '🌧️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm, hail', icon: '⛈️' },
  99: { label: 'Thunderstorm, heavy hail', icon: '⛈️' },
}

const describeCode = (code) => WEATHER_CODES[code] ?? { label: 'Unknown', icon: '🌡️' }

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function App() {
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState('c') // 'c' | 'f'
  const [place, setPlace] = useState(null) // { name, country, latitude, longitude }
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | error | ready
  const [errorMsg, setErrorMsg] = useState('')

  const loadWeather = useCallback(async (lat, lon) => {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      forecast_days: '6',
    })
    const res = await fetch(`${FORECAST_URL}?${params}`)
    if (!res.ok) throw new Error('Forecast request failed')
    return res.json()
  }, [])

  const searchCity = useCallback(async (e) => {
    e?.preventDefault()
    if (!query.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const geoRes = await fetch(`${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=1`)
      if (!geoRes.ok) throw new Error('Location lookup failed')
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) {
        setStatus('error')
        setErrorMsg(`No results for "${query}". Try a different city.`)
        return
      }

      const found = geoData.results[0]
      const nextPlace = {
        name: found.name,
        country: found.country,
        admin1: found.admin1,
        latitude: found.latitude,
        longitude: found.longitude,
      }

      const data = await loadWeather(found.latitude, found.longitude)
      setPlace(nextPlace)
      setWeather(data)
      setStatus('ready')
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong fetching the weather. Please try again.')
    }
  }, [query, loadWeather])

  // Load a default city on first render so the app isn't empty.
  useEffect(() => {
    const loadDefault = async () => {
      setStatus('loading')
      try {
        const data = await loadWeather(13.0827, 80.2707) // Chennai
        setPlace({ name: 'Chennai', country: 'India' })
        setWeather(data)
        setStatus('ready')
      } catch {
        setStatus('error')
        setErrorMsg('Could not load default weather.')
      }
    }
    loadDefault()
  }, [loadWeather])

  const toC = (t) => t
  const toF = (t) => (t * 9) / 5 + 32
  const displayTemp = (t) => {
    if (t === undefined || t === null) return '--'
    const value = unit === 'c' ? toC(t) : toF(t)
    return Math.round(value)
  }

  const current = weather?.current
  const daily = weather?.daily
  const hourly = weather?.hourly

  // Next 8 hourly readings starting from the current hour.
  const upcomingHours = (() => {
    if (!hourly?.time) return []
    const nowIso = weather.current.time
    const startIdx = hourly.time.findIndex((t) => t >= nowIso)
    const from = startIdx === -1 ? 0 : startIdx
    return hourly.time.slice(from, from + 8).map((time, i) => ({
      time,
      temp: hourly.temperature_2m[from + i],
      code: hourly.weather_code[from + i],
    }))
  })()

  const upcomingDays = (() => {
    if (!daily?.time) return []
    return daily.time.map((date, i) => ({
      date,
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      code: daily.weather_code[i],
    }))
  })()

  return (
    <div className="app">
      <div className="backdrop" aria-hidden="true" />

      <main className="card">
        <header className="header">
          <div className="brand">
            <span className="brand-mark">☁︎</span>
            <span className="brand-name">Skyline</span>
          </div>
          <button
            className="unit-toggle"
            onClick={() => setUnit((u) => (u === 'c' ? 'f' : 'c'))}
            aria-label="Toggle temperature unit"
          >
            °{unit.toUpperCase()}
          </button>
        </header>

        <form className="search" onSubmit={searchCity}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city — e.g. Coimbatore, Tokyo, Oslo"
            aria-label="City name"
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Searching…' : 'Search'}
          </button>
        </form>

        {status === 'error' && <p className="error">{errorMsg}</p>}

        {status === 'loading' && !weather && <p className="hint">Loading weather…</p>}

        {weather && place && (
          <>
            <section className="current">
              <div className="current-location">
                <h1>{place.name}</h1>
                <p>{[place.admin1, place.country].filter(Boolean).join(', ')}</p>
              </div>

              <div className="current-main">
                <span className="current-icon" aria-hidden="true">
                  {describeCode(current.weather_code).icon}
                </span>
                <span className="current-temp">{displayTemp(current.temperature_2m)}°</span>
              </div>

              <p className="current-label">{describeCode(current.weather_code).label}</p>

              <div className="current-stats">
                <div>
                  <span className="stat-label">Feels like</span>
                  <span className="stat-value">{displayTemp(current.apparent_temperature)}°</span>
                </div>
                <div>
                  <span className="stat-label">Humidity</span>
                  <span className="stat-value">{current.relative_humidity_2m}%</span>
                </div>
                <div>
                  <span className="stat-label">Wind</span>
                  <span className="stat-value">{Math.round(current.wind_speed_10m)} km/h</span>
                </div>
              </div>
            </section>

            <section className="hourly">
              <h2>Next hours</h2>
              <div className="hourly-scroll">
                {upcomingHours.map((h) => (
                  <div className="hour-item" key={h.time}>
                    <span className="hour-time">
                      {new Date(h.time).toLocaleTimeString([], { hour: 'numeric' })}
                    </span>
                    <span className="hour-icon" aria-hidden="true">{describeCode(h.code).icon}</span>
                    <span className="hour-temp">{displayTemp(h.temp)}°</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="daily">
              <h2>6-day forecast</h2>
              <ul className="daily-list">
                {upcomingDays.map((d, i) => (
                  <li className="daily-item" key={d.date}>
                    <span className="daily-day">
                      {i === 0 ? 'Today' : DAY_NAMES[new Date(d.date).getDay()]}
                    </span>
                    <span className="daily-icon" aria-hidden="true">{describeCode(d.code).icon}</span>
                    <span className="daily-range">
                      <span className="daily-max">{displayTemp(d.max)}°</span>
                      <span className="daily-min">{displayTemp(d.min)}°</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        <footer className="footer">
          <p>Weather data from Open-Meteo · Day 13 of the React learning series</p>
        </footer>
      </main>
    </div>
  )
}

export default App