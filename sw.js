/* Fablix ERP — PWA service worker (shell cache + offline fallback).
   NOTE: Sirf apni-origin (wrapper) files cache karta hai. Google Apps Script
   (cross-origin) requests hamesha network se jaati hain — data ke liye net chahiye. */
const CACHE = 'fablix-shell-v2';
const ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Cross-origin (Apps Script / Google) — service worker touch na kare, network se jaane do.
  if (url.origin !== self.location.origin) return;
  // Same-origin shell — cache-first, offline pe fallback page.
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).catch(() => caches.match('./offline.html')))
  );
});
