import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { Mail, MapPin, Clock, Linkedin, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Get in Touch',
  description: 'Reach out to Maruti Solutions. We respond to all enquiries within 48 hours.',
}

export default function ContactPage() {
  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div className="lg:col-span-4">
            <span className="eyebrow block mb-5">Contact</span>
            <h1
              className="font-heading font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Let's talk about
              your business.
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Whether you have a specific project in mind or just want to explore what's possible, we're happy to have the conversation.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:Arushhh.work@gmail.com"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.06] transition-all">
                  <Mail size={16} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">
                    Arushhh.work@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-white/40" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-white/70 text-sm">Delhi NCR, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-white/40" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">Response Time</p>
                  <p className="text-white/70 text-sm">Within 48 hours</p>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/arushhh24/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.06] transition-all">
                  <Linkedin size={16} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">LinkedIn</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">
                    arush-prakash-198418249
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/918178693838"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.06] transition-all">
                  <MessageCircle size={16} className="text-white/40 group-hover:text-orange-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">
                    +91 8178693838
                  </p>
                </div>
              </a>
            </div>

            {/* Note */}
            <div className="mt-10 rounded-xl border border-orange-500/15 bg-orange-500/[0.04] p-5">
              <p className="text-orange-400 text-xs font-semibold mb-1">First consultation is free</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Not sure what service fits your situation? Book a free 30-minute call and we'll figure it out together.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
