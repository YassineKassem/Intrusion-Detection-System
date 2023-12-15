// Service Worker install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/static/assets/demo/chart-bar-demo.js',
                '/static/assets/demo/char-bar-demo-protocole.js',
                '/static/assets/img/icon.png',
                '/static/assets/css/styleknn.css',
                '/static/assets/css/styles.css',
                '/static/assets/js/stat.js',
                '/static/assets/js/scripts.js',
            ]);
        }).catch((error) => {
            console.error('Cache installation failed:', error);
        })
    );
});

// Service Worker activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== 'my-cache';
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Service Worker fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch((error) => {
            console.error('Cache match or fetch failed:', error);
        })
    );
});
