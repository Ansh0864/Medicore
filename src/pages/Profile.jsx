import { useState } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Edit3,
         Save, X, Shield, Award, Clock, Star, Camera,
         CheckCircle } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../components/AuthStore'

const SPECIALTIES = ['Cardiology','Neurology','Orthopedics','Oncology',
  'Pulmonology','General Medicine','Surgery','Radiology']
const CERTS = [
  { name:'MBBS — AIIMS New Delhi',          year:'2002' },
  { name:'MD — Internal Medicine',          year:'2006' },
  { name:'DM — Cardiology',                 year:'2009' },
  { name:'HIPAA Compliance Certified',      year:'2023' },
]

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [success, setSuccess] = useState(false)
  const [formErr, setFormErr] = useState('')
  const [form, setForm] = useState({
    name:        user?.name || '',
    phone:       '+91-98201-55678',
    location:    'Mumbai, Maharashtra',
    specialty:   'Cardiology',
    designation: 'Senior Consultant',
    bio:         'Board-certified cardiologist with 18+ years of experience in interventional cardiology and cardiac imaging. Committed to patient-centred, evidence-based care.',
  })

  const set = k => e => setForm(p => ({...p,[k]:e.target.value}))

  const save = async () => {
    if (!form.name.trim()) { setFormErr('Name is required.'); return }
    setSaving(true); setFormErr('')
    await new Promise(r => setTimeout(r, 700))
    updateUser({ name: form.name.trim(), role: form.designation })
    setSaving(false); setEditing(false); setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const init = (form.name || 'DR').slice(0, 2).toUpperCase()

  const STATS = [
    { label:'Patients Treated', value:'2,840', Icon:User,  c:'#1a7a4a',bg:'#e6f7ee' },
    { label:'Years Experience',  value:'18+',  Icon:Clock, c:'#f5a623',bg:'#fff6e6' },
    { label:'Avg. Rating',       value:'4.9',  Icon:Star,  c:'#6c5ce7',bg:'#f0eeff' },
    { label:'Cases This Month',  value:'134',  Icon:Award, c:'#00b8a9',bg:'#e0f9f7' },
  ]

  return (
    <Layout title="My Profile" sub="Manage your personal and professional information">
      {success && (
        <div style={{ display:'flex',alignItems:'center',gap:8,background:'#e6f7ee',
          border:'1px solid #b3e6c8',borderRadius:10,padding:'10px 16px',
          fontSize:13,fontWeight:600,color:'#1a7a4a',marginBottom:20 }}>
          <CheckCircle size={16}/> Profile updated successfully!
        </div>
      )}

      <div style={{ display:'grid',gridTemplateColumns:'300px 1fr',gap:22,
        alignItems:'flex-start' }}
        className="two-col">

        {/* Left column */}
        <div style={{ display:'flex',flexDirection:'column',gap:18 }}>
          {/* Avatar card */}
          <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
            borderRadius:20,padding:'28px 20px 20px',boxShadow:'var(--sh-sm)',
            display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center' }}>
            <div style={{ position:'relative',marginBottom:14 }}>
              <div style={{ width:90,height:90,borderRadius:'50%',
                background:'linear-gradient(135deg,var(--green),var(--green-lt))',
                color:'#fff',fontFamily:'Sora,sans-serif',fontWeight:800,fontSize:28,
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:'0 4px 18px rgba(26,122,74,.3)' }}>{init}</div>
              <button style={{ position:'absolute',bottom:2,right:2,
                width:26,height:26,borderRadius:'50%',background:'var(--green)',
                border:'2px solid var(--card)',display:'flex',alignItems:'center',
                justifyContent:'center',cursor:'pointer' }}>
                <Camera size={13} color="#fff"/>
              </button>
            </div>
            <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:17,
              color:'var(--text)',marginBottom:4 }}>{form.name || user?.name}</div>
            <div style={{ fontSize:13,color:'var(--text3)',marginBottom:2 }}>{form.designation}</div>
            <div style={{ fontSize:12,color:'var(--green)',fontWeight:600,marginBottom:14 }}>{form.specialty}</div>
            <div style={{ display:'flex',alignItems:'center',gap:6,background:'#e6f7ee',
              border:'1px solid #b3e6c8',borderRadius:99,padding:'5px 14px',marginBottom:18 }}>
              <Shield size={13} color="#1a7a4a"/>
              <span style={{ fontSize:11,fontWeight:700,color:'#1a7a4a' }}>Verified Physician</span>
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:9,width:'100%' }}>
              {STATS.map((s,i) => (
                <div key={i} style={{ background:s.bg,borderRadius:12,padding:'12px 10px',
                  display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}>
                  <s.Icon size={16} color={s.c}/>
                  <div style={{ fontFamily:'Sora,sans-serif',fontSize:16,
                    fontWeight:800,color:s.c }}>{s.value}</div>
                  <div style={{ fontSize:9,color:'var(--text3)',fontWeight:600,
                    textAlign:'center' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
            borderRadius:18,padding:'18px 20px',boxShadow:'var(--sh-sm)' }}>
            <div style={{ display:'flex',alignItems:'center',gap:6,
              fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:14,
              color:'var(--text)',marginBottom:14 }}>
              <Award size={16} color="var(--green)"/> Certifications
            </div>
            {CERTS.map((c,i) => (
              <div key={i} style={{ display:'flex',alignItems:'flex-start',
                gap:10,marginBottom:12 }}>
                <div style={{ width:8,height:8,borderRadius:'50%',
                  background:'var(--green)',marginTop:4,flexShrink:0 }}/>
                <div>
                  <div style={{ fontSize:13,fontWeight:600,color:'var(--text)' }}>{c.name}</div>
                  <div style={{ fontSize:11,color:'var(--text3)' }}>{c.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:'flex',flexDirection:'column',gap:18 }}>
          {/* Edit form */}
          <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
            borderRadius:20,padding:'22px',boxShadow:'var(--sh-sm)' }}>
            <div style={{ display:'flex',alignItems:'flex-start',
              justifyContent:'space-between',marginBottom:22,gap:12 }}>
              <div>
                <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,
                  fontSize:15,color:'var(--text)',marginBottom:3 }}>Personal Information</div>
                <div style={{ fontSize:12,color:'var(--text3)' }}>Manage your profile details</div>
              </div>
              {!editing ? (
                <button onClick={() => setEditing(true)}
                  style={{ display:'flex',alignItems:'center',gap:6,padding:'8px 16px',
                    background:'var(--green-pale)',border:'1px solid var(--border)',
                    borderRadius:10,fontSize:13,fontWeight:600,color:'var(--green)',
                    cursor:'pointer' }}>
                  <Edit3 size={14}/> Edit
                </button>
              ) : (
                <div style={{ display:'flex',gap:8 }}>
                  <button onClick={() => { setEditing(false); setFormErr('') }}
                    style={{ display:'flex',alignItems:'center',gap:5,padding:'8px 14px',
                      background:'var(--bg2)',border:'1px solid var(--border)',
                      borderRadius:10,fontSize:13,fontWeight:500,color:'var(--text3)',
                      cursor:'pointer' }}>
                    <X size={13}/> Cancel
                  </button>
                  <button onClick={save} disabled={saving}
                    style={{ display:'flex',alignItems:'center',gap:5,padding:'8px 18px',
                      background:'linear-gradient(135deg,var(--sidebar-b),var(--green))',
                      border:'none',borderRadius:10,fontSize:13,fontWeight:600,
                      color:'#fff',cursor:'pointer' }}>
                    {saving ? <span style={{ width:14,height:14,border:'2px solid rgba(255,255,255,.3)',borderTop:'2px solid #fff',borderRadius:'50%',animation:'spin .7s linear infinite',display:'inline-block' }}/> : <><Save size={13}/> Save</>}
                  </button>
                </div>
              )}
            </div>

            {formErr && <div style={{ background:'#fef0ec',border:'1px solid #fbd0c2',
              borderRadius:9,padding:'9px 13px',fontSize:12,color:'#c0392b',
              marginBottom:14 }}>⚠ {formErr}</div>}

            <div className="form-grid-2" style={{ display:'grid',
              gridTemplateColumns:'1fr 1fr',gap:14 }}>
              {[
                ['Full Name',   'name',        User,     'text',  'Dr. Full Name'],
                ['Phone',       'phone',       Phone,    'text',  '+91-XXXXX-XXXXX'],
                ['Location',    'location',    MapPin,   'text',  'City, State'],
                ['Designation', 'designation', Briefcase,'text',  'Senior Consultant'],
              ].map(([label,key,Icon,type,ph]) => (
                <div key={key} style={{ display:'flex',flexDirection:'column',gap:5 }}>
                  <label style={{ fontSize:10,fontWeight:700,color:'var(--text3)',
                    textTransform:'uppercase',letterSpacing:'0.06em',
                    display:'flex',alignItems:'center',gap:5 }}>
                    <Icon size={11}/> {label}
                  </label>
                  {editing ? (
                    <input type={type} placeholder={ph} value={form[key]}
                      onChange={set(key)}
                      style={{ background:'var(--green-tint)',border:'1.5px solid var(--border)',
                        borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--text)' }}/>
                  ) : (
                    <div style={{ fontSize:13,color:'var(--text)',fontWeight:500,
                      background:'var(--bg2)',border:'1px solid var(--border-lt)',
                      borderRadius:9,padding:'9px 12px' }}>{form[key]}</div>
                  )}
                </div>
              ))}

              {/* Email (read-only) */}
              <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
                <label style={{ fontSize:10,fontWeight:700,color:'var(--text3)',
                  textTransform:'uppercase',letterSpacing:'0.06em',
                  display:'flex',alignItems:'center',gap:5 }}>
                  <Mail size={11}/> Email
                </label>
                <div style={{ fontSize:13,color:'var(--text3)',
                  background:'var(--bg2)',border:'1px solid var(--border-lt)',
                  borderRadius:9,padding:'9px 12px',
                  display:'flex',alignItems:'center',gap:6 }}>
                  {user?.email}
                  <span style={{ fontSize:9,fontWeight:700,background:'#e6f7ee',
                    color:'#1a7a4a',borderRadius:99,padding:'2px 7px' }}>Verified</span>
                </div>
              </div>

              {/* Specialty */}
              <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
                <label style={{ fontSize:10,fontWeight:700,color:'var(--text3)',
                  textTransform:'uppercase',letterSpacing:'0.06em',
                  display:'flex',alignItems:'center',gap:5 }}>
                  <Briefcase size={11}/> Specialty
                </label>
                {editing ? (
                  <select value={form.specialty} onChange={set('specialty')}
                    style={{ background:'var(--green-tint)',border:'1.5px solid var(--border)',
                      borderRadius:9,padding:'9px 12px',fontSize:13,color:'var(--text)',
                      cursor:'pointer' }}>
                    {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                ) : (
                  <div style={{ fontSize:13,color:'var(--text)',fontWeight:500,
                    background:'var(--bg2)',border:'1px solid var(--border-lt)',
                    borderRadius:9,padding:'9px 12px' }}>{form.specialty}</div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div style={{ marginTop:16 }}>
              <label style={{ fontSize:10,fontWeight:700,color:'var(--text3)',
                textTransform:'uppercase',letterSpacing:'0.06em',
                display:'flex',alignItems:'center',gap:5,marginBottom:6 }}>
                <Edit3 size={11}/> Bio
              </label>
              {editing ? (
                <textarea value={form.bio} onChange={set('bio')} rows={4}
                  style={{ width:'100%',background:'var(--green-tint)',
                    border:'1.5px solid var(--border)',borderRadius:9,
                    padding:'10px 12px',fontSize:13,color:'var(--text)',
                    resize:'vertical' }}/>
              ) : (
                <div style={{ fontSize:13,color:'var(--text2)',lineHeight:1.75,
                  background:'var(--green-tint)',border:'1px solid var(--border-lt)',
                  borderRadius:9,padding:'11px 12px' }}>{form.bio}</div>
              )}
            </div>
          </div>

          {/* Security */}
          <div style={{ background:'var(--card)',border:'1px solid var(--border-lt)',
            borderRadius:20,padding:'22px',boxShadow:'var(--sh-sm)' }}>
            <div style={{ fontFamily:'Sora,sans-serif',fontWeight:700,fontSize:15,
              color:'var(--text)',marginBottom:16,display:'flex',alignItems:'center',gap:8 }}>
              <Shield size={16} color="var(--green)"/> Security & Access
            </div>
            {[
              { label:'Password',             value:'Last changed 3 months ago',     action:'Change'    },
              { label:'Two-Factor Auth (2FA)', value:'Enabled via Authenticator App', action:'Manage'    },
              { label:'Active Sessions',       value:'2 devices logged in',           action:'View'      },
              { label:'Login Notifications',   value:'Email alerts enabled',          action:'Configure' },
            ].map((row,i) => (
              <div key={i} style={{ display:'flex',alignItems:'center',gap:12,
                padding:'12px 0',borderBottom:'1px solid var(--border-lt)' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13,fontWeight:600,color:'var(--text)' }}>{row.label}</div>
                  <div style={{ fontSize:12,color:'var(--text3)',marginTop:2 }}>{row.value}</div>
                </div>
                <button style={{ padding:'6px 14px',background:'var(--green-pale)',
                  border:'1px solid var(--border)',borderRadius:8,fontSize:12,
                  fontWeight:600,color:'var(--green)',cursor:'pointer' }}>
                  {row.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}select:focus,input:focus,textarea:focus{outline:none}`}</style>
    </Layout>
  )
}