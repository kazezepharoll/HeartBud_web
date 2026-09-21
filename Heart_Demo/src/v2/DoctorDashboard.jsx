import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell,{SectionCard,StatCard,StatusBadge} from './AppShell';
import { fetchAlerts } from '../lib/vitalsApi';
import { getSocket } from '../lib/socket';
const patients=[['James K.','JK','72 bpm','120/78','Low'],['Joseph M.','JM','88 bpm','138/86','Attention'],['Ahmed S.','AS','76 bpm','126/80','Low'],['Mary C.','MC','94 bpm','145/92','High']];
export default function DoctorDashboard(){
 const navigate=useNavigate();
 const [alerts,setAlerts]=useState([]);
 useEffect(()=>{
  fetchAlerts({status:'unacknowledged'}).then(setAlerts).catch(()=>{});
  const socket=getSocket();
  socket.emit('join',{role:'doctor'});
  const onAlert=(alert)=>setAlerts(a=>[alert,...a]);
  socket.on('alert:new',onAlert);
  return ()=>socket.off('alert:new',onAlert);
 },[]);
 return <AppShell role="doctor" title="Clinical overview" subtitle="Monitor patients, appointments and decision-support activity from one workspace.">
 <div className="hb-grid hb-grid-4"><StatCard label="Active patients" value="48" detail="4 added this month" tone="blue" icon="♙"/><StatCard label="Needs attention" value={alerts.length} detail="Unacknowledged vitals alerts" tone="amber" icon="!"/><StatCard label="Today’s appointments" value="7" detail="2 still awaiting confirmation" tone="teal" icon="▣"/><StatCard label="Assessments" value="31" detail="This month · model runs" tone="green" icon="♥"/></div>
 <div className="hb-grid hb-grid-3" style={{marginTop:18}}>
  <SectionCard title="Patients needing attention" action={<button className="hb-link" onClick={()=>navigate('/doctor/patients')}>View patients</button>} className="hb-card" style={{gridColumn:'span 2'}}>
   <table className="hb-table"><thead><tr><th>Patient</th><th>Heart rate</th><th>BP</th><th>Indicator</th><th></th></tr></thead><tbody>{patients.map(p=><tr key={p[0]}><td><div className="hb-patient-cell"><div className="hb-table-avatar">{p[1]}</div><strong>{p[0]}</strong></div></td><td>{p[2]}</td><td>{p[3]}</td><td><StatusBadge tone={p[4]==='High'?'high':p[4]==='Attention'?'attention':'low'}>{p[4]}</StatusBadge></td><td><button className="hb-link" onClick={()=>navigate('/doctor/patient')}>Open</button></td></tr>)}</tbody></table>
  </SectionCard>
  <SectionCard title="Today" action={<button className="hb-link" onClick={()=>navigate('/doctor/appointments')}>Calendar</button>}>
   {[['10:30','James K.','Review'],['11:15','Mary C.','Follow-up'],['13:00','Joseph M.','Consultation'],['15:30','Ahmed S.','Review']].map(x=><div className="hb-list-row" key={x[0]}><div><strong>{x[0]}</strong><span>{x[1]}</span></div><StatusBadge tone="neutral">{x[2]}</StatusBadge></div>)}
  </SectionCard>
 </div>
 <div className="hb-grid hb-grid-3" style={{marginTop:18}}>
  <SectionCard title="Clinical alerts" action={<button className="hb-link" onClick={()=>navigate('/doctor/alerts')}>View all</button>}>
   {alerts.length?alerts.slice(0,3).map(a=><div className="hb-alert" key={a.id} style={{marginBottom:10,...(a.severity==='critical'?{background:'#fff0f0',borderColor:'#f3c7c5',color:'#8a2f2c'}:{})}}><strong>{a.patientName}</strong>{a.message}</div>):<div className="hb-empty">No live vitals alerts right now.</div>}
  </SectionCard>
  <SectionCard title="Quick actions"><div className="hb-quick-actions"><button className="hb-action" onClick={()=>navigate('/doctor/alerts')}><strong>Live alerts</strong><span>Review real-time vitals alerts</span></button><button className="hb-action" onClick={()=>navigate('/doctor/patients')}><strong>Find patient</strong><span>Open patient records</span></button><button className="hb-action" onClick={()=>navigate('/doctor/prescriptions')}><strong>Prescribe</strong><span>Create a prescription</span></button><button className="hb-action" onClick={()=>navigate('/doctor/predictions')}><strong>Assessment</strong><span>Run decision support</span></button></div></SectionCard>
  <SectionCard title="This month"><div className="hb-metric"><strong>Patient reviews completed</strong><span>86%</span></div><div className="hb-progress"><span style={{width:'86%'}}/></div><div className="hb-metric"><strong>Appointment completion</strong><span>92%</span></div><div className="hb-progress"><span style={{width:'92%'}}/></div><p style={{fontSize:10,color:'#8a97a6',lineHeight:1.6}}>Operational indicators are shown for workflow visibility and are not clinical quality scores.</p></SectionCard>
 </div>
 </AppShell>}
