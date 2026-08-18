// A small, hand-curated, offline quote bank grouped by category.
// Kept local (no API) so the app works without a network call and
// the focus stays on React state/UI patterns rather than fetching.

export const CATEGORIES = ['All', 'Motivation', 'Wisdom', 'Life', 'Success', 'Humor']

export const QUOTES = [
  { id: 1, text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Motivation' },
  { id: 2, text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius', category: 'Motivation' },
  { id: 3, text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt', category: 'Motivation' },
  { id: 4, text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill', category: 'Motivation' },
  { id: 5, text: 'The secret of getting ahead is getting started.', author: 'Mark Twain', category: 'Motivation' },

  { id: 6, text: 'The unexamined life is not worth living.', author: 'Socrates', category: 'Wisdom' },
  { id: 7, text: 'Knowing yourself is the beginning of all wisdom.', author: 'Aristotle', category: 'Wisdom' },
  { id: 8, text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates', category: 'Wisdom' },
  { id: 9, text: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey', category: 'Wisdom' },
  { id: 10, text: 'The fool doth think he is wise, but the wise man knows himself to be a fool.', author: 'William Shakespeare', category: 'Wisdom' },

  { id: 11, text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon', category: 'Life' },
  { id: 12, text: 'In the end, it\'s not the years in your life that count. It\'s the life in your years.', author: 'Abraham Lincoln', category: 'Life' },
  { id: 13, text: 'Life is really simple, but we insist on making it complicated.', author: 'Confucius', category: 'Life' },
  { id: 14, text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama', category: 'Life' },
  { id: 15, text: 'Get busy living or get busy dying.', author: 'Stephen King', category: 'Life' },

  { id: 16, text: 'Success is walking from failure to failure with no loss of enthusiasm.', author: 'Winston Churchill', category: 'Success' },
  { id: 17, text: 'The road to success and the road to failure are almost exactly the same.', author: 'Colin R. Davis', category: 'Success' },
  { id: 18, text: 'Success usually comes to those who are too busy to be looking for it.', author: 'Henry David Thoreau', category: 'Success' },
  { id: 19, text: 'Don\'t be afraid to give up the good to go for the great.', author: 'John D. Rockefeller', category: 'Success' },
  { id: 20, text: 'I find that the harder I work, the more luck I seem to have.', author: 'Thomas Jefferson', category: 'Success' },

  { id: 21, text: 'I\'m not lazy, I\'m on energy-saving mode.', author: 'Unknown', category: 'Humor' },
  { id: 22, text: 'I used to think I was indecisive, but now I\'m not so sure.', author: 'Unknown', category: 'Humor' },
  { id: 23, text: 'Behind every great person is a substantial amount of coffee.', author: 'Unknown', category: 'Humor' },
  { id: 24, text: 'I told my computer I needed a break, and now it won\'t stop sending me KitKat ads.', author: 'Unknown', category: 'Humor' },
  { id: 25, text: 'My code doesn\'t have bugs, it just develops random features.', author: 'Unknown', category: 'Humor' },
]

export function getRandomQuote(category, excludeId) {
  const pool = category === 'All' ? QUOTES : QUOTES.filter((q) => q.category === category)
  if (pool.length === 0) return null
  if (pool.length === 1) return pool[0]

  let next = pool[Math.floor(Math.random() * pool.length)]
  // Avoid showing the exact same quote twice in a row when possible.
  let attempts = 0
  while (next.id === excludeId && attempts < 10) {
    next = pool[Math.floor(Math.random() * pool.length)]
    attempts += 1
  }
  return next
}