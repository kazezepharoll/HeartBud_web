import { useEffect, useState } from 'react';
import AppShell, { SectionCard, StatusBadge } from './AppShell';
import { acknowledgeAlert, fetchAlerts } from '../lib/vitalsApi';
import { severityTone } from '../lib/vitalsThresholds';
import { getSocket } from '../lib/socket';

export default function DoctorAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts().then(setAlerts).catch(() => {}).finally(() => setLoading(false));

    const socket = getSocket();
    socket.emit('join', { role: 'doctor' });
    const onAlert = (alert) => setAlerts((a) => [alert, ...a]);
    socket.on('alert:new', onAlert);
    return () => socket.off('alert:new', onAlert);
  }, []);

  const acknowledge = async (id) => {
    setAlerts((a) => a.map((x) => (x.id === id ? { ...x, acknowledged: 1 } : x)));
    try { await acknowledgeAlert(id); } catch { /* the optimistic update already reflects intent */ }
  };

  return (
    <AppShell role="doctor" title="Live alerts" subtitle="Real-time notifications raised automatically from patients' wearable and logged vitals.">
      <SectionCard title={`${alerts.length || 'No'} alerts`}>
        {loading ? (
          <div className="hb-empty">Loading alerts…</div>
        ) : alerts.length ? (
          <div className="hb-list">
            {alerts.map((a) => (
              <div className="hb-list-row" key={a.id}>
                <div className="hb-list-main">
                  <div className="hb-avatar-sm">{String(a.patientName || '?').split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase()}</div>
                  <div>
                    <strong>{a.patientName}</strong>
                    <span>{a.message}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <StatusBadge tone={severityTone(a.severity)}>{a.severity === 'critical' ? 'Critical' : 'Attention'}</StatusBadge>
                  {a.acknowledged ? (
                    <StatusBadge tone="neutral">Acknowledged</StatusBadge>
                  ) : (
                    <button className="hb-link" onClick={() => acknowledge(a.id)}>Acknowledge</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="hb-empty">No alerts yet. Alerts appear here automatically when a patient&apos;s vitals move outside the normal range.</div>
        )}
      </SectionCard>
    </AppShell>
  );
}
