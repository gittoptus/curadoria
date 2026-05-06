type AppHeaderProps = {
  title: string
  description?: string
}

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-sm font-medium text-blue-200 ring-1 ring-blue-400/20">
          AN
        </div>
      </div>
    </header>
  )
}
