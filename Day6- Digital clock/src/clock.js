// Time formatting helpers, built on the native Intl API rather than a
// date library — plenty for formatting, comparisons, and time zones.

export const WORLD_CITIES = [
  { label: 'New York', timeZone: 'America/New_York' },
  { label: 'London', timeZone: 'Europe/London' },
  { label: 'Chennai', timeZone: 'Asia/Kolkata' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { label: 'Sydney', timeZone: 'Australia/Sydney' },
]

export function getGreeting(hour) {
  if (hour < 5) return 'Good night'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

// Splits the clock face into { main: "HH:MM", seconds: "SS", period: "AM"|null }
// so the seconds and AM/PM can be styled smaller than the main time.
export function splitTime(date, is24Hour) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24Hour,
  })

  const parts = formatter.formatToParts(date)
  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''

  const main = `${get('hour')}:${get('minute')}`
  const seconds = get('second')
  const period = is24Hour ? null : get('dayPeriod')

  return { main, seconds, period }
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatCityTime(date, timeZone, is24Hour) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !is24Hour,
    timeZone,
  }).format(date)
}

// Rough day/night flag per city, used to show a sun/moon indicator.
export function isDaytime(date, timeZone) {
  const hourString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone,
  }).format(date)
  const hour = Number(hourString)
  return hour >= 6 && hour < 18
}