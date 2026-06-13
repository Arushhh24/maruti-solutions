'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { CheckCircle } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email us directly at Arushhh.work@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h2 className="font-heading font-bold text-white text-2xl mb-3">Message Sent</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-sm mx-auto">
          Thanks for reaching out. We'll review your message and get back to you within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Full Name *
          </label>
          <input
            {...register('name')}
            placeholder="Your name"
            className="input-premium"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Email Address *
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className="input-premium"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Phone (optional)
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="input-premium"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
            Company (optional)
          </label>
          <input
            {...register('company')}
            placeholder="Your company name"
            className="input-premium"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
          Message *
        </label>
        <textarea
          {...register('message')}
          rows={6}
          placeholder="Tell us about your business, what you're trying to achieve, and how we can help..."
          className="input-premium resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary text-base py-3.5 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        <p className="text-white/25 text-xs">We respond to all enquiries within 48 hours.</p>
      </div>
    </form>
  )
}
