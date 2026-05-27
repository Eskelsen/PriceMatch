const CACHE_NAME = 'price-match-v7';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './appstore-images/price-match.png',
  './appstore-images/android/launchericon-192x192.png',
  './appstore-images/android/launchericon-512x512.png',
  './appstore-images/maskable-512.png',
  './appstore-images/ios/180.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});
