import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, BarChart3, Users, Calendar, FileText,
  Bell, LogOut, Shield, X, Menu, User, Settings,
  Sun, Moon, ChevronRight,
} from 'lucide-react'
import { useAuth }  from './AuthStore'
import { useTheme } from './ThemeStore'

const NAV = [
  { to:'/',             icon:Home,      label:'Dashboard'    },
  { to:'/analytics',    icon:BarChart3, label:'Analytics'    },
  { to:'/patients',     icon:Users,     label:'Patients'     },
  { to:'/appointments', icon:Calendar,  label:'Appointments' },
  { to:'/reports',      icon:FileText,  label:'Reports'      },
]

const NOTIFS = [
  { id:1, type:'alert',   title:'Critical Alert',    body:'P-1042 BP 160/100 critical',   time:'2m ago'  },
  { id:2, type:'info',    title:'Lab Results Ready', body:'Arjun Sharma results uploaded', time:'10m ago' },
  { id:3, type:'ok',      title:'Discharge Done',    body:'Riya Sharma cleared',           time:'22m ago' },
]
const NC = {
  alert:{ dot:'#e8572a', bg:'#fef0ec', border:'#fbd0c2' },
  info: { dot:'#00b8a9', bg:'#e0f9f7', border:'#b3f0ea' },
  ok:   { dot:'#1a7a4a', bg:'#e6f7ee', border:'#b3e6c8' },
}

