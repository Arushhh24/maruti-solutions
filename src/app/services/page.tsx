import type { Metadata } from 'next'
import { ServiceHero } from './ServiceHero'
import { ServiceDetails } from './ServiceDetails'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Services — Financial Consulting, Marketing, Design & VFX',
  description:
    'Four core capabilities: Financial Consulting, Marketing Solutions, Graphic Design, and VFX Services. Strategic, data-driven, and built for ambitious businesses.',
}

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServiceDetails />
      <CTASection />
    </>
  )
}
