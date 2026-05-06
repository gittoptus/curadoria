import { ReactNode } from 'react'

type KpiCardProps = {
  title: string
  value: string
  description?: string
  icon?: ReactNode
}

export function KpiCard({ title, value, description, icon }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        {icon}
      </div>

      <div>
        <h3 className="text-3xl font-semibold tracking-tight text-white">{value}</h3>
        {description && (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        )}
      </div>
    </div>
  )
}
