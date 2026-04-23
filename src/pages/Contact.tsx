import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { supabase } from '@/config/supabase'
import { brand } from '@/config/brand'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', enquiry_type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setError('Please fill in name, email and message.'); return }
    setLoading(true); setError('')
    const { error: err } = await supabase.from('contact_submissions').insert([{ ...form, created_at: new Date().toISOString() }])
    setLoading(false)
    if (err) {
      const msg = `Hi African Peninsula! I'd like to enquire about: ${form.enquiry_type || 'General'}.\n\nMessage: ${form.message}\n\nName: ${form.name}\nPhone: ${form.phone}`
      window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    }
    setSuccess(true)
    setForm({ name: '', phone: '', email: '', enquiry_type: '', message: '' })
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Get in Touch</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
        <p className="mt-3 text-white/70">We're open daily from 06:30. Come find us on the Bluff.</p>
      </div>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl md:grid md:grid-cols-2 md:gap-14">
          {/* Contact info */}
          <div className="mb-10 md:mb-0">
            <h2 className="mb-7 font-heading text-2xl font-bold" style={{ color: brand.colors.primary }}>Find Us</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: brand.colors.accent }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-semibold" style={{ color: brand.colors.primary }}>Address</div>
                  <p className="text-sm text-gray-500">{brand.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: brand.colors.accent }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-semibold" style={{ color: brand.colors.primary }}>Phone & WhatsApp</div>
                  <a href={`tel:${brand.phone}`} className="text-sm text-gray-500 hover:underline">{brand.phoneDisplay}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: brand.colors.accent }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-semibold" style={{ color: brand.colors.primary }}>Email</div>
                  <a href={`mailto:${brand.email}`} className="text-sm text-gray-500 hover:underline">{brand.email}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: brand.colors.accent }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div className="mb-1 text-sm font-semibold" style={{ color: brand.colors.primary }}>Hours</div>
                  <p className="text-sm text-gray-500">Restaurant: {brand.hoursRestaurant}</p>
                  <p className="text-sm text-gray-500">Check-in: {brand.checkIn} · Check-out: {brand.checkOut}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <iframe
                src={brand.mapEmbed}
                className="h-56 w-full rounded-xl shadow-sm"
                loading="lazy" title="African Peninsula map" style={{ border: 0 }}
                allowFullScreen
              />
            </div>

            {/* Quick actions */}
            <div className="mt-6 flex flex-col gap-3">
              <a href={`https://wa.me/${brand.whatsapp}?text=Hi, I'd like to enquire about African Peninsula.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white"
                style={{ background: brand.colors.wa }}>
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.532 5.858L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.515-5.192-1.414l-.37-.22-3.833 1-1.018-3.723-.242-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp Us Now
              </a>
              <a href={`tel:${brand.phone}`}
                className="flex items-center justify-center gap-2 rounded-full border-2 py-3.5 text-sm font-bold"
                style={{ borderColor: brand.colors.primary, color: brand.colors.primary }}>
                <Phone size={15} /> Call {brand.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="mb-7 font-heading text-2xl font-bold" style={{ color: brand.colors.primary }}>Send a Message</h2>
            {success ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: brand.colors.secondary }}>
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-heading text-lg font-bold mb-2" style={{ color: brand.colors.primary }}>Message Received!</h3>
                <p className="text-sm text-gray-500">We'll get back to you within 2 hours.</p>
                <button onClick={() => setSuccess(false)} className="mt-4 text-sm underline" style={{ color: brand.colors.accent }}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Name *</label>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Enquiry Type</label>
                  <select value={form.enquiry_type} onChange={e => set('enquiry_type', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2">
                    <option value="">Select type</option>
                    <option>Room Booking</option>
                    <option>Restaurant Reservation</option>
                    <option>Catering / Events</option>
                    <option>Sunday Buffet</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Message *</label>
                  <textarea rows={5} value={form.message} onChange={e => set('message', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-full py-4 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: brand.colors.accent }}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