export default function Layout({ children, title, sub }) {
  const { user, logout }   = useAuth()
  const { theme, toggle, isDark } = useTheme()
  const location           = useLocation()
  const navigate           = useNavigate()
  const [bell,     setBell]     = useState(false)
  const [cnt,      setCnt]      = useState(3)
  const [sidebar,  setSidebar]  = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  const init   = (user?.name || 'DR').slice(0, 2).toUpperCase()
  const isDark_ = isDark

  const handleBell = () => {
    setBell(v => !v); setCnt(0)
    if (Notification.permission === 'granted')
      new Notification('MediCore', { body: 'Notifications cleared.' })
  }

  const close = () => { setSidebar(false); setBell(false); setUserMenu(false) }

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:10,
        padding:'20px 16px 18px', borderBottom:'1px solid rgba(255,255,255,.1)' }}>
        <div style={{ width:38,height:38,background:'rgba(255,255,255,.15)',borderRadius:10,
          display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
          <Shield size={19} color="#fff" />
        </div>
        <span style={{ fontFamily:'Sora,sans-serif',fontSize:20,fontWeight:700 }}>
          <span style={{color:'#fff'}}>Medi</span><span style={{color:'#f5a623'}}>Core</span>
        </span>
      </div>

      {/* Nav label */}
      <div style={{ padding:'16px 18px 8px', fontSize:9, fontWeight:700,
        color:'rgba(255,255,255,.35)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
        Main Navigation
      </div>

      {/* Nav links */}
      <nav style={{ flex:1,padding:'0 10px 16px',display:'flex',flexDirection:'column',gap:3 }}>
        {NAV.map(({ to, icon:Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} onClick={close}
              className={`nav-link ${active ? 'active' : ''}`}
              style={{ display:'flex',alignItems:'center',gap:11,padding:'10px 13px',
                borderRadius:11,textDecoration:'none',
                background: active ? 'rgba(255,255,255,.18)' : 'transparent',
                boxShadow: active ? '0 2px 10px rgba(0,0,0,.15)' : 'none' }}>
              <Icon size={18} color={active ? '#fff' : 'rgba(255,255,255,.65)'} />
              <span style={{ color: active?'#fff':'rgba(255,255,255,.75)',
                fontSize:13, fontWeight: active?600:400 }}>{label}</span>
              {active && <div style={{ marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'#f5a623' }}/>}
            </Link>
          )
        })}

        {/* Separator */}
        <div style={{ height:1,background:'rgba(255,255,255,.1)',margin:'10px 6px' }}/>
        <div style={{ padding:'0 3px 6px', fontSize:9, fontWeight:700,
          color:'rgba(255,255,255,.35)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
          Account
        </div>

        {[{ to:'/profile',icon:User,label:'My Profile' },
          { to:'/settings',icon:Settings,label:'Settings' }].map(({ to, icon:Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} onClick={close}
              className={`nav-link ${active ? 'active' : ''}`}
              style={{ display:'flex',alignItems:'center',gap:11,padding:'10px 13px',
                borderRadius:11,textDecoration:'none',
                background: active ? 'rgba(255,255,255,.18)' : 'transparent' }}>
              <Icon size={18} color={active ? '#fff' : 'rgba(255,255,255,.6)'} />
              <span style={{ color: active?'#fff':'rgba(255,255,255,.7)',
                fontSize:13,fontWeight:active?600:400 }}>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User card */}
      <div style={{ margin:'6px', padding:'11px 13px',
        borderRadius:12, background:'rgba(255,255,255,.08)',
        border:'1px solid rgba(255,255,255,.1)',
        display:'flex',alignItems:'center',gap:9 }}>
        <div style={{ width:34,height:34,borderRadius:'50%',flexShrink:0,
          background:'linear-gradient(135deg,#f5a623,#e8572a)',
          color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:12,
          display:'flex',alignItems:'center',justifyContent:'center' }}>{init}</div>
        <div style={{ flex:1,overflow:'hidden' }}>
          <div style={{ fontSize:12,fontWeight:700,color:'#fff',
            overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{user?.name}</div>
          <div style={{ fontSize:10,color:'rgba(255,255,255,.5)' }}>{user?.role}</div>
        </div>
        <button onClick={() => { logout(); navigate('/login') }}
          title="Sign out"
          style={{ background:'none',border:'none',cursor:'pointer',padding:5,
            borderRadius:8,display:'flex',alignItems:'center' }}>
          <LogOut size={14} color="rgba(255,255,255,.6)" />
        </button>
      </div>
    </>
  )

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)' }}>

      {/* ── Desktop sidebar ────────────────────── */}
      <aside className="sidebar-desktop" style={{ width:230,flexShrink:0,
        display:'flex',flexDirection:'column',
        background:`linear-gradient(180deg,var(--sidebar-a) 0%,var(--sidebar-b) 55%,var(--sidebar-c) 100%)`,
        height:'100vh',position:'sticky',top:0,zIndex:50,
        borderRight:'1px solid rgba(255,255,255,.05)' }}>
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar (overlay) ────────────── */}
      {sidebar && (
        <>
          <div onClick={() => setSidebar(false)}
            style={{ position:'fixed',inset:0,background:'rgba(0,0,0,.5)',
              zIndex:190,backdropFilter:'blur(2px)' }} />
          <aside className="sidebar-mobile" style={{ position:'fixed',top:0,left:0,
            width:230,height:'100vh',zIndex:200,display:'flex',flexDirection:'column',
            background:`linear-gradient(180deg,var(--sidebar-a) 0%,var(--sidebar-b) 55%,var(--sidebar-c) 100%)`,
            boxShadow:'4px 0 32px rgba(0,0,0,.3)',animation:'slideIn .25s ease' }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main area ──────────────────────────── */}
      <div style={{ flex:1,display:'flex',flexDirection:'column',minWidth:0 }}>

        {/* Topbar */}
        <header className="topbar" style={{ display:'flex',alignItems:'center',
          gap:14,padding:'0 24px',height:64,background:'var(--card)',
          borderBottom:'1px solid var(--border-lt)',position:'sticky',
          top:0,zIndex:100,boxShadow:'var(--sh-sm)' }}>

          {/* Hamburger — mobile only */}
          <button className="hamburger-btn btn-hover"
            onClick={() => setSidebar(v => !v)}
            style={{ display:'none',width:38,height:38,borderRadius:10,
              background:'var(--green-tint)',border:'1px solid var(--border)',
              alignItems:'center',justifyContent:'center' }}>
            <Menu size={18} color="var(--green)" />
          </button>

          {/* Page title */}
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:17,
              color:'var(--text)',lineHeight:1.2,
              overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{title}</div>
            {sub && <div style={{ fontSize:11,color:'var(--text3)',marginTop:1 }}>{sub}</div>}
          </div>

          <div style={{ display:'flex',alignItems:'center',gap:8 }}>

            {/* Theme toggle */}
            <button onClick={toggle}
              title={isDark_ ? 'Switch to Light' : 'Switch to Dark'}
              className="btn-hover"
              style={{ width:38,height:38,borderRadius:10,
                background: isDark_ ? 'rgba(46,204,113,.15)' : 'var(--green-tint)',
                border:'1px solid var(--border)',display:'flex',
                alignItems:'center',justifyContent:'center' }}>
              {isDark_
                ? <Sun  size={17} color="#f5a623" />
                : <Moon size={17} color="var(--green)" />}
            </button>

            {/* Notifications */}
            <div style={{ position:'relative' }}>
              <button onClick={handleBell} className="btn-hover"
                style={{ position:'relative',width:38,height:38,borderRadius:10,
                  background:'var(--green-tint)',border:'1px solid var(--border)',
                  display:'flex',alignItems:'center',justifyContent:'center' }}>
                <Bell size={17} color={bell?'var(--green)':'var(--text3)'} />
                {cnt > 0 && (
                  <span style={{ position:'absolute',top:-4,right:-4,width:17,height:17,
                    background:'#e8572a',borderRadius:'50%',fontSize:9,fontWeight:700,
                    color:'#fff',display:'flex',alignItems:'center',
                    justifyContent:'center',border:'2px solid var(--card)' }}>{cnt}</span>
                )}
              </button>

              {bell && (
                <>
                  <div style={{ position:'absolute',top:'calc(100% + 8px)',right:0,
                    width:320,background:'var(--card)',
                    border:'1px solid var(--border-lt)',borderRadius:16,
                    boxShadow:'var(--sh-lg)',padding:14,zIndex:200,
                    animation:'fadeUp .2s ease' }}>
                    <div style={{ display:'flex',justifyContent:'space-between',
                      alignItems:'center',marginBottom:12 }}>
                      <span style={{ fontFamily:'Sora,sans-serif',fontWeight:700,
                        fontSize:13,color:'var(--text)' }}>Notifications</span>
                      <button onClick={() => setBell(false)}
                        style={{ background:'none',border:'none',cursor:'pointer',
                          padding:2,borderRadius:6,display:'flex' }}>
                        <X size={14} color="var(--text3)" />
                      </button>
                    </div>
                    {NOTIFS.map(n => {
                      const c = NC[n.type]
                      return (
                        <div key={n.id} style={{ display:'flex',gap:10,borderRadius:10,
                          padding:'9px 11px',marginBottom:7,
                          background:c.bg,border:`1px solid ${c.border}` }}>
                          <div style={{ width:8,height:8,borderRadius:'50%',
                            background:c.dot,flexShrink:0,marginTop:4 }} />
                          <div>
                            <div style={{ fontSize:12,fontWeight:700,marginBottom:2 }}>{n.title}</div>
                            <div style={{ fontSize:11,color:'var(--text3)',lineHeight:1.5 }}>{n.body}</div>
                            <div style={{ fontSize:10,color:'var(--text4)',marginTop:3 }}>{n.time}</div>
                          </div>
                        </div>
                      )
                    })}
                    <button onClick={() => setBell(false)}
                      style={{ width:'100%',padding:'8px',background:'var(--green-pale)',
                        border:'1px solid var(--border)',borderRadius:8,fontSize:12,
                        fontWeight:600,color:'var(--green)',cursor:'pointer',marginTop:4 }}>
                      Mark all as read
                    </button>
                  </div>
                  <div onClick={() => setBell(false)}
                    style={{ position:'fixed',inset:0,zIndex:199 }} />
                </>
              )}
            </div>

            {/* User menu */}
            <div style={{ position:'relative' }}>
              <button onClick={() => setUserMenu(v => !v)}
                style={{ display:'flex',alignItems:'center',gap:8,
                  background:'var(--green-tint)',border:'1px solid var(--border)',
                  borderRadius:10,padding:'5px 12px 5px 6px',cursor:'pointer',
                  transition:'var(--t)' }}>
                <div style={{ width:30,height:30,borderRadius:'50%',
                  background:'linear-gradient(135deg,#f5a623,#e8572a)',
                  color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:700,
                  fontSize:11,display:'flex',alignItems:'center',justifyContent:'center' }}>{init}</div>
                <span style={{ fontSize:12,fontWeight:600,color:'var(--text)',
                  maxWidth:80,overflow:'hidden',textOverflow:'ellipsis',
                  whiteSpace:'nowrap' }}>{user?.name}</span>
              </button>

              {userMenu && (
                <>
                  <div style={{ position:'absolute',top:'calc(100% + 8px)',right:0,
                    width:200,background:'var(--card)',border:'1px solid var(--border-lt)',
                    borderRadius:14,boxShadow:'var(--sh-lg)',padding:8,zIndex:200,
                    animation:'fadeUp .2s ease' }}>
                    {[
                      { to:'/profile',  Icon:User,     label:'My Profile' },
                      { to:'/settings', Icon:Settings, label:'Settings'   },
                    ].map(({ to, Icon, label }) => (
                      <Link key={to} to={to} onClick={() => setUserMenu(false)}
                        style={{ display:'flex',alignItems:'center',gap:10,
                          padding:'9px 12px',borderRadius:9,textDecoration:'none',
                          color:'var(--text2)',fontSize:13,fontWeight:500,
                          transition:'var(--t)' }}
                        onMouseEnter={e => e.currentTarget.style.background='var(--green-tint)'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        <Icon size={15} color="var(--green)" /> {label}
                      </Link>
                    ))}
                    <div style={{ height:1,background:'var(--border-lt)',margin:'6px 4px' }}/>
                    <button onClick={() => { logout(); navigate('/login') }}
                      style={{ width:'100%',display:'flex',alignItems:'center',gap:10,
                        padding:'9px 12px',borderRadius:9,background:'none',border:'none',
                        color:'var(--orange)',fontSize:13,fontWeight:500,cursor:'pointer',
                        transition:'var(--t)' }}
                      onMouseEnter={e => e.currentTarget.style.background='#fef0ec'}
                      onMouseLeave={e => e.currentTarget.style.background='none'}>
                      <LogOut size={15} color="var(--orange)" /> Sign Out
                    </button>
                  </div>
                  <div onClick={() => setUserMenu(false)}
                    style={{ position:'fixed',inset:0,zIndex:199 }} />
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content" style={{ flex:1,padding:'24px',overflowY:'auto' }}>
          {children}
        </main>

        <footer style={{ display:'flex',justifyContent:'space-between',
          padding:'10px 24px',fontSize:11,color:'var(--text4)',
          borderTop:'1px solid var(--border-lt)',background:'var(--card)' }}>
          <span>© 2025 MediCore Healthcare · HIPAA Compliant</span>
          <span>v2.0.0</span>
        </footer>
      </div>
    </div>
  )
}