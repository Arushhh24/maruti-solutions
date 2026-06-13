import type { Metadata } from 'next'
import { FounderSection } from '@/components/sections/FounderSection'
import { WhySection } from '@/components/sections/WhySection'
import { CTASection } from '@/components/sections/CTASection'
import { AboutHero } from './AboutHero'
import { ValuesSection } from './ValuesSection'

export const metadata: Metadata = {
  title: 'About — Arush Prakash & Maruti Solutions',
  description: 'The story behind Maruti Solutions — a business consultancy built on financial rigour, strategic marketing, and premium creative execution.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderSection />
      <ValuesSection />
      <WhySection />
      <CTASection />
    </>
  )
}
