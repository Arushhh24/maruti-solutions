'use client'

import { motion } from 'framer-motion'
import { Search, Map, Zap, BarChart } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description:
      'We start by understanding your business at a deep level — your model, competitive position, team dynamics, and the constraints that actually matter.',
    deliverable: 'Business audit & opportunity map',
  },
  {
    number: '02',
    icon: Map,
    title: 'Strategize',
    description:
      'With context established, we build a tailored roadmap. No generic frameworks — every recommendation is specific to your situation and goals.',
    deliverable: 'Strategy document & prioritized plan',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Execute',
    description:
      'Strategy without execution is irrelevant. We move fast, communicate clearly, and deliver work that matches the brief — every time.',
    deliverable: 'Finished deliverables on schedule',
  },
  {
    number: '04',
    icon: BarChart,
    title: 'Scale',
    description:
      'Delivery is the beginning. We track what\'s working, refine what isn\'t, and build the foundations for compounding growth.',
    deliverable: 'Performance review & growth roadmap',
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#041E42]/20" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow block mb-4">How We Work</span>
              <h2
                className="font-heading font-bold text-white mb-5 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.02em' }}
              >
                A process built
                <br />
                around outcomes,
                <br />
                not activity.
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Most consulting relationships produce reports. Ours produce results. Every step in our process is designed to close the gap between strategy and measurable business impact.
              </p>

              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                <p className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Our commitment
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  48-hour response on all enquiries. Clear timelines. No surprise scope changes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Steps */}
          <div className="lg:col-span-8 space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex gap-5">
                  {/* Step number + icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-navy-500/50 border border-white/[0.08] flex items-center justify-center group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-all duration-300">
                      <step.icon size={20} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-orange-500/60 text-xs font-mono font-semibold mr-3">
                          {step.number}
                        </span>
                        <span className="font-heading font-semibold text-white text-xl">
                          {step.title}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/50 text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-orange-500" />
                      <span className="text-xs text-white/30 font-medium">{step.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-11 -bottom-4 w-px h-4 bg-gradient-to-b from-white/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
