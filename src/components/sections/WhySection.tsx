'use client'

import { motion } from 'framer-motion'
import { Brain, Database, Star, Target } from 'lucide-react'

const differentiators = [
  {
    icon: Brain,
    title: 'Strategic Thinking',
    description:
      'We don\'t just execute tasks — we understand the underlying business logic and ensure every deliverable serves a larger strategic objective.',
  },
  {
    icon: Database,
    title: 'Data-Driven Decisions',
    description:
      'Every recommendation is grounded in analysis. We bring quantitative rigour to questions that most consultants answer with intuition alone.',
  },
  {
    icon: Star,
    title: 'Creative Excellence',
    description:
      'Technical competence is table stakes. The work we deliver has a point of view — it\'s designed to stand out, not just check boxes.',
  },
  {
    icon: Target,
    title: 'Business-Focused Execution',
    description:
      'Outputs are only valuable if they move the business. We stay accountable to business outcomes, not deliverable counts.',
  },
]

export function WhySection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Big statement */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow block mb-5">Why Maruti Solutions</span>

              <h2
                className="font-heading font-bold text-white mb-6 leading-[1.06]"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}
              >
                These people
                <br />
                understand
                <br />
                <span className="text-gradient-orange">business.</span>
              </h2>

              <p className="text-white/50 text-base leading-relaxed mb-8">
                Most agencies deliver services. We deliver outcomes. The difference is in how we think about every engagement — from the first conversation to the final deliverable.
              </p>

              <div className="space-y-4 pt-6 border-t border-white/[0.06]">
                {[
                  { value: 'Integrated', desc: 'Finance + Marketing + Design under one roof' },
                  { value: 'Outcome-first', desc: 'KPIs defined before work begins' },
                  { value: 'Transparent', desc: 'Regular updates, clear communication' },
                ].map((point) => (
                  <div key={point.value} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium text-sm">{point.value}</span>
                      <span className="text-white/40 text-sm"> — {point.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Differentiators */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300">
                    <item.icon size={18} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
