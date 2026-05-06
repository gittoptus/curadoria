import { PageShell } from '@/components/layout/page-shell'
import { curationCriteria } from '@/data/mock-data'

export default function CriteriosPage() {
  return (
    <PageShell
      title="Critérios"
      description="Critérios utilizados para avaliação da qualidade das respostas geradas pela IA."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {curationCriteria.map((criterion) => (
          <div
            key={criterion.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {criterion.name}
              </h2>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100 ring-1 ring-emerald-500/20">
                {criterion.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              {criterion.description}
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3">
              <span className="text-sm text-slate-400">Peso do critério</span>
              <span className="text-sm font-semibold text-white">
                {criterion.weight}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
