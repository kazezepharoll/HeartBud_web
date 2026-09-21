import { useEffect, useRef, useState } from 'react';
import AppShell, { SectionCard, StatCard, StatusBadge, getUser } from './AppShell';
import VitalsChart from './VitalsChart';
import { useBluetoothHeartRate } from '../hooks/useBluetoothHeartRate';
import { useVitalsSimulator } from '../hooks/useVitalsSimulator';
import { fetchVitalsHistory, postVitalsReading } from '../lib/vitalsApi';
import { classifyReading, severityTone } from '../lib/vitalsThresholds';
import { getSocket } from '../lib/socket';

const WEARABLE_POST_INTERVAL_MS = 4000;

function ManualReadingForm({ onSubmit }) {
  const [form, setForm] = useState({ heartRate: '', spo2: '', systolic: '', diastolic: '', temperature: '' });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="hb-form-grid">
      <div className="hb-field"><label>Heart rate (bpm)</label><input type="number" value={form.heartRate} onChange={(e) => set('heartRate', e.target.value)} /></div>
      <div className="hb-field"><label>SpO2 (%)</label><input type="number" value={form.spo2} onChange={(e) => set('spo2', e.target.value)} /></div>
      <div className="hb-field"><label>Systolic (mmHg)</label><input type="number" value={form.systolic} onChange={(e) => set('systolic', e.target.value)} /></div>
      <div className="hb-field"><label>Diastolic (mmHg)</label><input type="number" value={form.diastolic} onChange={(e) => set('diastolic', e.target.value)} /></div>
      <div className="hb-field"><label>Temperature (°C)</label><input type="number" step="0.1" value={form.temperature} onChange={(e) => set('temperature', e.target.value)} /></div>
      <div className="hb-field" style={{ justifyContent: 'end' }}>
        <button className="hb-button secondary" onClick={() => onSubmit(form)}>Log reading</button>
      </div>
    </div>
  );
}

