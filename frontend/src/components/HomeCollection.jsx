import { openWhatsApp, buildWhatsAppHomeCollectionMessage } from '../utils/whatsapp.js'

const FEATURES = [
  'Trained & certified phlebotomists at your doorstep',
  'Early morning slots starting 6 AM',
  'No extra charges on orders above ₹500',
  'Samples handled with strict hygiene protocols',
  'Digital reports within hours via WhatsApp/Email',
  'Book in minutes via WhatsApp or call',
]

const AREAS = [
  'Tirupati City', 'Tiruchanoor', 'Renigunta', 'Chandragiri', 'Alipiri', 'Karakambadi'
]

export default function HomeCollection() {
  return (
    <section id="home-collection" className="py-16 bg-apollo-teal text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-5 border border-white/20">
              <span className="text-green-400">🚗</span>
              Free Home Collection Available
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Free Home Collection in Tirupati
              <span className="block text-apollo-pink-light mt-1">We Come to You!</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              No need to visit our centre. Our trained phlebotomists collect your sample from the
              comfort of your home. Available across Tirupati, Tiruchanoor, Renigunta &amp; surrounding areas.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openWhatsApp(buildWhatsAppHomeCollectionMessage())}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book Home Collection
              </button>
              <a
                href="tel:+917207074078"
                className="flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call +91 72070 74078
              </a>
            </div>
          </div>

          {/* Right - Available Areas */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-2">Home Collection Available In:</h3>
              <p className="text-white/70 text-sm mb-5">We cover all major areas in Tirupati &amp; surrounding regions</p>
              <div className="grid grid-cols-2 gap-3">
                {AREAS.map(area => (
                  <div key={area} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{area}</span>
                  </div>
                ))}
              </div>

              {/* Info box */}
              <div className="mt-5 flex items-start gap-3 bg-white/10 rounded-xl p-4">
                <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold">Free collection on orders ₹500+</p>
                  <p className="text-xs text-white/70 mt-0.5">Available 6 AM - 6 PM daily. Call or WhatsApp to schedule.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
