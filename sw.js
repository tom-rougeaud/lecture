/* Lecture+ — service worker : ouverture hors connexion.
   Il ne met en cache que les fichiers de l’application (aucune donnée personnelle). */
'use strict';
const APP_CACHE = 'lectureplus-app-v2.2.0';
const CORE = ['./', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('lectureplus-app-') && k !== APP_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
function withTimeout(p, ms) {
  return new Promise((resolve, reject) => { const t = setTimeout(() => reject(new Error('délai')), ms); p.then(r => { clearTimeout(t); resolve(r); }, e => { clearTimeout(t); reject(e); }); });
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('/voix/modeles/')) return; /* modèles de voix : gérés par le cache de la voix */
  const isPage = req.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname);
  if (isPage) {
    /* réseau d’abord (pour recevoir les mises à jour), cache si hors connexion ou réseau trop lent */
    e.respondWith(withTimeout(fetch(req), 5000).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put('./index.html', copy)); }
      return res;
    }).catch(() => caches.match('./index.html').then(r => r || caches.match('./')).then(r => r || Response.error())));
    return;
  }
  if (url.pathname.includes('/voix/')) {
    /* moteur de la voix : cache d’abord, puis réseau */
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
