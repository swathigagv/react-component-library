import { formatCurrency } from '../format.js'

function Summary({ balance, income, expense }) {
  return (
    <section className="summary" aria-label="Balance summary">
      <div className="summary__balance">
        <span className="summary__label">Balance</span>
        <span className={`summary__amount ${balance < 0 ? 'summary__amount--negative' : ''}`}>
          {formatCurrency(balance)}
        </span>
      </div>

      <div className="summary__row">
        <div className="summary__card summary__card--income">
          <span className="summary__label">Income</span>
          <span className="summary__amount">{formatCurrency(income)}</span>
        </div>
        <div className="summary__card summary__card--expense">
          <span className="summary__label">Expense</span>
          <span className="summary__amount">{formatCurrency(expense)}</span>
        </div>
      </div>
    </section>
  )
}

export default Summary