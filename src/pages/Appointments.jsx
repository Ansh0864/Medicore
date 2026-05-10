import { useState } from 'react'
import { Calendar, Clock, User, Plus, Search,
         CheckCircle, XCircle, AlertCircle, Filter, X } from 'lucide-react'
import Layout from '../components/Layout'
import { APPOINTMENTS } from '../components/data'

const STATUS_A = {
  Confirmed: { color:'#1a7a4a', bg:'#e6f7ee', border:'#b3e6c8' },
  Pending:   { color:'#f5a623', bg:'#fff6e6', border:'#fde3b0' },
  Cancelled: { color:'#e8572a', bg:'#fef0ec', border:'#fbd0c2' },
}
const APPT_TYPES = ['All','Follow-up','Check-up','Consultation','Chemo Review','Lab Review','Physio','Dialysis','Echo Review','Biopsy Review','Pre-op']
const APPT_STATUSES = ['All','Confirmed','Pending','Cancelled']

export default function Appointments() {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('All')
  const [statF,  setStatF]    = useState('All')
  const [showAdd,setShowAdd]  = useState(false)
  const [toast,  setToast]    = useState(null)
  const [apts,   setApts]     = useState(APPOINTMENTS)

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const filtered = apts.filter(a => {
    const q = search.toLowerCase()
    const ms = !q || a.patient.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q) || a.dept.toLowerCase().includes(q)
    const mf = filter === 'All' || a.type === filter
    const ms2= statF  === 'All' || a.status === statF
    return ms && mf && ms2
  })

  const updateStatus = (id, newStatus) => {
    setApts(prev => prev.map(a => a.id===id ? {...a,status:newStatus} : a))
    showToast(`Appointment ${newStatus.toLowerCase()}`)
  }

  // Group by date
  const grouped = filtered.reduce((acc, a) => {
    acc[a.date] = acc[a.date] || []
    acc[a.date].push(a)
    return acc
  }, {})

  const today = APPOINTMENTS.filter(a => a.status === 'Confirmed').length
  const pending = APPOINTMENTS.filter(a => a.status === 'Pending').length
  const cancelled = APPOINTMENTS.filter(a => a.status === 'Cancelled').length

  return (
    <Layout title="Appointments" sub="Manage all scheduled patient visits">
      {toast && <div className="toast">✅ {toast}</div>}

      {/* Summary chips */}
      <div className="kpi-grid-4" style={{ display:'grid',
        gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:22 }}>
        {[
          { label:'Total Scheduled', value:APPOINTMENTS.length, Icon:Calendar, c:'#1a7a4a',bg:'#e6f7ee' },
          { label:'Confirmed',       value:today,               Icon:CheckCircle, c:'#1a7a4a',bg:'#e6f7ee' },
          { label:'Pending',         value:pending,             Icon:AlertCircle, c:'#f5a623',bg:'#fff6e6' },
          { label:'Cancelled',       value:cancelled,           Icon:XCircle,  c:'#e8572a',bg:'#fef0ec' },
        ].map((k,i) => (
          <div key={i} className="kpi" style={{ background:'var(--card)',
            border:'1px solid var(--border-lt)',borderRadius:16,padding:'18px',
            boxShadow:'var(--sh-sm)',display:'flex',alignItems:'center',gap:14 }}>
            <div style={{ width:44,height:44,borderRadius:12,background:k.bg,
              display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <k.Icon size={20} color={k.c}/>
            </div>
            <div>
              <div style={{ fontFamily:'Sora,sans-serif',fontSize:24,fontWeight:800,
                color:'var(--text)' }}>{k.value}</div>
              <div style={{ fontSize:11,color:'var(--text3)',fontWeight:500,marginTop:2 }}>{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display:'flex',alignItems:'center',gap:10,
        marginBottom:18,flexWrap:'wrap' }}>
        <div style={{ flex:1,minWidth:200,display:'flex',alignItems:'center',gap:9,
          background:'var(--card)',border:'1.5px solid var(--border)',
          borderRadius:11,padding:'9px 13px',boxShadow:'var(--sh-sm)' }}>
          <Search size={14} color="var(--text3)"/>
          <input placeholder="Search patient, doctor, department…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex:1,background:'transparent',border:'none',
              fontSize:13,color:'var(--text)' }}/>
          {search && <button onClick={() => setSearch('')}
            style={{ background:'none',border:'none',cursor:'pointer',display:'flex' }}>
            <X size={12} color="var(--text3)"/>
          </button>}
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding:'8px 12px',background:'var(--card)',
            border:'1.5px solid var(--border)',borderRadius:9,
            fontSize:12,color:'var(--text2)',cursor:'pointer' }}>
          {APPT_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={statF} onChange={e => setStatF(e.target.value)}
          style={{ padding:'8px 12px',background:'var(--card)',
            border:'1.5px solid var(--border)',borderRadius:9,
            fontSize:12,color:'var(--text2)',cursor:'pointer' }}>
          {APPT_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={() => setShowAdd(true)}
          style={{ display:'flex',alignItems:'center',gap:6,padding:'9px 16px',
            background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
            color:'#fff',border:'none',borderRadius:10,fontFamily:'Sora,sans-serif',
            fontWeight:600,fontSize:13,cursor:'pointer',
            boxShadow:'0 3px 12px rgba(26,122,74,.28)',whiteSpace:'nowrap' }}>
          <Plus size={14}/> New Appointment
        </button>
      </div>

      {/* Appointments grouped by date */}
      {Object.keys(grouped).sort().map(date => (
        <div key={date} style={{ marginBottom:24 }}>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:12 }}>
            <div style={{ fontFamily:'Sora,sans-serif',fontSize:13,fontWeight:700,
              color:'var(--green)' }}>
              {new Date(date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
            </div>
            <div style={{ height:1,flex:1,background:'var(--border-lt)' }}/>
            <span style={{ fontSize:11,color:'var(--text3)',fontWeight:600 }}>
              {grouped[date].length} appointments
            </span>
          </div>

          <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
            borderRadius:16,overflow:'hidden',boxShadow:'var(--sh-sm)' }}>
            {grouped[date].map((a,i) => {
              const sc = STATUS_A[a.status]
              return (
                <div key={a.id} style={{ display:'flex',alignItems:'center',
                  gap:14,padding:'14px 18px',
                  borderBottom: i < grouped[date].length-1 ? '1px solid var(--border-lt)' : 'none',
                  transition:'var(--t)' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--green-tint)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>

                  {/* Time */}
                  <div style={{ width:52,textAlign:'center',flexShrink:0 }}>
                    <div style={{ fontFamily:'Sora,sans-serif',fontSize:14,
                      fontWeight:700,color:'var(--green)' }}>{a.time}</div>
                    <div style={{ fontSize:9,color:'var(--text3)',fontWeight:600 }}>
                      {a.duration}min
                    </div>
                  </div>

                  {/* Avatar */}
                  <div style={{ width:40,height:40,borderRadius:11,background:'var(--green-pale)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:13,
                    color:'var(--green)',flexShrink:0 }}>
                    {a.patient.slice(0,2).toUpperCase()}
                  </div>

                  {/* Details */}
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontWeight:700,fontSize:13,color:'var(--text)',
                      overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                      {a.patient}
                    </div>
                    <div style={{ fontSize:11,color:'var(--text3)',marginTop:2 }}>
                      {a.doctor} · {a.dept}
                    </div>
                  </div>

                  {/* Type */}
                  <span style={{ fontSize:11,fontWeight:600,color:'var(--text2)',
                    background:'var(--bg2)',borderRadius:8,padding:'4px 10px',
                    whiteSpace:'nowrap',display:'none' }}
                    className="hide-sm">
                    {a.type}
                  </span>

                  {/* Status badge */}
                  <span style={{ fontSize:10,fontWeight:700,color:sc.color,
                    background:sc.bg,border:`1px solid ${sc.border}`,
                    borderRadius:99,padding:'3px 10px',
                    textTransform:'uppercase',whiteSpace:'nowrap' }}>
                    {a.status}
                  </span>

                  {/* Actions */}
                  <div style={{ display:'flex',gap:5,flexShrink:0 }}>
                    {a.status === 'Pending' && (
                      <button onClick={() => updateStatus(a.id,'Confirmed')}
                        style={{ padding:'5px 10px',background:'#e6f7ee',
                          color:'#1a7a4a',border:'1px solid #b3e6c8',
                          borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer' }}>
                        Confirm
                      </button>
                    )}
                    {a.status !== 'Cancelled' && (
                      <button onClick={() => updateStatus(a.id,'Cancelled')}
                        style={{ padding:'5px 10px',background:'#fef0ec',
                          color:'#e8572a',border:'1px solid #fbd0c2',
                          borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer' }}>
                        Cancel
                      </button>
                    )}
                    {a.status === 'Cancelled' && (
                      <button onClick={() => updateStatus(a.id,'Confirmed')}
                        style={{ padding:'5px 10px',background:'#e6f7ee',
                          color:'#1a7a4a',border:'1px solid #b3e6c8',
                          borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer' }}>
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign:'center',padding:'60px 24px',background:'var(--card)',
          border:'1px solid var(--border-lt)',borderRadius:16 }}>
          <Calendar size={52} color="var(--border)" style={{ margin:'0 auto 16px' }}/>
          <p style={{ fontFamily:'Sora,sans-serif',fontSize:16,fontWeight:700,
            color:'var(--text3)' }}>No appointments found</p>
          <button onClick={() => { setSearch(''); setFilter('All'); setStatF('All') }}
            style={{ marginTop:16,padding:'8px 18px',background:'var(--green-pale)',
              border:'1px solid var(--border)',borderRadius:9,color:'var(--green)',
              fontWeight:600,fontSize:13,cursor:'pointer' }}>Clear filters</button>
        </div>
      )}

      {/* Add appointment modal */}
      {showAdd && <AddModal onClose={() => setShowAdd(false)} onSave={() => { setShowAdd(false); showToast('Appointment scheduled!') }}/>}

      <style>{`select:focus,input:focus{outline:none}`}</style>
    </Layout>
  )
}

function AddModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    patient:'', doctor:'', dept:'Cardiology', date:'', time:'', type:'Consultation', duration:30
  })
  const set = k => e => setForm(p => ({...p,[k]:e.target.value}))
  const DEPTS2 = ['Cardiology','Neurology','Orthopedics','Oncology','Pulmonology','Obstetrics','Endocrinology']

  return (
    <div onClick={onClose} style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.5)',
      display:'flex',alignItems:'center',justifyContent:'center',zIndex:500,
      backdropFilter:'blur(4px)',padding:18 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--card)',
        borderRadius:20,width:'100%',maxWidth:480,
        boxShadow:'var(--sh-lg)',animation:'fadeUp .25s ease',overflow:'hidden' }}>
        <div style={{ padding:'20px 22px',borderBottom:'1px solid var(--border-lt)',
          display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:16,
            color:'var(--text)' }}>Schedule Appointment</div>
          <button onClick={onClose} style={{ background:'none',border:'none',
            cursor:'pointer',color:'var(--text3)' }}><X size={18}/></button>
        </div>
        <div style={{ padding:'20px 22px',display:'flex',flexDirection:'column',gap:14 }}>
          {[['Patient Name','patient','text','e.g. Arjun Sharma'],
            ['Doctor','doctor','text','e.g. Dr. Ananya Reddy']].map(([label,key,type,ph])=>(
            <div key={key} style={{ display:'flex',flexDirection:'column',gap:5 }}>
              <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
                textTransform:'uppercase',letterSpacing:'0.06em' }}>{label}</label>
              <input type={type} placeholder={ph} value={form[key]}
                onChange={set(key)} style={{ background:'var(--green-tint)',
                  border:'1.5px solid var(--border)',borderRadius:9,
                  padding:'9px 12px',fontSize:13,color:'var(--text)' }}/>
            </div>
          ))}
          <div className="form-grid-2" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
            {[['Date','date','date',''],['Time','time','time','']].map(([label,key,type])=>(
              <div key={key} style={{ display:'flex',flexDirection:'column',gap:5 }}>
                <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
                  textTransform:'uppercase',letterSpacing:'0.06em' }}>{label}</label>
                <input type={type} value={form[key]} onChange={set(key)}
                  style={{ background:'var(--green-tint)',border:'1.5px solid var(--border)',
                    borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--text)' }}/>
              </div>
            ))}
            <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
              <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
                textTransform:'uppercase',letterSpacing:'0.06em' }}>Department</label>
              <select value={form.dept} onChange={set('dept')}
                style={{ background:'var(--green-tint)',border:'1.5px solid var(--border)',
                  borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--text)',
                  cursor:'pointer' }}>
                {DEPTS2.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
              <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
                textTransform:'uppercase',letterSpacing:'0.06em' }}>Duration (min)</label>
              <select value={form.duration} onChange={set('duration')}
                style={{ background:'var(--green-tint)',border:'1.5px solid var(--border)',
                  borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--text)',
                  cursor:'pointer' }}>
                {[15,30,45,60,90,120,240].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div style={{ padding:'0 22px 22px',display:'flex',gap:10 }}>
          <button onClick={onSave}
            style={{ flex:1,padding:'11px',background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
              color:'#fff',border:'none',borderRadius:11,fontFamily:'Sora,sans-serif',
              fontWeight:600,fontSize:13,cursor:'pointer' }}>
            Schedule Appointment
          </button>
          <button onClick={onClose}
            style={{ padding:'11px 18px',background:'var(--bg2)',border:'1px solid var(--border)',
              borderRadius:11,color:'var(--text2)',fontWeight:600,fontSize:13,cursor:'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}input:focus,select:focus{outline:none}`}</style>
    </div>
  )
}