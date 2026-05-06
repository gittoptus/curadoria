import { cn } from '@/lib/utils'

type StatusBadgeProps = {
  status: string
}

const statusStyles: Record<string, string> = {
  approved: 'bg-emerald-500/10 text-emerald-100 ring-emerald-500/20',
  active: 'bg-emerald-500/10 text-emerald-100 ring-emerald-500/20',
  done: 'bg-emerald-500/10 text-emerald-100 ring-emerald-500/20',
  partial: 'bg-amber-500/10 text-amber-100 ring-amber-500/20',
  pending: 'bg-amber-500/10 text-amber-100 ring-amber-500/20',
  review: 'bg-blue-500/10 text-blue-100 ring-blue-500/20',
  todo: 'bg-blue-500/10 text-blue-100 ring-blue-500/20',
  doing: 'bg-cyan-500/10 text-cyan-100 ring-cyan-500/20',
  rejected: 'bg-rose-500/10 text-rose-100 ring-rose-500/20',
  error: 'bg-rose-500/10 text-rose-100 ring-rose-500/20',
  paused: 'bg-slate-500/10 text-slate-200 ring-slate-500/20',
  backlog: 'bg-violet-500/10 text-violet-100 ring-violet-500/20',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1',
        statusStyles[status] ?? 'bg-white/5 text-slate-300 ring-white/10'
      )}
    >
      {status}
    </span>
  )
}
