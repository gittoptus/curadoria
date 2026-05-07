import { AlertTriangle, Bot, CheckCircle2, GaugeCircle, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { DashboardRiskCard } from '@/components/dashboard/dashboard-risk-card'
import { DashboardTrendChart } from '@/components/dashboard/dashboard-trend-chart'
import { StatusBadge } from '@/components/shared/status-badge'
import { dashboardKpis, interactions, kpisBySource, operationalRisks } from '@/data/mock-data'

const icons = [
  <Bot key="bot" className="h-5 w-5" />,
  <CheckCircle2 key="check" className="h-5 w-5" />,
  <AlertTriangle key="alert" className="h-5 w-5" />,
  <Sparkles key="sparkles" className="h-5 w-5" />,
  <GaugeCircle key="gauge" className="h-5 w-5" />,
]

export default function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      description="Visão executiva da operação de curadoria e automação de IA."
    >
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {['7 dias', '30 dias', '90 dias', '12 meses'].map((period, index) => (
          <button
            key={period}
            className={
              index === 1
                ? 'rounded-full bg-[#b15cdc] px-4 py-2 text-sm font-semibold text-white shadow-sm'
                : 'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#b15cdc]/30 hover:text-[#b15cdc]'
            }
          >
            {period}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {dashboardKpis.map((kpi, index) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            description={`${kpi.trend} vs. período anterior`}
            icon={icons[index]}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr,1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Tendência de qualidade
              </h2>
              <p className="text-sm text-slate-500">
                Evolução do score médio e falhas operacionais por período.
              </p>
            </div>
          </div>

          <DashboardTrendChart />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Riscos operacionais
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Alertas que exigem acompanhamento prioritário.
          </p>

          <div className="mt-6 space-y-4">
            {operationalRisks.map((risk) => (
              <DashboardRiskCard
                key={risk.title}
                title={risk.title}
                description={risk.description}
                severity={risk.severity}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr,1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Performance por origem
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Volume e aprovação por assistente, canal ou automação.
          </p>

          <div className="mt-6 space-y-4">
            {kpisBySource.map((source) => (
              <div key={source.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950">{source.label}</p>
                  <span className="text-sm font-semibold text-[#b15cdc]">{source.approvalRate}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{source.interactions} interações</span>
                  <span>aprovação</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Últimas interações analisadas
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Interações recentes processadas pela operação.
          </p>

          <div className="mt-6 space-y-4">
            {interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
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
      </div>
    </PageShell>
  )
}
