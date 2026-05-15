type AppHeaderProps = {
  title: string
  description?: string
}

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#431457]/10 text-sm font-semibold text-[#431457] ring-1 ring-[#431457]/20">
          AN
        </div>
      </div>
    </header>
  )
}
