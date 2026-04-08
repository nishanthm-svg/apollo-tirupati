const TESTIMONIALS = [
  {
    name: 'Ramesh Naidu',
    location: 'Tirupati',
    avatar: 'RN',
    stars: 5,
    text: "Excellent service! I booked a CBC test via WhatsApp and got a confirmation within minutes. The phlebotomist arrived at my home in Tirupati exactly on time, and I received my digital report in just 5 hours. Highly recommended for everyone in Tirupati!",
    test: 'CBC + Lipid Profile',
    color: 'bg-blue-600',
  },
  {
    name: 'Lakshmi Venkat',
    location: 'Tiruchanoor',
    avatar: 'LV',
    stars: 5,
    text: "I live near Padmavathi Temple and the Apollo centre in Tiruchanoor is very convenient. Very affordable prices compared to other labs. My thyroid reports were very accurate — my doctor was happy. Will continue using Apollo for all family tests.",
    test: 'Thyroid Profile',
    color: 'bg-pink-600',
  },
  {
    name: 'Suresh Reddy',
    location: 'Renigunta',
    avatar: 'SR',
    stars: 5,
    text: "Being near the railway station, the Renigunta centre is very accessible. Visited for Vitamin D and B12 tests. Staff was professional and courteous. Used the TIRUMALA20 offer code — saved quite a bit! Reports on WhatsApp was a great touch.",
    test: 'Vitamin D + B12',
    color: 'bg-green-600',
  },
  {
    name: 'Padma Rao',
    location: 'Tirupati',
    avatar: 'PR',
    stars: 5,
    text: "As a diabetic patient, I need regular HbA1c and KFT tests. Apollo Diagnostics in Tirupati has been my go-to lab for the past year. Consistent accuracy, fast results, and the diabetes care package is excellent value for money.",
    test: 'Diabetes Care Package',
    color: 'bg-purple-600',
  },
  {
    name: 'Venkata Krishnan',
    location: 'Chandragiri',
    avatar: 'VK',
    stars: 5,
    text: "Booked the Aarogyam package for annual checkup. 77 tests done in one visit! The staff was very helpful, explained every test clearly. Got reports same day. Chandragiri centre is well maintained and clean. Truly world-class service.",
    test: 'Aarogyam B Package',
    color: 'bg-orange-600',
  },
  {
    name: 'Anitha Devi',
    location: 'Tirupati',
    avatar: 'AD',
    stars: 5,
    text: "Free home collection is a boon for senior citizens like me. The phlebotomist was very gentle and patient. Apollo diagnostics truly cares for patients. WhatsApp booking is so easy — even my elderly mother can use it without any trouble.",
    test: 'Senior Citizen Package',
    color: 'bg-teal-600',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array(count).fill(0).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-sub">Real reviews from real patients across Tirupati, Tiruchanoor, Renigunta &amp; Chandragiri.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card p-6 flex flex-col hover:-translate-y-1 transition-all duration-300">
              {/* Quote icon */}
              <svg className="w-8 h-8 text-apollo-pink/20 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5 flex-1">{t.text}</p>

              {/* Test badge */}
              <div className="inline-flex w-fit mb-4">
                <span className="text-xs bg-apollo-teal/10 text-apollo-teal rounded-full px-2.5 py-1 font-medium">
                  {t.test}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {t.location}
                  </p>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">⭐</div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="mt-10 bg-apollo-teal text-white rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-black">4.9</div>
            <StarRating count={5} />
            <div className="text-white/70 text-sm mt-1">Overall Rating</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-black">10,000+</div>
            <div className="text-white/70 text-sm mt-1">Happy Patients</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-black">500+</div>
            <div className="text-white/70 text-sm mt-1">5-Star Reviews</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-4xl font-black">98%</div>
            <div className="text-white/70 text-sm mt-1">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
