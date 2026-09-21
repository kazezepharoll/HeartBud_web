import { useCallback, useEffect, useRef, useState } from 'react';

const BASELINE = { heartRate: 74, spo2: 98, systolic: 118, diastolic: 76, temperature: 36.8 };

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function drift(value, step, min, max) { return clamp(value + (Math.random() - 0.5) * step, min, max); }

// Simulates a wearable streaming vitals when no real Bluetooth device is
// available (or the browser doesn't support Web Bluetooth). Values random-walk
// around a healthy baseline, with an occasional simulated "event" that drifts
// them into the attention/critical range so the alerting pipeline can be
// demonstrated end-to-end without hardware.
export function useVitalsSimulator({ intervalMs = 3000 } = {}) {
  const [running, setRunning] = useState(false);
  const [latest, setLatest] = useState(null);
  const stateRef = useRef({ ...BASELINE });
  const eventRef = useRef(0); // ticks remaining in a simulated "event"
  const timerRef = useRef(null);

  const tick = useCallback(() => {
    const s = stateRef.current;

    // ~6% chance per tick to start a short elevated-reading event when calm.
    if (eventRef.current <= 0 && Math.random() < 0.06) eventRef.current = 4 + Math.floor(Math.random() * 4);

    const inEvent = eventRef.current > 0;
    if (inEvent) eventRef.current -= 1;

    s.heartRate = inEvent ? drift(s.heartRate, 14, 95, 135) : drift(s.heartRate, 4, 62, 88);
    s.spo2 = inEvent ? drift(s.spo2, 2.5, 88, 95) : drift(s.spo2, 0.6, 96, 100);
    s.systolic = inEvent ? drift(s.systolic, 8, 132, 168) : drift(s.systolic, 3, 108, 126);
    s.diastolic = inEvent ? drift(s.diastolic, 5, 86, 104) : drift(s.diastolic, 2, 70, 82);
    s.temperature = inEvent ? drift(s.temperature, 0.3, 37.6, 38.6) : drift(s.temperature, 0.1, 36.4, 37.1);

    const reading = {
      heartRate: Math.round(s.heartRate),
      spo2: Math.round(s.spo2 * 10) / 10,
      systolic: Math.round(s.systolic),
      diastolic: Math.round(s.diastolic),
      temperature: Math.round(s.temperature * 10) / 10,
      source: 'simulated',
    };
    setLatest(reading);
    return reading;
  }, []);

  const start = useCallback((onReading) => {
    if (timerRef.current) return;
    setRunning(true);
    timerRef.current = setInterval(() => {
      const reading = tick();
      onReading?.(reading);
    }, intervalMs);
  }, [tick, intervalMs]);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { running, latest, start, stop };
}
