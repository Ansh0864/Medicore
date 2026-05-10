import { useState, useMemo } from 'react'
import { Search, LayoutGrid, List, X, Plus,
         AlertTriangle, CheckCircle, Clock,
         User, Eye, Edit, Activity, MapPin, Phone,
         Mail, Shield, Pill, FileText, Calendar, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import { PATIENTS, STATUS_CFG, DEPTS, STATUSES } from '../components/data'

const SI = s => s==='Critical' ? AlertTriangle : s==='Recovering' ? Clock : CheckCircle

/* ── Grid Card ─────────────────────────────────── */
function GridCard({ p, onView, onDelete }) {
  const cfg = STATUS_CFG[p.status]
  const Icon = SI(p.status)
  return (
    <div className="pcard" style={{ background:'var(--card)',
      border:'1px solid var(--border-lt)',borderRadius:18,overflow:'hidden',
      boxShadow:'var(--sh-sm)',display:'flex',flexDirection:'column',
      animation:'fadeUp .3s ease' }}>
      <div style={{ display:'flex',justifyContent:'space-between',
        alignItems:'flex-start',padding:'14px 14px 12px',background:p.avB }}>
        <div style={{ width:48,height:48,borderRadius:13,background:p.avC,
          display:'flex',alignItems:'center',justifyContent:'center',
          fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:14,
          color:'#fff' }}>{p.av}</div>
        <span style={{ display:'inline-flex',alignItems:'center',gap:3,
          padding:'3px 9px',borderRadius:99,fontSize:9,fontWeight:700,
          textTransform:'uppercase',color:cfg.color,background:cfg.bg,
          border:`1px solid ${cfg.border}` }}>
          <Icon size={10} color={cfg.color}/> {p.status}
        </span>
      </div>
      <div style={{ padding:'6px 14px 14px',flex:1 }}>
        <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:14,
          color:'var(--text)' }}>{p.name}</div>
        <div style={{ fontSize:10,color:'var(--text3)',marginTop:2,marginBottom:9 }}>
          {p.id} · {p.age} yrs · {p.gender}
        </div>
        {[[Activity,p.dept,'var(--green)'],[User,p.doctor,'var(--text3)'],
          [MapPin,p.location,'var(--text3)']].map(([Ic,txt,col],i) => (
          <div key={i} style={{ display:'flex',alignItems:'center',gap:6,marginBottom:5 }}>
            <Ic size={12} color={col}/>
            <span style={{ fontSize:12,color:'var(--text2)',fontWeight:500 }}>{txt}</span>
          </div>
        ))}
        <div style={{ display:'flex',gap:5,margin:'10px 0 9px' }}>
          {[['BP',p.vitals.bp],['HR',`${p.vitals.hr}`],['SpO₂',`${p.vitals.spo2}%`]].map(([l,v]) => (
            <div key={l} style={{ flex:1,display:'flex',flexDirection:'column',
              alignItems:'center',gap:2,background:'var(--green-tint)',borderRadius:8,
              padding:'6px 3px',border:'1px solid var(--border-lt)' }}>
              <span style={{ fontSize:8,color:'var(--text3)',fontWeight:700,
                textTransform:'uppercase' }}>{l}</span>
              <span style={{ fontSize:12,fontWeight:800,fontFamily:'Sora,sans-serif',
                color:'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex',flexWrap:'wrap',gap:4,marginBottom:12 }}>
          {p.conditions.map((c,i) => (
            <span key={i} style={{ fontSize:9,fontWeight:600,color:'var(--green)',
              background:'var(--green-pale)',borderRadius:99,padding:'2px 8px',
              border:'1px solid var(--border)' }}>{c}</span>
          ))}
        </div>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
          paddingTop:9,borderTop:'1px solid var(--border-lt)',gap:6 }}>
          <span style={{ fontSize:10,color:'var(--text3)' }}>{p.admitted}</span>
          <div style={{ display:'flex',gap:5 }}>
            <button onClick={() => onView(p)}
              style={{ display:'flex',alignItems:'center',gap:4,background:'var(--green)',
                color:'#fff',border:'none',borderRadius:7,padding:'5px 10px',
                fontSize:11,fontWeight:600,cursor:'pointer' }}>
              <Eye size={12} color="#fff"/> View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── List Row ───────────────────────────────────── */
function ListRow({ p, onView }) {
  const cfg  = STATUS_CFG[p.status]
  const Icon = SI(p.status)
  return (
    <div className="lrow" style={{ display:'flex',alignItems:'center',gap:14,
      padding:'12px 16px',background:'var(--card)',
      borderBottom:'1px solid var(--border-lt)' }}>
      <div style={{ width:36,height:36,borderRadius:9,flexShrink:0,
        background:p.avB,color:p.avC,fontFamily:'Sora,sans-serif',fontWeight:800,
        fontSize:11,display:'flex',alignItems:'center',justifyContent:'center' }}>{p.av}</div>
      <div style={{ flex:'0 0 180px',minWidth:0 }}>
        <div style={{ fontWeight:700,fontSize:13,color:'var(--text)',
          overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{p.name}</div>
        <div style={{ fontSize:11,color:'var(--text3)' }}>{p.id} · {p.age}y</div>
      </div>
      <div style={{ flex:'0 0 140px',display:'none' }} className="hide-sm">
        <div style={{ color:'var(--green)',fontWeight:600,fontSize:12 }}>{p.dept}</div>
        <div style={{ fontSize:11,color:'var(--text3)' }}>{p.doctor}</div>
      </div>
      <div style={{ flex:'0 0 100px' }}>
        <span style={{ display:'inline-flex',alignItems:'center',gap:3,padding:'3px 9px',
          borderRadius:99,fontSize:9,fontWeight:700,textTransform:'uppercase',
          color:cfg.color,background:cfg.bg,border:`1px solid ${cfg.border}` }}>
          <Icon size={10} color={cfg.color}/> {p.status}
        </span>
      </div>
      <div style={{ flex:'0 0 170px',display:'flex',gap:12 }} className="hide-sm">
        {[['BP',p.vitals.bp],['HR',`${p.vitals.hr}`],['SpO₂',`${p.vitals.spo2}%`]].map(([l,v]) => (
          <div key={l} style={{ textAlign:'center' }}>
            <div style={{ fontSize:8,color:'var(--text3)',fontWeight:700,
              textTransform:'uppercase' }}>{l}</div>
            <div style={{ fontSize:12,fontWeight:800,fontFamily:'Sora,sans-serif',
              color:'var(--text)' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ flex:'0 0 110px' }} className="hide-sm">
        <div style={{ fontSize:11,color:'var(--text2)',fontWeight:500 }}>{p.admitted}</div>
        <div style={{ fontSize:10,color:'var(--text3)' }}>Next: {p.next}</div>
      </div>
      <div style={{ display:'flex',gap:6,marginLeft:'auto' }}>
        <button onClick={() => onView(p)}
          style={{ width:30,height:30,borderRadius:7,border:'none',
            background:'#e6f7ee',color:'#1a7a4a',cursor:'pointer',display:'flex',
            alignItems:'center',justifyContent:'center' }}>
          <Eye size={13} color="#1a7a4a"/>
        </button>
        <button style={{ width:30,height:30,borderRadius:7,border:'none',
          background:'#f0eeff',color:'#6c5ce7',cursor:'pointer',display:'flex',
          alignItems:'center',justifyContent:'center' }}>
          <Edit size={13} color="#6c5ce7"/>
        </button>
      </div>
    </div>
  )
}

/* ── Modal ──────────────────────────────────────── */
const MTABS = ['Overview','Vitals','Medications','Notes']

function Modal({ p, onClose }) {
  const [tab, setTab] = useState('Overview')
  if (!p) return null
  const cfg  = STATUS_CFG[p.status]
  const Icon = SI(p.status)

  return (
    <div onClick={onClose} style={{ position:'fixed',inset:0,
      background:'rgba(10,28,20,.6)',display:'flex',alignItems:'center',
      justifyContent:'center',zIndex:500,backdropFilter:'blur(6px)',padding:18 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--card)',
        borderRadius:22,width:'100%',maxWidth:680,maxHeight:'92vh',
        display:'flex',flexDirection:'column',
        boxShadow:'0 24px 72px rgba(0,0,0,.35)',
        overflow:'hidden',animation:'fadeUp .25s ease' }}>

        {/* Modal header */}
        <div style={{ display:'flex',alignItems:'flex-start',
          justifyContent:'space-between',gap:14,
          padding:'20px 20px 16px',borderBottom:'1px solid var(--border-lt)',
          background:p.avB }}>
          <div style={{ display:'flex',alignItems:'center',gap:14,flex:1 }}>
            <div style={{ width:52,height:52,borderRadius:13,background:p.avC,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:17,
              color:'#fff',flexShrink:0 }}>{p.av}</div>
            <div>
              <div style={{ fontFamily:'Sora,sans-serif',fontWeight:800,
                fontSize:18,color:'var(--text)' }}>{p.name}</div>
              <div style={{ fontSize:12,color:'var(--text3)',marginTop:2 }}>
                {p.id} · {p.age} yrs · {p.gender} · {p.blood}
              </div>
              <div style={{ display:'flex',gap:7,marginTop:6,flexWrap:'wrap' }}>
                <span style={{ display:'inline-flex',alignItems:'center',gap:3,
                  padding:'3px 9px',borderRadius:99,fontSize:9,fontWeight:700,
                  textTransform:'uppercase',color:cfg.color,background:cfg.bg,
                  border:`1px solid ${cfg.border}` }}>
                  <Icon size={10} color={cfg.color}/> {p.status}
                </span>
                <span style={{ display:'inline-flex',padding:'3px 9px',borderRadius:99,
                  fontSize:9,fontWeight:700,textTransform:'uppercase',
                  color:'var(--green)',background:'var(--green-pale)',
                  border:'1px solid var(--border)' }}>{p.dept}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ width:32,height:32,borderRadius:8,
            background:'rgba(232,87,42,.1)',border:'1px solid rgba(232,87,42,.2)',
            display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer' }}>
            <X size={15} color="#e8572a"/>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex',gap:2,padding:'10px 20px 0',
          borderBottom:'1px solid var(--border-lt)',flexWrap:'wrap' }}>
          {MTABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:'7px 16px',border:'none',background:'transparent',
              fontSize:12,fontWeight:tab===t?700:500,
              color:tab===t?'var(--green)':'var(--text3)',
              cursor:'pointer',
              borderBottom:`2px solid ${tab===t?'var(--green)':'transparent'}`,
              transition:'var(--t)',fontFamily:'DM Sans,sans-serif' }}>{t}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex:1,overflowY:'auto',padding:'18px 20px' }}>
          {tab==='Overview' && (
            <div className="modal-grid-2" style={{ display:'grid',
              gridTemplateColumns:'1fr 1fr',gap:13 }}>
              <Sec title="Contact" Icon={Phone}>
                {[[Phone,p.phone],[Mail,p.email],[MapPin,p.location]].map(([Ic,v],i)=>(
                  <div key={i} style={{ display:'flex',alignItems:'center',gap:9,marginBottom:8 }}>
                    <Ic size={13} color="var(--green)"/>
                    <span style={{ fontSize:13,color:'var(--text2)' }}>{v}</span>
                  </div>
                ))}
              </Sec>
              <Sec title="Clinical Details" Icon={Activity}>
                {[['Department',p.dept],['Physician',p.doctor],
                  ['Ward/Bed',`${p.ward} · Bed ${p.bed}`],
                  ['Admitted',p.admitted],['Next Appt',p.next]].map(([k,v])=>(
                  <KVRow key={k} k={k} v={v}/>
                ))}
              </Sec>
              <Sec title="Conditions" Icon={FileText}>
                {p.conditions.map((c,i)=>(
                  <div key={i} style={{ display:'flex',alignItems:'center',
                    gap:8,marginBottom:8 }}>
                    <div style={{ width:7,height:7,borderRadius:'50%',
                      background:p.avC,flexShrink:0 }}/>
                    <span style={{ fontSize:13,color:'var(--text2)',fontWeight:500 }}>{c}</span>
                  </div>
                ))}
              </Sec>
              <Sec title="Insurance & Emergency" Icon={Shield}>
                {[['Insurance',p.insurance],['Contact',p.emergency.name],
                  ['Relation',p.emergency.rel],['Phone',p.emergency.phone]].map(([k,v])=>(
                  <KVRow key={k} k={k} v={v}/>
                ))}
              </Sec>
              {p.allergies.length > 0 && (
                <div style={{ gridColumn:'1/-1' }}>
                  <Sec title="Known Allergies" Icon={AlertTriangle}>
                    <div style={{ display:'flex',flexWrap:'wrap',gap:7 }}>
                      {p.allergies.map((a,i)=>(
                        <span key={i} style={{ fontSize:12,fontWeight:700,
                          background:'#fef0ec',color:'#e8572a',
                          border:'1px solid #fbd0c2',borderRadius:99,
                          padding:'3px 12px' }}>{a}</span>
                      ))}
                    </div>
                  </Sec>
                </div>
              )}
            </div>
          )}

          {tab==='Vitals' && (
            <div>
              <div className="vitals-grid-3" style={{ display:'grid',
                gridTemplateColumns:'repeat(3,1fr)',gap:12 }}>
                {[['Blood Pressure',p.vitals.bp,'mmHg','#e8572a'],
                  ['Heart Rate',    p.vitals.hr,'bpm',  '#1a7a4a'],
                  ['SpO₂',          p.vitals.spo2,'%',  '#00b8a9'],
                  ['Temperature',   p.vitals.temp,'°F', '#f5a623'],
                  ['Resp. Rate',    '18','/min',         '#6c5ce7'],
                  ['Weight',        '70','kg',            '#145e38'],
                ].map(([lbl,val,unit,col])=>(
                  <div key={lbl} style={{ background:'var(--green-tint)',
                    border:'1px solid var(--border-lt)',borderRadius:12,
                    padding:'13px 14px',display:'flex',flexDirection:'column' }}>
                    <div style={{ width:8,height:8,borderRadius:'50%',
                      background:col,marginBottom:6 }}/>
                    <div style={{ fontSize:9,color:'var(--text3)',fontWeight:700,
                      textTransform:'uppercase',letterSpacing:'0.05em' }}>{lbl}</div>
                    <div style={{ fontFamily:'Sora,sans-serif',fontWeight:800,
                      fontSize:20,color:'var(--text)',marginTop:3 }}>
                      {val}<span style={{ fontSize:11,fontWeight:400,
                        color:'var(--text3)',marginLeft:3 }}>{unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:7,
                background:'var(--green-pale)',border:'1px solid var(--border)',
                borderRadius:9,padding:'9px 13px',marginTop:14 }}>
                <Activity size={13} color="var(--green)"/>
                <span style={{ fontSize:12,color:'var(--text2)' }}>
                  Vitals current as of today. Continuous monitoring active.
                </span>
              </div>
            </div>
          )}

          {tab==='Medications' && (
            <Sec title="Current Medications" Icon={Pill}>
              {p.meds.map((m,i)=>(
                <div key={i} style={{ display:'flex',alignItems:'center',gap:11,
                  padding:'10px 13px',background:'var(--card2)',
                  border:'1px solid var(--border-lt)',borderRadius:9,marginBottom:8 }}>
                  <div style={{ width:9,height:9,borderRadius:'50%',
                    background:p.avC,flexShrink:0 }}/>
                  <span style={{ flex:1,fontSize:13,fontWeight:600,
                    color:'var(--text)' }}>{m}</span>
                  <span style={{ fontSize:9,fontWeight:700,background:'#e6f7ee',
                    color:'#1a7a4a',borderRadius:99,padding:'2px 8px' }}>Active</span>
                </div>
              ))}
            </Sec>
          )}

          {tab==='Notes' && (
            <Sec title="Clinical Notes" Icon={FileText}>
              <div style={{ background:'var(--green-tint)',
                border:'1px solid var(--border-lt)',borderRadius:10,
                padding:'14px',fontSize:13,color:'var(--text2)',
                lineHeight:1.75 }}>{p.notes}</div>
              <div style={{ display:'flex',alignItems:'center',gap:6,
                marginTop:10,fontSize:11,color:'var(--text3)' }}>
                <Calendar size={12} color="var(--text3)"/>
                Last updated by {p.doctor} · {p.admitted}
              </div>
            </Sec>
          )}
        </div>

        {/* Footer */}
        <div style={{ display:'flex',gap:9,padding:'14px 20px',
          borderTop:'1px solid var(--border-lt)',background:'var(--bg2)' }}>
          <button style={{ flex:1,display:'flex',alignItems:'center',
            justifyContent:'center',gap:7,padding:11,
            background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
            color:'#fff',border:'none',borderRadius:11,
            fontFamily:'Sora,sans-serif',fontWeight:600,fontSize:13,cursor:'pointer' }}>
            <Edit size={13}/> Edit Record
          </button>
          <button onClick={onClose}
            style={{ padding:'11px 22px',background:'var(--card)',
              border:'1.5px solid var(--border)',color:'var(--text2)',
              borderRadius:11,fontFamily:'DM Sans,sans-serif',
              fontWeight:600,fontSize:13,cursor:'pointer' }}>Close</button>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}

function Sec({ title, Icon, children }) {
  return (
    <div style={{ background:'var(--green-tint)',border:'1px solid var(--border-lt)',
      borderRadius:13,padding:'14px 15px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:6,
        fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:10,color:'var(--green)',
        textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:12 }}>
        <Icon size={12} color="var(--green)"/>{title}
      </div>
      {children}
    </div>
  )
}
function KVRow({ k, v }) {
  return (
    <div style={{ display:'flex',justifyContent:'space-between',
      marginBottom:7,gap:8 }}>
      <span style={{ fontSize:11,color:'var(--text3)',fontWeight:500 }}>{k}</span>
      <span style={{ fontSize:12,color:'var(--text)',fontWeight:600,textAlign:'right' }}>{v}</span>
    </div>
  )
}

/* ── Main page ────────────────────────────────── */
export default function Patients() {
  const [view,   setView]   = useState('grid')
  const [search, setSearch] = useState('')
  const [dept,   setDept]   = useState('All')
  const [status, setStatus] = useState('All')
  const [sel,    setSel]    = useState(null)
  const [toast,  setToast]  = useState(null)

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return PATIENTS.filter(p => {
      const ms = !q || [p.name,p.id,p.dept,p.doctor].some(x => x.toLowerCase().includes(q))
      const md  = dept   === 'All' || p.dept   === dept
      const ms2 = status === 'All' || p.status === status
      return ms && md && ms2
    })
  }, [search, dept, status])

  const clearAll = () => { setSearch(''); setDept('All'); setStatus('All') }

  return (
    <Layout title="Patient Records" sub={`${filtered.length} of ${PATIENTS.length} patients`}>
      {toast && <div className="toast">✅ {toast}</div>}
      <Modal p={sel} onClose={() => setSel(null)}/>

      {/* Toolbar */}
      <div style={{ display:'flex',alignItems:'center',gap:10,
        marginBottom:13,flexWrap:'wrap' }}>
        <div style={{ flex:1,minWidth:220,display:'flex',alignItems:'center',gap:9,
          background:'var(--card)',border:'1.5px solid var(--border)',borderRadius:11,
          padding:'9px 13px',boxShadow:'var(--sh-sm)' }}>
          <Search size={14} color="var(--text3)"/>
          <input placeholder="Search name, ID, dept, doctor…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex:1,background:'transparent',border:'none',
              fontSize:13,color:'var(--text)' }}/>
          {search && <button onClick={() => setSearch('')}
            style={{ background:'none',border:'none',cursor:'pointer',display:'flex' }}>
            <X size={12} color="var(--text3)"/>
          </button>}
        </div>
        {[{ val:dept,set:setDept,opts:DEPTS },
          { val:status,set:setStatus,opts:STATUSES }].map((f,i) => (
          <select key={i} value={f.val} onChange={e => f.set(e.target.value)}
            style={{ padding:'8px 13px',background:'var(--card)',
              border:'1.5px solid var(--border)',borderRadius:9,
              fontSize:12,color:'var(--text2)',fontWeight:500,cursor:'pointer' }}>
            {f.opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        {/* View toggle */}
        <div style={{ display:'flex',background:'var(--card)',
          border:'1.5px solid var(--border)',borderRadius:10,overflow:'hidden' }}>
          {[['grid',LayoutGrid,'Grid'],['list',List,'List']].map(([v,Ic,lbl]) => (
            <button key={v} onClick={() => setView(v)} style={{
              display:'flex',alignItems:'center',gap:5,padding:'8px 14px',
              background: view===v ? 'var(--green)' : 'transparent',
              border:'none',cursor:'pointer',transition:'var(--t)',
              color: view===v ? '#fff' : 'var(--text3)',
              fontSize:12,fontWeight: view===v ? 600 : 500,
              fontFamily:'DM Sans,sans-serif' }}>
              <Ic size={15} color={view===v?'#fff':'var(--text3)'}/>{lbl}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('Add Patient form coming soon')}
          style={{ display:'flex',alignItems:'center',gap:6,padding:'9px 16px',
            background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
            color:'#fff',border:'none',borderRadius:10,fontFamily:'Sora,sans-serif',
            fontWeight:600,fontSize:13,cursor:'pointer',
            boxShadow:'0 3px 12px rgba(26,122,74,.28)',whiteSpace:'nowrap' }}>
          <Plus size={14}/> Add Patient
        </button>
      </div>

      {/* Status chips */}
      <div style={{ display:'flex',gap:8,marginBottom:18,flexWrap:'wrap' }}>
        {Object.entries(STATUS_CFG).map(([st,cfg]) => {
          const Icon  = SI(st)
          const cnt   = PATIENTS.filter(p => p.status === st).length
          const active = status === st
          return (
            <button key={st} onClick={() => setStatus(active?'All':st)}
              style={{ display:'flex',alignItems:'center',gap:6,padding:'6px 14px',
                borderRadius:99,cursor:'pointer',fontFamily:'DM Sans,sans-serif',
                fontSize:12,transition:'var(--t)',border:'none',
                background: active ? cfg.bg : 'var(--card)',
                color:      active ? cfg.color : 'var(--text3)',
                boxShadow:  active ? `0 0 0 1px ${cfg.border}` : `0 0 0 1px var(--border-lt)` }}>
              <Icon size={12} color={active?cfg.color:'var(--text3)'}/>
              <strong>{cnt}</strong> {st}
            </button>
          )
        })}
        <div style={{ display:'flex',alignItems:'center',gap:6,padding:'6px 14px',
          borderRadius:99,background:'var(--card)',
          boxShadow:'0 0 0 1px var(--border-lt)',
          color:'var(--green)',fontSize:12 }}>
          <User size={12} color="var(--green)"/>
          <strong>{PATIENTS.length}</strong> Total
        </div>
      </div>

      {/* Grid view */}
      {view==='grid' && (
        <div className="patient-grid" style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(268px,1fr))',gap:16 }}>
          {filtered.length===0
            ? <EmptyState onClear={clearAll}/>
            : filtered.map(p =>
                <GridCard key={p.id} p={p} onView={setSel}
                  onDelete={() => showToast(`${p.name} removed`)}/>
              )}
        </div>
      )}

      {/* List view */}
      {view==='list' && (
        <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
          borderRadius:16,overflow:'hidden',boxShadow:'var(--sh-sm)' }}>
          <div style={{ display:'flex',alignItems:'center',gap:14,padding:'10px 16px',
            background:'var(--green-tint)',borderBottom:'1px solid var(--border)' }}>
            <div style={{ width:44 }}/>
            {[['0 0 180px','Patient'],['0 0 140px','Department'],
              ['0 0 100px','Status'],['0 0 170px','Vitals'],
              ['0 0 110px','Dates'],['','Actions']].map(([f,lbl],i) => (
              <div key={i} style={{ flex:f||'0 0 80px',fontSize:9,fontWeight:700,
                color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.07em',
                textAlign:i===5?'right':'left' }}>{lbl}</div>
            ))}
          </div>
          {filtered.length===0
            ? <EmptyState onClear={clearAll}/>
            : filtered.map(p => <ListRow key={p.id} p={p} onView={setSel}/>)}
        </div>
      )}

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        select:focus,input:focus{outline:none}
      `}</style>
    </Layout>
  )
}

function EmptyState({ onClear }) {
  return (
    <div style={{ gridColumn:'1/-1',textAlign:'center',padding:'60px 24px' }}>
      <User size={52} color="var(--border)" style={{ margin:'0 auto 14px' }}/>
      <p style={{ fontFamily:'Sora,sans-serif',fontSize:16,fontWeight:700,
        color:'var(--text3)' }}>No patients found</p>
      <p style={{ fontSize:12,color:'var(--text4)',marginTop:5,marginBottom:18 }}>
        Adjust your search or filters.
      </p>
      <button onClick={onClear}
        style={{ display:'inline-flex',alignItems:'center',gap:6,
          padding:'8px 18px',background:'var(--green-pale)',border:'1px solid var(--border)',
          borderRadius:9,color:'var(--green)',fontWeight:600,fontSize:13,cursor:'pointer' }}>
        <X size={12}/> Clear filters
      </button>
    </div>
  )
}