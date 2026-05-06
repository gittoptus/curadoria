import { PageShell } from '@/components/layout/page-shell'
import { interactions } from '@/data/mock-data'

export default function CuradoriaPage() {
  const pendingItems = interactions.filter((item) => item.status !== 'approved')

  return (
    <PageShell
      title="Curadoria"
      description="Revisão operacional e validação humana das respostas geradas pela IA."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr,1.1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Interações pendentes
          </h2>

          <div className="space-y-4">
            {pendingItems.map((interaction) => (
              <div
                key={interaction.id}
                className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {interaction.source}
                    </p>
                    <p className="text-xs text-slate-500">
                      {interaction.id}
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-100 ring-1 ring-amber-500/20">
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
          <h2 className="mb-4 text-lg font-semibold text-white">
            Painel de revisão
          </h2>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Pergunta do usuário
              </p>
              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200">
                Como solicitar férias?
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Resposta da IA
              </p>
              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
                Você pode solicitar férias pelo portal interno, porém a resposta não citou a regra de antecedência.
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">
                Contexto operacional
              </p>
              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
                Dúvida operacional de colaborador.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400">
                Aprovar
              </button>

              <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-400">
                Parcial
              </button>

              <button className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-400">
                Reprovar
              </button>

              <button className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-500/20">
                Criar melhoria
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
