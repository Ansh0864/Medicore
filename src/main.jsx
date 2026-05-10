import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './components/AuthStore'
import { ThemeProvider } from './components/ThemeStore'
import './index.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js')
      if (Notification.permission === 'default') {
        const p = await Notification.requestPermission()
        if (p === 'granted')
          reg.showNotification('MediCore', { body: '✅ Notifications enabled!' })
      }
    } catch (e) { console.warn('[SW]', e) }
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)