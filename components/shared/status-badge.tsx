import { cn } from '@/lib/utils'

type StatusBadgeProps = {
  status: string
}

const statusStyles: Record<string, string> = {
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  done: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  partial: 'bg-amber-50 text-amber-700 ring-amber-200',
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  review: 'bg-blue-50 text-blue-700 ring-blue-200',
  todo: 'bg-blue-50 text-blue-700 ring-blue-200',
  doing: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  rejected: 'bg-rose-50 text-rose-700 ring-rose-200',
  error: 'bg-rose-50 text-rose-700 ring-rose-200',
  paused: 'bg-slate-100 text-slate-700 ring-slate-200',
  backlog: 'bg-[#b15cdc]/10 text-[#b15cdc] ring-[#b15cdc]/20',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1',
        statusStyles[status] ?? 'bg-slate-100 text-slate-700 ring-slate-200'
      )}
    >
      {status}
    </span>
  )
}
