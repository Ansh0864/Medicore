import { useState } from 'react'
import { Bell, Monitor, Shield, Database, Sun, Moon,
         ChevronRight, Download, RefreshCw, Trash2,
         CheckCircle, Save } from 'lucide-react'
import Layout    from '../components/Layout'
import { useTheme } from '../components/ThemeStore'

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)}
      style={{ background: on ? 'var(--green)' : 'var(--border)',
        border:'none',borderRadius:99,width:44,height:24,
        position:'relative',cursor:'pointer',transition:'background .2s',
        flexShrink:0 }}>
      <span style={{ position:'absolute',top:3,
        left: on ? 23 : 3,width:18,height:18,borderRadius:'50%',
        background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,.2)',
        transition:'left .2s' }}/>
    </button>
  )
}

function Section({ Icon, title, sub, children }) {
  return (
    <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
      borderRadius:20,overflow:'hidden',boxShadow:'var(--sh-sm)' }}>
      <div style={{ display:'flex',alignItems:'center',gap:12,
        padding:'16px 20px 14px',borderBottom:'1px solid var(--border-lt)',
        background:'var(--green-tint)' }}>
        <div style={{ width:38,height:38,borderRadius:10,background:'var(--green-pale)',
          display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
          <Icon size={18} color="var(--green)"/>
        </div>
        <div>
          <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:14,
            color:'var(--text)' }}>{title}</div>
          {sub && <div style={{ fontSize:11,color:'var(--text3)',marginTop:2 }}>{sub}</div>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

function Row({ label, sub, control, danger }) {
  return (
    <div style={{ display:'flex',alignItems:'center',gap:14,
      padding:'13px 20px',borderBottom:'1px solid var(--border-lt)' }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13,fontWeight:600,
          color: danger ? 'var(--orange)' : 'var(--text)' }}>{label}</div>
        {sub && <div style={{ fontSize:12,color:'var(--text3)',marginTop:2 }}>{sub}</div>}
      </div>
      <div style={{ flexShrink:0 }}>{control}</div>
    </div>
  )
}

