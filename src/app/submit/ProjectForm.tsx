'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, type ProjectFormData } from '@/lib/validations'
import { services, budgetRanges, timelines } from '@/lib/utils'
import { Upload, X, CheckCircle, FileText } from 'lucide-react'

const ACCEPTED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpg', 'image/jpeg', 'video/mp4']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function ProjectForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const valid = Array.from(newFiles).filter(
      (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE
    )
    setFiles((prev) => [...prev, ...valid].slice(0, 5))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => { if (v) formData.append(k, v) })
      files.forEach((f) => formData.append('files', f))

      const res = await fetch('/api/projects', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us at Arushhh.work@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="font-heading font-bold text-white text-2xl mb-3">Project Brief Received</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-sm mx-auto">
          We've received your project submission. Our team will review your brief and reach out within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="font-heading font-semibold text-white text-lg mb-5">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Full Name *</label>
            <input {...register('name')} placeholder="Your name" className="input-premium" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Email *</label>
            <input {...register('email')} type="email" placeholder="your@email.com" className="input-premium" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Phone (optional)</label>
            <input {...register('phone')} type="tel" placeholder="+91 XXXXX XXXXX" className="input-premium" />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Service *</label>
            <select {...register('service')} className="input-premium">
              <option value="" className="bg-[#030712]">Select a service</option>
              {services.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#030712]">{s.label}</option>
              ))}
            </select>
            {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="font-heading font-semibold text-white text-lg mb-5">Project Brief</h2>
        <div>
          <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Project Description * <span className="text-white/20 normal-case">(min. 50 characters)</span>
          </label>
          <textarea
            {...register('description')}
            rows={5}
            placeholder="Describe your project, goals, target audience, any specific requirements, and what success looks like to you..."
            className="input-premium resize-none"
          />
          {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Budget Range</label>
            <select {...register('budget')} className="input-premium">
              <option value="" className="bg-[#030712]">Select range (optional)</option>
              {budgetRanges.map((b) => (
                <option key={b.value} value={b.value} className="bg-[#030712]">{b.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Timeline</label>
            <select {...register('timeline')} className="input-premium">
              <option value="" className="bg-[#030712]">Select timeline (optional)</option>
              {timelines.map((t) => (
                <option key={t.value} value={t.value} className="bg-[#030712]">{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* File upload */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="font-heading font-semibold text-white text-lg mb-2">Attachments</h2>
        <p className="text-white/30 text-sm mb-5">PDF, DOCX, PNG, JPG, JPEG, MP4 — max 10MB per file, up to 5 files</p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-orange-500/50 bg-orange-500/[0.05]'
              : 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.02]'
          }`}
        >
          <Upload size={24} className="text-white/30 mx-auto mb-3" />
          <p className="text-white/50 text-sm">
            Drop files here or <span className="text-orange-400">browse</span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.png,.jpg,.jpeg,.mp4"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <FileText size={15} className="text-white/40" />
                  <span className="text-white/70 text-sm truncate max-w-xs">{file.name}</span>
                  <span className="text-white/30 text-xs">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                </div>
                <button type="button" onClick={() => removeFile(i)} className="text-white/30 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full sm:w-auto justify-center text-base py-4 px-10 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Project Brief'}
      </button>
    </form>
  )
}
