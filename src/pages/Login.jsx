import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight,
         Stethoscope, Activity, Users, Sun, Moon } from 'lucide-react'
import { useAuth }  from '../components/AuthStore'
import { useTheme } from '../components/ThemeStore'

const ROLES = ['Physician','Nurse Practitioner','Hospital Admin','Lab Technician','Pharmacist']

export default function Login() {
  const { login }  = useAuth()
  const { toggle, isDark } = useTheme()
  const navigate   = useNavigate()
  const [email,  setEmail]  = useState('')
  const [pass,   setPass]   = useState('')
  const [role,   setRole]   = useState('Physician')
  const [showPw, setShowPw] = useState(false)
  const [err,    setErr]    = useState('')
  const [loading,setLoading]= useState(false)

  const submit = async e => {
    e.preventDefault(); setLoading(true); setErr('')
    await new Promise(r => setTimeout(r, 700))
    const error = login(email, pass)
    if (error) { setErr(error); setLoading(false) } else navigate('/')
  }

  return (
    <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',
      alignItems:'center',background:'var(--bg)',
      transition:'background .3s',position:'relative',overflow:'hidden' }}>

      {/* Blobs */}
      <div style={{ position:'absolute',top:'-8%',left:'-6%',width:380,height:380,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(26,122,74,.1) 0%,transparent 70%)',pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'-6%',right:'-8%',width:420,height:420,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(245,166,35,.08) 0%,transparent 70%)',pointerEvents:'none' }}/>

      {/* Floating icons */}
      {[[Stethoscope,'18%','10%','#1a7a4a','0s'],
        [Activity,'72%','7%','#f5a623','1.2s'],
        [Users,'26%',undefined,'#6c5ce7','.6s'],
        [Shield,'66%',undefined,'#00b8a9','1.8s']].map(([Ic,top,left,color,delay],i) => (
        <div key={i} style={{ position:'absolute',top,left,
          ...(i===2?{right:'9%'}:{}),
          ...(i===3?{right:'13%'}:{}),
          animation:`float 4s ease-in-out ${delay} infinite`,
          opacity:.14,pointerEvents:'none' }}>
          <Ic size={32} color={color} />
        </div>
      ))}

      {/* Header */}
      <header style={{ width:'100%',
        background:'linear-gradient(135deg,var(--sidebar-b),var(--sidebar-c))',
        padding:'13px 28px',display:'flex',alignItems:'center',
        justifyContent:'space-between',boxShadow:'0 2px 16px rgba(26,122,74,.25)' }}>
        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          <div style={{ width:34,height:34,background:'rgba(255,255,255,.2)',borderRadius:9,
            display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Shield size={17} color="#fff"/>
          </div>
          <span style={{ fontFamily:'Sora,sans-serif',fontSize:18,fontWeight:700 }}>
            <span style={{color:'#fff'}}>Medi</span><span style={{color:'#f5a623'}}>Core</span>
          </span>
        </div>
        <div style={{ display:'flex',alignItems:'center',gap:12 }}>
          <span style={{ fontSize:11,color:'rgba(255,255,255,.6)',letterSpacing:'0.04em' }}>
            B2B Healthcare Platform
          </span>
          <button onClick={toggle}
            style={{ width:34,height:34,borderRadius:9,
              background:'rgba(255,255,255,.15)',border:'1px solid rgba(255,255,255,.2)',
              display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' }}>
            {isDark ? <Sun size={16} color="#f5a623"/> : <Moon size={16} color="#fff"/>}
          </button>
        </div>
      </header>

      {/* Card */}
      <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
        borderRadius:24,boxShadow:'var(--sh-lg)',padding:'36px 32px',
        width:'100%',maxWidth:420,margin:'auto',zIndex:2,
        animation:'fadeUp .4s ease' }}>

        <div style={{ width:56,height:56,background:'var(--green-pale)',
          border:'1px solid var(--border)',borderRadius:16,display:'flex',
          alignItems:'center',justifyContent:'center',margin:'0 auto 20px' }}>
          <Shield size={28} color="var(--green)"/>
        </div>

        <h1 style={{ fontFamily:'Sora,sans-serif',fontSize:24,fontWeight:700,
          color:'var(--green)',textAlign:'center',marginBottom:6 }}>Welcome Back</h1>
        <p style={{ color:'var(--text3)',textAlign:'center',fontSize:13,marginBottom:24 }}>
          Sign in to your clinical portal
        </p>

        {err && (
          <div style={{ background:'#fef0ec',border:'1px solid #fbd0c2',borderRadius:10,
            padding:'9px 14px',fontSize:12,color:'#c0392b',marginBottom:14,
            display:'flex',alignItems:'center',gap:7 }}>
            ⚠ {err}
          </div>
        )}

        <form onSubmit={submit} style={{ display:'flex',flexDirection:'column',gap:14 }}>
          {/* Role */}
          <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
            <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
              textTransform:'uppercase',letterSpacing:'0.06em' }}>Your Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}
              style={{ background:'var(--green-tint)',border:'1.5px solid var(--border)',
                borderRadius:10,padding:'10px 13px',fontSize:13,color:'var(--text)',
                width:'100%',cursor:'pointer' }}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Email */}
          <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
            <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
              textTransform:'uppercase',letterSpacing:'0.06em' }}>Email Address</label>
            <div style={{ display:'flex',alignItems:'center',gap:9,
              background:'var(--green-tint)',border:'1.5px solid var(--border)',
              borderRadius:10,padding:'10px 13px' }}>
              <Mail size={15} color="var(--text3)"/>
              <input type="email" placeholder="name@hospital.com"
                value={email} onChange={e => { setEmail(e.target.value); setErr('') }}
                style={{ flex:1,background:'transparent',border:'none',
                  fontSize:13,color:'var(--text)' }} required autoComplete="email"/>
            </div>
          </div>

          {/* Password */}
          <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
            <label style={{ fontSize:11,fontWeight:700,color:'var(--text3)',
              textTransform:'uppercase',letterSpacing:'0.06em' }}>Password</label>
            <div style={{ display:'flex',alignItems:'center',gap:9,
              background:'var(--green-tint)',border:'1.5px solid var(--border)',
              borderRadius:10,padding:'10px 13px' }}>
              <Lock size={15} color="var(--text3)"/>
              <input type={showPw?'text':'password'} placeholder="••••••••"
                value={pass} onChange={e => { setPass(e.target.value); setErr('') }}
                style={{ flex:1,background:'transparent',border:'none',fontSize:13,color:'var(--text)' }}
                required autoComplete="current-password"/>
              <button type="button" onClick={() => setShowPw(v => !v)}
                style={{ background:'none',border:'none',cursor:'pointer',
                  display:'flex',alignItems:'center',padding:0 }}>
                {showPw
                  ? <EyeOff size={15} color="var(--text3)"/>
                  : <Eye   size={15} color="var(--text3)"/>}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-hover"
            style={{ width:'100%',padding:'13px',
              background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
              color:'#fff',border:'none',borderRadius:12,fontFamily:'Sora,sans-serif',
              fontWeight:600,fontSize:14,cursor:'pointer',display:'flex',
              alignItems:'center',justifyContent:'center',gap:8,marginTop:4,
              boxShadow:'0 4px 16px rgba(26,122,74,.3)',opacity:loading?.7:1 }}>
            {loading
              ? <span style={{ width:16,height:16,border:'2px solid rgba(255,255,255,.3)',
                  borderTop:'2px solid #fff',borderRadius:'50%',
                  animation:'spin .7s linear infinite',display:'inline-block' }}/>
              : <><ArrowRight size={15}/> Sign In</>}
          </button>
        </form>

        <button onClick={() => { setEmail('doctor@medicore.health'); setPass('demo1234') }}
          className="btn-hover"
          style={{ width:'100%',marginTop:12,padding:'10px',background:'var(--green-pale)',
            border:'1px solid var(--border)',borderRadius:10,color:'var(--green)',
            fontWeight:600,fontSize:13,cursor:'pointer' }}>
          ✨ Use Demo Credentials
        </button>

        <p style={{ textAlign:'center',marginTop:10,fontSize:11,color:'var(--text4)' }}>
          Demo: any email + any password (4+ chars)
        </p>
      </div>

      {/* Trust badges */}
      <div style={{ display:'flex',gap:10,marginTop:24,flexWrap:'wrap',
        justifyContent:'center',zIndex:2,paddingBottom:28 }}>
        {['HIPAA Compliant','256-bit Encryption','SOC 2 Type II'].map(b => (
          <div key={b} style={{ display:'flex',alignItems:'center',gap:5,
            background:'var(--card)',border:'1px solid var(--border-lt)',
            borderRadius:99,padding:'5px 13px',fontSize:11,fontWeight:600,
            color:'var(--text2)',boxShadow:'var(--sh-sm)' }}>
            <Shield size={11} color="var(--green)"/>{b}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        select:focus,input:focus{outline:none}
      `}</style>
    </div>
  )
}