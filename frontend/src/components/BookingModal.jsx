import { useState, useEffect } from 'react'
import { createBooking } from '../hooks/useApi.js'
import { openWhatsApp, buildWhatsAppBookingConfirmMessage } from '../utils/whatsapp.js'

const CENTRES = [
  'Tirupati (MG Road)',
  'Tiruchanoor',
  'Renigunta',
  'Chandragiri',
  'Chittoor',
]

const TIME_SLOTS = [
  '6AM - 8AM',
  '8AM - 10AM',
  '10AM - 12PM',
  '12PM - 2PM',
  '2PM - 4PM',
  '4PM - 6PM',
]

const STEPS = ['Your Details', 'Schedule', 'Confirmed']

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

export default function BookingModal({ test, pkg, isOpen, onClose, selectedCentre, prefill }) {
  const initialStep = (prefill?.name && prefill?.phone) ? 2 : 1
  const [step, setStep] = useState(initialStep)
  const [form, setForm] = useState({
    name: prefill?.name || '', phone: prefill?.phone || '', email: '',
    centre: selectedCentre || CENTRES[0],
    date: getTodayStr(),
    timeSlot: '',
    homeCollection: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState(null)

  // Reset form whenever modal opens with new prefill/test
  useEffect(() => {
    if (isOpen) {
      const hasPrefill = prefill?.name && prefill?.phone
      setStep(hasPrefill ? 2 : 1)
      setForm({
        name: prefill?.name || '',
        phone: prefill?.phone || '',
        email: '',
        centre: selectedCentre || CENTRES[0],
        date: getTodayStr(),
        timeSlot: '',
        homeCollection: false,
      })
      setErrors({})
      setBooking(null)
    }
  }, [isOpen, prefill, selectedCentre])

  const item = test || pkg

  const validate1 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid phone is required'
    return e
  }

  const validate2 = () => {
    const e = {}
    if (!form.centre) e.centre = 'Select a centre'
    if (!form.date) e.date = 'Select a date'
    if (!form.timeSlot) e.timeSlot = 'Select a time slot'
    return e
  }

  const handleNext = () => {
    if (step === 1) {
      const e = validate1()
      if (Object.keys(e).length) { setErrors(e); return }
      setErrors({})
      setStep(2)
    } else if (step === 2) {
      const e = validate2()
      if (Object.keys(e).length) { setErrors(e); return }
      setErrors({})
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        testId: test?.id,
        testName: test?.name,
        packageId: pkg?.id,
        packageName: pkg?.name,
        amount: item?.price || 0,
        centre: form.centre,
        date: form.date,
        timeSlot: form.timeSlot,
        homeCollection: form.homeCollection,
      }
      const res = await createBooking(payload)
      setBooking(res.booking || res)
      setStep(3)
    } catch (err) {
      alert('Booking failed. Please try again or contact us via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setForm({ name: '', phone: '', email: '', centre: selectedCentre || CENTRES[0], date: getTodayStr(), timeSlot: '', homeCollection: false })
    setErrors({})
    setBooking(null)
    onClose()
  }

  if (!isOpen) return null
  // If no test/pkg selected (e.g. Quick Book without test), use a placeholder
  const displayItem = item || { name: 'General Appointment', price: 0 }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="bg-apollo-teal text-white p-5 rounded-t-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="font-bold text-lg">{step < 3 ? 'Book Appointment' : 'Booking Confirmed!'}</h2>
              <p className="text-white/70 text-sm mt-0.5 line-clamp-1">{displayItem.name}</p>
            </div>
            <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-1">
                <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-white' : 'bg-white/30'}`} />
                {i < STEPS.length - 1 && <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i + 1 < step ? 'bg-white' : 'bg-white/30'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {STEPS.map((s, i) => (
              <span key={s} className={`text-xs ${i + 1 <= step ? 'text-white' : 'text-white/50'}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="p-5">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Test Summary */}
              <div className="bg-apollo-teal/5 rounded-xl p-3 border border-apollo-teal/10">
                <p className="text-xs text-gray-500 mb-0.5">Booking for</p>
                <p className="font-semibold text-apollo-teal">{displayItem.name}</p>
                {displayItem.price > 0 && <p className="text-apollo-pink font-bold">₹{displayItem.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20 transition-all"
                />
              </div>

              <button onClick={handleNext} className="w-full btn-pink py-3">
                Continue to Schedule
              </button>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Collection Toggle */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <span className="text-sm font-medium text-gray-700">Collection Type:</span>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setForm(f => ({ ...f, homeCollection: false }))}
                    className={`px-4 py-1.5 text-sm font-medium transition-all ${!form.homeCollection ? 'bg-apollo-teal text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    Walk-in
                  </button>
                  <button
                    onClick={() => setForm(f => ({ ...f, homeCollection: true }))}
                    className={`px-4 py-1.5 text-sm font-medium transition-all ${form.homeCollection ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    Home Collection
                  </button>
                </div>
              </div>

              {/* Centre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Centre *</label>
                <select
                  value={form.centre}
                  onChange={e => setForm(f => ({ ...f, centre: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm bg-white outline-none transition-all ${errors.centre ? 'border-red-400' : 'border-gray-200 focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20'}`}
                >
                  {CENTRES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.centre && <p className="text-red-500 text-xs mt-1">{errors.centre}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  value={form.date}
                  min={getTodayStr()}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${errors.date ? 'border-red-400' : 'border-gray-200 focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20'}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot *</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setForm(f => ({ ...f, timeSlot: slot }))}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                        form.timeSlot === slot
                          ? 'bg-apollo-pink text-white border-apollo-pink'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-apollo-pink hover:text-apollo-pink'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 btn-outline-pink py-2.5">
                  Back
                </button>
                <button onClick={handleNext} disabled={loading} className="flex-1 btn-pink py-2.5 disabled:opacity-60">
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && booking && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
              <p className="text-gray-500 text-sm mb-5">We'll contact you shortly to confirm your appointment.</p>

              {/* Booking Details Card */}
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Booking ID</span>
                  <span className="font-bold text-apollo-teal">{booking.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Test</span>
                  <span className="font-medium text-gray-800 text-right max-w-[60%]">{booking.test}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Centre</span>
                  <span className="font-medium text-gray-800">{booking.centre}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-medium text-gray-800">{booking.date} · {booking.timeSlot}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-apollo-pink">₹{booking.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Collection</span>
                  <span className="font-medium">{booking.homeCollection ? 'Home Collection' : 'Walk-in'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openWhatsApp(buildWhatsAppBookingConfirmMessage(booking))}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Share on WhatsApp
                </button>
                <button onClick={handleClose} className="w-full btn-outline-pink py-2.5">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
