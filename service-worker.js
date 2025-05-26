const CACHE_VERSION = '2025-05-25';
const CACHE_NAME = `agrovictoria-cache-${CACHE_VERSION}`;

const FILES_TO_CACHE = [
  './',
  './index.html',
  './estilos.css',
  './logica.js',
  './manifest.json',
  './libs/bootstrap.min.css',
  './libs/bootstrap.bundle.min.js',
  './libs/qrcode.min.js',
  './libs/JsBarcode.all.min.js',
  './libs/html2canvas.min.js',
  './multimedia/logo_agrovictoria.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
