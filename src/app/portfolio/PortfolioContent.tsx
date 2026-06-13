'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Finance', 'Marketing', 'Design', 'VFX']

const portfolioItems = [
  {
    id: 1,
    category: 'Finance',
    title: 'M&A Financial Model — HDFC Bank Acquisition Scenario',
    challenge: 'Build a comprehensive 5-scenario M&A financial model for a hypothetical acquisition of AU Small Finance Bank, covering synergy analysis, integration costs, and valuation across multiple deal structures.',
    strategy: 'Applied DCF valuation, comparable company analysis, and precedent transaction benchmarks. Developed a dynamic Excel model with scenario toggles and integrated assumptions dashboard.',
    execution: 'Built an 800-row financial model with automated P&L, balance sheet, and cash flow projections. Created 5 premium deal scenarios ranging from synergy-heavy to capital-light structures.',
    outcome: 'Delivered a full investment-grade analysis document, model, and 30-slide presentation deck. Used as the primary CIA submission for Corporate Finance coursework.',
    tags: ['Financial Modelling', 'M&A', 'Excel', 'Valuation'],
    accent: '#3B82F6',
  },
  {
    id: 2,
    category: 'Finance',
    title: 'Consumer Trust & E-Commerce Research Study',
    challenge: 'Quantify the relationship between consumer trust dimensions and purchase intention on Indian e-commerce platforms using structural equation modelling.',
    strategy: 'Designed a primary research instrument using established trust scales. Planned for SEM analysis in SPSS AMOS to test a 4-construct model.',
    execution: 'Developed comprehensive questionnaire, data collection framework, and full SEM interpretation guide with path coefficients, factor loadings, and model fit indices.',
    outcome: 'Produced a complete research report with literature review, methodology, and analysis — accepted as CIA submission for Consumer Behaviour module.',
    tags: ['Research', 'SPSS', 'SEM', 'Marketing Analytics'],
    accent: '#10B981',
  },
  {
    id: 3,
    category: 'Design',
    title: 'Ganesh Enterprises — Digital Brand Overhaul',
    challenge: 'A 30-year-old signage company needed to compete for commercial contracts that required a credible digital presence — they had none.',
    strategy: 'Build a complete digital presence from scratch: website, product catalogue, and business intelligence foundation — all reflecting the company\'s experience and positioning.',
    execution: 'Designed and built a full website (deployed on Cloudflare Workers), HTML/SVG product catalogue with 12+ signage categories, competitor analysis report, and GeM registration guidance.',
    outcome: 'Live production website at ganesh-shine-studio.ps4kingarush.workers.dev. Business now has a credible digital foundation for B2B lead generation.',
    tags: ['Web Design', 'Brand Identity', 'HTML/CSS', 'Business Strategy'],
    accent: '#F59E0B',
  },
  {
    id: 4,
    category: 'Marketing',
    title: 'Maruti Solutions — Freelance Agency Launch',
    challenge: 'Build a complete freelance agency from scratch — brand, website, positioning, and outreach strategy — to attract international remote clients.',
    strategy: 'Positioned as a premium outcome-focused consultancy rather than a commodity freelance profile. Built outreach cadence for LinkedIn, Wellfound, and Upwork targeting small agencies and startup founders.',
    execution: 'Built 8-service website with premium design, developed CV with proof-point projects (M&A model, ML app, SEM study), and crafted outcome-focused pitch templates.',
    outcome: 'Production-ready agency brand with live website, optimised profiles across platforms, and active outreach pipeline.',
    tags: ['Brand Strategy', 'Digital Marketing', 'Positioning', 'Outreach'],
    accent: '#FF7A00',
  },
  {
    id: 5,
    category: 'Finance',
    title: 'Python Government Scheme Eligibility Checker',
    challenge: 'Create a usable tool that helps Indian citizens determine which government schemes they qualify for — a genuinely difficult eligibility matrix problem.',
    strategy: 'Built a GUI-based desktop application with logical eligibility rules covering income, category, age, occupation, and state — drawing from a structured Word document database.',
    execution: 'Built full Python app with Tkinter GUI, eligibility logic engine, and docx-powered database. Clean UX with category filters and detailed scheme descriptions.',
    outcome: 'Functional desktop app covering 20+ schemes across agriculture, education, welfare, and business categories. Submitted as CIA deliverable for Programming module.',
    tags: ['Python', 'Tkinter', 'Data Analysis', 'Product Build'],
    accent: '#8B5CF6',
  },
  {
    id: 6,
    category: 'Finance',
    title: 'Econometrics Study — GDP & FDI Panel Data Analysis',
    challenge: 'Analyse the relationship between FDI inflows and GDP growth using panel econometric methods and time series modelling on Indian macroeconomic data.',
    strategy: 'Applied pooled OLS, fixed effects, and random effects models. Ran ARIMA forecasting for GDP projections with diagnostics.',
    execution: 'Full R-based analysis with proper heteroskedasticity correction, Hausman test for model selection, unit root testing, and ARIMA model identification.',
    outcome: 'Comprehensive econometrics report with code, interpretation, and policy implications. CIA submission for Econometrics module.',
    tags: ['R', 'Econometrics', 'Panel Data', 'ARIMA'],
    accent: '#06B6D4',
  },
]

export function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeCategory)

  return (
    <section className="py-12 pb-24">
      <div className="section-container">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                        style={{
                          background: `${item.accent}12`,
                          borderColor: `${item.accent}30`,
                          color: `${item.accent}cc`,
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-white text-lg leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs text-white/30 bg-white/[0.04] px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-200"
                      style={{ transform: expanded === item.id ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <span className="text-white/40 text-sm leading-none">+</span>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expanded === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-white/[0.05]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                          {[
                            { label: 'Challenge', text: item.challenge, color: '#EF4444' },
                            { label: 'Strategy', text: item.strategy, color: '#3B82F6' },
                            { label: 'Execution', text: item.execution, color: '#FF7A00' },
                            { label: 'Outcome', text: item.outcome, color: '#10B981' },
                          ].map((block) => (
                            <div key={block.label} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-3 rounded-full" style={{ background: block.color }} />
                                <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: `${block.color}99` }}>
                                  {block.label}
                                </span>
                              </div>
                              <p className="text-white/55 text-sm leading-relaxed">{block.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
