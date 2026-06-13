'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema, type AppointmentFormData } from '@/lib/validations'
import { services, timeSlots, formatTime } from '@/lib/utils'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  const selectedService = watch('service')

  const onSubmit = async (data: AppointmentFormData) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly at Arushhh.work@gmail.com')
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
        <h2 className="font-heading font-bold text-white text-2xl mb-3">Appointment Requested</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-sm mx-auto">
          We've received your request and will confirm your appointment within 24 hours. Check your email for details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Personal details */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="font-heading font-semibold text-white text-lg mb-5 flex items-center gap-2">
              <User size={18} className="text-orange-500" />
              Your Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  placeholder="Your full name"
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
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="input-premium"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                  Service *
                </label>
                <select {...register('service')} className="input-premium">
                  <option value="" className="bg-[#030712]">Select a service</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value} className="bg-[#030712]">
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                <MessageSquare size={12} className="inline mr-1" />
                Additional Notes (optional)
              </label>
              <textarea
                {...register('message')}
                rows={3}
                placeholder="Briefly describe what you'd like to discuss..."
                className="input-premium resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Date + Time */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="font-heading font-semibold text-white text-lg mb-5 flex items-center gap-2">
              <Calendar size={18} className="text-orange-500" />
              Schedule
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                  Preferred Date *
                </label>
                <input
                  {...register('date')}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="input-premium [color-scheme:dark]"
                />
                {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                  <Clock size={12} className="inline mr-1" />
                  Preferred Time *
                </label>
                <select {...register('time')} className="input-premium">
                  <option value="" className="bg-[#030712]">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#030712]">
                      {formatTime(slot)}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>}
              </div>
            </div>
          </div>

          {/* Info card */}
          {/* Quick contact note (highlighted) */}
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.08] p-4 mb-3">
            <p className="text-white text-sm font-bold">
              To get quick replies you can connect on LinkedIn or WhatsApp directly.
            </p>
          </div>

          {/* (Removed) Free consultation info card as requested */}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full sm:w-auto justify-center text-base py-4 px-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Request Appointment'}
      </button>
    </form>
  )
}
