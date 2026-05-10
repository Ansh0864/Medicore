import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users, BedDouble, AlertTriangle, Calendar,
  TrendingUp, TrendingDown, Clock,
  Activity, Stethoscope, FileText,
  Pill, Heart, ChevronRight, Plus,
} from 'lucide-react'
import Layout      from '../components/Layout'
import { useAuth } from '../components/AuthStore'
import { PATIENTS } from '../components/data'

const KPI = [
  { label:'Total Patients',      value:'1,284', change:'+12%',up:true, Icon:Users,        c:'#1a7a4a',bg:'#e6f7ee',sub:'vs last month'    },
  { label:'Active Admissions',   value:'348',   change:'+5%', up:true, Icon:BedDouble,    c:'#00b8a9',bg:'#e0f9f7',sub:'in-patient beds'   },
  { label:'Critical Alerts',     value:'7',     change:'-3',  up:false,Icon:AlertTriangle,c:'#e8572a',bg:'#fef0ec',sub:'need attention'    },
  { label:"Today's Appointments",value:'89',    change:'+18', up:true, Icon:Calendar,     c:'#f5a623',bg:'#fff6e6',sub:'12 pending check-in'},
]

const QUICK = [
  { Icon:Users,      label:'Patient Records', to:'/patients',     c:'#1a7a4a',bg:'#e6f7ee' },
  { Icon:Activity,   label:'Analytics',       to:'/analytics',    c:'#6c5ce7',bg:'#f0eeff' },
  { Icon:Stethoscope,label:'Appointments',    to:'/appointments', c:'#00b8a9',bg:'#e0f9f7' },
  { Icon:FileText,   label:'Reports',         to:'/reports',      c:'#e8572a',bg:'#fef0ec' },
  { Icon:Pill,       label:'Prescriptions',   to:'/patients',     c:'#f5a623',bg:'#fff6e6' },
  { Icon:Heart,      label:'Vitals',          to:'/patients',     c:'#e8572a',bg:'#fef0ec' },
]

const SCHEDULE = [
  { time:'09:30',doc:'Dr. Ananya Reddy',type:'General Consult',  dept:'Cardiology' },
  { time:'10:15',doc:'Dr. Suresh Menon',type:'Follow-up Review', dept:'Neurology'  },
  { time:'11:00',doc:'Dr. Kavita Bose', type:'Pre-op Assessment',dept:'Surgery'    },
  { time:'12:30',doc:'Dr. Rahul Joshi', type:'Lab Discussion',   dept:'Pathology'  },
]

const ACTIVITY = [
  { av:'AS',avC:'#e8572a',avB:'#fef0ec',name:'Arjun Sharma',   action:'Lab results uploaded',       time:'5m', crit:false },
  { av:'PN',avC:'#1a7a4a',avB:'#e6f7ee',name:'Priya Nair',     action:'Critical BP alert triggered',time:'12m',crit:true  },
  { av:'RV',avC:'#00b8a9',avB:'#e0f9f7',name:'Rohit Verma',    action:'Discharged successfully',    time:'31m',crit:false },
  { av:'SI',avC:'#6c5ce7',avB:'#f0eeff',name:'Sneha Iyer',     action:'New appointment booked',     time:'1h', crit:false },
  { av:'VM',avC:'#f5a623',avB:'#fff6e6',name:'Vikram Malhotra',action:'Medication updated',         time:'2h', crit:false },
]

