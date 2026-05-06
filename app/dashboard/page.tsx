import { AlertTriangle, Bot, CheckCircle2, GaugeCircle, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { interactions, kpis } from '@/data/mock-data'
import { StatusBadge } from '@/components/shared/status-badge'

export default function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      description="Visão executiva da operação de curadoria e automação de IA."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          title="Interações analisadas"
          value={kpis.interactions}
          icon={<Bot className="h-5 w-5" />}
        />

        <KpiCard
          title="Taxa de aprovação"
          value={kpis.approvalRate}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />

        <KpiCard
          title="Pendências"
          value={kpis.pendingReviews}
          icon={<AlertTriangle className="h-5 w-5" />}
        />

        <KpiCard
          title="Falhas em automações"
          value={kpis.failedAutomations}
          icon={<Sparkles className="h-5 w-5" />}
        />

        <KpiCard
          title="Score médio"
          value={kpis.averageScore}
          icon={<GaugeCircle className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr,1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Últimas interações analisadas
              </h2>
              <p className="text-sm text-slate-500">
                Interações recentes processadas pela operação.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {interaction.source}
                    </p>
                    <p className="text-xs text-slate-400">
                      {interaction.id}
                    </p>
                  </div>

                  <StatusBadge status={interaction.status} />
                </div>

                <p className="text-sm text-slate-600">
                  {interaction.userInput}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Insights operacionais
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-700">
                A taxa de aprovação cresceu 6,2% nos últimos 30 dias.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-700">
                3 automações apresentaram falha crítica nas últimas execuções.
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-700">
                O módulo financeiro concentra o maior volume de interações.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
