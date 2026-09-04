import { products, formatCurrency } from './data.js'
import { useCart } from './CartContext.jsx'

function ProductGrid() {
  const { addItem, cart } = useCart()

  const quantityInCart = (id) => cart.find((item) => item.id === id)?.quantity ?? 0

  return (
    <section className="products">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => {
          const inCart = quantityInCart(product.id)
          return (
            <div className="product-card" key={product.id}>
              <span className="product-emoji" aria-hidden="true">{product.emoji}</span>
              <p className="product-name">{product.name}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-price">{formatCurrency(product.price)}</p>
              <button className="add-btn" onClick={() => addItem(product)}>
                {inCart > 0 ? `Add another (${inCart} in cart)` : 'Add to cart'}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProductGrid