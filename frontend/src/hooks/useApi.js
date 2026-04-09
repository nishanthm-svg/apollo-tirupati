import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import staticData from '../data/staticData.json';

// In production (GitHub Pages) there is no backend, so we use bundled static data.
// In local dev the Vite proxy forwards /api → localhost:4000.
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// --- helpers ---
function filterTests(tests, params = {}) {
  let result = [...tests];
  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.tags || []).some(tag => tag.toLowerCase().includes(q))
    );
  }
  if (params.category && params.category !== 'All') {
    result = result.filter(t => t.category === params.category);
  }
  if (params.sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (params.sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else if (params.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  else result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  return result;
}

// --- hooks ---
export function useTests(params = {}) {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTests = useCallback(async () => {
    setLoading(true);
    if (IS_LOCAL) {
      try {
        const res = await axios.get('/api/tests', { params });
        setTests(res.data);
        setLoading(false);
        return;
      } catch { /* fall through to static */ }
    }
    // Static fallback
    setTests(filterTests(staticData.tests, params));
    setLoading(false);
  }, [JSON.stringify(params)]);

  useEffect(() => { fetchTests(); }, [fetchTests]);
  return { tests, loading, error, refetch: fetchTests };
}

export function usePackages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (IS_LOCAL) {
      axios.get('/api/packages')
        .then(r => setData(r.data))
        .catch(() => setData(staticData.packages))
        .finally(() => setLoading(false));
    } else {
      setData(staticData.packages);
      setLoading(false);
    }
  }, []);
  return { packages: data, loading };
}

export function useCentres() {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (IS_LOCAL) {
      axios.get('/api/centres')
        .then(r => setData(r.data))
        .catch(() => setData(staticData.centres));
    } else {
      setData(staticData.centres);
    }
  }, []);
  return { centres: data };
}

export function useOffers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (IS_LOCAL) {
      axios.get('/api/offers')
        .then(r => setData(r.data))
        .catch(() => setData(staticData.offers));
    } else {
      setData(staticData.offers);
    }
  }, []);
  return { offers: data };
}

function saveBookingLocally(booking) {
  try {
    const existing = JSON.parse(localStorage.getItem('apollo_bookings') || '[]');
    existing.unshift(booking);
    localStorage.setItem('apollo_bookings', JSON.stringify(existing));
  } catch { /* ignore */ }
}

export async function createBooking(data) {
  const bookingId = 'APL' + Date.now().toString().slice(-6);
  const booking = {
    id: bookingId,
    name: data.name,
    phone: data.phone,
    email: data.email || '',
    test: data.testName || data.packageName || '',
    testId: data.testId || data.packageId || '',
    centre: data.centre,
    date: data.date,
    timeSlot: data.timeSlot,
    homeCollection: data.homeCollection || false,
    amount: data.amount || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  if (IS_LOCAL) {
    try {
      const res = await axios.post('/api/bookings', data);
      const b = res.data.booking || res.data;
      saveBookingLocally(b);
      return { success: true, booking: b };
    } catch { /* fall through */ }
  }
  saveBookingLocally(booking);
  return { success: true, booking };
}

export async function adminLogin(username, password) {
  if (IS_LOCAL) {
    try {
      const res = await axios.post('/api/admin/login', { username, password });
      return res.data;
    } catch { /* fall through */ }
  }
  // Static admin auth for GitHub Pages demo
  if (username === 'admin' && password === 'apollo@123') {
    return { token: 'static-admin-token', message: 'Login successful' };
  }
  throw new Error('Invalid credentials');
}

export function useAdminData(endpoint, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    if (!token) return;
    setLoading(true);
    if (IS_LOCAL) {
      axios.get(`/api${endpoint}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => setData(r.data))
        .catch(() => {
          if (endpoint.includes('tests')) setData(staticData.tests);
          else if (endpoint.includes('packages')) setData(staticData.packages);
          else if (endpoint.includes('centres')) setData(staticData.centres);
          else if (endpoint.includes('offers')) setData(staticData.offers);
          else if (endpoint.includes('bookings')) {
            try { setData(JSON.parse(localStorage.getItem('apollo_bookings') || '[]')); } catch { setData([]); }
          }
        })
        .finally(() => setLoading(false));
    } else {
      // Static data for admin on GitHub Pages
      if (endpoint.includes('tests')) setData(staticData.tests);
      else if (endpoint.includes('packages')) setData(staticData.packages);
      else if (endpoint.includes('centres')) setData(staticData.centres);
      else if (endpoint.includes('offers')) setData(staticData.offers);
      else if (endpoint.includes('bookings')) {
        try {
          setData(JSON.parse(localStorage.getItem('apollo_bookings') || '[]'));
        } catch { setData([]); }
      }
      setLoading(false);
    }
  }, [endpoint, token]);

  useEffect(() => { if (token) refetch(); }, [refetch, token]);
  return { data, loading, refetch };
}
