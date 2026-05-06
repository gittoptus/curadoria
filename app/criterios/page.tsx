import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { curationCriteria } from '@/data/mock-data'
import { ui } from '@/lib/theme'

export default function CriteriosPage() {
  return (
    <PageShell
      title="Critérios"
      description="Critérios utilizados para avaliação da qualidade das respostas geradas pela IA."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {curationCriteria.map((criterion) => (
          <div key={criterion.name} className={ui.card}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className={ui.title}>{criterion.name}</h2>
              <StatusBadge status={criterion.active ? 'active' : 'paused'} />
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {criterion.description}
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-500">
                Peso do critério
              </span>
              <span className="text-sm font-semibold text-slate-950">
                {criterion.weight}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
