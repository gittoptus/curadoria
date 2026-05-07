'use client'

import { useMemo, useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { improvementItems } from '@/data/mock-data'

type BacklogItem = (typeof improvementItems)[number] & {
  id: string
  createdAt: string
  dueDate: string
  leadTime: number
  audit: string[]
}

const columns = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'todo', label: 'A fazer' },
  { key: 'doing', label: 'Em andamento' },
  { key: 'review', label: 'Em revisão' },
  { key: 'done', label: 'Concluído' },
]

const enrichedItems: BacklogItem[] = improvementItems.map((item, index) => ({
  ...item,
  id: `MEL-${String(index + 1).padStart(3, '0')}`,
  createdAt: ['2026-05-01', '2026-05-02', '2026-05-03', '2026-05-04'][index] ?? '2026-05-05',
  dueDate: ['2026-05-12', '2026-05-10', '2026-05-15', '2026-05-18'][index] ?? '2026-05-20',
  leadTime: [5, 3, 7, 2][index] ?? 4,
  audit: ['Criado a partir da curadoria', `Responsável definido: ${item.owner}`, `Prioridade classificada como ${item.priority}`],
}))

enrichedItems.push({
  id: 'MEL-005',
  title: 'Revisar critérios de precisão financeira',
  source: 'Critérios',
  impact: 'high',
  effort: 'medium',
  priority: 'high',
  status: 'done',
  owner: 'Operações',
  createdAt: '2026-04-28',
  dueDate: '2026-05-04',
  leadTime: 6,
  audit: ['Criado manualmente', 'Aprovado por Operações', 'Concluído e validado'],
})

export default function BacklogPage() {
  const [items, setItems] = useState<BacklogItem[]>(enrichedItems)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<BacklogItem | null>(null)

  const sources = useMemo(() => Array.from(new Set(items.map((item) => item.source))), [items])
  const filteredItems = useMemo(() => items.filter((item) => (priorityFilter === 'all' || item.priority === priorityFilter) && (sourceFilter === 'all' || item.source === sourceFilter)), [items, priorityFilter, sourceFilter])
  const averageLeadTime = useMemo(() => {
    const doneItems = items.filter((item) => item.status === 'done')
    if (!doneItems.length) return 0
    return Math.round(doneItems.reduce((sum, item) => sum + item.leadTime, 0) / doneItems.length)
  }, [items])

  function moveItem(id: string, status: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status, audit: [...item.audit, `Movido para ${status}`] } : item))
  }

  return (
    <PageShell title="Backlog" description="Gestão visual das melhorias identificadas durante a curadoria operacional.">
      <div className="mb-6 grid gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Itens ativos</p><p className="mt-2 text-3xl font-semibold text-slate-950">{items.filter((item) => item.status !== 'done').length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Concluídos</p><p className="mt-2 text-3xl font-semibold text-emerald-600">{items.filter((item) => item.status === 'done').length}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Lead time médio</p><p className="mt-2 text-3xl font-semibold text-[#b15cdc]">{averageLeadTime}d</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Aguardando aprovação</p><p className="mt-2 text-3xl font-semibold text-amber-600">{items.filter((item) => item.status === 'review').length}</p></div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr,1fr,2fr]">
        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"><option value="all">Todas as prioridades</option><option value="urgent">Urgente</option><option value="high">Alta</option><option value="medium">Média</option><option value="low">Baixa</option></select>
        <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"><option value="all">Todas as origens</option>{sources.map((source) => <option key={source} value={source}>{source}</option>)}</select>
        <div className="rounded-xl border border-[#b15cdc]/20 bg-[#b15cdc]/5 px-4 py-2.5 text-sm font-medium text-[#b15cdc]">Drag and drop simulado: use o seletor de status dentro de cada card para mover o item.</div>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Matriz impacto x esforço</h2>
        <p className="text-sm text-slate-500">Distribuição dos itens para priorização executiva.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {['low', 'medium', 'high'].map((effort) => (
            <div key={effort} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold uppercase text-slate-600">Esforço {effort}</p>
              <div className="space-y-2">{items.filter((item) => item.effort === effort).map((item) => <div key={item.id} className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200">{item.impact} impacto • {item.title}</div>)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-5">
        {columns.map((column) => {
          const columnItems = filteredItems.filter((item) => item.status === column.key)
          return (
            <div key={column.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{column.label}</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{columnItems.length}</span></div>
              <div className="space-y-4">
                {columnItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#b15cdc]/30 hover:bg-[#b15cdc]/5">
                    <div className="mb-3 flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-400">{item.id}</p><h3 className="mt-1 text-sm font-semibold leading-snug text-slate-950">{item.title}</h3></div><StatusBadge status={item.status} /></div>
                    <p className="text-xs leading-relaxed text-slate-500">{item.source}</p>
                    <div className="mt-4 flex items-center justify-between"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b15cdc]/10 text-xs font-bold text-[#b15cdc] ring-1 ring-[#b15cdc]/20">{item.owner.slice(0, 2).toUpperCase()}</div><span className="text-xs font-medium text-slate-600">{item.owner}</span></div><button onClick={() => setSelectedItem(item)} className="text-xs font-semibold text-[#b15cdc]">Detalhes</button></div>
                    <div className="mt-4 grid gap-2 text-xs text-slate-500"><span>Criado: {item.createdAt}</span><span>Prazo: {item.dueDate}</span><span>Lead time: {item.leadTime} dias</span></div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-rose-50 px-2 py-1 font-semibold text-rose-700 ring-1 ring-rose-200">{item.priority}</span><span className="rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-700 ring-1 ring-blue-200">{item.impact}</span><span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600 ring-1 ring-slate-200">{item.effort}</span></div>
                    <select value={item.status} onChange={(event) => moveItem(item.id, event.target.value)} className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-[#b15cdc]">{columns.map((status) => <option key={status.key} value={status.key}>{status.label}</option>)}</select>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {selectedItem && <div className="mt-6 rounded-2xl border border-[#b15cdc]/20 bg-[#b15cdc]/5 p-6 shadow-sm"><div className="mb-4 flex items-start justify-between gap-4"><div><h2 className="text-lg font-semibold text-slate-950">Detalhe do card</h2><p className="text-sm text-slate-500">{selectedItem.id} • {selectedItem.title}</p></div><button onClick={() => setSelectedItem(null)} className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">Fechar</button></div><div className="grid gap-4 lg:grid-cols-3"><div className="rounded-xl border border-slate-200 bg-white p-4"><p className="mb-2 text-sm font-semibold text-slate-950">Workflow de aprovação</p><div className="space-y-2 text-sm text-slate-600"><p>1. Curadoria identificou melhoria</p><p>2. Owner analisa impacto</p><p>3. Revisão valida solução</p><p>4. Item segue para concluído</p></div></div><div className="rounded-xl border border-slate-200 bg-white p-4"><p className="mb-2 text-sm font-semibold text-slate-950">Auditoria de mudanças</p><div className="space-y-2 text-sm text-slate-600">{selectedItem.audit.map((entry) => <p key={entry}>• {entry}</p>)}</div></div><div className="rounded-xl border border-slate-200 bg-white p-4"><p className="mb-2 text-sm font-semibold text-slate-950">Métricas</p><div className="space-y-2 text-sm text-slate-600"><p>Impacto: {selectedItem.impact}</p><p>Esforço: {selectedItem.effort}</p><p>Prioridade: {selectedItem.priority}</p><p>Lead time: {selectedItem.leadTime} dias</p></div></div></div></div>}
    </PageShell>
  )
}
