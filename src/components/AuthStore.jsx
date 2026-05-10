import { createContext, useContext, useState } from 'react'
const Ctx = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = sessionStorage.getItem('mc_user'); return s ? JSON.parse(s) : null }
    catch { return null }
  })
  const login = (email, pass) => {
    if (!email || pass.length < 4) return 'Password must be at least 4 characters.'
    const u = { email, name: email.split('@')[0], role: 'Senior Physician', dept: 'Cardiology' }
    sessionStorage.setItem('mc_user', JSON.stringify(u))
    setUser(u); return null
  }
  const logout = () => { sessionStorage.removeItem('mc_user'); setUser(null) }
  const updateUser = (data) => {
    const u = { ...user, ...data }
    sessionStorage.setItem('mc_user', JSON.stringify(u))
    setUser(u)
  }
  return <Ctx.Provider value={{ user, login, logout, updateUser }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)