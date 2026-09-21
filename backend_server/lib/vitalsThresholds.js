// Clinical thresholds used to classify a vitals reading and decide whether it
// should raise an alert. Kept deliberately simple: these are decision-support
// heuristics for demo/CDSS purposes, not a diagnostic tool.
const RANGES = {
  heartRate: { criticalLow: 50, attentionLow: 60, attentionHigh: 100, criticalHigh: 120 },
  spo2: { criticalLow: 90, attentionLow: 95 },
  systolic: { criticalLow: 90, attentionHigh: 130, criticalHigh: 160 },
  diastolic: { criticalLow: 60, attentionHigh: 85, criticalHigh: 100 },
  temperature: { criticalLow: 35.0, attentionLow: 36.0, attentionHigh: 37.5, criticalHigh: 38.5 },
};

const SEVERITY_RANK = { normal: 0, attention: 1, critical: 2 };

function classifyMetric(value, range) {
  if (value === null || value === undefined || value === '') return { severity: 'normal' };
  const v = Number(value);
  if (Number.isNaN(v)) return { severity: 'normal' };
  if ((range.criticalLow !== undefined && v < range.criticalLow) ||
      (range.criticalHigh !== undefined && v > range.criticalHigh)) {
    return { severity: 'critical' };
  }
  if ((range.attentionLow !== undefined && v < range.attentionLow) ||
      (range.attentionHigh !== undefined && v > range.attentionHigh)) {
    return { severity: 'attention' };
  }
  return { severity: 'normal' };
}

// Classifies a full reading and returns the worst-case severity plus a
// human-readable reason for any metric outside the normal range.
export function classifyReading(reading) {
  const checks = [
    ['heart rate', reading.heartRate, RANGES.heartRate, 'bpm'],
    ['SpO2', reading.spo2, RANGES.spo2, '%'],
    ['systolic pressure', reading.systolic, RANGES.systolic, 'mmHg'],
    ['diastolic pressure', reading.diastolic, RANGES.diastolic, 'mmHg'],
    ['temperature', reading.temperature, RANGES.temperature, '°C'],
  ];

  let worst = 'normal';
  const reasons = [];

  for (const [label, value, range, unit] of checks) {
    const { severity } = classifyMetric(value, range);
    if (SEVERITY_RANK[severity] > 0) reasons.push(`${label} ${value}${unit} (${severity})`);
    if (SEVERITY_RANK[severity] > SEVERITY_RANK[worst]) worst = severity;
  }

  return { severity: worst, reasons };
}

export const VITALS_RANGES = RANGES;
