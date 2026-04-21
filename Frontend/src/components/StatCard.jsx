export function StatCard({
  title,
  value,
  subtitle,
  icon,
  gradientClass = 'from-indigo-500/20 to-violet-500/10',
  borderClass = 'border-indigo-500/20',
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border ${borderClass} bg-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-indigo-500/10`}
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${gradientClass} blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {value}
          </p>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        {icon ? (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-indigo-300 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  )
}
