import { useRef, useState } from 'react'

function TransactionForm({ onAdd }) {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})
  const textInputRef = useRef(null)

  const validate = () => {
    const nextErrors = {}
    const parsedAmount = parseFloat(amount)

    if (!text.trim()) nextErrors.text = 'Enter a description.'
    if (amount.trim() === '' || Number.isNaN(parsedAmount)) {
      nextErrors.amount = 'Enter a valid number.'
    } else if (parsedAmount === 0) {
      nextErrors.amount = 'Amount can\'t be zero.'
    }

    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onAdd({ text: text.trim(), amount: parseFloat(amount) })
    setText('')
    setAmount('')
    setErrors({})
    textInputRef.current?.focus()
  }

  return (
    <section className="form-section" aria-label="Add transaction">
      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="text">Description</label>
          <input
            id="text"
            ref={textInputRef}
            type="text"
            placeholder="e.g. Groceries, Salary"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-invalid={Boolean(errors.text)}
            aria-describedby={errors.text ? 'text-error' : undefined}
          />
          {errors.text && (
            <span id="text-error" className="form-error">
              {errors.text}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="Use − for expense, e.g. -25 or 500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
          {errors.amount && (
            <span id="amount-error" className="form-error">
              {errors.amount}
            </span>
          )}
        </div>

        <button type="submit" className="btn-add">
          Add Transaction
        </button>
      </form>
    </section>
  )
}

export default TransactionForm