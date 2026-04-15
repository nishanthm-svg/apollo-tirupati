import { openWhatsApp, buildWhatsAppGeneralMessage } from '../utils/whatsapp.js'

const QUICK_LINKS = [
  { label: 'Blood Tests', href: '#tests' },
  { label: 'Health Packages', href: '#packages' },
  { label: 'Home Collection', href: '#home-collection' },
  { label: 'Our Centres', href: '#centres' },
  { label: 'Offers & Discounts', href: '#offers' },
  { label: 'Reports Download', href: '#' },
  { label: 'Corporate Health', href: '#' },
]

const CENTRES_LIST = [
  { name: 'Tirupati (MG Road)', addr: 'Near Devasthanam Bus Stand', phone: '+91 72070 74078' },
  { name: 'Tiruchanoor', addr: 'Near Padmavathi Temple', phone: '+91 72070 74078' },
  { name: 'Renigunta', addr: 'Near Railway Station', phone: '+91 72070 74078' },
  { name: 'Chandragiri', addr: 'Fort Road, Near Chandragiri Fort', phone: '+91 72070 74078' },
  { name: 'Chittoor', addr: 'Renigunta Road, Near RTC Bus Stand', phone: '+91 72070 74078' },
]

const INFO_LINKS = [
  { label: 'About Apollo Diagnostics', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Refund Policy', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Careers', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-apollo-teal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://apollodiagnostics.in/static/media/logo.f9e4d98e.svg"
                alt="Apollo Diagnostics"
                className="h-10 w-auto brightness-0 invert"
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
            <h3 className="font-bold text-lg mb-1">Apollo Diagnostics Tirupati</h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              NABL accredited diagnostic lab trusted by 10,000+ patients across Tirupati-Tirumala region. Accurate, affordable, caring.
            </p>
            <div className="flex items-center gap-1 text-sm mb-1">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">NABL Accredited</span>
            </div>
            <div className="flex items-center gap-1 text-sm mb-1">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-1 text-sm mb-5">
              <span className="text-green-400">✓</span>
              <span className="text-white/80">CAP Certified</span>
            </div>
            <p className="text-white/50 text-xs mb-3">Trusted since 2001 • Apollo Group</p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/ApollodiagnosticsOfficial" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://instagram.com/apollodiagnostics" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://twitter.com/ApolloLab" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                title="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <button
                onClick={() => openWhatsApp(buildWhatsAppGeneralMessage())}
                className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-apollo-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Centres */}
          <div>
            <h4 className="font-bold text-base mb-4">Our Centres</h4>
            <div className="space-y-4">
              {CENTRES_LIST.map(c => (
                <div key={c.name}>
                  <p className="font-medium text-sm text-white">{c.name}</p>
                  <p className="text-white/60 text-xs">{c.addr}</p>
                  <a href={`tel:${c.phone.replace(/\s+/g, '')}`} className="text-apollo-pink-light text-xs hover:text-white transition-colors">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Info + Contact */}
          <div>
            <h4 className="font-bold text-base mb-4">Information</h4>
            <ul className="space-y-2 mb-6">
              {INFO_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <a href="tel:+917207074078" className="flex items-center gap-2 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-apollo-pink rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/60">Phone</p>
                  <p className="text-sm font-semibold">+91 72070 74078</p>
                </div>
              </a>
              <button
                onClick={() => openWhatsApp(buildWhatsAppGeneralMessage())}
                className="flex items-center gap-2 hover:text-white transition-colors w-full"
              >
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/60">WhatsApp</p>
                  <p className="text-sm font-semibold">Chat with us</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Apollo Diagnostics Tirupati. All rights reserved. | NABL Accredited | ISO 9001:2015
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white text-xs transition-colors">Terms</a>
            <a href="/admin" className="text-white/60 hover:text-white text-xs transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
