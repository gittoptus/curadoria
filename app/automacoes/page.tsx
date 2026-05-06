import { PageShell } from '@/components/layout/page-shell'
import { SectionCard } from '@/components/shared/section-card'
import { StatusBadge } from '@/components/shared/status-badge'
import { automations } from '@/data/mock-data'

export default function AutomacoesPage() {
  return (
    <PageShell
      title="Automações"
      description="Monitoramento operacional das automações e fluxos baseados em IA."
    >
      <SectionCard
        title="Automações monitoradas"
        description="Execuções, gatilhos e indicadores operacionais das automações."
      >
        <div className="space-y-4">
          {automations.map((automation) => (
            <div
              key={automation.name}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-950">
                    {automation.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {automation.description}
                  </p>
                </div>

                <StatusBadge status={automation.status} />
              </div>

              <div className="grid gap-4 text-sm md:grid-cols-4">
                <div>
                  <p className="font-medium text-slate-500">Origem</p>
                  <p className="mt-1 font-semibold text-slate-950">{automation.source}</p>
                </div>

                <div>
                  <p className="font-medium text-slate-500">Gatilho</p>
                  <p className="mt-1 font-semibold text-slate-950">{automation.trigger}</p>
                </div>

                <div>
                  <p className="font-medium text-slate-500">Taxa de sucesso</p>
                  <p className="mt-1 font-semibold text-slate-950">{automation.successRate}</p>
                </div>

                <div>
                  <p className="font-medium text-slate-500">Última execução</p>
                  <p className="mt-1 font-semibold text-slate-950">{automation.lastRunAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
