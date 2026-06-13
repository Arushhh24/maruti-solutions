import type { Metadata } from 'next'
import { ProjectForm } from './ProjectForm'

export const metadata: Metadata = {
  title: 'Submit a Project',
  description: 'Tell us about your project. We review every submission within 48 hours.',
}

export default function SubmitPage() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <span className="eyebrow block mb-4">Submit a Project</span>
            <h1
              className="font-heading font-bold text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Tell us what you're building.
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-xl">
              Share your project brief and we'll review it within 48 hours. The more detail you provide, the faster we can respond with a proper proposal.
            </p>
          </div>
          <ProjectForm />
        </div>
      </div>
    </section>
  )
}
