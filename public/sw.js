// public/sw.js
// Service Worker — PWA offline cache

const CACHE_NAME = 'cerkesce-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/favicon.ico',
  '/icons/favicon.svg',
];

// Install → static dosyaları cache'le
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Cache addAll hatası:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate → eski cache'leri temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch → network-first, offline'da cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // GET değilse → dokunma
  if (request.method !== 'GET') return;

  // API çağrıları → her zaman network
  if (request.url.includes('/api/')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});