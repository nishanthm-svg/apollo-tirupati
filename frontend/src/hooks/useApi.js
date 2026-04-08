import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE = '/api';

export function useTests(params = {}) {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE}/tests`, { params });
      setTests(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetchTests(); }, [fetchTests]);
  return { tests, loading, error, refetch: fetchTests };
}

export function usePackages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${BASE}/packages`).then(r => setData(r.data)).finally(() => setLoading(false));
  }, []);
  return { packages: data, loading };
}

export function useCentres() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${BASE}/centres`).then(r => setData(r.data));
  }, []);
  return { centres: data };
}

export function useOffers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${BASE}/offers`).then(r => setData(r.data));
  }, []);
  return { offers: data };
}

export async function createBooking(data) {
  const res = await axios.post(`${BASE}/bookings`, data);
  return res.data;
}

export async function adminLogin(username, password) {
  const res = await axios.post(`${BASE}/admin/login`, { username, password });
  return res.data;
}

export function useAdminData(endpoint, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const refetch = useCallback(() => {
    if (!token) return;
    setLoading(true);
    axios
      .get(`${BASE}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setData(r.data))
      .finally(() => setLoading(false));
  }, [endpoint, token]);
  useEffect(() => { if (token) refetch(); }, [refetch, token]);
  return { data, loading, refetch };
}
