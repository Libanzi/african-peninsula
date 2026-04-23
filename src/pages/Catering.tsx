import { useState } from 'react'
import { brand } from '@/config/brand'

const PACKAGES = [
  { id: 'basic', name: 'Basic', price: 180, desc: 'Buffet-style · 3 mains · 2 salads · 1 dessert' },
  { id: 'standard', name: 'Standard', price: 250, desc: '4 mains · 3 salads · 2 desserts · Soft drinks' },
  { id: 'premium', name: 'Premium', price: 380, desc: 'Full spread · Bar service · Wait staff · Décor' },
  { id: 'custom', name: 'Custom', price: 0, desc: 'Tailored to your exact requirements' },
]

export default function Catering() {
  const [form, setForm] = useState({
    contact_name: '', contact_phone: '', contact_email: '',
    event_type: '', event_date: '', guest_count: 20,
    venue: 'at-property', venue_address: '',
    package_type: 'standard', dietary_notes: '', service_style: 'buffet',
    special_requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const selectedPkg = PACKAGES.find(p => p.id === form.package_type)
  const estimateMin = selectedPkg && selectedPkg.price > 0 ? selectedPkg.price * form.guest_count : 0
  const estimateMax = estimateMin ? Math.round(estimateMin * 1.1) : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pkg = selectedPkg?.name || 'Custom'
    const msg = `Hi, I'd like a catering quote from African Peninsula.\n\nEvent: ${form.event_type}\nDate: ${form.event_date}\nGuests: ${form.guest_count}\nVenue: ${form.venue === 'at-property' ? 'At African Peninsula' : form.venue_address}\nPackage: ${pkg}\nService style: ${form.service_style}\nDietary notes: ${form.dietary_notes || 'None'}\nSpecial requests: ${form.special_requests || 'None'}\n\nContact: ${form.contact_name} · ${form.contact_phone} · ${form.contact_email}`
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) return (
    <main className="flex min-h-screen items-center justify-center pt-16 px-4">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: brand.colors.primary }}>Enquiry Sent!</h1>
        <p className="text-gray-600 mb-6">Your catering enquiry has been sent via WhatsApp. Our team will get back to you within 2 hours with a detailed quote.</p>
        <a href="/" className="inline-block rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: brand.colors.accent }}>Back to Home</a>
      </div>
    </main>
  )

  return (
    <main className="pt-16">
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Private Events</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Catering & Functions</h1>
        <p className="mt-3 text-white/70">Weddings · Corporate Functions · Birthdays · Funerals · Galas · Intimate Gatherings</p>
      </div>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl lg:flex lg:gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[['contact_name','Full Name','text'],['contact_phone','Phone','tel'],['contact_email','Email','email']].map(([k,label,type]) => (
                <div key={k} className={k === 'contact_email' ? 'sm:col-span-2' : ''}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">{label} *</label>
                  <input type={type} value={(form as Record<string, unknown>)[k] as string}
                    onChange={e => set(k, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Event Type *</label>
                <select value={form.event_type} onChange={e => set('event_type', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none">
                  <option value="">Select</option>
                  <option>Wedding</option><option>Corporate Function</option><option>Birthday</option>
                  <option>Funeral</option><option>Gala</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Event Date</label>
                <input type="date" value={form.event_date} onChange={e => set('event_date', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Guest Count (min 20)</label>
                <input type="number" min={20} value={form.guest_count} onChange={e => set('guest_count', Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
              </div>
            </div>

            {/* Package */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Package</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PACKAGES.map(pkg => (
                  <label key={pkg.id} className={`cursor-pointer rounded-xl border-2 p-3 transition-all text-center ${form.package_type === pkg.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="package" value={pkg.id} checked={form.package_type === pkg.id}
                      onChange={() => set('package_type', pkg.id)} className="sr-only" />
                    <div className="font-heading text-sm font-bold" style={{ color: brand.colors.primary }}>{pkg.name}</div>
                    {pkg.price > 0 && <div className="text-xs font-bold mt-0.5" style={{ color: brand.colors.accent }}>R{pkg.price}pp</div>}
                    <div className="text-xs text-gray-400 mt-1">{pkg.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Service Style</label>
                <select value={form.service_style} onChange={e => set('service_style', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none">
                  <option>Buffet</option><option>Plated</option><option>Cocktail</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Venue</label>
                <select value={form.venue} onChange={e => set('venue', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none">
                  <option value="at-property">At African Peninsula</option>
                  <option value="client-venue">At my venue</option>
                </select>
              </div>
            </div>

            {form.venue === 'client-venue' && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Venue Address</label>
                <input type="text" value={form.venue_address} onChange={e => set('venue_address', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Dietary Requirements</label>
              <input type="text" placeholder="e.g. Halaal, Vegetarian, Nut allergy" value={form.dietary_notes}
                onChange={e => set('dietary_notes', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Special Requests</label>
              <textarea rows={3} value={form.special_requests} onChange={e => set('special_requests', e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
            </div>

            <button type="submit"
              className="w-full rounded-full py-4 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: brand.colors.accent }}>
              Get My Catering Quote via WhatsApp
            </button>
          </form>

          {/* Estimate panel */}
          <div className="mt-8 lg:mt-0 lg:w-64 lg:shrink-0">
            <div className="sticky top-24 rounded-2xl p-6" style={{ background: brand.colors.secondary }}>
              <h3 className="mb-4 font-heading text-base font-bold" style={{ color: brand.colors.primary }}>Live Estimate</h3>
              {estimateMin > 0 ? (
                <>
                  <div className="mb-2 text-center">
                    <div className="font-heading text-2xl font-extrabold" style={{ color: brand.colors.accent }}>
                      R{estimateMin.toLocaleString()}–R{estimateMax.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Estimated total</div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mt-4">
                    <div className="flex justify-between"><span>Package</span><span className="font-medium">{selectedPkg?.name}</span></div>
                    <div className="flex justify-between"><span>Per person</span><span className="font-medium">R{selectedPkg?.price}</span></div>
                    <div className="flex justify-between"><span>Guests</span><span className="font-medium">{form.guest_count}</span></div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">Select a package and guest count to see your estimate.</p>
              )}
              <p className="mt-4 text-xs text-gray-400">Final quote confirmed by our team after reviewing your requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