export default function Dashboard() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const h         = new Date().getHours()
  const greet     = h<12?'Good morning':h<18?'Good afternoon':'Good evening'
  const day       = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})
  const [toast, setToast] = useState(null)

  const showToast = msg => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <Layout title="Dashboard" sub={`${greet}, ${user?.name} — ${day}`}>
      {toast && <div className="toast">✅ {toast}</div>}

      {/* KPI grid */}
      <div className="kpi-grid-4" style={{ display:'grid',
        gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:22 }}>
        {KPI.map((k,i) => (
          <div key={i} className="kpi" onClick={() => navigate(i===2?'/patients':i===3?'/appointments':'/')}
            style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
              borderRadius:18,padding:'20px',boxShadow:'var(--sh-sm)',
              position:'relative',overflow:'hidden',animation:'fadeUp .4s ease',
              cursor:'pointer' }}>
            <div style={{ display:'flex',justifyContent:'space-between',
              alignItems:'flex-start',marginBottom:14 }}>
              <div style={{ width:46,height:46,borderRadius:13,background:k.bg,
                display:'flex',alignItems:'center',justifyContent:'center' }}>
                <k.Icon size={20} color={k.c}/>
              </div>
              <span style={{ display:'flex',alignItems:'center',gap:3,fontSize:11,
                fontWeight:700,borderRadius:99,padding:'3px 8px',
                color:k.up?'#1a7a4a':'#e8572a',
                background:k.up?'#e6f7ee':'#fef0ec' }}>
                {k.up ? <TrendingUp size={11} color="#1a7a4a"/> : <TrendingDown size={11} color="#e8572a"/>}
                {k.change}
              </span>
            </div>
            <div style={{ fontFamily:'Sora,sans-serif',fontSize:30,fontWeight:800,
              color:'var(--text)',lineHeight:1 }}>{k.value}</div>
            <div style={{ fontSize:13,fontWeight:600,color:'var(--text2)',marginTop:3 }}>{k.label}</div>
            <div style={{ fontSize:11,color:'var(--text3)',marginTop:2 }}>{k.sub}</div>
            <div style={{ position:'absolute',bottom:0,left:0,right:0,height:3,
              borderRadius:'0 0 18px 18px',background:k.c,opacity:.2 }}/>
          </div>
        ))}
      </div>

      {/* Two-col */}
      <div className="two-col" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:18 }}>

        {/* Activity */}
        <div style={P}>
          <div style={{ display:'flex',justifyContent:'space-between',
            alignItems:'flex-start',marginBottom:16 }}>
            <div>
              <div style={PT}>Recent Activity</div>
              <div style={PS}>Live patient feed</div>
            </div>
            <Link to="/patients" style={{ display:'flex',alignItems:'center',gap:3,
              fontSize:12,fontWeight:600,color:'var(--green)' }}>
              View All <ChevronRight size={13}/>
            </Link>
          </div>
          {ACTIVITY.map((a,i) => (
            <div key={i} style={{ display:'flex',alignItems:'center',gap:11,
              padding:'9px 11px',borderRadius:11,background:'var(--green-tint)',
              border:'1px solid var(--border-lt)',marginBottom:8,cursor:'pointer' }}
              onClick={() => navigate('/patients')}>
              <div style={{ width:36,height:36,borderRadius:9,background:a.avB,
                color:a.avC,display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:11,flexShrink:0 }}>
                {a.av}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex',alignItems:'center',gap:7 }}>
                  <span style={{ fontWeight:600,fontSize:13,color:'var(--text)' }}>{a.name}</span>
                  {a.crit && <span style={{ fontSize:9,fontWeight:700,background:'#fef0ec',
                    color:'#e8572a',borderRadius:99,padding:'1px 7px',
                    textTransform:'uppercase' }}>Critical</span>}
                </div>
                <div style={{ fontSize:12,color:'var(--text3)',marginTop:2 }}>{a.action}</div>
              </div>
              <div style={{ fontSize:11,color:'var(--text4)',whiteSpace:'nowrap' }}>{a.time}</div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex',flexDirection:'column',gap:18 }}>
          {/* Schedule */}
          <div style={P}>
            <div style={{ display:'flex',justifyContent:'space-between',
              alignItems:'center',marginBottom:14 }}>
              <div>
                <div style={PT}>Today's Schedule</div>
                <div style={PS}>Physician appointments</div>
              </div>
              <button onClick={() => navigate('/appointments')}
                style={{ display:'flex',alignItems:'center',gap:5,padding:'6px 12px',
                  background:'var(--green-pale)',border:'1px solid var(--border)',
                  borderRadius:8,fontSize:12,fontWeight:600,color:'var(--green)',
                  cursor:'pointer' }}>
                <Plus size={13}/> Add
              </button>
            </div>
            {SCHEDULE.map((sc,i) => (
              <div key={i} style={{ display:'flex',alignItems:'center',gap:11,
                padding:'9px 11px',border:'1px solid var(--border-lt)',
                borderRadius:10,marginBottom:8,cursor:'pointer',
                transition:'var(--t)' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--green-tint)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
                onClick={() => navigate('/appointments')}>
                <div style={{ fontFamily:'Sora,sans-serif',fontSize:13,fontWeight:700,
                  color:'var(--green)',minWidth:42 }}>{sc.time}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600,fontSize:13,color:'var(--text)' }}>{sc.doc}</div>
                  <div style={{ fontSize:11,color:'var(--text3)' }}>{sc.type}</div>
                </div>
                <span style={{ fontSize:9,fontWeight:700,background:'var(--green-pale)',
                  color:'var(--green)',borderRadius:99,padding:'3px 9px',
                  textTransform:'uppercase',whiteSpace:'nowrap' }}>{sc.dept}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={P}>
            <div style={{ ...PT, marginBottom:14 }}>Quick Actions</div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9 }}>
              {QUICK.map((q,i) => (
                <Link key={i} to={q.to}
                  style={{ display:'flex',flexDirection:'column',alignItems:'center',
                    justifyContent:'center',gap:7,padding:'13px 8px',borderRadius:12,
                    textDecoration:'none',background:q.bg,transition:'var(--t)',
                    border:'1px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--sh-sm)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                  <q.Icon size={20} color={q.c}/>
                  <span style={{ fontSize:11,fontWeight:600,color:q.c,
                    textAlign:'center',lineHeight:1.3 }}>{q.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      `}</style>
    </Layout>
  )
}

const P  = { background:'var(--card)',border:'1px solid var(--border-lt)',borderRadius:18,padding:'20px',boxShadow:'var(--sh-sm)' }
const PT = { fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:15,color:'var(--text)' }
const PS = { fontSize:12,color:'var(--text3)',marginTop:2 }