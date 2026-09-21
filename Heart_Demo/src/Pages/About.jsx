import '../v2/design.css';
import '../v2/public.css';

export default function About() {
  return (
    <section className="hb-section" id="about" style={{ paddingTop: 0 }}>
      <div className="hb-grid hb-grid-2" style={{ alignItems: 'center', gap: 48 }}>
        <div>
          <span className="hb-kicker">About HeartBud</span>
          <h2 style={{ fontSize: 27, letterSpacing: '-.6px', margin: '10px 0 14px' }}>A clinical decision-support system, not a replacement for your doctor</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.8, margin: '0 0 16px' }}>
            Cardiovascular disease remains one of the leading causes of death worldwide, and early detection and consistent monitoring make the biggest difference in outcomes. HeartBud was built to make that monitoring continuous instead of occasional — pairing wearable vitals capture with a trained risk-prediction model, so patients and doctors both see the same picture as it changes.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>
            Every prediction and alert is decision-support: a signal for a clinician to act on, reviewed alongside a patient’s full history and professional medical judgment — never a diagnosis on its own.
          </p>
        </div>
        <div className="hb-card" style={{ boxShadow: '0 20px 45px rgba(21,38,58,.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span className="hb-kicker">Live preview</span>
              <strong style={{ display: 'block', fontSize: 22, marginTop: 4 }}>72 <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>bpm</span></strong>
            </div>
            <span className="hb-badge healthy">Normal range</span>
          </div>
          <div className="hb-chart" style={{ height: 130 }}>
            <svg viewBox="0 0 700 130" preserveAspectRatio="none">
              <polyline points="0,80 70,68 140,74 210,52 280,60 350,40 420,58 490,34 560,46 630,28 700,38" fill="none" stroke="#2867d8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="hb-grid hb-grid-3" style={{ marginTop: 18, gap: 10 }}>
            <div className="hb-result" style={{ padding: 12 }}>
              <div className="hb-kicker">SpO2</div>
              <strong style={{ fontSize: 15 }}>98%</strong>
            </div>
            <div className="hb-result" style={{ padding: 12 }}>
              <div className="hb-kicker">BP</div>
              <strong style={{ fontSize: 15 }}>118/76</strong>
            </div>
            <div className="hb-result" style={{ padding: 12 }}>
              <div className="hb-kicker">Temp</div>
              <strong style={{ fontSize: 15 }}>36.7&deg;</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
