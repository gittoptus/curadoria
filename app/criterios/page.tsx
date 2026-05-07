'use client'

import { useMemo, useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { curationCriteria } from '@/data/mock-data'
import { ui } from '@/lib/theme'

type Criterion = {
  name: string
  description: string
  weight: number
  active: boolean
  category: string
  required: boolean
  dynamicWeight: boolean
  aiScore: number
}

const initialCriteria: Criterion[] = curationCriteria.map((criterion, index) => ({
  ...criterion,
  category: ['Qualidade', 'Conformidade', 'Experiência'][index % 3],
  required: index < 3,
  dynamicWeight: index % 2 === 0,
  aiScore: [4.7, 4.4, 4.1, 3.8, 4.5, 4.9][index] ?? 4,
}))

export default function CriteriosPage() {
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria)
  const [message, setMessage] = useState('')

  const totalWeight = useMemo(
    () => criteria.filter((criterion) => criterion.active).reduce((sum, criterion) => sum + criterion.weight, 0),
    [criteria]
  )

  const weightedScore = useMemo(() => {
    const activeCriteria = criteria.filter((criterion) => criterion.active)
    const weightedTotal = activeCriteria.reduce((sum, criterion) => sum + criterion.aiScore * criterion.weight, 0)
    const weightBase = activeCriteria.reduce((sum, criterion) => sum + criterion.weight, 0)
    return weightBase ? (weightedTotal / weightBase).toFixed(1) : '0.0'
  }, [criteria])

  function updateCriterion(index: number, patch: Partial<Criterion>) {
    setCriteria((current) => current.map((criterion, currentIndex) => currentIndex === index ? { ...criterion, ...patch } : criterion))
  }

  function addCriterion() {
    setCriteria((current) => [
      ...current,
      {
        name: `Novo critério ${current.length + 1}`,
        description: 'Descreva o objetivo operacional deste critério.',
        weight: 5,
        active: true,
        category: 'Qualidade',
        required: false,
        dynamicWeight: false,
        aiScore: 3.5,
      },
    ])
    setMessage('Novo critério adicionado em modo simulado.')
  }

  return (
    <PageShell
      title="Critérios"
      description="Critérios utilizados para avaliação da qualidade das respostas geradas pela IA."
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-4">
        <div className={ui.card}>
          <p className="text-sm font-medium text-slate-500">Soma dos pesos ativos</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{totalWeight}%</p>
        </div>

        <div className={ui.card}>
          <p className="text-sm font-medium text-slate-500">Score final ponderado</p>
          <p className="mt-2 text-3xl font-semibold text-[#b15cdc]">{weightedScore}/5</p>
        </div>

        <div className={ui.card}>
          <p className="text-sm font-medium text-slate-500">Critérios obrigatórios</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{criteria.filter((criterion) => criterion.required).length}</p>
        </div>

        <div className={ui.card}>
          <p className="text-sm font-medium text-slate-500">Avaliação automática</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">Ativa</p>
        </div>
      </div>

      {totalWeight > 100 && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          A soma dos pesos ativos ultrapassou 100%. Revise os critérios antes de salvar a matriz de qualidade.
        </div>
      )}

      {message && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Matriz de qualidade</h2>
          <p className="text-sm text-slate-500">Configure peso, categoria, obrigatoriedade e avaliação automática por IA.</p>
        </div>

        <button onClick={addCriterion} className="rounded-xl bg-[#b15cdc] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#9f4cc8]">
          Novo critério
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {criteria.map((criterion, index) => (
          <div key={`${criterion.name}-${index}`} className={ui.card}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <input
                  value={criterion.name}
                  onChange={(event) => updateCriterion(index, { name: event.target.value })}
                  className="w-full rounded-lg border border-transparent bg-transparent text-lg font-semibold text-slate-950 outline-none focus:border-[#b15cdc]/30 focus:bg-[#b15cdc]/5"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <StatusBadge status={criterion.active ? 'active' : 'paused'} />
                  {criterion.required && <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">Obrigatório</span>}
                  {criterion.dynamicWeight && <span className="rounded-full bg-[#b15cdc]/10 px-3 py-1 text-xs font-semibold text-[#b15cdc] ring-1 ring-[#b15cdc]/20">Peso dinâmico</span>}
                </div>
              </div>

              <button
                onClick={() => updateCriterion(index, { active: !criterion.active })}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#b15cdc]/30 hover:text-[#b15cdc]"
              >
                {criterion.active ? 'Inativar' : 'Ativar'}
              </button>
            </div>

            <textarea
              value={criterion.description}
              onChange={(event) => updateCriterion(index, { description: event.target.value })}
              className="min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Categoria</span>
                <select
                  value={criterion.category}
                  onChange={(event) => updateCriterion(index, { category: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
                >
                  <option>Qualidade</option>
                  <option>Conformidade</option>
                  <option>Experiência</option>
                  <option>Segurança</option>
                  <option>Negócio</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Peso</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={criterion.weight}
                  onChange={(event) => updateCriterion(index, { weight: Number(event.target.value) })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
                />
              </label>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-950">Avaliação automática por IA</span>
                <span className="text-sm font-semibold text-[#b15cdc]">{criterion.aiScore}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={criterion.aiScore}
                onChange={(event) => updateCriterion(index, { aiScore: Number(event.target.value) })}
                className="w-full accent-[#b15cdc]"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={criterion.required}
                  onChange={(event) => updateCriterion(index, { required: event.target.checked })}
                  className="accent-[#b15cdc]"
                />
                Obrigatório
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={criterion.dynamicWeight}
                  onChange={(event) => updateCriterion(index, { dynamicWeight: event.target.checked })}
                  className="accent-[#b15cdc]"
                />
                Peso dinâmico
              </label>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
