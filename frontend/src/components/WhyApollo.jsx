const REASONS = [
  {
    icon: '🏅',
    title: 'NABL Accredited',
    description: 'Our lab holds NABL accreditation — the highest quality standard for diagnostic laboratories in India, ensuring accurate results.',
    color: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '🚗',
    title: 'Free Home Collection',
    description: 'Get samples collected from your home by trained phlebotomists. Free on orders above ₹500 across Tirupati region.',
    color: 'bg-green-50 border-green-100',
    iconBg: 'bg-green-100',
  },
  {
    icon: '⚡',
    title: 'Fast Reports',
    description: 'Most reports delivered within 4-6 hours. Urgent tests processed on priority. Digital reports via WhatsApp and email.',
    color: 'bg-yellow-50 border-yellow-100',
    iconBg: 'bg-yellow-100',
  },
  {
    icon: '💰',
    title: 'Affordable Prices',
    description: 'Transparent pricing with no hidden charges. Up to 50% discount on tests and health packages compared to MRP.',
    color: 'bg-purple-50 border-purple-100',
    iconBg: 'bg-purple-100',
  },
  {
    icon: '👨‍⚕️',
    title: 'Expert Team',
    description: 'Experienced pathologists, microbiologists, and biochemists with 20+ years of collective expertise in diagnostics.',
    color: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100',
  },
  {
    icon: '🏆',
    title: 'ISO 9001:2015 Certified',
    description: 'ISO certified quality management system ensuring consistent, reliable diagnostic services and patient safety.',
    color: 'bg-teal-50 border-teal-100',
    iconBg: 'bg-teal-100',
  },
]

export default function WhyApollo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose Apollo Diagnostics?</h2>
          <p className="section-sub">Trusted by 10,000+ patients in Tirupati. Committed to accuracy, affordability, and care.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-6 ${r.color} hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default`}
            >
              <div className={`w-14 h-14 rounded-2xl ${r.iconBg} flex items-center justify-center text-3xl mb-4`}>
                {r.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{r.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications Strip */}
        <div className="mt-12 bg-apollo-teal/5 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-6 border border-apollo-teal/10">
          <span className="text-sm font-medium text-gray-600">Certifications:</span>
          {['NABL Accredited', 'ISO 9001:2015', 'CAP Certified', 'Apollo Group'].map(cert => (
            <div key={cert} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm">
              <svg className="w-4 h-4 text-apollo-teal" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-apollo-teal">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
