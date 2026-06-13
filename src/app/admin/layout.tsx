'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('ms_admin_auth')
    if (stored === 'true') setAuthed(true)
    setChecking(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple client-side pin — real auth should use Supabase Auth
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PIN || 'maruti2024')) {
      sessionStorage.setItem('ms_admin_auth', 'true')
      setAuthed(true)
      setLoginError('')
    } else {
      setLoginError('Incorrect password.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('ms_admin_auth')
    setAuthed(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-8 h-8 rounded-sm bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-heading font-semibold text-white text-lg">Admin Panel</span>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input-premium"
                autoFocus
              />
              {loginError && <p className="text-red-400 text-xs mt-2">{loginError}</p>}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Sign In
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-4">
            Maruti Solutions — Internal Dashboard
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030712] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-60 bg-[#020b18] border-r border-white/[0.06] flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-sm bg-orange-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div>
            <p className="font-heading font-semibold text-white text-sm leading-none">MARUTI</p>
            <p className="text-white/30 text-xs mt-0.5">Admin Panel</p>
          </div>
          <button
            className="ml-auto lg:hidden text-white/40 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-white/[0.07] text-white border border-white/[0.09]'
                    : 'text-white/45 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <item.icon size={16} className={active ? 'text-orange-400' : ''} />
                {item.label}
                {active && <ChevronRight size={12} className="ml-auto text-white/30" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 border-t border-white/[0.06] pt-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-all mb-1"
          >
            <TrendingUp size={16} />
            View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#030712]/90 backdrop-blur-sm border-b border-white/[0.06] px-5 py-3.5 flex items-center gap-4">
          <button
            className="lg:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 font-bold text-xs">AP</span>
            </div>
            <span className="text-white/60 text-sm hidden sm:block">Arush Prakash</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-7">{children}</main>
      </div>
    </div>
  )
}
