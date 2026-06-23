export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-8" dir="rtl">
      {/* Hero Skeleton */}
      <div className="glass-card rounded-3xl p-6 md:p-10 border border-brand-border animate-pulse">
        <div className="h-8 w-64 bg-slate-800 rounded-xl mb-4"></div>
        <div className="h-12 w-96 max-w-full bg-slate-800 rounded-xl mb-3"></div>
        <div className="h-4 w-80 max-w-full bg-slate-800/60 rounded-lg"></div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="glass-card rounded-2xl p-5 border border-brand-border animate-pulse flex gap-4">
        <div className="h-10 w-32 bg-slate-800 rounded-xl"></div>
        <div className="h-10 w-24 bg-slate-800/60 rounded-xl"></div>
        <div className="h-10 w-24 bg-slate-800/60 rounded-xl"></div>
        <div className="h-10 flex-1 bg-slate-800/40 rounded-xl"></div>
      </div>

      {/* Match Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 border border-brand-border animate-pulse">
            <div className="h-3 w-32 bg-slate-800 rounded mb-6"></div>
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
                <div className="h-3 w-16 bg-slate-800/60 rounded"></div>
              </div>
              <div className="h-8 w-16 bg-slate-800/40 rounded-lg"></div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
                <div className="h-3 w-16 bg-slate-800/60 rounded"></div>
              </div>
            </div>
            <div className="h-3 w-24 bg-slate-800/40 rounded mt-4 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
