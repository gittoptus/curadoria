import { AlertTriangle, Bot, CheckCircle2, GaugeCircle, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { interactions, kpis } from '@/data/mock-data'

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
          icon={<Bot className="h-5 w-5 text-blue-300" />}
        />

        <KpiCard
          title="Taxa de aprovação"
          value={kpis.approvalRate}
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-300" />}
        />

        <KpiCard
          title="Pendências"
          value={kpis.pendingReviews}
          icon={<AlertTriangle className="h-5 w-5 text-amber-300" />}
        />

        <KpiCard
          title="Falhas em automações"
          value={kpis.failedAutomations}
          icon={<Sparkles className="h-5 w-5 text-rose-300" />}
        />

        <KpiCard
          title="Score médio"
          value={kpis.averageScore}
          icon={<GaugeCircle className="h-5 w-5 text-cyan-300" />}
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr,1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Últimas interações analisadas
              </h2>
              <p className="text-sm text-slate-400">
                Interações recentes processadas pela operação.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {interaction.source}
                    </p>
                    <p className="text-xs text-slate-500">
                      {interaction.id}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200 ring-1 ring-blue-400/20">
                    {interaction.status}
                  </span>
                </div>

                <p className="text-sm text-slate-300">
                  {interaction.userInput}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Insights operacionais
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm font-medium text-emerald-200">
                A taxa de aprovação cresceu 6,2% nos últimos 30 dias.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="text-sm font-medium text-amber-100">
                3 automações apresentaram falha crítica nas últimas execuções.
              </p>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-sm font-medium text-blue-100">
                O módulo financeiro concentra o maior volume de interações.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
