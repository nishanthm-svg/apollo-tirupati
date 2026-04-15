const CITIES = [
  {
    city: 'Tirupati',
    tagline: '#1 Diagnostic Lab in Tirupati',
    description: 'Apollo Diagnostics is Tirupati\'s most trusted NABL-accredited blood test and diagnostic centre. Serving the Tirumala-Tirupati pilgrimage region and local residents since 2000.',
    highlight: 'Near Devasthanam Bus Stand, MG Road',
    tests: ['CBC Blood Test – ₹299', 'HbA1c (Diabetes) – ₹449', 'Thyroid TSH – ₹249', 'Lipid Profile – ₹399', 'Vitamin D – ₹799', 'Kidney Function – ₹499'],
    icon: '🏛️',
    keywords: 'blood test tirupati, lab test tirupati, diagnostic centre tirupati',
  },
  {
    city: 'Chittoor',
    tagline: 'Best Blood Test Lab in Chittoor',
    description: 'Apollo Diagnostics Chittoor provides accurate diagnostic services with free home blood collection across Chittoor city. NABL-accredited reports trusted by doctors across the Chittoor district.',
    highlight: 'Renigunta Road, Near RTC Bus Stand',
    tests: ['Blood Group Test – ₹149', 'Blood Glucose – ₹99', 'Urine Routine – ₹149', 'CBC Blood Count – ₹299', 'Thyroid Profile – ₹499', 'Liver Function – ₹599'],
    icon: '🌆',
    keywords: 'blood test chittoor, diagnostic centre chittoor, lab test chittoor',
  },
]

export default function CityLanding() {
  return (
    <section
      id="city-centres"
      className="py-16 bg-gradient-to-br from-apollo-teal/5 to-apollo-pink/5"
      aria-label="Blood test centres in Tirupati and Chittoor"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-apollo-teal/10 text-apollo-teal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">Our Service Areas</span>
          <h2 className="text-3xl font-extrabold text-apollo-teal mb-3">
            Blood Tests & Diagnostics in Tirupati & Chittoor
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted NABL-accredited diagnostic services. Free home collection. Same-day reports. Affordable prices across Tirupati, Chittoor, Tiruchanoor, Renigunta & Chandragiri.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {CITIES.map(c => (
            <article
              key={c.city}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              itemScope
              itemType="https://schema.org/MedicalOrganization"
            >
              <div className="bg-apollo-teal p-5 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <h3 className="text-xl font-extrabold" itemProp="name">
                      Apollo Diagnostics {c.city}
                    </h3>
                    <p className="text-white/80 text-sm">{c.tagline}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p
                  className="text-gray-600 text-sm mb-4 leading-relaxed"
                  itemProp="description"
                >
                  {c.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 text-apollo-pink shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  <span itemProp="address">{c.highlight}, {c.city}, Andhra Pradesh</span>
                </div>

                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Popular Tests & Prices</h4>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {c.tests.map(t => (
                    <div key={t} className="flex items-center gap-1.5 text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-apollo-pink shrink-0"></span>
                      {t}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/917207074078?text=Hi%2C%20I%20want%20to%20book%20a%20blood%20test%20in%20${c.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
                    itemProp="telephone"
                    content="+917207074078"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Book in {c.city}
                  </a>
                  <a
                    href="tel:+917207074078"
                    className="flex items-center justify-center gap-1.5 border-2 border-apollo-teal text-apollo-teal hover:bg-apollo-teal hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    Call
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Signals — keyword-rich text for crawlers & AI */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-apollo-teal mb-4 text-center">
            Why Apollo Diagnostics is the Most Searched Lab in Tirupati & Chittoor
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🏆', title: 'NABL Accredited', desc: 'Nationally accredited lab. Results trusted by all hospitals and doctors in Tirupati & Chittoor.' },
              { icon: '🏠', title: 'Free Home Collection', desc: 'Phlebotomist at your door in 60 minutes across Tirupati, Chittoor, Tiruchanoor & Renigunta.' },
              { icon: '⚡', title: 'Same-Day Reports', desc: 'Most blood test reports ready in 4–6 hours. WhatsApp delivery. No waiting at the centre.' },
              { icon: '💰', title: 'Lowest Prices', desc: 'CBC ₹299 | HbA1c ₹449 | Thyroid ₹499 | Vitamin D ₹799. Up to 40% off on all tests.' },
            ].map(item => (
              <div key={item.title} className="p-4 rounded-xl bg-gray-50">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-gray-800 text-sm mb-1">{item.title}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
