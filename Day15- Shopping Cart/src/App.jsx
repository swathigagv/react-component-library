import { CartProvider } from './CartContext.jsx'
import ProductGrid from './ProductGrid.jsx'
import CartPanel from './CartPanel.jsx'
import './App.css'

function App() {
  return (
    <CartProvider>
      <div className="app">
        <div className="backdrop" aria-hidden="true" />

        <div className="layout">
          <header className="page-header">
            <span className="brand-mark">🛍️</span>
            <span className="brand-name">Cartly</span>
          </header>

          <div className="layout-grid">
            <ProductGrid />
            <CartPanel />
          </div>
        </div>
      </div>
    </CartProvider>
  )
}

export default App
