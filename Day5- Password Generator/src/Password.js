// Password generation + strength estimation utilities.
// Uses crypto.getRandomValues for cryptographically secure randomness
// instead of Math.random(), which is not safe for security-sensitive values.

const CHAR_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

// Characters that are easy to misread (l/1/I, 0/O, etc.) — optionally stripped.
const AMBIGUOUS = 'il1LoO0B8S5Z2G6q9g'

export function buildCharset(options) {
  let charset = ''
  if (options.lowercase) charset += CHAR_SETS.lowercase
  if (options.uppercase) charset += CHAR_SETS.uppercase
  if (options.numbers) charset += CHAR_SETS.numbers
  if (options.symbols) charset += CHAR_SETS.symbols

  if (options.excludeAmbiguous) {
    charset = charset
      .split('')
      .filter((char) => !AMBIGUOUS.includes(char))
      .join('')
  }

  return charset
}

function secureRandomInt(max) {
  // Rejection sampling to avoid modulo bias.
  const array = new Uint32Array(1)
  const limit = Math.floor(0xffffffff / max) * max
  let value
  do {
    crypto.getRandomValues(array)
    value = array[0]
  } while (value >= limit)
  return value % max
}

export function generatePassword(length, options) {
  const charset = buildCharset(options)
  if (!charset) return ''

  const requiredChars = []
  // Guarantee at least one character from each selected category,
  // then fill the rest randomly and shuffle.
  const categories = [
    options.lowercase && CHAR_SETS.lowercase,
    options.uppercase && CHAR_SETS.uppercase,
    options.numbers && CHAR_SETS.numbers,
    options.symbols && CHAR_SETS.symbols,
  ].filter(Boolean)

  categories.forEach((set) => {
    const filtered = options.excludeAmbiguous
      ? set.split('').filter((c) => !AMBIGUOUS.includes(c)).join('')
      : set
    if (filtered.length > 0) {
      requiredChars.push(filtered[secureRandomInt(filtered.length)])
    }
  })

  const remainingLength = Math.max(0, length - requiredChars.length)
  const randomChars = Array.from({ length: remainingLength }, () => charset[secureRandomInt(charset.length)])

  const all = [...requiredChars, ...randomChars]

  // Fisher-Yates shuffle so the guaranteed characters aren't always at the front.
  for (let i = all.length - 1; i > 0; i -= 1) {
    const j = secureRandomInt(i + 1)
    ;[all[i], all[j]] = [all[j], all[i]]
  }

  return all.slice(0, length).join('')
}

export function estimateStrength(password, options) {
  const charsetSize = buildCharset(options).length || 1
  const entropyBits = password.length * Math.log2(charsetSize)

  if (password.length === 0) return { label: 'Empty', score: 0, bits: 0 }
  if (entropyBits < 40) return { label: 'Weak', score: 1, bits: entropyBits }
  if (entropyBits < 60) return { label: 'Fair', score: 2, bits: entropyBits }
  if (entropyBits < 80) return { label: 'Strong', score: 3, bits: entropyBits }
  return { label: 'Very strong', score: 4, bits: entropyBits }
}