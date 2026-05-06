import { PageShell } from '@/components/layout/page-shell'
import { SectionCard } from '@/components/shared/section-card'
import { StatusBadge } from '@/components/shared/status-badge'
import { prompts } from '@/data/mock-data'

export default function PromptsPage() {
  return (
    <PageShell
      title="Prompts"
      description="Gestão e versionamento dos prompts utilizados nas automações e assistentes."
    >
      <SectionCard
        title="Biblioteca de prompts"
        description="Controle operacional dos prompts ativos e em revisão."
      >
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <div
              key={prompt.name}
              className="rounded-xl border border-white/10 bg-slate-900/70 p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {prompt.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {prompt.description}
                  </p>
                </div>

                <StatusBadge status={prompt.status} />
              </div>

              <div className="grid gap-4 text-sm md:grid-cols-4">
                <div>
                  <p className="text-slate-500">Versão</p>
                  <p className="mt-1 text-white">{prompt.version}</p>
                </div>

                <div>
                  <p className="text-slate-500">Owner</p>
                  <p className="mt-1 text-white">{prompt.owner}</p>
                </div>

                <div>
                  <p className="text-slate-500">Taxa aprovação</p>
                  <p className="mt-1 text-white">{prompt.approvalRate}</p>
                </div>

                <div>
                  <p className="text-slate-500">Última atualização</p>
                  <p className="mt-1 text-white">{prompt.updatedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
