'use client'

import { useMemo, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { interactions } from '@/data/mock-data'

type Interaction = (typeof interactions)[number]

const columnHelper = createColumnHelper<Interaction>()

export default function InteracoesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null)

  const sources = useMemo(
    () => Array.from(new Set(interactions.map((interaction) => interaction.source))),
    []
  )

  const filteredData = useMemo(() => {
    return interactions.filter((interaction) => {
      const searchMatch =
        interaction.id.toLowerCase().includes(search.toLowerCase()) ||
        interaction.source.toLowerCase().includes(search.toLowerCase()) ||
        interaction.userInput.toLowerCase().includes(search.toLowerCase()) ||
        interaction.tags.join(' ').toLowerCase().includes(search.toLowerCase())

      const statusMatch = statusFilter === 'all' || interaction.status === statusFilter
      const sourceMatch = sourceFilter === 'all' || interaction.source === sourceFilter
      const scoreMatch =
        scoreFilter === 'all' ||
        (scoreFilter === 'high' && interaction.score >= 8) ||
        (scoreFilter === 'medium' && interaction.score >= 6 && interaction.score < 8) ||
        (scoreFilter === 'low' && interaction.score < 6)

      return searchMatch && statusMatch && sourceMatch && scoreMatch
    })
  }, [search, statusFilter, sourceFilter, scoreFilter])

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <span className="font-semibold text-slate-950">{info.getValue()}</span>,
      }),
      columnHelper.accessor('source', {
        header: 'Origem',
        cell: (info) => <span className="text-slate-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor('userInput', {
        header: 'Entrada',
        cell: (info) => <span className="line-clamp-2 max-w-md text-slate-500">{info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor('score', {
        header: 'Score',
        cell: (info) => <span className="font-semibold text-slate-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor('createdAt', {
        header: 'Data',
        cell: (info) => <span className="text-slate-500">{info.getValue()}</span>,
      }),
      columnHelper.accessor('tags', {
        header: 'Tags',
        cell: (info) => (
          <div className="flex flex-wrap gap-2">
            {info.getValue().map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Ações',
        cell: (info) => (
          <button
            onClick={() => setSelectedInteraction(info.row.original)}
            className="rounded-lg border border-[#b15cdc]/20 bg-[#b15cdc]/10 px-3 py-1.5 text-xs font-semibold text-[#b15cdc] transition hover:bg-[#b15cdc]/15"
          >
            Ver detalhes
          </button>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  })

  return (
    <PageShell
      title="Interações"
      description="Base histórica das interações processadas pela operação de IA."
    >
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por ID, origem, entrada ou tag..."
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
          >
            <option value="all">Todos os status</option>
            <option value="approved">Aprovado</option>
            <option value="partial">Parcial</option>
            <option value="rejected">Reprovado</option>
            <option value="pending">Pendente</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
          >
            <option value="all">Todas as origens</option>
            {sources.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <select
            value={scoreFilter}
            onChange={(event) => setScoreFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#b15cdc] focus:ring-4 focus:ring-[#b15cdc]/10"
          >
            <option value="all">Todos os scores</option>
            <option value="high">Alto: 8+</option>
            <option value="medium">Médio: 6 a 7,9</option>
            <option value="low">Baixo: abaixo de 6</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-4 font-semibold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-200 text-sm text-slate-600">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>
          Exibindo {table.getRowModel().rows.length} de {filteredData.length} interações filtradas
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-700">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>

      {selectedInteraction && (
        <div className="mt-6 rounded-2xl border border-[#b15cdc]/20 bg-[#b15cdc]/5 p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Detalhes da interação</h2>
              <p className="mt-1 text-sm text-slate-500">{selectedInteraction.id} • {selectedInteraction.source}</p>
            </div>
            <button onClick={() => setSelectedInteraction(null)} className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              Fechar
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Entrada do usuário</p>
              <p className="text-sm text-slate-700">{selectedInteraction.userInput}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Resposta da IA</p>
              <p className="text-sm text-slate-700">{selectedInteraction.aiOutput}</p>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
