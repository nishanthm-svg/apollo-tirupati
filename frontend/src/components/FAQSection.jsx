import { useState } from 'react'

const FAQS = [
  {
    q: 'Which is the best blood test lab in Tirupati?',
    a: 'Apollo Diagnostics is the #1 NABL-accredited blood test lab in Tirupati. With NABL, ISO 9001:2015, and CAP certifications, we offer 500+ tests, same-day reports, and free home collection across Tirupati, Tiruchanoor, Renigunta, Chandragiri & Chittoor.',
  },
  {
    q: 'What is the price of CBC blood test in Tirupati?',
    a: 'Complete Blood Count (CBC) costs only ₹299 at Apollo Diagnostics Tirupati (34% discount from ₹450). Results are delivered the same day within 4–6 hours.',
  },
  {
    q: 'Does Apollo Diagnostics Tirupati offer free home blood collection?',
    a: 'Yes! Free home blood collection is available 24/7 across Tirupati, Tiruchanoor, Renigunta, Chandragiri, and Chittoor. A trained phlebotomist visits your home within 60 minutes. Book via WhatsApp: +91 72070 74078.',
  },
  {
    q: 'Is there a diagnostic centre in Chittoor with home collection?',
    a: 'Yes. Apollo Diagnostics Chittoor is located on Renigunta Road near RTC Bus Stand, Chittoor. Free home collection is available across Chittoor city. Call +91 72070 74078.',
  },
  {
    q: 'What is the price of thyroid test (TSH) in Tirupati?',
    a: 'TSH (Thyroid Stimulating Hormone) test costs ₹249 at Apollo Diagnostics Tirupati. Full Thyroid Profile (T3, T4, TSH) is ₹499. A complete Thyroid Package with all markers is ₹1299.',
  },
  {
    q: 'What is the price of HbA1c diabetes test in Tirupati?',
    a: 'HbA1c (Glycated Hemoglobin) test is ₹449 at Apollo Diagnostics Tirupati. The Diabetes Monitoring Package (HbA1c + glucose + urine) is available at ₹999.',
  },
  {
    q: 'How long does it take to get blood test reports in Tirupati?',
    a: 'Most tests are reported within 4–6 hours. CBC, blood glucose, and urine tests are same-day. Specialized cultures may take 24–48 hours. Reports are sent digitally on WhatsApp.',
  },
  {
    q: 'What time does Apollo Diagnostics Tirupati open?',
    a: 'Monday–Saturday: 6:30 AM – 9:00 PM. Sunday: 7:00 AM – 1:00 PM. Early morning slots from 6:30 AM are ideal for fasting tests (glucose, lipid profile, thyroid).',
  },
  {
    q: 'What health checkup packages are available in Tirupati?',
    a: "Apollo Diagnostics Tirupati offers Aarogyam Basic (35 tests, ₹999), Aarogyam A (55 tests, ₹1499), Aarogyam B (77 tests, ₹2499), Women's Health Package (₹1999), Cardiac Risk Assessment (₹1499), and senior citizen packages.",
  },
  {
    q: 'What is the price of Vitamin D test in Tirupati?',
    a: 'Vitamin D (25-OH) test costs ₹799 at Apollo Diagnostics Tirupati. Vitamin B12 is ₹699. Both can be booked with free home collection.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-16 bg-white" aria-label="Frequently Asked Questions about blood tests in Tirupati and Chittoor">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-apollo-pink/10 text-apollo-pink text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">FAQs</span>
          <h2 className="text-3xl font-extrabold text-apollo-teal mb-3">
            Blood Tests in Tirupati & Chittoor — Common Questions
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Everything you need to know about booking blood tests, prices, home collection, and reports at Apollo Diagnostics Tirupati.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base" itemProp="name">
                  {faq.q}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-apollo-pink text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>

              {open === i && (
                <div
                  className="px-5 pb-4 bg-apollo-teal/5 border-t border-gray-100"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-3" itemProp="text">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA below FAQs */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have questions? Talk to us instantly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/917207074078?text=Hi%2C%20I%20have%20a%20question%20about%20blood%20tests%20in%20Tirupati"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+917207074078"
              className="flex items-center justify-center gap-2 border-2 border-apollo-teal text-apollo-teal hover:bg-apollo-teal hover:text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call +91 72070 74078
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
