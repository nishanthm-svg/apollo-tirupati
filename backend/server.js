const express = require('express');
const cors = require('cors');
const store = require('./store');

const app = express();
const PORT = 4000;

app.use(cors({ origin: ['http://localhost:5200', 'http://127.0.0.1:5200'] }));
app.use(express.json());

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || auth !== 'Bearer apollo-admin-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ─── PUBLIC ROUTES ────────────────────────────────────────────────────────────

// GET /api/tests
app.get('/api/tests', (req, res) => {
  let result = [...store.tests];
  const { search, category, minPrice, maxPrice, sort, popular } = req.query;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q))) ||
      (t.description && t.description.toLowerCase().includes(q))
    );
  }
  if (category && category !== 'All') {
    result = result.filter(t => t.category === category);
  }
  if (minPrice) result = result.filter(t => t.price >= Number(minPrice));
  if (maxPrice) result = result.filter(t => t.price <= Number(maxPrice));
  if (popular === 'true') result = result.filter(t => t.popular);

  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'name_asc') result.sort((a, b) => a.name.localeCompare(b.name));
  else result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

  res.json(result);
});

// GET /api/tests/:id
app.get('/api/tests/:id', (req, res) => {
  const test = store.tests.find(t => t.id === Number(req.params.id));
  if (!test) return res.status(404).json({ error: 'Test not found' });
  res.json(test);
});

// GET /api/packages
app.get('/api/packages', (req, res) => {
  res.json(store.packages);
});

// GET /api/packages/:id
app.get('/api/packages/:id', (req, res) => {
  const pkg = store.packages.find(p => p.id === Number(req.params.id));
  if (!pkg) return res.status(404).json({ error: 'Package not found' });
  res.json(pkg);
});

// GET /api/centres
app.get('/api/centres', (req, res) => {
  res.json(store.centres.filter(c => c.active));
});

// GET /api/offers
app.get('/api/offers', (req, res) => {
  res.json(store.offers.filter(o => o.active));
});

// GET /api/settings
app.get('/api/settings', (req, res) => {
  res.json(store.settings);
});

// POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const { name, phone, email, testId, testName, packageId, packageName, centre, date, timeSlot, homeCollection } = req.body;
  if (!name || !phone || !centre || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, centre, date, timeSlot' });
  }
  const id = store.generateBookingId();
  let amount = 0;
  let testLabel = testName || '';
  if (testId) {
    const t = store.tests.find(x => x.id === Number(testId));
    if (t) { amount = t.price; testLabel = t.name; }
  } else if (packageId) {
    const p = store.packages.find(x => x.id === Number(packageId));
    if (p) { amount = p.price; testLabel = p.name; }
  }
  const booking = {
    id,
    name,
    phone,
    email: email || '',
    test: testLabel,
    testId: testId || null,
    packageId: packageId || null,
    centre,
    date,
    timeSlot,
    homeCollection: homeCollection || false,
    amount,
    status: 'confirmed',
    bookedAt: new Date().toISOString()
  };
  store.bookings.push(booking);
  res.status(201).json({ success: true, booking });
});

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'apollo@123') {
    res.json({ success: true, token: 'apollo-admin-token', username: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ─── ADMIN ROUTES (protected) ─────────────────────────────────────────────────

// GET /api/admin/bookings
app.get('/api/admin/bookings', requireAuth, (req, res) => {
  res.json([...store.bookings].reverse());
});

// GET /api/admin/tests
app.get('/api/admin/tests', requireAuth, (req, res) => {
  res.json(store.tests);
});

// POST /api/admin/tests
app.post('/api/admin/tests', requireAuth, (req, res) => {
  const maxId = store.tests.reduce((m, t) => Math.max(m, t.id), 0);
  const test = { id: maxId + 1, ...req.body };
  store.tests.push(test);
  res.status(201).json(test);
});

// PUT /api/admin/tests/:id
app.put('/api/admin/tests/:id', requireAuth, (req, res) => {
  const idx = store.tests.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.tests[idx] = { ...store.tests[idx], ...req.body, id: store.tests[idx].id };
  res.json(store.tests[idx]);
});

// DELETE /api/admin/tests/:id
app.delete('/api/admin/tests/:id', requireAuth, (req, res) => {
  const idx = store.tests.findIndex(t => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.tests.splice(idx, 1);
  res.json({ success: true });
});

// GET /api/admin/packages
app.get('/api/admin/packages', requireAuth, (req, res) => {
  res.json(store.packages);
});

// POST /api/admin/packages
app.post('/api/admin/packages', requireAuth, (req, res) => {
  const maxId = store.packages.reduce((m, p) => Math.max(m, p.id), 0);
  const pkg = { id: maxId + 1, ...req.body };
  store.packages.push(pkg);
  res.status(201).json(pkg);
});

// PUT /api/admin/packages/:id
app.put('/api/admin/packages/:id', requireAuth, (req, res) => {
  const idx = store.packages.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.packages[idx] = { ...store.packages[idx], ...req.body, id: store.packages[idx].id };
  res.json(store.packages[idx]);
});

// DELETE /api/admin/packages/:id
app.delete('/api/admin/packages/:id', requireAuth, (req, res) => {
  const idx = store.packages.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.packages.splice(idx, 1);
  res.json({ success: true });
});

// GET /api/admin/offers
app.get('/api/admin/offers', requireAuth, (req, res) => {
  res.json(store.offers);
});

// POST /api/admin/offers
app.post('/api/admin/offers', requireAuth, (req, res) => {
  const maxId = store.offers.reduce((m, o) => Math.max(m, o.id), 0);
  const offer = { id: maxId + 1, ...req.body };
  store.offers.push(offer);
  res.status(201).json(offer);
});

// PUT /api/admin/offers/:id
app.put('/api/admin/offers/:id', requireAuth, (req, res) => {
  const idx = store.offers.findIndex(o => o.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.offers[idx] = { ...store.offers[idx], ...req.body, id: store.offers[idx].id };
  res.json(store.offers[idx]);
});

// DELETE /api/admin/offers/:id
app.delete('/api/admin/offers/:id', requireAuth, (req, res) => {
  const idx = store.offers.findIndex(o => o.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.offers.splice(idx, 1);
  res.json({ success: true });
});

// GET /api/admin/centres
app.get('/api/admin/centres', requireAuth, (req, res) => {
  res.json(store.centres);
});

// PUT /api/admin/centres/:id
app.put('/api/admin/centres/:id', requireAuth, (req, res) => {
  const idx = store.centres.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.centres[idx] = { ...store.centres[idx], ...req.body, id: store.centres[idx].id };
  res.json(store.centres[idx]);
});

// GET /api/admin/settings
app.get('/api/admin/settings', requireAuth, (req, res) => {
  res.json(store.settings);
});

// PUT /api/admin/settings
app.put('/api/admin/settings', requireAuth, (req, res) => {
  Object.assign(store.settings, req.body);
  res.json(store.settings);
});

// PUT /api/admin/bookings/:id/status
app.put('/api/admin/bookings/:id/status', requireAuth, (req, res) => {
  const booking = store.bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: 'Not found' });
  booking.status = req.body.status;
  res.json(booking);
});

// Dashboard stats
app.get('/api/admin/dashboard', requireAuth, (req, res) => {
  const total = store.bookings.length;
  const confirmed = store.bookings.filter(b => b.status === 'confirmed').length;
  const revenue = store.bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const recent = [...store.bookings].reverse().slice(0, 5);
  res.json({
    stats: {
      totalBookings: total,
      confirmedBookings: confirmed,
      totalRevenue: revenue,
      totalTests: store.tests.length,
      totalPackages: store.packages.length,
      totalCentres: store.centres.filter(c => c.active).length,
    },
    recentBookings: recent
  });
});

app.listen(PORT, () => {
  console.log(`Apollo Diagnostics API running on http://localhost:${PORT}`);
});
