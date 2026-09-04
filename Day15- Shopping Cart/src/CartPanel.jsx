import { formatCurrency } from './data.js'
import { useCart } from './CartContext.jsx'

const FREE_SHIPPING_THRESHOLD = 2000
const SHIPPING_FEE = 99

function CartPanel() {
  const { cart, itemCount, subtotal, incrementItem, decrementItem, removeItem, clearCart } = useCart()

  const shipping = cart.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <span className="cart-count">{itemCount}</span>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add something from the product list.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li className="cart-item" key={item.id}>
                <span className="cart-item-emoji" aria-hidden="true">{item.emoji}</span>

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{formatCurrency(item.price)} each</p>
                </div>

                <div className="qty-controls">
                  <button onClick={() => decrementItem(item.id)} aria-label={`Decrease ${item.name} quantity`}>
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => incrementItem(item.id)} aria-label={`Increase ${item.name} quantity`}>
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          {amountToFreeShipping > 0 && (
            <p className="shipping-hint">
              Add {formatCurrency(amountToFreeShipping)} more for free shipping
            </p>
          )}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="clear-btn" onClick={clearCart}>
              Clear cart
            </button>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </aside>
  )
}

export default CartPanel