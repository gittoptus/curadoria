type DashboardRiskCardProps = {
  title: string
  description: string
  severity: string
}

const severityStyles: Record<string, string> = {
  critical: 'border-rose-200 bg-rose-50 text-rose-700',
  high: 'border-amber-200 bg-amber-50 text-amber-700',
  medium: 'border-blue-200 bg-blue-50 text-blue-700',
}

export function DashboardRiskCard({ title, description, severity }: DashboardRiskCardProps) {
  return (
    <div className={`rounded-xl border p-4 ${severityStyles[severity]}`}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
          {severity}
        </span>
      </div>

      <p className="text-sm leading-relaxed opacity-90">
        {description}
      </p>
    </div>
  )
}
