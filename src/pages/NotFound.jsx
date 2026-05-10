import { Link } from 'react-router-dom'
import { Shield, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh',display:'flex',alignItems:'center',
      justifyContent:'center',background:'var(--bg)',padding:20,
      position:'relative',overflow:'hidden' }}>
      <div style={{ position:'absolute',top:'-8%',left:'-5%',width:360,height:360,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(26,122,74,.09) 0%,transparent 70%)',
        pointerEvents:'none' }}/>
      <div style={{ position:'absolute',bottom:'-6%',right:'-6%',width:400,height:400,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(108,92,231,.07) 0%,transparent 70%)',
        pointerEvents:'none' }}/>
      <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
        borderRadius:24,boxShadow:'var(--sh-lg)',padding:'44px 36px',
        maxWidth:440,width:'100%',textAlign:'center',zIndex:2,
        animation:'fadeUp .4s ease' }}>
        <div style={{ width:68,height:68,background:'var(--green-pale)',
          border:'1px solid var(--border)',borderRadius:18,display:'flex',
          alignItems:'center',justifyContent:'center',margin:'0 auto 18px',
          animation:'float 3.5s ease-in-out infinite' }}>
          <Shield size={34} color="var(--green)"/>
        </div>
        <div style={{ fontFamily:'Sora,sans-serif',fontSize:72,fontWeight:800,
          lineHeight:1,marginBottom:6,
          background:'linear-gradient(135deg,var(--green),var(--green-lt))',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>404</div>
        <h1 style={{ fontFamily:'Sora,sans-serif',fontSize:22,fontWeight:700,
          color:'var(--text)',marginBottom:9 }}>Page Not Found</h1>
        <p style={{ fontSize:13,color:'var(--text3)',lineHeight:1.7,marginBottom:26 }}>
          The page you're looking for doesn't exist or requires different permissions.
        </p>
        <div style={{ display:'flex',gap:10,justifyContent:'center',
          flexWrap:'wrap',marginBottom:20 }}>
          <Link to="/" style={{ display:'flex',alignItems:'center',gap:7,
            padding:'10px 20px',
            background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
            color:'#fff',borderRadius:11,fontFamily:'Sora,sans-serif',
            fontWeight:600,fontSize:13,textDecoration:'none',
            boxShadow:'0 4px 14px rgba(26,122,74,.28)' }}>
            <Home size={15}/> Go to Dashboard
          </Link>
          <button onClick={() => window.history.back()}
            style={{ display:'flex',alignItems:'center',gap:6,padding:'10px 18px',
              background:'var(--card)',border:'1.5px solid var(--border)',
              borderRadius:11,fontFamily:'DM Sans,sans-serif',fontWeight:600,
              fontSize:13,color:'var(--text2)',cursor:'pointer' }}>
            <ArrowLeft size={14}/> Go Back
          </button>
        </div>
        <div style={{ display:'flex',gap:7,justifyContent:'center',flexWrap:'wrap',
          paddingTop:16,borderTop:'1px solid var(--border-lt)' }}>
          {[['/','/','Dashboard'],['/analytics','/analytics','Analytics'],
            ['/patients','/patients','Patients']].map(([to,,lbl]) => (
            <Link key={to} to={to} style={{ fontSize:11,fontWeight:600,
              color:'var(--green)',textDecoration:'none',padding:'3px 11px',
              background:'var(--green-pale)',borderRadius:99,
              border:'1px solid var(--border)' }}>{lbl}</Link>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
    </div>
  )
}