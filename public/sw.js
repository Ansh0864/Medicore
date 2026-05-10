const CACHE = 'medicore-v1'

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/index.html'])))
)
self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})
self.addEventListener('push', e => {
  const d = e.data?.json() ?? { title: 'MediCore', body: 'New alert' }
  e.waitUntil(
    self.registration.showNotification(d.title, { body: d.body, icon: '/favicon.ico' })
  )
})
self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(clients.openWindow('/'))
})