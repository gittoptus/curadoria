'use client'

import { useMemo, useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { curationCriteria, interactions } from '@/data/mock-data'

type ReviewStatus = 'approved' | 'partial' | 'rejected'

export default function CuradoriaPage() {
  const reviewableItems = interactions.filter((item) => item.status !== 'approved')
  const [selectedId, setSelectedId] = useState(reviewableItems[0]?.id)
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>('partial')
  const [comment, setComment] = useState('')
  const [idealAnswer, setIdealAnswer] = useState('')
  const [savedMessage, setSavedMessage] = useState('')
  const [backlogCreated, setBacklogCreated] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(curationCriteria.map((criterion) => [criterion.name, 3]))
  )

  const selectedInteraction = useMemo(
    () => interactions.find((item) => item.id === selectedId) ?? reviewableItems[0],
    [selectedId, reviewableItems]
  )

  const averageScore = useMemo(() => {
    const values = Object.values(scores)
    return values.length
      ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)
      : '0.0'
  }, [scores])

  function saveReview() {
    setSavedMessage(`Avaliação salva como ${reviewStatus}. Score médio: ${averageScore}/5.`)
  }

  function createBacklogItem() {
    setBacklogCreated(true)
    setSavedMessage('Melhoria criada no backlog a partir desta curadoria.')
  }

  if (!selectedInteraction) {
    return (
      <PageShell title="Curadoria" description="Revisão operacional e validação humana das respostas geradas pela IA.">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Nenhuma interação disponível para curadoria.</p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell
      title="Curadoria"
      description="Revisão operacional e validação humana das respostas geradas pela IA."
    >
      {savedMessage && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {savedMessage}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.3fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Amostra de interações</h2>
              <p className="mt-1 text-sm text-slate-500">
                Seleção automática priorizando itens pendentes, parciais e reprovados.
              </p>
            </div>
            <span className="rounded-full bg-[#b15cdc]/10 px-3 py-1 text-xs font-semibold text-[#b15cdc] ring-1 ring-[#b15cdc]/20">
              {reviewableItems.length} itens
            </span>
          </div>

          <div className="space-y-4">
            {reviewableItems.map((interaction) => {
              const active = interaction.id === selectedInteraction.id

              return (
                <button
                  key={interaction.id}
                  onClick={() => {
                    setSelectedId(interaction.id)
                    setSavedMessage('')
                    setBacklogCreated(false)
                  }}
                  className={
                    active
                      ? 'w-full rounded-xl border border-[#b15cdc]/40 bg-[#b15cdc]/5 p-4 text-left shadow-sm'
                      : 'w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-[#b15cdc]/30 hover:bg-[#b15cdc]/5'
                  }
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{interaction.source}</p>
                      <p className="text-xs text-slate-400">{interaction.id}</p>
                    </div>
                    <StatusBadge status={interaction.status} />
                  </div>
                  <p className="line-clamp-2 text-sm text-slate-600">{interaction.userInput}</p>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Painel de revisão</h2>
              <p className="mt-1 text-sm text-slate-500">
                Valide qualidade, registre feedback e gere melhoria quando necessário.
              </p>
            </div>
            <StatusBadge status={reviewStatus} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Pergunta do usuário</p>
              <div className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {selectedInteraction.userInput}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Resposta original da IA</p>
              <div className="min-h-28 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {selectedInteraction.aiOutput}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Contexto operacional</p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {selectedInteraction.context}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#b15cdc]/20 bg-[#b15cdc]/5 p-4">
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-950">Sugestão de avaliação feita por IA</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#b15cdc] ring-1 ring-[#b15cdc]/20">
                mock IA
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              A resposta parece {selectedInteraction.status === 'rejected' ? 'insuficiente' : 'parcialmente aderente'} ao contexto. Recomenda-se revisar precisão, completude e aderência às regras de negócio antes da aprovação final.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Comentário do curador</label>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Registre o motivo da avaliação e pontos de ajuste..."
                className="min-h-32 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Resposta ideal</label>
              <textarea
                value={idealAnswer}
                onChange={(event) => setIdealAnswer(event.target.value)}
                placeholder="Escreva a resposta ideal esperada para treinar/refinar a IA..."
                className="min-h-32 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">Critérios de avaliação</p>
              <span className="text-sm font-semibold text-[#b15cdc]">Score médio: {averageScore}/5</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {curationCriteria.map((criterion) => (
                <label key={criterion.name} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{criterion.name}</span>
                    <span className="text-xs font-semibold text-slate-500">Peso {criterion.weight}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores[criterion.name] ?? 3}
                    onChange={(event) => setScores({ ...scores, [criterion.name]: Number(event.target.value) })}
                    className="w-full accent-[#b15cdc]"
                  />
                  <div className="mt-2 text-xs font-semibold text-slate-500">
                    Nota: {scores[criterion.name] ?? 3}/5
                  </div>
                </label>
              ))}
            </div>
          </div>

          {idealAnswer && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-semibold text-blue-800">Comparação: resposta original vs. resposta ideal</p>
              <p className="text-sm leading-relaxed text-blue-700">
                A resposta ideal será usada como referência para ajuste de prompt, melhoria de base de conhecimento e validação futura da automação.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setReviewStatus('approved')} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">Aprovar</button>
            <button onClick={() => setReviewStatus('partial')} className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600">Parcial</button>
            <button onClick={() => setReviewStatus('rejected')} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700">Reprovar</button>
            <button onClick={saveReview} className="rounded-xl bg-[#b15cdc] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9f4cc8]">Salvar avaliação</button>
            <button onClick={createBacklogItem} className="rounded-xl border border-[#b15cdc]/20 bg-[#b15cdc]/10 px-4 py-2 text-sm font-semibold text-[#b15cdc] transition hover:bg-[#b15cdc]/15">
              {backlogCreated ? 'Melhoria criada' : 'Criar melhoria'}
            </button>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
