import type { Metadata } from 'next'
import { BookingForm } from './BookingForm'

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description: 'Schedule a free consultation with Maruti Solutions. Choose your service, date, and time.',
}

export default function BookPage() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <span className="eyebrow block mb-4">Book Consultation</span>
            <h1
              className="font-heading font-bold text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Let's start the conversation.
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-xl">
              First consultation is free. Choose a service, pick a time that works for you, and we'll confirm within 24 hours.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
