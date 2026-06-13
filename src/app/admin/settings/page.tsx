'use client'

import { useState } from 'react'
import { CheckCircle, Save, ExternalLink } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading font-bold text-white text-2xl mb-1">Settings</h1>
        <p className="text-white/40 text-sm">Site and notification configuration</p>
      </div>

      {/* Business info */}
      <form onSubmit={handleSave} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
        <h2 className="font-heading font-semibold text-white text-lg mb-4">Business Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Business Name</label>
            <input defaultValue="Maruti Solutions" className="input-premium" />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Founder</label>
            <input defaultValue="Arush Prakash" className="input-premium" />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Contact Email</label>
            <input defaultValue="Arushhh.work@gmail.com" type="email" className="input-premium" />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Location</label>
            <input defaultValue="Delhi NCR, India" className="input-premium" />
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06]">
          <h3 className="font-medium text-white/70 text-sm mb-3">Email Notifications</h3>
          <div className="space-y-2">
            {[
              { label: 'New appointment booked', checked: true },
              { label: 'New project submitted', checked: true },
              { label: 'New contact enquiry', checked: true },
              { label: 'Weekly digest', checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span className="text-white/60 text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="btn-primary text-sm py-2.5 px-6">
            {saved ? <><CheckCircle size={15} /> Saved</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </form>

      {/* Environment info */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="font-heading font-semibold text-white text-lg mb-4">Environment & Integrations</h2>
        <div className="space-y-3">
          {[
            { label: 'Supabase', status: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Connected' : 'Not configured', ok: !!process.env.NEXT_PUBLIC_SUPABASE_URL },
            { label: 'Resend Email', status: 'Configure via .env', ok: false },
            { label: 'Netlify', status: 'Deploy via Netlify dashboard', ok: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
              <span className="text-white/60 text-sm">{item.label}</span>
              <span className={`text-xs font-medium ${item.ok ? 'text-green-400' : 'text-yellow-400'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="font-heading font-semibold text-white text-lg mb-4">External Resources</h2>
        <div className="space-y-2">
          {[
            { label: 'Supabase Dashboard', href: 'https://app.supabase.com' },
            { label: 'Resend Dashboard', href: 'https://resend.com/dashboard' },
            { label: 'Netlify Dashboard', href: 'https://app.netlify.com' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0 text-white/50 hover:text-white transition-colors group"
            >
              <span className="text-sm">{link.label}</span>
              <ExternalLink size={13} className="group-hover:text-orange-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
