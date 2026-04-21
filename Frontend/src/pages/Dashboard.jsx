import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExpenseChart } from '../components/ExpenseChart'
import { StatCard } from '../components/StatCard'
import { TransactionForm } from '../components/TransactionForm'
import { TransactionList } from '../components/TransactionList'
import { transactionService } from '../services/transactionService'
import { formatCurrency } from '../utils/format'

function summarize(transactions) {
  let income = 0
  let expense = 0
  for (const t of transactions) {
    if (t.type === 'income') income += Number(t.amount) || 0
    else expense += Number(t.amount) || 0
  }
  return {
    income,
    expense,
    balance: income - expense,
  }
}

export function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const loadTransactions = useCallback(async () => {
    setListError('')
    setLoading(true)
    try {
      const { data } = await transactionService.getAll()
      setTransactions(Array.isArray(data) ? data : [])
    } catch (e) {
      setListError(e.message || 'Failed to load transactions.')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      loadTransactions()
    }, 0)
    return () => window.clearTimeout(id)
  }, [loadTransactions])

  const { income, expense, balance } = useMemo(
    () => summarize(transactions),
    [transactions]
  )

  const handleCreate = async (payload) => {
    setFormError('')
    setSubmitting(true)
    try {
      await transactionService.create(payload)
      await loadTransactions()
    } catch (e) {
      setFormError(e.message || 'Could not save transaction.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction permanently?')) return
    setDeletingId(id)
    try {
      await transactionService.remove(id)
      await loadTransactions()
    } catch (e) {
      setListError(e.message || 'Could not delete transaction.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {listError ? (
        <div
          className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
          role="alert"
        >
          {listError}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total balance"
          value={formatCurrency(balance)}
          subtitle="Income minus expenses"
          gradientClass="from-indigo-500/25 to-violet-500/15"
          borderClass="border-indigo-500/25"
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-3h6m-6-6h6"
              />
            </svg>
          }
        />
        <StatCard
          title="Income"
          value={formatCurrency(income)}
          subtitle="All credited amounts"
          gradientClass="from-emerald-500/20 to-teal-500/10"
          borderClass="border-emerald-500/20"
          icon={
            <svg
              className="h-6 w-6 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.147-2.147a1 1 0 011.415 0l3.13 3.13a1 1 0 010 1.415l-2.147 2.147a11.95 11.95 0 01-5.52 5.814L9 18.75l-6.75-6.75z"
              />
            </svg>
          }
        />
        <StatCard
          title="Expenses"
          value={formatCurrency(expense)}
          subtitle="All debited amounts"
          gradientClass="from-rose-500/20 to-orange-500/10"
          borderClass="border-rose-500/20"
          icon={
            <svg
              className="h-6 w-6 text-rose-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.012 5.506l2.147 2.147a1 1 0 010 1.415l-3.13 3.13a1 1 0 01-1.415 0l-2.147-2.147A11.95 11.95 0 018.25 9.75L2.25 6z"
              />
            </svg>
          }
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {formError ? (
            <div
              className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
              role="alert"
            >
              {formError}
            </div>
          ) : null}
          <TransactionForm onSubmit={handleCreate} submitting={submitting} />
        </div>
        <div className="lg:col-span-2">
          <ExpenseChart incomeTotal={income} expenseTotal={expense} />
        </div>
      </div>

      <TransactionList
        transactions={transactions}
        loading={loading}
        deletingId={deletingId}
        onDelete={handleDelete}
      />
    </div>
  )
}
