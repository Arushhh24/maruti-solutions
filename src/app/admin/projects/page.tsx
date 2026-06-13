'use client'

import { useEffect, useState } from 'react'
import { Search, RefreshCw, Mail, ExternalLink, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Project {
  id: string
  name: string
  email: string
  phone: string | null
  service: string
  description: string
  budget: string | null
  timeline: string | null
  files: string[]
  status: string
  created_at: string
}

const statuses = ['new', 'in_review', 'in_progress', 'completed']

const statusColors: Record<string, string> = {
  new: 'badge-new',
  in_review: 'badge-pending',
  in_progress: 'badge-confirmed',
  completed: 'badge-confirmed',
}

const serviceLabels: Record<string, string> = {
  'financial-consulting': 'Financial Consulting',
  'marketing-solutions': 'Marketing Solutions',
  'graphic-design': 'Graphic Design',
  'vfx-services': 'VFX Services',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}` },
      })
      const data = await res.json()
      setProjects(data.data ?? [])
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const updateStatus = (id: string, status: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.service.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-white text-2xl mb-1">Projects</h1>
          <p className="text-white/40 text-sm">{projects.length} total submissions</p>
        </div>
        <button
          onClick={fetchProjects}
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
            placeholder="Search projects..."
            className="input-premium pl-9 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-premium text-sm w-full sm:w-44"
        >
          <option value="all" className="bg-[#030712]">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s} className="bg-[#030712]">{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-16">No projects found</p>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((project) => (
              <div key={project.id}>
                <div
                  className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText size={15} className="text-emerald-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{project.name}</p>
                    <p className="text-white/35 text-xs truncate">
                      {serviceLabels[project.service] ?? project.service}
                      {project.budget ? ` · ${project.budget}` : ''}
                    </p>
                  </div>

                  <span className="text-white/25 text-xs hidden md:block flex-shrink-0">
                    {formatDate(project.created_at)}
                  </span>

                  <select
                    value={project.status}
                    onChange={(e) => { e.stopPropagation(); updateStatus(project.id, e.target.value) }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-transparent border border-white/10 rounded-lg px-2 py-1 text-xs text-white/60 outline-none cursor-pointer hover:border-white/20 capitalize flex-shrink-0"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="bg-[#030712]">{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>

                {expanded === project.id && (
                  <div className="px-5 pb-5 bg-white/[0.01] border-t border-white/[0.04]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
                      <div className="md:col-span-2">
                        <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-2">Description</p>
                        <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>

                        {project.files.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-2">
                              Attachments ({project.files.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.files.map((url, i) => (
                                <a
                                  key={i}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/20 transition-all"
                                >
                                  <ExternalLink size={11} />
                                  File {i + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-1">Contact</p>
                          <a href={`mailto:${project.email}`} className="flex items-center gap-1.5 text-orange-400 text-sm hover:text-orange-300">
                            <Mail size={13} />
                            {project.email}
                          </a>
                          {project.phone && <p className="text-white/50 text-sm mt-1">{project.phone}</p>}
                        </div>
                        {project.timeline && (
                          <div>
                            <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-1">Timeline</p>
                            <p className="text-white/60 text-sm">{project.timeline}</p>
                          </div>
                        )}
                        {project.budget && (
                          <div>
                            <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-1">Budget</p>
                            <p className="text-white/60 text-sm">{project.budget}</p>
                          </div>
                        )}
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
