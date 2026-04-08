import { useState, useEffect } from 'react'
import axios from 'axios'
import { adminLogin, useAdminData } from '../hooks/useApi.js'

// ── Sidebar nav items ──────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'tests', label: 'Tests', icon: '🔬' },
  { id: 'packages', label: 'Packages', icon: '📦' },
  { id: 'offers', label: 'Offers', icon: '🏷️' },
  { id: 'centres', label: 'Centres', icon: '🏥' },
  { id: 'bookings', label: 'Bookings', icon: '📅' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

// ── Login Form ─────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      const res = await adminLogin(u, p)
      onLogin(res.token)
    } catch { setErr('Invalid credentials. Use admin / apollo@123') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-apollo-teal flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏥</div>
          <h1 className="text-2xl font-extrabold text-apollo-teal">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Apollo Diagnostics Tirupati</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input value={u} onChange={e => setU(e.target.value)} type="text" placeholder="admin"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink focus:ring-2 focus:ring-apollo-pink/20 transition-all" />
          </div>
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-apollo-pink hover:bg-apollo-pink-dark text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">Hint: admin / apollo@123</p>
      </div>
    </div>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  return (
    <div className={`rounded-2xl p-5 text-white ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-sm">{label}</p>
          <p className="text-3xl font-black mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function Dashboard({ token }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setData(r.data))
  }, [token])

  if (!data) return <div className="text-center py-10 text-gray-400">Loading dashboard...</div>

  const { stats, recentBookings } = data
  return (
    <div>
      <h2 className="text-2xl font-bold text-apollo-teal mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Bookings" value={stats.totalBookings} icon="📅" color="bg-apollo-teal" />
        <StatCard label="Confirmed" value={stats.confirmedBookings} icon="✅" color="bg-green-600" />
        <StatCard label="Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon="💰" color="bg-purple-600" />
        <StatCard label="Total Tests" value={stats.totalTests} icon="🔬" color="bg-blue-600" />
        <StatCard label="Packages" value={stats.totalPackages} icon="📦" color="bg-orange-500" />
        <StatCard label="Centres" value={stats.totalCentres} icon="🏥" color="bg-apollo-pink" />
      </div>
      <h3 className="font-bold text-gray-800 mb-3">Recent Bookings</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Patient', 'Test', 'Centre', 'Date', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(b => (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-apollo-teal font-bold">{b.id}</td>
                  <td className="px-4 py-3 font-medium">{b.name}<br/><span className="text-xs text-gray-400">{b.phone}</span></td>
                  <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{b.test}</td>
                  <td className="px-4 py-3 text-gray-600">{b.centre}</td>
                  <td className="px-4 py-3 text-gray-600">{b.date}</td>
                  <td className="px-4 py-3 font-semibold text-apollo-teal">₹{b.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Tests Manager ──────────────────────────────────────────────────────────────
function TestsManager({ token }) {
  const { data: tests, loading, refetch } = useAdminData('/admin/tests', token)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({})

  const filtered = tests.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))

  const openAdd = () => {
    setForm({ name: '', category: 'Blood Tests', price: '', originalPrice: '', discount: '', reportTime: '6 Hours', sampleType: 'Blood', fasting: false, description: '', popular: false })
    setModal('add')
  }

  const openEdit = (t) => { setForm({ ...t }); setEditTarget(t); setModal('edit') }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this test?')) return
    await axios.delete(`/api/admin/tests/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    refetch()
  }

  const handleSave = async () => {
    try {
      if (modal === 'add') {
        await axios.post('/api/admin/tests', form, { headers: { Authorization: `Bearer ${token}` } })
      } else {
        await axios.put(`/api/admin/tests/${editTarget.id}`, form, { headers: { Authorization: `Bearer ${token}` } })
      }
      refetch(); setModal(null)
    } catch { alert('Failed to save') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-apollo-teal">Tests Management</h2>
        <button onClick={openAdd} className="btn-pink text-sm">+ Add Test</button>
      </div>

      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tests..."
          className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-apollo-pink transition-all" />
      </div>

      {loading ? <div className="text-center py-10 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Category', 'Price', 'Original', 'Discount', 'Report', 'Popular', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium max-w-[180px]"><div className="truncate">{t.name}</div></td>
                    <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{t.category}</td>
                    <td className="px-4 py-2.5 font-semibold text-apollo-teal">₹{t.price}</td>
                    <td className="px-4 py-2.5 text-gray-400 line-through">₹{t.originalPrice}</td>
                    <td className="px-4 py-2.5 text-green-600">{t.discount}%</td>
                    <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{t.reportTime}</td>
                    <td className="px-4 py-2.5">{t.popular ? <span className="text-xs bg-apollo-pink text-white px-2 py-0.5 rounded-full">Yes</span> : '–'}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(t)} className="text-xs text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(t.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-bold text-lg mb-4">{modal === 'add' ? 'Add Test' : 'Edit Test'}</h3>
            <div className="space-y-3">
              {[['name', 'Name'], ['category', 'Category'], ['price', 'Price'], ['originalPrice', 'Original Price'], ['discount', 'Discount %'], ['reportTime', 'Report Time'], ['sampleType', 'Sample Type']].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink transition-all resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!form.popular} onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))} className="accent-apollo-pink" />
                  Popular Test
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!form.fasting} onChange={e => setForm(f => ({ ...f, fasting: e.target.checked }))} className="accent-apollo-pink" />
                  Fasting Required
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 btn-outline-pink">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-pink">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Packages Manager ────────────────────────────────────────────────────────────
function PackagesManager({ token }) {
  const { data: packages, loading, refetch } = useAdminData('/admin/packages', token)
  const [modal, setModal] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({})

  const openAdd = () => { setForm({ name: '', testCount: '', price: '', originalPrice: '', discount: '', description: '', includes: '', badge: '', popular: false }); setModal('add') }
  const openEdit = (p) => { setForm({ ...p, includes: Array.isArray(p.includes) ? p.includes.join(', ') : p.includes }); setEditTarget(p); setModal('edit') }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return
    await axios.delete(`/api/admin/packages/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    refetch()
  }

  const handleSave = async () => {
    const payload = { ...form, includes: typeof form.includes === 'string' ? form.includes.split(',').map(s => s.trim()).filter(Boolean) : form.includes }
    try {
      if (modal === 'add') await axios.post('/api/admin/packages', payload, { headers: { Authorization: `Bearer ${token}` } })
      else await axios.put(`/api/admin/packages/${editTarget.id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
      refetch(); setModal(null)
    } catch { alert('Failed to save') }
  }

  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-apollo-teal">Packages Management</h2>
        <button onClick={openAdd} className="btn-pink text-sm">+ Add Package</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['Name', 'Tests', 'Price', 'Discount', 'Badge', 'Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {packages.map(p => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium">{p.name}</td>
                  <td className="px-4 py-2.5 text-gray-500">{p.testCount}</td>
                  <td className="px-4 py-2.5 font-semibold text-apollo-teal">₹{p.price}</td>
                  <td className="px-4 py-2.5 text-green-600">{p.discount}%</td>
                  <td className="px-4 py-2.5">{p.badge && <span className="text-xs bg-apollo-teal text-white px-2 py-0.5 rounded-full">{p.badge}</span>}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-xs text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-bold text-lg mb-4">{modal === 'add' ? 'Add Package' : 'Edit Package'}</h3>
            <div className="space-y-3">
              {[['name', 'Name'], ['testCount', 'Test Count'], ['price', 'Price'], ['originalPrice', 'Original Price'], ['discount', 'Discount %'], ['badge', 'Badge']].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Includes (comma separated)</label>
                <textarea value={typeof form.includes === 'string' ? form.includes : (form.includes || []).join(', ')} onChange={e => setForm(f => ({ ...f, includes: e.target.value }))} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 btn-outline-pink">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-pink">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Bookings Manager ────────────────────────────────────────────────────────────
function BookingsManager({ token }) {
  const { data: bookings, loading } = useAdminData('/admin/bookings', token)
  const [search, setSearch] = useState('')
  const filtered = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.phone.includes(search)
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-apollo-teal mb-6">Bookings</h2>
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, ID, phone..."
          className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-apollo-pink transition-all" />
      </div>
      {loading ? <div className="text-center py-10 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{['ID', 'Patient', 'Test/Package', 'Centre', 'Date', 'Time', 'Collection', 'Amount', 'Status', 'Booked At'].map(h => (
                  <th key={h} className="text-left px-3 py-3 text-gray-500 font-medium whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-mono text-xs font-bold text-apollo-teal">{b.id}</td>
                    <td className="px-3 py-2.5"><div className="font-medium">{b.name}</div><div className="text-xs text-gray-400">{b.phone}</div></td>
                    <td className="px-3 py-2.5 max-w-[160px]"><div className="truncate text-gray-700">{b.test}</div></td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">{b.centre}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">{b.date}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">{b.timeSlot}</td>
                    <td className="px-3 py-2.5">{b.homeCollection ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Home</span> : <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Walk-in</span>}</td>
                    <td className="px-3 py-2.5 font-semibold text-apollo-teal">₹{b.amount}</td>
                    <td className="px-3 py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{b.status}</span></td>
                    <td className="px-3 py-2.5 text-xs text-gray-400 whitespace-nowrap">{new Date(b.bookedAt).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No bookings found</div>}
        </div>
      )}
    </div>
  )
}

// ── Offers Manager ──────────────────────────────────────────────────────────────
function OffersManager({ token }) {
  const { data: offers, loading, refetch } = useAdminData('/admin/offers', token)
  const [modal, setModal] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({})

  const openAdd = () => { setForm({ title: '', description: '', discount: '', coupon: '', validTill: '', type: 'percentage', minOrder: 0, active: true }); setModal('add') }
  const openEdit = (o) => { setForm({ ...o }); setEditTarget(o); setModal('edit') }
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this offer?')) return
    await axios.delete(`/api/admin/offers/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    refetch()
  }
  const handleSave = async () => {
    try {
      if (modal === 'add') await axios.post('/api/admin/offers', form, { headers: { Authorization: `Bearer ${token}` } })
      else await axios.put(`/api/admin/offers/${editTarget.id}`, form, { headers: { Authorization: `Bearer ${token}` } })
      refetch(); setModal(null)
    } catch { alert('Failed to save') }
  }

  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-apollo-teal">Offers Management</h2>
        <button onClick={openAdd} className="btn-pink text-sm">+ Add Offer</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map(o => (
          <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900">{o.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${o.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{o.active ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">{o.description}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-apollo-teal font-bold text-sm">{o.coupon}</span>
              <span className="text-xs bg-apollo-pink/10 text-apollo-pink px-2 py-0.5 rounded-full">
                {o.type === 'flat' ? `₹${o.discount} OFF` : `${o.discount}% OFF`}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(o)} className="flex-1 text-xs text-center border border-blue-500 text-blue-600 py-1.5 rounded-xl hover:bg-blue-50">Edit</button>
              <button onClick={() => handleDelete(o.id)} className="flex-1 text-xs text-center border border-red-300 text-red-500 py-1.5 rounded-xl hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-bold text-lg mb-4">{modal === 'add' ? 'Add Offer' : 'Edit Offer'}</h3>
            <div className="space-y-3">
              {[['title', 'Title'], ['coupon', 'Coupon Code'], ['discount', 'Discount Value'], ['validTill', 'Valid Till'], ['minOrder', 'Min Order (₹)']].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    type={key === 'validTill' ? 'date' : 'text'}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select value={form.type || 'percentage'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-apollo-pink">
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat Amount</option>
                  <option value="free_service">Free Service</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink resize-none" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={!!form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="accent-apollo-pink" />
                Active
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 btn-outline-pink">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-pink">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Centres Manager ──────────────────────────────────────────────────────────────
function CentresManager({ token }) {
  const { data: centres, loading, refetch } = useAdminData('/admin/centres', token)
  const [modal, setModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({})

  const openEdit = (c) => { setForm({ ...c }); setEditTarget(c); setModal(true) }
  const handleSave = async () => {
    try {
      await axios.put(`/api/admin/centres/${editTarget.id}`, form, { headers: { Authorization: `Bearer ${token}` } })
      refetch(); setModal(false)
    } catch { alert('Failed to save') }
  }

  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>
  return (
    <div>
      <h2 className="text-2xl font-bold text-apollo-teal mb-6">Centres Management</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {centres.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-apollo-teal">{c.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>{c.active ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{c.address}</p>
            <p className="text-gray-400 text-xs mb-1">{c.timing}</p>
            <p className="text-apollo-teal text-sm font-medium mb-3">{c.phone}</p>
            <button onClick={() => openEdit(c)} className="w-full btn-outline-pink text-sm py-2">Edit Centre</button>
          </div>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">Edit Centre</h3>
            <div className="space-y-3">
              {[['name', 'Name'], ['address', 'Address'], ['phone', 'Phone'], ['timing', 'Timing'], ['landmark', 'Landmark'], ['mapLink', 'Map Link']].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-apollo-pink" />
                </div>
              ))}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                Active
              </label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(false)} className="flex-1 btn-outline-pink">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-pink">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Settings ──────────────────────────────────────────────────────────────────
function Settings({ token }) {
  const [settings, setSettings] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    axios.get('/api/admin/settings', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setSettings(r.data))
  }, [token])

  const handleSave = async () => {
    try {
      await axios.put('/api/admin/settings', settings, { headers: { Authorization: `Bearer ${token}` } })
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch { alert('Failed to save') }
  }

  if (!settings) return <div className="text-center py-10 text-gray-400">Loading...</div>
  return (
    <div>
      <h2 className="text-2xl font-bold text-apollo-teal mb-6">Settings</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input value={settings.phone} onChange={e => setSettings(s => ({ ...s, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input value={settings.whatsapp} onChange={e => setSettings(s => ({ ...s, whatsapp: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Global Discount (%)</label>
            <input type="number" min={0} max={100} value={settings.globalDiscount} onChange={e => setSettings(s => ({ ...s, globalDiscount: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Banner Text</label>
            <textarea value={settings.announcementBanner} onChange={e => setSettings(s => ({ ...s, announcementBanner: e.target.value }))} rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink resize-none" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={!!settings.bannerActive} onChange={e => setSettings(s => ({ ...s, bannerActive: e.target.checked }))} className="accent-apollo-pink" />
            Show Announcement Banner
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Home Collection Above (₹)</label>
            <input type="number" value={settings.homeCollectionFreeAbove} onChange={e => setSettings(s => ({ ...s, homeCollectionFreeAbove: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-apollo-pink" />
          </div>
          <button onClick={handleSave} className="w-full btn-pink py-3">
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
          {saved && <p className="text-green-600 text-sm text-center">Settings saved successfully!</p>}
        </div>
      </div>
    </div>
  )
}

// ── Main Admin Component ───────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = (t) => {
    setToken(t)
    sessionStorage.setItem('admin_token', t)
  }

  const handleLogout = () => {
    setToken('')
    sessionStorage.removeItem('admin_token')
  }

  if (!token) return <LoginForm onLogin={handleLogin} />

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard token={token} />
      case 'tests': return <TestsManager token={token} />
      case 'packages': return <PackagesManager token={token} />
      case 'offers': return <OffersManager token={token} />
      case 'centres': return <CentresManager token={token} />
      case 'bookings': return <BookingsManager token={token} />
      case 'settings': return <Settings token={token} />
      default: return <Dashboard token={token} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen z-50 w-64 bg-apollo-teal text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10">
          <div className="font-bold text-lg">Apollo Admin</div>
          <div className="text-white/60 text-xs">Tirupati Diagnostics</div>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => { setActiveSection(n.id); setSidebarOpen(false) }}
              className={`w-full text-left flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all ${activeSection === n.id ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <span>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View Website
          </a>
          <button onClick={handleLogout} className="w-full text-sm text-red-300 hover:text-red-100 transition-colors text-left">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(v => !v)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-bold text-gray-800 capitalize">{activeSection}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Welcome, Admin</span>
            <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition-all">
              Sign Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
