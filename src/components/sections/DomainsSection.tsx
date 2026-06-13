'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, Megaphone, Palette, Film, ArrowRight } from 'lucide-react'

const domains = [
  {
    id: 'finance',
    icon: TrendingUp,
    label: 'Finance',
    title: 'Financial Consulting',
    description: 'Strategic financial analysis and planning that turns numbers into decisions.',
    capabilities: ['Financial Analysis', 'Budget Planning', 'Business Valuation', 'Investment Research'],
    color: 'from-blue-600/20 to-navy-500/10',
    accent: '#3B82F6',
    href: '/services#financial',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    label: 'Marketing',
    title: 'Marketing Solutions',
    description: 'Data-driven marketing strategies that move audiences and drive measurable growth.',
    capabilities: ['Brand Strategy', 'SEO & Digital', 'Social Media', 'Market Research'],
    color: 'from-orange-600/20 to-orange-900/10',
    accent: '#FF7A00',
    href: '/services#marketing',
  },
  {
    id: 'gfx',
    icon: Palette,
    label: 'GFX',
    title: 'Graphic Design',
    description: 'Visual identity and design systems that make brands unmistakable.',
    capabilities: ['Logo & Identity', 'Brand Systems', 'UI Design', 'Marketing Collateral'],
    color: 'from-purple-600/20 to-purple-900/10',
    accent: '#A855F7',
    href: '/services#design',
  },
  {
    id: 'vfx',
    icon: Film,
    label: 'VFX',
    title: 'Visual Effects',
    description: 'Motion and cinematic craft that makes brands impossible to ignore.',
    capabilities: ['Motion Graphics', 'Video Editing', 'Product Animation', 'Commercial VFX'],
    color: 'from-emerald-600/20 to-emerald-900/10',
    accent: '#10B981',
    href: '/services#vfx',
  },
]

export function DomainsSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="section-container relative z-10">
        <div className="mb-14">
          <span className="eyebrow block mb-4">Core Capabilities</span>
          <h2
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
          >
            Four disciplines.
            <br />
            One integrated approach.
          </h2>
          <p className="text-white/50 text-base max-w-xl leading-relaxed">
            Every engagement draws from all four domains — because real business challenges rarely respect category boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActive(domain.id)}
              onMouseLeave={() => setActive(null)}
              className="relative group cursor-pointer"
            >
              <div
                className={`relative rounded-2xl border overflow-hidden transition-all duration-300 h-full
                  ${active === domain.id
                    ? 'border-white/20 shadow-premium'
                    : 'border-white/[0.06] hover:border-white/12'
                  }`}
                style={{
                  background: active === domain.id
                    ? `linear-gradient(135deg, ${domain.accent}15, rgba(4,30,66,0.6))`
                    : 'rgba(255,255,255,0.02)',
                }}
              >
                <div className="p-6">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      background: active === domain.id ? `${domain.accent}20` : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${active === domain.id ? `${domain.accent}40` : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <domain.icon
                      size={20}
                      style={{ color: active === domain.id ? domain.accent : 'rgba(255,255,255,0.5)' }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="text-xs font-semibold tracking-[0.15em] uppercase mb-2 block transition-colors"
                    style={{ color: active === domain.id ? domain.accent : 'rgba(255,255,255,0.3)' }}
                  >
                    {domain.label}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-white text-xl mb-3 leading-tight">
                    {domain.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {domain.description}
                  </p>

                  {/* Capabilities */}
                  <AnimatePresence>
                    {active === domain.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="space-y-1.5 mb-5">
                          {domain.capabilities.map((cap) => (
                            <div key={cap} className="flex items-center gap-2">
                              <div
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: domain.accent }}
                              />
                              <span className="text-white/60 text-xs">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA */}
                  <Link
                    href={domain.href}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors group/link"
                    style={{ color: active === domain.id ? domain.accent : 'rgba(255,255,255,0.3)' }}
                  >
                    Explore
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Bottom accent */}
                <div
                  className="h-px w-full transition-all duration-300"
                  style={{
                    background: active === domain.id
                      ? `linear-gradient(to right, transparent, ${domain.accent}60, transparent)`
                      : 'transparent',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
