import { formatCurrency, formatDate } from '../utils/format'

export function TransactionList({
  transactions,
  loading,
  deletingId,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40">
        <p className="text-sm text-slate-500">Loading transactions…</p>
      </div>
    )
  }

  if (!transactions.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/30 p-12 text-center">
        <p className="text-sm font-medium text-slate-300">No transactions yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Add your first income or expense using the form above.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="border-b border-white/5 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Recent activity</h2>
        <p className="text-sm text-slate-500">
          Full history with quick actions.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Note</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium text-right"> </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="transition-colors hover:bg-white/[0.03]"
              >
                <td className="whitespace-nowrap px-6 py-4 text-slate-300">
                  {formatDate(t.date)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      t.type === 'income'
                        ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30'
                    }`}
                  >
                    {t.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300">{t.category}</td>
                <td className="max-w-[200px] truncate px-6 py-4 text-slate-500">
                  {t.description || '—'}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 text-right font-semibold tabular-nums ${
                    t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {t.type === 'income' ? '+' : '−'}
                  {formatCurrency(t.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(t._id)}
                    disabled={deletingId === t._id}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-200 disabled:opacity-50"
                  >
                    {deletingId === t._id ? '…' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
