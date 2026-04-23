import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { Header }       from '@/components/layout/Header'
import { Footer }       from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'

import Home     from '@/pages/Home'
import Rooms    from '@/pages/Rooms'
import Book     from '@/pages/Book'
import Menu     from '@/pages/Menu'
import Order    from '@/pages/Order'
import Reserve  from '@/pages/Reserve'
import Events   from '@/pages/Events'
import Catering from '@/pages/Catering'
import Gallery  from '@/pages/Gallery'
import About    from '@/pages/About'
import Contact  from '@/pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'Inter, sans-serif' } }} />
      <Header />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/rooms"     element={<Rooms />} />
        <Route path="/book"      element={<Book />} />
        <Route path="/menu"      element={<Menu />} />
        <Route path="/order"     element={<Order />} />
        <Route path="/reserve"   element={<Reserve />} />
        <Route path="/events"    element={<Events />} />
        <Route path="/catering"  element={<Catering />} />
        <Route path="/gallery"   element={<Gallery />} />
        <Route path="/about"     element={<About />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="*" element={
          <div className="flex min-h-screen flex-col items-center justify-center pt-16 text-center px-4">
            <div className="text-6xl mb-4">🌊</div>
            <h1 className="font-heading text-3xl font-bold mb-3" style={{ color: '#0C2D4E' }}>Page Not Found</h1>
            <p className="text-gray-500 mb-6">That page doesn't exist — but the ocean view still does.</p>
            <a href="/" className="rounded-full px-8 py-3 text-sm font-bold text-white" style={{ background: '#D4813A' }}>Back to Home</a>
          </div>
        } />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  )
}
