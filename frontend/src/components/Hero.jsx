import { useState, useEffect, useRef } from 'react'
import { useTests } from '../hooks/useApi.js'
import { openWhatsApp, buildWhatsAppGeneralMessage } from '../utils/whatsapp.js'

const STATS = [
  { value: 10000, suffix: '+', label: 'Happy Patients', icon: '👥' },
  { value: 500, suffix: '+', label: 'Tests Available', icon: '🔬' },
  { value: 5, suffix: '', label: 'Centres', icon: '🏥' },
  { value: 100, suffix: '%', label: 'NABL Accredited', icon: '✅' },
]

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Hero({ onBook, selectedCentre }) {
  const { tests } = useTests()
  const [form, setForm] = useState({ name: '', phone: '', testId: '' })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name required'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Valid 10-digit number required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    const selected = tests.find(t => t.id === Number(form.testId))
    // Pass prefill so BookingModal skips to Schedule step
    onBook(selected || null, { name: form.name.trim(), phone: form.phone.trim() })
  }

  return (
    <section className="bg-hero text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-apollo-pink/10 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              NABL Accredited · ISO 9001:2015 · CAP Certified
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Your Trusted Diagnostic Partner in
              <span className="text-apollo-pink-light block mt-1">Tirumala-Tirupati Region</span>
            </h1>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              Serving pilgrims visiting Tirumala, local residents, and corporates across Tirupati,
              Tiruchanoor, Renigunta, Chandragiri &amp; Chittoor with accurate, affordable diagnostics.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-pink"
              >
                Book a Test
              </button>
              <button
                onClick={() => openWhatsApp(buildWhatsAppGeneralMessage())}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </button>
              <a href="tel:+917207074078" className="flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-6 py-2.5 rounded-full transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {STATS.map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                  <div className="text-2xl mb-0.5">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-white">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Book Form */}
          <div className="animate-slide-up w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <h2 className="text-apollo-teal font-bold text-xl">Quick Book a Test</h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">Enter your details — we'll skip straight to scheduling.</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(x => ({ ...x, name: '' })) }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none transition-all ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(x => ({ ...x, phone: '' })) }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none transition-all ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Test <span className="text-gray-400 font-normal">(optional)</span></label>
                  <select
                    value={form.testId}
                    onChange={e => setForm(f => ({ ...f, testId: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20 transition-all bg-white"
                  >
                    <option value="">— Choose a test (optional) —</option>
                    {tests.map(t => (
                      <option key={t.id} value={t.id}>{t.name} — ₹{t.price}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full btn-pink py-3 text-base mt-1">
                  Book Appointment →
                </button>
              </form>
              <div className="flex items-start gap-2 mt-3 p-3 bg-green-50 rounded-xl">
                <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-green-700 font-medium">Free home collection across Tirupati, Tiruchanoor, Renigunta, Chandragiri &amp; Chittoor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
