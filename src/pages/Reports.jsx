import { useState } from 'react'
import { FileText, Download, Search, Filter, Eye,
         Trash2, Plus, CheckCircle, Clock, X } from 'lucide-react'
import Layout from '../components/Layout'
import { REPORTS } from '../components/data'

const TYPES    = ['All','Clinical','Operations','Financial','HR','Compliance','Quality']
const STATUSES = ['All','Final','Draft']

const TYPE_CLR = {
  Clinical:   { bg:'#e6f7ee',color:'#1a7a4a' },
  Operations: { bg:'#e0f9f7',color:'#00b8a9' },
  Financial:  { bg:'#fff6e6',color:'#f5a623' },
  HR:         { bg:'#f0eeff',color:'#6c5ce7' },
  Compliance: { bg:'#fef0ec',color:'#e8572a' },
  Quality:    { bg:'#e6f7ee',color:'#1a7a4a' },
}

export default function Reports() {
  const [search,  setSearch]  = useState('')
  const [typeF,   setTypeF]   = useState('All')
  const [statF,   setStatF]   = useState('All')
  const [toast,   setToast]   = useState(null)
  const [preview, setPreview] = useState(null)

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const filtered = REPORTS.filter(r => {
    const q = search.toLowerCase()
    const ms = !q || r.title.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q) || r.author.toLowerCase().includes(q)
    const mt = typeF === 'All' || r.type === typeF
    const ms2= statF === 'All' || r.status === statF
    return ms && mt && ms2
  })

  return (
    <Layout title="Reports" sub="Clinical, financial and operational documents">
      {toast && <div className="toast">✅ {toast}</div>}

      {/* Summary */}
      <div className="kpi-grid-4" style={{ display:'grid',
        gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:22 }}>
        {[
          { label:'Total Reports',  value:REPORTS.length,                       c:'#1a7a4a',bg:'#e6f7ee',Icon:FileText   },
          { label:'Final Reports',  value:REPORTS.filter(r=>r.status==='Final').length, c:'#00b8a9',bg:'#e0f9f7',Icon:CheckCircle},
          { label:'Draft Reports',  value:REPORTS.filter(r=>r.status==='Draft').length, c:'#f5a623',bg:'#fff6e6',Icon:Clock      },
          { label:'Departments',    value:'8',                                  c:'#6c5ce7',bg:'#f0eeff',Icon:Filter     },
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
      <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:18,flexWrap:'wrap' }}>
        <div style={{ flex:1,minWidth:200,display:'flex',alignItems:'center',gap:9,
          background:'var(--card)',border:'1.5px solid var(--border)',
          borderRadius:11,padding:'9px 13px',boxShadow:'var(--sh-sm)' }}>
          <Search size={14} color="var(--text3)"/>
          <input placeholder="Search reports, departments, authors…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex:1,background:'transparent',border:'none',
              fontSize:13,color:'var(--text)' }}/>
          {search && <button onClick={() => setSearch('')}
            style={{ background:'none',border:'none',cursor:'pointer',display:'flex' }}>
            <X size={12} color="var(--text3)"/></button>}
        </div>
        {[{ val:typeF,set:setTypeF,opts:TYPES },
          { val:statF,set:setStatF,opts:STATUSES }].map((f,i) => (
          <select key={i} value={f.val} onChange={e => f.set(e.target.value)}
            style={{ padding:'8px 12px',background:'var(--card)',
              border:'1.5px solid var(--border)',borderRadius:9,
              fontSize:12,color:'var(--text2)',cursor:'pointer' }}>
            {f.opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <button onClick={() => showToast('Report generation feature coming soon')}
          style={{ display:'flex',alignItems:'center',gap:6,padding:'9px 16px',
            background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
            color:'#fff',border:'none',borderRadius:10,fontFamily:'Sora,sans-serif',
            fontWeight:600,fontSize:13,cursor:'pointer',
            boxShadow:'0 3px 12px rgba(26,122,74,.28)',whiteSpace:'nowrap' }}>
          <Plus size={14}/> Generate Report
        </button>
      </div>

      {/* Report table */}
      <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
        borderRadius:16,overflow:'hidden',boxShadow:'var(--sh-sm)' }}>
        <div style={{ display:'flex',alignItems:'center',gap:14,
          padding:'11px 18px',background:'var(--green-tint)',
          borderBottom:'1px solid var(--border)' }}>
          {[['flex: 0 0 36px',''],['flex: 1','Title'],['flex: 0 0 110px','Type'],
            ['flex: 0 0 130px','Department'],['flex: 0 0 110px','Date'],
            ['flex: 0 0 80px','Size'],['flex: 0 0 90px','Status'],
            ['flex: 0 0 120px','Actions']].map(([f,lbl],i) => (
            <div key={i} style={{ flex:f.replace('flex: ',''),fontSize:9,fontWeight:700,
              color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.07em' }}>{lbl}</div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:'center',padding:'48px 24px' }}>
            <FileText size={48} color="var(--border)" style={{ margin:'0 auto 14px' }}/>
            <p style={{ fontFamily:'Sora,sans-serif',fontSize:15,fontWeight:700,
              color:'var(--text3)' }}>No reports found</p>
          </div>
        ) : filtered.map((r,i) => {
          const tc = TYPE_CLR[r.type] || TYPE_CLR.Clinical
          return (
            <div key={r.id} style={{ display:'flex',alignItems:'center',gap:14,
              padding:'13px 18px',
              borderBottom: i<filtered.length-1 ? '1px solid var(--border-lt)' : 'none',
              transition:'var(--t)' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--green-tint)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>

              {/* File icon */}
              <div style={{ flex:'0 0 36px',width:36,height:36,borderRadius:9,
                background:'var(--green-pale)',display:'flex',alignItems:'center',
                justifyContent:'center',flexShrink:0 }}>
                <FileText size={16} color="var(--green)"/>
              </div>

              {/* Title */}
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontWeight:600,fontSize:13,color:'var(--text)',
                  overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                  {r.title}
                </div>
                <div style={{ fontSize:11,color:'var(--text3)',marginTop:1 }}>
                  By {r.author}
                </div>
              </div>

              {/* Type */}
              <div style={{ flex:'0 0 110px' }}>
                <span style={{ fontSize:10,fontWeight:700,color:tc.color,
                  background:tc.bg,borderRadius:99,padding:'3px 9px' }}>
                  {r.type}
                </span>
              </div>

              {/* Dept */}
              <div style={{ flex:'0 0 130px',fontSize:12,color:'var(--text2)',
                overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                {r.dept}
              </div>

              {/* Date */}
              <div style={{ flex:'0 0 110px',fontSize:12,color:'var(--text3)' }}>
                {r.date}
              </div>

              {/* Size */}
              <div style={{ flex:'0 0 80px',fontSize:12,color:'var(--text3)' }}>
                {r.size}
              </div>

              {/* Status */}
              <div style={{ flex:'0 0 90px' }}>
                <span style={{ fontSize:10,fontWeight:700,borderRadius:99,
                  padding:'3px 9px',
                  color:    r.status==='Final' ? '#1a7a4a' : '#f5a623',
                  background:r.status==='Final' ? '#e6f7ee' : '#fff6e6' }}>
                  {r.status}
                </span>
              </div>

              {/* Actions */}
              <div style={{ flex:'0 0 120px',display:'flex',gap:6 }}>
                <button onClick={() => setPreview(r)}
                  style={{ display:'flex',alignItems:'center',gap:4,
                    padding:'5px 10px',background:'#e6f7ee',color:'#1a7a4a',
                    border:'1px solid #b3e6c8',borderRadius:7,fontSize:11,
                    fontWeight:600,cursor:'pointer' }}>
                  <Eye size={11}/> View
                </button>
                <button onClick={() => showToast(`Downloading "${r.title}"…`)}
                  style={{ display:'flex',alignItems:'center',gap:4,
                    padding:'5px 10px',background:'var(--green-pale)',
                    color:'var(--green)',border:'1px solid var(--border)',
                    borderRadius:7,fontSize:11,fontWeight:600,cursor:'pointer' }}>
                  <Download size={11}/>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Preview modal */}
      {preview && (
        <div onClick={() => setPreview(null)}
          style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.5)',
            display:'flex',alignItems:'center',justifyContent:'center',
            zIndex:500,backdropFilter:'blur(4px)',padding:18 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:'var(--card)',borderRadius:20,width:'100%',maxWidth:520,
              boxShadow:'var(--sh-lg)',animation:'fadeUp .25s ease',overflow:'hidden' }}>
            <div style={{ padding:'18px 20px',borderBottom:'1px solid var(--border-lt)',
              display:'flex',justifyContent:'space-between',alignItems:'center' }}>
              <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:15,
                color:'var(--text)' }}>{preview.title}</div>
              <button onClick={() => setPreview(null)}
                style={{ background:'none',border:'none',cursor:'pointer' }}>
                <X size={18} color="var(--text3)"/>
              </button>
            </div>
            <div style={{ padding:'20px' }}>
              {[['Report ID',preview.id],['Type',preview.type],['Department',preview.dept],
                ['Date',preview.date],['File Size',preview.size],['Status',preview.status],
                ['Author',preview.author]].map(([k,v]) => (
                <div key={k} style={{ display:'flex',justifyContent:'space-between',
                  padding:'9px 0',borderBottom:'1px solid var(--border-lt)' }}>
                  <span style={{ fontSize:12,color:'var(--text3)',fontWeight:500 }}>{k}</span>
                  <span style={{ fontSize:12,color:'var(--text)',fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'0 20px 20px',display:'flex',gap:10 }}>
              <button onClick={() => { showToast(`Downloading "${preview.title}"…`); setPreview(null) }}
                style={{ flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:7,
                  padding:11,background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
                  color:'#fff',border:'none',borderRadius:11,fontFamily:'Sora,sans-serif',
                  fontWeight:600,fontSize:13,cursor:'pointer' }}>
                <Download size={14}/> Download Report
              </button>
              <button onClick={() => setPreview(null)}
                style={{ padding:'11px 18px',background:'var(--bg2)',
                  border:'1px solid var(--border)',borderRadius:11,
                  color:'var(--text2)',fontWeight:600,fontSize:13,cursor:'pointer' }}>
                Close
              </button>
            </div>
          </div>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}

      <style>{`select:focus,input:focus{outline:none}`}</style>
    </Layout>
  )
}