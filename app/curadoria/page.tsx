import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { interactions } from '@/data/mock-data'

export default function CuradoriaPage() {
  const pendingItems = interactions.filter((item) => item.status !== 'approved')

  return (
    <PageShell
      title="Curadoria"
      description="Revisão operacional e validação humana das respostas geradas pela IA."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr,1.1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Interações pendentes
          </h2>

          <div className="space-y-4">
            {pendingItems.map((interaction) => (
              <div
                key={interaction.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
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
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Painel de revisão
          </h2>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pergunta do usuário
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Como solicitar férias?
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Resposta da IA
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Você pode solicitar férias pelo portal interno, porém a resposta não citou a regra de antecedência.
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contexto operacional
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Dúvida operacional de colaborador.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
                Aprovar
              </button>

              <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
                Parcial
              </button>

              <button className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700">
                Reprovar
              </button>

              <button className="rounded-xl border border-[#b15cdc]/20 bg-[#b15cdc]/10 px-4 py-2 text-sm font-semibold text-[#b15cdc] transition hover:bg-[#b15cdc]/15">
                Criar melhoria
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
