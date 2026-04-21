import { useState } from 'react'

const categories = [
  'Salary',
  'Freelance',
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Uncategorized',
]

export function TransactionForm({ onSubmit, submitting }) {
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Uncategorized')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  )
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const num = parseFloat(amount)
    if (Number.isNaN(num) || num <= 0) return
    await onSubmit({
      type,
      category,
      amount: num,
      date,
      description: description.trim() || undefined,
    })
    setAmount('')
    setDescription('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 shadow-xl shadow-black/20 backdrop-blur-sm"
    >
      <h2 className="text-lg font-semibold text-white">Add transaction</h2>
      <p className="mt-1 text-sm text-slate-500">
        Record income or spending in a few seconds.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block sm:col-span-2 lg:col-span-1">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Type
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0a0a12] px-4 py-2.5 text-sm text-white outline-none ring-indigo-500/0 transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Category
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0a0a12] px-4 py-2.5 text-sm text-white outline-none ring-indigo-500/0 transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Amount
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-white/10 bg-[#0a0a12] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Date
          </span>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0a0a12] px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Note (optional)
          </span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Weekly groceries"
            className="w-full rounded-xl border border-white/10 bg-[#0a0a12] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30"
          />
        </label>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Save transaction'}
        </button>
      </div>
    </form>
  )
}
