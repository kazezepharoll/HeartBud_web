// Mirrors backend_server/lib/vitalsThresholds.js so the UI can show the same
// severity tone as the server without waiting for a round trip.
const RANGES = {
  heartRate: { criticalLow: 50, attentionLow: 60, attentionHigh: 100, criticalHigh: 120 },
  spo2: { criticalLow: 90, attentionLow: 95 },
  systolic: { criticalLow: 90, attentionHigh: 130, criticalHigh: 160 },
  diastolic: { criticalLow: 60, attentionHigh: 85, criticalHigh: 100 },
  temperature: { criticalLow: 35.0, attentionLow: 36.0, attentionHigh: 37.5, criticalHigh: 38.5 },
};

const SEVERITY_RANK = { normal: 0, attention: 1, critical: 2 };

function classifyMetric(value, range) {
  if (value === null || value === undefined || value === '') return 'normal';
  const v = Number(value);
  if (Number.isNaN(v)) return 'normal';
  if ((range.criticalLow !== undefined && v < range.criticalLow) ||
      (range.criticalHigh !== undefined && v > range.criticalHigh)) return 'critical';
  if ((range.attentionLow !== undefined && v < range.attentionLow) ||
      (range.attentionHigh !== undefined && v > range.attentionHigh)) return 'attention';
  return 'normal';
}

export function classifyReading(reading = {}) {
  const metrics = {
    heartRate: classifyMetric(reading.heartRate, RANGES.heartRate),
    spo2: classifyMetric(reading.spo2, RANGES.spo2),
    systolic: classifyMetric(reading.systolic, RANGES.systolic),
    diastolic: classifyMetric(reading.diastolic, RANGES.diastolic),
    temperature: classifyMetric(reading.temperature, RANGES.temperature),
  };
  const severity = Object.values(metrics).reduce(
    (worst, s) => (SEVERITY_RANK[s] > SEVERITY_RANK[worst] ? s : worst),
    'normal'
  );
  return { severity, metrics };
}

// Maps a severity to the StatusBadge tone already used across the app.
export function severityTone(severity) {
  if (severity === 'critical') return 'high';
  if (severity === 'attention') return 'attention';
  return 'healthy';
}

export const VITALS_RANGES = RANGES;
