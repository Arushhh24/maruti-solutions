import type { Metadata } from 'next'
import { PortfolioContent } from './PortfolioContent'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Portfolio — Case Studies & Projects',
  description: 'Explore our portfolio of financial consulting, marketing strategy, graphic design, and VFX projects.',
}

export default function PortfolioPage() {
  return (
    <>
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="section-container relative z-10">
          <span className="eyebrow block mb-5">Portfolio</span>
          <h1
            className="font-heading font-bold text-white mb-6 leading-[1.06]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Projects that
            <br />
            <span className="text-gradient-orange">moved the needle.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl">
            Each project below tells the full story: the challenge, the strategy, the execution, and the outcome.
          </p>
        </div>
      </section>
      <PortfolioContent />
      <CTASection />
    </>
  )
}
