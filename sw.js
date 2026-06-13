// 1. Cambia el número de versión cada vez que modifiques tu HTML u otros archivos
const cacheName = 'pacman'; 

const assets = [
  './',
  './index.html'
];

// Evento de instalación: Guarda los archivos en el nuevo caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(assets))
      .then(() => self.skipWaiting()) // Fuerza al nuevo SW a activarse sin esperar
  );
});

// Evento de activación: Borra los cachés antiguos automáticamente
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('Borrando caché antiguo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Evento fetch: Sirve desde el caché, o busca en la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