export default function PatientVitals() {
  const user = getUser();
  const patientId = user.userId;

  const bluetooth = useBluetoothHeartRate();
  const simulator = useVitalsSimulator();

  const [activeSource, setActiveSource] = useState(null); // 'wearable' | 'simulated' | null
  const [history, setHistory] = useState([]);
  const [latestReading, setLatestReading] = useState(null);
  const [activeAlert, setActiveAlert] = useState(null);
  const [postError, setPostError] = useState(null);

  const bluetoothHeartRateRef = useRef(null);
  bluetoothHeartRateRef.current = bluetooth.heartRate;

  // Initial history + live updates over the socket, scoped to this patient's room.
  useEffect(() => {
    if (!patientId) return undefined;
    fetchVitalsHistory(patientId, 40).then(setHistory).catch(() => {});

    const socket = getSocket();
    socket.emit('join', { role: 'patient', patientId });

    const onReading = (reading) => {
      setHistory((h) => [...h.slice(-39), reading]);
      setLatestReading(reading);
    };
    const onAlert = (alert) => setActiveAlert(alert);

    socket.on('vitals:new', onReading);
    socket.on('alert:new', onAlert);
    return () => {
      socket.off('vitals:new', onReading);
      socket.off('alert:new', onAlert);
    };
  }, [patientId]);

  const submitReading = async (reading, source) => {
    if (!patientId) { setPostError('Sign in again — your account id was not found.'); return; }
    try {
      setPostError(null);
      await postVitalsReading({ patientId, ...reading, source });
    } catch {
      setPostError('Could not reach the HeartBud API. Is the Node server running?');
    }
  };

  // Stream Bluetooth heart-rate readings to the backend at a fixed cadence
  // rather than on every BLE notification (which can arrive roughly once a second).
  useEffect(() => {
    if (!bluetooth.connected) return undefined;
    setActiveSource('wearable');
    const id = setInterval(() => {
      if (bluetoothHeartRateRef.current != null) {
        submitReading({ heartRate: bluetoothHeartRateRef.current }, 'wearable');
      }
    }, WEARABLE_POST_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth.connected]);

  const startSimulator = () => {
    if (bluetooth.connected) bluetooth.disconnect();
    setActiveSource('simulated');
    simulator.start((reading) => submitReading(reading, 'simulated'));
  };
  const stopSimulator = () => {
    simulator.stop();
    if (activeSource === 'simulated') setActiveSource(null);
  };

  const displayed = latestReading || (activeSource === 'wearable' && bluetooth.heartRate ? { heartRate: bluetooth.heartRate } : null) || history.at(-1) || null;
  const { severity } = classifyReading(displayed || {});

  const hrSeries = history.map((r) => r.heartRate).filter((v) => v != null);

  return (
    <AppShell role="patient" title="Vitals monitor" subtitle="Live heart-rate and vitals monitoring from a connected wearable.">
      <div className="hb-grid hb-grid-3">
        <SectionCard title="Connect a device" className="hb-card" style={{ gridColumn: 'span 2' }}>
          <div className="hb-quick-actions">
            <button className="hb-action" onClick={bluetooth.connected ? bluetooth.disconnect : bluetooth.connect} disabled={bluetooth.connecting}>
              <strong>{bluetooth.connected ? 'Disconnect wearable' : bluetooth.connecting ? 'Connecting…' : 'Connect Bluetooth wearable'}</strong>
              <span>{bluetooth.supported ? 'Pair a heart-rate strap, band or smartwatch that broadcasts the standard BLE Heart Rate service.' : 'Web Bluetooth is not supported in this browser — try Chrome or Edge.'}</span>
            </button>
            <button className="hb-action" onClick={simulator.running ? stopSimulator : startSimulator}>
              <strong>{simulator.running ? 'Stop simulated device' : 'Use simulated device'}</strong>
              <span>No wearable on hand? Stream realistic demo vitals to try the monitoring and alert flow.</span>
            </button>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {bluetooth.connected && <StatusBadge tone="healthy">Connected · {bluetooth.deviceName}</StatusBadge>}
            {simulator.running && <StatusBadge tone="moderate">Simulated device streaming</StatusBadge>}
            {!bluetooth.connected && !simulator.running && <StatusBadge tone="neutral">No live source connected</StatusBadge>}
          </div>
          {bluetooth.error && <p style={{ color: '#c74d4a', fontSize: 11, marginTop: 10 }}>{bluetooth.error}</p>}
          {postError && <p style={{ color: '#c74d4a', fontSize: 11, marginTop: 10 }}>{postError}</p>}
        </SectionCard>
        <SectionCard title="Current status">
          <StatusBadge tone={severityTone(severity)}>{severity === 'critical' ? 'Critical' : severity === 'attention' ? 'Needs attention' : 'Normal range'}</StatusBadge>
          <p style={{ fontSize: 11, color: '#718096', marginTop: 12, lineHeight: 1.6 }}>Readings are classified automatically against clinical thresholds. Your doctor is notified in real time when a reading needs attention.</p>
        </SectionCard>
      </div>

      {activeAlert && (
        <div className={`hb-alert${activeAlert.severity === 'critical' ? '' : ''}`} style={{ marginTop: 16, ...(activeAlert.severity === 'critical' ? { background: '#fff0f0', borderColor: '#f3c7c5', color: '#8a2f2c' } : {}) }}>
          <strong>{activeAlert.severity === 'critical' ? 'Critical alert sent to your doctor' : 'Attention alert sent to your doctor'}</strong>
          {activeAlert.message}
        </div>
      )}

      <div className="hb-grid hb-grid-4" style={{ marginTop: 18 }}>
        <StatCard label="Heart rate" value={displayed?.heartRate != null ? `${displayed.heartRate} bpm` : '—'} detail="Latest reading" tone="blue" icon="♥" />
        <StatCard label="SpO2" value={displayed?.spo2 != null ? `${displayed.spo2}%` : '—'} detail="Blood oxygen" tone="teal" icon="O2" />
        <StatCard label="Blood pressure" value={displayed?.systolic != null ? `${displayed.systolic}/${displayed.diastolic ?? '—'}` : '—'} detail="mmHg" tone="amber" icon="BP" />
        <StatCard label="Temperature" value={displayed?.temperature != null ? `${displayed.temperature}°C` : '—'} detail="Body temperature" tone="green" icon="T°" />
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionCard title="Heart rate trend" className="hb-chart-card">
          <VitalsChart points={hrSeries} min={40} max={160} />
        </SectionCard>
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionCard title="Log a manual reading" className="hb-card">
          <ManualReadingForm onSubmit={(reading) => submitReading(reading, 'manual')} />
        </SectionCard>
      </div>
    </AppShell>
  );
}
