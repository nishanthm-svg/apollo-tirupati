import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { openWhatsApp, buildWhatsAppGeneralMessage } from '../utils/whatsapp.js'

const NAV_TABS = [
  { label: 'Tests', href: '#tests' },
  { label: 'Health Checkup', href: '#packages' },
  { label: 'Home Collection', href: '#home-collection' },
  { label: 'Our Centres', href: '#centres' },
  { label: 'Offers', href: '#offers' },
  { label: 'Reports', href: '#' },
  { label: 'Corporate', href: '#' },
  { label: 'About', href: '#' },
]

const CENTRES = [
  'Tirupati (MG Road)',
  'Tiruchanoor',
  'Renigunta',
  'Chandragiri',
]

export default function Header({ selectedCentre, onCentreChange, onBookTest }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [centreOpen, setCentreOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (val) => {
    setSearchQuery(val)
    clearTimeout(debounceRef.current)
    if (!val.trim()) { setSearchResults([]); setSearchOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get('/api/tests', { params: { search: val } })
        setSearchResults(res.data.slice(0, 6))
        setSearchOpen(true)
      } catch { /* ignore */ }
    }, 300)
  }

  const handleSelectResult = (test) => {
    setSearchQuery(test.name)
    setSearchOpen(false)
    if (onBookTest) onBookTest(test)
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar */}
      <div className="bg-apollo-teal text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <a href="tel:+917207074078" className="flex items-center gap-1.5 hover:text-apollo-pink-light transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-medium">+91 72070 74078</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openWhatsApp(buildWhatsAppGeneralMessage())}
              className="flex items-center gap-1.5 hover:text-green-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </button>
            <span className="text-white/30">|</span>
            <a href="/admin" className="hover:text-apollo-pink-light transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="https://apollodiagnostics.in/static/media/logo.f9e4d98e.svg"
              alt="Apollo Diagnostics"
              className="h-10 w-auto"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
            <div className="hidden items-center gap-1">
              <span className="text-apollo-teal font-extrabold text-xl">Apollo</span>
              <span className="text-apollo-pink font-extrabold text-xl">Diagnostics</span>
            </div>
          </a>

          {/* Centre Selector */}
          <div className="relative hidden md:block shrink-0">
            <button
              onClick={() => setCentreOpen(v => !v)}
              className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:border-apollo-pink transition-colors"
            >
              <svg className="w-4 h-4 text-apollo-pink" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{selectedCentre}</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {centreOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {CENTRES.map(c => (
                  <button
                    key={c}
                    onClick={() => { onCentreChange(c); setCentreOpen(false) }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-apollo-pink-light hover:text-apollo-pink transition-colors ${selectedCentre === c ? 'text-apollo-pink font-semibold bg-apollo-pink-light' : 'text-gray-700'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 relative hidden md:block max-w-md">
            <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 focus-within:border-apollo-pink focus-within:ring-2 focus-within:ring-apollo-pink/20 transition-all bg-gray-50">
              <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tests, packages..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setSearchResults([]); setSearchOpen(false) }} className="ml-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-72 overflow-y-auto">
                {searchResults.map(test => (
                  <button
                    key={test.id}
                    onClick={() => handleSelectResult(test)}
                    className="w-full text-left px-4 py-2.5 hover:bg-apollo-pink-light transition-colors flex items-center justify-between gap-2 group"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-apollo-pink">{test.name}</p>
                      <p className="text-xs text-gray-500">{test.category} • {test.reportTime}</p>
                    </div>
                    <span className="text-apollo-teal font-bold text-sm shrink-0">₹{test.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            <a href="tel:+917207074078" className="hidden lg:flex items-center gap-1.5 text-apollo-teal font-semibold text-sm hover:text-apollo-pink transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +91 72070 74078
            </a>
            <button onClick={() => document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' })} className="btn-pink text-sm py-2 px-5">
              Book Test
            </button>
            <button onClick={() => setMenuOpen(v => !v)} className="md:hidden p-2 text-apollo-teal hover:text-apollo-pink transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bg-apollo-teal hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1">
            {NAV_TABS.map(tab => (
              <a
                key={tab.label}
                href={tab.href}
                className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2.5 text-sm font-medium transition-all rounded-sm whitespace-nowrap"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 focus-within:border-apollo-pink transition-all bg-gray-50">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tests..."
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>
          </div>
          {NAV_TABS.map(tab => (
            <a
              key={tab.label}
              href={tab.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-apollo-pink-light hover:text-apollo-pink text-sm font-medium border-b border-gray-50 transition-colors"
            >
              {tab.label}
            </a>
          ))}
          <div className="p-4 grid grid-cols-2 gap-2">
            {CENTRES.map(c => (
              <button
                key={c}
                onClick={() => { onCentreChange(c); setMenuOpen(false) }}
                className={`text-xs py-2 px-3 rounded-full border transition-colors ${selectedCentre === c ? 'bg-apollo-pink text-white border-apollo-pink' : 'border-gray-200 text-gray-600'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
