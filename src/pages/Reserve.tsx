import { useState } from 'react'
import { supabase } from '@/config/supabase'
import { brand } from '@/config/brand'

const TIMES = ['06:30','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']

export default function Reserve() {
  const [form, setForm] = useState({ guest_name:'', guest_email:'', guest_phone:'', party_size:2, reservation_date:'', reservation_time:'12:00', occasion:'', special_requests:'' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.guest_name || !form.guest_email || !form.guest_phone || !form.reservation_date) {
      setError('Please fill in all required fields.'); return
    }
    setLoading(true); setError('')
    const { error: err } = await supabase.from('reservations').insert([{ ...form, status: 'pending' }])
    setLoading(false)
    if (err) {
      // Fallback: open WhatsApp if Supabase not configured
      const msg = `Hi, I'd like to reserve a table for ${form.party_size} on ${form.reservation_date} at ${form.reservation_time}. Name: ${form.guest_name}. Phone: ${form.guest_phone}.`
      window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
      setSuccess(true)
    } else {
      setSuccess(true)
    }
  }

  if (success) return (
    <main className="flex min-h-screen items-center justify-center pt-16 px-4" style={{ background: brand.colors.secondary }}>
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: brand.colors.primary }}>Reservation Received!</h1>
        <p className="text-gray-600 mb-6">We'll confirm your table via WhatsApp or email within 2 hours.</p>
        <a href="/" className="inline-block rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: brand.colors.primary }}>Back to Home</a>
      </div>
    </main>
  )

  return (
    <main className="pt-16">
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Dine With Us</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Reserve a Table</h1>
        <p className="mt-3 text-white/70">Restaurant open daily 06:30–21:30 · {brand.address}</p>
      </div>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
                <input type="text" placeholder="Your name" value={form.guest_name}
                  onChange={e => set('guest_name', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': brand.colors.accent } as React.CSSProperties} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone *</label>
                <input type="tel" placeholder="+27 XXX XXX XXXX" value={form.guest_phone}
                  onChange={e => set('guest_phone', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" placeholder="your@email.com" value={form.guest_email}
                onChange={e => set('guest_email', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Date *</label>
                <input type="date" min={today} value={form.reservation_date}
                  onChange={e => set('reservation_date', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Time *</label>
                <select value={form.reservation_time} onChange={e => set('reservation_time', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2">
                  {TIMES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Party Size *</label>
                <select value={form.party_size} onChange={e => set('party_size', Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2">
                  {[...Array(20)].map((_, i) => <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'person' : 'people'}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Occasion (optional)</label>
              <select value={form.occasion} onChange={e => set('occasion', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2">
                <option value="">Select occasion</option>
                <option>Birthday</option><option>Anniversary</option><option>Business</option><option>Romantic Dinner</option><option>Family Gathering</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Special Requests</label>
              <textarea rows={3} placeholder="Dietary requirements, seating preferences, allergies..." value={form.special_requests}
                onChange={e => set('special_requests', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
            </div>
            {form.party_size > 8 && (
              <div className="rounded-xl bg-orange-50 p-4 text-sm" style={{ color: brand.colors.accent }}>
                ℹ️ Groups of 9+ require confirmation from our team. We'll contact you within 2 hours.
              </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full rounded-full py-4 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: brand.colors.accent }}>
              {loading ? 'Reserving...' : 'Reserve My Table'}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-gray-400">
            Or WhatsApp us directly:{' '}
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="font-medium" style={{ color: brand.colors.wa }}>
              {brand.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
