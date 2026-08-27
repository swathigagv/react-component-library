import TransactionItem from './TransactionItem.jsx'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expenses' },
]

function TransactionList({ transactions, filter, onFilterChange, onDelete, onClearAll }) {
  return (
    <section className="history" aria-label="Transaction history">
      <div className="history__head">
        <h2>History</h2>
        {transactions.length > 0 && (
          <button className="clear-btn" onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>

      <div className="filters" role="group" aria-label="Filter transactions">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filters__chip ${filter === f.value ? 'filters__chip--active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {transactions.length === 0 ? (
        <p className="empty-state">
          {filter === 'all'
            ? 'No transactions yet — add your first one above.'
            : `No ${filter} transactions yet.`}
        </p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TransactionList