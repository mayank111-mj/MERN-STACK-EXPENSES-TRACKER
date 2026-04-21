export function Spinner({ className = 'h-8 w-8' }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-indigo-400/30 border-t-indigo-400 ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}
