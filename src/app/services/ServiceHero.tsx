'use client'

import { motion } from 'framer-motion'

export function ServiceHero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="eyebrow block mb-5">Services</span>
          <h1
            className="font-heading font-bold text-white mb-6 leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Every capability you need.
            <br />
            <span className="text-white/50">One team that owns it.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
            Four disciplines working together — financial consulting, marketing, design, and VFX — so you never have to coordinate between disconnected agencies again.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
