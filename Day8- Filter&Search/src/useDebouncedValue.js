import { useEffect, useState } from 'react'

// Returns a version of `value` that only updates after `delay` ms have
// passed without it changing again — used so search filtering doesn't
// re-run on every single keystroke.
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debounced
}