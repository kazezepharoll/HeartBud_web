// Lightweight inline-SVG line chart for a single vitals metric, styled to
// match the existing `.hb-chart` card look used on the patient dashboard.
export default function VitalsChart({ points = [], min, max, width = 700, height = 200, stroke = '#2867d8' }) {
  if (!points.length) {
    return <div className="hb-chart"><div className="hb-empty">Waiting for readings…</div></div>;
  }

  const lo = min ?? Math.min(...points);
  const hi = max ?? Math.max(...points);
  const range = hi - lo || 1;
  const step = points.length > 1 ? width / (points.length - 1) : 0;

  const coords = points.map((v, i) => {
    const x = i * step;
    const y = height - ((v - lo) / range) * (height - 20) - 10;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="hb-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <polyline points={coords} fill="none" stroke={stroke} strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
