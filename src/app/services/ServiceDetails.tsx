'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, Megaphone, Palette, Film, CheckCircle2, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'financial',
    icon: TrendingUp,
    eyebrow: 'Financial Consulting',
    title: 'Turn financial complexity into strategic clarity.',
    description:
      'Whether you\'re evaluating an acquisition, managing cash flow pressure, or building a forecast that actually holds up to scrutiny — we bring analytical rigour and commercial judgment to every engagement.',
    overview:
      'Financial consulting at Maruti Solutions combines formal training in financial analysis with real-world business judgment. We work with founders, SMEs, and growing businesses to build financial frameworks that inform decisions, not just satisfy compliance.',
    capabilities: [
      'Financial statement analysis and interpretation',
      'Budget development and variance analysis',
      'Cost structure optimization',
      'Business valuation and M&A support',
      'Investment research and due diligence',
      'Financial reporting and dashboard design',
      'Cash flow modelling and scenario planning',
      'KPI framework development',
    ],
    deliverables: ['Financial model (Excel)', 'Analysis report', 'Executive summary', 'Recommendation deck'],
    benefits: [
      { title: 'Decision confidence', desc: 'Numbers you can act on, not just report on' },
      { title: 'Cost clarity', desc: 'Know exactly where money is going and why' },
      { title: 'Investor-ready', desc: 'Outputs built to withstand external scrutiny' },
    ],
    accent: '#3B82F6',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    eyebrow: 'Marketing Solutions',
    title: 'Marketing built on evidence, not assumption.',
    description:
      'Strategy-first marketing that connects your commercial objectives to the channels, messages, and tactics that move the needle — with measurement built in from day one.',
    overview:
      'Our marketing work starts with understanding your business model and ideal customer, then builds campaigns, strategies, and brand systems that serve those specific goals. Data-driven by default, creative where it counts.',
    capabilities: [
      'Social media strategy and content marketing',
      'Digital marketing campaign management',
      'Search engine optimisation (SEO)',
      'Market research and competitor analysis',
      'Brand strategy and positioning',
      'Content strategy and editorial planning',
      'Performance tracking and reporting',
      'Go-to-market planning',
    ],
    deliverables: ['Marketing strategy document', 'Campaign plan', 'Content calendar', 'Performance dashboard'],
    benefits: [
      { title: 'Measurable reach', desc: 'Campaigns tied to trackable business outcomes' },
      { title: 'Brand coherence', desc: 'Consistent positioning across every touchpoint' },
      { title: 'Audience insight', desc: 'Research that tells you who to target and why' },
    ],
    accent: '#FF7A00',
  },
  {
    id: 'design',
    icon: Palette,
    eyebrow: 'Graphic Design',
    title: 'Visual identity that earns its place.',
    description:
      'Design that does more than look good — it communicates brand values, builds recognition, and drives the actions you need your audience to take.',
    overview:
      'From logo systems to full brand identities, UI design to marketing collateral, we approach every design brief with the same discipline: understand the audience, understand the goal, then design towards it.',
    capabilities: [
      'Logo design and brand mark development',
      'Full brand identity systems',
      'Social media creative and templates',
      'UI and interface design',
      'Marketing materials and collateral',
      'Pitch deck and presentation design',
      'Print and digital asset production',
      'Brand guidelines documentation',
    ],
    deliverables: ['Brand identity package', 'Asset library', 'Brand guidelines', 'Production-ready files'],
    benefits: [
      { title: 'Brand recognition', desc: 'A visual identity that sticks in memory' },
      { title: 'Consistency at scale', desc: 'Systems that hold up as you grow' },
      { title: 'Professional credibility', desc: 'Design that signals seriousness to customers' },
    ],
    accent: '#A855F7',
  },
  {
    id: 'vfx',
    icon: Film,
    eyebrow: 'VFX Services',
    title: 'Motion that makes brands impossible to ignore.',
    description:
      'Motion graphics, video editing, and commercial VFX at a level that competes with studio-produced work — built for brands that take their presence seriously.',
    overview:
      'Our VFX capability draws on formal training in visual effects and animation. We produce motion content that ranges from subtle UI animations to full commercial productions — all grounded in a clear communication brief.',
    capabilities: [
      'Motion graphics and animated explainers',
      'Video editing and post-production',
      'Product animation and 3D visualisation',
      'Promotional video production',
      'Commercial VFX compositing',
      'Social media reels and shorts',
      'Title sequences and brand animations',
      'Green screen and compositing work',
    ],
    deliverables: ['Finished video files (MP4/MOV)', 'Project source files', 'Platform-optimised exports', 'Thumbnail assets'],
    benefits: [
      { title: 'Premium production value', desc: 'Content that looks like it cost 10x more' },
      { title: 'Platform-optimised', desc: 'Right specs for every channel from day one' },
      { title: 'Brand-consistent motion', desc: 'Animations that feel like your brand, not generic' },
    ],
    accent: '#10B981',
  },
]

export function ServiceDetails() {
  return (
    <div className="space-y-px">
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className="relative py-20 lg:py-28 overflow-hidden"
          style={{
            background: i % 2 === 0 ? 'transparent' : 'rgba(4,30,66,0.08)',
          }}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Header column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div
                  className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 border"
                  style={{
                    background: `${service.accent}12`,
                    borderColor: `${service.accent}30`,
                  }}
                >
                  <service.icon size={24} style={{ color: service.accent }} />
                </div>

                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3"
                  style={{ color: service.accent }}
                >
                  {service.eyebrow}
                </span>

                <h2
                  className="font-heading font-bold text-white mb-5 leading-tight"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em' }}
                >
                  {service.title}
                </h2>

                <p className="text-white/60 text-base leading-relaxed mb-6">{service.description}</p>

                <p className="text-white/40 text-sm leading-relaxed mb-8">{service.overview}</p>

                <Link href="/book" className="btn-primary text-sm">
                  Book a Consultation
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Details column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="lg:col-span-7 space-y-6"
              >
                {/* Capabilities */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
                    Capabilities
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-white/20 mt-0.5 flex-shrink-0" style={{ color: `${service.accent}60` }} />
                        <span className="text-white/60 text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-4">
                    Deliverables
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((del) => (
                      <span
                        key={del}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                        style={{
                          background: `${service.accent}08`,
                          borderColor: `${service.accent}25`,
                          color: `${service.accent}cc`,
                        }}
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.benefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-4"
                    >
                      <p className="text-white font-medium text-sm mb-1">{benefit.title}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          {i < services.length - 1 && (
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          )}
        </section>
      ))}
    </div>
  )
}
