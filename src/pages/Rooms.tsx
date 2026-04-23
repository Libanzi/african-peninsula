import { Link } from 'react-router-dom'
import { Users, Wifi, Wind, Tv, Coffee, Eye, ArrowRight } from 'lucide-react'
import { brand } from '@/config/brand'

const ROOMS = [
  {
    name: 'Ocean View Standard', slug: 'ocean-view-standard', type: 'Standard',
    price: 1200, guests: 2, oceanView: true,
    desc: 'Wake up to the Indian Ocean from your private balcony. En-suite bathroom, queen bed, air conditioning, DSTV.',
    amenities: ['En-suite bathroom', 'Air conditioning', 'DSTV', 'Private balcony', 'Ocean view', 'Free WiFi', 'Tea & coffee'],
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=75',
  },
  {
    name: 'Garden View Standard', slug: 'garden-view-standard', type: 'Standard',
    price: 950, guests: 2, oceanView: false,
    desc: 'Peaceful garden setting with tropical surroundings. En-suite bathroom, double bed, air conditioning.',
    amenities: ['En-suite bathroom', 'Air conditioning', 'DSTV', 'Garden view', 'Free WiFi', 'Tea & coffee'],
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75',
  },
  {
    name: 'Ocean View Deluxe', slug: 'ocean-view-deluxe', type: 'Deluxe',
    price: 1500, guests: 2, oceanView: true,
    desc: 'Spacious deluxe room with panoramic Indian Ocean views. King bed, large private balcony, upgraded amenities.',
    amenities: ['En-suite bathroom', 'Air conditioning', 'DSTV', 'Large balcony', 'Ocean view', 'Free WiFi', 'Bath & shower', 'Room service'],
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=75',
  },
  {
    name: 'Family Room', slug: 'family-room', type: 'Family',
    price: 1800, guests: 4, oceanView: false,
    desc: 'Perfect for families. Two bedrooms — queen and two singles — garden views, shared bathroom, kitchenette.',
    amenities: ['En-suite bathroom', 'Air conditioning', 'DSTV', 'Garden view', 'Free WiFi', 'Kitchenette'],
    img: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=75',
  },
  {
    name: 'Ocean Suite', slug: 'ocean-suite', type: 'Suite',
    price: 2200, guests: 2, oceanView: true,
    desc: 'Our premier suite. Full ocean panorama, lounge area, kitchenette, king bed, en-suite bath and shower. Whale watching from your private deck.',
    amenities: ['En-suite bath & shower', 'Air conditioning', 'DSTV', 'Private deck', 'Ocean view', 'Kitchenette', 'Lounge area', 'Free WiFi', 'Room service'],
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75',
  },
]

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Free WiFi': <Wifi size={14} />,
  'Air conditioning': <Wind size={14} />,
  'DSTV': <Tv size={14} />,
  'Tea & coffee': <Coffee size={14} />,
  'Ocean view': <Eye size={14} />,
}

export default function Rooms() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden py-24 px-4 text-center"
        style={{ background: `linear-gradient(135deg, ${brand.colors.primary} 0%, #1A5276 100%)` }}>
        <div className="relative z-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Where You'll Sleep</p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">13 Rooms. One Indian Ocean.</h1>
          <p className="mt-3 text-white/70">Every room designed for the Bluff beachfront experience.</p>
        </div>
      </div>

      {/* Direct booking banner */}
      <div className="bg-orange-50 px-4 py-3 text-center">
        <p className="text-sm font-medium" style={{ color: brand.colors.accent }}>
          ✅ <strong>Book Direct & Save</strong> — Best rates guaranteed when you book on this site. Never pay OTA commissions.
        </p>
      </div>

      {/* Rooms */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl space-y-8">
          {ROOMS.map((room, i) => (
            <div key={room.slug}
              className={`overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl md:flex ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="relative md:w-2/5">
                <img src={room.img} alt={room.name} loading="lazy"
                  className="h-64 w-full object-cover md:h-full" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                    style={{ color: brand.colors.primary }}>{room.type}</span>
                  {room.oceanView && (
                    <span className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ background: brand.colors.accent }}>🌊 Ocean View</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between p-7 md:w-3/5">
                <div>
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h2 className="font-heading text-xl font-bold md:text-2xl" style={{ color: brand.colors.primary }}>{room.name}</h2>
                    <div className="text-right">
                      <div className="font-heading text-xl font-bold" style={{ color: brand.colors.accent }}>R{room.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">per night</div>
                    </div>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{room.desc}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {room.amenities.map(a => (
                      <span key={a} className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
                        {AMENITY_ICONS[a] || null} {a}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Users size={14} /> Up to {room.guests} guests
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/book?room=${room.slug}`}
                    className="rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: brand.colors.accent }}>
                    Book This Room
                  </Link>
                  <a href={`https://wa.me/${brand.whatsapp}?text=Hi, I'd like to enquire about the ${room.name} room.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: brand.colors.wa }}>
                    <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.532 5.858L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.515-5.192-1.414l-.37-.22-3.833 1-1.018-3.723-.242-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Check-in info */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-2xl p-8 text-center md:flex md:items-center md:justify-between md:text-left" style={{ background: brand.colors.secondary }}>
          <div>
            <h3 className="font-heading text-xl font-bold" style={{ color: brand.colors.primary }}>Check-in & Check-out</h3>
            <p className="mt-1 text-sm text-gray-500">Check-in from {brand.checkIn} · Check-out by {brand.checkOut}</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-0">
            <Link to="/book" className="rounded-full px-7 py-3 text-sm font-bold text-white" style={{ background: brand.colors.primary }}>
              Book Now <ArrowRight size={14} className="ml-1 inline" />
            </Link>
            <a href={`https://wa.me/${brand.whatsapp}?text=Hi, I'd like to make a room booking enquiry.`}
              target="_blank" rel="noopener noreferrer"
              className="rounded-full px-7 py-3 text-sm font-bold text-white"
              style={{ background: brand.colors.wa }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
