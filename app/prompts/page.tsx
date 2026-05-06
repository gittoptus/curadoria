import { PageShell } from '@/components/layout/page-shell'
import { SectionCard } from '@/components/shared/section-card'
import { StatusBadge } from '@/components/shared/status-badge'
import { prompts } from '@/data/mock-data'
import { ui } from '@/lib/theme'

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
            <div key={prompt.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-950">
                    {prompt.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {prompt.description}
                  </p>
                </div>

                <StatusBadge status={prompt.status} />
              </div>

              <div className="grid gap-4 text-sm md:grid-cols-4">
                <div>
                  <p className="font-medium text-slate-500">Versão</p>
                  <p className="mt-1 font-semibold text-slate-950">{prompt.version}</p>
                </div>

                <div>
                  <p className="font-medium text-slate-500">Owner</p>
                  <p className="mt-1 font-semibold text-slate-950">{prompt.owner}</p>
                </div>

                <div>
                  <p className="font-medium text-slate-500">Taxa aprovação</p>
                  <p className="mt-1 font-semibold text-slate-950">{prompt.approvalRate}</p>
                </div>

                <div>
                  <p className="font-medium text-slate-500">Última atualização</p>
                  <p className="mt-1 font-semibold text-slate-950">{prompt.updatedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  )
}
