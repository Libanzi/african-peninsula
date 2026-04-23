import { brand } from '@/config/brand'

export default function Events() {
  return (
    <main className="pt-16">
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Every Week</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Events at African Peninsula</h1>
        <p className="mt-3 text-white/70">Sunday Buffet, whale season sundowners, and private functions.</p>
      </div>

      {/* Sunday Buffet — pinned */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl md:flex">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=75"
                alt="Sunday Buffet at African Peninsula"
                className="h-72 w-full object-cover md:h-full" />
            </div>
            <div className="flex flex-col justify-center p-8 md:w-1/2">
              <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ background: brand.colors.accent }}>
                📅 Every Sunday · 12:00–15:00
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl" style={{ color: brand.colors.primary }}>Sunday Buffet</h2>
              <p className="mb-5 leading-relaxed text-gray-600">
                Durban's finest all-you-can-eat Sunday experience. Special Prawn Curry, Lamb Curry,
                Roast Lamb, Roast Chicken, Beef Riblets, Chicken Skewers — all served with the
                Indian Ocean as your backdrop.
              </p>
              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                {['Special Prawn Curry', 'Lamb Curry', 'Roast Lamb', 'Roast Chicken', 'Beef Riblets', 'Chicken Skewers'].map(dish => (
                  <div key={dish} className="flex items-center gap-2 text-gray-600">
                    <span style={{ color: brand.colors.accent }}>✓</span> {dish}
                  </div>
                ))}
              </div>
              <div className="mb-6 flex gap-4 text-sm">
                <div className="rounded-xl bg-orange-50 p-3 text-center">
                  <div className="font-heading text-xl font-bold" style={{ color: brand.colors.accent }}>R350</div>
                  <div className="text-xs text-gray-500">Adult</div>
                </div>
                <div className="rounded-xl bg-orange-50 p-3 text-center">
                  <div className="font-heading text-xl font-bold" style={{ color: brand.colors.accent }}>R175</div>
                  <div className="text-xs text-gray-500">Child (under 12)</div>
                </div>
                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <div className="font-heading text-xl font-bold text-green-600">FREE</div>
                  <div className="text-xs text-gray-500">Under 6</div>
                </div>
              </div>
              <a href={`https://wa.me/${brand.whatsapp}?text=Hi, I'd like to book the Sunday Buffet. Please let me know availability.`}
                target="_blank" rel="noopener noreferrer"
                className="rounded-full py-3.5 text-center text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: brand.colors.accent }}>
                Book Your Spot — WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Whale season */}
      <section className="py-16 px-4" style={{ background: brand.colors.secondary }}>
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-5xl mb-4">🐋</div>
          <h2 className="mb-4 font-heading text-3xl font-bold" style={{ color: brand.colors.primary }}>Whale Watching Season: June – November</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 leading-relaxed">
            Every year from June to November, Humpback and Southern Right whales migrate past
            the Bluff peninsula. You can watch them from your room, from the restaurant deck,
            or from the garden. There is nowhere in Durban that puts you this close.
          </p>
          <a href={`/book`}
            className="inline-block rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: brand.colors.primary }}>
            Book Your Whale Season Stay
          </a>
        </div>
      </section>

      {/* Private events */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Functions & Events</p>
          <h2 className="mb-4 font-heading text-3xl font-bold" style={{ color: brand.colors.primary }}>Host Your Next Event on the Bluff</h2>
          <p className="mx-auto mb-10 max-w-2xl text-gray-600 leading-relaxed">
            From corporate functions and weddings to birthday celebrations and intimate gatherings —
            African Peninsula offers a unique Indian Ocean backdrop that no conference room in Durban can match.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10">
            {['Weddings', 'Corporate Functions', 'Birthday Celebrations', 'Intimate Gatherings'].map(ev => (
              <div key={ev} className="rounded-2xl bg-white p-5 shadow-sm text-center">
                <p className="font-heading text-sm font-semibold" style={{ color: brand.colors.primary }}>{ev}</p>
              </div>
            ))}
          </div>
          <a href="/catering"
            className="inline-block rounded-full px-8 py-3.5 text-sm font-bold text-white"
            style={{ background: brand.colors.accent }}>
            Get a Catering Quote
          </a>
        </div>
      </section>
    </main>
  )
}
