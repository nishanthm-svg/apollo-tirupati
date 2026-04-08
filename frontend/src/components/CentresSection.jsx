import { useCentres } from '../hooks/useApi.js'
import { openWhatsApp, buildWhatsAppGeneralMessage } from '../utils/whatsapp.js'

export default function CentresSection() {
  const { centres } = useCentres()

  const FACILITIES = ['NABL Accredited', 'Home Collection', 'Digital Reports', 'Phlebotomist', 'Waiting Area']

  return (
    <section id="centres" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">Our Centres</h2>
          <p className="section-sub">4 convenient locations across the Tirupati-Tirumala region. All open early morning for pilgrims.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {centres.map(centre => (
            <div key={centre.id} className="card p-5 flex flex-col hover:border-apollo-pink hover:-translate-y-1 transition-all duration-300">
              {/* Icon + Home Collection badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-apollo-teal/10 flex items-center justify-center text-2xl">
                  🏥
                </div>
                {centre.homeCollection && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Home Collection
                  </span>
                )}
              </div>

              {/* Name */}
              <h3 className="font-bold text-apollo-teal text-sm leading-snug mb-1">{centre.name}</h3>

              {/* Address */}
              <p className="text-gray-500 text-xs mb-1 leading-relaxed">{centre.address}</p>
              <p className="text-gray-400 text-xs mb-3 italic">{centre.landmark}</p>

              {/* Phone */}
              <a
                href={`tel:${centre.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 text-apollo-teal font-medium text-sm mb-1 hover:text-apollo-pink transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {centre.phone}
              </a>

              {/* Timing */}
              <div className="flex items-start gap-1.5 mb-4">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-xs leading-relaxed">{centre.timing}</p>
              </div>

              {/* Facility badges */}
              <div className="flex flex-wrap gap-1 mb-4">
                {FACILITIES.slice(0, 3).map(f => (
                  <span key={f} className="text-xs bg-apollo-teal/10 text-apollo-teal rounded-full px-2 py-0.5">{f}</span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex gap-2">
                  <a
                    href={`tel:${centre.phone.replace(/\s+/g, '')}`}
                    className="flex-1 text-center bg-apollo-pink hover:bg-apollo-pink-dark text-white text-xs font-semibold py-2 rounded-xl transition-all"
                  >
                    Call
                  </a>
                  <a
                    href={centre.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-apollo-teal text-apollo-teal hover:bg-apollo-teal hover:text-white text-xs font-semibold py-2 rounded-xl transition-all"
                  >
                    Directions
                  </a>
                </div>
                <button
                  onClick={() => openWhatsApp(buildWhatsAppGeneralMessage())}
                  className="w-full flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 rounded-xl transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
