import { Link } from 'react-router-dom'
import { brand } from '@/config/brand'

const TEAM = [
  { name: 'Cheryl', role: 'Owner & Events', emoji: '👩‍💼', desc: 'Cheryl oversees guest experience and events at African Peninsula. Her passion for hospitality keeps guests coming back year after year.' },
  { name: 'Harry', role: 'Restaurant Manager', emoji: '👨‍💼', desc: 'Harry runs the day-to-day operations of the restaurant, ensuring every dining experience meets the African Peninsula standard.' },
  { name: 'Henry', role: 'Head Chef', emoji: '👨‍🍳', desc: 'Chef Henry\'s seafood, Durban curries and traditional South African dishes have earned him dozens of five-star reviews by name. He is the reason guests drive from across Durban.' },
]

export default function About() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden py-28 px-4"
        style={{ background: `linear-gradient(135deg, ${brand.colors.primary} 0%, #1A5276 100%)` }}>
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Our Story</p>
          <h1 className="font-heading text-4xl font-extrabold md:text-5xl">Where the Bluff Meets the Indian Ocean</h1>
          <p className="mt-5 text-lg text-white/75">599 Marine Drive. The end of the Bluff peninsula. A beachfront property like no other in Durban.</p>
        </div>
      </div>

      {/* The Location */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl md:flex md:items-center md:gap-14">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <iframe
              src={brand.mapEmbed}
              className="h-72 w-full rounded-2xl shadow-md md:h-80"
              loading="lazy"
              title="African Peninsula location map"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
          <div className="md:w-1/2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>The Location</p>
            <h2 className="mb-5 font-heading text-3xl font-bold" style={{ color: brand.colors.primary }}>Brighton Beach, Bluff, Durban 4052</h2>
            <p className="mb-4 leading-relaxed text-gray-600">
              Just over the Durban South bridge — minutes from the city, a world away from the noise.
              Marine Drive is the Bluff's coastline road, running directly along the Indian Ocean.
              African Peninsula sits right on it.
            </p>
            <p className="leading-relaxed text-gray-600">
              The Indian Ocean is not a feature. It is the product. Every room, every table, and every
              morning at African Peninsula is shaped by what lies directly in front of you: one of
              the most beautiful stretches of coastline in KwaZulu-Natal.
            </p>
          </div>
        </div>
      </section>

      {/* The Property */}
      <section className="py-20 px-4" style={{ background: brand.colors.secondary }}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>The Property</p>
          <h2 className="mb-6 font-heading text-3xl font-bold" style={{ color: brand.colors.primary }}>13 Rooms. Two Pools. Tropical Gardens.</h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600 mb-8">
            African Peninsula has been welcoming guests to the Bluff for years. The property features
            13 individually designed rooms — from garden-view standards to panoramic ocean suites —
            two swimming pools, lush tropical gardens, and a full-service restaurant and bar.
            Everything under one roof, right on the ocean.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[['13', 'Rooms'], ['2', 'Swimming Pools'], ['4.2★', 'Rating'], ['410+', 'Google Reviews']].map(([num, label]) => (
              <div key={label} className="rounded-2xl bg-white p-5 shadow-sm text-center">
                <div className="font-heading text-2xl font-extrabold" style={{ color: brand.colors.accent }}>{num}</div>
                <div className="mt-1 text-xs font-medium text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Restaurant */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>The Restaurant</p>
          <h2 className="mb-6 font-heading text-3xl font-bold" style={{ color: brand.colors.primary }}>Durban Seafood. Curry. Classic South African.</h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-600">
            Open daily from 06:30, the African Peninsula restaurant serves fresh seafood, traditional Durban
            curry, grilled meats and South African classics. Every dish is made from locally sourced
            ingredients. The Sunday Buffet — R350 per person, every week — has become a Bluff institution.
            The restaurant deck overlooks the Indian Ocean directly.
          </p>
        </div>
      </section>

      {/* Whale story */}
      <section className="py-20 px-4" style={{ background: brand.colors.primary }}>
        <div className="mx-auto max-w-3xl text-center text-white">
          <div className="text-5xl mb-5">🐋</div>
          <h2 className="mb-5 font-heading text-3xl font-bold">The Whale Story</h2>
          <p className="leading-relaxed text-white/80 text-lg">
            Every year from June to November, Humpback and Southern Right whales migrate past the Bluff.
            You can watch them from your room, from the restaurant deck, or from the garden.
            There is nowhere in Durban that puts you this close to one of nature's greatest annual spectacles.
          </p>
          <Link to="/book" className="mt-8 inline-block rounded-full px-8 py-3.5 text-sm font-bold text-white"
            style={{ background: brand.colors.accent }}>
            Book Your Whale Season Stay
          </Link>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>The People Behind It</p>
            <h2 className="font-heading text-3xl font-bold" style={{ color: brand.colors.primary }}>Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {TEAM.map(member => (
              <div key={member.name} className="rounded-2xl bg-white p-7 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                  style={{ background: brand.colors.secondary }}>
                  {member.emoji}
                </div>
                <h3 className="mb-1 font-heading text-lg font-bold" style={{ color: brand.colors.primary }}>{member.name}</h3>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>{member.role}</p>
                <p className="text-sm leading-relaxed text-gray-500">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
