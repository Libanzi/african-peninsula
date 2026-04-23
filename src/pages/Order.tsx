import { useState } from 'react'
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import { brand } from '@/config/brand'

const MENU_ITEMS = [
  { id: '1', name: 'Mussels in White-Wine Cream Sauce', price: 165, cat: 'Seafood', img: 'https://images.unsplash.com/photo-1569379233376-0a04d9cbfab9?w=300&q=70' },
  { id: '2', name: 'Seafood Platter', price: 320, cat: 'Seafood', img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&q=70' },
  { id: '3', name: 'Grilled Line Fish', price: 185, cat: 'Seafood', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&q=70' },
  { id: '4', name: 'Lamb Chops (220g)', price: 245, cat: 'Grills', img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300&q=70' },
  { id: '5', name: 'Durban Prawn Curry', price: 195, cat: 'Mains', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&q=70' },
  { id: '6', name: 'Chicken Curry', price: 155, cat: 'Mains', img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=300&q=70' },
  { id: '7', name: 'Classic Burger', price: 135, cat: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=70' },
  { id: '8', name: 'Malva Pudding', price: 75, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&q=70' },
  { id: '9', name: 'Don Pedro', price: 85, cat: 'Desserts', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&q=70' },
  { id: '10', name: 'Cappuccino / Flat White', price: 40, cat: 'Drinks', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&q=70' },
]

interface CartItem { id: string; name: string; price: number; qty: number }

export default function Order() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderType, setOrderType] = useState<'collection' | 'delivery'>('collection')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showCart, setShowCart] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const addToCart = (item: typeof MENU_ITEMS[0]) => {
    setCart(c => {
      const existing = c.find(x => x.id === item.id)
      if (existing) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x)
      return [...c, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
  }

  const updateQty = (id: string, delta: number) => {
    setCart(c => c.map(x => x.id === id ? { ...x, qty: Math.max(0, x.qty + delta) } : x).filter(x => x.qty > 0))
  }

  const cartCount = cart.reduce((s, x) => s + x.qty, 0)
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0)
  const deliveryFee = orderType === 'delivery' ? 35 : 0
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    if (!name || !phone || cart.length === 0) return
    const items = cart.map(x => `${x.qty}× ${x.name} (R${x.price * x.qty})`).join(', ')
    const msg = `Hi African Peninsula! I'd like to place an order.\n\nOrder type: ${orderType}\n${orderType === 'delivery' ? `Delivery address: ${address}\n` : ''}Items: ${items}\nSubtotal: R${subtotal}\n${orderType === 'delivery' ? `Delivery fee: R${deliveryFee}\n` : ''}Total: R${total}\n\nName: ${name}\nPhone: ${phone}`
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) return (
    <main className="flex min-h-screen items-center justify-center pt-16 px-4">
      <div className="max-w-md text-center">
        <div className="text-5xl mb-4">🍽️</div>
        <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: brand.colors.primary }}>Order Sent!</h1>
        <p className="text-gray-600 mb-6">Your order has been sent via WhatsApp. We'll confirm and give you an ETA shortly.</p>
        <a href="/" className="inline-block rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: brand.colors.accent }}>Back to Home</a>
      </div>
    </main>
  )

  return (
    <main className="pt-16">
      <div className="py-14 px-4 text-center" style={{ background: brand.colors.primary }}>
        <h1 className="font-heading text-4xl font-bold text-white">Order Online</h1>
        <p className="mt-2 text-white/70">Collection from the Bluff · Delivery across Durban South</p>
      </div>

      {/* Sticky cart badge */}
      {cartCount > 0 && (
        <button onClick={() => setShowCart(!showCart)}
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl text-white transition-transform hover:scale-110"
          style={{ background: brand.colors.primary }}>
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: brand.colors.accent }}>{cartCount}</span>
        </button>
      )}

      <div className="mx-auto max-w-7xl px-4 py-10 lg:flex lg:gap-8">
        {/* Menu */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MENU_ITEMS.map(item => {
              const cartItem = cart.find(x => x.id === item.id)
              return (
                <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <img src={item.img} alt={item.name} loading="lazy" className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <div className="mb-1 text-xs font-medium text-gray-400">{item.cat}</div>
                    <h3 className="mb-2 font-heading text-sm font-bold" style={{ color: brand.colors.primary }}>{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: brand.colors.accent }}>R{item.price}</span>
                      {cartItem ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{cartItem.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                            style={{ background: brand.colors.accent }}>
                            <Plus size={12} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)}
                          className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-white"
                          style={{ background: brand.colors.accent }}>
                          <Plus size={12} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart sidebar / checkout */}
        {(showCart || cartCount > 0) && (
          <div className="mt-8 lg:mt-0 lg:w-80 lg:shrink-0">
            <div className="sticky top-20 rounded-2xl bg-white p-6 shadow-md">
              <h2 className="mb-5 font-heading text-lg font-bold" style={{ color: brand.colors.primary }}>Your Order</h2>
              {cart.length === 0 ? (
                <p className="text-sm text-gray-400 mb-4">No items yet. Add from the menu.</p>
              ) : (
                <div className="mb-5 space-y-3 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium" style={{ color: brand.colors.primary }}>{item.name}</div>
                        <div className="text-xs text-gray-400">R{item.price} × {item.qty}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: brand.colors.accent }}>R{item.price * item.qty}</span>
                        <button onClick={() => updateQty(item.id, -99)} className="text-gray-300 hover:text-red-400">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order type */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                {(['collection','delivery'] as const).map(type => (
                  <button key={type} onClick={() => setOrderType(type)}
                    className={`rounded-xl border-2 py-2 text-xs font-semibold capitalize transition-all ${orderType === type ? 'border-orange-400 text-white' : 'border-gray-200 text-gray-500'}`}
                    style={orderType === type ? { background: brand.colors.accent } : {}}>
                    {type}
                  </button>
                ))}
              </div>

              {orderType === 'delivery' && (
                <input placeholder="Delivery address" value={address} onChange={e => setAddress(e.target.value)}
                  className="mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none" />
              )}

              <input placeholder="Your name *" value={name} onChange={e => setName(e.target.value)}
                className="mb-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none" />
              <input placeholder="Phone number *" value={phone} onChange={e => setPhone(e.target.value)}
                className="mb-4 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none" />

              {cart.length > 0 && (
                <div className="mb-4 space-y-1 border-t pt-3 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>R{subtotal}</span></div>
                  {deliveryFee > 0 && <div className="flex justify-between text-gray-500"><span>Delivery</span><span>R{deliveryFee}</span></div>}
                  <div className="flex justify-between font-bold text-base" style={{ color: brand.colors.primary }}><span>Total</span><span>R{total}</span></div>
                </div>
              )}

              <button onClick={handleCheckout} disabled={cart.length === 0 || !name || !phone}
                className="w-full rounded-full py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: brand.colors.accent }}>
                Send Order via WhatsApp
              </button>
              <p className="mt-2 text-center text-xs text-gray-400">We'll confirm and provide payment details</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
