import { PageShell } from '@/components/layout/page-shell'
import { StatusBadge } from '@/components/shared/status-badge'
import { interactions } from '@/data/mock-data'

export default function InteracoesPage() {
  return (
    <PageShell
      title="Interações"
      description="Base histórica das interações processadas pela operação de IA."
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">ID</th>
              <th className="px-5 py-4 font-semibold">Origem</th>
              <th className="px-5 py-4 font-semibold">Entrada</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Score</th>
              <th className="px-5 py-4 font-semibold">Tags</th>
            </tr>
          </thead>

          <tbody>
            {interactions.map((interaction) => (
              <tr
                key={interaction.id}
                className="border-t border-slate-200 text-sm text-slate-600"
              >
                <td className="px-5 py-4 font-semibold text-slate-950">
                  {interaction.id}
                </td>

                <td className="px-5 py-4 text-slate-700">{interaction.source}</td>

                <td className="max-w-md px-5 py-4 text-slate-500">
                  {interaction.userInput}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={interaction.status} />
                </td>

                <td className="px-5 py-4 font-medium text-slate-700">{interaction.score}</td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {interaction.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
