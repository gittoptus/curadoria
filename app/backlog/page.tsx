import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { improvementItems } from '@/data/mock-data'

const columns = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'todo', label: 'A fazer' },
  { key: 'doing', label: 'Em andamento' },
  { key: 'review', label: 'Em revisão' },
]

export default function BacklogPage() {
  return (
    <PageShell
      title="Backlog"
      description="Gestão visual das melhorias identificadas durante a curadoria operacional."
    >
      <div className="grid gap-5 xl:grid-cols-4">
        {columns.map((column) => {
          const items = improvementItems.filter(
            (item) => item.status === column.key
          )

          return (
            <div
              key={column.key}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  {column.label}
                </h2>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {items.length}
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#b15cdc]/30 hover:bg-[#b15cdc]/5"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold leading-snug text-slate-950">
                        {item.title}
                      </h3>
                      <StatusBadge status={item.status} />
                    </div>

                    <p className="text-xs leading-relaxed text-slate-500">
                      {item.source}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-rose-50 px-2 py-1 font-semibold text-rose-700 ring-1 ring-rose-200">
                        {item.priority}
                      </span>

                      <span className="rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-700 ring-1 ring-blue-200">
                        {item.impact}
                      </span>

                      <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600 ring-1 ring-slate-200">
                        {item.owner}
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
