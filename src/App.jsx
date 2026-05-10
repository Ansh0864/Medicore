import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth }      from './components/AuthStore'
import Login            from './pages/Login'
import Dashboard        from './pages/Dashboard'
import Analytics        from './pages/Analytics'
import Patients         from './pages/Patients'
import Appointments     from './pages/Appointments'
import Reports          from './pages/Reports'
import Profile          from './pages/Profile'
import Settings         from './pages/Settings'
import NotFound         from './pages/NotFound'

function Guard({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}
function Public({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"        element={<Public><Login /></Public>} />
        <Route path="/"             element={<Guard><Dashboard /></Guard>} />
        <Route path="/analytics"    element={<Guard><Analytics /></Guard>} />
        <Route path="/patients"     element={<Guard><Patients /></Guard>} />
        <Route path="/appointments" element={<Guard><Appointments /></Guard>} />
        <Route path="/reports"      element={<Guard><Reports /></Guard>} />
        <Route path="/profile"      element={<Guard><Profile /></Guard>} />
        <Route path="/settings"     element={<Guard><Settings /></Guard>} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}