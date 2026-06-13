'use client'

import { useEffect, useState } from 'react'
import { Search, RefreshCw, Mail, Calendar, Clock } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string | null
  status: string
  created_at: string
}

const statuses = ['pending', 'confirmed', 'cancelled']

const statusColors: Record<string, string> = {
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  cancelled: 'badge-cancelled',
}

const serviceLabels: Record<string, string> = {
  'financial-consulting': 'Financial Consulting',
  'marketing-solutions': 'Marketing Solutions',
  'graphic-design': 'Graphic Design',
  'vfx-services': 'VFX Services',
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/appointments', {
        headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}` },
      })
      const data = await res.json()
      setAppointments(data.data ?? [])
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAppointments() }, [])

  const updateStatus = (id: string, status: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-white text-2xl mb-1">Appointments</h1>
          <p className="text-white/40 text-sm">{appointments.length} total bookings</p>
        </div>
        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.08] text-white/50 text-sm hover:text-white hover:border-white/20 transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search appointments..."
            className="input-premium pl-9 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-premium text-sm w-full sm:w-40"
        >
          <option value="all" className="bg-[#030712]">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-[#030712] capitalize">{s}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-16">No appointments found</p>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((appt) => (
              <div key={appt.id}>
                <div
                  className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(expanded === appt.id ? null : appt.id)}
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar size={15} className="text-orange-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{appt.name}</p>
                    <p className="text-white/35 text-xs">
                      {serviceLabels[appt.service] ?? appt.service}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 text-white/40 text-xs">
                    <Clock size={12} />
                    <span>{appt.date} · {formatTime(appt.time)}</span>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <select
                      value={appt.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(appt.id, e.target.value) }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs text-white/60 outline-none cursor-pointer hover:border-white/20 capitalize"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s} className="bg-[#030712] capitalize">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {expanded === appt.id && (
                  <div className="px-5 pb-4 bg-white/[0.01] border-t border-white/[0.04]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Contact</p>
                        <a href={`mailto:${appt.email}`} className="flex items-center gap-1.5 text-orange-400 text-sm hover:text-orange-300 mb-1">
                          <Mail size={13} />
                          {appt.email}
                        </a>
                        <p className="text-white/50 text-sm">{appt.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Schedule</p>
                        <p className="text-white/60 text-sm">{formatDate(appt.date)}</p>
                        <p className="text-white/40 text-sm">{formatTime(appt.time)}</p>
                      </div>
                      {appt.message && (
                        <div>
                          <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Notes</p>
                          <p className="text-white/60 text-sm leading-relaxed">{appt.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
