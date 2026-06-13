'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#041E42]/30" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent" />

      {/* Horizontal accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="eyebrow block mb-6">Ready to Begin</span>
          <h2
            className="font-heading font-bold text-white mb-6 leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
          >
            Let's build something
            <br />
            that actually moves
            <br />
            <span className="text-gradient-orange">your business forward.</span>
          </h2>

          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need financial clarity, a stronger marketing presence, or creative work that converts — the conversation starts here.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" className="btn-primary group text-base px-8 py-4">
              <Calendar size={17} />
              Book a Consultation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-4">
              Get in Touch
            </Link>
          </div>

          <p className="text-white/25 text-xs mt-8">
            No commitment required. First consultation is free.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
