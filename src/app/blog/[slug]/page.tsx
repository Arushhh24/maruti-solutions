import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

const posts: Record<string, {
  category: string
  title: string
  date: string
  readTime: string
  accent: string
  content: string
}> = {
  'financial-analysis-for-founders': {
    category: 'Finance',
    title: "What Financial Analysis Actually Tells You (And What It Doesn't)",
    date: 'December 2024',
    readTime: '6 min read',
    accent: '#3B82F6',
    content: `
Most founders look at their financial statements the way most people read terms and conditions: they know they should, they do it occasionally, and they don't get much from it.

That's a problem — but the solution isn't to read them more carefully. It's to understand what they're actually designed to tell you.

**What financial statements capture**

Your P&L tells you whether you made money over a period. Your balance sheet tells you the financial state of the business at a point in time. Your cash flow statement tells you where cash actually came from and went.

Together, they answer three questions: *Are we profitable? Do we have resources? Are we generating real cash?*

Those are important questions. But they're backward-looking. And most business decisions are forward-looking.

**The gap between reporting and strategy**

Here's the thing: financial statements are designed for external stakeholders — investors, lenders, tax authorities. They're structured around accounting conventions that don't always align with how you actually run the business.

For strategic decisions, you need different lenses:

- **Unit economics**: What does it cost to acquire and serve one customer? What's the lifetime value?
- **Contribution margin**: Which products or services are actually profitable after direct costs?
- **Cash conversion cycle**: How long between spending money and receiving money?
- **Break-even analysis**: At what revenue level do fixed costs get covered?

None of these appear as line items in a standard P&L.

**What it actually doesn't tell you**

Financial statements don't tell you:
- Whether your growth is sustainable
- Which customers are worth keeping
- Where your competitive position is eroding
- What the next 12 months will look like

For those questions, you need modelling and forward analysis — not just reporting.

**The practical implication**

The goal of financial analysis isn't compliance or comfort. It's decision support. Every time you look at a number, the right question is: *what decision does this inform?*

If you can't answer that, you're reading the wrong number.
    `,
  },
  'brand-strategy-for-smes': {
    category: 'Marketing',
    title: "Why Most SME Brands Fail to Differentiate — And How to Fix It",
    date: 'November 2024',
    readTime: '5 min read',
    accent: '#FF7A00',
    content: `
Ask most small business owners what makes them different, and you'll hear some version of: "We really care about our customers." Or: "We have 20 years of experience." Or: "We do quality work."

These aren't differentiators. They're minimum requirements.

**The root cause**

Most SME brands don't differentiate because they've confused positioning with description. They describe what they do and how long they've done it, rather than staking out a specific claim about *who they're for* and *what they specifically do better than the alternatives*.

The fear is that narrowing the positioning will exclude potential customers. In practice, the opposite is true.

**Why specificity wins**

Broad positioning feels safer — "we serve all businesses" — but it's invisible. There's no mental hook for a prospect to grab onto.

Specific positioning — "we help early-stage D2C brands build the financial infrastructure to raise their first institutional round" — is memorable, credible, and self-qualifying. The right people recognise themselves in it.

**The positioning question that actually matters**

Instead of: *What do we offer?*
Ask: *For whom, and against what alternatives, do we win — and why?*

That framing forces clarity on three things: your target customer, your competitive set, and your actual advantage.

**How to find your differentiation**

Start with your best clients — not your average clients. Look at where you've consistently outperformed and what that work had in common. That's usually where the real positioning lives.

Then ask: can I articulate this in one sentence that would make the right people say "that's exactly what I need"?

If you can, you have a positioning worth building on.
    `,
  },
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/\*\*/g, ''),
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text
      .trim()
      .split('\n\n')
      .map((para, i) => {
        if (para.startsWith('**') && para.endsWith('**') && para.split('\n').length === 1) {
          return (
            <h3 key={i} className="font-heading font-semibold text-white text-xl mt-8 mb-3">
              {para.replace(/\*\*/g, '')}
            </h3>
          )
        }
        if (para.startsWith('- ')) {
          return (
            <ul key={i} className="space-y-2 my-4">
              {para.split('\n').map((line, j) => (
                <li key={j} className="flex items-start gap-2 text-white/60 text-base leading-relaxed">
                  <span className="text-orange-500 mt-1.5 text-xs">▪</span>
                  <span dangerouslySetInnerHTML={{
                    __html: line.replace(/^- /, '').replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')
                  }} />
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p
            key={i}
            className="text-white/60 text-base leading-[1.8] mb-0"
            dangerouslySetInnerHTML={{
              __html: para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')
            }}
          />
        )
      })
  }

  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
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

            <h1
              className="font-heading font-bold text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.025em' }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/20 flex items-center justify-center">
                <span className="text-orange-400 font-bold text-xs">AP</span>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Arush Prakash</p>
                <p className="text-white/30 text-xs">Founder, Maruti Solutions</p>
              </div>
            </div>
          </div>

          <div
            className="h-px mb-10"
            style={{ background: `linear-gradient(to right, ${post.accent}40, transparent)` }}
          />

          <div className="prose-custom space-y-5">
            {renderContent(post.content)}
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.06] rounded-2xl border border-orange-500/15 bg-orange-500/[0.03] p-6 mt-10">
            <p className="text-orange-400 text-sm font-semibold mb-2">Want to apply this to your business?</p>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Book a free consultation and we'll work through your specific situation together.
            </p>
            <Link href="/book" className="btn-primary text-sm py-2.5 px-6">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
