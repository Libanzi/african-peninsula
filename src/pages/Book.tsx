import { useState } from 'react'
import { brand } from '@/config/brand'

const ROOMS = [
  { slug: 'ocean-view-standard', name: 'Ocean View Standard', price: 1200, type: 'Standard' },
  { slug: 'garden-view-standard', name: 'Garden View Standard', price: 950, type: 'Standard' },
  { slug: 'ocean-view-deluxe', name: 'Ocean View Deluxe', price: 1500, type: 'Deluxe' },
  { slug: 'family-room', name: 'Family Room', price: 1800, type: 'Family' },
  { slug: 'ocean-suite', name: 'Ocean Suite', price: 2200, type: 'Suite' },
]

export default function Book() {
  const params = new URLSearchParams(window.location.search)
  const preSelected = params.get('room') || ''

  const [step, setStep] = useState(1)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [roomSlug, setRoomSlug] = useState(preSelected)
  const [form, setForm] = useState({ guest_name:'', guest_email:'', guest_phone:'', guests:1, special_requests:'' })
  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const selectedRoom = ROOMS.find(r => r.slug === roomSlug)
  const nights = checkIn && checkOut ? Math.max(0, (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000) : 0
  const total = selectedRoom ? nights * selectedRoom.price : 0

  const handleFinalSubmit = () => {
    const msg = `Hi, I'd like to book the ${selectedRoom?.name} room from ${checkIn} to ${checkOut} (${nights} nights) for ${form.guests} guest(s). Name: ${form.guest_name}. Phone: ${form.guest_phone}. Email: ${form.guest_email}. Special requests: ${form.special_requests || 'None'}.`
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) return (
    <main className="flex min-h-screen items-center justify-center pt-16 px-4">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">🏡</div>
        <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: brand.colors.primary }}>Booking Request Sent!</h1>
        <p className="text-gray-600 mb-2">Your booking details have been sent via WhatsApp.</p>
        <p className="text-gray-500 text-sm mb-6">We'll confirm availability and payment within 2 hours.</p>
        <a href="/rooms" className="inline-block rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: brand.colors.accent }}>View All Rooms</a>
      </div>
    </main>
  )

  return (
    <main className="pt-16">
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Best Rate Guaranteed</p>
        <h1 className="font-heading text-4xl font-bold text-white">Book Your Room</h1>
      </div>

      {/* Progress indicator */}
      <div className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-xl items-center justify-center gap-3">
          {[['1', 'Dates'], ['2', 'Room'], ['3', 'Details']].map(([num, label], i) => (
            <div key={num} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= i+1 ? 'text-white' : 'bg-gray-100 text-gray-400'}`}
                style={step >= i+1 ? { background: brand.colors.accent } : {}}>
                {num}
              </div>
              <span className={`text-sm font-medium ${step >= i+1 ? '' : 'text-gray-400'}`}
                style={step >= i+1 ? { color: brand.colors.primary } : {}}>
                {label}
              </span>
              {i < 2 && <div className="mx-2 h-px w-8 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="mx-auto max-w-xl space-y-5">
          {/* Step 1 — Dates */}
          {step === 1 && (
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h2 className="mb-6 font-heading text-xl font-bold" style={{ color: brand.colors.primary }}>Choose Your Dates</h2>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Check-in *</label>
                  <input type="date" min={today} value={checkIn} onChange={e => setCheckIn(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Check-out *</label>
                  <input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2" />
                </div>
              </div>
              {nights > 0 && (
                <div className="mb-4 rounded-xl bg-orange-50 p-4 text-center text-sm font-medium" style={{ color: brand.colors.accent }}>
                  {nights} night{nights > 1 ? 's' : ''} selected
                </div>
              )}
              <button onClick={() => setStep(2)} disabled={!checkIn || !checkOut || nights < 1}
                className="w-full rounded-full py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: brand.colors.accent }}>
                Choose Room →
              </button>
            </div>
          )}

          {/* Step 2 — Room */}
          {step === 2 && (
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h2 className="mb-6 font-heading text-xl font-bold" style={{ color: brand.colors.primary }}>Select Your Room</h2>
              <div className="space-y-3 mb-6">
                {ROOMS.map(room => (
                  <label key={room.slug} className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${roomSlug === room.slug ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="room" value={room.slug} checked={roomSlug === room.slug}
                        onChange={() => setRoomSlug(room.slug)} className="accent-orange-500" />
                      <div>
                        <div className="font-heading text-sm font-bold" style={{ color: brand.colors.primary }}>{room.name}</div>
                        <div className="text-xs text-gray-400">{room.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm" style={{ color: brand.colors.accent }}>R{(room.price * nights).toLocaleString()}</div>
                      <div className="text-xs text-gray-400">R{room.price}/night × {nights}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 rounded-full border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">← Back</button>
                <button onClick={() => setStep(3)} disabled={!roomSlug}
                  className="flex-1 rounded-full py-3 text-sm font-bold text-white disabled:opacity-40"
                  style={{ background: brand.colors.accent }}>
                  Guest Details →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Details */}
          {step === 3 && (
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h2 className="mb-6 font-heading text-xl font-bold" style={{ color: brand.colors.primary }}>Your Details</h2>
              <div className="space-y-4 mb-6">
                {[['guest_name','Full Name','text'],['guest_email','Email','email'],['guest_phone','Phone','tel']].map(([k,label,type]) => (
                  <div key={k}>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">{label} *</label>
                    <input type={type} value={(form as Record<string,unknown>)[k] as string}
                      onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
                  </div>
                ))}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Guests</label>
                  <select value={form.guests} onChange={e => setForm(f => ({ ...f, guests: Number(e.target.value) }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none">
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n} guest{n>1?'s':''}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Special Requests</label>
                  <textarea rows={2} value={form.special_requests} onChange={e => setForm(f => ({ ...f, special_requests: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6 rounded-xl p-4" style={{ background: brand.colors.secondary }}>
                <h3 className="mb-3 font-heading text-sm font-bold" style={{ color: brand.colors.primary }}>Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Room</span><span className="font-medium">{selectedRoom?.name}</span></div>
                  <div className="flex justify-between"><span>Check-in</span><span className="font-medium">{checkIn}</span></div>
                  <div className="flex justify-between"><span>Check-out</span><span className="font-medium">{checkOut}</span></div>
                  <div className="flex justify-between"><span>{nights} nights × R{selectedRoom?.price}</span><span className="font-bold" style={{ color: brand.colors.accent }}>R{total.toLocaleString()}</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 rounded-full border border-gray-200 py-3 text-sm font-medium text-gray-600">← Back</button>
                <button onClick={handleFinalSubmit} disabled={!form.guest_name || !form.guest_phone}
                  className="flex-1 rounded-full py-3 text-sm font-bold text-white disabled:opacity-40"
                  style={{ background: brand.colors.accent }}>
                  Send Booking via WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
