import { PageShell } from '@/components/layout/page-shell'
import { improvementItems } from '@/data/mock-data'

const columns = ['backlog', 'todo', 'doing', 'review']

export default function BacklogPage() {
  return (
    <PageShell
      title="Backlog"
      description="Gestão visual das melhorias identificadas durante a curadoria operacional."
    >
      <div className="grid gap-5 xl:grid-cols-4">
        {columns.map((column) => {
          const items = improvementItems.filter(
            (item) => item.status === column
          )

          return (
            <div
              key={column}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
                  {column}
                </h2>

                <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">
                  {items.length}
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
                  >
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {item.source}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-rose-500/10 px-2 py-1 text-rose-100">
                        {item.priority}
                      </span>

                      <span className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-100">
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </PageShell>
  )
}
