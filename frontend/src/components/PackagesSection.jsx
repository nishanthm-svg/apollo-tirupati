import { usePackages } from '../hooks/useApi.js'
import { openWhatsApp, buildWhatsAppPackageMessage } from '../utils/whatsapp.js'

const ICONS = {
  1: '🏥', 2: '💊', 3: '🔬', 4: '🧪', 5: '🩺',
  6: '🦋', 7: '❤️', 8: '👩', 9: '👴', 10: '💑', 11: '💼'
}

const BADGE_COLORS = {
  BESTSELLER: 'bg-red-500',
  POPULAR: 'bg-orange-500',
  RECOMMENDED: 'bg-blue-500',
  'HEART CARE': 'bg-red-600',
  "WOMEN'S HEALTH": 'bg-pink-500',
  'SENIOR CARE': 'bg-purple-500',
  CORPORATE: 'bg-gray-700',
}

export default function PackagesSection({ onBook, selectedCentre }) {
  const { packages, loading } = usePackages()

  if (loading) {
    return (
      <section id="packages" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="skeleton h-8 w-64 mx-auto mb-2 rounded" />
            <div className="skeleton h-4 w-96 mx-auto rounded" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse h-64" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">Health Packages</h2>
          <p className="section-sub">Comprehensive health checkup packages at unbeatable prices. NABL accredited lab.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => {
            const isFeatured = pkg.name === 'Aarogyam B'
            const saving = pkg.originalPrice - pkg.price
            const includesArr = Array.isArray(pkg.includes) ? pkg.includes : [pkg.includes]

            return (
              <div
                key={pkg.id}
                className={`relative card flex flex-col overflow-hidden ${isFeatured ? 'ring-2 ring-apollo-pink ring-offset-2' : ''}`}
              >
                {/* Top color strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-apollo-teal to-apollo-pink" />

                {/* Featured badge */}
                {isFeatured && (
                  <div className="absolute top-3 left-3 bg-apollo-pink text-white text-xs font-bold px-3 py-0.5 rounded-full shadow">
                    FEATURED
                  </div>
                )}

                {/* Badge */}
                {pkg.badge && (
                  <div className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-0.5 rounded-full ${BADGE_COLORS[pkg.badge] || 'bg-apollo-teal'}`}>
                    {pkg.badge}
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  {/* Icon + Name */}
                  <div className="flex items-start gap-3 mb-3 mt-4">
                    <span className="text-3xl">{ICONS[pkg.id] || '🧬'}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{pkg.name}</h3>
                      <p className="text-xs text-apollo-teal font-medium">{pkg.testCount} Tests Included</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{pkg.description}</p>

                  {/* Test Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {includesArr.slice(0, 6).map((item, i) => (
                      <span key={i} className="text-xs bg-apollo-teal/10 text-apollo-teal rounded-full px-2 py-0.5">
                        {item}
                      </span>
                    ))}
                    {includesArr.length > 6 && (
                      <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                        +{includesArr.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-2xl font-extrabold text-apollo-teal">₹{pkg.price}</span>
                    <span className="text-gray-400 line-through text-sm mb-0.5">₹{pkg.originalPrice}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-1.5 py-0.5 rounded mb-0.5">
                      {pkg.discount}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-green-600 font-medium mb-4">You save ₹{saving}</p>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => onBook(null, pkg)}
                      className="w-full bg-apollo-teal hover:bg-apollo-teal-light text-white font-semibold py-2 rounded-xl transition-all text-sm hover:shadow-md"
                    >
                      Book Package
                    </button>
                    <button
                      onClick={() => openWhatsApp(buildWhatsAppPackageMessage(pkg, selectedCentre))}
                      className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl transition-all text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Book via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
