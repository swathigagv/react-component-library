// A small local product catalog to search and filter against.
// Kept local (no API) so the focus stays on search/filter/sort patterns.

export const CATEGORIES = ['Audio', 'Wearables', 'Photography', 'Computing', 'Gaming', 'Accessories']

export const PRODUCTS = [
  { id: 1, name: 'Aria Wireless Earbuds', category: 'Audio', price: 79, rating: 4.4, inStock: true },
  { id: 2, name: 'Bassline Studio Headphones', category: 'Audio', price: 149, rating: 4.7, inStock: true },
  { id: 3, name: 'Echo Mini Bluetooth Speaker', category: 'Audio', price: 45, rating: 4.1, inStock: false },
  { id: 4, name: 'Pulse Fitness Tracker', category: 'Wearables', price: 59, rating: 4.0, inStock: true },
  { id: 5, name: 'Orbit Smartwatch Series 3', category: 'Wearables', price: 219, rating: 4.6, inStock: true },
  { id: 6, name: 'Flux Sleep Ring', category: 'Wearables', price: 189, rating: 4.3, inStock: false },
  { id: 7, name: 'Lumen Mirrorless Camera', category: 'Photography', price: 899, rating: 4.8, inStock: true },
  { id: 8, name: 'Snapshot Instant Camera', category: 'Photography', price: 69, rating: 3.9, inStock: true },
  { id: 9, name: 'Wide-Angle Lens Kit', category: 'Photography', price: 129, rating: 4.2, inStock: true },
  { id: 10, name: 'Compact Travel Tripod', category: 'Photography', price: 35, rating: 4.0, inStock: false },
  { id: 11, name: 'Nimbus Mechanical Keyboard', category: 'Computing', price: 109, rating: 4.5, inStock: true },
  { id: 12, name: 'Glide Wireless Mouse', category: 'Computing', price: 39, rating: 4.3, inStock: true },
  { id: 13, name: 'Vertex 27" Monitor', category: 'Computing', price: 279, rating: 4.6, inStock: true },
  { id: 14, name: 'Portable SSD 1TB', category: 'Computing', price: 99, rating: 4.7, inStock: false },
  { id: 15, name: 'Quantum Gaming Headset', category: 'Gaming', price: 89, rating: 4.4, inStock: true },
  { id: 16, name: 'Rift Pro Controller', category: 'Gaming', price: 65, rating: 4.2, inStock: true },
  { id: 17, name: 'Arcade RGB Mousepad', category: 'Gaming', price: 25, rating: 3.8, inStock: true },
  { id: 18, name: 'Voltage Charging Dock', category: 'Accessories', price: 29, rating: 4.1, inStock: true },
  { id: 19, name: 'Slate Laptop Sleeve', category: 'Accessories', price: 22, rating: 4.0, inStock: true },
  { id: 20, name: 'Anchor Cable Organizer', category: 'Accessories', price: 12, rating: 3.7, inStock: false },
]

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'price-asc', label: 'Price (Low–High)' },
  { value: 'price-desc', label: 'Price (High–Low)' },
  { value: 'rating-desc', label: 'Rating (High–Low)' },
]

export function sortProducts(products, sortBy) {
  const sorted = [...products]
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted
  }
}