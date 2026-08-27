import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { useLocalStorage } from './useLocalStorage.js'
import Summary from './components/Summary.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'
import UndoToast from './components/UndoToast.jsx'

const UNDO_WINDOW_MS = 4000

function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', [])
  const [filter, setFilter] = useState('all')
  const [pendingDelete, setPendingDelete] = useState(null) // { transaction, timeoutId }
  const undoTimeoutRef = useRef(null)

  const addTransaction = ({ text, amount }) => {
    const transaction = { id: Date.now(), text, amount, date: Date.now() }
    setTransactions((prev) => [transaction, ...prev])
  }

  const deleteTransaction = (id) => {
    const target = transactions.find((t) => t.id === id)
    if (!target) return

    setTransactions((prev) => prev.filter((t) => t.id !== id))

    clearTimeout(undoTimeoutRef.current)
    undoTimeoutRef.current = setTimeout(() => setPendingDelete(null), UNDO_WINDOW_MS)
    setPendingDelete(target)
  }

  const undoDelete = () => {
    if (!pendingDelete) return
    setTransactions((prev) =>
      [...prev, pendingDelete].sort((a, b) => b.date - a.date)
    )
    clearTimeout(undoTimeoutRef.current)
    setPendingDelete(null)
  }

  const clearAll = () => {
    if (transactions.length === 0) return
    const confirmed = window.confirm('Delete all transactions? This can\'t be undone.')
    if (confirmed) setTransactions([])
  }

  useEffect(() => () => clearTimeout(undoTimeoutRef.current), [])

  // Totals are always computed from the full (unfiltered) list — the
  // active filter only affects which rows are shown, not the math.
  const { balance, income, expense } = useMemo(() => {
    const amounts = transactions.map((t) => t.amount)
    const totalIncome = amounts.filter((v) => v > 0).reduce((sum, v) => sum + v, 0)
    const totalExpense = amounts.filter((v) => v < 0).reduce((sum, v) => sum + v, 0)
    return {
      balance: totalIncome + totalExpense,
      income: totalIncome,
      expense: Math.abs(totalExpense),
    }
  }, [transactions])

  const visibleTransactions = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => b.date - a.date)
    if (filter === 'income') return sorted.filter((t) => t.amount > 0)
    if (filter === 'expense') return sorted.filter((t) => t.amount < 0)
    return sorted
  }, [transactions, filter])

  return (
    <main className="app">
      <header className="app__header">
        <span className="app__eyebrow">React + Vite</span>
        <h1>Expense Tracker</h1>
        <p className="app__subtitle">Track what comes in, what goes out, and what's left.</p>
      </header>

      <Summary balance={balance} income={income} expense={expense} />
      <TransactionForm onAdd={addTransaction} />
      <TransactionList
        transactions={visibleTransactions}
        filter={filter}
        onFilterChange={setFilter}
        onDelete={deleteTransaction}
        onClearAll={clearAll}
      />

      {pendingDelete && <UndoToast text={pendingDelete.text} onUndo={undoDelete} />}
    </main>
  )
}

export default App