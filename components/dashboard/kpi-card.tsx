import { ReactNode } from 'react'

type KpiCardProps = {
  title: string
  value: string
  description?: string
  icon?: ReactNode
}

export function KpiCard({ title, value, description, icon }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="text-[#b15cdc]">{icon}</div>
      </div>

      <div>
        <h3 className="text-3xl font-semibold tracking-tight text-slate-950">{value}</h3>
        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
      </div>
    </div>
  )
}
