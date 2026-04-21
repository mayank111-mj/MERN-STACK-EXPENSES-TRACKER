import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const COLORS = ['#34d399', '#fb7185']

export function ExpenseChart({ incomeTotal, expenseTotal }) {
  const data = [
    { name: 'Income', value: Math.max(incomeTotal, 0) },
    { name: 'Expenses', value: Math.max(expenseTotal, 0) },
  ]

  const hasData = incomeTotal > 0 || expenseTotal > 0

  if (!hasData) {
    return (
      <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center">
        <p className="text-sm font-medium text-slate-400">No chart data yet</p>
        <p className="mt-2 max-w-xs text-xs text-slate-600">
          Once you add transactions, this chart compares total income and
          expenses.
        </p>
      </div>
    )
  }

  return (
    <div className="h-[320px] rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
      <h2 className="text-lg font-semibold text-white">Income vs expenses</h2>
      <p className="text-sm text-slate-500">Share of total movement</p>
      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={88}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'USD',
                }).format(value)
              }
              contentStyle={{
                background: '#12121a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#e2e8f0',
              }}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => (
                <span className="text-slate-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
