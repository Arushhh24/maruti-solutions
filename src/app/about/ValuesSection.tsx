'use client'
import { motion } from 'framer-motion'

const values = [
  { label: 'Strength', desc: 'We take on hard problems and see them through.' },
  { label: 'Intelligence', desc: 'Analysis before action, every time.' },
  { label: 'Trust', desc: 'We say what we mean and deliver what we promise.' },
  { label: 'Discipline', desc: 'Consistency is how we protect our clients\' outcomes.' },
  { label: 'Execution', desc: 'Strategy is only as good as what gets shipped.' },
]

export function ValuesSection() {
  return (
    <section className="py-20 relative">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="eyebrow block mb-4">Brand Values</span>
          <h2 className="font-heading font-bold text-white text-3xl" style={{ letterSpacing: '-0.02em' }}>
            What we stand for.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-orange-500/20 hover:bg-orange-500/[0.03] transition-all duration-300"
            >
              <p className="font-heading font-semibold text-white text-lg mb-2">{v.label}</p>
              <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
