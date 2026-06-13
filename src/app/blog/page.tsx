import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insights — Business, Finance & Strategy',
  description: 'Perspectives on finance, marketing strategy, and business growth from the Maruti Solutions team.',
}

const posts = [
  {
    slug: 'financial-analysis-for-founders',
    category: 'Finance',
    title: 'What Financial Analysis Actually Tells You (And What It Doesn\'t)',
    excerpt:
      'Most founders treat financial analysis as a compliance exercise. Here\'s how to use it as a strategic instrument instead.',
    date: 'December 2024',
    readTime: '6 min read',
    accent: '#3B82F6',
  },
  {
    slug: 'brand-strategy-for-smes',
    category: 'Marketing',
    title: 'Why Most SME Brands Fail to Differentiate — And How to Fix It',
    excerpt:
      'Differentiation isn\'t about being different for its own sake. It\'s about being meaningfully different to the right people.',
    date: 'November 2024',
    readTime: '5 min read',
    accent: '#FF7A00',
  },
  {
    slug: 'design-that-converts',
    category: 'Design',
    title: 'The Difference Between Design That Looks Good and Design That Converts',
    excerpt:
      'Beautiful design that doesn\'t serve a business goal is expensive decoration. Here\'s how to think about design as a commercial tool.',
    date: 'October 2024',
    readTime: '4 min read',
    accent: '#A855F7',
  },
  {
    slug: 'ma-for-growing-businesses',
    category: 'Finance',
    title: 'M&A Thinking for Businesses That Aren\'t Doing M&A',
    excerpt:
      'The analytical frameworks behind mergers and acquisitions are useful far beyond deal-making. Here\'s how to apply them to everyday business decisions.',
    date: 'September 2024',
    readTime: '7 min read',
    accent: '#3B82F6',
  },
  {
    slug: 'motion-in-brand-identity',
    category: 'VFX',
    title: 'Why Motion Has Become Non-Negotiable in Brand Identity',
    excerpt:
      'Static logos and still assets made sense in a print world. In 2024, motion is where brand personality actually lives.',
    date: 'August 2024',
    readTime: '4 min read',
    accent: '#10B981',
  },
]

export default function BlogPage() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="section-container relative z-10">
        <div className="mb-14">
          <span className="eyebrow block mb-5">Insights</span>
          <h1
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Thinking out loud
            <br />
            <span className="text-white/40">on business, strategy & craft.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl">
            Perspectives on financial analysis, marketing strategy, design thinking, and business growth.
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                      style={{
                        background: `${post.accent}12`,
                        borderColor: `${post.accent}30`,
                        color: `${post.accent}cc`,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-white/25 text-xs">{post.date}</span>
                    <span className="text-white/25 text-xs">·</span>
                    <span className="text-white/25 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="font-heading font-semibold text-white text-xl mb-2 leading-snug group-hover:text-white/90 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed max-w-2xl">{post.excerpt}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 group-hover:border-orange-500/40 group-hover:text-orange-400 transition-all duration-200">
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
