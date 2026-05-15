'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Bot, ClipboardCheck, FileText, Gauge, LayoutDashboard, ListChecks, Settings, Sparkles, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Curadoria', href: '/curadoria', icon: ClipboardCheck },
  { name: 'Interações', href: '/interacoes', icon: Bot },
  { name: 'Critérios', href: '/criterios', icon: ListChecks },
  { name: 'Prompts', href: '/prompts', icon: FileText },
  { name: 'Automações', href: '/automacoes', icon: Workflow },
  { name: 'Backlog', href: '/backlog', icon: Gauge },
  { name: 'Relatórios', href: '/relatorios', icon: BarChart3 },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-[#2f0e3d] bg-[#431457] px-4 py-5 lg:block">
      <div className="mb-8 flex items-center justify-center px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'bg-white text-[#431457] shadow-sm'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
