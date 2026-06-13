import { HeroSection } from '@/components/sections/HeroSection'
import { DomainsSection } from '@/components/sections/DomainsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WhySection } from '@/components/sections/WhySection'
import { FounderSection } from '@/components/sections/FounderSection'
import { CTASection } from '@/components/sections/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maruti Solutions — Strategic Finance. Growth Marketing. Creative Execution.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DomainsSection />
      <ProcessSection />
      <WhySection />
      <FounderSection />
      <CTASection />
    </>
  )
}
