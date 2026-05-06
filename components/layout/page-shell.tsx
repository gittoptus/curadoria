import { ReactNode } from 'react'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'

type PageShellProps = {
  title: string
  description?: string
  children: ReactNode
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <AppSidebar />

      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <AppHeader title={title} description={description} />
          {children}
        </div>
      </main>
    </div>
  )
}
