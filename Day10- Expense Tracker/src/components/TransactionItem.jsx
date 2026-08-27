import { formatCurrency, formatDate } from '../format.js'

function TransactionItem({ transaction, onDelete }) {
  const isExpense = transaction.amount < 0

  return (
    <li className={isExpense ? 'expense' : 'income'}>
      <div className="transaction-list__main">
        <span className="transaction-list__text">{transaction.text}</span>
        <span className="transaction-list__date">{formatDate(transaction.date)}</span>
      </div>
      <span className="transaction-list__amount">
        {isExpense ? '-' : '+'}
        {formatCurrency(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(transaction.id)}
        aria-label={`Delete ${transaction.text}`}
      >
        ✕
      </button>
    </li>
  )
}

export default TransactionItem