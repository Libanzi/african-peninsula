import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Phone, ChevronDown } from 'lucide-react'
import { brand } from '@/config/brand'

const NAV = [
  { label: 'Stay', dropdown: [
    { label: 'Our Rooms', href: '/rooms' },
    { label: 'Book a Room', href: '/book' },
  ]},
  { label: 'Dine', dropdown: [
    { label: 'View Menu', href: '/menu' },
    { label: 'Order Online', href: '/order' },
    { label: 'Reserve a Table', href: '/reserve' },
  ]},
  { label: 'Events', href: '/events' },
  { label: 'Catering', href: '/catering' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null) }, [location])

  const isHome = location.pathname === '/'
  const darkBg  = !scrolled && isHome

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : isHome ? 'bg-transparent' : 'bg-white shadow-sm'
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: brand.colors.accent }}>
            <span className="text-sm font-bold text-white">AP</span>
          </div>
          <span className={`font-heading text-lg font-bold transition-colors ${darkBg ? 'text-white' : ''}`}
            style={{ color: darkBg ? 'white' : brand.colors.primary }}>
            African Peninsula
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map(item => item.dropdown ? (
            <div key={item.label} className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:opacity-80 ${darkBg ? 'text-white' : ''}`}
                style={{ color: darkBg ? 'white' : brand.colors.primary }}>
                {item.label} <ChevronDown size={14} />
              </button>
              {openDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 min-w-[180px] rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                  {item.dropdown.map(sub => (
                    <Link key={sub.href} to={sub.href}
                      className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50"
                      style={{ color: brand.colors.primary }}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={item.href} to={item.href!}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:opacity-80 ${
                location.pathname === item.href ? 'font-semibold' : ''
              }`}
              style={{ color: darkBg ? 'white' : brand.colors.primary }}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={`tel:${brand.phone}`}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80 ${darkBg ? 'border-white/60 text-white' : 'border-gray-200'}`}
            style={{ color: darkBg ? 'white' : brand.colors.primary }}>
            <Phone size={12} /> {brand.phoneDisplay}
          </a>
          <a href={`https://wa.me/${brand.whatsapp}?text=Hi, I'd like to enquire about African Peninsula.`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: brand.colors.wa }}>
            <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.532 5.858L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.515-5.192-1.414l-.37-.22-3.833 1-1.018-3.723-.242-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
          <Link to="/order" className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100"
            style={{ color: brand.colors.primary }}>
            <ShoppingCart size={18} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="rounded-lg p-2 lg:hidden"
          style={{ color: darkBg ? 'white' : brand.colors.primary }}
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-white px-4 py-4 shadow-lg lg:hidden">
          {NAV.map(item => item.dropdown ? (
            <div key={item.label} className="mb-1">
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">{item.label}</div>
              {item.dropdown.map(sub => (
                <Link key={sub.href} to={sub.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium"
                  style={{ color: brand.colors.primary }}>
                  {sub.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link key={item.href} to={item.href!}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium"
              style={{ color: brand.colors.primary }}>
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t pt-4">
            <a href={`tel:${brand.phone}`}
              className="flex items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium"
              style={{ borderColor: brand.colors.primary, color: brand.colors.primary }}>
              <Phone size={14} /> {brand.phoneDisplay}
            </a>
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white"
              style={{ background: brand.colors.wa }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
