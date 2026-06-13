'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, ArrowRight, GraduationCap, Briefcase, Award } from 'lucide-react'

export function FounderSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#041E42]/10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Profile area */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            {/* Profile card */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#041E42] to-[#020f24] border border-white/[0.08] p-8">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-xl overflow-hidden mb-6 flex-shrink-0">
                <Image
                  src="/publicfounder.png"
                  alt="Arush Prakash - Founder"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-heading font-bold text-white text-2xl mb-1">Arush Prakash</h3>
              <p className="text-orange-400 text-sm font-medium mb-4">Founder, Maruti Solutions</p>

              <p className="text-white/50 text-sm leading-relaxed mb-6">
                BBA Finance & Marketing Analytics student at CHRIST University, Delhi NCR. Building business solutions at the intersection of financial rigour and creative strategy.
              </p>

              {/* Credentials */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GraduationCap size={15} className="text-white/30 flex-shrink-0" />
                  <span className="text-white/50 text-sm">BBA — Finance & Marketing Analytics, CHRIST University</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase size={15} className="text-white/30 flex-shrink-0" />
                  <span className="text-white/50 text-sm">Finance Intern — Quality Enviro Engineers Ltd.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={15} className="text-white/30 flex-shrink-0" />
                  <span className="text-white/50 text-sm">VFX & Design — Arena Animation, RDC Ghaziabad</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <a
                  href="https://www.linkedin.com/in/arushhh24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Linkedin size={15} />
                  linkedin.com/in/arushhh24
                </a>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full" />
            </div>
          </motion.div>

          {/* Right: Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <span className="eyebrow block mb-5">The Founder</span>
              <h2
                className="font-heading font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em' }}
              >
                Built on the belief that
                <br />
                strategy and creativity
                <br />
                <span className="text-gradient-orange">belong together.</span>
              </h2>
            </div>

            {/* Vision */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-3">Vision</p>
              <p className="text-white/70 text-base leading-relaxed">
                To be the consultancy that small and growing businesses trust to make their most important decisions — one that understands finance, speaks marketing, and delivers creative work that competes with the best.
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-3">Mission</p>
              <p className="text-white/70 text-base leading-relaxed">
                To close the gap between strategic thinking and business results — bringing the analytical depth of finance, the reach of modern marketing, and the impact of premium design to every client we work with.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group"
            >
              Read the full story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
