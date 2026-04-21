import { useAuth } from '../context/useAuth'

export function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/5 bg-[#07070c]/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-400/90">
            Overview
          </p>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-white">{user?.username}</p>
          <p className="max-w-[200px] truncate text-xs text-slate-500">
            {user?.email}
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200"
        >
          Log out
        </button>
      </div>
    </header>
  )
}