export default function Settings() {
  const { theme, toggle, isDark } = useTheme()
  const [saved,  setSaved]  = useState(false)
  const [toast,  setToast]  = useState(null)

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const [notifs, setNotifs] = useState({
    critical:true, appointments:true, labs:true,
    discharges:false, system:true, email:false,
  })
  const [display, setDisplay] = useState({
    animations:true, compact:false, lang:'en-IN', tz:'Asia/Kolkata', dateFormat:'DD MMM YYYY',
  })

  const tn = k => v => setNotifs(p => ({...p,[k]:v}))
  const td = k => v => setDisplay(p => ({...p,[k]:v}))

  const saveSettings = () => {
    setSaved(true)
    showToast('Settings saved successfully')
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Layout title="Settings" sub="Customise your MediCore experience">
      {toast && <div className="toast">✅ {toast}</div>}

      {/* Page header */}
      <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:22 }}>
        <button onClick={saveSettings}
          style={{ display:'flex',alignItems:'center',gap:7,padding:'10px 22px',
            background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
            color:'#fff',border:'none',borderRadius:12,fontFamily:'Sora,sans-serif',
            fontWeight:600,fontSize:14,cursor:'pointer',
            boxShadow:'0 4px 14px rgba(26,122,74,.28)' }}>
          {saved ? <CheckCircle size={14}/> : <Save size={14}/>}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20 }} className="two-col">

        {/* Appearance — PROMINENT theme toggle */}
        <Section Icon={Monitor} title="Appearance" sub="Theme, layout and display preferences">
          <Row
            label="Dark Mode"
            sub={isDark ? 'Currently using dark theme' : 'Currently using light theme'}
            control={
              <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                <Sun size={16} color={!isDark?'var(--gold)':'var(--text3)'}/>
                <Toggle on={isDark} onChange={toggle}/>
                <Moon size={16} color={isDark?'#a29bfe':'var(--text3)'}/>
              </div>
            }
          />
          <Row label="Compact View" sub="Reduce spacing for denser layout"
            control={<Toggle on={display.compact} onChange={td('compact')}/>}/>
          <Row label="Animations" sub="Smooth transitions and micro-interactions"
            control={<Toggle on={display.animations} onChange={td('animations')}/>}/>
          <Row label="Language" control={
            <select value={display.lang} onChange={e => td('lang')(e.target.value)}
              style={{ padding:'5px 10px',background:'var(--green-tint)',
                border:'1px solid var(--border)',borderRadius:7,
                fontSize:12,color:'var(--text)',cursor:'pointer' }}>
              <option value="en-IN">English (India)</option>
              <option value="en-US">English (US)</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
            </select>
          }/>
          <Row label="Date Format" control={
            <select value={display.dateFormat} onChange={e => td('dateFormat')(e.target.value)}
              style={{ padding:'5px 10px',background:'var(--green-tint)',
                border:'1px solid var(--border)',borderRadius:7,
                fontSize:12,color:'var(--text)',cursor:'pointer' }}>
              <option>DD MMM YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          }/>
        </Section>

        {/* Notifications */}
        <Section Icon={Bell} title="Notifications" sub="Configure push and in-app alerts">
          {Notification.permission !== 'granted' && (
            <div style={{ display:'flex',alignItems:'center',gap:10,
              background:'#fff6e6',border:'1px solid #fde3b0',
              borderRadius:10,padding:'11px 14px',margin:'12px 16px 4px' }}>
              <Bell size={16} color="#f5a623"/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12,fontWeight:600,color:'var(--text)' }}>
                  Push notifications {Notification.permission==='denied'?'blocked':'not enabled'}
                </div>
                <div style={{ fontSize:11,color:'var(--text3)' }}>
                  Enable to receive real-time clinical alerts.
                </div>
              </div>
              {Notification.permission !== 'denied' && (
                <button onClick={() => Notification.requestPermission()}
                  style={{ padding:'5px 12px',background:'var(--green)',border:'none',
                    borderRadius:7,fontSize:11,fontWeight:700,color:'#fff',cursor:'pointer' }}>
                  Enable
                </button>
              )}
            </div>
          )}
          {[
            ['Critical Patient Alerts', 'Immediate push for critical vitals',      'critical'],
            ['Appointment Reminders',   '15 min before scheduled visits',           'appointments'],
            ['Lab Results Ready',       'Notify when results uploaded',             'labs'],
            ['Discharge Notifications', 'Patient cleared for discharge',            'discharges'],
            ['System Alerts',           'Maintenance, downtime, security',          'system'],
            ['Daily Email Digest',      'Summary every morning',                    'email'],
          ].map(([label,sub,key]) => (
            <Row key={key} label={label} sub={sub}
              control={<Toggle on={notifs[key]} onChange={tn(key)}/>}/>
          ))}
        </Section>

        {/* Security */}
        <Section Icon={Shield} title="Security" sub="Login, sessions and compliance">
          {[
            { label:'Session Timeout',    sub:'Auto-logout after 30 min', control:<span style={{ fontSize:11,fontWeight:700,background:'var(--green-pale)',color:'var(--green)',borderRadius:99,padding:'3px 10px' }}>30 min</span> },
            { label:'Two-Factor Auth',    sub:'Enabled via Authenticator',control:<span style={{ fontSize:11,fontWeight:700,background:'#e6f7ee',color:'#1a7a4a',borderRadius:99,padding:'3px 10px' }}>Active</span> },
            { label:'HIPAA Audit Trail',  sub:'All actions logged',       control:<span style={{ fontSize:11,fontWeight:700,background:'#e6f7ee',color:'#1a7a4a',borderRadius:99,padding:'3px 10px' }}>On</span> },
            { label:'Login Activity Log', sub:'View recent sign-ins',     control:<button onClick={() => showToast('Audit log feature coming soon')} style={{ display:'flex',alignItems:'center',gap:3,background:'none',border:'none',cursor:'pointer',fontSize:12,fontWeight:600,color:'var(--green)' }}>View <ChevronRight size={12}/></button> },
          ].map((r,i) => <Row key={i} {...r}/>)}
        </Section>

        {/* Data & Privacy */}
        <Section Icon={Database} title="Data & Privacy" sub="Export, backup and account data">
          <Row label="Export My Data" sub="Download records as JSON or CSV"
            control={<button onClick={() => showToast('Export started — file will download shortly')}
              style={{ display:'flex',alignItems:'center',gap:5,padding:'6px 13px',
                background:'var(--green-pale)',border:'1px solid var(--border)',
                borderRadius:8,fontSize:12,fontWeight:600,color:'var(--green)',
                cursor:'pointer' }}><Download size={13}/> Export</button>}/>
          <Row label="Clear Cache" sub="Remove locally cached data"
            control={<button onClick={() => showToast('Cache cleared successfully')}
              style={{ display:'flex',alignItems:'center',gap:5,padding:'6px 13px',
                background:'var(--green-pale)',border:'1px solid var(--border)',
                borderRadius:8,fontSize:12,fontWeight:600,color:'var(--green)',
                cursor:'pointer' }}><RefreshCw size={13}/> Clear</button>}/>
          <Row label="Privacy Policy" control={<button
              style={{ display:'flex',alignItems:'center',gap:3,background:'none',
                border:'none',cursor:'pointer',fontSize:12,fontWeight:600,
                color:'var(--green)' }}>View <ChevronRight size={12}/></button>}/>
          <Row label="Delete Account" sub="Permanently remove account and data"
            danger control={<button onClick={() => showToast('Please contact support to delete your account')}
              style={{ display:'flex',alignItems:'center',gap:5,padding:'6px 13px',
                background:'#fef0ec',border:'1px solid #fbd0c2',borderRadius:8,
                fontSize:12,fontWeight:600,color:'var(--orange)',cursor:'pointer' }}>
              <Trash2 size={13}/> Delete</button>}/>
        </Section>
      </div>

      <style>{`select:focus{outline:none}`}</style>
    </Layout>
  )
}