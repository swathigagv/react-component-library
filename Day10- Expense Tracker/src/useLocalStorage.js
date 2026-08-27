import { useEffect, useState } from 'react'

// Generic localStorage-backed state hook — reads once on mount,
// writes back on every change. Falls back to `initialValue` if
// nothing is stored yet or the stored value can't be parsed.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable (e.g. private browsing) — fail quietly.
    }
  }, [key, value])

  return [value, setValue]
}