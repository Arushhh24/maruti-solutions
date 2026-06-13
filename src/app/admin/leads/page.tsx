'use client'

import { useEffect, useState } from 'react'
import { Search, RefreshCw, Mail } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  source: string
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  new: 'badge-new',
  contacted: 'badge-confirmed',
  qualified: 'badge-confirmed',
  closed: 'badge-cancelled',
}

const statuses = ['new', 'contacted', 'qualified', 'closed']

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}` },
      })
      const data = await res.json()
      setLeads(data.data ?? [])
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLeads() }, [])

  const updateStatus = async (id: string, status: string) => {
    // Optimistic update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    // In production, call a PATCH endpoint
  }

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.company ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-white text-2xl mb-1">Leads</h1>
          <p className="text-white/40 text-sm">{leads.length} total enquiries</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.08] text-white/50 text-sm hover:text-white hover:border-white/20 transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
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

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-16">No leads found</p>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((lead) => (
              <div key={lead.id}>
                <div
                  className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <span className="text-white/50 text-sm font-medium">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white/80 text-sm font-medium truncate">{lead.name}</p>
                      {lead.company && (
                        <span className="text-white/30 text-xs">· {lead.company}</span>
                      )}
                    </div>
                    <p className="text-white/35 text-xs truncate">{lead.email}</p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-white/25 text-xs hidden md:block">
                      {formatDate(lead.created_at)}
                    </span>
                    <select
                      value={lead.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value) }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs text-white/60 outline-none cursor-pointer hover:border-white/20 capitalize"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s} className="bg-[#030712] capitalize">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Expanded message */}
                {expanded === lead.id && (
                  <div className="px-5 pb-4 bg-white/[0.01] border-t border-white/[0.04]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="md:col-span-2">
                        <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Message</p>
                        <p className="text-white/60 text-sm leading-relaxed">{lead.message}</p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-1">Contact</p>
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-orange-400 text-sm hover:text-orange-300 transition-colors">
                            <Mail size={13} />
                            {lead.email}
                          </a>
                          {lead.phone && <p className="text-white/50 text-sm mt-1">{lead.phone}</p>}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-1">Source</p>
                          <p className="text-white/50 text-sm">{lead.source}</p>
                        </div>
                      </div>
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
