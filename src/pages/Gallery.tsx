import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { brand } from '@/config/brand'

const TABS = ['All', 'Rooms & Views', 'Food & Drinks', 'Events & Buffet', 'Coastal Vibes']

const SHOTS = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75', alt: 'Indian Ocean view from Marine Drive Bluff Durban', cat: 'Coastal Vibes' },
  { src: 'https://images.unsplash.com/photo-1569379233376-0a04d9cbfab9?w=800&q=75', alt: 'Mussels in white wine cream sauce African Peninsula restaurant', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=75', alt: 'Ocean view guest room with balcony', cat: 'Rooms & Views' },
  { src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=75', alt: 'Sunday buffet spread at African Peninsula', cat: 'Events & Buffet' },
  { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=75', alt: 'Seafood platter restaurant bluff durban', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75', alt: 'Ocean suite premium room African Peninsula', cat: 'Rooms & Views' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75', alt: 'Restaurant interior dining with ocean view', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=75', alt: 'Beachfront guest house Bluff Durban', cat: 'Rooms & Views' },
  { src: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=75', alt: 'Grilled line fish fragrant rice South African restaurant', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=75', alt: 'Lamb chops grilled plated African Peninsula restaurant', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75', alt: 'Comfortable garden view room', cat: 'Rooms & Views' },
  { src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=75', alt: 'Durban prawn curry basmati rice roti', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=75', alt: 'Mixed meat platter braai South Africa', cat: 'Events & Buffet' },
  { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=75', alt: 'Malva pudding traditional South African dessert', cat: 'Food & Drinks' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=75', alt: 'Deluxe ocean view room panoramic Indian Ocean', cat: 'Rooms & Views' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=75', alt: 'African Peninsula restaurant food spread', cat: 'Events & Buffet' },
  { src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=75', alt: 'Tropical garden pool area African Peninsula', cat: 'Coastal Vibes' },
  { src: 'https://images.unsplash.com/photo-1535083783855-adeab3bae43a?w=800&q=75', alt: 'Sunrise over Indian Ocean Bluff Durban', cat: 'Coastal Vibes' },
]

export default function Gallery() {
  const [tab, setTab] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const filtered = tab === 'All' ? SHOTS : SHOTS.filter(s => s.cat === tab)

  const prev = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  const next = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null)

  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>See It for Yourself</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Gallery</h1>
        <p className="mt-3 text-white/70">Rooms · Food · Events · The Indian Ocean</p>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-20 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  tab === t ? 'text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                style={tab === t ? { background: brand.colors.accent } : {}}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((shot, i) => (
              <div key={shot.src} className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl" onClick={() => setLightbox(i)}>
                <img src={shot.src} alt={shot.alt} loading="lazy"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={() => setLightbox(null)}>
          <img src={filtered[lightbox].src} alt={filtered[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()} />
          <button onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40">
            <ChevronLeft size={22} />
          </button>
          <button onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40">
            <ChevronRight size={22} />
          </button>
          <button onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40">
            <X size={18} />
          </button>
          <div className="absolute bottom-6 text-center text-sm text-white/60">
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  )
}
