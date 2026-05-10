import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Users, BedDouble,
         Activity, DollarSign, Download, RefreshCw } from 'lucide-react'
import Layout from '../components/Layout'
import { ADM_DATA, REV_DATA, DEPT_PIE, SAT_DATA } from '../components/data'

const PERIODS = ['This Month','Last Quarter','This Year','Custom']
const KPI = [
  { label:'Total Admissions',   value:'6,470', change:'+8.3%', up:true,  Icon:Users,      c:'#1a7a4a',bg:'#e6f7ee' },
  { label:'Avg Length of Stay', value:'4.2d',  change:'-0.3d', up:true,  Icon:BedDouble,  c:'#00b8a9',bg:'#e0f9f7' },
  { label:'Net Revenue (₹ Cr)', value:'33.3',  change:'+14%',  up:true,  Icon:DollarSign, c:'#f5a623',bg:'#fff6e6' },
  { label:'Readmission Rate',   value:'4.1%',  change:'-1.2%', up:true,  Icon:Activity,   c:'#6c5ce7',bg:'#f0eeff' },
]

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'var(--card)',border:'1px solid var(--border)',
      borderRadius:11,padding:'9px 13px',boxShadow:'var(--sh-md)',fontSize:12 }}>
      <p style={{ fontWeight:700,color:'var(--text)',marginBottom:5 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.color,fontWeight:500 }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [period, setPeriod] = useState('This Year')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const refresh = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setToast('Data refreshed!'); setTimeout(()=>setToast(null),2000) }, 1000)
  }
  const exportData = () => { setToast('Export started — file will download shortly'); setTimeout(()=>setToast(null),2500) }

  return (
    <Layout title="Analytics" sub="Clinical and operational performance overview">
      {toast && <div className="toast">✅ {toast}</div>}

      {/* Toolbar */}
      <div style={{ display:'flex',justifyContent:'space-between',
        alignItems:'center',gap:10,marginBottom:20,flexWrap:'wrap' }}>
        <div style={{ display:'flex',background:'var(--card)',
          border:'1px solid var(--border)',borderRadius:10,overflow:'hidden' }}>
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding:'7px 14px',border:'none',cursor:'pointer',fontSize:12,
              fontWeight: period===p ? 600 : 500,
              background: period===p ? 'var(--green)' : 'transparent',
              color:      period===p ? '#fff' : 'var(--text3)',
              transition:'var(--t)' }}>{p}</button>
          ))}
        </div>
        <div style={{ display:'flex',gap:8 }}>
          <button onClick={refresh} className="btn-hover"
            style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 15px',
              background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,
              fontSize:12,fontWeight:600,color:'var(--text2)',cursor:'pointer' }}>
            <RefreshCw size={13} style={{ animation: loading?'spin .8s linear infinite':'' }}/>
            Refresh
          </button>
          <button onClick={exportData} className="btn-hover"
            style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 15px',
              background:'var(--green)',border:'none',borderRadius:10,
              fontSize:12,fontWeight:600,color:'#fff',cursor:'pointer' }}>
            <Download size={13}/> Export
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-grid-4" style={{ display:'grid',
        gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20 }}>
        {KPI.map((k,i) => (
          <div key={i} className="kpi" style={{ background:'var(--card)',
            border:'1px solid var(--border-lt)',borderRadius:16,
            padding:'16px 18px',boxShadow:'var(--sh-sm)' }}>
            <div style={{ display:'flex',justifyContent:'space-between',
              alignItems:'flex-start',marginBottom:12 }}>
              <div style={{ width:40,height:40,borderRadius:11,background:k.bg,
                display:'flex',alignItems:'center',justifyContent:'center' }}>
                <k.Icon size={18} color={k.c}/>
              </div>
              <span style={{ display:'flex',alignItems:'center',gap:3,fontSize:10,
                fontWeight:700,borderRadius:99,padding:'2px 7px',
                color:k.up?'#1a7a4a':'#e8572a',
                background:k.up?'#e6f7ee':'#fef0ec' }}>
                {k.up?<TrendingUp size={10} color="#1a7a4a"/>:<TrendingDown size={10} color="#e8572a"/>}
                {k.change}
              </span>
            </div>
            <div style={{ fontFamily:'Sora,sans-serif',fontSize:24,fontWeight:800,color:'var(--text)' }}>{k.value}</div>
            <div style={{ fontSize:11,fontWeight:500,color:'var(--text3)',marginTop:2 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div className="chart-row-2" style={{ display:'grid',
        gridTemplateColumns:'1fr 1fr',gap:18,marginBottom:18 }}>
        <Chrt title="Admissions & Discharges" sub="Monthly patient flow">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ADM_DATA} margin={{top:8,right:8,left:-20,bottom:0}}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1a7a4a" stopOpacity={.2}/>
                  <stop offset="95%" stopColor="#1a7a4a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00b8a9" stopOpacity={.2}/>
                  <stop offset="95%" stopColor="#00b8a9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-lt)"/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Area type="monotone" dataKey="a" name="Admissions" stroke="#1a7a4a" strokeWidth={2.5} fill="url(#ga)"/>
              <Area type="monotone" dataKey="d" name="Discharges"  stroke="#00b8a9" strokeWidth={2.5} fill="url(#gd)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Chrt>

        <Chrt title="Revenue vs Expenses (₹ Cr)" sub="Monthly financial performance">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REV_DATA} margin={{top:8,right:8,left:-20,bottom:0}} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-lt)"/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="r" name="Revenue"  fill="#1a7a4a" radius={[5,5,0,0]}/>
              <Bar dataKey="e" name="Expenses" fill="#f5a623" radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Chrt>
      </div>

      {/* Row 2 */}
      <div className="chart-row-3" style={{ display:'grid',
        gridTemplateColumns:'repeat(3,1fr)',gap:18 }}>
        <Chrt title="Patients by Department" sub="Speciality distribution">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={DEPT_PIE} cx="50%" cy="50%" innerRadius={44}
                outerRadius={72} dataKey="value" paddingAngle={3}>
                {DEPT_PIE.map((d,i) => <Cell key={i} fill={d.color}/>)}
              </Pie>
              <Tooltip formatter={(v,n) => [v,n]}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display:'flex',flexDirection:'column',gap:5,marginTop:8 }}>
            {DEPT_PIE.map((d,i) => (
              <div key={i} style={{ display:'flex',alignItems:'center',gap:7 }}>
                <div style={{ width:9,height:9,borderRadius:2,background:d.color,flexShrink:0 }}/>
                <span style={{ fontSize:11,color:'var(--text2)',flex:1 }}>{d.name}</span>
                <span style={{ fontSize:11,fontWeight:700,color:'var(--text)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </Chrt>

        <Chrt title="Patient Satisfaction" sub="Scores out of 5">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SAT_DATA} layout="vertical"
              margin={{top:0,right:24,left:0,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-lt)" horizontal={false}/>
              <XAxis type="number" domain={[0,5]} tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="c" tick={{fontSize:10,fill:'var(--text2)'}} width={90} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v => [`${v}/5`]}/>
              <Bar dataKey="s" name="Score" radius={[0,5,5,0]}>
                {SAT_DATA.map((_,i) => <Cell key={i} fill={`hsl(${148-i*9},58%,${44+i*3}%)`}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Chrt>

        <Chrt title="ICU Occupancy Trend" sub="Monthly critical care beds">
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={ADM_DATA} margin={{top:8,right:8,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-lt)"/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:'var(--text3)'}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/>
              <Line type="monotone" dataKey="i" name="ICU Beds" stroke="#e8572a"
                strokeWidth={2.5} dot={{fill:'#e8572a',r:3}} activeDot={{r:5}}/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display:'flex',alignItems:'center',gap:6,
            background:'#fef0ec',border:'1px solid #fbd0c2',borderRadius:8,
            padding:'7px 11px',marginTop:10 }}>
            <Activity size={13} color="#e8572a"/>
            <span style={{ fontSize:11,color:'var(--text2)' }}>Peak: 78 beds — December</span>
          </div>
        </Chrt>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </Layout>
  )
}

function Chrt({ title, sub, children }) {
  return (
    <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
      borderRadius:18,padding:'18px 20px',boxShadow:'var(--sh-sm)' }}>
      <div style={{ fontFamily:'Sora,sans-serif',fontSize:14,fontWeight:700,
        color:'var(--text)',marginBottom:3 }}>{title}</div>
      {sub && <div style={{ fontSize:11,color:'var(--text3)',marginBottom:14 }}>{sub}</div>}
      {children}
    </div>
  )
}