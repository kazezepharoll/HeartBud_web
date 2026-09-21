import { Link } from 'react-router-dom';
import GeneralBar from '../components/GeneralBar';
import Footer from '../components/Footer';
import About from './About';
import '../v2/design.css';
import '../v2/public.css';

const features = [
  {
    tone: '',
    icon: '♥',
    title: 'Wearable vitals monitoring',
    text: 'Connect a Bluetooth heart-rate device, or use the built-in simulator, to stream live heart rate, SpO2, blood pressure and temperature.',
  },
  {
    tone: 'teal',
    icon: 'AI',
    title: 'Cardiovascular risk prediction',
    text: 'A trained machine-learning model gives clinicians decision support on a patient’s cardiovascular disease risk.',
  },
  {
    tone: 'amber',
    icon: '!',
    title: 'Real-time alerts',
    text: 'Readings outside the normal range automatically notify the patient’s doctor the moment they happen — no manual checking required.',
  },
  {
    tone: 'green',
    icon: 'Rx',
    title: 'Care coordination',
    text: 'Appointments, prescriptions and diet plans keep patients and doctors working from the same up-to-date record.',
  },
];

export default function Home() {
  return (
    <>
      <GeneralBar />

      <section className="hb-hero">
        <div className="hb-hero-inner">
          <div>
            <span className="hb-hero-kicker">Personal medical assistant</span>
            <h1>Cardiovascular care, monitored in real time</h1>
            <p>HeartBud connects patients and doctors around live vitals from wearable devices, AI-assisted risk prediction, and instant alerts — so nothing falls through the cracks between visits.</p>
            <div className="hb-hero-actions">
              <Link to="/register" className="hb-button">Get started</Link>
              <Link to="/login" className="hb-button secondary">I have an account</Link>
            </div>
            <div className="hb-hero-stats">
              <div><strong>Live</strong><span>Wearable vitals</span></div>
              <div><strong>AI</strong><span>Risk prediction</span></div>
              <div><strong>Instant</strong><span>Doctor alerts</span></div>
            </div>
          </div>
          <div className="hb-hero-art">
            <img src="/cardiologist.jpg" alt="Cardiologist reviewing patient data" />
          </div>
        </div>
      </section>

      <section className="hb-section" id="services">
        <div className="hb-section-heading">
          <span className="hb-kicker">What HeartBud does</span>
          <h2>Everything you need to manage cardiovascular health</h2>
          <p>Built for the full loop: patients track and share vitals, doctors review and respond, and the system watches for warning signs in between.</p>
        </div>
        <div className="hb-grid hb-grid-4">
          {features.map((f) => (
            <div className={`hb-card hb-feature-card ${f.tone}`} key={f.title}>
              <div className="hb-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <About />

      <section className="hb-section" style={{ paddingTop: 0 }}>
        <div className="hb-cta">
          <h2>Ready to get started?</h2>
          <p>Create a free patient account and connect your first vitals reading in minutes.</p>
          <Link to="/register" className="hb-button">Create your account</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
