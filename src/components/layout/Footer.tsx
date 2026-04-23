import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { brand } from '@/config/brand'

export function Footer() {
  return (
    <footer style={{ background: brand.colors.primary }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: brand.colors.accent }}>
                <span className="text-sm font-bold text-white">AP</span>
              </div>
              <div>
                <div className="font-heading text-base font-bold">African Peninsula</div>
                <div className="text-xs text-white/60">Guest House & Restaurant</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Where the Bluff meets the Indian Ocean. 13 unique rooms, a celebrated restaurant,
              and the best whale-watching view in Durban.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Instagram size={16} />
              </a>
              <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Facebook size={16} />
              </a>
              <a href={brand.social.tiktok} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.41a8.16 8.16 0 004.77 1.52V7.49a4.85 4.85 0 01-1-.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Stay */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-bold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Stay</h4>
            <ul className="space-y-3">
              {[['Our Rooms', '/rooms'], ['Book a Room', '/book'], ['Gallery', '/gallery']].map(([label, href]) => (
                <li key={href}><Link to={href} className="text-sm text-white/70 transition-colors hover:text-white">{label}</Link></li>
              ))}
              <li><span className="text-sm text-white/60">Check-in: {brand.checkIn} · Check-out: {brand.checkOut}</span></li>
            </ul>
          </div>

          {/* Dine */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-bold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Dine</h4>
            <ul className="space-y-3">
              {[['View Menu', '/menu'], ['Order Online', '/order'], ['Reserve a Table', '/reserve'], ['Sunday Buffet', '/events'], ['Catering', '/catering']].map(([label, href]) => (
                <li key={href}><Link to={href} className="text-sm text-white/70 transition-colors hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-heading text-sm font-bold uppercase tracking-wider" style={{ color: brand.colors.accent }}>Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-white/50" />
                <span className="text-sm text-white/70">{brand.address}</span>
              </li>
              <li>
                <a href={`tel:${brand.phone}`} className="flex gap-3 text-sm text-white/70 transition-colors hover:text-white">
                  <Phone size={15} className="mt-0.5 shrink-0 text-white/50" />
                  {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="flex gap-3 text-sm text-white/70 transition-colors hover:text-white">
                  <Mail size={15} className="mt-0.5 shrink-0 text-white/50" />
                  {brand.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-white/50" />
                <span className="text-sm text-white/70">{brand.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} African Peninsula Guest House & Restaurant. All rights reserved.</p>
          <a href="https://www.payguardafrica.co.za" target="_blank" rel="noopener noreferrer"
            className="text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: brand.colors.accent }}>
            Powered by www.payguardafrica.co.za
          </a>
        </div>
      </div>
    </footer>
  )
}
