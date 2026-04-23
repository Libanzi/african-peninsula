import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Leaf, Flame, Plus } from 'lucide-react'
import { brand } from '@/config/brand'

const CATEGORIES = ['All', 'Starters', 'Seafood', 'Mains', 'Grills & Braai', 'Pasta & Burgers', 'Desserts', 'Drinks', 'Sunday Buffet']

const MENU = [
  { cat: 'Seafood', name: 'Mussels in White-Wine Cream Sauce', desc: 'Fresh Bluff mussels steamed in white wine, cream, garlic and herbs. Served with toasted ciabatta.', price: 165, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1569379233376-0a04d9cbfab9?w=500&q=75' },
  { cat: 'Seafood', name: 'Seafood Platter', desc: 'A generous selection of the day\'s catch — grilled line fish, calamari, prawns, mussels. Served with chips and salad.', price: 320, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=75' },
  { cat: 'Seafood', name: 'Grilled Line Fish', desc: 'Catch of the day on fragrant rice in lemon-garlic butter. Ask your waiter for today\'s fish.', price: 185, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=75' },
  { cat: 'Grills & Braai', name: 'Lamb Chops (220g)', desc: '220g grilled lamb chops with spiced garlic, herbs and chillies. Served with chips and seasonal vegetables.', price: 245, veg: false, spicy: true, img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=75' },
  { cat: 'Grills & Braai', name: 'Mixed Meat Platter', desc: 'Boerewors, chicken skewers, beef riblets. Served with chips and pap.', price: 280, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=75' },
  { cat: 'Mains', name: 'Durban Prawn Curry', desc: 'Traditional Durban prawn curry served with basmati rice, roti and sambals.', price: 195, veg: false, spicy: true, img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=75' },
  { cat: 'Mains', name: 'Chicken Curry', desc: 'Slow-cooked Durban-style chicken curry with basmati rice, roti and sambals.', price: 155, veg: false, spicy: true, img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=500&q=75' },
  { cat: 'Pasta & Burgers', name: 'Classic Burger', desc: '200g beef patty, lettuce, tomato, cheese, house relish. Served with chips.', price: 135, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=75' },
  { cat: 'Desserts', name: 'Malva Pudding', desc: 'Traditional South African malva pudding with warm custard.', price: 75, veg: true, spicy: false, img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=75' },
  { cat: 'Desserts', name: 'Don Pedro', desc: 'Ice cream, cream and your choice of spirit — Kahlúa, Amarula or Whisky.', price: 85, veg: true, spicy: false, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=75' },
  { cat: 'Drinks', name: 'Draft Beer', desc: 'Ask your waiter for today\'s draught.', price: 40, veg: true, spicy: false, img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=75' },
  { cat: 'Drinks', name: 'Cappuccino / Flat White', desc: 'Freshly brewed espresso-based coffee.', price: 40, veg: true, spicy: false, img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=75' },
  { cat: 'Sunday Buffet', name: 'Sunday Buffet — Adult', desc: 'All-you-can-eat Sunday buffet. Special Prawn Curry, Lamb Curry, Roast Lamb, Roast Chicken, Beef Riblets, Chicken Skewers, seasonal salads, desserts.', price: 350, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=75' },
  { cat: 'Sunday Buffet', name: 'Sunday Buffet — Child (under 12)', desc: 'Same spread as the adult buffet for children.', price: 175, veg: false, spicy: false, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=75' },
]

export default function Menu() {
  const [activeTab, setActiveTab] = useState('All')
  const filtered = activeTab === 'All' ? MENU : MENU.filter(i => i.cat === activeTab)

  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="py-16 px-4 text-center" style={{ background: brand.colors.primary }}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: brand.colors.accent }}>African Peninsula Restaurant</p>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Our Menu</h1>
        <p className="mt-3 text-white/70">Fresh seafood, Durban curry and South African classics — every day from 06:30.</p>
      </div>

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "African Peninsula Restaurant",
        "servesCuisine": ["South African", "Seafood", "Indian"],
        "priceRange": "$$",
        "address": { "@type": "PostalAddress", "streetAddress": "599 Marine Drive", "addressLocality": "Brighton Beach, Bluff", "addressRegion": "KwaZulu-Natal", "postalCode": "4052" },
        "telephone": "+27607563836",
      })}} />

      {/* Category tabs */}
      <div className="sticky top-16 z-30 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveTab(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === cat ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeTab === cat ? { background: brand.colors.accent } : {}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(item => (
              <div key={item.name} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
                <div className="overflow-hidden">
                  <img src={item.img} alt={item.name} loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-heading text-sm font-bold leading-snug" style={{ color: brand.colors.primary }}>{item.name}</h3>
                    <div className="flex shrink-0 gap-1">
                      {item.veg && <span title="Vegetarian"><Leaf size={14} className="text-green-500" /></span>}
                      {item.spicy && <span title="Spicy"><Flame size={14} className="text-orange-500" /></span>}
                    </div>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-gray-500 line-clamp-2">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base font-bold" style={{ color: brand.colors.accent }}>R{item.price}</span>
                    <Link to="/order"
                      className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: brand.colors.accent }}>
                      <Plus size={12} /> Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="py-12 px-4 text-center">
        <p className="mb-4 text-gray-500">Rather dine in? Reserve a table and enjoy the ocean view.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/reserve" className="rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: brand.colors.primary }}>Reserve a Table</Link>
          <Link to="/order" className="rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: brand.colors.accent }}>Order Online</Link>
        </div>
      </div>
    </main>
  )
}
