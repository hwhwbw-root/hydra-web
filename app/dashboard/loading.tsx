export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-5 shadow-diffuse"
          >
            <div className="flex items-start justify-between">
              <div className="skeleton h-4 w-24 rounded-md" />
              <div className="skeleton h-9 w-9 rounded-xl" />
            </div>
            <div className="skeleton mt-4 h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>

      {/* content panels */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-diffuse lg:col-span-2">
          <div className="skeleton h-4 w-36 rounded-md" />
          <div className="mt-5 flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="skeleton h-9 w-9 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton h-3 w-2/3 rounded" />
                  <div className="skeleton mt-2 h-2.5 w-1/3 rounded" />
                </div>
                <div className="skeleton h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-diffuse">
          <div className="skeleton h-4 w-24 rounded-md" />
          <div className="mt-5 flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-14 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
