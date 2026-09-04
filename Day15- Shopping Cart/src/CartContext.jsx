import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'day15-shopping-cart'

// Cart state is a list of { id, name, price, emoji, quantity }.
// Keeping all mutations in one reducer means every screen that touches
// the cart (product grid, cart panel) goes through the same rules
// instead of each writing its own ad-hoc setState logic.
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.product.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...state, { ...action.product, quantity: 1 }]
    }

    case 'INCREMENT':
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      )

    case 'DECREMENT':
      // Decrementing a quantity of 1 removes the item entirely, rather
      // than letting it sit at 0.
      return state
        .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id)

    case 'CLEAR_CART':
      return []

    case 'HYDRATE':
      return action.items

    default:
      return state
  }
}

function loadInitialCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadInitialCart)

  // Persist to localStorage whenever the cart changes, so a refresh
  // doesn't wipe the user's selections.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Storage can fail (private browsing, quota) — the app still
      // works in-memory even if persistence silently fails.
    }
  }, [cart])

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', product })
  const incrementItem = (id) => dispatch({ type: 'INCREMENT', id })
  const decrementItem = (id) => dispatch({ type: 'DECREMENT', id })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = {
    cart,
    itemCount,
    subtotal,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook so consumers don't import useContext + CartContext
// separately, and get a clear error if used outside the provider.
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}