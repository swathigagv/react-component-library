// A small static product catalog for the store.
export const products = [
  { id: 1, name: 'Wireless Mouse', price: 799, category: 'Accessories', emoji: '🖱️' },
  { id: 2, name: 'Mechanical Keyboard', price: 3499, category: 'Accessories', emoji: '⌨️' },
  { id: 3, name: 'USB-C Hub', price: 1299, category: 'Accessories', emoji: '🔌' },
  { id: 4, name: 'Noise Cancelling Headphones', price: 5999, category: 'Audio', emoji: '🎧' },
  { id: 5, name: 'Portable Speaker', price: 2199, category: 'Audio', emoji: '🔊' },
  { id: 6, name: '27" Monitor', price: 14999, category: 'Displays', emoji: '🖥️' },
  { id: 7, name: 'Laptop Stand', price: 999, category: 'Accessories', emoji: '💻' },
  { id: 8, name: 'Webcam 1080p', price: 1899, category: 'Video', emoji: '📷' },
  { id: 9, name: 'Desk Lamp', price: 749, category: 'Desk', emoji: '💡' },
  { id: 10, name: 'Ergonomic Chair', price: 8999, category: 'Desk', emoji: '🪑' },
  { id: 11, name: 'Notebook Set', price: 349, category: 'Stationery', emoji: '📓' },
  { id: 12, name: 'Backpack', price: 1599, category: 'Bags', emoji: '🎒' },
]

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)