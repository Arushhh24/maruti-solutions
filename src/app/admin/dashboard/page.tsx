'use client'

import { useEffect, useState } from 'react'
import { Users, Calendar, FolderOpen, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface DashboardData {
  stats: {
    totalLeads: number
    totalAppointments: number
    totalProjects: number
    newLeads: number
    pendingAppointments: number
    newProjects: number
  }
  recentLeads: Array<{ id: string; name: string; email: string; company: string | null; status: string; created_at: string }>
  recentAppointments: Array<{ id: string; name: string; email: string; service: string; date: string; time: string; status: string; created_at: string }>
}

const statusColors: Record<string, string> = {
  new: 'badge-new',
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  contacted: 'badge-confirmed',
  cancelled: 'badge-cancelled',
  qualified: 'badge-confirmed',
  closed: 'badge-cancelled',
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics', {
      headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}` },
    })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const stats = data?.stats

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-white text-2xl mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            label: 'Total Leads',
            value: stats?.totalLeads ?? '—',
            sub: `${stats?.newLeads ?? 0} new`,
            icon: Users,
            accent: '#3B82F6',
            href: '/admin/leads',
          },
          {
            label: 'Appointments',
            value: stats?.totalAppointments ?? '—',
            sub: `${stats?.pendingAppointments ?? 0} pending`,
            icon: Calendar,
            accent: '#FF7A00',
            href: '/admin/appointments',
          },
          {
            label: 'Projects',
            value: stats?.totalProjects ?? '—',
            sub: `${stats?.newProjects ?? 0} new`,
            icon: FolderOpen,
            accent: '#10B981',
            href: '/admin/projects',
          },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/15 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center border"
                style={{ background: `${card.accent}14`, borderColor: `${card.accent}30` }}
              >
                <card.icon size={17} style={{ color: card.accent }} />
              </div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-0.5" />
            </div>
            <p className="font-heading font-bold text-white text-2xl mb-0.5">{card.value}</p>
            <p className="text-white/40 text-sm">{card.label}</p>
            <p className="text-xs mt-2" style={{ color: `${card.accent}99` }}>{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Leads */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <h2 className="font-heading font-semibold text-white text-base">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {(data?.recentLeads ?? []).length === 0 ? (
              <p className="px-5 py-8 text-white/30 text-sm text-center">No leads yet</p>
            ) : (
              data?.recentLeads.map((lead) => (
                <div key={lead.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-white/35 text-xs truncate">
                      {lead.company ? `${lead.company} · ` : ''}{lead.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={statusColors[lead.status] ?? 'badge-new'}>{lead.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <h2 className="font-heading font-semibold text-white text-base">Recent Appointments</h2>
            <Link href="/admin/appointments" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {(data?.recentAppointments ?? []).length === 0 ? (
              <p className="px-5 py-8 text-white/30 text-sm text-center">No appointments yet</p>
            ) : (
              data?.recentAppointments.map((appt) => (
                <div key={appt.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{appt.name}</p>
                    <p className="text-white/35 text-xs truncate">
                      {appt.service} · {appt.date}
                    </p>
                  </div>
                  <span className={statusColors[appt.status] ?? 'badge-pending'}>{appt.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <h2 className="font-heading font-semibold text-white text-base mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/book', label: 'View Booking Page' },
            { href: '/submit', label: 'View Submit Page' },
            { href: '/contact', label: 'View Contact Page' },
            { href: '/blog', label: 'View Blog' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="px-4 py-2 rounded-lg border border-white/[0.08] text-white/50 text-sm hover:text-white hover:border-white/20 transition-all"
            >
              {link.label} ↗
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
