import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ChevronLeft, ChevronRight, ArrowRight, Waves, Fish, Sun, Eye } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { brand } from '@/config/brand'

const SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    badge: '🌊 Beachfront Stay',
    h1: 'Wake Up to the Indian Ocean',
    sub: '13 unique rooms on the Bluff. Sunrises that reset your week.',
    cta1: { label: 'View Rooms', href: '/rooms' },
    cta2: { label: 'Book Now', href: '/book' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
    badge: '🍽️ Beachfront Restaurant',
    h1: 'Food This Good Deserves That View',
    sub: 'Seafood, steaks and Durban curry on the edge of the Indian Ocean.',
    cta1: { label: 'View Menu', href: '/menu' },
    cta2: { label: 'Order Online', href: '/order' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80',
    badge: '🍛 Every Sunday',
    h1: 'Sunday Buffet — R350 Per Person',
    sub: 'Prawn Curry. Roast Lamb. Beef Riblets. All-you-can-eat every Sunday.',
    cta1: { label: 'RSVP for This Sunday', href: '/events' },
    cta2: { label: 'View Full Menu', href: '/menu' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
    badge: '🐋 June – November',
    h1: 'The Best Whale-Watching Seat in Durban',
    sub: 'Humpback and Southern Right whales pass right in front of us every year.',
    cta1: { label: 'Book Your Room', href: '/book' },
    cta2: { label: 'Explore the Property', href: '/gallery' },
  },
  {
    bg: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80',
    badge: '⭐ 4.2 Stars · 410 Reviews',
    h1: "Durban's Best-Kept Secret",
    sub: 'Right on the Bluff. Just over the bridge from the city. Worth the discovery.',
    cta1: { label: 'See the Rooms', href: '/rooms' },
    cta2: { label: 'Make a Reservation', href: '/reserve' },
  },
]

const BADGES = [
  '⭐ 4.2 Stars — 410 Google Reviews',
  '🏡 13 Ocean-View Rooms',
  '🐋 Whale Watching: June – November',
  '🍽️ Restaurant Open Daily 06:30–21:30',
  '📍 599 Marine Drive, Bluff, Durban',
  '🍛 Sunday Buffet Every Week — R350pp',
  '✅ Direct Booking — Best Rate Guaranteed',
  '🌊 Indian Ocean Frontage',
]

const ROOMS = [
  { name: 'Ocean View Standard', type: 'Standard', price: 1200, desc: 'Queen bed · Ocean view · Private balcony', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=75' },
  { name: 'Ocean View Deluxe', type: 'Deluxe', price: 1500, desc: 'King bed · Panoramic ocean view · Upgraded amenities', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=75' },
  { name: 'Ocean Suite', type: 'Suite', price: 2200, desc: 'King bed · Full ocean panorama · Lounge · Kitchenette', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75' },
]

const DISHES = [
  { name: 'Mussels in White-Wine Cream Sauce', price: 'R165', tag: 'Seafood', img: 'https://images.unsplash.com/photo-1569379233376-0a04d9cbfab9?w=600&q=75' },
  { name: 'Grilled Line Fish on Fragrant Rice', price: 'R185', tag: 'Seafood', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=75' },
  { name: 'Sunday Buffet All-You-Can-Eat', price: 'R350pp', tag: 'Event', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=75' },
]

const TESTIMONIALS = [
  { name: 'Google Reviewer', date: 'Jan 2025', text: 'An absolutely amazing place, the views, atmosphere and food is truly amazing. This is a hidden gem in Bluff and a must see.' },
  { name: 'Facebook Guest', date: 'Dec 2024', text: "Chef Henry's mussels are the best I've had in Durban. We've been coming for Sunday Buffet every month for two years." },
  { name: 'TripAdvisor Guest', date: 'Nov 2024', text: 'Woke up to dolphins jumping outside my balcony window. I\'ve stayed at bigger hotels but this is the one I keep coming back to.' },
  { name: 'Booking.com Guest', date: 'Oct 2024', text: 'The Sunday Buffet is a Durban institution. Prawn curry alone is worth the trip from the North Coast.' },
  { name: 'Google Reviewer', date: 'Sep 2024', text: 'Hidden gem doesn\'t even cover it. The view from the deck at sunset is better than any 5-star hotel I\'ve been to in Durban.' },
  { name: 'Facebook Guest', date: 'Aug 2024', text: 'Perfect anniversary getaway. The ocean suite is spectacular and the restaurant surprised us with a complimentary dessert. Staff were wonderful.' },
  { name: 'TripAdvisor', date: 'Jul 2024', text: 'Watched a humpback whale breach from the breakfast table. You cannot get this experience anywhere else in Durban. Remarkable.' },
  { name: 'Google Reviewer', date: 'Jun 2024', text: 'The lamb chops and mussels are exceptional. Henry is a brilliant chef. We drove from Hillcrest specifically for the Sunday Buffet.' },
  { name: 'Booking.com', date: 'May 2024', text: 'Affordable, beachfront and the food is genuinely excellent. The garden is beautiful and peaceful. We\'ll be back every year.' },
  { name: 'Facebook Guest', date: 'Apr 2024', text: 'Brought the whole family for Mom\'s birthday — Sunday Buffet, ocean view, and Henry\'s malva pudding. Best decision we made all year.' },
]

const WHY = [
  { icon: <Waves size={24} />, title: 'Indian Ocean Frontage', desc: 'Not available at any Durban CBD hotel. Wake up to the ocean every morning.' },
  { icon: '🐋', title: 'Whale Watching Season', desc: 'Humpback and Southern Right whales pass directly in front of the property — June to November.' },
  { icon: <Fish size={24} />, title: 'On-Site Restaurant', desc: 'Chef Henry\'s seafood, Durban curry and Sunday Buffet — no need to leave the property.' },
  { icon: <Sun size={24} />, title: 'Panoramic Sunrises', desc: 'Every ocean-view room faces the Indian Ocean. The sunrise is included in the room rate.' },
  { icon: '🤿', title: 'Direct Beach Access', desc: 'Minutes from Treasure Beach and the Bluff tidal pools. The ocean is your backyard.' },
  { icon: <Eye size={24} />, title: 'Book Direct & Save', desc: 'Best rates guaranteed when you book on this site. Never pay OTA commissions.' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [testimonialSlide, setTestimonialSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTestimonialSlide(s => (s + 1) % TESTIMONIALS.length), 3500)
    return () => clearInterval(t)
  }, [])

  const s = SLIDES[slide]

  return (
    <main>
      {/* HERO CAROUSEL */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 transition-all duration-1000"
          style={{ backgroundImage: `url(${s.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,45,78,0.45) 0%, rgba(12,45,78,0.7) 60%, rgba(12,45,78,0.85) 100%)' }} />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm animate-fade-in-up">{s.badge}</span>
          <h1 className="mb-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl animate-fade-in-up">{s.h1}</h1>
          <p className="mb-8 max-w-xl text-lg text-white/85 animate-fade-in-up">{s.sub}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to={s.cta1.href}
              className="rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:opacity-90"
              style={{ background: brand.colors.accent }}>{s.cta1.label}</Link>
            <Link to={s.cta2.href}
              className="rounded-full border-2 border-white/70 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              {s.cta2.label}
            </Link>
          </div>
        </div>
        {/* Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`rounded-full transition-all ${i === slide ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`} />
          ))}
        </div>
        {/* Arrows */}
        <button onClick={() => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 md:left-8">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => setSlide(s => (s + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 md:right-8">
          <ChevronRight size={20} />
        </button>
      </section>

      {/* TRUST BADGES MARQUEE */}
      <div className="overflow-hidden border-y py-3" style={{ background: brand.colors.primary, borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...BADGES, ...BADGES].map((b, i) => (
            <span key={i} className="mx-8 text-sm font-medium text-white/90">{b}</span>
          ))}
        </div>
      </div>

      {/* FEATURED ROOMS */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Where You'll Sleep</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl" style={{ color: brand.colors.primary }}>13 Rooms. One Indian Ocean.</h2>
            </div>
            <Link to="/rooms" className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: brand.colors.accent }}>View All Rooms <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ROOMS.map(room => (
              <div key={room.name} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
                <div className="relative overflow-hidden">
                  <img src={room.img} alt={room.name} loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                    style={{ color: brand.colors.primary }}>{room.type}</span>
                  <div className="absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ background: brand.colors.accent }}>from R{room.price}/night</div>
                </div>
                <div className="p-5">
                  <h3 className="mb-1 font-heading text-lg font-bold" style={{ color: brand.colors.primary }}>{room.name}</h3>
                  <p className="mb-4 text-sm text-gray-500">{room.desc}</p>
                  <Link to="/rooms" className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: brand.colors.accent }}>View Room <ArrowRight size={14} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-4" style={{ background: brand.colors.primary }}>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-10 text-white md:grid-cols-4">
            <AnimatedCounter target={410} suffix="+" label="Google Reviews" />
            <AnimatedCounter target={brand.reviews} suffix="★" label="Average Rating (out of 5)" prefix="4." />
            <AnimatedCounter target={brand.rooms} label="Ocean-View Rooms" />
            <AnimatedCounter target={350} prefix="R" suffix="pp" label="Sunday Buffet" />
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>What We're Known For</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl" style={{ color: brand.colors.primary }}>Come Hungry. Leave Happy.</h2>
            </div>
            <Link to="/menu" className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: brand.colors.accent }}>Full Menu <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {DISHES.map(dish => (
              <div key={dish.name} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
                <div className="overflow-hidden">
                  <img src={dish.img} alt={dish.name} loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium" style={{ color: brand.colors.accent }}>{dish.tag}</span>
                  <h3 className="mb-2 font-heading text-base font-bold" style={{ color: brand.colors.primary }}>{dish.name}</h3>
                  <p className="font-heading text-lg font-bold" style={{ color: brand.colors.accent }}>{dish.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STAY */}
      <section className="py-20 px-4" style={{ background: brand.colors.secondary }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Why African Peninsula</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl" style={{ color: brand.colors.primary }}>What No Other Durban Hotel Offers</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white text-xl"
                  style={{ background: brand.colors.primary }}>
                  {typeof item.icon === 'string' ? item.icon : item.icon}
                </div>
                <h3 className="mb-2 font-heading text-base font-bold" style={{ color: brand.colors.primary }}>{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF SECTION */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
            style={{ background: brand.colors.secondary }}>
            👨‍🍳
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>The Kitchen</p>
          <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl" style={{ color: brand.colors.primary }}>
            Crafted by Our Head Chef Henry
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Our kitchen has been praised by hundreds of guests for seafood, Durban curries and traditional
            South African dishes. Every plate is made from fresh, locally sourced ingredients.
            Come hungry. Leave with a story.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-20 px-4" style={{ background: brand.colors.primary }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center text-white">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>What Our Guests Say</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">410 Reviews. One Consistent Theme.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(testimonialSlide, testimonialSlide + 3).concat(
              TESTIMONIALS.slice(0, Math.max(0, (testimonialSlide + 3) - TESTIMONIALS.length))
            ).map((t, i) => (
              <div key={i} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-3 flex text-yellow-400">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-white/90">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: brand.colors.accent }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestimonialSlide(i)}
                className={`rounded-full transition-all ${i === testimonialSlide ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl" style={{ color: brand.colors.primary }}>Ready for Your Bluff Escape?</h2>
          <p className="mb-8 text-gray-500">Book direct for the best rate. Reserve a table for tonight. Order delivery to your door.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/book" className="rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: brand.colors.primary }}>Book a Room</Link>
            <Link to="/menu" className="rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: brand.colors.accent }}>View the Menu</Link>
            <Link to="/reserve" className="rounded-full border-2 px-8 py-3.5 text-sm font-bold transition-all hover:opacity-70"
              style={{ borderColor: brand.colors.primary, color: brand.colors.primary }}>Reserve a Table</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
