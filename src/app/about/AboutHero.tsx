'use client'
import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <span className="eyebrow block mb-5">About</span>
          <h1
            className="font-heading font-bold text-white mb-6 leading-[1.06]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            A consultancy built
            <br />
            for businesses that
            <br />
            <span className="text-gradient-orange">mean business.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl">
            Maruti Solutions was founded on a simple observation: most businesses don't need a bigger budget — they need sharper strategy, better execution, and creative work that actually reflects their ambition.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
