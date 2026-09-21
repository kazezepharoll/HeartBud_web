import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function postVitalsReading(reading) {
  const { data } = await axios.post(`${API_BASE}/vitals`, reading);
  return data;
}

export async function fetchVitalsHistory(patientId, limit = 50) {
  const { data } = await axios.get(`${API_BASE}/vitals/${patientId}`, { params: { limit } });
  return data.data || [];
}

export async function fetchAlerts({ patientId, status } = {}) {
  const { data } = await axios.get(`${API_BASE}/alerts`, { params: { patientId, status } });
  return data.data || [];
}

export async function acknowledgeAlert(alertId) {
  const { data } = await axios.post(`${API_BASE}/alerts/${alertId}/acknowledge`);
  return data;
}
