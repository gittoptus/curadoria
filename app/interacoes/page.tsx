import { PageShell } from '@/components/layout/page-shell'
import { interactions } from '@/data/mock-data'

export default function InteracoesPage() {
  return (
    <PageShell
      title="Interações"
      description="Base histórica das interações processadas pela operação de IA."
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full border-collapse text-left">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Origem</th>
              <th className="px-5 py-4">Entrada</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Score</th>
              <th className="px-5 py-4">Tags</th>
            </tr>
          </thead>

          <tbody>
            {interactions.map((interaction) => (
              <tr
                key={interaction.id}
                className="border-t border-white/5 text-sm text-slate-300"
              >
                <td className="px-5 py-4 font-medium text-white">
                  {interaction.id}
                </td>

                <td className="px-5 py-4">{interaction.source}</td>

                <td className="max-w-md px-5 py-4 text-slate-400">
                  {interaction.userInput}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-100 ring-1 ring-blue-500/20">
                    {interaction.status}
                  </span>
                </td>

                <td className="px-5 py-4">{interaction.score}</td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {interaction.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400"
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
