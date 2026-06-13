import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/services#financial', label: 'Financial Consulting' },
    { href: '/services#marketing', label: 'Marketing Solutions' },
    { href: '/services#design', label: 'Graphic Design' },
    { href: '/services#vfx', label: 'VFX Services' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-[#020a18] border-t border-white/[0.06]">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-8 h-8 rounded-sm bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-heading">M</span>
              </div>
              <span className="font-heading font-semibold text-white text-lg tracking-tight">
                MARUTI SOLUTIONS
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              Strategic Finance. Growth Marketing. Creative Execution. Helping ambitious businesses make better decisions and grow faster.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:Arushhh.work@gmail.com"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={15} className="text-orange-500 flex-shrink-0" />
                Arushhh.work@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin size={15} className="text-orange-500 flex-shrink-0" />
                Delhi NCR, India
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://www.linkedin.com/in/arushhh24/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://wa.me/918178693838"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="https://www.instagram.com/arushhh.24_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                Services
              </p>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                Company
              </p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                Work With Us
              </p>
              <ul className="space-y-3">
                <li>
                  <Link href="/book" className="text-sm text-white/50 hover:text-white transition-colors">
                    Book Consultation
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-sm text-white/50 hover:text-white transition-colors">
                    Submit a Project
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">
                    Get in Touch
                  </Link>
                </li>
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/30 hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Maruti Solutions. All rights reserved. Founded by Arush Prakash.
          </p>
          <p className="text-xs text-white/20">
            Delhi NCR, India
          </p>
        </div>
      </div>
    </footer>
  )
}
