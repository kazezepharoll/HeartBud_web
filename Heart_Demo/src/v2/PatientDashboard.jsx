import { useNavigate } from 'react-router-dom';
import AppShell,{SectionCard,StatCard,StatusBadge,MiniSparkline} from './AppShell';

const initials = n => n.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();

export default function PatientDashboard(){
 const navigate=useNavigate();
 return <AppShell role="patient" title="Overview" subtitle="A clear view of your cardiovascular health and care plan.">
   <div className="hb-grid hb-grid-4">
    <StatCard label="Heart health" value="Stable" detail="Based on your latest recorded assessment" tone="green" icon="♥"/>
    <StatCard label="Blood pressure" value="120 / 78" detail="mmHg · latest reading" tone="blue" icon="BP"/>
    <StatCard label="Medication" value="2 active" detail="Next dose today · 20:00" tone="teal" icon="Rx"/>
    <StatCard label="Next appointment" value="24 Sep" detail="10:30 · Cardiology review" tone="amber" icon="▣"/>
   </div>
   <div className="hb-grid hb-grid-3" style={{marginTop:18}}>
    <SectionCard title="Heart health trend" className="hb-chart-card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:14}}><div><div className="hb-kicker">Systolic BP</div><strong style={{fontSize:25}}>120 <span style={{fontSize:11,color:'#8491a0'}}>mmHg</span></strong></div><StatusBadge tone="healthy">Within recorded range</StatusBadge></div>
      <div className="hb-chart"><svg viewBox="0 0 700 200" preserveAspectRatio="none"><polyline points="0,124 90,108 180,116 270,92 360,101 450,82 540,91 630,70 700,78" fill="none" stroke="#2867d8" strokeWidth="3" vectorEffect="non-scaling-stroke"/><polyline points="0,146 90,137 180,141 270,129 360,135 450,121 540,128 630,116 700,120" fill="none" stroke="#79a9e8" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg></div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'#9aa5b1',marginTop:8}}><span>18 Sep</span><span>19 Sep</span><span>20 Sep</span><span>21 Sep</span><span>22 Sep</span><span>23 Sep</span><span>Today</span></div>
    </SectionCard>
    <SectionCard title="Latest measurements" action={<button className="hb-link" onClick={()=>navigate('/patient/prediction')}>Update</button>}>
      {[['Blood pressure','120 / 78 mmHg','Today'],['Heart rate','72 bpm','Today'],['Weight','74 kg','2 days ago'],['Glucose','5.2 mmol/L','1 week ago']].map(([a,b,c])=><div className="hb-list-row" key={a}><div><strong style={{fontSize:12}}>{a}</strong><span style={{display:'block',fontSize:10,color:'#8a97a6',marginTop:3}}>{c}</span></div><strong style={{fontSize:12}}>{b}</strong></div>)}
    </SectionCard>
    <SectionCard title="Care plan" action={<button className="hb-link" onClick={()=>navigate('/patient/diet')}>View plan</button>}>
      <div className="hb-alert"><strong>Next step</strong>Your current care plan includes medication adherence, healthy meals and regular monitoring.</div>
      <div className="hb-metric"><strong>Medication adherence</strong><span>8 / 10 days</span></div><div className="hb-progress"><span style={{width:'80%'}}/></div>
      <div className="hb-metric"><strong>Health checks</strong><span>3 / 4 this month</span></div><div className="hb-progress"><span style={{width:'75%'}}/></div>
    </SectionCard>
   </div>
   <div className="hb-grid hb-grid-2" style={{marginTop:18}}>
    <SectionCard title="Upcoming appointment" action={<button className="hb-button secondary" onClick={()=>navigate('/patient/appointments')}>Appointments</button>}>
      <div className="hb-list-row"><div className="hb-list-main"><div className="hb-avatar-sm">DR</div><div><strong>Cardiology review</strong><span>24 September 2026 · 10:30</span></div></div><StatusBadge tone="moderate">Scheduled</StatusBadge></div>
      <p style={{fontSize:11,color:'#718096',lineHeight:1.6,marginBottom:0}}>Bring your latest blood-pressure readings and medication list to the appointment.</p>
    </SectionCard>
    <SectionCard title="Quick actions">
      <div className="hb-quick-actions">
       <button className="hb-action" onClick={()=>navigate('/patient/vitals')}><strong>Vitals monitor</strong><span>Connect a wearable or log a reading</span></button>
       <button className="hb-action" onClick={()=>navigate('/patient/prediction')}><strong>Health assessment</strong><span>Run the HeartBud risk assessment</span></button>
       <button className="hb-action" onClick={()=>navigate('/patient/prescriptions')}><strong>My prescriptions</strong><span>Review current medicines</span></button>
       <button className="hb-action" onClick={()=>navigate('/patient/diet')}><strong>Diet plan</strong><span>See your recommended meals</span></button>
       <button className="hb-action" onClick={()=>navigate('/patient/notifications')}><strong>Notifications</strong><span>Review care reminders</span></button>
      </div>
    </SectionCard>
   </div>
 </AppShell>
}
