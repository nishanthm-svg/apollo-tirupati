import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import TestCard from './TestCard.jsx'

const CATEGORIES = [
  'All', 'Blood Tests', 'Blood Chemistry', 'Thyroid', 'Liver', 'Kidney',
  'Vitamins & Minerals', 'Urine', 'Cardiac', 'Hormones', 'Infections/Serology'
]

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 99999 },
  { label: 'Under ₹200', min: 0, max: 200 },
  { label: '₹200 - ₹500', min: 200, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000+', min: 1000, max: 99999 },
]

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
]

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="h-1 skeleton" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-20 rounded-full" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-24 rounded-full" />
        </div>
        <div className="skeleton h-8 w-1/3 rounded mt-2" />
        <div className="skeleton h-10 w-full rounded-xl mt-1" />
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}

export default function TestsSection({ onBook, selectedCentre }) {
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState(0)
  const [sort, setSort] = useState('popular')
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)
  const debounceRef = useRef(null)

  const fetchTests = useCallback(async (params) => {
    setLoading(true)
    try {
      const res = await axios.get('/api/tests', { params })
      setTests(res.data)
      setVisibleCount(12)
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const pr = PRICE_RANGES[priceRange]
      const params = { sort }
      if (category !== 'All') params.category = category
      if (search.trim()) params.search = search.trim()
      if (pr.max !== 99999) params.maxPrice = pr.max
      if (pr.min > 0) params.minPrice = pr.min
      fetchTests(params)
    }, 300)
  }, [category, priceRange, sort, search, fetchTests])

  const visible = tests.slice(0, visibleCount)

  return (
    <section id="tests" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="section-title">Diagnostic Tests</h2>
          <p className="section-sub">500+ tests available. NABL accredited. Fast reports. Affordable prices.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-apollo-pink transition-all bg-gray-50">
              <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by test name, category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
              />
              {search && (
                <button onClick={() => setSearch('')} className="ml-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-apollo-pink transition-all text-gray-700"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-apollo-pink text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-apollo-pink-light hover:text-apollo-pink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 font-medium self-center">Price:</span>
            {PRICE_RANGES.map((pr, i) => (
              <button
                key={i}
                onClick={() => setPriceRange(i)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  priceRange === i
                    ? 'bg-apollo-teal text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-apollo-teal/10 hover:text-apollo-teal'
                }`}
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-5">
            Showing <strong className="text-apollo-teal">{Math.min(visibleCount, tests.length)}</strong> of <strong className="text-apollo-teal">{tests.length}</strong> tests
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : tests.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No tests found</h3>
            <p className="text-gray-500 mb-4">Try searching with different keywords or clear the filters.</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setPriceRange(0); setSort('popular') }}
              className="btn-outline-pink"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visible.map(test => (
                <TestCard key={test.id} test={test} onBook={onBook} selectedCentre={selectedCentre} />
              ))}
            </div>
            {visibleCount < tests.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount(v => v + 12)}
                  className="btn-outline-pink"
                >
                  Load More ({tests.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
