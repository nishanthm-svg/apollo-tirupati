import { useState } from 'react'
import { useOffers } from '../hooks/useApi.js'
import { openWhatsApp, buildWhatsAppGeneralMessage } from '../utils/whatsapp.js'

const GRADIENTS = [
  'from-red-500 to-orange-400',
  'from-purple-600 to-pink-500',
  'from-green-500 to-teal-400',
  'from-blue-600 to-cyan-400',
  'from-apollo-teal to-apollo-teal-light',
  'from-apollo-pink to-pink-400',
]

const EMOJIS = ['🙏', '💊', '🚗', '👴', '🌅', '🎉']

export default function OffersSection({ onBook }) {
  const { offers } = useOffers()
  const [copied, setCopied] = useState(null)

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(code)
      setTimeout(() => setCopied(null), 2500)
    } catch { /* fallback */ }
  }

  return (
    <section id="offers" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">Special Offers &amp; Discounts</h2>
          <p className="section-sub">Save more on health tests with our exclusive offers. Valid for Tirupati residents and Tirumala pilgrims.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <div key={offer.id} className="card overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300">
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${GRADIENTS[i % GRADIENTS.length]} p-5 text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl">{EMOJIS[i % EMOJIS.length]}</span>
                    <h3 className="font-bold text-lg mt-2 leading-tight">{offer.title}</h3>
                  </div>
                  {offer.discount > 0 && (
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-3xl font-black">
                        {offer.type === 'flat' ? `₹${offer.discount}` : `${offer.discount}%`}
                      </div>
                      <div className="text-white/80 text-xs">
                        {offer.type === 'flat' ? 'FLAT OFF' : 'OFF'}
                      </div>
                    </div>
                  )}
                  {offer.type === 'free_service' && (
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-2xl font-black">FREE</div>
                      <div className="text-white/80 text-xs">SERVICE</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{offer.description}</p>

                {/* Validity + min order */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Valid till {new Date(offer.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  {offer.minOrder > 0 && (
                    <div className="text-xs text-gray-500">
                      Min. ₹{offer.minOrder}
                    </div>
                  )}
                </div>

                {/* Coupon Code */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 flex items-center border-2 border-dashed border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
                    <span className="text-sm font-mono font-bold text-apollo-teal tracking-wider flex-1">{offer.coupon}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(offer.coupon)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      copied === offer.coupon
                        ? 'bg-green-500 text-white'
                        : 'bg-apollo-teal text-white hover:bg-apollo-teal-light'
                    }`}
                  >
                    {copied === offer.coupon ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* CTA */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex-1 bg-apollo-pink hover:bg-apollo-pink-dark text-white text-sm font-semibold py-2 rounded-xl transition-all"
                  >
                    Use Offer
                  </button>
                  <button
                    onClick={() => openWhatsApp(buildWhatsAppGeneralMessage())}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
